"use strict";

exports.createMinimalOktaAuthIdx = createMinimalOktaAuthIdx;
var _mixinMinimal = require("../mixinMinimal");
var _factory = require("../../base/factory");
var _mixin = require("../../storage/mixin");
var _mixin2 = require("../../http/mixin");
var _mixin3 = require("../../session/mixin");
var _minimal = require("../../oidc/mixin/minimal");
function createMinimalOktaAuthIdx(StorageManagerConstructor, OptionsConstructor, TransactionManagerConstructor) {
  const Base = (0, _factory.createOktaAuthBase)(OptionsConstructor);
  const WithStorage = (0, _mixin.mixinStorage)(Base, StorageManagerConstructor);
  const WithHttp = (0, _mixin2.mixinHttp)(WithStorage);
  const WithSession = (0, _mixin3.mixinSession)(WithHttp);
  const WithOAuth = (0, _minimal.mixinMinimalOAuth)(WithSession, TransactionManagerConstructor);
  // do not mixin core
  const WithIdx = (0, _mixinMinimal.mixinMinimalIdx)(WithOAuth);
  return WithIdx;
}
//# sourceMappingURL=MinimalOktaAuthIdx.js.map