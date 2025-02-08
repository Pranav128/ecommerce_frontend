"use strict";

exports.updateProfile = exports.getProfileSchema = exports.getProfile = void 0;
var _request = require("./request");
var _transactions = require("./transactions");
/**
 * @scope: okta.myAccount.profile.read
 */
const getProfile = async (oktaAuth, options) => {
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: '/idp/myaccount/profile',
    method: 'GET',
    accessToken: options?.accessToken
  }, _transactions.ProfileTransaction);
  return transaction;
};

/**
 * @scope: okta.myAccount.profile.manage
 */
exports.getProfile = getProfile;
const updateProfile = async (oktaAuth, options) => {
  const {
    payload,
    accessToken
  } = options;
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: '/idp/myaccount/profile',
    method: 'PUT',
    payload,
    accessToken
  }, _transactions.ProfileTransaction);
  return transaction;
};

/**
 * @scope: okta.myAccount.profile.read
 */
exports.updateProfile = updateProfile;
const getProfileSchema = async (oktaAuth, options) => {
  const transaction = await (0, _request.sendRequest)(oktaAuth, {
    url: '/idp/myaccount/profile/schema',
    method: 'GET',
    accessToken: options?.accessToken
  }, _transactions.ProfileSchemaTransaction);
  return transaction;
};
exports.getProfileSchema = getProfileSchema;
//# sourceMappingURL=profileApi.js.map