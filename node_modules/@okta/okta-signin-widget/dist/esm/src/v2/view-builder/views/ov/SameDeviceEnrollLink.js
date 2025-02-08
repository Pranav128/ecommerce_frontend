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

var SameDeviceEnrollLink = View.extend({
  className: 'ov-same-device-enroll-text',
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
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
          "$1": "<a class='ov-same-device-enroll-link' href='#'>$1</a>",
          "bundle": "login",
          "code": "oie.enroll.okta_verify.select.channel.ovOnThisDevice"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 144
          }
        }
      })) != null ? stack1 : "";
    },
    "useData": true
  }),
  postRender: function () {
    const appState = this.options && this.options.appState;
    const model = this.model;
    this.$('.ov-same-device-enroll-link').click(function () {
      var _selectEnrollmentChan, _selectEnrollmentChan2, _sameDeviceChannelFie, _sameDeviceChannelFie2;
      if (!appState || !model) {
        return;
      }
      const sameDeviceChannel = 'samedevice';
      const remediations = appState.get('remediations');
      const selectEnrollmentChannelRemediation = remediations.find(remediation => {
        return remediation.name === FORMS.SELECT_ENROLLMENT_CHANNEL;
      });
      if (!selectEnrollmentChannelRemediation) {
        return;
      }
      const idField = (_selectEnrollmentChan = selectEnrollmentChannelRemediation.uiSchema) === null || _selectEnrollmentChan === void 0 ? void 0 : _selectEnrollmentChan.find(schema => schema.name === 'authenticator.id');
      if (!idField) {
        return;
      }
      // filter selected channel
      const sameDeviceChannelField = (_selectEnrollmentChan2 = selectEnrollmentChannelRemediation.uiSchema) === null || _selectEnrollmentChan2 === void 0 ? void 0 : _selectEnrollmentChan2.find(schema => schema.name === 'authenticator.channel');
      if (!sameDeviceChannelField) {
        return;
      }
      sameDeviceChannelField.options = (_sameDeviceChannelFie = sameDeviceChannelField.options) === null || _sameDeviceChannelFie === void 0 ? void 0 : _sameDeviceChannelFie.filter(option => option.value === sameDeviceChannel);
      sameDeviceChannelField.value = ((_sameDeviceChannelFie2 = sameDeviceChannelField.options[0]) === null || _sameDeviceChannelFie2 === void 0 ? void 0 : _sameDeviceChannelFie2.value) || sameDeviceChannel;
      sameDeviceChannelField.sublabel = null;
      model.set('authenticator.channel', sameDeviceChannelField.value);
      model.set('authenticator.id', idField.value);
      model.set('formName', selectEnrollmentChannelRemediation.name);
      appState.trigger('saveForm', model);
    });
  }
});

export { SameDeviceEnrollLink as default };
//# sourceMappingURL=SameDeviceEnrollLink.js.map
