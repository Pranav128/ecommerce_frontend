import {
  AuthSdkError,
  OktaAuth,
  toRelativeUrl
} from "./chunk-3STTMA3D.js";
import {
  NavigationStart,
  Router
} from "./chunk-75UTT5YC.js";
import "./chunk-JFXEA5Y4.js";
import "./chunk-4T3K5RY2.js";
import {
  Location
} from "./chunk-ZRBJQHN5.js";
import {
  Component,
  Directive,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  Optional,
  TemplateRef,
  VERSION,
  ViewContainerRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-S2C2LCHH.js";
import "./chunk-MOY5LPCH.js";
import "./chunk-MJQNUHK2.js";
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  filter,
  mergeMap,
  switchMap,
  takeUntil
} from "./chunk-SAI3DHVA.js";
import "./chunk-CPNXOV62.js";

// node_modules/compare-versions/lib/esm/index.js
var compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};
var compare = (v1, v2, operator) => {
  assertValidOperator(operator);
  const res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var validateAndParse = (version) => {
  if (typeof version !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
};
var isWildcard = (s) => s === "*" || s === "x" || s === "X";
var tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
var compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
var compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};
var operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1]
};
var allowedOperators = Object.keys(operatorResMap);
var assertValidOperator = (op) => {
  if (typeof op !== "string") {
    throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
  }
  if (allowedOperators.indexOf(op) === -1) {
    throw new Error(`Invalid operator, expected one of ${allowedOperators.join("|")}`);
  }
};

