"use strict";

exports.getUserInfo = getUserInfo;
var _errors = require("../errors");
var _http = require("../http");
var _types = require("./types");
/* eslint-disable complexity */
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
 *
 */

async function getUserInfo(sdk, accessTokenObject, idTokenObject) {
  // If token objects were not passed, attempt to read from the TokenManager
  if (!accessTokenObject) {
    accessTokenObject = (await sdk.tokenManager.getTokens()).accessToken;
  }
  if (!idTokenObject) {
    idTokenObject = (await sdk.tokenManager.getTokens()).idToken;
  }
  if (!accessTokenObject || !(0, _types.isAccessToken)(accessTokenObject)) {
    return Promise.reject(new _errors.AuthSdkError('getUserInfo requires an access token object'));
  }
  if (!idTokenObject || !(0, _types.isIDToken)(idTokenObject)) {
    return Promise.reject(new _errors.AuthSdkError('getUserInfo requires an ID token object'));
  }
  const options = {
    url: accessTokenObject.userinfoUrl,
    method: 'GET',
    accessToken: accessTokenObject.accessToken
  };
  if (sdk.options.dpop) {
    const headers = await sdk.getDPoPAuthorizationHeaders({
      ...options,
      accessToken: accessTokenObject
    });
    options.headers = headers;
    delete options.accessToken; // unset to prevent overriding Auth header with Bearer Token
  }

  return (0, _http.httpRequest)(sdk, options).then(userInfo => {
    // Only return the userinfo response if subjects match to mitigate token substitution attacks
    if (userInfo.sub === idTokenObject.claims.sub) {
      return userInfo;
    }
    return Promise.reject(new _errors.AuthSdkError('getUserInfo request was rejected due to token mismatch'));
  }).catch(function (err) {
    // throw OAuthError to avoid breaking change (when dpop is not being used)
    if (err instanceof _errors.WWWAuthError && !sdk.options.dpop) {
      const {
        error,
        errorDescription
      } = err;
      throw new _errors.OAuthError(error, errorDescription);
    }

    // throw OAuthError to avoid breaking change (when dpop is not being used)
    if (!sdk.options.dpop) {
      let e = err;
      if (err instanceof _errors.AuthApiError && err?.meta?.wwwAuthHeader) {
        e = _errors.WWWAuthError.parseHeader(err.meta.wwwAuthHeader);
      }
      if (e instanceof _errors.WWWAuthError) {
        const {
          error,
          errorDescription
        } = e;
        throw new _errors.OAuthError(error, errorDescription);
      }
    }
    throw err;
  });
}
//# sourceMappingURL=getUserInfo.js.map