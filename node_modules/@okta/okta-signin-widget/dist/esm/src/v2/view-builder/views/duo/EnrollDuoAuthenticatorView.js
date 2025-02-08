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
import BaseDuoAuthenticatorForm from './BaseDuoAuthenticatorForm.js';
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView.js';

const Body = BaseDuoAuthenticatorForm.extend({
  title: function () {
    return loc('oie.duo.enroll.title', 'login');
  },
  getContextualData: function () {
    return this.options.appState.get('currentAuthenticator').contextualData;
  }
});
var EnrollDuoAuthenticatorView = BaseAuthenticatorView.extend({
  Body: Body
});

export { EnrollDuoAuthenticatorView as default };
//# sourceMappingURL=EnrollDuoAuthenticatorView.js.map
