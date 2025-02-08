import '../../internals/BaseHeader.js';
import '../../internals/BaseFooter.js';
import BaseForm from '../../internals/BaseForm.js';
import '../../internals/BaseFormWithPolling.js';
import '../../internals/BaseOktaVerifyChallengeView.js';
import { loc } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
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

const Body = BaseForm.extend({
  noButtonBar: true,
  title: function () {
    return loc('oie.select.authenticators.verify.title', 'login');
  },
  subtitle: function () {
    return loc('oie.select.authenticators.verify.subtitle', 'login');
  }
});
var SelectAuthenticatorUnlockAccountView = BaseView.extend({
  Body: Body
});

export { SelectAuthenticatorUnlockAccountView as default };
//# sourceMappingURL=SelectAuthenticatorUnlockAccountView.js.map
