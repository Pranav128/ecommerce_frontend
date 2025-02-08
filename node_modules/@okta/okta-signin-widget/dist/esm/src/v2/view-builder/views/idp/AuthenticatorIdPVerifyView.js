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
import { BaseIdPAuthenticatorBody, BaseIdpAuthenticatorView } from './BaseIdpAuthenticator.js';

const Body = BaseIdPAuthenticatorBody.extend({
  title: function () {
    const displayName = this.options.appState.getAuthenticatorDisplayName();
    return loc('oie.idp.challenge.title', 'login', [displayName]);
  },
  subtitle: function () {
    const displayName = this.options.appState.getAuthenticatorDisplayName();
    return loc('oie.idp.challenge.description', 'login', [displayName]);
  },
  save: function () {
    return loc('mfa.challenge.verify', 'login');
  }
});
var AuthenticatorIdPVerifyView = BaseIdpAuthenticatorView.extend({
  Body: Body
});

export { AuthenticatorIdPVerifyView as default };
//# sourceMappingURL=AuthenticatorIdPVerifyView.js.map
