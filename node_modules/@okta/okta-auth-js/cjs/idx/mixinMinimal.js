"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.mixinMinimalIdx = mixinMinimalIdx;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _minimalApi = require("../idx/factory/minimalApi");
var _fingerprint = _interopRequireDefault(require("../browser/fingerprint"));
var webauthn = _interopRequireWildcard(require("./webauthn"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function mixinMinimalIdx(Base) {
  var _class;
  return _class = class OktaAuthIdx extends Base {
    constructor(...args) {
      super(...args);
      this.idx = (0, _minimalApi.createMinimalIdxAPI)(this);
      this.fingerprint = _fingerprint.default.bind(null, this);
    }
  }, (0, _defineProperty2.default)(_class, "webauthn", webauthn), _class;
}
//# sourceMappingURL=mixinMinimal.js.map