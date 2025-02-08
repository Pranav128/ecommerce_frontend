import { loc, createCallout } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import '../../internals/BaseHeader.js';
import '../../internals/BaseFooter.js';
import BaseForm from '../../internals/BaseForm.js';
import '../../internals/BaseFormWithPolling.js';
import '../../internals/BaseOktaVerifyChallengeView.js';
import BaseView from '../../internals/BaseView.js';
import '../../components/AuthenticatorEnrollOptionsContainer.js';
import '../../components/AuthenticatorVerifyOptions.js';
import '../../../../../packages/@okta/courage-dist/esm/lib/underscore/underscore-min.js';
import 'cross-fetch';
import '../../../../util/BrowserFeatures.js';
import '../../../../util/FactorUtil.js';
import '../../../ion/RemediationConstants.js';
import '../../../../v1/views/admin-consent/ScopeList.js';
import '../../../../v1/views/consent/ScopeList.js';
import '../captcha/CaptchaView.js';
import EndUserRemediationMessages from '../end-user-remediation/EndUserRemediationMessages.js';

const DeviceAssuranceGracePeriodView = BaseForm.extend({
  title: function () {
    return loc('idx.device_assurance.grace_period.title', 'login');
  },
  save: function () {
    return loc('idx.device_assurance.grace_period.continue_to_app', 'login');
  },
  showMessages: function () {
    const messages = this.options.appState.get('messages').value;
    const languageCode = this.settings.get('languageCode');
    if (messages) {
      this.add(createCallout({
        content: new EndUserRemediationMessages({
          messages: messages,
          languageCode: languageCode
        }),
        type: 'warning'
      }));
    }
  }
});
var DeviceAssuranceGracePeriodView$1 = BaseView.extend({
  initialize: function () {
    BaseView.prototype.initialize.apply(this, arguments);
    this.Body = DeviceAssuranceGracePeriodView;
  }
});

export { DeviceAssuranceGracePeriodView$1 as default };
//# sourceMappingURL=DeviceAssuranceGracePeriodView.js.map
