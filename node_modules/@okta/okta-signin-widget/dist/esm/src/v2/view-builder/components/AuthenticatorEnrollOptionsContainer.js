import { View, Collection, loc } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { FORMS } from '../../ion/RemediationConstants.js';
import AuthenticatorEnrollOptions from './AuthenticatorEnrollOptions.js';
import remindMeLater from './RemindMeLaterButton.js';
import skipAll from './SkipOptionalEnrollmentButton.js';

/*!
 * Copyright (c) 2020, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
var AuthenticatorEnrollOptionsContainer = View.extend({
  className: 'authenticator-enroll-list-container',
  initialize: function () {
    var _this$options$optionI;
    const authenticatorsWithGracePeriod = [];
    const authenticators = [];
    this.options.optionItems.forEach(authenticator => {
      var _authenticator$relate, _authenticator$relate2, _authenticator$relate3, _authenticator$relate4;
      if ((_authenticator$relate = authenticator.relatesTo) !== null && _authenticator$relate !== void 0 && (_authenticator$relate2 = _authenticator$relate.gracePeriod) !== null && _authenticator$relate2 !== void 0 && _authenticator$relate2.expiry && new Date((_authenticator$relate3 = authenticator.relatesTo) === null || _authenticator$relate3 === void 0 ? void 0 : (_authenticator$relate4 = _authenticator$relate3.gracePeriod) === null || _authenticator$relate4 === void 0 ? void 0 : _authenticator$relate4.expiry).getTime() > Date.now()) {
        authenticatorsWithGracePeriod.push(authenticator);
      } else {
        authenticators.push(authenticator);
      }
    });
    this.hasSkipRemediation = !!this.options.appState.hasRemediationObject(FORMS === null || FORMS === void 0 ? void 0 : FORMS.SKIP);
    this.hasOnlyOptional = this.hasSkipRemediation && (authenticatorsWithGracePeriod === null || authenticatorsWithGracePeriod === void 0 ? void 0 : authenticatorsWithGracePeriod.length) === 0;
    this.hasOnlyGracePeriod = this.hasSkipRemediation && ((_this$options$optionI = this.options.optionItems) === null || _this$options$optionI === void 0 ? void 0 : _this$options$optionI.length) === (authenticatorsWithGracePeriod === null || authenticatorsWithGracePeriod === void 0 ? void 0 : authenticatorsWithGracePeriod.length);
    if (authenticators.length) {
      this.add(new AuthenticatorEnrollOptions({
        ...this.options,
        collection: new Collection(authenticators),
        optionItems: authenticators,
        listTitle: this.hasOnlyOptional ? loc('oie.setup.optional.short', 'login') : loc('oie.setup.required.now', 'login')
      }));
    }
    if (authenticatorsWithGracePeriod.length) {
      this.add(new AuthenticatorEnrollOptions({
        ...this.options,
        collection: new Collection(authenticatorsWithGracePeriod),
        optionItems: authenticatorsWithGracePeriod,
        listTitle: loc('oie.setup.required.soon', 'login'),
        listSubtitle: loc('oie.setup.required.soon.description', 'login')
      }));
    }
    if (this.hasOnlyGracePeriod) {
      this.add(remindMeLater);
    } else if (this.hasOnlyOptional) {
      this.add(skipAll);
    }
  }
});

export { AuthenticatorEnrollOptionsContainer as default };
//# sourceMappingURL=AuthenticatorEnrollOptionsContainer.js.map
