import _Handlebars2 from '../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View, createButton, loc } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import Backbone_ListView from '../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { FORMS } from '../../ion/RemediationConstants.js';
import TimeUtil from '../../../util/TimeUtil.js';
import { AUTHENTICATOR_ALLOWED_FOR_OPTIONS } from '../utils/Constants.js';

const AuthenticatorRow = View.extend({
  className: 'authenticator-row clearfix',
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"factor-icon authenticator-icon " + alias3((helper = (helper = lookupProperty(helpers, "iconClassName") || (depth0 != null ? lookupProperty(depth0, "iconClassName") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "iconClassName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 100
          },
          "end": {
            "line": 1,
            "column": 117
          }
        }
      }) : helper)) + " custom-app-logo\" role=\"img\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.auth.logo.aria.label"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 158
          },
          "end": {
            "line": 1,
            "column": 213
          }
        }
      })) + "\"></div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"factor-icon authenticator-icon " + alias3((helper = (helper = lookupProperty(helpers, "iconClassName") || (depth0 != null ? lookupProperty(depth0, "iconClassName") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "iconClassName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 272
          },
          "end": {
            "line": 1,
            "column": 289
          }
        }
      }) : helper)) + "\" role=\"img\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.auth.logo.aria.label"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 314
          },
          "end": {
            "line": 1,
            "column": 369
          }
        }
      })) + "\"></div>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<span class=\"authenticator-grace-period-required-icon\"></span><div class=\"authenticator-grace-period-text-container\"><p class=\"authenticator-grace-period-required-description\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "gracePeriodRequiredDescription") || (depth0 != null ? lookupProperty(depth0, "gracePeriodRequiredDescription") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "gracePeriodRequiredDescription",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 702
          },
          "end": {
            "line": 1,
            "column": 736
          }
        }
      }) : helper)) + "</p>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "gracePeriodExpiry") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(6, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 740
          },
          "end": {
            "line": 1,
            "column": 847
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"authenticator-grace-period-expiry-date\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "gracePeriodExpiry") || (depth0 != null ? lookupProperty(depth0, "gracePeriodExpiry") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "gracePeriodExpiry",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 815
          },
          "end": {
            "line": 1,
            "column": 836
          }
        }
      }) : helper)) + "</p>";
    },
    "8": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "description") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(9, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 861
          },
          "end": {
            "line": 1,
            "column": 949
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "authenticatorUsageText") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(11, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 949
          },
          "end": {
            "line": 1,
            "column": 1052
          }
        }
      })) != null ? stack1 : "");
    },
    "9": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"authenticator-description--text\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "description") || (depth0 != null ? lookupProperty(depth0, "description") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "description",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 923
          },
          "end": {
            "line": 1,
            "column": 938
          }
        }
      }) : helper)) + "</p>";
    },
    "11": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"authenticator-usage-text\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "authenticatorUsageText") || (depth0 != null ? lookupProperty(depth0, "authenticatorUsageText") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "authenticatorUsageText",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1015
          },
          "end": {
            "line": 1,
            "column": 1041
          }
        }
      }) : helper)) + "</p>";
    },
    "13": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "data-se=\"" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "buttonDataSeAttr") || (depth0 != null ? lookupProperty(depth0, "buttonDataSeAttr") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "buttonDataSeAttr",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1126
          },
          "end": {
            "line": 1,
            "column": 1146
          }
        }
      }) : helper)) + "\"";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"authenticator-icon-container\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "logoUri") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(3, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 42
          },
          "end": {
            "line": 1,
            "column": 384
          }
        }
      })) != null ? stack1 : "") + "</div><div class=\"authenticator-description\"><h3 class=\"authenticator-label no-translate\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "label") || (depth0 != null ? lookupProperty(depth0, "label") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "label",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 474
          },
          "end": {
            "line": 1,
            "column": 483
          }
        }
      }) : helper)) + "</h3>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "gracePeriodRequiredDescription") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(5, data, 0),
        "inverse": container.program(8, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 488
          },
          "end": {
            "line": 1,
            "column": 1059
          }
        }
      })) != null ? stack1 : "") + "<div class=\"authenticator-button\" " + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "buttonDataSeAttr") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(13, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1093
          },
          "end": {
            "line": 1,
            "column": 1154
          }
        }
      })) != null ? stack1 : "") + "></div></div>";
    },
    "useData": true
  }),
  postRender: function () {
    View.prototype.postRender.apply(this, arguments);
    if (this.model.get('logoUri')) {
      this.el.querySelector('.custom-app-logo').style.backgroundImage = `url(${this.model.get('logoUri')})`;
    }
  },
  children: function () {
    return [[createButton({
      className: 'button select-factor',
      title: function () {
        return loc('oie.enroll.authenticator.button.text', 'login');
      },
      attributes: {
        'aria-label': this.model.get('ariaLabel')
      },
      click: function () {
        this.model.trigger('selectAuthenticator', this.model.get('value'));
      }
    }), '.authenticator-button']];
  },
  minimize: function () {
    this.$el.addClass('authenticator-row-min');
  },
  getTemplateData: function () {
    var _this$model$get, _this$model$get$grace;
    let authenticatorUsageText;
    const allowedFor = this.model.get('relatesTo').allowedFor;
    if (allowedFor) {
      switch (allowedFor) {
        case AUTHENTICATOR_ALLOWED_FOR_OPTIONS.ANY:
          authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.access.recovery', 'login');
          break;
        case AUTHENTICATOR_ALLOWED_FOR_OPTIONS.RECOVERY:
          authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.recovery', 'login');
          break;
        case AUTHENTICATOR_ALLOWED_FOR_OPTIONS.SSO:
          authenticatorUsageText = loc('oie.enroll.authenticator.usage.text.access', 'login');
          break;
      }
    }
    const data = View.prototype.getTemplateData.apply(this, arguments);
    const currentTimestampMs = Date.now();
    const gracePeriodEpochTimestampMs = new Date((_this$model$get = this.model.get('relatesTo')) === null || _this$model$get === void 0 ? void 0 : (_this$model$get$grace = _this$model$get.gracePeriod) === null || _this$model$get$grace === void 0 ? void 0 : _this$model$get$grace.expiry).getTime();
    if (!isNaN(gracePeriodEpochTimestampMs) && currentTimestampMs < gracePeriodEpochTimestampMs) {
      const remainingGracePeriodDays = TimeUtil.calculateDaysBetween(currentTimestampMs, gracePeriodEpochTimestampMs);
      if (remainingGracePeriodDays === 1) {
        data.gracePeriodRequiredDescription = loc('oie.enrollment.policy.grace.period.required.in.one.day', 'login');
      } else if (remainingGracePeriodDays > 1) {
        data.gracePeriodRequiredDescription = loc('oie.enrollment.policy.grace.period.required.in.days', 'login', [remainingGracePeriodDays]);
      } else {
        data.gracePeriodRequiredDescription = loc('oie.enrollment.policy.grace.period.required.today', 'login');
      }
      if (gracePeriodEpochTimestampMs) {
        data.gracePeriodExpiry = TimeUtil.formatDateToDeviceAssuranceGracePeriodExpiryLocaleString(new Date(gracePeriodEpochTimestampMs), this.settings.get('languageCode'), false);
      }
    }
    data.authenticatorUsageText = authenticatorUsageText;
    return data;
  }
});
var AuthenticatorEnrollOptions = Backbone_ListView.extend({
  className: 'authenticator-enroll-list authenticator-list',
  item: AuthenticatorRow,
  itemSelector: '.list-content',
  initialize: function () {
    this.listenTo(this.collection, 'selectAuthenticator', function (data) {
      this.model.set(this.options.name, data);
      this.options.appState.trigger('saveForm', this.model);
    });
    this.hasOptionalFactors = this.options.appState.hasRemediationObject(FORMS.SKIP);
  },
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"authenticator-list-subtitle\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "subtitle") || (depth0 != null ? lookupProperty(depth0, "subtitle") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "subtitle",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 134
          },
          "end": {
            "line": 1,
            "column": 146
          }
        }
      }) : helper)) + "</p>";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"list-content\"><div class=\"authenticator-list-title\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 64
          },
          "end": {
            "line": 1,
            "column": 73
          }
        }
      }) : helper)) + "</div>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "subtitle") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 79
          },
          "end": {
            "line": 1,
            "column": 157
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "useData": true
  }),
  getTemplateData: function () {
    // presence of the skip remediation form tells us that the authenticators are all optional
    const title = this.hasOptionalFactors ? loc('oie.setup.optional', 'login') : loc('oie.setup.required', 'login');
    return {
      title: this.options.listTitle || title,
      subtitle: this.options.listSubtitle || null
    };
  }
});

export { AuthenticatorEnrollOptions as default };
//# sourceMappingURL=AuthenticatorEnrollOptions.js.map
