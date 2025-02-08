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

const jsonpathRegex = /\$?(?<step>\w+)|(?:\[(?<index>\d+)\])/g;
function jsonpath({ path, json }) {
    var _a, _b, _c;
    const steps = [];
    let match;
    while ((match = jsonpathRegex.exec(path)) !== null) {
        const step = (_b = (_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.step) !== null && _b !== void 0 ? _b : (_c = match === null || match === void 0 ? void 0 : match.groups) === null || _c === void 0 ? void 0 : _c.index;
        if (step) {
            steps.push(step);
        }
    }
    if (steps.length < 1) {
        return undefined;
    }
    const lastStep = steps.pop();
    let curr = json;
    for (const step of steps) {
        if (Object.prototype.hasOwnProperty.call(curr, step)) {
            if (typeof curr[step] !== 'object') {
                return undefined;
            }
            curr = curr[step];
        }
    }
    return curr[lastStep];
}

export { jsonpath };
//# sourceMappingURL=jsonpath.js.map
