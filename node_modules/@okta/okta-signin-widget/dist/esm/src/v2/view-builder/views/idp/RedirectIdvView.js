import _Handlebars2 from '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View, loc } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { BaseIdPAuthenticatorBody, BaseIdpAuthenticatorView } from './BaseIdpAuthenticator.js';
import '../../internals/BaseHeader.js';
import BaseFooter from '../../internals/BaseFooter.js';
import '../../internals/BaseForm.js';
import '../../internals/BaseFormWithPolling.js';
import '../../internals/BaseOktaVerifyChallengeView.js';
import '../../internals/BaseView.js';
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
import { getIdvName, getHelpLinks } from '../../utils/IdpUtil.js';

const PrivacyTermsFooterView = View.extend({
  tagName: 'p',
  className: 'privacy-footer',
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "$2": "<a class='inline-link' data-se='privacy-policy' target='_blank' rel='noopener noreferrer'>$2</a>",
          "$1": "<a class='inline-link' data-se='terms-of-use' target='_blank' rel='noopener noreferrer'>$1</a>",
          "arguments": "idpName",
          "bundle": "login",
          "code": "oie.idv.idp.desc.termsOfUse"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3
          },
          "end": {
            "line": 1,
            "column": 283
          }
        }
      })) + "</p><p>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "arguments": "idpName",
          "bundle": "login",
          "code": "oie.idv.idp.desc.agreement"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 290
          },
          "end": {
            "line": 1,
            "column": 367
          }
        }
      })) + "</p>";
    },
    "useData": true
  }),
  getTemplateData: function () {
    const idpName = getIdvName(this.options.appState.get('remediations'));
    return {
      idpName: idpName
    };
  }
});
const Body = BaseIdPAuthenticatorBody.extend({
  title: function () {
    return loc('oie.idv.idp.title', 'login', [getIdvName(this.options.appState.get('remediations'))]);
  },
  subtitle: function () {
    return loc('oie.idv.idp.desc', 'login', [getIdvName(this.options.appState.get('remediations'))]);
  },
  save: function () {
    return loc('oie.optional.authenticator.button.title', 'login');
  }
});
var RedirectIdvView = BaseIdpAuthenticatorView.extend({
  Body: Body,
  Footer: BaseFooter.extend({
    postRender: function () {
      this.add(PrivacyTermsFooterView);
      const {
        termsOfUse: termsOfUse,
        privacyPolicy: privacyPolicy
      } = getHelpLinks(this.options.appState.get('remediations'));
      this.$el.find('[data-se="terms-of-use"]').attr('href', termsOfUse);
      this.$el.find('[data-se="privacy-policy"]').attr('href', privacyPolicy);
    }
  })
});

export { RedirectIdvView as default };
//# sourceMappingURL=RedirectIdvView.js.map
