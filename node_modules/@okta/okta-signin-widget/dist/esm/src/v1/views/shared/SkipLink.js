import { View, loc } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import Enums from '../../../util/Enums.js';

var SkipLink = View.extend({
  tagName: 'a',
  className: 'skip-to-content-link',
  attributes: {
    href: `#${Enums.WIDGET_CONTAINER_ID}`
  },
  initialize: function initialize() {
    this.$el.append(loc('skip.to.main.content', 'login'));
  }
});

export { SkipLink as default };
//# sourceMappingURL=SkipLink.js.map
