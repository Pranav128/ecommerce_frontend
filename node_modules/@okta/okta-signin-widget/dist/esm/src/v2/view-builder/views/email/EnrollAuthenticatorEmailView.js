import BaseAuthenticatorEmailView from './BaseAuthenticatorEmailView.js';
import { getEnterCodeLink, getCheckYourEmailTitle, getCheckYourEmailEnrollTitle } from './AuthenticatorEmailViewUtil.js';

const BaseAuthenticatorEmailForm = BaseAuthenticatorEmailView.prototype.Body;
const Body = BaseAuthenticatorEmailForm.extend(Object.assign({
  resendEmailAction: 'currentAuthenticator-resend',
  initialize: function () {
    var _this$options$appStat, _this$options$appStat2, _this$options$appStat3;
    BaseAuthenticatorEmailForm.prototype.initialize.apply(this, arguments);
    const email = ((_this$options$appStat = this.options.appState.get('user')) === null || _this$options$appStat === void 0 ? void 0 : (_this$options$appStat2 = _this$options$appStat.profile) === null || _this$options$appStat2 === void 0 ? void 0 : _this$options$appStat2.email) || ((_this$options$appStat3 = this.options.appState.get('user')) === null || _this$options$appStat3 === void 0 ? void 0 : _this$options$appStat3.identifier) || {};
    const useEmailMagicLinkValue = this.isUseEmailMagicLink();
    if (useEmailMagicLinkValue !== undefined) {
      this.noButtonBar = true;
      this.events['click .enter-auth-code-instead-link'] = 'showAuthCodeEntry';
      if (useEmailMagicLinkValue) {
        this.add(getEnterCodeLink(), {
          prepend: true,
          selector: '.o-form-error-container'
        });
      }
      this.add(getCheckYourEmailTitle(), {
        prepend: true,
        selector: '.o-form-error-container',
        options: {
          email: email,
          useEmailMagicLinkValue: useEmailMagicLinkValue
        }
      });
    } else {
      this.add(getCheckYourEmailEnrollTitle(), {
        prepend: true,
        selector: '.o-form-error-container'
      });
    }
  },
  postRender: function () {
    BaseAuthenticatorEmailForm.prototype.postRender.apply(this, arguments);
    if (this.isUseEmailMagicLink() !== undefined) {
      if (this.isUseEmailMagicLink()) {
        this.showCodeEntryField(false);
      } else {
        this.noButtonBar = false;
      }
    }
  },
  isUseEmailMagicLink: function () {
    var _this$options$appStat4, _this$options$appStat5;
    return (_this$options$appStat4 = this.options.appState.get('currentAuthenticator')) === null || _this$options$appStat4 === void 0 ? void 0 : (_this$options$appStat5 = _this$options$appStat4.contextualData) === null || _this$options$appStat5 === void 0 ? void 0 : _this$options$appStat5.useEmailMagicLink;
  },
  showAuthCodeEntry: function () {
    this.noButtonBar = false;
    this.render();
    this.showCodeEntryField(true);
    this.removeEnterAuthCodeInsteadLink();
  },
  showCodeEntryField: function (show = true) {
    const $textField = this.$el.find('.o-form-fieldset-container');
    $textField.toggle(show);
  },
  removeEnterAuthCodeInsteadLink: function () {
    this.$el.find('.enter-auth-code-instead-link').remove();
  }
}));
var EnrollAuthenticatorEmailView = BaseAuthenticatorEmailView.extend({
  Body: Body
});

export { EnrollAuthenticatorEmailView as default };
//# sourceMappingURL=EnrollAuthenticatorEmailView.js.map
