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

const generateGeolocationString = (location = {}) => {
  if (!location.city && !location.country) {
    return null;
  }
  // Use 1 of 2 formats based on presence of 'state' in response:
  // 1. City, State, Country
  // 2. City, Country
  return location.state ? loc('geolocation.formatting.all', 'login', [location.city, location.state, location.country]) : loc('geolocation.formatting.partial', 'login', [location.city, location.country]);
};

// A map from FactorTransactionIntent in okta-core to customer-facing flow name
const challengeIntentToI18nKeyMap = {
  'AUTHENTICATION': 'idx.return.link.otponly.enter.code.on.sign.in.page',
  'RECOVERY': 'idx.return.link.otponly.enter.code.on.password.reset.page',
  'UNLOCK_ACCOUNT': 'idx.return.link.otponly.enter.code.on.account.unlock.page',
  'ENROLLMENT': 'idx.return.link.otponly.enter.code.on.sign.up.page'
};
const getTerminalOtpEmailMagicLinkContext = (settings, appState) => {
  var _appState$get, _appState$get$context;
  const app = appState.get('app');
  const client = appState.get('client');
  const challengeIntentContentKey = challengeIntentToI18nKeyMap[appState.get('idx').context.intent];
  const enterCodeOnFlowPage = challengeIntentContentKey ? loc(challengeIntentContentKey, 'login') : loc('idx.enter.otp.in.original.tab', 'login');
  let appName, browserOnOsString, isMobileDevice, geolocation;
  if (app !== null && app !== void 0 && app.label) {
    appName = loc('idx.return.link.otponly.app', 'login', [app.label]);
  }
  if (client) {
    browserOnOsString = loc('idx.return.link.otponly.browser.on.os', 'login', [client.browser, client.os]);
    isMobileDevice = browserOnOsString.includes('Android') || browserOnOsString.includes('iOS');
    geolocation = generateGeolocationString(client.location);
  }
  const otp = settings.get('otp') || ((_appState$get = appState.get('currentAuthenticator')) === null || _appState$get === void 0 ? void 0 : (_appState$get$context = _appState$get.contextualData) === null || _appState$get$context === void 0 ? void 0 : _appState$get$context.otp);
  return {
    showRequestInfo: appName || browserOnOsString || geolocation,
    appName: appName,
    browserOnOsString: browserOnOsString,
    isMobileDevice: isMobileDevice,
    geolocation: geolocation,
    otp: otp,
    enterCodeOnFlowPage: enterCodeOnFlowPage
  };
};
const BaseEmailMagicLinkOTPTerminalView = View.extend({
  getTemplateData: function () {
    return getTerminalOtpEmailMagicLinkContext(this.options.settings, this.options.appState);
  }
});
const OTPInformationTerminalView = BaseEmailMagicLinkOTPTerminalView.extend({
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "<div class=\"enduser-email-otp-only--info\"><div class=\"okta-form-label\">" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "idx.return.link.otponly.request"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 198
          },
          "end": {
            "line": 1,
            "column": 260
          }
        }
      })) + "</div></div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"enduser-email-otp-only--info\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "isMobileDevice") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(4, data, 0),
        "inverse": container.program(6, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 346
          },
          "end": {
            "line": 1,
            "column": 540
          }
        }
      })) != null ? stack1 : "") + "<div data-se=\"otp-browser-os\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "browserOnOsString") || (depth0 != null ? lookupProperty(depth0, "browserOnOsString") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "browserOnOsString",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 570
          },
          "end": {
            "line": 1,
            "column": 591
          }
        }
      }) : helper)) + "</div></div>";
    },
    "4": function (container, depth0, helpers, partials, data) {
      return "<i class=\"enduser-email-otp-only--icon icon--smartphone\" aria-hidden=\"true\"></i>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      return "<i class=\"enduser-email-otp-only--icon icon--desktop\" aria-hidden=\"true\"></i>";
    },
    "8": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"enduser-email-otp-only--info\"><i class=\"enduser-email-otp-only--icon icon--app\" aria-hidden=\"true\"></i><div data-se=\"otp-app\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "appName") || (depth0 != null ? lookupProperty(depth0, "appName") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "appName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 763
          },
          "end": {
            "line": 1,
            "column": 774
          }
        }
      }) : helper)) + "</div></div>";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"enduser-email-otp-only--info\"><i class=\"enduser-email-otp-only--icon icon--location\" aria-hidden=\"true\"></i><div data-se=\"otp-geolocation\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "geolocation") || (depth0 != null ? lookupProperty(depth0, "geolocation") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "geolocation",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 963
          },
          "end": {
            "line": 1,
            "column": 978
          }
        }
      }) : helper)) + "</div></div>";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"enter-code-on-page\">" + alias4((helper = (helper = lookupProperty(helpers, "enterCodeOnFlowPage") || (depth0 != null ? lookupProperty(depth0, "enterCodeOnFlowPage") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "enterCodeOnFlowPage",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 30
          },
          "end": {
            "line": 1,
            "column": 53
          }
        }
      }) : helper)) + "</p><h1 class='otp-value no-translate'>" + alias4((helper = (helper = lookupProperty(helpers, "otp") || (depth0 != null ? lookupProperty(depth0, "otp") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "otp",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 92
          },
          "end": {
            "line": 1,
            "column": 99
          }
        }
      }) : helper)) + "</h1>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "showRequestInfo") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 104
          },
          "end": {
            "line": 1,
            "column": 279
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "browserOnOsString") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 279
          },
          "end": {
            "line": 1,
            "column": 610
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "appName") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(8, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 610
          },
          "end": {
            "line": 1,
            "column": 793
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "geolocation") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(10, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 793
          },
          "end": {
            "line": 1,
            "column": 997
          }
        }
      })) != null ? stack1 : "") + "<br><p class='otp-warning'>" + alias4((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "idx.return.link.otponly.warning.text"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1024
          },
          "end": {
            "line": 1,
            "column": 1091
          }
        }
      })) + "</p>";
    },
    "useData": true
  })
});

export { OTPInformationTerminalView };
//# sourceMappingURL=EmailMagicLinkOTPTerminalView.js.map
