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

var PIVBeacon = View.extend({
  className: 'piv-beacon',
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      return "<div class=\"beacon-blank auth-beacon\"><div class=\"beacon-blank js-blank-beacon-border auth-beacon-border\"></div></div><div class=\"bg-helper auth-beacon smartcard\" data-se=\"piv-beacon\"><div class=\"okta-sign-in-beacon-border auth-beacon-border\"></div></div>";
    },
    "useData": true
  }),
  equals: function (Beacon) {
    return Beacon && this instanceof Beacon;
  }
});

export { PIVBeacon as default };
//# sourceMappingURL=PIVBeacon.js.map
