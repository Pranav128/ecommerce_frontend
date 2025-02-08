import _Handlebars2 from '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View, loc, internal } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import oktaUnderscore from '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { FORMS } from '../../../ion/RemediationConstants.js';
import { createInvisibleIFrame } from '../../utils/ChallengeViewUtil.js';

const {
  Notification: Notification
} = internal.views.components;
const {
  Clipboard: Clipboard
} = internal.util;
var EnrollChannelPollDescriptionView = View.extend({
  initialize: function () {
    let deviceMap = getDeviceMap(this.options.appState);

    // automatically trigger the Set up Okta Verify button on same device enrollment view
    if (deviceMap && deviceMap.setupOVUrl && deviceMap.isDesktop) {
      this.ulDom && this.ulDom.remove();
      const IframeView = createInvisibleIFrame('custom-uri-container', deviceMap.setupOVUrl);
      this.ulDom = this.add(IframeView).last();
    }
  },
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
      return "<ol class=\"qrcode-info ov-info\"><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.qrcode.step1.updated"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 48
          },
          "end": {
            "line": 1,
            "column": 122
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.qrcode.step2"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 131
          },
          "end": {
            "line": 1,
            "column": 197
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='strong'>$1</span>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.qrcode.step3.updated"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 206
          },
          "end": {
            "line": 1,
            "column": 316
          }
        }
      })) + "</li></ol><div class=\"qrcode-container\"><img class=\"qrcode\" src=" + alias3((helper = (helper = lookupProperty(helpers, "href") || (depth0 != null ? lookupProperty(depth0, "href") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "href",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 380
          },
          "end": {
            "line": 1,
            "column": 388
          }
        }
      }) : helper)) + " alt=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "mfa.altQrCode"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 394
          },
          "end": {
            "line": 1,
            "column": 439
          }
        }
      })) + "\"></img></div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<ul class=\"email-info ov-info\"><li>" + ((stack1 = (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='strong'>$1</span>",
          "arguments": "email",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.email.info.updated"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 508
          },
          "end": {
            "line": 1,
            "column": 636
          }
        }
      })) != null ? stack1 : "") + "</li><li class=\"switch-channel-content\"></li></ul>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<ul class=\"sms-info ov-info\"><li>" + ((stack1 = (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='strong'>$1</span>",
          "arguments": "phoneNumber",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.sms.info.updated"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 745
          },
          "end": {
            "line": 1,
            "column": 877
          }
        }
      })) != null ? stack1 : "") + "</li><li class=\"switch-channel-content\"></li></ul>";
    },
    "7": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"sameDevice-setup" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(8, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 990
          },
          "end": {
            "line": 1,
            "column": 1056
          }
        }
      })) != null ? stack1 : "") + "\"><p class=\"explanation\" data-se=\"subheader\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, (stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "isDesktop") : stack1, {
        "name": "if",
        "hash": {},
        "fn": container.program(10, data, 0),
        "inverse": container.program(17, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1101
          },
          "end": {
            "line": 1,
            "column": 1874
          }
        }
      })) != null ? stack1 : "") + "</p><ol class=\"ov-info\">" + ((stack1 = lookupProperty(helpers, "unless").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "unless",
        "hash": {},
        "fn": container.program(19, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1898
          },
          "end": {
            "line": 1,
            "column": 2312
          }
        }
      })) != null ? stack1 : "") + "<li><a href=\"" + alias2(container.lambda((stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "setupOVUrl") : stack1, depth0)) + "\" class=\"button button-primary setup-button\">" + alias2((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.title"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2394
          },
          "end": {
            "line": 1,
            "column": 2459
          }
        }
      })) + "</a></li>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(22, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2468
          },
          "end": {
            "line": 1,
            "column": 2786
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "showAnotherDeviceLink") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(24, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2786
          },
          "end": {
            "line": 1,
            "column": 3125
          }
        }
      })) != null ? stack1 : "") + "</ol></div>";
    },
    "8": function (container, depth0, helpers, partials, data) {
      return " ov-enrollment-enabled";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"desktop-instructions ov-info\">" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(alias1, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='semi-strong'>$1</span>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.prompt"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1170
          },
          "end": {
            "line": 1,
            "column": 1287
          }
        }
      })) + "</div><div class=\"desktop-instructions\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(11, data, 0),
        "inverse": container.program(13, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1327
          },
          "end": {
            "line": 1,
            "column": 1583
          }
        }
      })) != null ? stack1 : "") + "</div>" + ((stack1 = lookupProperty(helpers, "unless").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "unless",
        "hash": {},
        "fn": container.program(15, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1589
          },
          "end": {
            "line": 1,
            "column": 1765
          }
        }
      })) != null ? stack1 : "");
    },
    "11": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<span>$1</span>",
          "bundle": "login",
          "code": "customUri.required.content.prompt"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1364
          },
          "end": {
            "line": 1,
            "column": 1449
          }
        }
      }));
    },
    "13": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='semi-strong'>$1</span>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.noPrompt"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1457
          },
          "end": {
            "line": 1,
            "column": 1576
          }
        }
      }));
    },
    "15": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "<div class=\"desktop-instructions\">" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.makeSureHaveOV"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1664
          },
          "end": {
            "line": 1,
            "column": 1748
          }
        }
      })) + "</div>";
    },
    "17": function (container, depth0, helpers, partials, data) {
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
          "code": "oie.enroll.okta_verify.setup.customUri.makeSureHaveOVToContinue"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1773
          },
          "end": {
            "line": 1,
            "column": 1867
          }
        }
      }));
    },
    "19": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, (stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "platformLC") : stack1, {
        "name": "if",
        "hash": {},
        "fn": container.program(20, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1939
          },
          "end": {
            "line": 1,
            "column": 2176
          }
        }
      })) != null ? stack1 : "") + "<li>" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(alias1, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='semi-strong'>$1</span>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.setup"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2180
          },
          "end": {
            "line": 1,
            "column": 2296
          }
        }
      })) + "</li>";
    },
    "20": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = container.escapeExpression,
        alias2 = container.lambda,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<li><a aria-label='" + alias1((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "customUri.required.content.download.linkText"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 1986
          },
          "end": {
            "line": 1,
            "column": 2061
          }
        }
      })) + "' href=\"" + alias1(alias2((stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "downloadHref") : stack1, depth0)) + "\" class=\"app-store-logo " + alias1(alias2((stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "platformLC") : stack1, depth0)) + "-app-store-logo\"></a></li>";
    },
    "22": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<li><span>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "customUri.required.content.download.title"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2515
          },
          "end": {
            "line": 1,
            "column": 2587
          }
        }
      })) + "</span>&nbsp;<a href=\"" + alias3(container.lambda((stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "downloadHref") : stack1, depth0)) + "\" target=\"_blank\" id=\"download-ov\" class=\"download-ov-link\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "customUri.required.content.download.linkText"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2695
          },
          "end": {
            "line": 1,
            "column": 2770
          }
        }
      })) + "</a></li>";
    },
    "24": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<li>" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, (stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "isDesktop") : stack1, {
        "name": "if",
        "hash": {},
        "fn": container.program(25, data, 0),
        "inverse": container.program(27, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2819
          },
          "end": {
            "line": 1,
            "column": 3113
          }
        }
      })) != null ? stack1 : "") + "</li>";
    },
    "25": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a class='orOnMobileLink' href='#'>$1</a>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.orOnMobile"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2846
          },
          "end": {
            "line": 1,
            "column": 2973
          }
        }
      }));
    },
    "27": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a class='orOnMobileLink' href='#'>$1</a>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.customUri.orMobile"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 2981
          },
          "end": {
            "line": 1,
            "column": 3106
          }
        }
      }));
    },
    "29": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "sameDevice") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(30, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3144
          },
          "end": {
            "line": 1,
            "column": 4021
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "deviceBootstrap") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(32, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4021
          },
          "end": {
            "line": 1,
            "column": 4802
          }
        }
      })) != null ? stack1 : "");
    },
    "30": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        alias4 = container.lambda,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"explanation\" data-se=\"subheader\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.subtitle "
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3205
          },
          "end": {
            "line": 1,
            "column": 3274
          }
        }
      })) + "</p><ol class=\"sameDevice-info ov-info\"><li>" + ((stack1 = (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "arguments": "sameDevice.downloadHref",
          "bundle": "login",
          "code": "enroll.oda.without.account.step1"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3318
          },
          "end": {
            "line": 1,
            "column": 3419
          }
        }
      })) != null ? stack1 : "") + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.openOv"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3428
          },
          "end": {
            "line": 1,
            "column": 3494
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.signInUrl"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3503
          },
          "end": {
            "line": 1,
            "column": 3572
          }
        }
      })) + "<br><br/><span class='semi-strong no-translate'>" + alias3(alias4((stack1 = depth0 != null ? lookupProperty(depth0, "sameDevice") : depth0) != null ? lookupProperty(stack1, "orgUrl") : stack1, depth0)) + "</span><a data-clipboard-text=\"" + alias3(alias4((stack1 = depth0 != null ? lookupProperty(depth0, "sameDevice") : depth0) != null ? lookupProperty(stack1, "orgUrl") : stack1, depth0)) + "\" class=\"button link-button copy-org-clipboard-button\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "enroll.oda.org.copyLink"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3748
          },
          "end": {
            "line": 1,
            "column": 3802
          }
        }
      })) + "</a></li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.followInstruction"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3815
          },
          "end": {
            "line": 1,
            "column": 3901
          }
        }
      })) + "</li></ol><p class=\"closing\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.canBeClosed"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 3930
          },
          "end": {
            "line": 1,
            "column": 4010
          }
        }
      })) + "</p>";
    },
    "32": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"explanation\" data-se=\"subheader\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.subtitle"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4087
          },
          "end": {
            "line": 1,
            "column": 4164
          }
        }
      })) + "</p><ol class=\"deviceBootstrap-info ov-info\"><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='semi-strong'>$1</span>",
          "arguments": "enrolledDeviceName",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.openOv.suchAs"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4213
          },
          "end": {
            "line": 1,
            "column": 4367
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.selectAccount"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4376
          },
          "end": {
            "line": 1,
            "column": 4458
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "$1": "<span class='semi-strong'>$1</span>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.addAccount"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4467
          },
          "end": {
            "line": 1,
            "column": 4587
          }
        }
      })) + "</li><li>" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.followInstruction"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4596
          },
          "end": {
            "line": 1,
            "column": 4682
          }
        }
      })) + "</li></ol><p class=\"closing\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.setup.skipAuth.canBeClosed"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4711
          },
          "end": {
            "line": 1,
            "column": 4791
          }
        }
      })) + "</p>";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "href") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 460
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "email") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 460
          },
          "end": {
            "line": 1,
            "column": 693
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "phoneNumber") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(5, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 693
          },
          "end": {
            "line": 1,
            "column": 934
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, (stack1 = depth0 != null ? lookupProperty(depth0, "deviceMap") : depth0) != null ? lookupProperty(stack1, "setupOVUrl") : stack1, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(29, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 934
          },
          "end": {
            "line": 1,
            "column": 4809
          }
        }
      })) != null ? stack1 : "");
    },
    "useData": true
  }),
  /* eslint complexity: [2, 20] */getTemplateData: function () {
    var _contextualData$qrcod;
    const contextualData = this.options.appState.get('currentAuthenticator').contextualData;
    let enrolledDeviceName = '';
    let deviceMap = getDeviceMap(this.options.appState);
    let showAnotherDeviceLink = false;
    if (contextualData) {
      if (contextualData !== null && contextualData !== void 0 && contextualData.devicebootstrap && contextualData !== null && contextualData !== void 0 && contextualData.devicebootstrap.enrolledDevices) {
        const enrolledDevices = contextualData === null || contextualData === void 0 ? void 0 : contextualData.devicebootstrap.enrolledDevices;
        enrolledDeviceName = Array.isArray(enrolledDevices) && !oktaUnderscore.isEmpty(enrolledDevices) ? enrolledDevices[0] : enrolledDevices;
      }
    }
    if (deviceMap.securityLevel && deviceMap.securityLevel === 'ANY') {
      showAnotherDeviceLink = true;
    }
    const sameDeviceOVEnrollmentEnabled = this.options.settings.get('features.sameDeviceOVEnrollmentEnabled');
    return {
      href: (_contextualData$qrcod = contextualData.qrcode) === null || _contextualData$qrcod === void 0 ? void 0 : _contextualData$qrcod.href,
      email: oktaUnderscore.escape(contextualData === null || contextualData === void 0 ? void 0 : contextualData.email),
      phoneNumber: oktaUnderscore.escape(contextualData === null || contextualData === void 0 ? void 0 : contextualData.phoneNumber),
      sameDevice: contextualData === null || contextualData === void 0 ? void 0 : contextualData.samedevice,
      deviceBootstrap: contextualData === null || contextualData === void 0 ? void 0 : contextualData.devicebootstrap,
      enrolledDeviceName: enrolledDeviceName,
      deviceMap: deviceMap,
      showAnotherDeviceLink: showAnotherDeviceLink,
      sameDeviceOVEnrollmentEnabled: sameDeviceOVEnrollmentEnabled
    };
  },
  postRender: function () {
    const appState = this.options && this.options.appState;
    const model = this.model;
    this.$('.orOnMobileLink').click(function () {
      var _qrChannelField$optio;
      if (!appState || !model) {
        return;
      }
      const qrChannel = 'qrcode';
      const remediations = appState.get('remediations');
      const selectEnrollmentChannelRemediation = remediations.find(remediation => {
        return remediation.name === FORMS.SELECT_ENROLLMENT_CHANNEL;
      });
      if (!selectEnrollmentChannelRemediation) {
        return;
      }
      const idField = oktaUnderscore.find(selectEnrollmentChannelRemediation.uiSchema, schema => schema.name === 'authenticator.id');
      if (!idField) {
        return;
      }
      // filter selected channel
      const qrChannelField = oktaUnderscore.find(selectEnrollmentChannelRemediation.uiSchema, schema => schema.name === 'authenticator.channel');
      if (!qrChannelField) {
        return;
      }
      qrChannelField.options = oktaUnderscore.filter(qrChannelField === null || qrChannelField === void 0 ? void 0 : qrChannelField.options, option => option.value === qrChannel);
      qrChannelField.value = ((_qrChannelField$optio = qrChannelField.options[0]) === null || _qrChannelField$optio === void 0 ? void 0 : _qrChannelField$optio.value) || qrChannel;
      qrChannelField.sublabel = null;
      model.set('authenticator.channel', qrChannelField.value);
      model.set('authenticator.id', idField.value);
      model.set('formName', selectEnrollmentChannelRemediation.name);
      appState.trigger('saveForm', model);
    });
    Clipboard.attach('.copy-org-clipboard-button').done(() => {
      let notification = new Notification({
        message: loc('enroll.oda.org.copyLink.success', 'login'),
        level: 'success'
      });
      this.el.prepend(notification.render().el);
      return false;
    });
  }
});
function getDeviceMap(appState) {
  var _contextualData$samed, _contextualData$devic;
  if (!appState) {
    return null;
  }
  const contextualData = appState.get('currentAuthenticator').contextualData;
  let deviceMap = {};
  if ((_contextualData$samed = contextualData.samedevice) !== null && _contextualData$samed !== void 0 && _contextualData$samed.setupOVUrl) {
    deviceMap = {
      ...contextualData.samedevice
    };
  } else if ((_contextualData$devic = contextualData.devicebootstrap) !== null && _contextualData$devic !== void 0 && _contextualData$devic.setupOVUrl) {
    deviceMap = {
      ...contextualData.devicebootstrap
    };
  }
  if (deviceMap.platform) {
    deviceMap.platformLC = deviceMap.platform.toLowerCase();
    deviceMap.isDesktop = !(deviceMap.platformLC === 'ios' || deviceMap.platformLC === 'android');
  }
  return deviceMap;
}

export { EnrollChannelPollDescriptionView as default };
//# sourceMappingURL=EnrollChannelPollDescriptionView.js.map
