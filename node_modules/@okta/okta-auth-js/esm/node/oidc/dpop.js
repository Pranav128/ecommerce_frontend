/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { stringToBase64Url, stringToBuffer, base64ToBase64Url, bufferToBase64Url } from '../crypto/base64.js';
import { webcrypto, btoa as b } from '../crypto/node.js';
import { isOAuthError, isWWWAuthError } from '../errors/index.js';
import AuthSdkError from '../errors/AuthSdkError.js';

const INDEXEDDB_NAME = 'OktaAuthJs';
const DB_KEY = 'DPoPKeys';
function isDPoPNonceError(obj) {
    return ((isOAuthError(obj) || isWWWAuthError(obj)) &&
        obj.errorCode === 'use_dpop_nonce');
}
async function createJwt(header, claims, signingKey) {
    const head = stringToBase64Url(JSON.stringify(header));
    const body = stringToBase64Url(JSON.stringify(claims));
    const signature = await webcrypto.subtle.sign({ name: signingKey.algorithm.name }, signingKey, stringToBuffer(`${head}.${body}`));
    return `${head}.${body}.${base64ToBase64Url(bufferToBase64Url(signature))}`;
}
function cryptoRandomValue(byteLen = 32) {
    return [...webcrypto.getRandomValues(new Uint8Array(byteLen))].map(v => v.toString(16)).join('');
}
async function generateKeyPair() {
    const algorithm = {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    };
    return webcrypto.subtle.generateKey(algorithm, false, ['sign', 'verify']);
}
async function hashAccessToken(accessToken) {
    const buffer = new TextEncoder().encode(accessToken);
    const hash = await webcrypto.subtle.digest('SHA-256', buffer);
    return b(String.fromCharCode.apply(null, new Uint8Array(hash)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function keyStore() {
    return new Promise((resolve, reject) => {
        try {
            const indexedDB = window.indexedDB;
            const req = indexedDB.open(INDEXEDDB_NAME, 1);
            req.onerror = function () {
                reject(req.error);
            };
            req.onupgradeneeded = function () {
                const db = req.result;
                db.createObjectStore(DB_KEY);
            };
            req.onsuccess = function () {
                const db = req.result;
                const tx = db.transaction(DB_KEY, 'readwrite');
                tx.onerror = function () {
                    reject(tx.error);
                };
                const store = tx.objectStore(DB_KEY);
                resolve(store);
                tx.oncomplete = function () {
                    db.close();
                };
            };
        }
        catch (err) {
            reject(err);
        }
    });
}
async function invokeStoreMethod(method, ...args) {
    const store = await keyStore();
    return new Promise((resolve, reject) => {
        const req = store[method](...args);
        req.onsuccess = function () {
            resolve(req);
        };
        req.onerror = function () {
            reject(req.error);
        };
    });
}
async function storeKeyPair(pairId, keyPair) {
    await invokeStoreMethod('add', keyPair, pairId);
    return keyPair;
}
async function findKeyPair(pairId) {
    if (pairId) {
        const req = await invokeStoreMethod('get', pairId);
        if (req.result) {
            return req.result;
        }
    }
    throw new AuthSdkError(`Unable to locate dpop key pair required for refresh${pairId ? ` (${pairId})` : ''}`);
}
async function clearDPoPKeyPair(pairId) {
    await invokeStoreMethod('delete', pairId);
}
async function clearAllDPoPKeyPairs() {
    await invokeStoreMethod('clear');
}
async function createDPoPKeyPair() {
    const keyPairId = cryptoRandomValue(4);
    const keyPair = await generateKeyPair();
    await storeKeyPair(keyPairId, keyPair);
    return { keyPair, keyPairId };
}
async function clearDPoPKeyPairAfterRevoke(revokedToken, tokens) {
    var _a;
    let shouldClear = false;
    const { accessToken, refreshToken } = tokens;
    if (revokedToken === 'access' && accessToken && accessToken.tokenType === 'DPoP' && !refreshToken) {
        shouldClear = true;
    }
    if (revokedToken === 'refresh' && refreshToken && !accessToken) {
        shouldClear = true;
    }
    const pairId = (_a = accessToken === null || accessToken === void 0 ? void 0 : accessToken.dpopPairId) !== null && _a !== void 0 ? _a : refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.dpopPairId;
    if (shouldClear && pairId) {
        await clearDPoPKeyPair(pairId);
    }
}
async function generateDPoPProof({ keyPair, url, method, nonce, accessToken }) {
    const { kty, crv, e, n, x, y } = await webcrypto.subtle.exportKey('jwk', keyPair.publicKey);
    const header = {
        alg: 'RS256',
        typ: 'dpop+jwt',
        jwk: { kty, crv, e, n, x, y }
    };
    const claims = {
        htm: method,
        htu: url,
        iat: Math.floor(Date.now() / 1000),
        jti: cryptoRandomValue(),
    };
    if (nonce) {
        claims.nonce = nonce;
    }
    if (accessToken) {
        claims.ath = await hashAccessToken(accessToken);
    }
    return createJwt(header, claims, keyPair.privateKey);
}
async function generateDPoPForTokenRequest({ keyPair, url, method, nonce }) {
    const params = { keyPair, url, method };
    if (nonce) {
        params.nonce = nonce;
    }
    return generateDPoPProof(params);
}

export { clearAllDPoPKeyPairs, clearDPoPKeyPair, clearDPoPKeyPairAfterRevoke, createDPoPKeyPair, createJwt, cryptoRandomValue, findKeyPair, generateDPoPForTokenRequest, generateDPoPProof, generateKeyPair, isDPoPNonceError };
//# sourceMappingURL=dpop.js.map
