"use strict";

exports.getAuthenticator = getAuthenticator;
var _OktaVerifyTotp = require("./OktaVerifyTotp");
var _VerificationCodeAuthenticator = require("./VerificationCodeAuthenticator");
var _OktaPassword = require("./OktaPassword");
var _SecurityQuestionEnrollment = require("./SecurityQuestionEnrollment");
var _SecurityQuestionVerification = require("./SecurityQuestionVerification");
var _WebauthnEnrollment = require("./WebauthnEnrollment");
var _WebauthnVerification = require("./WebauthnVerification");
var _types = require("../types");
/* eslint complexity:[0,8] */
function getAuthenticator(remediation) {
  const relatesTo = remediation.relatesTo;
  const value = relatesTo?.value || {};
  switch (value.key) {
    case _types.AuthenticatorKey.OKTA_PASSWORD:
      return new _OktaPassword.OktaPassword(value);
    case _types.AuthenticatorKey.SECURITY_QUESTION:
      if (value.contextualData?.enrolledQuestion) {
        return new _SecurityQuestionVerification.SecurityQuestionVerification(value);
      } else {
        return new _SecurityQuestionEnrollment.SecurityQuestionEnrollment(value);
      }
    case _types.AuthenticatorKey.OKTA_VERIFY:
      return new _OktaVerifyTotp.OktaVerifyTotp(value);
    case _types.AuthenticatorKey.WEBAUTHN:
      if (value.contextualData?.challengeData) {
        return new _WebauthnVerification.WebauthnVerification(value);
      } else {
        return new _WebauthnEnrollment.WebauthnEnrollment(value);
      }
    default:
      return new _VerificationCodeAuthenticator.VerificationCodeAuthenticator(value);
  }
}
//# sourceMappingURL=getAuthenticator.js.map