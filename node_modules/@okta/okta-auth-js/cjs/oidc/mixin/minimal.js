"use strict";

exports.mixinMinimalOAuth = mixinMinimalOAuth;
var _baseApi = require("../factory/baseApi");
var _util = require("../util");
function mixinMinimalOAuth(Base, TransactionManagerConstructor) {
  return class OktaAuthOAuth extends Base {
    constructor(...args) {
      super(...args);
      this.transactionManager = new TransactionManagerConstructor(Object.assign({
        storageManager: this.storageManager
      }, this.options.transactionManager));
      this.token = (0, _baseApi.createBaseTokenAPI)(this);
    }
    isLoginRedirect() {
      return (0, _util.isLoginRedirect)(this);
    }
    isPKCE() {
      return !!this.options.pkce;
    }
    hasResponseType(responseType) {
      return (0, _util.hasResponseType)(responseType, this.options);
    }
    isAuthorizationCodeFlow() {
      return this.hasResponseType('code');
    }
  };
}
//# sourceMappingURL=minimal.js.map