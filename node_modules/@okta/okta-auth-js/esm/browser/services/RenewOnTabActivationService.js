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

import { isBrowser } from '../features.js';

const getNow = () => Math.floor(Date.now() / 1000);
class RenewOnTabActivationService {
    constructor(tokenManager, options = {}) {
        this.started = false;
        this.lastHidden = -1;
        this.tokenManager = tokenManager;
        this.options = options;
        this.onPageVisbilityChange = this._onPageVisbilityChange.bind(this);
    }
    _onPageVisbilityChange() {
        if (document.hidden) {
            this.lastHidden = getNow();
        }
        else if (this.lastHidden > 0 && (getNow() - this.lastHidden >= this.options.tabInactivityDuration)) {
            const { accessToken, idToken } = this.tokenManager.getTokensSync();
            if (!!accessToken && this.tokenManager.hasExpired(accessToken)) {
                const key = this.tokenManager.getStorageKeyByType('accessToken');
                this.tokenManager.renew(key).catch(() => { });
            }
            else if (!!idToken && this.tokenManager.hasExpired(idToken)) {
                const key = this.tokenManager.getStorageKeyByType('idToken');
                this.tokenManager.renew(key).catch(() => { });
            }
        }
    }
    async start() {
        if (this.canStart() && !!document) {
            document.addEventListener('visibilitychange', this.onPageVisbilityChange);
            this.started = true;
        }
    }
    async stop() {
        if (document) {
            document.removeEventListener('visibilitychange', this.onPageVisbilityChange);
            this.started = false;
        }
    }
    canStart() {
        return isBrowser() &&
            !!this.options.autoRenew &&
            !!this.options.renewOnTabActivation &&
            !this.started;
    }
    requiresLeadership() {
        return false;
    }
    isStarted() {
        return this.started;
    }
}

export { RenewOnTabActivationService };
//# sourceMappingURL=RenewOnTabActivationService.js.map
