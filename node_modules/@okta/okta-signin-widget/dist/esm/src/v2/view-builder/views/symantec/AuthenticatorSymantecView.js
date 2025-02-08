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
import BaseForm from '../../internals/BaseForm.js';
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView.js';

const Body = BaseForm.extend({
  title: function () {
    const displayName = this.options.appState.getAuthenticatorDisplayName();
    return this.options.appState.isAuthenticatorChallenge() ? loc('oie.symantecVip.challenge.title', 'login', [displayName]) : loc('oie.symantecVip.enroll.title', 'login', [displayName]);
  },
  subtitle: function () {
    const displayName = this.options.appState.getAuthenticatorDisplayName();
    return this.options.appState.isAuthenticatorChallenge() ? loc('oie.symantecVip.challenge.description', 'login', [displayName]) : loc('oie.symantecVip.enroll.description', 'login', [displayName]);
  },
  save: function () {
    return this.options.appState.isAuthenticatorChallenge() ? loc('mfa.challenge.verify', 'login') : loc('mfa.enroll', 'login');
  }
});
var AuthenticatorSymantecView = BaseAuthenticatorView.extend({
  Body: Body
});

export { AuthenticatorSymantecView as default };
//# sourceMappingURL=AuthenticatorSymantecView.js.map
