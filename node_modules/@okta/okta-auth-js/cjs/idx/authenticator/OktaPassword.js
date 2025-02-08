"use strict";

exports.OktaPassword = void 0;
var _Authenticator = require("./Authenticator");
class OktaPassword extends _Authenticator.Authenticator {
  canVerify(values) {
    return !!(values.credentials || values.password || values.passcode);
  }
  mapCredentials(values) {
    const {
      credentials,
      password,
      passcode,
      revokeSessions
    } = values;
    if (!credentials && !password && !passcode) {
      return;
    }
    return credentials || {
      passcode: passcode || password,
      revokeSessions
    };
  }
  getInputs(idxRemediationValue) {
    const inputs = [{
      ...idxRemediationValue.form?.value[0],
      name: 'password',
      type: 'string',
      required: idxRemediationValue.required
    }];
    const revokeSessions = idxRemediationValue.form?.value.find(input => input.name === 'revokeSessions');
    if (revokeSessions) {
      inputs.push({
        name: 'revokeSessions',
        type: 'boolean',
        label: 'Sign me out of all other devices',
        required: false
      });
    }
    return inputs;
  }
}
exports.OktaPassword = OktaPassword;
//# sourceMappingURL=OktaPassword.js.map