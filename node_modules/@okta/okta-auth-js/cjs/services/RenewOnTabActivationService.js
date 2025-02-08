"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.RenewOnTabActivationService = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _features = require("../features");
const getNow = () => Math.floor(Date.now() / 1000);
class RenewOnTabActivationService {
  constructor(tokenManager, options = {}) {
    (0, _defineProperty2.default)(this, "started", false);
    (0, _defineProperty2.default)(this, "lastHidden", -1);
    this.tokenManager = tokenManager;
    this.options = options;
    // store this context for event handler
    this.onPageVisbilityChange = this._onPageVisbilityChange.bind(this);
  }

  // do not use directly, use `onPageVisbilityChange` (with binded this context)
  /* eslint complexity: [0, 10] */
  _onPageVisbilityChange() {
    if (document.hidden) {
      this.lastHidden = getNow();
    }
    // renew will only attempt if tab was inactive for duration
    else if (this.lastHidden > 0 && getNow() - this.lastHidden >= this.options.tabInactivityDuration) {
      const {
        accessToken,
        idToken
      } = this.tokenManager.getTokensSync();
      if (!!accessToken && this.tokenManager.hasExpired(accessToken)) {
        const key = this.tokenManager.getStorageKeyByType('accessToken');
        // Renew errors will emit an "error" event
        this.tokenManager.renew(key).catch(() => {});
      } else if (!!idToken && this.tokenManager.hasExpired(idToken)) {
        const key = this.tokenManager.getStorageKeyByType('idToken');
        // Renew errors will emit an "error" event
        this.tokenManager.renew(key).catch(() => {});
      }
    }
  }
  async start() {
    if (this.canStart() && !!document) {
      document.addEventListener('visibilitychange', this.onPageVisbilityChange);
      this.started = true;
    }
  }
  async stop() {
    if (document) {
      document.removeEventListener('visibilitychange', this.onPageVisbilityChange);
      this.started = false;
    }
  }
  canStart() {
    return (0, _features.isBrowser)() && !!this.options.autoRenew && !!this.options.renewOnTabActivation && !this.started;
  }
  requiresLeadership() {
    return false;
  }
  isStarted() {
    return this.started;
  }
}
exports.RenewOnTabActivationService = RenewOnTabActivationService;
//# sourceMappingURL=RenewOnTabActivationService.js.map