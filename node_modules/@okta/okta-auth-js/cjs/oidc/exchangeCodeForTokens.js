"use strict";

exports.exchangeCodeForTokens = exchangeCodeForTokens;
var _util = require("./util");
var _util2 = require("../util");
var _token = require("./endpoints/token");
var _handleOAuthResponse = require("./handleOAuthResponse");
var _dpop = require("./dpop");
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
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

// codeVerifier is required. May pass either an authorizationCode or interactionCode
async function exchangeCodeForTokens(sdk, tokenParams, urls) {
  urls = urls || (0, _util.getOAuthUrls)(sdk, tokenParams);
  // build params using defaults + options
  tokenParams = Object.assign({}, (0, _util.getDefaultTokenParams)(sdk), (0, _util2.clone)(tokenParams));
  const {
    authorizationCode,
    interactionCode,
    codeVerifier,
    clientId,
    redirectUri,
    scopes,
    ignoreSignature,
    state,
    acrValues,
    dpop,
    dpopPairId,
    extraParams
  } = tokenParams;

  // postToTokenEndpoint() params
  const getTokenOptions = {
    clientId,
    redirectUri,
    authorizationCode,
    interactionCode,
    codeVerifier,
    dpop
  };

  // `handleOAuthResponse` hanadles responses from both `/authorize` and `/token` endpoints
  // Here we modify the response from `/token` so that it more closely matches a response from `/authorize`
  // `responseType` is used to validate that the expected tokens were returned
  const responseType = ['token']; // an accessToken will always be returned
  if (scopes.indexOf('openid') !== -1) {
    responseType.push('id_token'); // an idToken will be returned if "openid" is in the scopes
  }
  // handleOAuthResponse() params
  const handleResponseOptions = {
    clientId,
    redirectUri,
    scopes,
    responseType,
    ignoreSignature,
    acrValues,
    extraParams
  };
  try {
    if (dpop) {
      // token refresh, KP should already exist
      if (dpopPairId) {
        const keyPair = await (0, _dpop.findKeyPair)(dpopPairId);
        getTokenOptions.dpopKeyPair = keyPair;
        handleResponseOptions.dpop = dpop;
        handleResponseOptions.dpopPairId = dpopPairId;
      } else {
        const {
          keyPair,
          keyPairId
        } = await (0, _dpop.createDPoPKeyPair)();
        getTokenOptions.dpopKeyPair = keyPair;
        handleResponseOptions.dpop = dpop;
        handleResponseOptions.dpopPairId = keyPairId;
      }
    }
    const oauthResponse = await (0, _token.postToTokenEndpoint)(sdk, getTokenOptions, urls);
    const tokenResponse = await (0, _handleOAuthResponse.handleOAuthResponse)(sdk, handleResponseOptions, oauthResponse, urls);
    tokenResponse.code = authorizationCode;
    tokenResponse.state = state;
    return tokenResponse;
  } finally {
    sdk.transactionManager.clear();
  }
}
//# sourceMappingURL=exchangeCodeForTokens.js.map