"use strict";

var _api = require("./api");
Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});
var _OktaAuthIdx = require("./OktaAuthIdx");
Object.keys(_OktaAuthIdx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _OktaAuthIdx[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _OktaAuthIdx[key];
    }
  });
});
var _MinimalOktaAuthIdx = require("./MinimalOktaAuthIdx");
Object.keys(_MinimalOktaAuthIdx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MinimalOktaAuthIdx[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MinimalOktaAuthIdx[key];
    }
  });
});
//# sourceMappingURL=index.js.map