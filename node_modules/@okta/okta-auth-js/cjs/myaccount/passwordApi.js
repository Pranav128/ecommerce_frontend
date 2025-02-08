"use strict";

exports.updatePassword = exports.getPassword = exports.enrollPassword = exports.deletePassword = void 0;
var _request = require("./request");
var _transactions = require("./transactions");
/**
 * @scope: okta.myAccount.password.read
 */
const getPassword = async (oktaAuth, options) => {
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: `/idp/myaccount/password`,
    method: 'GET',
    accessToken: options?.accessToken
  }, _transactions.PasswordTransaction);
  return transaction;
};

/**
 * @scope: okta.myAccount.password.manage
 */
exports.getPassword = getPassword;
const enrollPassword = async (oktaAuth, options) => {
  const {
    accessToken,
    payload
  } = options;
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: '/idp/myaccount/password',
    method: 'POST',
    payload,
    accessToken
  }, _transactions.PasswordTransaction);
  return transaction;
};

/**
 * @scope: okta.myAccount.password.manage
 */
exports.enrollPassword = enrollPassword;
const updatePassword = async (oktaAuth, options) => {
  const {
    accessToken,
    payload
  } = options;
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: '/idp/myaccount/password',
    method: 'PUT',
    payload,
    accessToken
  }, _transactions.PasswordTransaction);
  return transaction;
};

/**
 * @scope: okta.myAccount.password.manage
 */
exports.updatePassword = updatePassword;
const deletePassword = async (oktaAuth, options) => {
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: `/idp/myaccount/password`,
    method: 'DELETE',
    accessToken: options?.accessToken
  });
  return transaction;
};
exports.deletePassword = deletePassword;
//# sourceMappingURL=passwordApi.js.map