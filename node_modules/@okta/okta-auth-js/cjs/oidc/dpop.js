"use strict";

exports.clearAllDPoPKeyPairs = clearAllDPoPKeyPairs;
exports.clearDPoPKeyPair = clearDPoPKeyPair;
exports.clearDPoPKeyPairAfterRevoke = clearDPoPKeyPairAfterRevoke;
exports.createDPoPKeyPair = createDPoPKeyPair;
exports.createJwt = createJwt;
exports.cryptoRandomValue = cryptoRandomValue;
exports.findKeyPair = findKeyPair;
exports.generateDPoPForTokenRequest = generateDPoPForTokenRequest;
exports.generateDPoPProof = generateDPoPProof;
exports.generateKeyPair = generateKeyPair;
exports.isDPoPNonceError = isDPoPNonceError;
var _crypto = require("../crypto");
var _errors = require("../errors");
// References:
// https://www.w3.org/TR/WebCryptoAPI/#concepts-key-storage
// https://datatracker.ietf.org/doc/html/rfc9449

const INDEXEDDB_NAME = 'OktaAuthJs';
const DB_KEY = 'DPoPKeys';
function isDPoPNonceError(obj) {
  return ((0, _errors.isOAuthError)(obj) || (0, _errors.isWWWAuthError)(obj)) && obj.errorCode === 'use_dpop_nonce';
}

/////////// crypto ///////////

async function createJwt(header, claims, signingKey) {
  const head = (0, _crypto.stringToBase64Url)(JSON.stringify(header));
  const body = (0, _crypto.stringToBase64Url)(JSON.stringify(claims));
  const signature = await _crypto.webcrypto.subtle.sign({
    name: signingKey.algorithm.name
  }, signingKey, (0, _crypto.stringToBuffer)(`${head}.${body}`));
  return `${head}.${body}.${(0, _crypto.base64ToBase64Url)((0, _crypto.bufferToBase64Url)(signature))}`;
}
function cryptoRandomValue(byteLen = 32) {
  return [..._crypto.webcrypto.getRandomValues(new Uint8Array(byteLen))].map(v => v.toString(16)).join('');
}
async function generateKeyPair() {
  const algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: 'SHA-256',
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01])
  };

  // The "false" here makes it non-exportable
  // https://caniuse.com/mdn-api_subtlecrypto_generatekey
  return _crypto.webcrypto.subtle.generateKey(algorithm, false, ['sign', 'verify']);
}
async function hashAccessToken(accessToken) {
  const buffer = new TextEncoder().encode(accessToken);
  const hash = await _crypto.webcrypto.subtle.digest('SHA-256', buffer);
  return (0, _crypto.btoa)(String.fromCharCode.apply(null, new Uint8Array(hash))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/////////// indexeddb / keystore ///////////

// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore#instance_methods
// add additional methods as needed

// convenience abstraction for exposing IDBObjectStore instance
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
    } catch (err) {
      reject(err);
    }
  });
}

// convenience abstraction for wrapping IDBObjectStore methods in promises
async function invokeStoreMethod(method, ...args) {
  const store = await keyStore();
  return new Promise((resolve, reject) => {
    // https://github.com/microsoft/TypeScript/issues/49700
    // https://github.com/microsoft/TypeScript/issues/49802
    // @ts-expect-error ts(2556)
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

// attempts to find keyPair stored at given key, otherwise throws
async function findKeyPair(pairId) {
  if (pairId) {
    const req = await invokeStoreMethod('get', pairId);
    if (req.result) {
      return req.result;
    }
  }

  // defaults to throwing unless keyPair is found
  throw new _errors.AuthSdkError(`Unable to locate dpop key pair required for refresh${pairId ? ` (${pairId})` : ''}`);
}
async function clearDPoPKeyPair(pairId) {
  await invokeStoreMethod('delete', pairId);
}
async function clearAllDPoPKeyPairs() {
  await invokeStoreMethod('clear');
}

// generates a crypto (non-extractable) private key pair and writes it to indexeddb, returns key (id)
async function createDPoPKeyPair() {
  const keyPairId = cryptoRandomValue(4);
  const keyPair = await generateKeyPair();
  await storeKeyPair(keyPairId, keyPair);
  return {
    keyPair,
    keyPairId
  };
}

// will clear PK from storage if certain token conditions are met
/* eslint max-len: [2, 132], complexity: [2, 12] */
async function clearDPoPKeyPairAfterRevoke(revokedToken, tokens) {
  let shouldClear = false;
  const {
    accessToken,
    refreshToken
  } = tokens;

  // revoking access token and refresh token doesn't exist
  if (revokedToken === 'access' && accessToken && accessToken.tokenType === 'DPoP' && !refreshToken) {
    shouldClear = true;
  }

  // revoking refresh token and access token doesn't exist
  if (revokedToken === 'refresh' && refreshToken && !accessToken) {
    shouldClear = true;
  }
  const pairId = accessToken?.dpopPairId ?? refreshToken?.dpopPairId;
  if (shouldClear && pairId) {
    await clearDPoPKeyPair(pairId);
  }
}

/////////// proof generation methods ///////////

async function generateDPoPProof({
  keyPair,
  url,
  method,
  nonce,
  accessToken
}) {
  const {
    kty,
    crv,
    e,
    n,
    x,
    y
  } = await _crypto.webcrypto.subtle.exportKey('jwk', keyPair.publicKey);
  const header = {
    alg: 'RS256',
    typ: 'dpop+jwt',
    jwk: {
      kty,
      crv,
      e,
      n,
      x,
      y
    }
  };
  const claims = {
    htm: method,
    htu: url,
    iat: Math.floor(Date.now() / 1000),
    jti: cryptoRandomValue()
  };
  if (nonce) {
    claims.nonce = nonce;
  }

  // encode access token
  if (accessToken) {
    claims.ath = await hashAccessToken(accessToken);
  }
  return createJwt(header, claims, keyPair.privateKey);
}

/* eslint max-len: [2, 132] */
async function generateDPoPForTokenRequest({
  keyPair,
  url,
  method,
  nonce
}) {
  const params = {
    keyPair,
    url,
    method
  };
  if (nonce) {
    params.nonce = nonce;
  }
  return generateDPoPProof(params);
}
//# sourceMappingURL=dpop.js.map