"use strict";

exports.postRefreshToken = postRefreshToken;
exports.postToTokenEndpoint = postToTokenEndpoint;
var _errors = require("../../errors");
var _util = require("../../util");
var _http = require("../../http");
var _dpop = require("../dpop");
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

function validateOptions(options) {
  // Quick validation
  if (!options.clientId) {
    throw new _errors.AuthSdkError('A clientId must be specified in the OktaAuth constructor to get a token');
  }
  if (!options.redirectUri) {
    throw new _errors.AuthSdkError('The redirectUri passed to /authorize must also be passed to /token');
  }
  if (!options.authorizationCode && !options.interactionCode) {
    throw new _errors.AuthSdkError('An authorization code (returned from /authorize) must be passed to /token');
  }
  if (!options.codeVerifier) {
    throw new _errors.AuthSdkError('The "codeVerifier" (generated and saved by your app) must be passed to /token');
  }
}
function getPostData(sdk, options) {
  // Convert Token params to OAuth params, sent to the /token endpoint
  var params = (0, _util.removeNils)({
    'client_id': options.clientId,
    'redirect_uri': options.redirectUri,
    'grant_type': options.interactionCode ? 'interaction_code' : 'authorization_code',
    'code_verifier': options.codeVerifier
  });
  if (options.interactionCode) {
    params['interaction_code'] = options.interactionCode;
  } else if (options.authorizationCode) {
    params.code = options.authorizationCode;
  }
  const {
    clientSecret
  } = sdk.options;
  if (clientSecret) {
    params['client_secret'] = clientSecret;
  }

  // Encode as URL string
  return (0, _util.toQueryString)(params).slice(1);
}

/* eslint complexity: [2, 10] */
async function makeTokenRequest(sdk, {
  url,
  data,
  nonce,
  dpopKeyPair
}) {
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  if (sdk.options.dpop) {
    if (!dpopKeyPair) {
      throw new _errors.AuthSdkError('DPoP is configured but no key pair was provided');
    }
    const proof = await (0, _dpop.generateDPoPForTokenRequest)({
      url,
      method,
      nonce,
      keyPair: dpopKeyPair
    });
    headers.DPoP = proof;
  }
  try {
    const resp = await (0, _http.httpRequest)(sdk, {
      url,
      method,
      args: data,
      headers
    });
    return resp;
  } catch (err) {
    if ((0, _dpop.isDPoPNonceError)(err) && !nonce) {
      const dpopNonce = err.resp?.headers['dpop-nonce'];
      if (!dpopNonce) {
        // throws error is dpop-nonce header cannot be found, prevents infinite loop
        throw new _errors.AuthApiError({
          errorSummary: 'No `dpop-nonce` header found when required'
        }, err.resp ?? undefined // yay ts
        );
      }

      return makeTokenRequest(sdk, {
        url,
        data,
        dpopKeyPair,
        nonce: dpopNonce
      });
    }
    throw err;
  }
}

// exchange authorization code for an access token
async function postToTokenEndpoint(sdk, options, urls) {
  validateOptions(options);
  var data = getPostData(sdk, options);
  const params = {
    url: urls.tokenUrl,
    data,
    dpopKeyPair: options?.dpopKeyPair
  };
  return makeTokenRequest(sdk, params);
}
async function postRefreshToken(sdk, options, refreshToken) {
  const data = Object.entries({
    client_id: options.clientId,
    // eslint-disable-line camelcase
    grant_type: 'refresh_token',
    // eslint-disable-line camelcase
    scope: refreshToken.scopes.join(' '),
    refresh_token: refreshToken.refreshToken // eslint-disable-line camelcase
  }).map(function ([name, value]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return name + '=' + encodeURIComponent(value);
  }).join('&');
  let url = refreshToken.tokenUrl;
  if (options.extraParams && Object.keys(options.extraParams).length >= 1) {
    url += (0, _util.toQueryString)(options.extraParams);
  }
  const params = {
    url,
    data,
    dpopKeyPair: options?.dpopKeyPair
  };
  return makeTokenRequest(sdk, params);
}
//# sourceMappingURL=token.js.map