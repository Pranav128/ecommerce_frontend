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

import CustomError from './CustomError.js';
import { isFunction } from '../util/types.js';

class WWWAuthError extends CustomError {
    constructor(scheme, parameters, resp) {
        var _a;
        super((_a = parameters.error) !== null && _a !== void 0 ? _a : WWWAuthError.UNKNOWN_ERROR);
        this.name = 'WWWAuthError';
        this.resp = null;
        this.scheme = scheme;
        this.parameters = parameters;
        if (resp) {
            this.resp = resp;
        }
    }
    get error() { return this.parameters.error; }
    get errorCode() { return this.error; }
    get error_description() { return this.parameters.error_description; }
    get errorDescription() { return this.error_description; }
    get errorSummary() { return this.errorDescription; }
    get realm() { return this.parameters.realm; }
    static parseHeader(header) {
        var _a;
        if (!header) {
            return null;
        }
        const regex = /(?:,|, )?([a-zA-Z0-9!#$%&'*+\-.^_`|~]+)=(?:"([a-zA-Z0-9!#$%&'*+\-.,^_`|~ /:]+)"|([a-zA-Z0-9!#$%&'*+\-.^_`|~/:]+))/g;
        const firstSpace = header.indexOf(' ');
        const scheme = header.slice(0, firstSpace);
        const remaining = header.slice(firstSpace + 1);
        const params = {};
        let match;
        while ((match = regex.exec(remaining)) !== null) {
            params[match[1]] = ((_a = match[2]) !== null && _a !== void 0 ? _a : match[3]);
        }
        return new WWWAuthError(scheme, params);
    }
    static getWWWAuthenticateHeader(headers = {}) {
        var _a;
        if (isFunction(headers === null || headers === void 0 ? void 0 : headers.get)) {
            return headers.get('WWW-Authenticate');
        }
        return (_a = headers['www-authenticate']) !== null && _a !== void 0 ? _a : headers['WWW-Authenticate'];
    }
}
WWWAuthError.UNKNOWN_ERROR = 'UNKNOWN_WWW_AUTH_ERROR';

export { WWWAuthError as default };
//# sourceMappingURL=WWWAuthError.js.map
