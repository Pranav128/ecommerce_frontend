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

import { Authenticator } from './Authenticator.js';

class OktaPassword extends Authenticator {
    canVerify(values) {
        return !!(values.credentials || values.password || values.passcode);
    }
    mapCredentials(values) {
        const { credentials, password, passcode, revokeSessions } = values;
        if (!credentials && !password && !passcode) {
            return;
        }
        return credentials || {
            passcode: passcode || password,
            revokeSessions,
        };
    }
    getInputs(idxRemediationValue) {
        var _a, _b;
        const inputs = [Object.assign(Object.assign({}, (_a = idxRemediationValue.form) === null || _a === void 0 ? void 0 : _a.value[0]), { name: 'password', type: 'string', required: idxRemediationValue.required })];
        const revokeSessions = (_b = idxRemediationValue.form) === null || _b === void 0 ? void 0 : _b.value.find(input => input.name === 'revokeSessions');
        if (revokeSessions) {
            inputs.push({
                name: 'revokeSessions',
                type: 'boolean',
                label: 'Sign me out of all other devices',
                required: false,
            });
        }
        return inputs;
    }
}

export { OktaPassword };
//# sourceMappingURL=OktaPassword.js.map
