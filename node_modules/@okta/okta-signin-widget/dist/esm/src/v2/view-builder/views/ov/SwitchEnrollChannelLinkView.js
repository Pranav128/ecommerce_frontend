import _Handlebars2 from '../../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View } from '../../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import { FORMS } from '../../../ion/RemediationConstants.js';

var SwitchEnrollChannelLinkView = View.extend({
  className: 'switch-channel-text',
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "sameDeviceOVEnrollmentEnabled") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.program(4, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 23
          },
          "end": {
            "line": 1,
            "column": 325
          }
        }
      })) != null ? stack1 : "";
    },
    "2": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = (lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.enroll.okta_verify.switch.channel.link.text"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 60
          },
          "end": {
            "line": 1,
            "column": 140
          }
        }
      })) != null ? stack1 : "";
    },
    "4": function (container, depth0, helpers, partials, data) {
      var alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<a href=\"#\" class=\"switch-channel-link\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "enroll.totp.aria.cannotScan"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 200
          },
          "end": {
            "line": 1,
            "column": 259
          }
        }
      })) + "\">" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "enroll.totp.cannotScan"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 261
          },
          "end": {
            "line": 1,
            "column": 314
          }
        }
      })) + "</a>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "isSameDeviceChannel") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(9, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 325
          },
          "end": {
            "line": 1,
            "column": 480
          }
        }
      })) != null ? stack1 : "";
    },
    "7": function (container, depth0, helpers, partials, data) {
      return "";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "isDeviceBootstrapChannel") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(2, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 356
          },
          "end": {
            "line": 1,
            "column": 480
          }
        }
      })) != null ? stack1 : "";
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
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "isQRcodeChannel") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(6, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 487
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  }),
  getTemplateData: function () {
    const selectedChannel = this.options.appState.get('currentAuthenticator').contextualData.selectedChannel;
    return {
      sameDeviceOVEnrollmentEnabled: this.settings.get('features.sameDeviceOVEnrollmentEnabled'),
      isQRcodeChannel: selectedChannel === 'qrcode',
      // Do not show switch channel link for sameDevice or deviceBootstrap
      isSameDeviceChannel: selectedChannel === 'samedevice',
      isDeviceBootstrapChannel: selectedChannel === 'devicebootstrap'
    };
  },
  postRender: function () {
    this.$el.find('.switch-channel-link').on('click', event => {
      const appState = this.options.appState;
      event.preventDefault();
      appState.trigger('switchForm', FORMS.SELECT_ENROLLMENT_CHANNEL);
    });
  }
});

export { SwitchEnrollChannelLinkView as default };
//# sourceMappingURL=SwitchEnrollChannelLinkView.js.map
