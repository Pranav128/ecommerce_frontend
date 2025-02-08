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

import AuthApiError from '../../errors/AuthApiError.js';
import AuthSdkError from '../../errors/AuthSdkError.js';
import '../../errors/WWWAuthError.js';
import { removeNils } from '../../util/object.js';
import { toQueryString } from '../../util/url.js';
import { httpRequest } from '../../http/request.js';
import 'tiny-emitter';
import 'js-cookie';
import 'cross-fetch';
import { generateDPoPForTokenRequest, isDPoPNonceError } from '../dpop.js';

function validateOptions(options) {
    if (!options.clientId) {
        throw new AuthSdkError('A clientId must be specified in the OktaAuth constructor to get a token');
    }
    if (!options.redirectUri) {
        throw new AuthSdkError('The redirectUri passed to /authorize must also be passed to /token');
    }
    if (!options.authorizationCode && !options.interactionCode) {
        throw new AuthSdkError('An authorization code (returned from /authorize) must be passed to /token');
    }
    if (!options.codeVerifier) {
        throw new AuthSdkError('The "codeVerifier" (generated and saved by your app) must be passed to /token');
    }
}
function getPostData(sdk, options) {
    var params = removeNils({
        'client_id': options.clientId,
        'redirect_uri': options.redirectUri,
        'grant_type': options.interactionCode ? 'interaction_code' : 'authorization_code',
        'code_verifier': options.codeVerifier
    });
    if (options.interactionCode) {
        params['interaction_code'] = options.interactionCode;
    }
    else if (options.authorizationCode) {
        params.code = options.authorizationCode;
    }
    const { clientSecret } = sdk.options;
    if (clientSecret) {
        params['client_secret'] = clientSecret;
    }
    return toQueryString(params).slice(1);
}
async function makeTokenRequest(sdk, { url, data, nonce, dpopKeyPair }) {
    var _a, _b;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (sdk.options.dpop) {
        if (!dpopKeyPair) {
            throw new AuthSdkError('DPoP is configured but no key pair was provided');
        }
        const proof = await generateDPoPForTokenRequest({ url, method, nonce, keyPair: dpopKeyPair });
        headers.DPoP = proof;
    }
    try {
        const resp = await httpRequest(sdk, {
            url,
            method,
            args: data,
            headers
        });
        return resp;
    }
    catch (err) {
        if (isDPoPNonceError(err) && !nonce) {
            const dpopNonce = (_a = err.resp) === null || _a === void 0 ? void 0 : _a.headers['dpop-nonce'];
            if (!dpopNonce) {
                throw new AuthApiError({ errorSummary: 'No `dpop-nonce` header found when required' }, (_b = err.resp) !== null && _b !== void 0 ? _b : undefined
                );
            }
            return makeTokenRequest(sdk, { url, data, dpopKeyPair, nonce: dpopNonce });
        }
        throw err;
    }
}
async function postToTokenEndpoint(sdk, options, urls) {
    validateOptions(options);
    var data = getPostData(sdk, options);
    const params = {
        url: urls.tokenUrl,
        data,
        dpopKeyPair: options === null || options === void 0 ? void 0 : options.dpopKeyPair
    };
    return makeTokenRequest(sdk, params);
}
async function postRefreshToken(sdk, options, refreshToken) {
    const data = Object.entries({
        client_id: options.clientId,
        grant_type: 'refresh_token',
        scope: refreshToken.scopes.join(' '),
        refresh_token: refreshToken.refreshToken,
    }).map(function ([name, value]) {
        return name + '=' + encodeURIComponent(value);
    }).join('&');
    let url = refreshToken.tokenUrl;
    if (options.extraParams && Object.keys(options.extraParams).length >= 1) {
        url += toQueryString(options.extraParams);
    }
    const params = {
        url,
        data,
        dpopKeyPair: options === null || options === void 0 ? void 0 : options.dpopKeyPair
    };
    return makeTokenRequest(sdk, params);
}

export { postRefreshToken, postToTokenEndpoint };
//# sourceMappingURL=token.js.map
