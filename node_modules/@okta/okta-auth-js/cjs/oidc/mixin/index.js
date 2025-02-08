"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.mixinOAuth = mixinOAuth;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _http = require("../../http");
var _util = require("../../util");
var crypto = _interopRequireWildcard(require("../../crypto"));
var _pkce = _interopRequireDefault(require("../util/pkce"));
var _api = require("../factory/api");
var _TokenManager = require("../TokenManager");
var _util2 = require("../util");
var _dpop = require("../dpop");
var _errors = require("../../errors");
var _node = require("./node");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function mixinOAuth(Base, TransactionManagerConstructor) {
  var _class;
  const WithOriginalUri = (0, _node.provideOriginalUri)(Base);
  return _class = class OktaAuthOAuth extends WithOriginalUri {
    constructor(...args) {
      super(...args);
      this.transactionManager = new TransactionManagerConstructor(Object.assign({
        storageManager: this.storageManager
      }, this.options.transactionManager));
      this.pkce = {
        DEFAULT_CODE_CHALLENGE_METHOD: _pkce.default.DEFAULT_CODE_CHALLENGE_METHOD,
        generateVerifier: _pkce.default.generateVerifier,
        computeChallenge: _pkce.default.computeChallenge
      };
      this._pending = {
        handleLogin: false
      };
      this._tokenQueue = new _util.PromiseQueue();
      this.token = (0, _api.createTokenAPI)(this, this._tokenQueue);

      // TokenManager
      this.tokenManager = new _TokenManager.TokenManager(this, this.options.tokenManager);
      this.endpoints = (0, _api.createEndpoints)(this);
    }

    // inherited from subclass
    clearStorage() {
      super.clearStorage();

      // Clear all local tokens
      this.tokenManager.clear();
    }

    // Returns true if both accessToken and idToken are not expired
    // If `autoRenew` option is set, will attempt to renew expired tokens before returning.
    // eslint-disable-next-line complexity
    async isAuthenticated(options = {}) {
      // TODO: remove dependency on tokenManager options in next major version - OKTA-473815
      const {
        autoRenew,
        autoRemove
      } = this.tokenManager.getOptions();
      const shouldRenew = options.onExpiredToken ? options.onExpiredToken === 'renew' : autoRenew;
      const shouldRemove = options.onExpiredToken ? options.onExpiredToken === 'remove' : autoRemove;
      let {
        accessToken
      } = this.tokenManager.getTokensSync();
      if (accessToken && this.tokenManager.hasExpired(accessToken)) {
        accessToken = undefined;
        if (shouldRenew) {
          try {
            accessToken = await this.tokenManager.renew('accessToken');
          } catch {
            // Renew errors will emit an "error" event 
          }
        } else if (shouldRemove) {
          this.tokenManager.remove('accessToken');
        }
      }
      let {
        idToken
      } = this.tokenManager.getTokensSync();
      if (idToken && this.tokenManager.hasExpired(idToken)) {
        idToken = undefined;
        if (shouldRenew) {
          try {
            idToken = await this.tokenManager.renew('idToken');
          } catch {
            // Renew errors will emit an "error" event 
          }
        } else if (shouldRemove) {
          this.tokenManager.remove('idToken');
        }
      }
      return !!(accessToken && idToken);
    }
    async signInWithRedirect(opts = {}) {
      const {
        originalUri,
        ...additionalParams
      } = opts;
      if (this._pending.handleLogin) {
        // Don't trigger second round
        return;
      }
      this._pending.handleLogin = true;
      try {
        // Trigger default signIn redirect flow
        if (originalUri) {
          this.setOriginalUri(originalUri);
        }
        const params = Object.assign({
          // TODO: remove this line when default scopes are changed OKTA-343294
          scopes: this.options.scopes || ['openid', 'email', 'profile']
        }, additionalParams);
        await this.token.getWithRedirect(params);
      } finally {
        this._pending.handleLogin = false;
      }
    }
    async getUser() {
      const {
        idToken,
        accessToken
      } = this.tokenManager.getTokensSync();
      return this.token.getUserInfo(accessToken, idToken);
    }
    getIdToken() {
      const {
        idToken
      } = this.tokenManager.getTokensSync();
      return idToken ? idToken.idToken : undefined;
    }
    getAccessToken() {
      const {
        accessToken
      } = this.tokenManager.getTokensSync();
      return accessToken ? accessToken.accessToken : undefined;
    }
    getRefreshToken() {
      const {
        refreshToken
      } = this.tokenManager.getTokensSync();
      return refreshToken ? refreshToken.refreshToken : undefined;
    }
    async getOrRenewAccessToken() {
      const {
        accessToken
      } = this.tokenManager.getTokensSync();
      if (accessToken && !this.tokenManager.hasExpired(accessToken)) {
        return accessToken.accessToken;
      }
      try {
        const key = this.tokenManager.getStorageKeyByType('accessToken');
        const token = await this.tokenManager.renew(key ?? 'accessToken');
        return token?.accessToken ?? null;
      } catch (err) {
        this.emitter.emit('error', err);
        return null;
      }
    }

    /**
     * Store parsed tokens from redirect url
     */
    async storeTokensFromRedirect() {
      const {
        tokens,
        responseType
      } = await this.token.parseFromUrl();
      if (responseType !== 'none') {
        this.tokenManager.setTokens(tokens);
      }
    }
    isLoginRedirect() {
      return (0, _util2.isLoginRedirect)(this);
    }
    isPKCE() {
      return !!this.options.pkce;
    }
    hasResponseType(responseType) {
      return (0, _util2.hasResponseType)(responseType, this.options);
    }
    isAuthorizationCodeFlow() {
      return this.hasResponseType('code');
    }

    // Escape hatch method to make arbitrary OKTA API call
    async invokeApiMethod(options) {
      if (!options.accessToken) {
        const accessToken = (await this.tokenManager.getTokens()).accessToken;
        options.accessToken = accessToken?.accessToken;
      }
      return (0, _http.httpRequest)(this, options);
    }

    // Revokes the access token for the application session
    async revokeAccessToken(accessToken) {
      if (!accessToken) {
        const tokens = await this.tokenManager.getTokens();
        accessToken = tokens.accessToken;
        const accessTokenKey = this.tokenManager.getStorageKeyByType('accessToken');
        this.tokenManager.remove(accessTokenKey);
        if (this.options.dpop) {
          await (0, _dpop.clearDPoPKeyPairAfterRevoke)('access', tokens);
        }
      }
      // Access token may have been removed. In this case, we will silently succeed.
      if (!accessToken) {
        return Promise.resolve(null);
      }
      return this.token.revoke(accessToken);
    }

    // Revokes the refresh token for the application session
    async revokeRefreshToken(refreshToken) {
      if (!refreshToken) {
        const tokens = await this.tokenManager.getTokens();
        refreshToken = tokens.refreshToken;
        const refreshTokenKey = this.tokenManager.getStorageKeyByType('refreshToken');
        this.tokenManager.remove(refreshTokenKey);
        if (this.options.dpop) {
          await (0, _dpop.clearDPoPKeyPairAfterRevoke)('refresh', tokens);
        }
      }
      // Refresh token may have been removed. In this case, we will silently succeed.
      if (!refreshToken) {
        return Promise.resolve(null);
      }
      return this.token.revoke(refreshToken);
    }
    getSignOutRedirectUrl(options = {}) {
      let {
        idToken,
        postLogoutRedirectUri,
        state
      } = options;
      if (!idToken) {
        idToken = this.tokenManager.getTokensSync().idToken;
      }
      if (!idToken) {
        return '';
      }
      if (postLogoutRedirectUri === undefined) {
        postLogoutRedirectUri = this.options.postLogoutRedirectUri;
      }
      const logoutUrl = (0, _util2.getOAuthUrls)(this).logoutUrl;
      const idTokenHint = idToken.idToken; // a string
      let logoutUri = logoutUrl + '?id_token_hint=' + encodeURIComponent(idTokenHint);
      if (postLogoutRedirectUri) {
        logoutUri += '&post_logout_redirect_uri=' + encodeURIComponent(postLogoutRedirectUri);
      }
      // State allows option parameters to be passed to logout redirect uri
      if (state) {
        logoutUri += '&state=' + encodeURIComponent(state);
      }
      return logoutUri;
    }

    // Revokes refreshToken or accessToken, clears all local tokens, then redirects to Okta to end the SSO session.
    // eslint-disable-next-line complexity, max-statements
    async signOut(options) {
      options = Object.assign({}, options);

      // postLogoutRedirectUri must be whitelisted in Okta Admin UI
      const defaultUri = window.location.origin;
      const currentUri = window.location.href;
      // Fix for issue/1410 - allow for no postLogoutRedirectUri to be passed, resulting in /logout default behavior
      //    "If no Okta session exists, this endpoint has no effect and the browser is redirected immediately to the
      //    Okta sign-in page or the post_logout_redirect_uri (if specified)."
      // - https://developer.okta.com/docs/reference/api/oidc/#logout
      const postLogoutRedirectUri = options.postLogoutRedirectUri === null ? null : options.postLogoutRedirectUri || this.options.postLogoutRedirectUri || defaultUri;
      const state = options?.state;
      let accessToken = options.accessToken;
      let refreshToken = options.refreshToken;
      const revokeAccessToken = options.revokeAccessToken !== false;
      const revokeRefreshToken = options.revokeRefreshToken !== false;
      if (revokeRefreshToken && typeof refreshToken === 'undefined') {
        refreshToken = this.tokenManager.getTokensSync().refreshToken;
      }
      if (revokeAccessToken && typeof accessToken === 'undefined') {
        accessToken = this.tokenManager.getTokensSync().accessToken;
      }
      if (!options.idToken) {
        options.idToken = this.tokenManager.getTokensSync().idToken;
      }
      if (revokeRefreshToken && refreshToken) {
        await this.revokeRefreshToken(refreshToken);
      }
      if (revokeAccessToken && accessToken) {
        await this.revokeAccessToken(accessToken);
      }
      const dpopPairId = accessToken?.dpopPairId ?? refreshToken?.dpopPairId;
      if (this.options.dpop && dpopPairId) {
        await (0, _dpop.clearDPoPKeyPair)(dpopPairId);
      }
      const logoutUri = this.getSignOutRedirectUrl({
        ...options,
        postLogoutRedirectUri
      });
      // No logoutUri? This can happen if the storage was cleared.
      // Fallback to XHR signOut, then simulate a redirect to the post logout uri
      if (!logoutUri) {
        // local tokens are cleared once session is closed
        const sessionClosed = await this.closeSession(); // can throw if the user cannot be signed out
        const redirectUri = new URL(postLogoutRedirectUri || defaultUri); // during fallback, redirectUri cannot be null
        if (state) {
          redirectUri.searchParams.append('state', state);
        }
        if (postLogoutRedirectUri === currentUri) {
          // window.location.reload(); // force a hard reload if URI is not changing
          window.location.href = redirectUri.href;
        } else {
          window.location.assign(redirectUri.href);
        }
        return sessionClosed;
      } else {
        if (options.clearTokensBeforeRedirect) {
          // Clear all local tokens
          this.tokenManager.clear();
        } else {
          this.tokenManager.addPendingRemoveFlags();
        }
        // Flow ends with logout redirect
        window.location.assign(logoutUri);
        return true;
      }
    }
    async getDPoPAuthorizationHeaders(params) {
      if (!this.options.dpop) {
        throw new _errors.AuthSdkError('DPoP is not configured for this client instance');
      }
      let {
        accessToken
      } = params;
      if (!accessToken) {
        accessToken = this.tokenManager.getTokensSync().accessToken;
      }
      if (!accessToken) {
        throw new _errors.AuthSdkError('AccessToken is required to generate a DPoP Proof');
      }
      const keyPair = await (0, _dpop.findKeyPair)(accessToken?.dpopPairId);
      const proof = await (0, _dpop.generateDPoPProof)({
        ...params,
        keyPair,
        accessToken: accessToken.accessToken
      });
      return {
        Authorization: `DPoP ${accessToken.accessToken}`,
        Dpop: proof
      };
    }
    async clearDPoPStorage(clearAll = false) {
      if (clearAll) {
        return (0, _dpop.clearAllDPoPKeyPairs)();
      }
      const tokens = await this.tokenManager.getTokens();
      const keyPair = tokens.accessToken?.dpopPairId || tokens.refreshToken?.dpopPairId;
      if (keyPair) {
        await (0, _dpop.clearDPoPKeyPair)(keyPair);
      }
    }
    parseUseDPoPNonceError(headers) {
      const wwwAuth = _errors.WWWAuthError.getWWWAuthenticateHeader(headers);
      const wwwErr = _errors.WWWAuthError.parseHeader(wwwAuth ?? '');
      if ((0, _dpop.isDPoPNonceError)(wwwErr)) {
        let nonce = null;
        if ((0, _util.isFunction)(headers?.get)) {
          nonce = headers.get('DPoP-Nonce');
        }
        nonce = nonce ?? headers['dpop-nonce'] ?? headers['DPoP-Nonce'];
        return nonce;
      }
      return null;
    }
  }, (0, _defineProperty2.default)(_class, "crypto", crypto), _class;
}
//# sourceMappingURL=index.js.map