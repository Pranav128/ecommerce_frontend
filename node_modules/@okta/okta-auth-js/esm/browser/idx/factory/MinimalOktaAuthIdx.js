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

import { mixinMinimalIdx } from '../mixinMinimal.js';
import { createOktaAuthBase } from '../../base/factory.js';
import { mixinStorage } from '../../storage/mixin.js';
import { mixinHttp } from '../../http/mixin.js';
import { mixinSession } from '../../session/mixin.js';
import { mixinMinimalOAuth } from '../../oidc/mixin/minimal.js';

function createMinimalOktaAuthIdx(StorageManagerConstructor, OptionsConstructor, TransactionManagerConstructor) {
    const Base = createOktaAuthBase(OptionsConstructor);
    const WithStorage = mixinStorage(Base, StorageManagerConstructor);
    const WithHttp = mixinHttp(WithStorage);
    const WithSession = mixinSession(WithHttp);
    const WithOAuth = mixinMinimalOAuth(WithSession, TransactionManagerConstructor);
    const WithIdx = mixinMinimalIdx(WithOAuth);
    return WithIdx;
}

export { createMinimalOktaAuthIdx };
//# sourceMappingURL=MinimalOktaAuthIdx.js.map
