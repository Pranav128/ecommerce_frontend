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

import AuthApiError from '../errors/AuthApiError.js';
import AuthSdkError from '../errors/AuthSdkError.js';
import OAuthError from '../errors/OAuthError.js';
import WWWAuthError from '../errors/WWWAuthError.js';
import { httpRequest } from '../http/request.js';
import 'tiny-emitter';
import 'js-cookie';
import 'cross-fetch';
import { isAccessToken, isIDToken } from './types/Token.js';

async function getUserInfo(sdk, accessTokenObject, idTokenObject) {
    if (!accessTokenObject) {
        accessTokenObject = (await sdk.tokenManager.getTokens()).accessToken;
    }
    if (!idTokenObject) {
        idTokenObject = (await sdk.tokenManager.getTokens()).idToken;
    }
    if (!accessTokenObject || !isAccessToken(accessTokenObject)) {
        return Promise.reject(new AuthSdkError('getUserInfo requires an access token object'));
    }
    if (!idTokenObject || !isIDToken(idTokenObject)) {
        return Promise.reject(new AuthSdkError('getUserInfo requires an ID token object'));
    }
    const options = {
        url: accessTokenObject.userinfoUrl,
        method: 'GET',
        accessToken: accessTokenObject.accessToken
    };
    if (sdk.options.dpop) {
        const headers = await sdk.getDPoPAuthorizationHeaders(Object.assign(Object.assign({}, options), { accessToken: accessTokenObject }));
        options.headers = headers;
        delete options.accessToken;
    }
    return httpRequest(sdk, options)
        .then(userInfo => {
        if (userInfo.sub === idTokenObject.claims.sub) {
            return userInfo;
        }
        return Promise.reject(new AuthSdkError('getUserInfo request was rejected due to token mismatch'));
    })
        .catch(function (err) {
        var _a;
        if (err instanceof WWWAuthError && !sdk.options.dpop) {
            const { error, errorDescription } = err;
            throw new OAuthError(error, errorDescription);
        }
        if (!sdk.options.dpop) {
            let e = err;
            if (err instanceof AuthApiError && ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.wwwAuthHeader)) {
                e = WWWAuthError.parseHeader(err.meta.wwwAuthHeader);
            }
            if (e instanceof WWWAuthError) {
                const { error, errorDescription } = e;
                throw new OAuthError(error, errorDescription);
            }
        }
        throw err;
    });
}

export { getUserInfo };
//# sourceMappingURL=getUserInfo.js.map
