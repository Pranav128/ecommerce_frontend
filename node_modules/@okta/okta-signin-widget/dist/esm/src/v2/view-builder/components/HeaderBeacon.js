import _Handlebars2 from '../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';

var HeaderBeacon = View.extend({
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
      return "<div class=\"bg-helper auth-beacon auth-beacon-factor " + alias3((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "className",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 245
          },
          "end": {
            "line": 1,
            "column": 258
          }
        }
      }) : helper)) + " custom-app-logo\" data-se=\"factor-beacon\" role=\"img\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.auth.logo.aria.label"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 323
          },
          "end": {
            "line": 1,
            "column": 378
          }
        }
      })) + "\">";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"bg-helper auth-beacon auth-beacon-factor " + container.escapeExpression((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "className",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 441
          },
          "end": {
            "line": 1,
            "column": 454
          }
        }
      }) : helper)) + "\" data-se=\"factor-beacon\">";
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
      return "<div data-type=\"beacon-container\" class=\"beacon-container\"><div class=\"beacon-blank auth-beacon\"><div class=\"beacon-blank js-blank-beacon-border auth-beacon-border\"></div></div>" + ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "logoUri") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(3, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 177
          },
          "end": {
            "line": 1,
            "column": 487
          }
        }
      })) != null ? stack1 : "") + "<div class=\"okta-sign-in-beacon-border auth-beacon-border\"></div></div></div >";
    },
    "useData": true
  }),
  postRender: function () {
    View.prototype.postRender.apply(this, arguments);
    const data = this.getTemplateData();
    if (data.logoUri) {
      this.el.querySelector('.custom-app-logo').style.backgroundImage = `url(${data.logoUri})`;
    }
  },
  getTemplateData: function () {
    var _this$options, _appState$get, _appState$get2;
    const appState = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.appState;
    return {
      className: this.getBeaconClassName() || '',
      logoUri: (appState === null || appState === void 0 ? void 0 : (_appState$get = appState.get('currentAuthenticator')) === null || _appState$get === void 0 ? void 0 : _appState$get.logoUri) || (appState === null || appState === void 0 ? void 0 : (_appState$get2 = appState.get('currentAuthenticatorEnrollment')) === null || _appState$get2 === void 0 ? void 0 : _appState$get2.logoUri)
    };
  },
  getBeaconClassName: function () {
    return 'undefined-user';
  }
});

export { HeaderBeacon as default };
//# sourceMappingURL=HeaderBeacon.js.map
