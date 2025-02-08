import { createButton, loc } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
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

const skipAll = createButton({
  className: 'button-primary button skip-all',
  title: function () {
    return loc('oie.optional.authenticator.button.title', 'login');
  },
  click: function () {
    this.options.appState.trigger('invokeAction', FORMS.SKIP);
  }
});

export { skipAll as default };
//# sourceMappingURL=SkipOptionalEnrollmentButton.js.map