// node_modules/@okta/okta-angular/fesm2015/okta-okta-angular.js
var OKTA_CONFIG = new InjectionToken("okta.config.angular");
var OKTA_AUTH = new InjectionToken("okta.auth");
var OktaAuthConfigService = class {
  constructor(config) {
    if (config) {
      this.config = config;
    }
  }
  getConfig() {
    return this.config;
  }
  setConfig(config) {
    this.config = config;
  }
};
OktaAuthConfigService.ɵfac = function OktaAuthConfigService_Factory(t) {
  return new (t || OktaAuthConfigService)(ɵɵinject(OKTA_CONFIG, 8));
};
OktaAuthConfigService.ɵprov = ɵɵdefineInjectable({
  token: OktaAuthConfigService,
  factory: OktaAuthConfigService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaAuthConfigService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [OKTA_CONFIG]
      }]
    }];
  }, null);
})();
var __awaiter$3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var OktaCallbackComponent = class {
  constructor(configService, oktaAuth, injector) {
    this.configService = configService;
    this.oktaAuth = oktaAuth;
    this.injector = injector;
  }
  ngOnInit() {
    return __awaiter$3(this, void 0, void 0, function* () {
      const config = this.configService.getConfig();
      if (!config) {
        throw new Error("Okta config is not provided");
      }
      try {
        yield this.oktaAuth.handleLoginRedirect();
      } catch (e) {
        const isInteractionRequiredError = this.oktaAuth.isInteractionRequiredError || this.oktaAuth.idx.isInteractionRequiredError;
        if (isInteractionRequiredError(e) && this.injector) {
          const {
            onAuthResume,
            onAuthRequired
          } = config;
          const callbackFn = onAuthResume || onAuthRequired;
          if (callbackFn) {
            callbackFn(this.oktaAuth, this.injector);
            return;
          }
        }
        this.error = e.toString();
      }
    });
  }
};
OktaCallbackComponent.ɵfac = function OktaCallbackComponent_Factory(t) {
  return new (t || OktaCallbackComponent)(ɵɵdirectiveInject(OktaAuthConfigService), ɵɵdirectiveInject(OKTA_AUTH), ɵɵdirectiveInject(Injector, 8));
};
OktaCallbackComponent.ɵcmp = ɵɵdefineComponent({
  type: OktaCallbackComponent,
  selectors: [["ng-component"]],
  decls: 2,
  vars: 1,
  template: function OktaCallbackComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div");
      ɵɵtext(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.error);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaCallbackComponent, [{
    type: Component,
    args: [{
      template: `<div>{{error}}</div>`
    }]
  }], function() {
    return [{
      type: OktaAuthConfigService
    }, {
      type: OktaAuth,
      decorators: [{
        type: Inject,
        args: [OKTA_AUTH]
      }]
    }, {
      type: Injector,
      decorators: [{
        type: Optional
      }]
    }];
  }, null);
})();
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var OktaAuthGuard = class {
  constructor(oktaAuth, injector, configService) {
    this.oktaAuth = oktaAuth;
    this.injector = injector;
    this.configService = configService;
    this.updateAuthStateListener = (authState) => __awaiter$2(this, void 0, void 0, function* () {
      const isAuthenticated = yield this.isAuthenticated(this.routeData, authState);
      if (!isAuthenticated) {
        this.handleLogin(this.state.url, this.routeData);
      }
    });
    const config = this.configService.getConfig();
    if (!config) {
      throw new Error("Okta config is not provided");
    }
    this.onAuthRequired = config.onAuthRequired;
    const router = injector.get(Router);
    router.events.pipe(filter((e) => e instanceof NavigationStart && this.state && this.state.url !== e.url)).subscribe(() => {
      this.oktaAuth.authStateManager.unsubscribe(this.updateAuthStateListener);
    });
  }
  canLoad(route) {
    var _a;
    return __awaiter$2(this, void 0, void 0, function* () {
      this.onAuthRequired = ((_a = route.data) === null || _a === void 0 ? void 0 : _a.onAuthRequired) || this.onAuthRequired;
      const isAuthenticated = yield this.isAuthenticated(route.data);
      if (isAuthenticated) {
        return true;
      }
      const router = this.injector.get(Router);
      const nav = router.getCurrentNavigation();
      const originalUri = nav ? nav.extractedUrl.toString() : void 0;
      yield this.handleLogin(originalUri, route.data);
      return false;
    });
  }
  /**
   * Gateway for protected route. Returns true if there is a valid idToken,
   * otherwise it will cache the route and start the login flow.
   * @param route
   * @param state
   */
  canActivate(route, state) {
    return __awaiter$2(this, void 0, void 0, function* () {
      this.state = state;
      this.routeData = route.data;
      this.onAuthRequired = route.data && route.data.onAuthRequired || this.onAuthRequired;
      this.oktaAuth.authStateManager.subscribe(this.updateAuthStateListener);
      const isAuthenticated = yield this.isAuthenticated(route.data);
      if (isAuthenticated) {
        return true;
      }
      yield this.handleLogin(state.url, route.data);
      return false;
    });
  }
  canActivateChild(route, state) {
    return __awaiter$2(this, void 0, void 0, function* () {
      return this.canActivate(route, state);
    });
  }
  isAuthenticated(routeData, authState) {
    var _a, _b, _c;
    return __awaiter$2(this, void 0, void 0, function* () {
      const isAuthenticated = authState ? authState === null || authState === void 0 ? void 0 : authState.isAuthenticated : yield this.oktaAuth.isAuthenticated();
      let res = isAuthenticated;
      if ((_a = routeData === null || routeData === void 0 ? void 0 : routeData.okta) === null || _a === void 0 ? void 0 : _a.acrValues) {
        if (!authState) {
          authState = this.oktaAuth.authStateManager.getAuthState();
        }
        res = ((_b = authState === null || authState === void 0 ? void 0 : authState.idToken) === null || _b === void 0 ? void 0 : _b.claims.acr) === ((_c = routeData === null || routeData === void 0 ? void 0 : routeData.okta) === null || _c === void 0 ? void 0 : _c.acrValues);
      }
      return res;
    });
  }
  handleLogin(originalUri, routeData) {
    var _a;
    return __awaiter$2(this, void 0, void 0, function* () {
      if (originalUri) {
        this.oktaAuth.setOriginalUri(originalUri);
      }
      const options = {};
      if ((_a = routeData === null || routeData === void 0 ? void 0 : routeData.okta) === null || _a === void 0 ? void 0 : _a.acrValues) {
        options.acrValues = routeData.okta.acrValues;
      }
      if (this.onAuthRequired) {
        this.onAuthRequired(this.oktaAuth, this.injector, options);
      } else {
        this.oktaAuth.signInWithRedirect(options);
      }
    });
  }
};
OktaAuthGuard.ɵfac = function OktaAuthGuard_Factory(t) {
  return new (t || OktaAuthGuard)(ɵɵinject(OKTA_AUTH), ɵɵinject(Injector), ɵɵinject(OktaAuthConfigService));
};
OktaAuthGuard.ɵprov = ɵɵdefineInjectable({
  token: OktaAuthGuard,
  factory: OktaAuthGuard.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaAuthGuard, [{
    type: Injectable
  }], function() {
    return [{
      type: OktaAuth,
      decorators: [{
        type: Inject,
        args: [OKTA_AUTH]
      }]
    }, {
      type: Injector
    }, {
      type: OktaAuthConfigService
    }];
  }, null);
})();
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var defaultAuthState = {
  isAuthenticated: false
};
var OktaAuthStateService = class {
  constructor(oktaAuth) {
    this.oktaAuth = oktaAuth;
    this._authState = new BehaviorSubject(defaultAuthState);
    this.authState$ = this._authState.asObservable();
    this.updateAuthState = this.updateAuthState.bind(this);
    const initialAuthState = this.oktaAuth.authStateManager.getAuthState() || defaultAuthState;
    this._authState.next(initialAuthState);
    this.oktaAuth.authStateManager.subscribe(this.updateAuthState);
  }
  ngOnDestroy() {
    this.oktaAuth.authStateManager.unsubscribe(this.updateAuthState);
  }
  // Observes as true when any group input can match groups from user claims 
  hasAnyGroups(groups) {
    return this.authState$.pipe(mergeMap(({
      isAuthenticated,
      idToken
    }) => __awaiter$1(this, void 0, void 0, function* () {
      if (!isAuthenticated || !idToken) {
        return false;
      }
      if (typeof groups === "string") {
        groups = {
          groups: [groups]
        };
      }
      if (Array.isArray(groups)) {
        groups = {
          groups
        };
      }
      const key = Object.keys(groups)[0];
      const value = groups[key];
      if (idToken.claims[key]) {
        return value.some((authority) => idToken.claims[key].includes(authority));
      }
      const userInfo = yield this.oktaAuth.getUser();
      if (!userInfo[key]) {
        return false;
      }
      return value.some((authority) => userInfo[key].includes(authority));
    })));
  }
  updateAuthState(authState) {
    this._authState.next(authState);
  }
};
OktaAuthStateService.ɵfac = function OktaAuthStateService_Factory(t) {
  return new (t || OktaAuthStateService)(ɵɵinject(OKTA_AUTH));
};
OktaAuthStateService.ɵprov = ɵɵdefineInjectable({
  token: OktaAuthStateService,
  factory: OktaAuthStateService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaAuthStateService, [{
    type: Injectable
  }], function() {
    return [{
      type: OktaAuth,
      decorators: [{
        type: Inject,
        args: [OKTA_AUTH]
      }]
    }];
  }, null);
})();
var packageInfo = {
  "name": "@okta/okta-angular",
  "version": "6.4.0",
  "authJSMinSupportedVersion": "5.3.1"
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var OktaAuthFactoryService = class _OktaAuthFactoryService {
  static setupOktaAuth(oktaAuth, router, location) {
    const isAuthJsSupported = oktaAuth._oktaUserAgent && compare(oktaAuth._oktaUserAgent.getVersion(), packageInfo.authJSMinSupportedVersion, ">=");
    if (!isAuthJsSupported) {
      throw new AuthSdkError(`Passed in oktaAuth is not compatible with the SDK, minimum supported okta-auth-js version is ${packageInfo.authJSMinSupportedVersion}.`);
    }
    oktaAuth._oktaUserAgent.addEnvironment(`${packageInfo.name}/${packageInfo.version}`);
    oktaAuth._oktaUserAgent.addEnvironment(`Angular/${VERSION.full}`);
    if (!oktaAuth.options.restoreOriginalUri && router && location) {
      oktaAuth.options.restoreOriginalUri = (_, originalUri) => __awaiter(this, void 0, void 0, function* () {
        const baseUrl = window.location.origin + location.prepareExternalUrl("");
        const routePath = toRelativeUrl(originalUri || "/", baseUrl);
        router.navigateByUrl(routePath);
      });
    }
    oktaAuth.start();
  }
  static createOktaAuth(configService, router, location) {
    const config = configService.getConfig();
    if (!config) {
      throw new Error("Okta config is not provided");
    }
    const {
      oktaAuth
    } = config;
    if (!oktaAuth) {
      throw new Error("Okta config should contain oktaAuth");
    }
    _OktaAuthFactoryService.setupOktaAuth(oktaAuth, router, location);
    return oktaAuth;
  }
};
var OktaHasAnyGroupDirective = class {
  constructor(templateRef, viewContainer, authStateService) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.authStateService = authStateService;
    this.groupsSub$ = new ReplaySubject();
    this.destroySub$ = new Subject();
  }
  ngOnInit() {
    this.groupsSub$.pipe(filter((groups) => !!groups), switchMap((groups) => this.authStateService.hasAnyGroups(groups)), takeUntil(this.destroySub$)).subscribe((isAuthorized) => {
      this.viewContainer.clear();
      if (isAuthorized) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["oktaHasAnyGroup"].currentValue !== changes["oktaHasAnyGroup"].previousValue) {
      this.groupsSub$.next(changes["oktaHasAnyGroup"].currentValue);
    }
  }
  ngOnDestroy() {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
};
OktaHasAnyGroupDirective.ɵfac = function OktaHasAnyGroupDirective_Factory(t) {
  return new (t || OktaHasAnyGroupDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(OktaAuthStateService));
};
OktaHasAnyGroupDirective.ɵdir = ɵɵdefineDirective({
  type: OktaHasAnyGroupDirective,
  selectors: [["", "oktaHasAnyGroup", ""]],
  inputs: {
    oktaHasAnyGroup: "oktaHasAnyGroup"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaHasAnyGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[oktaHasAnyGroup]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }, {
      type: ViewContainerRef
    }, {
      type: OktaAuthStateService
    }];
  }, {
    oktaHasAnyGroup: [{
      type: Input
    }]
  });
})();
var OktaAuthModule = class _OktaAuthModule {
  static forRoot(config) {
    return {
      ngModule: _OktaAuthModule,
      providers: [{
        provide: OKTA_CONFIG,
        useValue: config
      }]
    };
  }
};
OktaAuthModule.ɵfac = function OktaAuthModule_Factory(t) {
  return new (t || OktaAuthModule)();
};
OktaAuthModule.ɵmod = ɵɵdefineNgModule({
  type: OktaAuthModule,
  declarations: [OktaCallbackComponent, OktaHasAnyGroupDirective],
  exports: [OktaCallbackComponent, OktaHasAnyGroupDirective]
});
OktaAuthModule.ɵinj = ɵɵdefineInjector({
  providers: [OktaAuthConfigService, OktaAuthStateService, OktaAuthGuard, {
    provide: OKTA_AUTH,
    useFactory: OktaAuthFactoryService.createOktaAuth,
    deps: [OktaAuthConfigService, [new Optional(), Router], [new Optional(), Location]]
  }]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OktaAuthModule, [{
    type: NgModule,
    args: [{
      declarations: [OktaCallbackComponent, OktaHasAnyGroupDirective],
      exports: [OktaCallbackComponent, OktaHasAnyGroupDirective],
      providers: [OktaAuthConfigService, OktaAuthStateService, OktaAuthGuard, {
        provide: OKTA_AUTH,
        useFactory: OktaAuthFactoryService.createOktaAuth,
        deps: [OktaAuthConfigService, [new Optional(), Router], [new Optional(), Location]]
      }]
    }]
  }], null, null);
})();
export {
  OKTA_AUTH,
  OKTA_CONFIG,
  OktaAuthConfigService,
  OktaAuthGuard,
  OktaAuthModule,
  OktaAuthStateService,
  OktaCallbackComponent,
  OktaHasAnyGroupDirective
};
//# sourceMappingURL=@okta_okta-angular.js.map
