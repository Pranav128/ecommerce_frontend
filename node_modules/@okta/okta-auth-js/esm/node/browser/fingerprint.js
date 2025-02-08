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

import AuthSdkError from '../errors/AuthSdkError.js';
import '../errors/WWWAuthError.js';
import { isFingerprintSupported } from '../features.js';
import '../crypto/node.js';
import { addListener, removeListener } from '../oidc/util/browser.js';
import '../http/request.js';
import 'tiny-emitter';
import '../server/serverStorage.js';
import 'cross-fetch';
import '../oidc/types/Token.js';
import '../_virtual/_tslib.js';

const isMessageFromCorrectSource = (iframe, event) => event.source === iframe.contentWindow;
function fingerprint(sdk, options) {
    var _a;
    if (!isFingerprintSupported()) {
        return Promise.reject(new AuthSdkError('Fingerprinting is not supported on this device'));
    }
    const container = (_a = options === null || options === void 0 ? void 0 : options.container) !== null && _a !== void 0 ? _a : document.body;
    let timeout;
    let iframe;
    let listener;
    const promise = new Promise(function (resolve, reject) {
        iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        listener = function listener(e) {
            var _a;
            if (!isMessageFromCorrectSource(iframe, e)) {
                return;
            }
            if (!e || !e.data || e.origin !== sdk.getIssuerOrigin()) {
                return;
            }
            let msg;
            try {
                msg = JSON.parse(e.data);
            }
            catch (err) {
                return;
            }
            if (!msg) {
                return;
            }
            if (msg.type === 'FingerprintAvailable') {
                return resolve(msg.fingerprint);
            }
            else if (msg.type === 'FingerprintServiceReady') {
                (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(JSON.stringify({
                    type: 'GetFingerprint'
                }), e.origin);
            }
            else {
                return reject(new AuthSdkError('No data'));
            }
        };
        addListener(window, 'message', listener);
        iframe.src = sdk.getIssuerOrigin() + '/auth/services/devicefingerprint';
        container.appendChild(iframe);
        timeout = setTimeout(function () {
            reject(new AuthSdkError('Fingerprinting timed out'));
        }, (options === null || options === void 0 ? void 0 : options.timeout) || 15000);
    });
    return promise.finally(function () {
        var _a;
        clearTimeout(timeout);
        removeListener(window, 'message', listener);
        if (container.contains(iframe)) {
            (_a = iframe.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(iframe);
        }
    });
}

export { fingerprint as default };
//# sourceMappingURL=fingerprint.js.map
