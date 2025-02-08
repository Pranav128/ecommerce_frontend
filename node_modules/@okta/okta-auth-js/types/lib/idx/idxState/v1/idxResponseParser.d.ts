/*!
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import { OktaAuthIdxInterface, IdxResponse, IdxRemediation, IdxContext } from '../../types';
import { IdxActions } from '../../types/idx-js';
export declare const parseNonRemediations: (authClient: OktaAuthIdxInterface, idxResponse: IdxResponse, toPersist?: {}) => {
    context: IdxContext;
    actions: {};
};
export declare const parseIdxResponse: (authClient: OktaAuthIdxInterface, idxResponse: any, toPersist?: {}) => {
    remediations: IdxRemediation[];
    context: IdxContext;
    actions: IdxActions;
};
