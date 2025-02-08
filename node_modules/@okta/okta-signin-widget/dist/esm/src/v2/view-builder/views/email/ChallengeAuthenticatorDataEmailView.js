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
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView.js';

const BaseAuthenticatorEmailForm = BaseAuthenticatorView.prototype.Body;
const SubtitleView = View.extend({
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "secondaryEmail") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.program(4, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 70
          },
          "end": {
            "line": 1,
            "column": 471
          }
        }
      })) != null ? stack1 : "";
    },
    "2": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$2": "<span class='strong no-translate'>$2</span>",
          "$1": "<span class='strong no-translate'>$1</span>",
          "arguments": "email;secondaryEmail",
          "bundle": "login",
          "code": "oie.email.verify.subtitle.text.with.email.and.secondary.email"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 92
          },
          "end": {
            "line": 1,
            "column": 316
          }
        }
      }));
    },
    "4": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='strong no-translate'>$1</span>",
          "arguments": "email",
          "bundle": "login",
          "code": "oie.email.verify.subtitle.text.with.email"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 324
          },
          "end": {
            "line": 1,
            "column": 464
          }
        }
      }));
    },
    "6": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.email.verify.subtitle.text.without.email"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 479
          },
          "end": {
            "line": 1,
            "column": 555
          }
        }
      }));
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"okta-form-subtitle\" data-se=\"o-form-explain\">" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "email") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(6, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 57
          },
          "end": {
            "line": 1,
            "column": 562
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "useData": true
  }),
  getTemplateData: function () {
    var _this$options$appStat, _this$options$appStat2, _this$options$appStat3, _this$options$appStat4;
    const email = (_this$options$appStat = this.options.appState.get('currentAuthenticatorEnrollment')) === null || _this$options$appStat === void 0 ? void 0 : (_this$options$appStat2 = _this$options$appStat.profile) === null || _this$options$appStat2 === void 0 ? void 0 : _this$options$appStat2.email;
    const secondaryEmail = (_this$options$appStat3 = this.options.appState.get('currentAuthenticatorEnrollment')) === null || _this$options$appStat3 === void 0 ? void 0 : (_this$options$appStat4 = _this$options$appStat3.profile) === null || _this$options$appStat4 === void 0 ? void 0 : _this$options$appStat4.secondaryEmail;
    return {
      email: email,
      secondaryEmail: secondaryEmail
    };
  }
});
const Body = BaseAuthenticatorEmailForm.extend({
  title: function () {
    return loc('oie.email.challenge.mfa.title', 'login');
  },
  save: function () {
    return loc('oie.email.verify.primaryButton', 'login');
  },
  postRender: function () {
    BaseAuthenticatorEmailForm.prototype.postRender.apply(this, arguments);
    this.add(SubtitleView, {
      prepend: true,
      selector: '.o-form-info-container'
    });
  },
  getUISchema: function () {
    // Prevent from displaying radio buttons on the UI
    const uiSchemas = BaseAuthenticatorEmailForm.prototype.getUISchema.apply(this, arguments);
    return uiSchemas.filter(schema => schema.name !== 'authenticator.methodType');
  }
});
var ChallengeAuthenticatorDataEmailView = BaseAuthenticatorView.extend({
  Body: Body
});

export { ChallengeAuthenticatorDataEmailView as default };
//# sourceMappingURL=ChallengeAuthenticatorDataEmailView.js.map
