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
import '../../../ion/RemediationConstants.js';
import { getMessage } from '../../../ion/i18nUtils.js';
import TimeUtil from '../../../../util/TimeUtil.js';
import { loc } from '../../../../util/loc.js';
import { hasDeviceRemediationAction, isLoopbackDeviceRemediation, probeLoopbackAndExecute } from '../../utils/EndUserRemediationMessageViewUtil.js';

const I18N_ACCESS_DENIED_KEY_PREFIX = 'idx.error.code.access_denied.device_assurance.remediation';
const I18N_GRACE_PERIOD_KEY_PREFIX = 'idx.device_assurance.grace_period.warning';
const HELP_AND_CONTACT_KEY_PREFIX = `${I18N_ACCESS_DENIED_KEY_PREFIX}.additional_help_`;
const CUSTOM_URL_ADDITIONAL_HELP_KEY = `${I18N_ACCESS_DENIED_KEY_PREFIX}.additional_help_custom`;
const REMEDIATION_OPTION_INDEX_KEY = `${I18N_ACCESS_DENIED_KEY_PREFIX}.option_index`;
const ACCESS_DENIED_TITLE_KEY = `${I18N_ACCESS_DENIED_KEY_PREFIX}.title`;
const GRACE_PERIOD_TITLE_KEY = `${I18N_GRACE_PERIOD_KEY_PREFIX}.title`;
const ACCESS_DENIED_EXPLANATION_KEY_PREFIX = `${I18N_ACCESS_DENIED_KEY_PREFIX}.explanation_`;
function buildRemediationOptionBlockMessage(message) {
  let link = null;
  let deviceRemediationAction = null;
  if (message.links && message.links[0] && message.links[0].url) {
    link = message.links[0].url;
  } else if (hasDeviceRemediationAction(message)) {
    deviceRemediationAction = message.deviceRemediation.value.action;
  }
  return {
    message: getMessage(message),
    link: link,
    deviceRemediationAction: deviceRemediationAction,
    className: message.i18n.key === REMEDIATION_OPTION_INDEX_KEY ? 'end-user-remediation-option' : 'end-user-remediation-action'
  };
}
var EndUserRemediationMessages = View.extend({
  className: 'end-user-remediation-messages-view',
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-title\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 53
          },
          "end": {
            "line": 1,
            "column": 62
          }
        }
      }) : helper)) + "</div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-explanation\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "explanation") || (depth0 != null ? lookupProperty(depth0, "explanation") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "explanation",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 140
          },
          "end": {
            "line": 1,
            "column": 155
          }
        }
      }) : helper)) + "</div>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"end-user-remediation-options\">" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "remediationOptions") : depth0, {
        "name": "each",
        "hash": {},
        "fn": container.program(6, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 236
          },
          "end": {
            "line": 1,
            "column": 605
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "6": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "className",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 276
          },
          "end": {
            "line": 1,
            "column": 289
          }
        }
      }) : helper)) + "\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "link") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(9, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 291
          },
          "end": {
            "line": 1,
            "column": 590
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "7": function (container, depth0, helpers, partials, data) {
      var helper,
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
      return "<a href=\"" + alias4((helper = (helper = lookupProperty(helpers, "link") || (depth0 != null ? lookupProperty(depth0, "link") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "link",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 312
          },
          "end": {
            "line": 1,
            "column": 320
          }
        }
      }) : helper)) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + alias4((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 364
          },
          "end": {
            "line": 1,
            "column": 375
          }
        }
      }) : helper)) + "</a>";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return (stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "deviceRemediationAction") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(10, data, 0),
        "inverse": container.program(12, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 387
          },
          "end": {
            "line": 1,
            "column": 583
          }
        }
      })) != null ? stack1 : "";
    },
    "10": function (container, depth0, helpers, partials, data) {
      var helper,
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
      return "<button class=\"enduser-remediation-button-link\" id=\"" + alias4((helper = (helper = lookupProperty(helpers, "deviceRemediationAction") || (depth0 != null ? lookupProperty(depth0, "deviceRemediationAction") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "deviceRemediationAction",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 470
          },
          "end": {
            "line": 1,
            "column": 497
          }
        }
      }) : helper)) + "\" data-se=\"" + alias4((helper = (helper = lookupProperty(helpers, "deviceRemediationAction") || (depth0 != null ? lookupProperty(depth0, "deviceRemediationAction") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "deviceRemediationAction",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 508
          },
          "end": {
            "line": 1,
            "column": 535
          }
        }
      }) : helper)) + "\">" + alias4((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 537
          },
          "end": {
            "line": 1,
            "column": 548
          }
        }
      }) : helper)) + "</button>";
    },
    "12": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return container.escapeExpression((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 565
          },
          "end": {
            "line": 1,
            "column": 576
          }
        }
      }) : helper));
    },
    "14": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a href='#' target='_blank' rel='noopener noreferrer' class='additional-help'>$1</a>",
          "bundle": "login",
          "code": "idx.error.code.access_denied.device_assurance.remediation.additional_help_custom"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 695
          },
          "end": {
            "line": 1,
            "column": 897
          }
        }
      }));
    },
    "16": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "$1": "<a href='#' target='_blank' rel='noopener noreferrer' class='additional-help'>$1</a>",
          "bundle": "login",
          "code": "idx.error.code.access_denied.device_assurance.remediation.additional_help_default"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 905
          },
          "end": {
            "line": 1,
            "column": 1108
          }
        }
      }));
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
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "title") : depth0, {
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
            "column": 75
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "explanation") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(3, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 75
          },
          "end": {
            "line": 1,
            "column": 168
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "remediationOptions") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(5, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 168
          },
          "end": {
            "line": 1,
            "column": 618
          }
        }
      })) != null ? stack1 : "") + "<div class=\"end-user-remediation-help-and-contact\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "useCustomHelpText") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(14, data, 0),
        "inverse": container.program(16, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 669
          },
          "end": {
            "line": 1,
            "column": 1115
          }
        }
      })) != null ? stack1 : "") + "</div>";
    },
    "useData": true
  }),
  getTemplateData: function () {
    const messages = this.options.messages;
    const remediationOptions = [];
    let title = null;
    let explanation = null;
    let useCustomHelpText = false;

    // eslint-disable-next-line complexity
    messages.forEach(msg => {
      const {
        i18n: {
          key: key,
          params = []
        },
        links: links,
        message: message
      } = msg;
      if (key === ACCESS_DENIED_TITLE_KEY) {
        title = getMessage(msg);
      } else if (key.startsWith(GRACE_PERIOD_TITLE_KEY)) {
        if (params.length > 0) {
          const expiry = params[0];
          const expiryDate = new Date(expiry);
          const localizedExpiry = TimeUtil.formatDateToDeviceAssuranceGracePeriodExpiryLocaleString(expiryDate, this.options.languageCode);
          title = localizedExpiry ? loc(key, 'login', [localizedExpiry]) : message;
        }
      } else if (key.startsWith(ACCESS_DENIED_EXPLANATION_KEY_PREFIX)) {
        explanation = getMessage(msg);
      } else if (key.startsWith(HELP_AND_CONTACT_KEY_PREFIX)) {
        useCustomHelpText = key === CUSTOM_URL_ADDITIONAL_HELP_KEY;
        if (links && links[0] && links[0].url) {
          this.additionalHelpUrl = links[0].url;
        }
      } else {
        remediationOptions.push(buildRemediationOptionBlockMessage(msg));
      }
    });
    return {
      title: title,
      explanation: explanation,
      remediationOptions: remediationOptions,
      useCustomHelpText: useCustomHelpText
    };
  },
  render: function () {
    View.prototype.render.apply(this, arguments);
    if (this.additionalHelpUrl) {
      this.$el.find('.additional-help').attr('href', this.additionalHelpUrl);
    }
  },
  postRender: function () {
    if (!Array.isArray(this.options.messages)) {
      return;
    }
    const deviceRemediations = this.options.messages.filter(message => hasDeviceRemediationAction(message)).map(message => message.deviceRemediation.value);
    deviceRemediations.forEach(deviceRemediation => {
      this.$el.find(`#${deviceRemediation.action}`).click(function (event) {
        event.preventDefault();
        if (isLoopbackDeviceRemediation(deviceRemediation)) {
          probeLoopbackAndExecute(deviceRemediation);
        }
      });
    });
  }
});

export { EndUserRemediationMessages as default };
//# sourceMappingURL=EndUserRemediationMessages.js.map
