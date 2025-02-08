"use strict";

exports.createMinimalIdxAPI = createMinimalIdxAPI;
var _idxState = require("../idxState");
var _proceed = require("../proceed");
var _startTransaction = require("../startTransaction");
var _transactionMeta = require("../transactionMeta");
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

// Factory
function createMinimalIdxAPI(minimalSdk) {
  const sdk = minimalSdk;
  const boundStartTransaction = _startTransaction.startTransaction.bind(null, sdk);
  const idx = {
    makeIdxResponse: _idxState.makeIdxState.bind(null, sdk),
    start: boundStartTransaction,
    startTransaction: boundStartTransaction,
    // Use `start` instead. `startTransaction` will be removed in 7.0
    proceed: _proceed.proceed.bind(null, sdk),
    canProceed: _proceed.canProceed.bind(null, sdk),
    getSavedTransactionMeta: _transactionMeta.getSavedTransactionMeta.bind(null, sdk),
    createTransactionMeta: _transactionMeta.createTransactionMeta.bind(null, sdk),
    getTransactionMeta: _transactionMeta.getTransactionMeta.bind(null, sdk),
    saveTransactionMeta: _transactionMeta.saveTransactionMeta.bind(null, sdk),
    clearTransactionMeta: _transactionMeta.clearTransactionMeta.bind(null, sdk),
    isTransactionMetaValid: _transactionMeta.isTransactionMetaValid
  };
  return idx;
}
//# sourceMappingURL=minimalApi.js.map