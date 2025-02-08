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

// Courage doesn't support HTML, hence creating a subtitle here.
const CheckYourEmailTitle = View.extend({
  className: 'okta-form-subtitle',
  attributes: {
    'data-se': 'o-form-explain'
  },
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
            "column": 13
          },
          "end": {
            "line": 1,
            "column": 433
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
          "code": "oie.email.verify.alternate.magicLinkToEmailAddress.with.secondary.email"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 35
          },
          "end": {
            "line": 1,
            "column": 269
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
          "code": "oie.email.verify.alternate.magicLinkToEmailAddress"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 277
          },
          "end": {
            "line": 1,
            "column": 426
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
          "code": "oie.email.verify.alternate.magicLinkToYourEmail"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 441
          },
          "end": {
            "line": 1,
            "column": 520
          }
        }
      }));
    },
    "8": function (container, depth0, helpers, partials, data) {
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
          "code": "oie.email.verify.alternate.instructions"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 557
          },
          "end": {
            "line": 1,
            "column": 628
          }
        }
      }));
    },
    "10": function (container, depth0, helpers, partials, data) {
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
          "code": "oie.email.verify.alternate.verificationCode.instructions"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 636
          },
          "end": {
            "line": 1,
            "column": 724
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
      return ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "email") : depth0, {
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
            "column": 527
          }
        }
      })) != null ? stack1 : "") + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "useEmailMagicLinkValue") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(8, data, 0),
        "inverse": container.program(10, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 527
          },
          "end": {
            "line": 1,
            "column": 731
          }
        }
      })) != null ? stack1 : "");
    },
    "useData": true
  }),
  getTemplateData: function () {
    return this.options;
  }
});
const CheckYourEmailEnrollTitle = View.extend({
  className: 'okta-form-subtitle',
  attributes: {
    'data-se': 'o-form-explain'
  },
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
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
          "code": "oie.email.enroll.subtitle"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 56
          }
        }
      }));
    },
    "useData": true
  })
});
const EnterCodeLink = View.extend({
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
      return "<button class=\"button-link enter-auth-code-instead-link\" >" + container.escapeExpression((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "i18n",
        "hash": {
          "code": "oie.email.verify.alternate.show.verificationCode.text"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 58
          },
          "end": {
            "line": 1,
            "column": 127
          }
        }
      })) + "</button>";
    },
    "useData": true
  })
});
function getCheckYourEmailTitle() {
  return CheckYourEmailTitle;
}
function getCheckYourEmailEnrollTitle() {
  return CheckYourEmailEnrollTitle;
}
function getEnterCodeLink() {
  return EnterCodeLink;
}

export { getCheckYourEmailEnrollTitle, getCheckYourEmailTitle, getEnterCodeLink };
//# sourceMappingURL=AuthenticatorEmailViewUtil.js.map
