import {
  __async,
  __commonJS,
  __export,
  __toESM
} from "./chunk-CPNXOV62.js";

// node_modules/tiny-emitter/index.js
var require_tiny_emitter = __commonJS({
  "node_modules/tiny-emitter/index.js"(exports, module) {
    function E() {
    }
    E.prototype = {
      on: function(name, callback, ctx2) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx: ctx2
        });
        return this;
      },
      once: function(name, callback, ctx2) {
        var self2 = this;
        function listener() {
          self2.off(name, listener);
          callback.apply(ctx2, arguments);
        }
        ;
        listener._ = callback;
        return this.on(name, listener, ctx2);
      },
      emit: function(name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
      },
      off: function(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
      }
    };
    module.exports = E;
  }
});

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
      }
      F.prototype = global;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch(input, init2) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init2);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch;
          self2.Headers = Headers;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx2 = __self__;
    exports = ctx2.fetch;
    exports.default = ctx2.fetch;
    exports.fetch = ctx2.fetch;
    exports.Headers = ctx2.Headers;
    exports.Request = ctx2.Request;
    exports.Response = ctx2.Response;
    module.exports = exports;
  }
});

// node_modules/p-cancelable/index.js
var require_p_cancelable = __commonJS({
  "node_modules/p-cancelable/index.js"(exports, module) {
    "use strict";
    var CancelError = class extends Error {
      constructor(reason) {
        super(reason || "Promise was canceled");
        this.name = "CancelError";
      }
      get isCanceled() {
        return true;
      }
    };
    var PCancelable2 = class _PCancelable {
      static fn(userFn) {
        return (...arguments_) => {
          return new _PCancelable((resolve, reject, onCancel) => {
            arguments_.push(onCancel);
            userFn(...arguments_).then(resolve, reject);
          });
        };
      }
      constructor(executor) {
        this._cancelHandlers = [];
        this._isPending = true;
        this._isCanceled = false;
        this._rejectOnCancel = true;
        this._promise = new Promise((resolve, reject) => {
          this._reject = reject;
          const onResolve = (value) => {
            if (!this._isCanceled || !onCancel.shouldReject) {
              this._isPending = false;
              resolve(value);
            }
          };
          const onReject = (error) => {
            this._isPending = false;
            reject(error);
          };
          const onCancel = (handler) => {
            if (!this._isPending) {
              throw new Error("The `onCancel` handler was attached after the promise settled.");
            }
            this._cancelHandlers.push(handler);
          };
          Object.defineProperties(onCancel, {
            shouldReject: {
              get: () => this._rejectOnCancel,
              set: (boolean) => {
                this._rejectOnCancel = boolean;
              }
            }
          });
          return executor(onResolve, onReject, onCancel);
        });
      }
      then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this._promise.catch(onRejected);
      }
      finally(onFinally) {
        return this._promise.finally(onFinally);
      }
      cancel(reason) {
        if (!this._isPending || this._isCanceled) {
          return;
        }
        this._isCanceled = true;
        if (this._cancelHandlers.length > 0) {
          try {
            for (const handler of this._cancelHandlers) {
              handler();
            }
          } catch (error) {
            this._reject(error);
            return;
          }
        }
        if (this._rejectOnCancel) {
          this._reject(new CancelError(reason));
        }
      }
      get isCanceled() {
        return this._isCanceled;
      }
    };
    Object.setPrototypeOf(PCancelable2.prototype, Promise.prototype);
    module.exports = PCancelable2;
    module.exports.CancelError = CancelError;
  }
});

// node_modules/@okta/okta-auth-js/esm/browser/idx/types/api.js
var IdxStatus;
(function(IdxStatus2) {
  IdxStatus2["SUCCESS"] = "SUCCESS";
  IdxStatus2["PENDING"] = "PENDING";
  IdxStatus2["FAILURE"] = "FAILURE";
  IdxStatus2["TERMINAL"] = "TERMINAL";
  IdxStatus2["CANCELED"] = "CANCELED";
})(IdxStatus || (IdxStatus = {}));
var AuthenticatorKey;
(function(AuthenticatorKey2) {
  AuthenticatorKey2["OKTA_PASSWORD"] = "okta_password";
  AuthenticatorKey2["OKTA_EMAIL"] = "okta_email";
  AuthenticatorKey2["PHONE_NUMBER"] = "phone_number";
  AuthenticatorKey2["GOOGLE_AUTHENTICATOR"] = "google_otp";
  AuthenticatorKey2["SECURITY_QUESTION"] = "security_question";
  AuthenticatorKey2["OKTA_VERIFY"] = "okta_verify";
  AuthenticatorKey2["WEBAUTHN"] = "webauthn";
})(AuthenticatorKey || (AuthenticatorKey = {}));
var IdxFeature;
(function(IdxFeature2) {
  IdxFeature2["PASSWORD_RECOVERY"] = "recover-password";
  IdxFeature2["REGISTRATION"] = "enroll-profile";
  IdxFeature2["SOCIAL_IDP"] = "redirect-idp";
  IdxFeature2["ACCOUNT_UNLOCK"] = "unlock-account";
})(IdxFeature || (IdxFeature = {}));
function isAuthenticator(obj) {
  return obj && (obj.key || obj.id);
}

// node_modules/@okta/okta-auth-js/esm/browser/util/console.js
function getNativeConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  } else if (typeof console !== "undefined") {
    return console;
  } else {
    return void 0;
  }
}
function getConsole() {
  var nativeConsole = getNativeConsole();
  if (nativeConsole && nativeConsole.log) {
    return nativeConsole;
  }
  return {
    log: function() {
    },
    warn: function() {
    },
    group: function() {
    },
    groupEnd: function() {
    }
  };
}
function warn(text) {
  getConsole().warn("[okta-auth-sdk] WARN: " + text);
}
function deprecate(text) {
  getConsole().warn("[okta-auth-sdk] DEPRECATION: " + text);
}
function deprecateWrap(text, fn) {
  return function() {
    deprecate(text);
    return fn.apply(null, arguments);
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/util/object.js
function bind(fn, ctx2) {
  var additionalArgs = Array.prototype.slice.call(arguments, 2);
  return function() {
    var args = Array.prototype.slice.call(arguments);
    args = additionalArgs.concat(args);
    return fn.apply(ctx2, args);
  };
}
function extend() {
  var obj1 = arguments[0];
  var objArray = [].slice.call(arguments, 1);
  objArray.forEach(function(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop) && obj[prop] !== void 0) {
        obj1[prop] = obj[prop];
      }
    }
  });
  return obj1;
}
function removeNils(obj) {
  var cleaned = {};
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      var value = obj[prop];
      if (value !== null && value !== void 0) {
        cleaned[prop] = value;
      }
    }
  }
  return cleaned;
}
function clone(obj) {
  if (obj) {
    var str = JSON.stringify(obj);
    if (str) {
      return JSON.parse(str);
    }
  }
  return obj;
}
function omit(obj, ...props) {
  var newobj = {};
  for (var p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p) && props.indexOf(p) == -1) {
      newobj[p] = obj[p];
    }
  }
  return clone(newobj);
}
function find(collection, searchParams) {
  var c2 = collection.length;
  while (c2--) {
    var item = collection[c2];
    var found = true;
    for (var prop in searchParams) {
      if (!Object.prototype.hasOwnProperty.call(searchParams, prop)) {
        continue;
      }
      if (item[prop] !== searchParams[prop]) {
        found = false;
        break;
      }
    }
    if (found) {
      return item;
    }
  }
}
function getLink(obj, linkName, altName) {
  if (!obj || !obj._links) {
    return;
  }
  var link = clone(obj._links[linkName]);
  if (link && link.name && altName) {
    if (link.name === altName) {
      return link;
    }
  } else {
    return link;
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/errors/CustomError.js
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/util/types.js
function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isNumber(obj) {
  return Object.prototype.toString.call(obj) === "[object Number]";
}
function isFunction(fn) {
  return !!fn && {}.toString.call(fn) === "[object Function]";
}
function isPromise(obj) {
  return obj && obj.finally && typeof obj.finally === "function";
}

// node_modules/@okta/okta-auth-js/esm/browser/errors/WWWAuthError.js
var WWWAuthError = class _WWWAuthError extends CustomError {
  constructor(scheme, parameters, resp) {
    var _a;
    super((_a = parameters.error) !== null && _a !== void 0 ? _a : _WWWAuthError.UNKNOWN_ERROR);
    this.name = "WWWAuthError";
    this.resp = null;
    this.scheme = scheme;
    this.parameters = parameters;
    if (resp) {
      this.resp = resp;
    }
  }
  get error() {
    return this.parameters.error;
  }
  get errorCode() {
    return this.error;
  }
  get error_description() {
    return this.parameters.error_description;
  }
  get errorDescription() {
    return this.error_description;
  }
  get errorSummary() {
    return this.errorDescription;
  }
  get realm() {
    return this.parameters.realm;
  }
  static parseHeader(header) {
    var _a;
    if (!header) {
      return null;
    }
    const regex = /(?:,|, )?([a-zA-Z0-9!#$%&'*+\-.^_`|~]+)=(?:"([a-zA-Z0-9!#$%&'*+\-.,^_`|~ /:]+)"|([a-zA-Z0-9!#$%&'*+\-.^_`|~/:]+))/g;
    const firstSpace = header.indexOf(" ");
    const scheme = header.slice(0, firstSpace);
    const remaining = header.slice(firstSpace + 1);
    const params = {};
    let match;
    while ((match = regex.exec(remaining)) !== null) {
      params[match[1]] = (_a = match[2]) !== null && _a !== void 0 ? _a : match[3];
    }
    return new _WWWAuthError(scheme, params);
  }
  static getWWWAuthenticateHeader(headers = {}) {
    var _a;
    if (isFunction(headers === null || headers === void 0 ? void 0 : headers.get)) {
      return headers.get("WWW-Authenticate");
    }
    return (_a = headers["www-authenticate"]) !== null && _a !== void 0 ? _a : headers["WWW-Authenticate"];
  }
};
WWWAuthError.UNKNOWN_ERROR = "UNKNOWN_WWW_AUTH_ERROR";

// node_modules/@okta/okta-auth-js/esm/browser/util/misc.js
function isoToUTCString(str) {
  var parts = str.match(/\d+/g), isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]), isoDate = new Date(isoTime);
  return isoDate.toUTCString();
}
function genRandomString(length) {
  var randomCharset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var random = "";
  for (var c2 = 0, cl = randomCharset.length; c2 < length; ++c2) {
    random += randomCharset[Math.floor(Math.random() * cl)];
  }
  return random;
}
function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}
function split2(str, delim) {
  const parts = str.split(delim);
  return [
    parts[0],
    parts.splice(1, parts.length).join(delim)
  ];
}

// node_modules/@okta/okta-auth-js/esm/browser/util/url.js
function isAbsoluteUrl(url) {
  return /^[a-z][a-z0-9+.-]*:/i.test(url);
}
function toAbsoluteUrl(url = "", baseUrl) {
  if (isAbsoluteUrl(url)) {
    return url;
  }
  baseUrl = removeTrailingSlash(baseUrl);
  return url[0] === "/" ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
}
function toRelativeUrl(url = "", baseUrl) {
  if (isAbsoluteUrl(url)) {
    url = url.substring(baseUrl.length);
  }
  return url[0] === "/" ? url : `/${url}`;
}
function toQueryString(obj) {
  var str = [];
  if (obj !== null) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== void 0 && obj[key] !== null) {
        str.push(key + "=" + encodeURIComponent(obj[key]));
      }
    }
  }
  if (str.length) {
    return "?" + str.join("&");
  } else {
    return "";
  }
}
function removeTrailingSlash(path) {
  if (!path) {
    return;
  }
  var trimmed = path.replace(/^\s+|\s+$/gm, "");
  trimmed = trimmed.replace(/\/+$/, "");
  return trimmed;
}

// node_modules/@okta/okta-auth-js/esm/browser/errors/AuthSdkError.js
var AuthSdkError = class extends CustomError {
  constructor(msg, xhr) {
    super(msg);
    this.name = "AuthSdkError";
    this.errorCode = "INTERNAL";
    this.errorSummary = msg;
    this.errorLink = "INTERNAL";
    this.errorId = "INTERNAL";
    this.errorCauses = [];
    if (xhr) {
      this.xhr = xhr;
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/oauth.js
function generateState() {
  return genRandomString(64);
}
function generateNonce() {
  return genRandomString(64);
}
function getIssuer(sdk, options = {}) {
  const issuer = removeTrailingSlash(options.issuer) || sdk.options.issuer;
  return issuer;
}
function getOAuthBaseUrl(sdk, options = {}) {
  const issuer = getIssuer(sdk, options);
  const baseUrl = issuer.indexOf("/oauth2") > 0 ? issuer : issuer + "/oauth2";
  return baseUrl;
}
function getOAuthDomain(sdk, options = {}) {
  const issuer = getIssuer(sdk, options);
  const domain = issuer.split("/oauth2")[0];
  return domain;
}
function getOAuthUrls(sdk, options) {
  if (arguments.length > 2) {
    throw new AuthSdkError('As of version 3.0, "getOAuthUrls" takes only a single set of options');
  }
  options = options || {};
  var authorizeUrl = removeTrailingSlash(options.authorizeUrl) || sdk.options.authorizeUrl;
  var issuer = getIssuer(sdk, options);
  var userinfoUrl = removeTrailingSlash(options.userinfoUrl) || sdk.options.userinfoUrl;
  var tokenUrl = removeTrailingSlash(options.tokenUrl) || sdk.options.tokenUrl;
  var logoutUrl = removeTrailingSlash(options.logoutUrl) || sdk.options.logoutUrl;
  var revokeUrl = removeTrailingSlash(options.revokeUrl) || sdk.options.revokeUrl;
  var baseUrl = getOAuthBaseUrl(sdk, options);
  authorizeUrl = authorizeUrl || baseUrl + "/v1/authorize";
  userinfoUrl = userinfoUrl || baseUrl + "/v1/userinfo";
  tokenUrl = tokenUrl || baseUrl + "/v1/token";
  revokeUrl = revokeUrl || baseUrl + "/v1/revoke";
  logoutUrl = logoutUrl || baseUrl + "/v1/logout";
  return {
    issuer,
    authorizeUrl,
    userinfoUrl,
    tokenUrl,
    revokeUrl,
    logoutUrl
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/oauthMeta.js
function createOAuthMeta(sdk, tokenParams) {
  const issuer = sdk.options.issuer;
  const urls = getOAuthUrls(sdk, tokenParams);
  const oauthMeta = {
    issuer,
    urls,
    clientId: tokenParams.clientId,
    redirectUri: tokenParams.redirectUri,
    responseType: tokenParams.responseType,
    responseMode: tokenParams.responseMode,
    scopes: tokenParams.scopes,
    state: tokenParams.state,
    nonce: tokenParams.nonce,
    ignoreSignature: tokenParams.ignoreSignature,
    acrValues: tokenParams.acrValues
  };
  if (tokenParams.pkce === false) {
    return oauthMeta;
  }
  const pkceMeta = Object.assign(Object.assign({}, oauthMeta), { codeVerifier: tokenParams.codeVerifier, codeChallengeMethod: tokenParams.codeChallengeMethod, codeChallenge: tokenParams.codeChallenge });
  return pkceMeta;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/transactionMeta.js
var import_tiny_emitter = __toESM(require_tiny_emitter(), 1);

// node_modules/js-cookie/dist/js.cookie.mjs
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get2(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get: get2,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });

// node_modules/@okta/okta-auth-js/esm/browser/idx/transactionMeta.js
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/types/Token.js
var TokenKind;
(function(TokenKind2) {
  TokenKind2["ACCESS"] = "accessToken";
  TokenKind2["ID"] = "idToken";
  TokenKind2["REFRESH"] = "refreshToken";
})(TokenKind || (TokenKind = {}));
function isToken(obj) {
  if (obj && (obj.accessToken || obj.idToken || obj.refreshToken) && Array.isArray(obj.scopes)) {
    return true;
  }
  return false;
}
function isAccessToken(obj) {
  return obj && obj.accessToken;
}
function isIDToken(obj) {
  return obj && obj.idToken;
}
function isRefreshToken(obj) {
  return obj && obj.refreshToken;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/transactionMeta.js
function createTransactionMeta(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    const tokenParams = yield authClient.token.prepareTokenParams(options);
    const pkceMeta = createOAuthMeta(authClient, tokenParams);
    let { flow = "default", withCredentials = true, activationToken = void 0, recoveryToken = void 0, maxAge = void 0, acrValues = void 0 } = Object.assign(Object.assign({}, authClient.options), options);
    const meta = Object.assign(Object.assign({}, pkceMeta), {
      flow,
      withCredentials,
      activationToken,
      recoveryToken,
      maxAge,
      acrValues
    });
    return meta;
  });
}
function hasSavedInteractionHandle(authClient, options) {
  const savedMeta = getSavedTransactionMeta(authClient, options);
  if (savedMeta === null || savedMeta === void 0 ? void 0 : savedMeta.interactionHandle) {
    return true;
  }
  return false;
}
function getSavedTransactionMeta(authClient, options) {
  options = removeNils(options);
  options = Object.assign(Object.assign({}, authClient.options), options);
  let savedMeta;
  try {
    savedMeta = authClient.transactionManager.load(options);
  } catch (e) {
  }
  if (!savedMeta) {
    return;
  }
  if (isTransactionMetaValid(savedMeta, options)) {
    return savedMeta;
  }
  warn("Saved transaction meta does not match the current configuration. This may indicate that two apps are sharing a storage key.");
}
function getTransactionMeta(authClient, options) {
  return __async(this, null, function* () {
    options = removeNils(options);
    options = Object.assign(Object.assign({}, authClient.options), options);
    const validExistingMeta = getSavedTransactionMeta(authClient, options);
    if (validExistingMeta) {
      return validExistingMeta;
    }
    return createTransactionMeta(authClient, options);
  });
}
function saveTransactionMeta(authClient, meta) {
  authClient.transactionManager.save(meta, { muteWarning: true });
}
function clearTransactionMeta(authClient) {
  authClient.transactionManager.clear();
}
function isTransactionMetaValid(meta, options = {}) {
  const keys = [
    "issuer",
    "clientId",
    "redirectUri",
    "state",
    "codeChallenge",
    "codeChallengeMethod",
    "activationToken",
    "recoveryToken"
  ];
  if (isTransactionMetaValidForOptions(meta, options, keys) === false) {
    return false;
  }
  const { flow } = options;
  if (isTransactionMetaValidForFlow(meta, flow) === false) {
    return false;
  }
  return true;
}
function isTransactionMetaValidForFlow(meta, flow) {
  const shouldValidateFlow = flow && flow !== "default" && flow !== "proceed";
  if (shouldValidateFlow) {
    if (flow !== meta.flow) {
      return false;
    }
  }
  return true;
}
function isTransactionMetaValidForOptions(meta, options, keys) {
  const mismatch = keys.some((key) => {
    const value = options[key];
    if (value && value !== meta[key]) {
      return true;
    }
  });
  return !mismatch;
}

// node_modules/@okta/okta-auth-js/esm/browser/constants.js
var constants_exports = {};
__export(constants_exports, {
  ACCESS_TOKEN_STORAGE_KEY: () => ACCESS_TOKEN_STORAGE_KEY,
  CACHE_STORAGE_NAME: () => CACHE_STORAGE_NAME,
  DEFAULT_CACHE_DURATION: () => DEFAULT_CACHE_DURATION,
  DEFAULT_CODE_CHALLENGE_METHOD: () => DEFAULT_CODE_CHALLENGE_METHOD,
  DEFAULT_MAX_CLOCK_SKEW: () => DEFAULT_MAX_CLOCK_SKEW,
  DEFAULT_POLLING_DELAY: () => DEFAULT_POLLING_DELAY,
  IDX_API_VERSION: () => IDX_API_VERSION,
  IDX_RESPONSE_STORAGE_NAME: () => IDX_RESPONSE_STORAGE_NAME,
  ID_TOKEN_STORAGE_KEY: () => ID_TOKEN_STORAGE_KEY,
  MAX_VERIFIER_LENGTH: () => MAX_VERIFIER_LENGTH,
  MIN_VERIFIER_LENGTH: () => MIN_VERIFIER_LENGTH,
  ORIGINAL_URI_STORAGE_NAME: () => ORIGINAL_URI_STORAGE_NAME,
  PKCE_STORAGE_NAME: () => PKCE_STORAGE_NAME,
  REFERRER_PATH_STORAGE_KEY: () => REFERRER_PATH_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY: () => REFRESH_TOKEN_STORAGE_KEY,
  SHARED_TRANSACTION_STORAGE_NAME: () => SHARED_TRANSACTION_STORAGE_NAME,
  STATE_TOKEN_KEY_NAME: () => STATE_TOKEN_KEY_NAME,
  TOKEN_STORAGE_NAME: () => TOKEN_STORAGE_NAME,
  TRANSACTION_STORAGE_NAME: () => TRANSACTION_STORAGE_NAME
});
var STATE_TOKEN_KEY_NAME = "oktaStateToken";
var DEFAULT_POLLING_DELAY = 500;
var DEFAULT_MAX_CLOCK_SKEW = 300;
var DEFAULT_CACHE_DURATION = 86400;
var TOKEN_STORAGE_NAME = "okta-token-storage";
var CACHE_STORAGE_NAME = "okta-cache-storage";
var PKCE_STORAGE_NAME = "okta-pkce-storage";
var TRANSACTION_STORAGE_NAME = "okta-transaction-storage";
var SHARED_TRANSACTION_STORAGE_NAME = "okta-shared-transaction-storage";
var ORIGINAL_URI_STORAGE_NAME = "okta-original-uri-storage";
var IDX_RESPONSE_STORAGE_NAME = "okta-idx-response-storage";
var ACCESS_TOKEN_STORAGE_KEY = "accessToken";
var ID_TOKEN_STORAGE_KEY = "idToken";
var REFRESH_TOKEN_STORAGE_KEY = "refreshToken";
var REFERRER_PATH_STORAGE_KEY = "referrerPath";
var MIN_VERIFIER_LENGTH = 43;
var MAX_VERIFIER_LENGTH = 128;
var DEFAULT_CODE_CHALLENGE_METHOD = "S256";
var IDX_API_VERSION = "1.0.0";

// node_modules/@okta/okta-auth-js/esm/browser/errors/AuthApiError.js
var AuthApiError = class extends CustomError {
  constructor(err, xhr, meta) {
    const message = err.errorSummary;
    super(message);
    this.name = "AuthApiError";
    this.errorSummary = err.errorSummary;
    this.errorCode = err.errorCode;
    this.errorLink = err.errorLink;
    this.errorId = err.errorId;
    this.errorCauses = err.errorCauses;
    if (xhr) {
      this.xhr = xhr;
    }
    if (meta) {
      this.meta = meta;
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/errors/OAuthError.js
var OAuthError = class extends CustomError {
  constructor(errorCode, summary, resp) {
    super(summary);
    this.resp = null;
    this.name = "OAuthError";
    this.errorCode = errorCode;
    this.errorSummary = summary;
    this.error = errorCode;
    this.error_description = summary;
    if (resp) {
      this.resp = resp;
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/http/request.js
var formatError = (sdk, error) => {
  var _a;
  if (error instanceof Error) {
    return new AuthApiError({
      errorSummary: error.message
    });
  }
  let resp = error;
  let err;
  let serverErr = {};
  if (resp.responseText && isString(resp.responseText)) {
    try {
      serverErr = JSON.parse(resp.responseText);
    } catch (e) {
      serverErr = {
        errorSummary: "Unknown error"
      };
    }
  }
  if (resp.status >= 500) {
    serverErr.errorSummary = "Unknown error";
  }
  if (sdk.options.transformErrorXHR) {
    resp = sdk.options.transformErrorXHR(clone(resp));
  }
  const wwwAuthHeader = (_a = WWWAuthError.getWWWAuthenticateHeader(resp === null || resp === void 0 ? void 0 : resp.headers)) !== null && _a !== void 0 ? _a : "";
  if (serverErr.error && serverErr.error_description) {
    err = new OAuthError(serverErr.error, serverErr.error_description, resp);
  } else {
    err = new AuthApiError(serverErr, resp, { wwwAuthHeader });
  }
  if (wwwAuthHeader && (resp === null || resp === void 0 ? void 0 : resp.status) >= 400 && (resp === null || resp === void 0 ? void 0 : resp.status) < 500) {
    const wwwAuthErr = WWWAuthError.parseHeader(wwwAuthHeader);
    if (resp.status === 403 && (wwwAuthErr === null || wwwAuthErr === void 0 ? void 0 : wwwAuthErr.error) === "insufficient_authentication_context") {
      const { max_age, acr_values } = wwwAuthErr.parameters;
      err = new AuthApiError({
        errorSummary: wwwAuthErr.error,
        errorCauses: [{ errorSummary: wwwAuthErr.errorDescription }]
      }, resp, Object.assign({
        max_age: +max_age
      }, acr_values && { acr_values }));
    } else if ((wwwAuthErr === null || wwwAuthErr === void 0 ? void 0 : wwwAuthErr.scheme) === "DPoP") {
      err = wwwAuthErr;
    }
  }
  return err;
};
function httpRequest(sdk, options) {
  options = options || {};
  if (sdk.options.httpRequestInterceptors) {
    for (const interceptor of sdk.options.httpRequestInterceptors) {
      interceptor(options);
    }
  }
  var url = options.url, method = options.method, args = options.args, saveAuthnState = options.saveAuthnState, accessToken = options.accessToken, withCredentials = options.withCredentials === true, storageUtil2 = sdk.options.storageUtil, storage = storageUtil2.storage, httpCache = sdk.storageManager.getHttpCache(sdk.options.cookies);
  if (options.cacheResponse) {
    var cacheContents = httpCache.getStorage();
    var cachedResponse = cacheContents[url];
    if (cachedResponse && Date.now() / 1e3 < cachedResponse.expiresAt) {
      return Promise.resolve(cachedResponse.response);
    }
  }
  var oktaUserAgentHeader = sdk._oktaUserAgent.getHttpHeader();
  var headers = Object.assign({ "Accept": "application/json", "Content-Type": "application/json" }, oktaUserAgentHeader);
  Object.assign(headers, sdk.options.headers, options.headers);
  headers = removeNils(headers);
  if (accessToken && isString(accessToken)) {
    headers["Authorization"] = "Bearer " + accessToken;
  }
  var ajaxOptions = {
    headers,
    data: args || void 0,
    withCredentials
  };
  var err, res;
  return sdk.options.httpRequestClient(method, url, ajaxOptions).then(function(resp) {
    res = resp.responseText;
    if (res && isString(res)) {
      res = JSON.parse(res);
      if (res && typeof res === "object" && !res.headers) {
        if (Array.isArray(res)) {
          res.forEach((item) => {
            item.headers = resp.headers;
          });
        } else {
          res.headers = resp.headers;
        }
      }
    }
    if (saveAuthnState) {
      if (!res.stateToken) {
        storage.delete(STATE_TOKEN_KEY_NAME);
      }
    }
    if (res && res.stateToken && res.expiresAt) {
      storage.set(STATE_TOKEN_KEY_NAME, res.stateToken, res.expiresAt, sdk.options.cookies);
    }
    if (res && options.cacheResponse) {
      httpCache.updateStorage(url, {
        expiresAt: Math.floor(Date.now() / 1e3) + DEFAULT_CACHE_DURATION,
        response: res
      });
    }
    return res;
  }).catch(function(resp) {
    err = formatError(sdk, resp);
    if (err.errorCode === "E0000011") {
      storage.delete(STATE_TOKEN_KEY_NAME);
    }
    throw err;
  });
}
function get(sdk, url, options) {
  url = isAbsoluteUrl(url) ? url : sdk.getIssuerOrigin() + url;
  var getOptions = {
    url,
    method: "GET"
  };
  Object.assign(getOptions, options);
  return httpRequest(sdk, getOptions);
}
function post(sdk, url, args, options) {
  url = isAbsoluteUrl(url) ? url : sdk.getIssuerOrigin() + url;
  var postOptions = {
    url,
    method: "POST",
    args,
    saveAuthnState: true
  };
  Object.assign(postOptions, options);
  return httpRequest(sdk, postOptions);
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/interact.js
var import_tiny_emitter2 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch2 = __toESM(require_browser_ponyfill(), 1);
function getResponse(meta) {
  return {
    meta,
    interactionHandle: meta.interactionHandle,
    state: meta.state
  };
}
function interact(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    options = removeNils(options);
    let meta = getSavedTransactionMeta(authClient, options);
    if (meta === null || meta === void 0 ? void 0 : meta.interactionHandle) {
      return getResponse(meta);
    }
    meta = yield createTransactionMeta(authClient, Object.assign(Object.assign({}, meta), options));
    const baseUrl = getOAuthBaseUrl(authClient);
    let { clientId, redirectUri, state, scopes, withCredentials, codeChallenge, codeChallengeMethod, activationToken, recoveryToken, maxAge, acrValues, nonce } = meta;
    const clientSecret = options.clientSecret || authClient.options.clientSecret;
    withCredentials = withCredentials !== null && withCredentials !== void 0 ? withCredentials : true;
    const url = `${baseUrl}/v1/interact`;
    const params = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ client_id: clientId, scope: scopes.join(" "), redirect_uri: redirectUri, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod, state }, activationToken && { activation_token: activationToken }), recoveryToken && { recovery_token: recoveryToken }), clientSecret && { client_secret: clientSecret }), maxAge && { max_age: maxAge }), acrValues && { acr_values: acrValues }), nonce && { nonce });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const resp = yield httpRequest(authClient, {
      method: "POST",
      url,
      headers,
      withCredentials,
      args: params
    });
    const interactionHandle = resp.interaction_handle;
    const newMeta = Object.assign(Object.assign({}, meta), {
      interactionHandle,
      withCredentials,
      state,
      scopes,
      recoveryToken,
      activationToken
    });
    saveTransactionMeta(authClient, newMeta);
    return getResponse(newMeta);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/_virtual/_tslib.js
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/generateIdxAction.js
var import_tiny_emitter3 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch3 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/actionParser.js
var isFieldMutable = function isFieldMutable2(field) {
  return field.mutable !== false;
};
var divideSingleActionParamsByMutability = function divideSingleActionParamsByMutability2(action) {
  var _a, _b;
  const defaultParamsForAction = {};
  const neededParamsForAction = [];
  const immutableParamsForAction = {};
  if (!action.value) {
    neededParamsForAction.push(action);
    return { defaultParamsForAction, neededParamsForAction, immutableParamsForAction };
  }
  for (let field of action.value) {
    if (isFieldMutable(field)) {
      neededParamsForAction.push(field);
      if ((_a = field.value) !== null && _a !== void 0 ? _a : false) {
        defaultParamsForAction[field.name] = field.value;
      }
    } else {
      immutableParamsForAction[field.name] = (_b = field.value) !== null && _b !== void 0 ? _b : "";
    }
  }
  return { defaultParamsForAction, neededParamsForAction, immutableParamsForAction };
};
var divideActionParamsByMutability = function divideActionParamsByMutability2(actionList) {
  actionList = Array.isArray(actionList) ? actionList : [actionList];
  const neededParams = [];
  const defaultParams = {};
  const immutableParams = {};
  for (let action of actionList) {
    const { defaultParamsForAction, neededParamsForAction, immutableParamsForAction } = divideSingleActionParamsByMutability(action);
    neededParams.push(neededParamsForAction);
    defaultParams[action.name] = defaultParamsForAction;
    immutableParams[action.name] = immutableParamsForAction;
  }
  return { defaultParams, neededParams, immutableParams };
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/generateIdxAction.js
var generateDirectFetch = function generateDirectFetch2(authClient, { actionDefinition, defaultParamsForAction = {}, immutableParamsForAction = {}, toPersist = {} }) {
  const target = actionDefinition.href;
  return function() {
    return __async(this, arguments, function* (params = {}) {
      var _a;
      const headers = {
        "Content-Type": "application/json",
        "Accept": actionDefinition.accepts || "application/ion+json"
      };
      const body = JSON.stringify(Object.assign(Object.assign(Object.assign({}, defaultParamsForAction), params), immutableParamsForAction));
      try {
        const response = yield httpRequest(authClient, {
          url: target,
          method: actionDefinition.method,
          headers,
          args: body,
          withCredentials: (_a = toPersist === null || toPersist === void 0 ? void 0 : toPersist.withCredentials) !== null && _a !== void 0 ? _a : true
        });
        return authClient.idx.makeIdxResponse(Object.assign({}, response), toPersist, true);
      } catch (err) {
        if (!(err instanceof AuthApiError) || !(err === null || err === void 0 ? void 0 : err.xhr)) {
          throw err;
        }
        const response = err.xhr;
        const payload = response.responseJSON || JSON.parse(response.responseText);
        const wwwAuthHeader = response.headers["WWW-Authenticate"] || response.headers["www-authenticate"];
        const idxResponse = authClient.idx.makeIdxResponse(Object.assign({}, payload), toPersist, false);
        if (response.status === 401 && wwwAuthHeader === 'Oktadevicejwt realm="Okta Device"') {
          idxResponse.stepUp = true;
        }
        return idxResponse;
      }
    });
  };
};
var generateIdxAction = function generateIdxAction2(authClient, actionDefinition, toPersist) {
  const generator = generateDirectFetch;
  const { defaultParams, neededParams, immutableParams } = divideActionParamsByMutability(actionDefinition);
  const action = generator(authClient, {
    actionDefinition,
    defaultParamsForAction: defaultParams[actionDefinition.name],
    immutableParamsForAction: immutableParams[actionDefinition.name],
    toPersist
  });
  action.neededParams = neededParams;
  return action;
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/remediationParser.js
var generateRemediationFunctions = function generateRemediationFunctions2(authClient, remediationValue, toPersist = {}) {
  return remediationValue.reduce((obj, remediation) => Object.assign(Object.assign({}, obj), { [remediation.name]: generateIdxAction(authClient, remediation, toPersist) }), {});
};

// node_modules/jsonpath-plus/dist/index-browser-esm.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a2 = [null];
      a2.push.apply(a2, args2);
      var Constructor = Function.bind.apply(Parent2, a2);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
var hasOwnProp = Object.prototype.hasOwnProperty;
function push(arr, item) {
  arr = arr.slice();
  arr.push(item);
  return arr;
}
function unshift(item, arr) {
  arr = arr.slice();
  arr.unshift(item);
  return arr;
}
var NewError = function(_Error) {
  _inherits(NewError2, _Error);
  var _super = _createSuper(NewError2);
  function NewError2(value) {
    var _this;
    _classCallCheck(this, NewError2);
    _this = _super.call(this, 'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)');
    _this.avoidNew = true;
    _this.value = value;
    _this.name = "NewError";
    return _this;
  }
  return NewError2;
}(_wrapNativeSuper(Error));
function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
  if (!(this instanceof JSONPath)) {
    try {
      return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
    } catch (e) {
      if (!e.avoidNew) {
        throw e;
      }
      return e.value;
    }
  }
  if (typeof opts === "string") {
    otherTypeCallback = callback;
    callback = obj;
    obj = expr;
    expr = opts;
    opts = null;
  }
  var optObj = opts && _typeof(opts) === "object";
  opts = opts || {};
  this.json = opts.json || obj;
  this.path = opts.path || expr;
  this.resultType = opts.resultType || "value";
  this.flatten = opts.flatten || false;
  this.wrap = hasOwnProp.call(opts, "wrap") ? opts.wrap : true;
  this.sandbox = opts.sandbox || {};
  this.preventEval = opts.preventEval || false;
  this.parent = opts.parent || null;
  this.parentProperty = opts.parentProperty || null;
  this.callback = opts.callback || callback || null;
  this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function() {
    throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.");
  };
  if (opts.autostart !== false) {
    var args = {
      path: optObj ? opts.path : expr
    };
    if (!optObj) {
      args.json = obj;
    } else if ("json" in opts) {
      args.json = opts.json;
    }
    var ret = this.evaluate(args);
    if (!ret || _typeof(ret) !== "object") {
      throw new NewError(ret);
    }
    return ret;
  }
}
JSONPath.prototype.evaluate = function(expr, json, callback, otherTypeCallback) {
  var _this2 = this;
  var currParent = this.parent, currParentProperty = this.parentProperty;
  var flatten = this.flatten, wrap = this.wrap;
  this.currResultType = this.resultType;
  this.currPreventEval = this.preventEval;
  this.currSandbox = this.sandbox;
  callback = callback || this.callback;
  this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
  json = json || this.json;
  expr = expr || this.path;
  if (expr && _typeof(expr) === "object" && !Array.isArray(expr)) {
    if (!expr.path && expr.path !== "") {
      throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
    }
    if (!hasOwnProp.call(expr, "json")) {
      throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');
    }
    var _expr = expr;
    json = _expr.json;
    flatten = hasOwnProp.call(expr, "flatten") ? expr.flatten : flatten;
    this.currResultType = hasOwnProp.call(expr, "resultType") ? expr.resultType : this.currResultType;
    this.currSandbox = hasOwnProp.call(expr, "sandbox") ? expr.sandbox : this.currSandbox;
    wrap = hasOwnProp.call(expr, "wrap") ? expr.wrap : wrap;
    this.currPreventEval = hasOwnProp.call(expr, "preventEval") ? expr.preventEval : this.currPreventEval;
    callback = hasOwnProp.call(expr, "callback") ? expr.callback : callback;
    this.currOtherTypeCallback = hasOwnProp.call(expr, "otherTypeCallback") ? expr.otherTypeCallback : this.currOtherTypeCallback;
    currParent = hasOwnProp.call(expr, "parent") ? expr.parent : currParent;
    currParentProperty = hasOwnProp.call(expr, "parentProperty") ? expr.parentProperty : currParentProperty;
    expr = expr.path;
  }
  currParent = currParent || null;
  currParentProperty = currParentProperty || null;
  if (Array.isArray(expr)) {
    expr = JSONPath.toPathString(expr);
  }
  if (!expr && expr !== "" || !json) {
    return void 0;
  }
  var exprList = JSONPath.toPathArray(expr);
  if (exprList[0] === "$" && exprList.length > 1) {
    exprList.shift();
  }
  this._hasParentSelector = null;
  var result = this._trace(exprList, json, ["$"], currParent, currParentProperty, callback).filter(function(ea) {
    return ea && !ea.isParentSelector;
  });
  if (!result.length) {
    return wrap ? [] : void 0;
  }
  if (!wrap && result.length === 1 && !result[0].hasArrExpr) {
    return this._getPreferredOutput(result[0]);
  }
  return result.reduce(function(rslt, ea) {
    var valOrPath = _this2._getPreferredOutput(ea);
    if (flatten && Array.isArray(valOrPath)) {
      rslt = rslt.concat(valOrPath);
    } else {
      rslt.push(valOrPath);
    }
    return rslt;
  }, []);
};
JSONPath.prototype._getPreferredOutput = function(ea) {
  var resultType = this.currResultType;
  switch (resultType) {
    case "all": {
      var path = Array.isArray(ea.path) ? ea.path : JSONPath.toPathArray(ea.path);
      ea.pointer = JSONPath.toPointer(path);
      ea.path = typeof ea.path === "string" ? ea.path : JSONPath.toPathString(ea.path);
      return ea;
    }
    case "value":
    case "parent":
    case "parentProperty":
      return ea[resultType];
    case "path":
      return JSONPath.toPathString(ea[resultType]);
    case "pointer":
      return JSONPath.toPointer(ea.path);
    default:
      throw new TypeError("Unknown result type");
  }
};
JSONPath.prototype._handleCallback = function(fullRetObj, callback, type5) {
  if (callback) {
    var preferredOutput = this._getPreferredOutput(fullRetObj);
    fullRetObj.path = typeof fullRetObj.path === "string" ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path);
    callback(preferredOutput, type5, fullRetObj);
  }
};
JSONPath.prototype._trace = function(expr, val, path, parent, parentPropName, callback, hasArrExpr, literalPriority) {
  var _this3 = this;
  var retObj;
  if (!expr.length) {
    retObj = {
      path,
      value: val,
      parent,
      parentProperty: parentPropName,
      hasArrExpr
    };
    this._handleCallback(retObj, callback, "value");
    return retObj;
  }
  var loc = expr[0], x = expr.slice(1);
  var ret = [];
  function addRet(elems) {
    if (Array.isArray(elems)) {
      elems.forEach(function(t2) {
        ret.push(t2);
      });
    } else {
      ret.push(elems);
    }
  }
  if ((typeof loc !== "string" || literalPriority) && val && hasOwnProp.call(val, loc)) {
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr));
  } else if (loc === "*") {
    this._walk(loc, x, val, path, parent, parentPropName, callback, function(m, l, _x, v, p, par, pr, cb) {
      addRet(_this3._trace(unshift(m, _x), v, p, par, pr, cb, true, true));
    });
  } else if (loc === "..") {
    addRet(this._trace(x, val, path, parent, parentPropName, callback, hasArrExpr));
    this._walk(loc, x, val, path, parent, parentPropName, callback, function(m, l, _x, v, p, par, pr, cb) {
      if (_typeof(v[m]) === "object") {
        addRet(_this3._trace(unshift(l, _x), v[m], push(p, m), v, m, cb, true));
      }
    });
  } else if (loc === "^") {
    this._hasParentSelector = true;
    return {
      path: path.slice(0, -1),
      expr: x,
      isParentSelector: true
    };
  } else if (loc === "~") {
    retObj = {
      path: push(path, loc),
      value: parentPropName,
      parent,
      parentProperty: null
    };
    this._handleCallback(retObj, callback, "property");
    return retObj;
  } else if (loc === "$") {
    addRet(this._trace(x, val, path, null, null, callback, hasArrExpr));
  } else if (/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(loc)) {
    addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
  } else if (loc.indexOf("?(") === 0) {
    if (this.currPreventEval) {
      throw new Error("Eval [?(expr)] prevented in JSONPath expression.");
    }
    this._walk(loc, x, val, path, parent, parentPropName, callback, function(m, l, _x, v, p, par, pr, cb) {
      if (_this3._eval(l.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/, "$1"), v[m], m, p, par, pr)) {
        addRet(_this3._trace(unshift(m, _x), v, p, par, pr, cb, true));
      }
    });
  } else if (loc[0] === "(") {
    if (this.currPreventEval) {
      throw new Error("Eval [(expr)] prevented in JSONPath expression.");
    }
    addRet(this._trace(unshift(this._eval(loc, val, path[path.length - 1], path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback, hasArrExpr));
  } else if (loc[0] === "@") {
    var addType = false;
    var valueType = loc.slice(1, -2);
    switch (valueType) {
      case "scalar":
        if (!val || !["object", "function"].includes(_typeof(val))) {
          addType = true;
        }
        break;
      case "boolean":
      case "string":
      case "undefined":
      case "function":
        if (_typeof(val) === valueType) {
          addType = true;
        }
        break;
      case "integer":
        if (Number.isFinite(val) && !(val % 1)) {
          addType = true;
        }
        break;
      case "number":
        if (Number.isFinite(val)) {
          addType = true;
        }
        break;
      case "nonFinite":
        if (typeof val === "number" && !Number.isFinite(val)) {
          addType = true;
        }
        break;
      case "object":
        if (val && _typeof(val) === valueType) {
          addType = true;
        }
        break;
      case "array":
        if (Array.isArray(val)) {
          addType = true;
        }
        break;
      case "other":
        addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
        break;
      case "null":
        if (val === null) {
          addType = true;
        }
        break;
      default:
        throw new TypeError("Unknown value type " + valueType);
    }
    if (addType) {
      retObj = {
        path,
        value: val,
        parent,
        parentProperty: parentPropName
      };
      this._handleCallback(retObj, callback, "value");
      return retObj;
    }
  } else if (loc[0] === "`" && val && hasOwnProp.call(val, loc.slice(1))) {
    var locProp = loc.slice(1);
    addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, hasArrExpr, true));
  } else if (loc.includes(",")) {
    var parts = loc.split(",");
    var _iterator = _createForOfIteratorHelper(parts), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var part = _step.value;
        addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback, true));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (!literalPriority && val && hasOwnProp.call(val, loc)) {
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr, true));
  }
  if (this._hasParentSelector) {
    for (var t = 0; t < ret.length; t++) {
      var rett = ret[t];
      if (rett && rett.isParentSelector) {
        var tmp = this._trace(rett.expr, val, rett.path, parent, parentPropName, callback, hasArrExpr);
        if (Array.isArray(tmp)) {
          ret[t] = tmp[0];
          var tl = tmp.length;
          for (var tt = 1; tt < tl; tt++) {
            t++;
            ret.splice(t, 0, tmp[tt]);
          }
        } else {
          ret[t] = tmp;
        }
      }
    }
  }
  return ret;
};
JSONPath.prototype._walk = function(loc, expr, val, path, parent, parentPropName, callback, f) {
  if (Array.isArray(val)) {
    var n = val.length;
    for (var i = 0; i < n; i++) {
      f(i, loc, expr, val, path, parent, parentPropName, callback);
    }
  } else if (val && _typeof(val) === "object") {
    Object.keys(val).forEach(function(m) {
      f(m, loc, expr, val, path, parent, parentPropName, callback);
    });
  }
};
JSONPath.prototype._slice = function(loc, expr, val, path, parent, parentPropName, callback) {
  if (!Array.isArray(val)) {
    return void 0;
  }
  var len = val.length, parts = loc.split(":"), step = parts[2] && Number.parseInt(parts[2]) || 1;
  var start = parts[0] && Number.parseInt(parts[0]) || 0, end = parts[1] && Number.parseInt(parts[1]) || len;
  start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
  end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
  var ret = [];
  for (var i = start; i < end; i += step) {
    var tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback, true);
    tmp.forEach(function(t) {
      ret.push(t);
    });
  }
  return ret;
};
JSONPath.prototype._eval = function(code, _v, _vname, path, parent, parentPropName) {
  if (code.includes("@parentProperty")) {
    this.currSandbox._$_parentProperty = parentPropName;
    code = code.replace(/@parentProperty/g, "_$_parentProperty");
  }
  if (code.includes("@parent")) {
    this.currSandbox._$_parent = parent;
    code = code.replace(/@parent/g, "_$_parent");
  }
  if (code.includes("@property")) {
    this.currSandbox._$_property = _vname;
    code = code.replace(/@property/g, "_$_property");
  }
  if (code.includes("@path")) {
    this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
    code = code.replace(/@path/g, "_$_path");
  }
  if (code.includes("@root")) {
    this.currSandbox._$_root = this.json;
    code = code.replace(/@root/g, "_$_root");
  }
  if (/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/.test(code)) {
    this.currSandbox._$_v = _v;
    code = code.replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g, "_$_v$1");
  }
  try {
    return this.vm.runInNewContext(code, this.currSandbox);
  } catch (e) {
    console.log(e);
    throw new Error("jsonPath: " + e.message + ": " + code);
  }
};
JSONPath.cache = {};
JSONPath.toPathString = function(pathArr) {
  var x = pathArr, n = x.length;
  var p = "$";
  for (var i = 1; i < n; i++) {
    if (!/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(x[i])) {
      p += /^[\*0-9]+$/.test(x[i]) ? "[" + x[i] + "]" : "['" + x[i] + "']";
    }
  }
  return p;
};
JSONPath.toPointer = function(pointer) {
  var x = pointer, n = x.length;
  var p = "";
  for (var i = 1; i < n; i++) {
    if (!/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(x[i])) {
      p += "/" + x[i].toString().replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
  return p;
};
JSONPath.toPathArray = function(expr) {
  var cache = JSONPath.cache;
  if (cache[expr]) {
    return cache[expr].concat();
  }
  var subx = [];
  var normalized = expr.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g, function($0, $1) {
    return "[#" + (subx.push($1) - 1) + "]";
  }).replace(/\[["']((?:(?!['\]])[\s\S])*)["']\]/g, function($0, prop) {
    return "['" + prop.replace(/\./g, "%@%").replace(/~/g, "%%@@%%") + "']";
  }).replace(/~/g, ";~;").replace(/["']?\.["']?(?!(?:(?!\[)[\s\S])*\])|\[["']?/g, ";").replace(/%@%/g, ".").replace(/%%@@%%/g, "~").replace(/(?:;)?(\^+)(?:;)?/g, function($0, ups) {
    return ";" + ups.split("").join(";") + ";";
  }).replace(/;;;|;;/g, ";..;").replace(/;$|'?\]|'$/g, "");
  var exprList = normalized.split(";").map(function(exp) {
    var match = exp.match(/#([0-9]+)/);
    return !match || !match[1] ? exp : subx[match[1]];
  });
  cache[expr] = exprList;
  return cache[expr].concat();
};
var moveToAnotherArray = function moveToAnotherArray2(source, target, conditionCb) {
  var il = source.length;
  for (var i = 0; i < il; i++) {
    var item = source[i];
    if (conditionCb(item)) {
      target.push(source.splice(i--, 1)[0]);
    }
  }
};
JSONPath.prototype.vm = {
  /**
   * @param {string} expr Expression to evaluate
   * @param {PlainObject} context Object whose items will be added
   *   to evaluation
   * @returns {any} Result of evaluated code
   */
  runInNewContext: function runInNewContext(expr, context) {
    var keys = Object.keys(context);
    var funcs = [];
    moveToAnotherArray(keys, funcs, function(key) {
      return typeof context[key] === "function";
    });
    var values = keys.map(function(vr, i) {
      return context[vr];
    });
    var funcString = funcs.reduce(function(s, func) {
      var fString = context[func].toString();
      if (!/function/.test(fString)) {
        fString = "function " + fString;
      }
      return "var " + func + "=" + fString + ";" + s;
    }, "");
    expr = funcString + expr;
    if (!/(["'])use strict\1/.test(expr) && !keys.includes("arguments")) {
      expr = "var arguments = undefined;" + expr;
    }
    expr = expr.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, "");
    var lastStatementEnd = expr.lastIndexOf(";");
    var code = lastStatementEnd > -1 ? expr.slice(0, lastStatementEnd + 1) + " return " + expr.slice(lastStatementEnd + 1) : " return " + expr;
    return _construct(Function, _toConsumableArray(keys).concat([code])).apply(void 0, _toConsumableArray(values));
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/util/jsonpath.js
function jsonpath(options) {
  return JSONPath(Object.assign({
    preventEval: true
  }, options));
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/idxResponseParser.js
var SKIP_FIELDS = {
  "remediation": true,
  "context": true
};
var parseNonRemediations = function parseNonRemediations2(authClient, idxResponse, toPersist = {}) {
  const actions = {};
  const context = {};
  Object.keys(idxResponse).filter((field) => !SKIP_FIELDS[field]).forEach((field) => {
    const fieldIsObject = typeof idxResponse[field] === "object" && !!idxResponse[field];
    if (!fieldIsObject) {
      context[field] = idxResponse[field];
      return;
    }
    if (idxResponse[field].rel) {
      actions[idxResponse[field].name] = generateIdxAction(authClient, idxResponse[field], toPersist);
      return;
    }
    const _a = idxResponse[field], { value: fieldValue, type: type5 } = _a, info = __rest(_a, ["value", "type"]);
    context[field] = Object.assign({ type: type5 }, info);
    if (type5 !== "object") {
      context[field].value = fieldValue;
      return;
    }
    context[field].value = {};
    Object.entries(fieldValue).forEach(([subField, value]) => {
      if (value.rel) {
        actions[`${field}-${subField.name || subField}`] = generateIdxAction(authClient, value, toPersist);
      } else {
        context[field].value[subField] = value;
      }
    });
  });
  return { context, actions };
};
var expandRelatesTo = (idxResponse, value) => {
  Object.keys(value).forEach((k) => {
    if (k === "relatesTo") {
      const query = Array.isArray(value[k]) ? value[k][0] : value[k];
      if (typeof query === "string") {
        const result = jsonpath({ path: query, json: idxResponse })[0];
        if (result) {
          value[k] = result;
          return;
        } else {
          throw new AuthSdkError(`Cannot resolve relatesTo: ${query}`);
        }
      }
    }
    if (Array.isArray(value[k])) {
      value[k].forEach((innerValue) => expandRelatesTo(idxResponse, innerValue));
    }
  });
};
var convertRemediationAction = (authClient, remediation, toPersist) => {
  if (remediation.rel) {
    const remediationActions = generateRemediationFunctions(authClient, [remediation], toPersist);
    const actionFn = remediationActions[remediation.name];
    return Object.assign(Object.assign({}, remediation), { action: actionFn });
  }
  return remediation;
};
var parseIdxResponse = function parseIdxResponse2(authClient, idxResponse, toPersist = {}) {
  var _a;
  const remediationData = ((_a = idxResponse.remediation) === null || _a === void 0 ? void 0 : _a.value) || [];
  remediationData.forEach((remediation) => {
    var _a2;
    if (remediation.name === "launch-authenticator" && ((_a2 = remediation === null || remediation === void 0 ? void 0 : remediation.relatesTo) === null || _a2 === void 0 ? void 0 : _a2[0]) === "authenticatorChallenge" && !(idxResponse === null || idxResponse === void 0 ? void 0 : idxResponse.authenticatorChallenge)) {
      delete remediation.relatesTo;
      return;
    }
    return expandRelatesTo(idxResponse, remediation);
  });
  const remediations = remediationData.map((remediation) => convertRemediationAction(authClient, remediation, toPersist));
  const { context, actions } = parseNonRemediations(authClient, idxResponse, toPersist);
  return {
    remediations,
    context,
    actions
  };
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/makeIdxState.js
function makeIdxState(authClient, idxResponse, toPersist, requestDidSucceed) {
  var _a, _b, _c;
  const rawIdxResponse = idxResponse;
  const { remediations, context, actions } = parseIdxResponse(authClient, idxResponse, toPersist);
  const neededToProceed = [...remediations];
  const proceed2 = function(_0) {
    return __async(this, arguments, function* (remediationChoice, paramsFromUser = {}) {
      const remediationChoiceObject = remediations.find((remediation) => remediation.name === remediationChoice);
      if (!remediationChoiceObject) {
        return Promise.reject(`Unknown remediation choice: [${remediationChoice}]`);
      }
      const actionFn = remediationChoiceObject.action;
      if (typeof actionFn !== "function") {
        return Promise.reject(`Current remediation cannot make form submit action: [${remediationChoice}]`);
      }
      return remediationChoiceObject.action(paramsFromUser);
    });
  };
  const findCode = (item) => item.name === "interaction_code";
  const interactionCode = (_c = (_b = (_a = rawIdxResponse.successWithInteractionCode) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.find(findCode)) === null || _c === void 0 ? void 0 : _c.value;
  return {
    proceed: proceed2,
    neededToProceed,
    actions,
    context,
    rawIdxState: rawIdxResponse,
    interactionCode,
    toPersist,
    requestDidSucceed
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/v1/parsers.js
var v1 = {
  makeIdxState
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/idxState/index.js
var parsersForVersion = function parsersForVersion2(version) {
  switch (version) {
    case "1.0.0":
      return v1;
    case void 0:
    case null:
      throw new Error("Api version is required");
    default:
      throw new Error(`Unknown api version: ${version}.  Use an exact semver version.`);
  }
};
function validateVersionConfig(version) {
  if (!version) {
    throw new Error("version is required");
  }
  const cleanVersion = (version !== null && version !== void 0 ? version : "").replace(/[^0-9a-zA-Z._-]/, "");
  if (cleanVersion !== version || !version) {
    throw new Error("invalid version supplied - version is required and uses semver syntax");
  }
  parsersForVersion(version);
}
function makeIdxState2(authClient, rawIdxResponse, toPersist, requestDidSucceed) {
  var _a;
  const version = (_a = rawIdxResponse === null || rawIdxResponse === void 0 ? void 0 : rawIdxResponse.version) !== null && _a !== void 0 ? _a : IDX_API_VERSION;
  validateVersionConfig(version);
  const { makeIdxState: makeIdxState3 } = parsersForVersion(version);
  return makeIdxState3(authClient, rawIdxResponse, toPersist, requestDidSucceed);
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/types/idx-js.js
function isRawIdxResponse(obj) {
  return obj && obj.version;
}

// node_modules/@okta/okta-auth-js/esm/browser/errors/index.js
function isAuthApiError(obj) {
  return obj instanceof AuthApiError;
}
function isOAuthError(obj) {
  return obj instanceof OAuthError;
}
function isWWWAuthError(obj) {
  return obj instanceof WWWAuthError;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/introspect.js
var import_tiny_emitter4 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch4 = __toESM(require_browser_ponyfill(), 1);
function introspect(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    var _a;
    let rawIdxResponse;
    let requestDidSucceed;
    const savedIdxResponse = authClient.transactionManager.loadIdxResponse(options);
    if (savedIdxResponse) {
      rawIdxResponse = savedIdxResponse.rawIdxResponse;
      requestDidSucceed = savedIdxResponse.requestDidSucceed;
    }
    if (!rawIdxResponse) {
      const version = options.version || IDX_API_VERSION;
      const domain = getOAuthDomain(authClient);
      const { interactionHandle, stateHandle } = options;
      const withCredentials2 = (_a = options.withCredentials) !== null && _a !== void 0 ? _a : true;
      try {
        requestDidSucceed = true;
        validateVersionConfig(version);
        const url = `${domain}/idp/idx/introspect`;
        const body = stateHandle ? { stateToken: stateHandle } : { interactionHandle };
        const headers = {
          "Content-Type": `application/ion+json; okta-version=${version}`,
          Accept: `application/ion+json; okta-version=${version}`
        };
        rawIdxResponse = yield httpRequest(authClient, {
          method: "POST",
          url,
          headers,
          withCredentials: withCredentials2,
          args: body
        });
      } catch (err) {
        if (isAuthApiError(err) && err.xhr && isRawIdxResponse(err.xhr.responseJSON)) {
          rawIdxResponse = err.xhr.responseJSON;
          requestDidSucceed = false;
        } else {
          throw err;
        }
      }
    }
    const { withCredentials } = options;
    return makeIdxState2(authClient, rawIdxResponse, { withCredentials }, requestDidSucceed);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/util.js
function getAllValues(idxRemediation) {
  var _a;
  return (_a = idxRemediation.value) === null || _a === void 0 ? void 0 : _a.map((r) => r.name);
}
function getRequiredValues(idxRemediation) {
  var _a;
  return (_a = idxRemediation.value) === null || _a === void 0 ? void 0 : _a.reduce((required, cur) => {
    if (cur.required) {
      required.push(cur.name);
    }
    return required;
  }, []);
}
function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
function getAuthenticatorFromRemediation(remediation) {
  return remediation.value.find(({ name }) => name === "authenticator");
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/util.js
function formatAuthenticator(incoming) {
  let authenticator;
  if (isAuthenticator(incoming)) {
    authenticator = incoming;
  } else if (typeof incoming === "string") {
    authenticator = {
      key: incoming
    };
  } else {
    throw new Error("Invalid format for authenticator");
  }
  return authenticator;
}
function compareAuthenticators(auth1, auth2) {
  if (!auth1 || !auth2) {
    return false;
  }
  if (auth1.id && auth2.id) {
    return auth1.id === auth2.id;
  }
  if (auth1.key && auth2.key) {
    return auth1.key === auth2.key;
  }
  return false;
}
function findMatchedOption(authenticators, options) {
  let option;
  for (let authenticator of authenticators) {
    option = options.find(({ relatesTo }) => relatesTo.key && relatesTo.key === authenticator.key);
    if (option) {
      break;
    }
  }
  return option;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Base/Remediator.js
var Remediator = class {
  constructor(remediation, values = {}, options = {}) {
    this.values = Object.assign({}, values);
    this.options = Object.assign({}, options);
    this.formatAuthenticators();
    this.remediation = remediation;
  }
  formatAuthenticators() {
    this.values.authenticators = this.values.authenticators || [];
    this.values.authenticators = this.values.authenticators.map((authenticator) => {
      return formatAuthenticator(authenticator);
    });
    if (this.values.authenticator) {
      const authenticator = formatAuthenticator(this.values.authenticator);
      const hasAuthenticatorInList = this.values.authenticators.some((existing) => {
        return compareAuthenticators(authenticator, existing);
      });
      if (!hasAuthenticatorInList) {
        this.values.authenticators.push(authenticator);
      }
    }
    this.values.authenticatorsData = this.values.authenticators.reduce((acc, authenticator) => {
      if (typeof authenticator === "object" && Object.keys(authenticator).length > 1) {
        acc.push(authenticator);
      }
      return acc;
    }, this.values.authenticatorsData || []);
  }
  getName() {
    return this.remediation.name;
  }
  canRemediate(context) {
    const required = getRequiredValues(this.remediation);
    const needed = required.find((key) => !this.hasData(key));
    if (needed) {
      return false;
    }
    return true;
  }
  getData(key) {
    if (!key) {
      let allValues = getAllValues(this.remediation);
      let res = allValues.reduce((data, key2) => {
        data[key2] = this.getData(key2);
        return data;
      }, {});
      return res;
    }
    if (typeof this[`map${titleCase(key)}`] === "function") {
      const val = this[`map${titleCase(key)}`](this.remediation.value.find(({ name }) => name === key));
      if (val) {
        return val;
      }
    }
    if (this.map && this.map[key]) {
      const entry = this.map[key];
      for (let i = 0; i < entry.length; i++) {
        let val = this.values[entry[i]];
        if (val) {
          return val;
        }
      }
    }
    return this.values[key];
  }
  hasData(key) {
    return !!this.getData(key);
  }
  getNextStep(_authClient, _context) {
    const name = this.getName();
    const inputs = this.getInputs();
    const authenticator = this.getAuthenticator();
    const type5 = authenticator === null || authenticator === void 0 ? void 0 : authenticator.type;
    return Object.assign(Object.assign({
      name,
      inputs
    }, type5 && { type: type5 }), authenticator && { authenticator });
  }
  getInputs() {
    const inputs = [];
    const inputsFromRemediation = this.remediation.value || [];
    inputsFromRemediation.forEach((inputFromRemediation) => {
      let input;
      let { name, type: type5, visible, messages } = inputFromRemediation;
      if (visible === false) {
        return;
      }
      if (typeof this[`getInput${titleCase(name)}`] === "function") {
        input = this[`getInput${titleCase(name)}`](inputFromRemediation);
      } else if (type5 !== "object") {
        let alias;
        const aliases = (this.map ? this.map[name] : null) || [];
        if (aliases.length === 1) {
          alias = aliases[0];
        } else {
          alias = aliases.find((name2) => Object.keys(this.values).includes(name2));
        }
        if (alias) {
          input = Object.assign(Object.assign({}, inputFromRemediation), { name: alias });
        }
      }
      if (!input) {
        input = inputFromRemediation;
      }
      if (Array.isArray(input)) {
        input.forEach((i) => inputs.push(i));
      } else {
        if (messages) {
          input.messages = messages;
        }
        inputs.push(input);
      }
    });
    return inputs;
  }
  static getMessages(remediation) {
    var _a, _b;
    if (!remediation.value) {
      return;
    }
    return (_b = (_a = remediation.value[0]) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0 ? void 0 : _b.value.reduce((messages, field) => {
      if (field.messages) {
        messages = [...messages, ...field.messages.value];
      }
      return messages;
    }, []);
  }
  getValuesAfterProceed() {
    const inputsFromRemediation = this.remediation.value || [];
    const inputsFromRemediator = this.getInputs();
    const inputs = [
      ...inputsFromRemediation,
      ...inputsFromRemediator
    ];
    for (const input of inputs) {
      delete this.values[input.name];
    }
    return this.values;
  }
  getAuthenticator() {
    var _a, _b;
    const relatesTo = (_a = this.remediation.relatesTo) === null || _a === void 0 ? void 0 : _a.value;
    if (!relatesTo) {
      return;
    }
    const authenticatorFromRemediation = getAuthenticatorFromRemediation(this.remediation);
    if (!authenticatorFromRemediation) {
      return relatesTo;
    }
    const id = authenticatorFromRemediation.form.value.find(({ name }) => name === "id").value;
    const enrollmentId = (_b = authenticatorFromRemediation.form.value.find(({ name }) => name === "enrollmentId")) === null || _b === void 0 ? void 0 : _b.value;
    return Object.assign(Object.assign({}, relatesTo), {
      id,
      enrollmentId
    });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/GenericRemediator/util.js
function unwrapFormValue(remediation) {
  if (Array.isArray(remediation)) {
    return remediation.map((item) => {
      if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
        return item;
      }
      return unwrapFormValue(item);
    });
  }
  const res = {};
  for (const [key, value] of Object.entries(remediation)) {
    if (value === null || typeof value === "undefined") {
      continue;
    }
    if (typeof value === "object") {
      const formKeys = Object.keys(value);
      if (["value", "form"].includes(key) && formKeys.length === 1 && ["value", "form"].includes(formKeys[0])) {
        const unwrappedForm = unwrapFormValue(value);
        Object.entries(unwrappedForm).forEach(([key2, value2]) => {
          res[key2] = value2;
        });
      } else {
        res[key] = unwrapFormValue(value);
      }
    } else {
      res[key] = value;
    }
  }
  return res;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/GenericRemediator/GenericRemediator.js
var GenericRemediator = class extends Remediator {
  canRemediate() {
    if (typeof this.remediation.action !== "function") {
      return false;
    }
    if (this.remediation.name === "poll" || this.remediation.name.endsWith("-poll")) {
      return true;
    }
    if (this.options.step) {
      return true;
    }
    return false;
  }
  getData() {
    const data = this.getInputs().reduce((acc, { name }) => {
      acc[name] = this.values[name];
      return acc;
    }, {});
    return data;
  }
  getNextStep(authClient, _context) {
    const name = this.getName();
    const inputs = this.getInputs();
    const _a = this.remediation, {
      href,
      method,
      rel,
      accepts,
      produces,
      value,
      action
    } = _a, rest = __rest(_a, ["href", "method", "rel", "accepts", "produces", "value", "action"]);
    if (action) {
      return Object.assign(Object.assign(Object.assign({}, rest), !!inputs.length && { inputs }), { action: (params) => __async(this, null, function* () {
        return authClient.idx.proceed(Object.assign({ step: name }, params));
      }) });
    }
    return Object.assign({}, this.remediation);
  }
  getInputs() {
    return (this.remediation.value || []).filter(({ name }) => name !== "stateHandle").map(unwrapFormValue).map((input) => {
      input.type = input.type || "string";
      return input;
    });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/util.js
var ctx = {
  remediators: {},
  getFlowSpecification: function(_oktaAuth, _flow = "default") {
    return {
      remediators: {}
    };
  }
};
function setRemediatorsCtx(newCtx) {
  Object.assign(ctx, newCtx);
}
function getFlowSpecification(oktaAuth, flow = "default") {
  return ctx.getFlowSpecification(oktaAuth, flow);
}
function isTerminalResponse(idxResponse) {
  const { neededToProceed, interactionCode } = idxResponse;
  return !neededToProceed.length && !interactionCode;
}
function canSkipFn(idxResponse) {
  return idxResponse.neededToProceed.some(({ name }) => name === "skip");
}
function canResendFn(idxResponse) {
  return Object.keys(idxResponse.actions).some((actionName) => actionName.includes("resend"));
}
function getMessagesFromIdxRemediationValue(value) {
  if (!value || !Array.isArray(value)) {
    return;
  }
  return value.reduce((messages, value2) => {
    if (value2.messages) {
      messages = [...messages, ...value2.messages.value];
    }
    if (value2.form) {
      const messagesFromForm = getMessagesFromIdxRemediationValue(value2.form.value) || [];
      messages = [...messages, ...messagesFromForm];
    }
    if (value2.options) {
      let optionValues = [];
      value2.options.forEach((option) => {
        if (!option.value || typeof option.value === "string") {
          return;
        }
        optionValues = [...optionValues, option.value];
      });
      const messagesFromOptions = getMessagesFromIdxRemediationValue(optionValues) || [];
      messages = [...messages, ...messagesFromOptions];
    }
    return messages;
  }, []);
}
function getMessagesFromResponse(idxResponse, options) {
  var _a;
  let messages = [];
  const { rawIdxState, neededToProceed } = idxResponse;
  const globalMessages = (_a = rawIdxState.messages) === null || _a === void 0 ? void 0 : _a.value.map((message) => message);
  if (globalMessages) {
    messages = [...messages, ...globalMessages];
  }
  if (!options.useGenericRemediator) {
    for (let remediation of neededToProceed) {
      const fieldMessages = getMessagesFromIdxRemediationValue(remediation.value);
      if (fieldMessages) {
        messages = [...messages, ...fieldMessages];
      }
    }
  }
  const seen = {};
  messages = messages.reduce((filtered, message) => {
    var _a2;
    const key = (_a2 = message.i18n) === null || _a2 === void 0 ? void 0 : _a2.key;
    if (key && seen[key] && message.message === seen[key].message) {
      return filtered;
    }
    seen[key] = message;
    filtered = [...filtered, message];
    return filtered;
  }, []);
  return messages;
}
function getEnabledFeatures(idxResponse) {
  const res = [];
  const { actions, neededToProceed } = idxResponse;
  if (actions["currentAuthenticator-recover"]) {
    res.push(IdxFeature.PASSWORD_RECOVERY);
  }
  if (neededToProceed.some(({ name }) => name === "select-enroll-profile")) {
    res.push(IdxFeature.REGISTRATION);
  }
  if (neededToProceed.some(({ name }) => name === "redirect-idp")) {
    res.push(IdxFeature.SOCIAL_IDP);
  }
  if (neededToProceed.some(({ name }) => name === "unlock-account")) {
    res.push(IdxFeature.ACCOUNT_UNLOCK);
  }
  return res;
}
function getAvailableSteps(authClient, idxResponse, useGenericRemediator) {
  var _a;
  const res = [];
  const remediatorMap = Object.values(ctx.remediators).reduce((map, remediatorClass) => {
    if (remediatorClass.remediationName) {
      map[remediatorClass.remediationName] = remediatorClass;
    }
    return map;
  }, {});
  for (let remediation of idxResponse.neededToProceed) {
    const T = getRemediatorClass(remediation, { useGenericRemediator, remediators: remediatorMap });
    if (T) {
      const remediator = new T(remediation);
      res.push(remediator.getNextStep(authClient, idxResponse.context));
    }
  }
  for (const [name] of Object.entries(idxResponse.actions || {})) {
    let stepObj = {
      name,
      action: (params) => __async(this, null, function* () {
        return authClient.idx.proceed({
          actions: [{ name, params }]
        });
      })
    };
    if (name.startsWith("currentAuthenticator")) {
      const [part1, part2] = split2(name, "-");
      const actionObj = idxResponse.rawIdxState[part1].value[part2];
      const rest = __rest(actionObj, ["href", "method", "rel", "accepts", "produces"]);
      const value = (_a = actionObj.value) === null || _a === void 0 ? void 0 : _a.filter((item) => item.name !== "stateHandle");
      stepObj = Object.assign(Object.assign(Object.assign({}, rest), value && { value }), stepObj);
    }
    res.push(stepObj);
  }
  return res;
}
function filterValuesForRemediation(idxResponse, remediationName, values) {
  const remediations = idxResponse.neededToProceed || [];
  const remediation = remediations.find((r) => r.name === remediationName);
  if (!remediation) {
    warn(`filterValuesForRemediation: "${remediationName}" did not match any remediations`);
    return values;
  }
  const valuesForRemediation = remediation.value.reduce((res, entry) => {
    const { name, value } = entry;
    if (name === "stateHandle") {
      res[name] = value;
    } else {
      res[name] = values[name];
    }
    return res;
  }, {});
  return valuesForRemediation;
}
function getRemediatorClass(remediation, options) {
  const { useGenericRemediator, remediators } = options;
  if (!remediation) {
    return void 0;
  }
  if (useGenericRemediator) {
    return GenericRemediator;
  }
  return remediators[remediation.name];
}
function getRemediator(idxResponse, values, options) {
  const remediators = options.remediators;
  const useGenericRemediator = options.useGenericRemediator;
  const { neededToProceed: idxRemediations, context } = idxResponse;
  let remediator;
  if (options.step) {
    const remediation = idxRemediations.find(({ name }) => name === options.step);
    if (remediation) {
      const T = getRemediatorClass(remediation, options);
      return T ? new T(remediation, values, options) : void 0;
    } else {
      warn(`step "${options.step}" did not match any remediations`);
      return;
    }
  }
  const remediatorCandidates = [];
  if (useGenericRemediator) {
    remediatorCandidates.push(new GenericRemediator(idxRemediations[0], values, options));
  } else {
    for (let remediation of idxRemediations) {
      const isRemeditionInFlow = Object.keys(remediators).includes(remediation.name);
      if (!isRemeditionInFlow) {
        continue;
      }
      const T = getRemediatorClass(remediation, options);
      remediator = new T(remediation, values, options);
      if (remediator.canRemediate(context)) {
        return remediator;
      }
      remediatorCandidates.push(remediator);
    }
  }
  return remediatorCandidates[0];
}
function getNextStep(authClient, remediator, idxResponse) {
  const nextStep = remediator.getNextStep(authClient, idxResponse.context);
  const canSkip = canSkipFn(idxResponse);
  const canResend = canResendFn(idxResponse);
  return Object.assign(Object.assign(Object.assign({}, nextStep), canSkip && { canSkip }), canResend && { canResend });
}
function handleFailedResponse(authClient, idxResponse, options = {}) {
  const terminal = isTerminalResponse(idxResponse);
  const messages = getMessagesFromResponse(idxResponse, options);
  if (terminal) {
    return { idxResponse, terminal, messages };
  } else {
    const remediator = getRemediator(idxResponse, {}, options);
    const nextStep = remediator && getNextStep(authClient, remediator, idxResponse);
    return Object.assign({
      idxResponse,
      messages
    }, nextStep && { nextStep });
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediate.js
function getActionFromValues(values, idxResponse) {
  return Object.keys(idxResponse.actions).find((action) => !!values.resend && action.includes("-resend"));
}
function removeActionFromValues(values) {
  return Object.assign(Object.assign({}, values), { resend: void 0 });
}
function removeActionFromOptions(options, actionName) {
  let actions = options.actions || [];
  actions = actions.filter((entry) => {
    if (typeof entry === "string") {
      return entry !== actionName;
    }
    return entry.name !== actionName;
  });
  return Object.assign(Object.assign({}, options), { actions });
}
function remediate(authClient, idxResponse, values, options) {
  return __async(this, null, function* () {
    let { neededToProceed, interactionCode } = idxResponse;
    const { flow } = options;
    if (interactionCode) {
      return { idxResponse };
    }
    const remediator = getRemediator(idxResponse, values, options);
    const actionFromValues = getActionFromValues(values, idxResponse);
    const actionFromOptions = options.actions || [];
    const actions = [
      ...actionFromOptions,
      ...actionFromValues && [actionFromValues] || []
    ];
    if (actions) {
      for (let action of actions) {
        let params = {};
        if (typeof action !== "string") {
          params = action.params || {};
          action = action.name;
        }
        let valuesWithoutExecutedAction = removeActionFromValues(values);
        let optionsWithoutExecutedAction = removeActionFromOptions(options, action);
        if (typeof idxResponse.actions[action] === "function") {
          idxResponse = yield idxResponse.actions[action](params);
          if (idxResponse.requestDidSucceed === false) {
            return handleFailedResponse(authClient, idxResponse, options);
          }
          if (action === "cancel") {
            return { idxResponse, canceled: true };
          }
          return remediate(authClient, idxResponse, valuesWithoutExecutedAction, optionsWithoutExecutedAction);
        }
        const remediationAction = neededToProceed.find(({ name: name2 }) => name2 === action);
        if (remediationAction) {
          idxResponse = yield idxResponse.proceed(action, params);
          if (idxResponse.requestDidSucceed === false) {
            return handleFailedResponse(authClient, idxResponse, options);
          }
          return remediate(authClient, idxResponse, values, optionsWithoutExecutedAction);
        }
      }
    }
    const terminal = isTerminalResponse(idxResponse);
    if (terminal) {
      return { idxResponse, terminal };
    }
    if (!remediator) {
      if (options.step) {
        values = filterValuesForRemediation(idxResponse, options.step, values);
        idxResponse = yield idxResponse.proceed(options.step, values);
        if (idxResponse.requestDidSucceed === false) {
          return handleFailedResponse(authClient, idxResponse, options);
        }
        return { idxResponse };
      }
      if (flow === "default") {
        return { idxResponse };
      }
      throw new AuthSdkError(`
      No remediation can match current flow, check policy settings in your org.
      Remediations: [${neededToProceed.reduce((acc, curr) => acc ? acc + " ," + curr.name : curr.name, "")}]
    `);
    }
    if (!remediator.canRemediate()) {
      const nextStep = getNextStep(authClient, remediator, idxResponse);
      return {
        idxResponse,
        nextStep
      };
    }
    const name = remediator.getName();
    const data = remediator.getData();
    idxResponse = yield idxResponse.proceed(name, data);
    if (idxResponse.requestDidSucceed === false) {
      return handleFailedResponse(authClient, idxResponse, options);
    }
    values = remediator.getValuesAfterProceed();
    options = Object.assign(Object.assign({}, options), { step: void 0 });
    if (options.useGenericRemediator && !idxResponse.interactionCode && !isTerminalResponse(idxResponse)) {
      const gr = getRemediator(idxResponse, values, options);
      const nextStep = getNextStep(authClient, gr, idxResponse);
      return {
        idxResponse,
        nextStep
      };
    }
    return remediate(authClient, idxResponse, values, options);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/run.js
function initializeValues(options) {
  const knownOptions = [
    "flow",
    "remediators",
    "actions",
    "withCredentials",
    "step",
    "useGenericRemediator",
    "exchangeCodeForTokens"
  ];
  const values = Object.assign({}, options);
  knownOptions.forEach((option) => {
    delete values[option];
  });
  return values;
}
function initializeData(authClient, data) {
  var _a, _b, _c, _d;
  let { options } = data;
  options = Object.assign(Object.assign({}, authClient.options.idx), options);
  let { flow, withCredentials, remediators, actions } = options;
  const status = IdxStatus.PENDING;
  flow = flow || ((_b = (_a = authClient.idx).getFlow) === null || _b === void 0 ? void 0 : _b.call(_a)) || "default";
  if (flow) {
    (_d = (_c = authClient.idx).setFlow) === null || _d === void 0 ? void 0 : _d.call(_c, flow);
    const flowSpec = getFlowSpecification(authClient, flow);
    withCredentials = typeof withCredentials !== "undefined" ? withCredentials : flowSpec.withCredentials;
    remediators = remediators || flowSpec.remediators;
    actions = actions || flowSpec.actions;
  }
  return Object.assign(Object.assign({}, data), { options: Object.assign(Object.assign({}, options), {
    flow,
    withCredentials,
    remediators,
    actions
  }), status });
}
function getDataFromIntrospect(authClient, data) {
  return __async(this, null, function* () {
    const { options } = data;
    const { stateHandle, withCredentials, version, state, scopes, recoveryToken, activationToken, maxAge, acrValues, nonce, useGenericRemediator } = options;
    let idxResponse;
    let meta = getSavedTransactionMeta(authClient, { state, recoveryToken, activationToken });
    if (stateHandle) {
      idxResponse = yield introspect(authClient, { withCredentials, version, stateHandle, useGenericRemediator });
    } else {
      let interactionHandle = meta === null || meta === void 0 ? void 0 : meta.interactionHandle;
      if (!interactionHandle) {
        authClient.transactionManager.clear();
        const interactResponse = yield interact(authClient, {
          withCredentials,
          state,
          scopes,
          activationToken,
          recoveryToken,
          maxAge,
          acrValues,
          nonce
        });
        interactionHandle = interactResponse.interactionHandle;
        meta = interactResponse.meta;
      }
      idxResponse = yield introspect(authClient, { withCredentials, version, interactionHandle, useGenericRemediator });
    }
    return Object.assign(Object.assign({}, data), { idxResponse, meta });
  });
}
function getDataFromRemediate(authClient, data) {
  return __async(this, null, function* () {
    let { idxResponse, options, values } = data;
    const { autoRemediate, remediators, actions, flow, step, useGenericRemediator } = options;
    const shouldRemediate = autoRemediate !== false && (remediators || actions || step);
    if (!shouldRemediate) {
      return data;
    }
    values = Object.assign(Object.assign({}, values), { stateHandle: idxResponse.rawIdxState.stateHandle });
    const { idxResponse: idxResponseFromRemediation, nextStep, canceled } = yield remediate(authClient, idxResponse, values, {
      remediators,
      actions,
      flow,
      step,
      useGenericRemediator
    });
    idxResponse = idxResponseFromRemediation;
    return Object.assign(Object.assign({}, data), { idxResponse, nextStep, canceled });
  });
}
function getTokens(authClient, data) {
  return __async(this, null, function* () {
    let { meta, idxResponse } = data;
    const { interactionCode } = idxResponse;
    const { clientId, codeVerifier, ignoreSignature, redirectUri, urls, scopes } = meta;
    const tokenResponse = yield authClient.token.exchangeCodeForTokens({
      interactionCode,
      clientId,
      codeVerifier,
      ignoreSignature,
      redirectUri,
      scopes
    }, urls);
    return tokenResponse.tokens;
  });
}
function finalizeData(authClient, data) {
  return __async(this, null, function* () {
    let { options, idxResponse, canceled, status } = data;
    const { exchangeCodeForTokens: exchangeCodeForTokens2 } = options;
    let shouldSaveResponse = false;
    let shouldClearTransaction = false;
    let clearSharedStorage = true;
    let interactionCode;
    let tokens;
    let enabledFeatures;
    let availableSteps;
    let messages;
    let terminal;
    if (idxResponse) {
      shouldSaveResponse = !!(idxResponse.requestDidSucceed || idxResponse.stepUp);
      enabledFeatures = getEnabledFeatures(idxResponse);
      availableSteps = getAvailableSteps(authClient, idxResponse, options.useGenericRemediator);
      messages = getMessagesFromResponse(idxResponse, options);
      terminal = isTerminalResponse(idxResponse);
    }
    if (terminal) {
      status = IdxStatus.TERMINAL;
      const hasActions = Object.keys(idxResponse.actions).length > 0;
      const hasErrors = !!messages.find((msg) => msg.class === "ERROR");
      const isTerminalSuccess = !hasActions && !hasErrors && idxResponse.requestDidSucceed === true;
      if (isTerminalSuccess) {
        shouldClearTransaction = true;
      } else {
        shouldSaveResponse = !!hasActions;
      }
      clearSharedStorage = false;
    } else if (canceled) {
      status = IdxStatus.CANCELED;
      shouldClearTransaction = true;
    } else if (idxResponse === null || idxResponse === void 0 ? void 0 : idxResponse.interactionCode) {
      interactionCode = idxResponse.interactionCode;
      if (exchangeCodeForTokens2 === false) {
        status = IdxStatus.SUCCESS;
        shouldClearTransaction = false;
      } else {
        tokens = yield getTokens(authClient, data);
        status = IdxStatus.SUCCESS;
        shouldClearTransaction = true;
      }
    }
    return Object.assign(Object.assign({}, data), {
      status,
      interactionCode,
      tokens,
      shouldSaveResponse,
      shouldClearTransaction,
      clearSharedStorage,
      enabledFeatures,
      availableSteps,
      messages,
      terminal
    });
  });
}
function run(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    var _a;
    let data = {
      options,
      values: initializeValues(options)
    };
    data = initializeData(authClient, data);
    data = yield getDataFromIntrospect(authClient, data);
    data = yield getDataFromRemediate(authClient, data);
    data = yield finalizeData(authClient, data);
    const { idxResponse, meta, shouldSaveResponse, shouldClearTransaction, clearSharedStorage, status, enabledFeatures, availableSteps, tokens, nextStep, messages, error, interactionCode } = data;
    if (shouldClearTransaction) {
      authClient.transactionManager.clear({ clearSharedStorage });
    } else {
      saveTransactionMeta(authClient, Object.assign({}, meta));
      if (shouldSaveResponse) {
        const { rawIdxState: rawIdxResponse, requestDidSucceed: requestDidSucceed2 } = idxResponse;
        authClient.transactionManager.saveIdxResponse({
          rawIdxResponse,
          requestDidSucceed: requestDidSucceed2,
          stateHandle: (_a = idxResponse.context) === null || _a === void 0 ? void 0 : _a.stateHandle,
          interactionHandle: meta === null || meta === void 0 ? void 0 : meta.interactionHandle
        });
      }
    }
    const { actions, context, neededToProceed, proceed: proceed2, rawIdxState, requestDidSucceed, stepUp } = idxResponse || {};
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ status }, meta && { meta }), enabledFeatures && { enabledFeatures }), availableSteps && { availableSteps }), tokens && { tokens }), nextStep && { nextStep }), messages && messages.length && { messages }), error && { error }), stepUp && { stepUp }), {
      interactionCode,
      actions,
      context,
      neededToProceed,
      proceed: proceed2,
      rawIdxState,
      requestDidSucceed
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticate.js
function authenticate(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    if (options.password && !options.authenticator) {
      options.authenticator = AuthenticatorKey.OKTA_PASSWORD;
    }
    return run(authClient, Object.assign(Object.assign({}, options), { flow: "authenticate" }));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/Authenticator.js
var Authenticator = class {
  constructor(authenticator) {
    this.meta = authenticator;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/VerificationCodeAuthenticator.js
var VerificationCodeAuthenticator = class extends Authenticator {
  canVerify(values) {
    return !!(values.credentials || values.verificationCode || values.otp);
  }
  mapCredentials(values) {
    const { credentials, verificationCode, otp } = values;
    if (!credentials && !verificationCode && !otp) {
      return;
    }
    return credentials || { passcode: verificationCode || otp };
  }
  getInputs(idxRemediationValue) {
    var _a;
    return Object.assign(Object.assign({}, (_a = idxRemediationValue.form) === null || _a === void 0 ? void 0 : _a.value[0]), { name: "verificationCode", type: "string", required: idxRemediationValue.required });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/OktaVerifyTotp.js
var OktaVerifyTotp = class extends VerificationCodeAuthenticator {
  mapCredentials(values) {
    const { verificationCode } = values;
    if (!verificationCode) {
      return;
    }
    return { totp: verificationCode };
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/OktaPassword.js
var OktaPassword = class extends Authenticator {
  canVerify(values) {
    return !!(values.credentials || values.password || values.passcode);
  }
  mapCredentials(values) {
    const { credentials, password, passcode, revokeSessions } = values;
    if (!credentials && !password && !passcode) {
      return;
    }
    return credentials || {
      passcode: passcode || password,
      revokeSessions
    };
  }
  getInputs(idxRemediationValue) {
    var _a, _b;
    const inputs = [Object.assign(Object.assign({}, (_a = idxRemediationValue.form) === null || _a === void 0 ? void 0 : _a.value[0]), { name: "password", type: "string", required: idxRemediationValue.required })];
    const revokeSessions = (_b = idxRemediationValue.form) === null || _b === void 0 ? void 0 : _b.value.find((input) => input.name === "revokeSessions");
    if (revokeSessions) {
      inputs.push({
        name: "revokeSessions",
        type: "boolean",
        label: "Sign me out of all other devices",
        required: false
      });
    }
    return inputs;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/SecurityQuestionEnrollment.js
var SecurityQuestionEnrollment = class extends Authenticator {
  canVerify(values) {
    const { credentials } = values;
    if (credentials && credentials.questionKey && credentials.answer) {
      return true;
    }
    const { questionKey, question, answer } = values;
    return !!(questionKey && answer) || !!(question && answer);
  }
  mapCredentials(values) {
    const { questionKey, question, answer } = values;
    if (!answer || !questionKey && !question) {
      return;
    }
    return {
      questionKey: question ? "custom" : questionKey,
      question,
      answer
    };
  }
  getInputs() {
    return [
      { name: "questionKey", type: "string", required: true },
      { name: "question", type: "string", label: "Create a security question" },
      { name: "answer", type: "string", label: "Answer", required: true }
    ];
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/SecurityQuestionVerification.js
var SecurityQuestionVerification = class extends Authenticator {
  canVerify(values) {
    const { credentials } = values;
    if (credentials && credentials.answer) {
      return true;
    }
    const { answer } = values;
    return !!answer;
  }
  mapCredentials(values) {
    const { answer } = values;
    if (!answer) {
      return;
    }
    return {
      questionKey: this.meta.contextualData.enrolledQuestion.questionKey,
      answer
    };
  }
  getInputs() {
    return [
      { name: "answer", type: "string", label: "Answer", required: true }
    ];
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/WebauthnEnrollment.js
var WebauthnEnrollment = class extends Authenticator {
  canVerify(values) {
    const { credentials } = values;
    const obj = credentials || values;
    const { clientData, attestation } = obj;
    return !!(clientData && attestation);
  }
  mapCredentials(values) {
    const { credentials, clientData, attestation } = values;
    if (!credentials && !clientData && !attestation) {
      return;
    }
    return credentials || {
      clientData,
      attestation
    };
  }
  getInputs() {
    return [
      { name: "clientData", type: "string", required: true, visible: false, label: "Client Data" },
      { name: "attestation", type: "string", required: true, visible: false, label: "Attestation" }
    ];
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/WebauthnVerification.js
var WebauthnVerification = class extends Authenticator {
  canVerify(values) {
    const { credentials } = values;
    const obj = credentials || values;
    const { clientData, authenticatorData, signatureData } = obj;
    return !!(clientData && authenticatorData && signatureData);
  }
  mapCredentials(values) {
    const { credentials, authenticatorData, clientData, signatureData } = values;
    if (!credentials && !authenticatorData && !clientData && !signatureData) {
      return;
    }
    return credentials || {
      authenticatorData,
      clientData,
      signatureData
    };
  }
  getInputs() {
    return [
      { name: "authenticatorData", type: "string", label: "Authenticator Data", required: true, visible: false },
      { name: "clientData", type: "string", label: "Client Data", required: true, visible: false },
      { name: "signatureData", type: "string", label: "Signature Data", required: true, visible: false }
    ];
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/authenticator/getAuthenticator.js
function getAuthenticator(remediation) {
  var _a, _b;
  const relatesTo = remediation.relatesTo;
  const value = (relatesTo === null || relatesTo === void 0 ? void 0 : relatesTo.value) || {};
  switch (value.key) {
    case AuthenticatorKey.OKTA_PASSWORD:
      return new OktaPassword(value);
    case AuthenticatorKey.SECURITY_QUESTION:
      if ((_a = value.contextualData) === null || _a === void 0 ? void 0 : _a.enrolledQuestion) {
        return new SecurityQuestionVerification(value);
      } else {
        return new SecurityQuestionEnrollment(value);
      }
    case AuthenticatorKey.OKTA_VERIFY:
      return new OktaVerifyTotp(value);
    case AuthenticatorKey.WEBAUTHN:
      if ((_b = value.contextualData) === null || _b === void 0 ? void 0 : _b.challengeData) {
        return new WebauthnVerification(value);
      } else {
        return new WebauthnEnrollment(value);
      }
    default:
      return new VerificationCodeAuthenticator(value);
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Base/VerifyAuthenticator.js
var VerifyAuthenticator = class extends Remediator {
  constructor(remediation, values = {}) {
    super(remediation, values);
    this.authenticator = getAuthenticator(remediation);
  }
  getNextStep(authClient, context) {
    var _a;
    const nextStep = super.getNextStep(authClient, context);
    const authenticatorEnrollments = (_a = context === null || context === void 0 ? void 0 : context.authenticatorEnrollments) === null || _a === void 0 ? void 0 : _a.value;
    return Object.assign(Object.assign({}, nextStep), { authenticatorEnrollments });
  }
  canRemediate() {
    return this.authenticator.canVerify(this.values);
  }
  mapCredentials() {
    return this.authenticator.mapCredentials(this.values);
  }
  getInputCredentials(input) {
    return this.authenticator.getInputs(input);
  }
  getValuesAfterProceed() {
    this.values = super.getValuesAfterProceed();
    let trimmedValues = Object.keys(this.values).filter((valueKey) => valueKey !== "credentials");
    return trimmedValues.reduce((values, valueKey) => Object.assign(Object.assign({}, values), { [valueKey]: this.values[valueKey] }), {});
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/EnrollAuthenticator.js
var EnrollAuthenticator = class extends VerifyAuthenticator {
};
EnrollAuthenticator.remediationName = "enroll-authenticator";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/EnrollPoll.js
var EnrollPoll = class extends Remediator {
  canRemediate() {
    return !!this.values.startPolling || this.options.step === "enroll-poll";
  }
  getNextStep(authClient, context) {
    const common = super.getNextStep(authClient, context);
    let authenticator = this.getAuthenticator();
    if (!authenticator && (context === null || context === void 0 ? void 0 : context.currentAuthenticator)) {
      authenticator = context.currentAuthenticator.value;
    }
    return Object.assign(Object.assign({}, common), { authenticator, poll: {
      required: true,
      refresh: this.remediation.refresh
    } });
  }
  getValuesAfterProceed() {
    let trimmedValues = Object.keys(this.values).filter((valueKey) => valueKey !== "startPolling");
    return trimmedValues.reduce((values, valueKey) => Object.assign(Object.assign({}, values), { [valueKey]: this.values[valueKey] }), {});
  }
};
EnrollPoll.remediationName = "enroll-poll";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/SelectEnrollmentChannel.js
var SelectEnrollmentChannel = class extends Remediator {
  canRemediate() {
    if (this.values.channel) {
      return true;
    }
    if (this.values.authenticator) {
      const { id, channel } = this.values.authenticator;
      if (!!id && !!channel) {
        return true;
      }
    }
    return false;
  }
  getNextStep(authClient, context) {
    const common = super.getNextStep(authClient, context);
    const authenticator = context.currentAuthenticator.value;
    return Object.assign(Object.assign({}, common), { authenticator });
  }
  getData() {
    var _a;
    const remediationValue = this.remediation.value[0].value;
    return {
      authenticator: {
        id: remediationValue.form.value[0].value,
        channel: ((_a = this.values.authenticator) === null || _a === void 0 ? void 0 : _a.channel) || this.values.channel
      },
      stateHandle: this.values.stateHandle
    };
  }
  getValuesAfterProceed() {
    this.values = super.getValuesAfterProceed();
    delete this.values.authenticators;
    const filterKey = this.values.channel ? "channel" : "authenticator";
    let trimmedValues = Object.keys(this.values).filter((valueKey) => valueKey !== filterKey);
    return trimmedValues.reduce((values, valueKey) => Object.assign(Object.assign({}, values), { [valueKey]: this.values[valueKey] }), {});
  }
};
SelectEnrollmentChannel.remediationName = "select-enrollment-channel";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/EnrollmentChannelData.js
var EnrollmentChannelData = class extends Remediator {
  getInputEmail() {
    return [
      { name: "email", type: "string", required: true, label: "Email" }
    ];
  }
  getInputPhoneNumber() {
    return [
      { name: "phoneNumber", type: "string", required: true, label: "Phone Number" }
    ];
  }
  canRemediate() {
    return Boolean(this.values.email || this.values.phoneNumber);
  }
  getNextStep(authClient, context) {
    const common = super.getNextStep(authClient, context);
    const authenticator = context.currentAuthenticator.value;
    return Object.assign(Object.assign({}, common), { authenticator });
  }
  getData() {
    return {
      stateHandle: this.values.stateHandle,
      email: this.values.email,
      phoneNumber: this.values.phoneNumber
    };
  }
  getValuesAfterProceed() {
    let trimmedValues = Object.keys(this.values).filter((valueKey) => !["email", "phoneNumber"].includes(valueKey));
    return trimmedValues.reduce((values, valueKey) => Object.assign(Object.assign({}, values), { [valueKey]: this.values[valueKey] }), {});
  }
};
EnrollmentChannelData.remediationName = "enrollment-channel-data";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/ChallengeAuthenticator.js
var ChallengeAuthenticator = class extends VerifyAuthenticator {
};
ChallengeAuthenticator.remediationName = "challenge-authenticator";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/ChallengePoll.js
var ChallengePoll = class extends EnrollPoll {
  canRemediate() {
    return !!this.values.startPolling || this.options.step === "challenge-poll";
  }
};
ChallengePoll.remediationName = "challenge-poll";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/ResetAuthenticator.js
var ResetAuthenticator = class extends VerifyAuthenticator {
};
ResetAuthenticator.remediationName = "reset-authenticator";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/EnrollProfile.js
var EnrollProfile = class extends Remediator {
  constructor(remediation, values = {}, options = {}) {
    super(remediation, values, options);
    this.authenticator = null;
    const credentials = this.getCredentialsFromRemediation();
    if (credentials) {
      this.authenticator = this.authenticator = new OktaPassword({});
    }
  }
  canRemediate() {
    if (this.authenticator && !this.authenticator.canVerify(this.values)) {
      return false;
    }
    const userProfileFromValues = this.getData().userProfile;
    if (!userProfileFromValues) {
      return false;
    }
    const userProfileFromRemediation = this.remediation.value.find(({ name }) => name === "userProfile");
    return userProfileFromRemediation.form.value.reduce((canRemediate, curr) => {
      if (curr.required) {
        canRemediate = canRemediate && !!userProfileFromValues[curr.name];
      }
      return canRemediate;
    }, true);
  }
  getCredentialsFromRemediation() {
    return this.remediation.value.find(({ name }) => name === "credentials");
  }
  mapUserProfile({ form: { value: profileAttributes } }) {
    const attributeNames = profileAttributes.map(({ name }) => name);
    const data = attributeNames.reduce((attributeValues, attributeName) => this.values[attributeName] ? Object.assign(Object.assign({}, attributeValues), { [attributeName]: this.values[attributeName] }) : attributeValues, {});
    if (Object.keys(data).length === 0) {
      return;
    }
    return data;
  }
  mapCredentials() {
    const val = this.authenticator && this.authenticator.mapCredentials(this.values);
    if (!val) {
      return;
    }
    return val;
  }
  getInputUserProfile(input) {
    return [...input.form.value];
  }
  getInputCredentials(input) {
    return [...input.form.value];
  }
  getErrorMessages(errorRemediation) {
    return errorRemediation.value[0].form.value.reduce((errors, field) => {
      if (field.messages) {
        errors.push(field.messages.value[0].message);
      }
      return errors;
    }, []);
  }
};
EnrollProfile.remediationName = "enroll-profile";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Identify.js
var Identify = class extends Remediator {
  constructor() {
    super(...arguments);
    this.map = {
      "identifier": ["username"]
    };
  }
  canRemediate() {
    const { identifier } = this.getData();
    return !!identifier;
  }
  mapCredentials() {
    const { credentials, password } = this.values;
    if (!credentials && !password) {
      return;
    }
    return credentials || { passcode: password };
  }
  getInputCredentials(input) {
    return Object.assign(Object.assign({}, input.form.value[0]), { name: "password", required: input.required });
  }
};
Identify.remediationName = "identify";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/ReEnrollAuthenticator.js
var ReEnrollAuthenticator = class extends Remediator {
  mapCredentials() {
    const { newPassword } = this.values;
    if (!newPassword) {
      return;
    }
    return {
      passcode: newPassword
    };
  }
  getInputCredentials(input) {
    const challengeType = this.getAuthenticator().type;
    const name = challengeType === "password" ? "newPassword" : "verificationCode";
    return Object.assign(Object.assign({}, input.form.value[0]), { name });
  }
};
ReEnrollAuthenticator.remediationName = "reenroll-authenticator";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/ReEnrollAuthenticatorWarning.js
var ReEnrollAuthenticatorWarning = class extends ReEnrollAuthenticator {
};
ReEnrollAuthenticatorWarning.remediationName = "reenroll-authenticator-warning";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/RedirectIdp.js
var RedirectIdp = class extends Remediator {
  canRemediate() {
    return false;
  }
  getNextStep() {
    const { name, type: type5, idp, href } = this.remediation;
    return {
      name,
      type: type5,
      idp,
      href
    };
  }
};
RedirectIdp.remediationName = "redirect-idp";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Base/SelectAuthenticator.js
var SelectAuthenticator = class extends Remediator {
  findMatchedOption(authenticators, options) {
    let option;
    for (let authenticator of authenticators) {
      option = options.find(({ relatesTo }) => relatesTo.key && relatesTo.key === authenticator.key);
      if (option) {
        break;
      }
    }
    return option;
  }
  canRemediate(context) {
    var _a, _b;
    const { authenticators, authenticator } = this.values;
    const authenticatorFromRemediation = getAuthenticatorFromRemediation(this.remediation);
    const { options } = authenticatorFromRemediation;
    if (!authenticators || !authenticators.length) {
      return false;
    }
    if (isAuthenticator(authenticator) && authenticator.id) {
      return true;
    }
    const matchedOption = this.findMatchedOption(authenticators, options);
    if (matchedOption) {
      const isCurrentAuthenticator = (context === null || context === void 0 ? void 0 : context.currentAuthenticator) && (context === null || context === void 0 ? void 0 : context.currentAuthenticator.value.id) === ((_a = matchedOption.relatesTo) === null || _a === void 0 ? void 0 : _a.id);
      const isCurrentAuthenticatorEnrollment = (context === null || context === void 0 ? void 0 : context.currentAuthenticatorEnrollment) && (context === null || context === void 0 ? void 0 : context.currentAuthenticatorEnrollment.value.id) === ((_b = matchedOption.relatesTo) === null || _b === void 0 ? void 0 : _b.id);
      return !isCurrentAuthenticator && !isCurrentAuthenticatorEnrollment;
    }
    return false;
  }
  mapAuthenticator(remediationValue) {
    const { authenticators, authenticator } = this.values;
    if (isAuthenticator(authenticator) && authenticator.id) {
      this.selectedAuthenticator = authenticator;
      return authenticator;
    }
    const { options } = remediationValue;
    const selectedOption = findMatchedOption(authenticators, options);
    this.selectedAuthenticator = selectedOption.relatesTo;
    this.selectedOption = selectedOption;
    return {
      id: selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value.form.value.find(({ name }) => name === "id").value
    };
  }
  getInputAuthenticator(remediation) {
    const options = remediation.options.map(({ label, relatesTo }) => {
      return {
        label,
        value: relatesTo.key
      };
    });
    return { name: "authenticator", type: "string", options };
  }
  getValuesAfterProceed() {
    this.values = super.getValuesAfterProceed();
    const authenticators = this.values.authenticators.filter((authenticator) => {
      return compareAuthenticators(authenticator, this.selectedAuthenticator) !== true;
    });
    return Object.assign(Object.assign({}, this.values), { authenticators });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorAuthenticate.js
var SelectAuthenticatorAuthenticate = class extends SelectAuthenticator {
  constructor(remediation, values = {}, options = {}) {
    var _a;
    super(remediation, values, options);
    const isRecoveryFlow = this.options.flow === "recoverPassword";
    const hasPasswordInOptions = (_a = getAuthenticatorFromRemediation(remediation).options) === null || _a === void 0 ? void 0 : _a.some(({ relatesTo }) => (relatesTo === null || relatesTo === void 0 ? void 0 : relatesTo.key) === AuthenticatorKey.OKTA_PASSWORD);
    if (hasPasswordInOptions && (isRecoveryFlow || this.values.password)) {
      this.values.authenticators = [
        ...this.values.authenticators || [],
        { key: AuthenticatorKey.OKTA_PASSWORD }
      ];
    }
  }
};
SelectAuthenticatorAuthenticate.remediationName = "select-authenticator-authenticate";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorEnroll.js
var SelectAuthenticatorEnroll = class extends SelectAuthenticator {
};
SelectAuthenticatorEnroll.remediationName = "select-authenticator-enroll";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorUnlockAccount.js
var SelectAuthenticatorUnlockAccount = class extends SelectAuthenticator {
  constructor() {
    super(...arguments);
    this.map = {
      identifier: ["username"]
    };
  }
  canRemediate() {
    const identifier = this.getData("identifier");
    return !!identifier && super.canRemediate();
  }
  mapAuthenticator(remediationValue) {
    var _a, _b, _c;
    const authenticatorMap = super.mapAuthenticator(remediationValue);
    const methodTypeOption = (_a = this.selectedOption) === null || _a === void 0 ? void 0 : _a.value.form.value.find(({ name }) => name === "methodType");
    const methodTypeValue = this.values.methodType || (methodTypeOption === null || methodTypeOption === void 0 ? void 0 : methodTypeOption.value) || ((_c = (_b = methodTypeOption === null || methodTypeOption === void 0 ? void 0 : methodTypeOption.options) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.value);
    if (methodTypeValue) {
      return Object.assign(Object.assign({}, authenticatorMap), { methodType: methodTypeValue });
    }
    return authenticatorMap;
  }
  getInputUsername() {
    return { name: "username", type: "string" };
  }
};
SelectAuthenticatorUnlockAccount.remediationName = "select-authenticator-unlock-account";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/SelectEnrollProfile.js
var SelectEnrollProfile = class extends Remediator {
  canRemediate() {
    return true;
  }
};
SelectEnrollProfile.remediationName = "select-enroll-profile";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Base/AuthenticatorData.js
var AuthenticatorData = class extends Remediator {
  constructor(remediation, values = {}) {
    super(remediation, values);
    this.authenticator = this.getAuthenticator();
    this.formatAuthenticatorData();
  }
  formatAuthenticatorData() {
    const authenticatorData = this.getAuthenticatorData();
    if (authenticatorData) {
      this.values.authenticatorsData = this.values.authenticatorsData.map((data) => {
        if (compareAuthenticators(this.authenticator, data)) {
          return this.mapAuthenticatorDataFromValues(data);
        }
        return data;
      });
    } else {
      const data = this.mapAuthenticatorDataFromValues();
      if (data) {
        this.values.authenticatorsData.push(data);
      }
    }
  }
  getAuthenticatorData() {
    return this.values.authenticatorsData.find((data) => compareAuthenticators(this.authenticator, data));
  }
  canRemediate() {
    return this.values.authenticatorsData.some((data) => compareAuthenticators(this.authenticator, data));
  }
  mapAuthenticatorDataFromValues(authenticatorData) {
    let { methodType, authenticator } = this.values;
    if (!methodType && isAuthenticator(authenticator)) {
      methodType = authenticator === null || authenticator === void 0 ? void 0 : authenticator.methodType;
    }
    const { id, enrollmentId } = this.authenticator;
    const data = Object.assign(Object.assign({
      id,
      enrollmentId
    }, authenticatorData && authenticatorData), methodType && { methodType });
    return data.methodType ? data : null;
  }
  getAuthenticatorFromRemediation() {
    const authenticator = this.remediation.value.find(({ name }) => name === "authenticator");
    return authenticator;
  }
  getValuesAfterProceed() {
    this.values = super.getValuesAfterProceed();
    const authenticatorsData = this.values.authenticatorsData.filter((data) => compareAuthenticators(this.authenticator, data) !== true);
    return Object.assign(Object.assign({}, this.values), { authenticatorsData });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/AuthenticatorVerificationData.js
var AuthenticatorVerificationData = class extends AuthenticatorData {
  mapAuthenticator() {
    return this.getAuthenticatorData();
  }
  getInputAuthenticator() {
    const authenticator = this.getAuthenticatorFromRemediation();
    const methodType = authenticator.form.value.find(({ name }) => name === "methodType");
    if (methodType && methodType.options) {
      return {
        name: "methodType",
        type: "string",
        required: true,
        options: methodType.options
      };
    }
    const inputs = [...authenticator.form.value];
    return inputs;
  }
  getValuesAfterProceed() {
    this.values = super.getValuesAfterProceed();
    let trimmedValues = Object.keys(this.values).filter((valueKey) => valueKey !== "authenticator");
    return trimmedValues.reduce((values, valueKey) => Object.assign(Object.assign({}, values), { [valueKey]: this.values[valueKey] }), {});
  }
};
AuthenticatorVerificationData.remediationName = "authenticator-verification-data";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/AuthenticatorEnrollmentData.js
var AuthenticatorEnrollmentData = class extends AuthenticatorData {
  mapAuthenticator() {
    const authenticatorData = this.getAuthenticatorData();
    const authenticatorFromRemediation = getAuthenticatorFromRemediation(this.remediation);
    return {
      id: authenticatorFromRemediation.form.value.find(({ name }) => name === "id").value,
      methodType: authenticatorData.methodType,
      phoneNumber: authenticatorData.phoneNumber
    };
  }
  getInputAuthenticator(remediation) {
    return [
      { name: "methodType", type: "string" },
      { name: "phoneNumber", label: "Phone Number", type: "string" }
    ].map((item) => {
      const value = remediation.form.value.find((val) => val.name === item.name);
      return Object.assign(Object.assign({}, value), item);
    });
  }
  mapAuthenticatorDataFromValues(data) {
    data = super.mapAuthenticatorDataFromValues(data);
    const { phoneNumber } = this.values;
    if (!data && !phoneNumber) {
      return;
    }
    return Object.assign(Object.assign({}, data && data), phoneNumber && { phoneNumber });
  }
};
AuthenticatorEnrollmentData.remediationName = "authenticator-enrollment-data";

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/Skip.js
var Skip = class extends Remediator {
  canRemediate() {
    return !!this.values.skip || this.options.step === "skip";
  }
};
Skip.remediationName = "skip";

// node_modules/@okta/okta-auth-js/esm/browser/idx/flow/AuthenticationFlow.js
var AuthenticationFlow = {
  "identify": Identify,
  "select-authenticator-authenticate": SelectAuthenticatorAuthenticate,
  "select-authenticator-enroll": SelectAuthenticatorEnroll,
  "authenticator-enrollment-data": AuthenticatorEnrollmentData,
  "authenticator-verification-data": AuthenticatorVerificationData,
  "enroll-authenticator": EnrollAuthenticator,
  "challenge-authenticator": ChallengeAuthenticator,
  "challenge-poll": ChallengePoll,
  "reenroll-authenticator": ReEnrollAuthenticator,
  "reenroll-authenticator-warning": ReEnrollAuthenticatorWarning,
  "enroll-poll": EnrollPoll,
  "select-enrollment-channel": SelectEnrollmentChannel,
  "enrollment-channel-data": EnrollmentChannelData,
  "redirect-idp": RedirectIdp,
  "skip": Skip
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/flow/PasswordRecoveryFlow.js
var PasswordRecoveryFlow = {
  "identify": Identify,
  "identify-recovery": Identify,
  "select-authenticator-authenticate": SelectAuthenticatorAuthenticate,
  "select-authenticator-enroll": SelectAuthenticatorEnroll,
  "challenge-authenticator": ChallengeAuthenticator,
  "authenticator-verification-data": AuthenticatorVerificationData,
  "authenticator-enrollment-data": AuthenticatorEnrollmentData,
  "reset-authenticator": ResetAuthenticator,
  "reenroll-authenticator": ReEnrollAuthenticator,
  "reenroll-authenticator-warning": ReEnrollAuthenticatorWarning,
  "enroll-poll": EnrollPoll
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/flow/RegistrationFlow.js
var RegistrationFlow = {
  "select-enroll-profile": SelectEnrollProfile,
  "enroll-profile": EnrollProfile,
  "authenticator-enrollment-data": AuthenticatorEnrollmentData,
  "select-authenticator-enroll": SelectAuthenticatorEnroll,
  "enroll-poll": EnrollPoll,
  "select-enrollment-channel": SelectEnrollmentChannel,
  "enrollment-channel-data": EnrollmentChannelData,
  "enroll-authenticator": EnrollAuthenticator,
  "skip": Skip
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/flow/AccountUnlockFlow.js
var AccountUnlockFlow = {
  "identify": Identify,
  "select-authenticator-unlock-account": SelectAuthenticatorUnlockAccount,
  "select-authenticator-authenticate": SelectAuthenticatorAuthenticate,
  "challenge-authenticator": ChallengeAuthenticator,
  "challenge-poll": ChallengePoll,
  "authenticator-verification-data": AuthenticatorVerificationData,
  "reenroll-authenticator-warning": ReEnrollAuthenticatorWarning
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/flow/FlowSpecification.js
function getFlowSpecification2(oktaAuth, flow = "default") {
  let remediators, actions, withCredentials = true;
  switch (flow) {
    case "register":
    case "signup":
    case "enrollProfile":
      remediators = RegistrationFlow;
      withCredentials = false;
      break;
    case "recoverPassword":
    case "resetPassword":
      remediators = PasswordRecoveryFlow;
      actions = [
        "currentAuthenticator-recover",
        "currentAuthenticatorEnrollment-recover"
      ];
      withCredentials = false;
      break;
    case "unlockAccount":
      remediators = AccountUnlockFlow;
      withCredentials = false;
      actions = [
        "unlock-account"
      ];
      break;
    case "authenticate":
    case "login":
    case "signin":
      remediators = AuthenticationFlow;
      break;
    default:
      remediators = AuthenticationFlow;
      break;
  }
  return { flow, remediators, actions, withCredentials };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/cancel.js
function cancel(authClient, options) {
  return __async(this, null, function* () {
    const meta = authClient.transactionManager.load();
    const flowSpec = getFlowSpecification2(authClient, meta.flow);
    return run(authClient, Object.assign(Object.assign(Object.assign({}, options), flowSpec), { actions: ["cancel"] }));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/urlParams.js
function urlParamsToObject(hashOrSearch) {
  var plus2space = /\+/g;
  var paramSplit = /([^&=]+)=?([^&]*)/g;
  var fragment = hashOrSearch || "";
  if (fragment.charAt(0) === "#" && fragment.charAt(1) === "/") {
    fragment = fragment.substring(2);
  }
  if (fragment.charAt(0) === "#" || fragment.charAt(0) === "?") {
    fragment = fragment.substring(1);
  }
  var obj = {};
  var param;
  while (true) {
    param = paramSplit.exec(fragment);
    if (!param) {
      break;
    }
    var key = param[1];
    var value = param[2];
    if (key === "id_token" || key === "access_token" || key === "code") {
      obj[key] = value;
    } else {
      obj[key] = decodeURIComponent(value.replace(plus2space, " "));
    }
  }
  return obj;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/emailVerify.js
var EmailVerifyCallbackError = class extends CustomError {
  constructor(state, otp) {
    super(`Enter the OTP code in the originating client: ${otp}`);
    this.name = "EmailVerifyCallbackError";
    this.state = state;
    this.otp = otp;
  }
};
function isEmailVerifyCallbackError(error) {
  return error.name === "EmailVerifyCallbackError";
}
function isEmailVerifyCallback(urlPath) {
  return /(otp=)/i.test(urlPath) && /(state=)/i.test(urlPath);
}
function parseEmailVerifyCallback(urlPath) {
  return urlParamsToObject(urlPath);
}
function handleEmailVerifyCallback(authClient, search) {
  return __async(this, null, function* () {
    if (isEmailVerifyCallback(search)) {
      const { state, otp } = parseEmailVerifyCallback(search);
      if (authClient.idx.canProceed({ state })) {
        return yield authClient.idx.proceed({ state, otp });
      } else {
        throw new EmailVerifyCallbackError(state, otp);
      }
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/proceed.js
function canProceed(authClient, options = {}) {
  const meta = getSavedTransactionMeta(authClient, options);
  return !!(meta || options.stateHandle);
}
function proceed(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    if (!canProceed(authClient, options)) {
      throw new AuthSdkError("Unable to proceed: saved transaction could not be loaded");
    }
    let { flow, state } = options;
    if (!flow) {
      const meta = getSavedTransactionMeta(authClient, { state });
      flow = meta === null || meta === void 0 ? void 0 : meta.flow;
    }
    return run(authClient, Object.assign(Object.assign({}, options), { flow }));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/poll.js
function poll(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    var _a;
    let transaction = yield proceed(authClient, {
      startPolling: true
    });
    const meta = getSavedTransactionMeta(authClient);
    let availablePollingRemeditaions = (_a = meta === null || meta === void 0 ? void 0 : meta.remediations) === null || _a === void 0 ? void 0 : _a.find((remediation) => remediation.includes("poll"));
    if (!(availablePollingRemeditaions === null || availablePollingRemeditaions === void 0 ? void 0 : availablePollingRemeditaions.length)) {
      warn("No polling remediations available at the current IDX flow stage");
    }
    if (Number.isInteger(options.refresh)) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          return __async(this, null, function* () {
            var _a2, _b;
            try {
              const refresh = (_b = (_a2 = transaction.nextStep) === null || _a2 === void 0 ? void 0 : _a2.poll) === null || _b === void 0 ? void 0 : _b.refresh;
              if (refresh) {
                resolve(poll(authClient, {
                  refresh
                }));
              } else {
                resolve(transaction);
              }
            } catch (err) {
              reject(err);
            }
          });
        }, options.refresh);
      });
    }
    return transaction;
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/startTransaction.js
function startTransaction(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    authClient.transactionManager.clear();
    return run(authClient, Object.assign({ exchangeCodeForTokens: false }, options));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/register.js
function register(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    if (!hasSavedInteractionHandle(authClient)) {
      const { enabledFeatures } = yield startTransaction(authClient, Object.assign(Object.assign({}, options), { flow: "register", autoRemediate: false }));
      if (!options.activationToken && enabledFeatures && !enabledFeatures.includes(IdxFeature.REGISTRATION)) {
        throw new AuthSdkError("Registration is not supported based on your current org configuration.");
      }
    }
    return run(authClient, Object.assign(Object.assign({}, options), { flow: "register" }));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/recoverPassword.js
function recoverPassword(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    const flowSpec = getFlowSpecification2(authClient, "recoverPassword");
    return run(authClient, Object.assign(Object.assign({}, options), flowSpec));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/handleInteractionCodeRedirect.js
function handleInteractionCodeRedirect(authClient, url) {
  return __async(this, null, function* () {
    const meta = authClient.transactionManager.load();
    if (!meta) {
      throw new AuthSdkError("No transaction data was found in storage");
    }
    const { codeVerifier, state: savedState } = meta;
    const {
      searchParams
    } = new URL(url);
    const state = searchParams.get("state");
    const interactionCode = searchParams.get("interaction_code");
    const error = searchParams.get("error");
    if (error) {
      throw new OAuthError(error, searchParams.get("error_description"));
    }
    if (state !== savedState) {
      throw new AuthSdkError("State in redirect uri does not match with transaction state");
    }
    if (!interactionCode) {
      throw new AuthSdkError("Unable to parse interaction_code from the url");
    }
    const { tokens } = yield authClient.token.exchangeCodeForTokens({ interactionCode, codeVerifier });
    authClient.tokenManager.setTokens(tokens);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/unlockAccount.js
function unlockAccount(_0) {
  return __async(this, arguments, function* (authClient, options = {}) {
    options.flow = "unlockAccount";
    if (!hasSavedInteractionHandle(authClient)) {
      const { enabledFeatures } = yield startTransaction(authClient, Object.assign(Object.assign({}, options), { autoRemediate: false }));
      if (enabledFeatures && !enabledFeatures.includes(IdxFeature.ACCOUNT_UNLOCK)) {
        throw new AuthSdkError("Self Service Account Unlock is not supported based on your current org configuration.");
      }
    }
    return run(authClient, Object.assign({}, options));
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/errors.js
function isInteractionRequiredError(error) {
  if (error.name !== "OAuthError") {
    return false;
  }
  const oauthError = error;
  return oauthError.errorCode === "interaction_required";
}
function isAuthorizationCodeError(sdk, error) {
  if (error.name !== "AuthApiError") {
    return false;
  }
  const authApiError = error;
  const errorResponse = authApiError.xhr;
  const responseJSON = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.responseJSON;
  return sdk.options.pkce && (responseJSON === null || responseJSON === void 0 ? void 0 : responseJSON.error) === "invalid_grant";
}
function isRefreshTokenInvalidError(error) {
  return isOAuthError(error) && error.errorCode === "invalid_grant" && error.errorSummary === "The refresh token is invalid or expired.";
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/loginRedirect.js
function hasTokensInHash(hash) {
  return /((id|access)_token=)/i.test(hash);
}
function hasAuthorizationCode(hashOrSearch) {
  return /(code=)/i.test(hashOrSearch);
}
function hasInteractionCode(hashOrSearch) {
  return /(interaction_code=)/i.test(hashOrSearch);
}
function hasErrorInUrl(hashOrSearch) {
  return /(error=)/i.test(hashOrSearch) || /(error_description)/i.test(hashOrSearch);
}
function isRedirectUri(uri, sdk) {
  var authParams = sdk.options;
  if (!uri || !authParams.redirectUri) {
    return false;
  }
  return uri.indexOf(authParams.redirectUri) === 0;
}
function isCodeFlow(options) {
  return options.pkce || options.responseType === "code" || options.responseMode === "query";
}
function hasResponseType(responseType, options) {
  let hasResponseType2 = false;
  if (Array.isArray(options.responseType) && options.responseType.length) {
    hasResponseType2 = options.responseType.indexOf(responseType) >= 0;
  } else {
    hasResponseType2 = options.responseType === responseType;
  }
  return hasResponseType2;
}
function getHashOrSearch(options) {
  var codeFlow = isCodeFlow(options);
  var useQuery = codeFlow && options.responseMode !== "fragment";
  return useQuery ? window.location.search : window.location.hash;
}
function isLoginRedirect(sdk) {
  if (!isRedirectUri(window.location.href, sdk)) {
    return false;
  }
  var codeFlow = isCodeFlow(sdk.options);
  var hashOrSearch = getHashOrSearch(sdk.options);
  if (hasErrorInUrl(hashOrSearch)) {
    return true;
  }
  if (codeFlow) {
    var hasCode = hasAuthorizationCode(hashOrSearch) || hasInteractionCode(hashOrSearch);
    return hasCode;
  }
  return hasTokensInHash(window.location.hash);
}
function isInteractionRequired(sdk, hashOrSearch) {
  if (!hashOrSearch) {
    if (!isLoginRedirect(sdk)) {
      return false;
    }
    hashOrSearch = getHashOrSearch(sdk.options);
  }
  return /(error=interaction_required)/i.test(hashOrSearch);
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/factory/api.js
var import_tiny_emitter5 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch5 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/idx/remediators/index.js
var remediators_exports = {};
__export(remediators_exports, {
  AuthenticatorEnrollmentData: () => AuthenticatorEnrollmentData,
  AuthenticatorVerificationData: () => AuthenticatorVerificationData,
  ChallengeAuthenticator: () => ChallengeAuthenticator,
  ChallengePoll: () => ChallengePoll,
  EnrollAuthenticator: () => EnrollAuthenticator,
  EnrollPoll: () => EnrollPoll,
  EnrollProfile: () => EnrollProfile,
  EnrollmentChannelData: () => EnrollmentChannelData,
  GenericRemediator: () => GenericRemediator,
  Identify: () => Identify,
  ReEnrollAuthenticator: () => ReEnrollAuthenticator,
  ReEnrollAuthenticatorWarning: () => ReEnrollAuthenticatorWarning,
  RedirectIdp: () => RedirectIdp,
  Remediator: () => Remediator,
  ResetAuthenticator: () => ResetAuthenticator,
  SelectAuthenticatorAuthenticate: () => SelectAuthenticatorAuthenticate,
  SelectAuthenticatorEnroll: () => SelectAuthenticatorEnroll,
  SelectAuthenticatorUnlockAccount: () => SelectAuthenticatorUnlockAccount,
  SelectEnrollProfile: () => SelectEnrollProfile,
  SelectEnrollmentChannel: () => SelectEnrollmentChannel,
  Skip: () => Skip
});

// node_modules/@okta/okta-auth-js/esm/browser/idx/factory/api.js
function createIdxAPI(sdk) {
  setRemediatorsCtx({
    remediators: remediators_exports,
    getFlowSpecification: getFlowSpecification2
  });
  const boundStartTransaction = startTransaction.bind(null, sdk);
  const idx = {
    interact: interact.bind(null, sdk),
    introspect: introspect.bind(null, sdk),
    makeIdxResponse: makeIdxState2.bind(null, sdk),
    authenticate: authenticate.bind(null, sdk),
    register: register.bind(null, sdk),
    start: boundStartTransaction,
    startTransaction: boundStartTransaction,
    poll: poll.bind(null, sdk),
    proceed: proceed.bind(null, sdk),
    cancel: cancel.bind(null, sdk),
    recoverPassword: recoverPassword.bind(null, sdk),
    handleInteractionCodeRedirect: handleInteractionCodeRedirect.bind(null, sdk),
    isInteractionRequired: isInteractionRequired.bind(null, sdk),
    isInteractionRequiredError,
    handleEmailVerifyCallback: handleEmailVerifyCallback.bind(null, sdk),
    isEmailVerifyCallback,
    parseEmailVerifyCallback,
    isEmailVerifyCallbackError,
    getSavedTransactionMeta: getSavedTransactionMeta.bind(null, sdk),
    createTransactionMeta: createTransactionMeta.bind(null, sdk),
    getTransactionMeta: getTransactionMeta.bind(null, sdk),
    saveTransactionMeta: saveTransactionMeta.bind(null, sdk),
    clearTransactionMeta: clearTransactionMeta.bind(null, sdk),
    isTransactionMetaValid,
    setFlow: (flow) => {
      sdk.options.flow = flow;
    },
    getFlow: () => {
      return sdk.options.flow;
    },
    canProceed: canProceed.bind(null, sdk),
    unlockAccount: unlockAccount.bind(null, sdk)
  };
  return idx;
}

// node_modules/@okta/okta-auth-js/esm/browser/features.js
var features_exports = {};
__export(features_exports, {
  getUserAgent: () => getUserAgent,
  hasTextEncoder: () => hasTextEncoder,
  isBrowser: () => isBrowser,
  isDPoPSupported: () => isDPoPSupported,
  isFingerprintSupported: () => isFingerprintSupported,
  isHTTPS: () => isHTTPS,
  isIE11OrLess: () => isIE11OrLess,
  isLocalhost: () => isLocalhost,
  isPKCESupported: () => isPKCESupported,
  isPopupPostMessageSupported: () => isPopupPostMessageSupported,
  isTokenVerifySupported: () => isTokenVerifySupported
});

// node_modules/@okta/okta-auth-js/esm/browser/crypto/browser.js
var a = function(str) {
  return atob(str);
};
var b = function(str) {
  return btoa(str);
};
var c = typeof crypto === "undefined" ? null : crypto;

// node_modules/@okta/okta-auth-js/esm/browser/features.js
var isWindowsPhone = /windows phone|iemobile|wpdesktop/i;
function isBrowser() {
  return typeof document !== "undefined" && typeof window !== "undefined";
}
function isIE11OrLess() {
  if (!isBrowser()) {
    return false;
  }
  const documentMode = document.documentMode;
  return !!documentMode && documentMode <= 11;
}
function getUserAgent() {
  return navigator.userAgent;
}
function isFingerprintSupported() {
  const agent = getUserAgent();
  return agent && !isWindowsPhone.test(agent);
}
function isPopupPostMessageSupported() {
  if (!isBrowser()) {
    return false;
  }
  const documentMode = document.documentMode;
  var isIE8or9 = documentMode && documentMode < 10;
  if (typeof window.postMessage !== "undefined" && !isIE8or9) {
    return true;
  }
  return false;
}
function isWebCryptoSubtleSupported() {
  return typeof c !== "undefined" && c !== null && typeof c.subtle !== "undefined" && typeof Uint8Array !== "undefined";
}
function isTokenVerifySupported() {
  return isWebCryptoSubtleSupported();
}
function hasTextEncoder() {
  return typeof TextEncoder !== "undefined";
}
function isPKCESupported() {
  return isTokenVerifySupported() && hasTextEncoder();
}
function isHTTPS() {
  if (!isBrowser()) {
    return false;
  }
  return window.location.protocol === "https:";
}
function isLocalhost() {
  return isBrowser() && window.location.hostname === "localhost";
}
function isDPoPSupported() {
  return !isIE11OrLess() && typeof window.indexedDB !== "undefined" && hasTextEncoder() && isWebCryptoSubtleSupported();
}

// node_modules/@okta/okta-auth-js/esm/browser/base/factory.js
var import_tiny_emitter6 = __toESM(require_tiny_emitter(), 1);
function createOktaAuthBase(OptionsConstructor2) {
  class OktaAuthBase {
    constructor(...args) {
      const options = new OptionsConstructor2(args.length ? args[0] || {} : {});
      this.options = removeNils(options);
      this.emitter = new import_tiny_emitter6.default();
      this.features = features_exports;
    }
  }
  OktaAuthBase.features = features_exports;
  OktaAuthBase.constants = constants_exports;
  OktaAuthBase.features = OktaAuthBase.prototype.features = features_exports;
  Object.assign(OktaAuthBase, {
    constants: constants_exports
  });
  return OktaAuthBase;
}

// node_modules/@okta/okta-auth-js/esm/browser/storage/mixin.js
function mixinStorage(Base, StorageManager2) {
  return class OktaAuthStorage extends Base {
    constructor(...args) {
      super(...args);
      const { storageManager, cookies, storageUtil: storageUtil2 } = this.options;
      this.storageManager = new StorageManager2(storageManager, cookies, storageUtil2);
    }
    clearStorage() {
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/http/OktaUserAgent.js
var OktaUserAgent = class {
  constructor() {
    this.environments = [`okta-auth-js/${"7.7.0"}`];
    this.maybeAddNodeEnvironment();
  }
  addEnvironment(env) {
    this.environments.push(env);
  }
  getHttpHeader() {
    return { "X-Okta-User-Agent-Extended": this.environments.join(" ") };
  }
  getVersion() {
    return "7.7.0";
  }
  maybeAddNodeEnvironment() {
    if (isBrowser() || !process || !process.versions) {
      return;
    }
    const { node: version } = process.versions;
    this.environments.push(`nodejs/${version}`);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/http/headers.js
function setRequestHeader(authClient, headerName, headerValue) {
  authClient.options.headers = authClient.options.headers || {};
  authClient.options.headers[headerName] = headerValue;
}

// node_modules/@okta/okta-auth-js/esm/browser/http/mixin.js
function mixinHttp(Base) {
  return class OktaAuthHttp extends Base {
    constructor(...args) {
      super(...args);
      this._oktaUserAgent = new OktaUserAgent();
      this.http = {
        setRequestHeader: setRequestHeader.bind(null, this)
      };
    }
    setHeaders(headers) {
      this.options.headers = Object.assign({}, this.options.headers, headers);
    }
    getIssuerOrigin() {
      return this.options.issuer.split("/oauth2/")[0];
    }
    webfinger(opts) {
      var url = "/.well-known/webfinger" + toQueryString(opts);
      var options = {
        headers: {
          "Accept": "application/jrd+json"
        }
      };
      return get(this, url, options);
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/crypto/index.js
var crypto_exports = {};
__export(crypto_exports, {
  atob: () => a,
  base64ToBase64Url: () => base64ToBase64Url,
  base64UrlDecode: () => base64UrlDecode,
  base64UrlToBase64: () => base64UrlToBase64,
  base64UrlToBuffer: () => base64UrlToBuffer,
  base64UrlToString: () => base64UrlToString,
  btoa: () => b,
  bufferToBase64Url: () => bufferToBase64Url,
  getOidcHash: () => getOidcHash,
  stringToBase64Url: () => stringToBase64Url,
  stringToBuffer: () => stringToBuffer,
  verifyToken: () => verifyToken,
  webcrypto: () => c
});

// node_modules/@okta/okta-auth-js/esm/browser/crypto/base64.js
function stringToBase64Url(str) {
  var b64 = b(str);
  return base64ToBase64Url(b64);
}
function base64ToBase64Url(b64) {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64UrlToBase64(b64u) {
  return b64u.replace(/-/g, "+").replace(/_/g, "/");
}
function base64UrlToString(b64u) {
  var b64 = base64UrlToBase64(b64u);
  switch (b64.length % 4) {
    case 0:
      break;
    case 2:
      b64 += "==";
      break;
    case 3:
      b64 += "=";
      break;
    default:
      throw new AuthSdkError("Not a valid Base64Url");
  }
  var utf8 = a(b64);
  try {
    return decodeURIComponent(escape(utf8));
  } catch (e) {
    return utf8;
  }
}
function stringToBuffer(str) {
  var buffer = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    buffer[i] = str.charCodeAt(i);
  }
  return buffer;
}
function base64UrlDecode(str) {
  return a(base64UrlToBase64(str));
}
function base64UrlToBuffer(b64u) {
  return Uint8Array.from(base64UrlDecode(b64u), (c2) => c2.charCodeAt(0));
}
function bufferToBase64Url(bin) {
  return b(new Uint8Array(bin).reduce((s, byte) => s + String.fromCharCode(byte), ""));
}

// node_modules/@okta/okta-auth-js/esm/browser/crypto/oidcHash.js
function getOidcHash(str) {
  var buffer = new TextEncoder().encode(str);
  return c.subtle.digest("SHA-256", buffer).then(function(arrayBuffer) {
    var intBuffer = new Uint8Array(arrayBuffer);
    var firstHalf = intBuffer.slice(0, 16);
    var hash = String.fromCharCode.apply(null, firstHalf);
    var b64u = stringToBase64Url(hash);
    return b64u;
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/crypto/verifyToken.js
function verifyToken(idToken, key) {
  key = clone(key);
  var format = "jwk";
  var algo = {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  };
  var extractable = true;
  var usages = ["verify"];
  delete key.use;
  return c.subtle.importKey(format, key, algo, extractable, usages).then(function(cryptoKey) {
    var jwt = idToken.split(".");
    var payload = stringToBuffer(jwt[0] + "." + jwt[1]);
    var b64Signature = base64UrlDecode(jwt[2]);
    var signature = stringToBuffer(b64Signature);
    return c.subtle.verify(algo, cryptoKey, signature, payload);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/util/PromiseQueue.js
var PromiseQueue = class {
  constructor(options = { quiet: false }) {
    this.queue = [];
    this.running = false;
    this.options = options;
  }
  push(method, thisObject, ...args) {
    return new Promise((resolve, reject) => {
      if (this.queue.length > 0) {
        if (this.options.quiet !== false) {
          warn("Async method is being called but another async method is already running. The new method will be delayed until the previous method completes.");
        }
      }
      this.queue.push({
        method,
        thisObject,
        args,
        resolve,
        reject
      });
      this.run();
    });
  }
  run() {
    if (this.running) {
      return;
    }
    if (this.queue.length === 0) {
      return;
    }
    this.running = true;
    var queueItem = this.queue.shift();
    var res = queueItem.method.apply(queueItem.thisObject, queueItem.args);
    if (isPromise(res)) {
      res.then(queueItem.resolve, queueItem.reject).finally(() => {
        this.running = false;
        this.run();
      });
    } else {
      queueItem.resolve(res);
      this.running = false;
      this.run();
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/mixin/index.js
var import_tiny_emitter19 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch18 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/pkce.js
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function getRandomString(length) {
  var a2 = new Uint8Array(Math.ceil(length / 2));
  c.getRandomValues(a2);
  var str = Array.from(a2, dec2hex).join("");
  return str.slice(0, length);
}
function generateVerifier(prefix) {
  var verifier = prefix || "";
  if (verifier.length < MIN_VERIFIER_LENGTH) {
    verifier = verifier + getRandomString(MIN_VERIFIER_LENGTH - verifier.length);
  }
  return encodeURIComponent(verifier).slice(0, MAX_VERIFIER_LENGTH);
}
function computeChallenge(str) {
  var buffer = new TextEncoder().encode(str);
  return c.subtle.digest("SHA-256", buffer).then(function(arrayBuffer) {
    var hash = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    var b64u = stringToBase64Url(hash);
    return b64u;
  });
}
var PKCE = {
  DEFAULT_CODE_CHALLENGE_METHOD,
  generateVerifier,
  computeChallenge
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/decodeToken.js
function decodeToken(token) {
  var jwt = token.split(".");
  var decodedToken;
  try {
    decodedToken = {
      header: JSON.parse(base64UrlToString(jwt[0])),
      payload: JSON.parse(base64UrlToString(jwt[1])),
      signature: jwt[2]
    };
  } catch (e) {
    throw new AuthSdkError("Malformed token");
  }
  return decodedToken;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/defaultTokenParams.js
function getDefaultTokenParams(sdk) {
  const { pkce, clientId, redirectUri, responseType, responseMode, scopes, acrValues, maxAge, state, ignoreSignature, dpop } = sdk.options;
  const defaultRedirectUri = isBrowser() ? window.location.href : void 0;
  return removeNils({
    pkce,
    clientId,
    redirectUri: redirectUri || defaultRedirectUri,
    responseType: responseType || ["token", "id_token"],
    responseMode,
    state: state || generateState(),
    nonce: generateNonce(),
    scopes: scopes || ["openid", "email"],
    acrValues,
    maxAge,
    ignoreSignature,
    dpop
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/exchangeCodeForTokens.js
var import_tiny_emitter10 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch9 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/endpoints/token.js
var import_tiny_emitter7 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch6 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/dpop.js
var INDEXEDDB_NAME = "OktaAuthJs";
var DB_KEY = "DPoPKeys";
function isDPoPNonceError(obj) {
  return (isOAuthError(obj) || isWWWAuthError(obj)) && obj.errorCode === "use_dpop_nonce";
}
function createJwt(header, claims, signingKey) {
  return __async(this, null, function* () {
    const head = stringToBase64Url(JSON.stringify(header));
    const body = stringToBase64Url(JSON.stringify(claims));
    const signature = yield c.subtle.sign({ name: signingKey.algorithm.name }, signingKey, stringToBuffer(`${head}.${body}`));
    return `${head}.${body}.${base64ToBase64Url(bufferToBase64Url(signature))}`;
  });
}
function cryptoRandomValue(byteLen = 32) {
  return [...c.getRandomValues(new Uint8Array(byteLen))].map((v) => v.toString(16)).join("");
}
function generateKeyPair() {
  return __async(this, null, function* () {
    const algorithm = {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1])
    };
    return c.subtle.generateKey(algorithm, false, ["sign", "verify"]);
  });
}
function hashAccessToken(accessToken) {
  return __async(this, null, function* () {
    const buffer = new TextEncoder().encode(accessToken);
    const hash = yield c.subtle.digest("SHA-256", buffer);
    return b(String.fromCharCode.apply(null, new Uint8Array(hash))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  });
}
function keyStore() {
  return new Promise((resolve, reject) => {
    try {
      const indexedDB2 = window.indexedDB;
      const req = indexedDB2.open(INDEXEDDB_NAME, 1);
      req.onerror = function() {
        reject(req.error);
      };
      req.onupgradeneeded = function() {
        const db = req.result;
        db.createObjectStore(DB_KEY);
      };
      req.onsuccess = function() {
        const db = req.result;
        const tx = db.transaction(DB_KEY, "readwrite");
        tx.onerror = function() {
          reject(tx.error);
        };
        const store = tx.objectStore(DB_KEY);
        resolve(store);
        tx.oncomplete = function() {
          db.close();
        };
      };
    } catch (err) {
      reject(err);
    }
  });
}
function invokeStoreMethod(method, ...args) {
  return __async(this, null, function* () {
    const store = yield keyStore();
    return new Promise((resolve, reject) => {
      const req = store[method](...args);
      req.onsuccess = function() {
        resolve(req);
      };
      req.onerror = function() {
        reject(req.error);
      };
    });
  });
}
function storeKeyPair(pairId, keyPair) {
  return __async(this, null, function* () {
    yield invokeStoreMethod("add", keyPair, pairId);
    return keyPair;
  });
}
function findKeyPair(pairId) {
  return __async(this, null, function* () {
    if (pairId) {
      const req = yield invokeStoreMethod("get", pairId);
      if (req.result) {
        return req.result;
      }
    }
    throw new AuthSdkError(`Unable to locate dpop key pair required for refresh${pairId ? ` (${pairId})` : ""}`);
  });
}
function clearDPoPKeyPair(pairId) {
  return __async(this, null, function* () {
    yield invokeStoreMethod("delete", pairId);
  });
}
function clearAllDPoPKeyPairs() {
  return __async(this, null, function* () {
    yield invokeStoreMethod("clear");
  });
}
function createDPoPKeyPair() {
  return __async(this, null, function* () {
    const keyPairId = cryptoRandomValue(4);
    const keyPair = yield generateKeyPair();
    yield storeKeyPair(keyPairId, keyPair);
    return { keyPair, keyPairId };
  });
}
function clearDPoPKeyPairAfterRevoke(revokedToken, tokens) {
  return __async(this, null, function* () {
    var _a;
    let shouldClear = false;
    const { accessToken, refreshToken } = tokens;
    if (revokedToken === "access" && accessToken && accessToken.tokenType === "DPoP" && !refreshToken) {
      shouldClear = true;
    }
    if (revokedToken === "refresh" && refreshToken && !accessToken) {
      shouldClear = true;
    }
    const pairId = (_a = accessToken === null || accessToken === void 0 ? void 0 : accessToken.dpopPairId) !== null && _a !== void 0 ? _a : refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.dpopPairId;
    if (shouldClear && pairId) {
      yield clearDPoPKeyPair(pairId);
    }
  });
}
function generateDPoPProof(_0) {
  return __async(this, arguments, function* ({ keyPair, url, method, nonce, accessToken }) {
    const { kty, crv, e, n, x, y } = yield c.subtle.exportKey("jwk", keyPair.publicKey);
    const header = {
      alg: "RS256",
      typ: "dpop+jwt",
      jwk: { kty, crv, e, n, x, y }
    };
    const claims = {
      htm: method,
      htu: url,
      iat: Math.floor(Date.now() / 1e3),
      jti: cryptoRandomValue()
    };
    if (nonce) {
      claims.nonce = nonce;
    }
    if (accessToken) {
      claims.ath = yield hashAccessToken(accessToken);
    }
    return createJwt(header, claims, keyPair.privateKey);
  });
}
function generateDPoPForTokenRequest(_0) {
  return __async(this, arguments, function* ({ keyPair, url, method, nonce }) {
    const params = { keyPair, url, method };
    if (nonce) {
      params.nonce = nonce;
    }
    return generateDPoPProof(params);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/endpoints/token.js
function validateOptions(options) {
  if (!options.clientId) {
    throw new AuthSdkError("A clientId must be specified in the OktaAuth constructor to get a token");
  }
  if (!options.redirectUri) {
    throw new AuthSdkError("The redirectUri passed to /authorize must also be passed to /token");
  }
  if (!options.authorizationCode && !options.interactionCode) {
    throw new AuthSdkError("An authorization code (returned from /authorize) must be passed to /token");
  }
  if (!options.codeVerifier) {
    throw new AuthSdkError('The "codeVerifier" (generated and saved by your app) must be passed to /token');
  }
}
function getPostData(sdk, options) {
  var params = removeNils({
    "client_id": options.clientId,
    "redirect_uri": options.redirectUri,
    "grant_type": options.interactionCode ? "interaction_code" : "authorization_code",
    "code_verifier": options.codeVerifier
  });
  if (options.interactionCode) {
    params["interaction_code"] = options.interactionCode;
  } else if (options.authorizationCode) {
    params.code = options.authorizationCode;
  }
  const { clientSecret } = sdk.options;
  if (clientSecret) {
    params["client_secret"] = clientSecret;
  }
  return toQueryString(params).slice(1);
}
function makeTokenRequest(_0, _1) {
  return __async(this, arguments, function* (sdk, { url, data, nonce, dpopKeyPair }) {
    var _a, _b;
    const method = "POST";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    if (sdk.options.dpop) {
      if (!dpopKeyPair) {
        throw new AuthSdkError("DPoP is configured but no key pair was provided");
      }
      const proof = yield generateDPoPForTokenRequest({ url, method, nonce, keyPair: dpopKeyPair });
      headers.DPoP = proof;
    }
    try {
      const resp = yield httpRequest(sdk, {
        url,
        method,
        args: data,
        headers
      });
      return resp;
    } catch (err) {
      if (isDPoPNonceError(err) && !nonce) {
        const dpopNonce = (_a = err.resp) === null || _a === void 0 ? void 0 : _a.headers["dpop-nonce"];
        if (!dpopNonce) {
          throw new AuthApiError(
            { errorSummary: "No `dpop-nonce` header found when required" },
            (_b = err.resp) !== null && _b !== void 0 ? _b : void 0
          );
        }
        return makeTokenRequest(sdk, { url, data, dpopKeyPair, nonce: dpopNonce });
      }
      throw err;
    }
  });
}
function postToTokenEndpoint(sdk, options, urls) {
  return __async(this, null, function* () {
    validateOptions(options);
    var data = getPostData(sdk, options);
    const params = {
      url: urls.tokenUrl,
      data,
      dpopKeyPair: options === null || options === void 0 ? void 0 : options.dpopKeyPair
    };
    return makeTokenRequest(sdk, params);
  });
}
function postRefreshToken(sdk, options, refreshToken) {
  return __async(this, null, function* () {
    const data = Object.entries({
      client_id: options.clientId,
      grant_type: "refresh_token",
      scope: refreshToken.scopes.join(" "),
      refresh_token: refreshToken.refreshToken
    }).map(function([name, value]) {
      return name + "=" + encodeURIComponent(value);
    }).join("&");
    const params = {
      url: refreshToken.tokenUrl,
      data,
      dpopKeyPair: options === null || options === void 0 ? void 0 : options.dpopKeyPair
    };
    return makeTokenRequest(sdk, params);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/endpoints/well-known.js
var import_tiny_emitter8 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch7 = __toESM(require_browser_ponyfill(), 1);
function getWellKnown(sdk, issuer) {
  var authServerUri = issuer || sdk.options.issuer;
  return get(sdk, authServerUri + "/.well-known/openid-configuration", {
    cacheResponse: true
  });
}
function getKey(sdk, issuer, kid) {
  var httpCache = sdk.storageManager.getHttpCache(sdk.options.cookies);
  return getWellKnown(sdk, issuer).then(function(wellKnown) {
    var jwksUri = wellKnown["jwks_uri"];
    var cacheContents = httpCache.getStorage();
    var cachedResponse = cacheContents[jwksUri];
    if (cachedResponse && Date.now() / 1e3 < cachedResponse.expiresAt) {
      var cachedKey = find(cachedResponse.response.keys, {
        kid
      });
      if (cachedKey) {
        return cachedKey;
      }
    }
    httpCache.clearStorage(jwksUri);
    return get(sdk, jwksUri, {
      cacheResponse: true
    }).then(function(res) {
      var key = find(res.keys, {
        kid
      });
      if (key) {
        return key;
      }
      throw new AuthSdkError("The key id, " + kid + ", was not found in the server's keys");
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/validateClaims.js
function validateClaims(sdk, claims, validationParams) {
  const aud = validationParams.clientId;
  const iss = validationParams.issuer;
  const nonce = validationParams.nonce;
  const acr = validationParams.acrValues;
  if (!claims || !iss || !aud) {
    throw new AuthSdkError("The jwt, iss, and aud arguments are all required");
  }
  if (nonce && claims.nonce !== nonce) {
    throw new AuthSdkError("OAuth flow response nonce doesn't match request nonce");
  }
  const now2 = Math.floor(Date.now() / 1e3);
  if (claims.iss !== iss) {
    throw new AuthSdkError("The issuer [" + claims.iss + "] does not match [" + iss + "]");
  }
  if (Array.isArray(claims.aud) && claims.aud.indexOf(aud) < 0 || !Array.isArray(claims.aud) && claims.aud !== aud) {
    throw new AuthSdkError("The audience [" + claims.aud + "] does not match [" + aud + "]");
  }
  if (acr && claims.acr !== acr) {
    throw new AuthSdkError("The acr [" + claims.acr + "] does not match acr_values [" + acr + "]");
  }
  if (claims.iat > claims.exp) {
    throw new AuthSdkError("The JWT expired before it was issued");
  }
  if (!sdk.options.ignoreLifetime) {
    if (now2 - sdk.options.maxClockSkew > claims.exp) {
      throw new AuthSdkError("The JWT expired and is no longer valid");
    }
    if (claims.iat > now2 + sdk.options.maxClockSkew) {
      throw new AuthSdkError("The JWT was issued in the future");
    }
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/verifyToken.js
function verifyToken2(sdk, token, validationParams) {
  return __async(this, null, function* () {
    if (!token || !token.idToken) {
      throw new AuthSdkError("Only idTokens may be verified");
    }
    const jwt = decodeToken(token.idToken);
    const configuredIssuer = (validationParams === null || validationParams === void 0 ? void 0 : validationParams.issuer) || sdk.options.issuer;
    const { issuer } = yield getWellKnown(sdk, configuredIssuer);
    const validationOptions = Object.assign({
      clientId: sdk.options.clientId,
      ignoreSignature: sdk.options.ignoreSignature
    }, validationParams, {
      issuer
    });
    validateClaims(sdk, jwt.payload, validationOptions);
    if (validationOptions.ignoreSignature == true || !sdk.features.isTokenVerifySupported()) {
      return token;
    }
    const key = yield getKey(sdk, token.issuer, jwt.header.kid);
    const valid = yield verifyToken(token.idToken, key);
    if (!valid) {
      throw new AuthSdkError("The token signature is not valid");
    }
    if (validationParams && validationParams.accessToken && token.claims.at_hash) {
      const hash = yield getOidcHash(validationParams.accessToken);
      if (hash !== token.claims.at_hash) {
        throw new AuthSdkError("Token hash verification failed");
      }
    }
    return token;
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/handleOAuthResponse.js
var import_tiny_emitter9 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch8 = __toESM(require_browser_ponyfill(), 1);
function validateResponse(res, oauthParams) {
  if (res["error"] && res["error_description"]) {
    throw new OAuthError(res["error"], res["error_description"]);
  }
  if (res.state !== oauthParams.state) {
    throw new AuthSdkError("OAuth flow response state doesn't match request state");
  }
  if (oauthParams.dpop && res.token_type !== "DPoP") {
    throw new AuthSdkError('Unable to parse OAuth flow response: DPoP was configured but "token_type" was not DPoP');
  }
}
function handleOAuthResponse(sdk, tokenParams, res, urls) {
  return __async(this, null, function* () {
    const pkce = sdk.options.pkce !== false;
    if (pkce && (res.code || res.interaction_code)) {
      return sdk.token.exchangeCodeForTokens(Object.assign({}, tokenParams, {
        authorizationCode: res.code,
        interactionCode: res.interaction_code
      }), urls);
    }
    tokenParams = tokenParams || getDefaultTokenParams(sdk);
    urls = urls || getOAuthUrls(sdk, tokenParams);
    let responseType = tokenParams.responseType || [];
    if (!Array.isArray(responseType) && responseType !== "none") {
      responseType = [responseType];
    }
    let scopes;
    if (res.scope) {
      scopes = res.scope.split(" ");
    } else {
      scopes = clone(tokenParams.scopes);
    }
    const clientId = tokenParams.clientId || sdk.options.clientId;
    validateResponse(res, tokenParams);
    const tokenDict = {};
    const expiresIn = res.expires_in;
    const tokenType = res.token_type;
    const accessToken = res.access_token;
    const idToken = res.id_token;
    const refreshToken = res.refresh_token;
    const now2 = Math.floor(Date.now() / 1e3);
    if (accessToken) {
      const accessJwt = sdk.token.decode(accessToken);
      tokenDict.accessToken = {
        accessToken,
        claims: accessJwt.payload,
        expiresAt: Number(expiresIn) + now2,
        tokenType,
        scopes,
        authorizeUrl: urls.authorizeUrl,
        userinfoUrl: urls.userinfoUrl
      };
      if (tokenParams.dpopPairId) {
        tokenDict.accessToken.dpopPairId = tokenParams.dpopPairId;
      }
    }
    if (refreshToken) {
      tokenDict.refreshToken = {
        refreshToken,
        expiresAt: Number(expiresIn) + now2,
        scopes,
        tokenUrl: urls.tokenUrl,
        authorizeUrl: urls.authorizeUrl,
        issuer: urls.issuer
      };
      if (tokenParams.dpopPairId) {
        tokenDict.refreshToken.dpopPairId = tokenParams.dpopPairId;
      }
    }
    if (idToken) {
      const idJwt = sdk.token.decode(idToken);
      const idTokenObj = {
        idToken,
        claims: idJwt.payload,
        expiresAt: idJwt.payload.exp - idJwt.payload.iat + now2,
        scopes,
        authorizeUrl: urls.authorizeUrl,
        issuer: urls.issuer,
        clientId
      };
      const validationParams = {
        clientId,
        issuer: urls.issuer,
        nonce: tokenParams.nonce,
        accessToken,
        acrValues: tokenParams.acrValues
      };
      if (tokenParams.ignoreSignature !== void 0) {
        validationParams.ignoreSignature = tokenParams.ignoreSignature;
      }
      yield verifyToken2(sdk, idTokenObj, validationParams);
      tokenDict.idToken = idTokenObj;
    }
    if (responseType.indexOf("token") !== -1 && !tokenDict.accessToken) {
      throw new AuthSdkError('Unable to parse OAuth flow response: response type "token" was requested but "access_token" was not returned.');
    }
    if (responseType.indexOf("id_token") !== -1 && !tokenDict.idToken) {
      throw new AuthSdkError('Unable to parse OAuth flow response: response type "id_token" was requested but "id_token" was not returned.');
    }
    return {
      tokens: tokenDict,
      state: res.state,
      code: res.code,
      responseType
    };
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/exchangeCodeForTokens.js
function exchangeCodeForTokens(sdk, tokenParams, urls) {
  return __async(this, null, function* () {
    urls = urls || getOAuthUrls(sdk, tokenParams);
    tokenParams = Object.assign({}, getDefaultTokenParams(sdk), clone(tokenParams));
    const { authorizationCode, interactionCode, codeVerifier, clientId, redirectUri, scopes, ignoreSignature, state, acrValues, dpop, dpopPairId } = tokenParams;
    const getTokenOptions = {
      clientId,
      redirectUri,
      authorizationCode,
      interactionCode,
      codeVerifier,
      dpop
    };
    const responseType = ["token"];
    if (scopes.indexOf("openid") !== -1) {
      responseType.push("id_token");
    }
    const handleResponseOptions = {
      clientId,
      redirectUri,
      scopes,
      responseType,
      ignoreSignature,
      acrValues
    };
    try {
      if (dpop) {
        if (dpopPairId) {
          const keyPair = yield findKeyPair(dpopPairId);
          getTokenOptions.dpopKeyPair = keyPair;
          handleResponseOptions.dpop = dpop;
          handleResponseOptions.dpopPairId = dpopPairId;
        } else {
          const { keyPair, keyPairId } = yield createDPoPKeyPair();
          getTokenOptions.dpopKeyPair = keyPair;
          handleResponseOptions.dpop = dpop;
          handleResponseOptions.dpopPairId = keyPairId;
        }
      }
      const oauthResponse = yield postToTokenEndpoint(sdk, getTokenOptions, urls);
      const tokenResponse = yield handleOAuthResponse(sdk, handleResponseOptions, oauthResponse, urls);
      tokenResponse.code = authorizationCode;
      tokenResponse.state = state;
      return tokenResponse;
    } finally {
      sdk.transactionManager.clear();
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/getUserInfo.js
var import_tiny_emitter11 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch10 = __toESM(require_browser_ponyfill(), 1);
function getUserInfo(sdk, accessTokenObject, idTokenObject) {
  return __async(this, null, function* () {
    if (!accessTokenObject) {
      accessTokenObject = (yield sdk.tokenManager.getTokens()).accessToken;
    }
    if (!idTokenObject) {
      idTokenObject = (yield sdk.tokenManager.getTokens()).idToken;
    }
    if (!accessTokenObject || !isAccessToken(accessTokenObject)) {
      return Promise.reject(new AuthSdkError("getUserInfo requires an access token object"));
    }
    if (!idTokenObject || !isIDToken(idTokenObject)) {
      return Promise.reject(new AuthSdkError("getUserInfo requires an ID token object"));
    }
    const options = {
      url: accessTokenObject.userinfoUrl,
      method: "GET",
      accessToken: accessTokenObject.accessToken
    };
    if (sdk.options.dpop) {
      const headers = yield sdk.getDPoPAuthorizationHeaders(Object.assign(Object.assign({}, options), { accessToken: accessTokenObject }));
      options.headers = headers;
      delete options.accessToken;
    }
    return httpRequest(sdk, options).then((userInfo) => {
      if (userInfo.sub === idTokenObject.claims.sub) {
        return userInfo;
      }
      return Promise.reject(new AuthSdkError("getUserInfo request was rejected due to token mismatch"));
    }).catch(function(err) {
      var _a;
      if (err instanceof WWWAuthError && !sdk.options.dpop) {
        const { error, errorDescription } = err;
        throw new OAuthError(error, errorDescription);
      }
      if (!sdk.options.dpop) {
        let e = err;
        if (err instanceof AuthApiError && ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.wwwAuthHeader)) {
          e = WWWAuthError.parseHeader(err.meta.wwwAuthHeader);
        }
        if (e instanceof WWWAuthError) {
          const { error, errorDescription } = e;
          throw new OAuthError(error, errorDescription);
        }
      }
      throw err;
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/browser.js
function addListener(eventTarget, name, fn) {
  if (eventTarget.addEventListener) {
    eventTarget.addEventListener(name, fn);
  } else {
    eventTarget.attachEvent("on" + name, fn);
  }
}
function removeListener(eventTarget, name, fn) {
  if (eventTarget.removeEventListener) {
    eventTarget.removeEventListener(name, fn);
  } else {
    eventTarget.detachEvent("on" + name, fn);
  }
}
function loadFrame(src) {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = src;
  return document.body.appendChild(iframe);
}
function loadPopup(src, options) {
  var title = options.popupTitle || "External Identity Provider User Authentication";
  var appearance = "toolbar=no, scrollbars=yes, resizable=yes, top=100, left=500, width=600, height=600";
  return window.open(src, title, appearance);
}
function addPostMessageListener(sdk, timeout, state) {
  var responseHandler;
  var timeoutId;
  var msgReceivedOrTimeout = new Promise(function(resolve, reject) {
    responseHandler = function responseHandler2(e) {
      if (!e.data || e.data.state !== state) {
        return;
      }
      if (e.origin !== sdk.getIssuerOrigin()) {
        return reject(new AuthSdkError("The request does not match client configuration"));
      }
      resolve(e.data);
    };
    addListener(window, "message", responseHandler);
    timeoutId = setTimeout(function() {
      reject(new AuthSdkError("OAuth flow timed out"));
    }, timeout || 12e4);
  });
  return msgReceivedOrTimeout.finally(function() {
    clearTimeout(timeoutId);
    removeListener(window, "message", responseHandler);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/prepareTokenParams.js
function assertPKCESupport(sdk) {
  if (!sdk.features.isPKCESupported()) {
    var errorMessage = "PKCE requires a modern browser with encryption support running in a secure context.";
    if (!sdk.features.isHTTPS()) {
      errorMessage += "\nThe current page is not being served with HTTPS protocol. PKCE requires secure HTTPS protocol.";
    }
    if (!sdk.features.hasTextEncoder()) {
      errorMessage += '\n"TextEncoder" is not defined. To use PKCE, you may need to include a polyfill/shim for this browser.';
    }
    throw new AuthSdkError(errorMessage);
  }
}
function validateCodeChallengeMethod(sdk, codeChallengeMethod) {
  return __async(this, null, function* () {
    codeChallengeMethod = codeChallengeMethod || sdk.options.codeChallengeMethod || DEFAULT_CODE_CHALLENGE_METHOD;
    const wellKnownResponse = yield getWellKnown(sdk);
    var methods = wellKnownResponse["code_challenge_methods_supported"] || [];
    if (methods.indexOf(codeChallengeMethod) === -1) {
      throw new AuthSdkError("Invalid code_challenge_method");
    }
    return codeChallengeMethod;
  });
}
function preparePKCE(sdk, tokenParams) {
  return __async(this, null, function* () {
    let { codeVerifier, codeChallenge, codeChallengeMethod } = tokenParams;
    codeChallenge = codeChallenge || sdk.options.codeChallenge;
    if (!codeChallenge) {
      assertPKCESupport(sdk);
      codeVerifier = codeVerifier || PKCE.generateVerifier();
      codeChallenge = yield PKCE.computeChallenge(codeVerifier);
    }
    codeChallengeMethod = yield validateCodeChallengeMethod(sdk, codeChallengeMethod);
    tokenParams = Object.assign(Object.assign({}, tokenParams), {
      responseType: "code",
      codeVerifier,
      codeChallenge,
      codeChallengeMethod
    });
    return tokenParams;
  });
}
function prepareTokenParams(_0) {
  return __async(this, arguments, function* (sdk, tokenParams = {}) {
    const defaults = getDefaultTokenParams(sdk);
    tokenParams = Object.assign(Object.assign({}, defaults), tokenParams);
    if (tokenParams.dpop && !sdk.features.isDPoPSupported()) {
      throw new AuthSdkError("DPoP has been configured, but is not supported by browser");
    }
    if (tokenParams.pkce === false) {
      return tokenParams;
    }
    return preparePKCE(sdk, tokenParams);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/endpoints/authorize.js
function convertTokenParamsToOAuthParams(tokenParams) {
  if (!tokenParams.clientId) {
    throw new AuthSdkError("A clientId must be specified in the OktaAuth constructor to get a token");
  }
  if (isString(tokenParams.responseType) && tokenParams.responseType.indexOf(" ") !== -1) {
    throw new AuthSdkError("Multiple OAuth responseTypes must be defined as an array");
  }
  var oauthParams = {
    "client_id": tokenParams.clientId,
    "code_challenge": tokenParams.codeChallenge,
    "code_challenge_method": tokenParams.codeChallengeMethod,
    "display": tokenParams.display,
    "idp": tokenParams.idp,
    "idp_scope": tokenParams.idpScope,
    "login_hint": tokenParams.loginHint,
    "max_age": tokenParams.maxAge,
    "nonce": tokenParams.nonce,
    "prompt": tokenParams.prompt,
    "redirect_uri": tokenParams.redirectUri,
    "response_mode": tokenParams.responseMode,
    "response_type": tokenParams.responseType,
    "sessionToken": tokenParams.sessionToken,
    "state": tokenParams.state,
    "acr_values": tokenParams.acrValues,
    "enroll_amr_values": tokenParams.enrollAmrValues
  };
  oauthParams = removeNils(oauthParams);
  ["idp_scope", "response_type", "enroll_amr_values"].forEach(function(mayBeArray) {
    if (Array.isArray(oauthParams[mayBeArray])) {
      oauthParams[mayBeArray] = oauthParams[mayBeArray].join(" ");
    }
  });
  if (tokenParams.responseType.indexOf("id_token") !== -1 && tokenParams.scopes.indexOf("openid") === -1) {
    throw new AuthSdkError("openid scope must be specified in the scopes argument when requesting an id_token");
  } else if (tokenParams.scopes) {
    oauthParams.scope = tokenParams.scopes.join(" ");
  }
  return oauthParams;
}
function buildAuthorizeParams(tokenParams) {
  var oauthQueryParams = convertTokenParamsToOAuthParams(tokenParams);
  return toQueryString(Object.assign(Object.assign({}, oauthQueryParams), tokenParams.extraParams && Object.assign({}, tokenParams.extraParams)));
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/getToken.js
function getToken(sdk, options) {
  if (arguments.length > 2) {
    return Promise.reject(new AuthSdkError('As of version 3.0, "getToken" takes only a single set of options'));
  }
  options = options || {};
  const popupWindow = options.popupWindow;
  options.popupWindow = void 0;
  return prepareTokenParams(sdk, options).then(function(tokenParams) {
    var sessionTokenOverrides = {
      prompt: "none",
      responseMode: "okta_post_message",
      display: null
    };
    var idpOverrides = {
      display: "popup"
    };
    if (options.sessionToken) {
      Object.assign(tokenParams, sessionTokenOverrides);
    } else if (options.idp) {
      Object.assign(tokenParams, idpOverrides);
    }
    var requestUrl, endpoint, urls;
    urls = getOAuthUrls(sdk, tokenParams);
    endpoint = options.codeVerifier ? urls.tokenUrl : urls.authorizeUrl;
    requestUrl = endpoint + buildAuthorizeParams(tokenParams);
    var flowType;
    if (tokenParams.sessionToken || tokenParams.display === null) {
      flowType = "IFRAME";
    } else if (tokenParams.display === "popup") {
      flowType = "POPUP";
    } else {
      flowType = "IMPLICIT";
    }
    switch (flowType) {
      case "IFRAME":
        var iframePromise = addPostMessageListener(sdk, options.timeout, tokenParams.state);
        var iframeEl = loadFrame(requestUrl);
        return iframePromise.then(function(res) {
          return handleOAuthResponse(sdk, tokenParams, res, urls);
        }).finally(function() {
          var _a;
          if (document.body.contains(iframeEl)) {
            (_a = iframeEl.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(iframeEl);
          }
        });
      case "POPUP":
        var oauthPromise;
        if (tokenParams.responseMode === "okta_post_message") {
          if (!sdk.features.isPopupPostMessageSupported()) {
            throw new AuthSdkError("This browser doesn't have full postMessage support");
          }
          oauthPromise = addPostMessageListener(sdk, options.timeout, tokenParams.state);
        }
        if (popupWindow) {
          popupWindow.location.assign(requestUrl);
        }
        var popupPromise = new Promise(function(resolve, reject) {
          var closePoller = setInterval(function() {
            if (!popupWindow || popupWindow.closed) {
              clearInterval(closePoller);
              reject(new AuthSdkError("Unable to parse OAuth flow response"));
            }
          }, 100);
          oauthPromise.then(function(res) {
            clearInterval(closePoller);
            resolve(res);
          }).catch(function(err) {
            clearInterval(closePoller);
            reject(err);
          });
        });
        return popupPromise.then(function(res) {
          return handleOAuthResponse(sdk, tokenParams, res, urls);
        }).finally(function() {
          if (popupWindow && !popupWindow.closed) {
            popupWindow.close();
          }
        });
      default:
        throw new AuthSdkError("The full page redirect flow is not supported");
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/getWithoutPrompt.js
function getWithoutPrompt(sdk, options) {
  if (arguments.length > 2) {
    return Promise.reject(new AuthSdkError('As of version 3.0, "getWithoutPrompt" takes only a single set of options'));
  }
  options = clone(options) || {};
  Object.assign(options, {
    prompt: "none",
    responseMode: "okta_post_message",
    display: null
  });
  return getToken(sdk, options);
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/getWithPopup.js
var import_tiny_emitter12 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch11 = __toESM(require_browser_ponyfill(), 1);
function getWithPopup(sdk, options) {
  if (arguments.length > 2) {
    return Promise.reject(new AuthSdkError('As of version 3.0, "getWithPopup" takes only a single set of options'));
  }
  const popupWindow = loadPopup("/", options);
  options = clone(options) || {};
  Object.assign(options, {
    display: "popup",
    responseMode: "okta_post_message",
    popupWindow
  });
  return getToken(sdk, options);
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/getWithRedirect.js
function getWithRedirect(_0, _1) {
  return __async(this, arguments, function* (sdk, options) {
    if (arguments.length > 2) {
      return Promise.reject(new AuthSdkError('As of version 3.0, "getWithRedirect" takes only a single set of options'));
    }
    options = clone(options) || {};
    const tokenParams = yield prepareTokenParams(sdk, options);
    const meta = createOAuthMeta(sdk, tokenParams);
    const requestUrl = meta.urls.authorizeUrl + buildAuthorizeParams(tokenParams);
    sdk.transactionManager.save(meta);
    if (sdk.options.setLocation) {
      sdk.options.setLocation(requestUrl);
    } else {
      window.location.assign(requestUrl);
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/parseFromUrl.js
var import_tiny_emitter13 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch12 = __toESM(require_browser_ponyfill(), 1);
function removeHash(sdk) {
  var nativeHistory = sdk.token.parseFromUrl._getHistory();
  var nativeDoc = sdk.token.parseFromUrl._getDocument();
  var nativeLoc = sdk.token.parseFromUrl._getLocation();
  if (nativeHistory && nativeHistory.replaceState) {
    nativeHistory.replaceState(null, nativeDoc.title, nativeLoc.pathname + nativeLoc.search);
  } else {
    nativeLoc.hash = "";
  }
}
function removeSearch(sdk) {
  var nativeHistory = sdk.token.parseFromUrl._getHistory();
  var nativeDoc = sdk.token.parseFromUrl._getDocument();
  var nativeLoc = sdk.token.parseFromUrl._getLocation();
  if (nativeHistory && nativeHistory.replaceState) {
    nativeHistory.replaceState(null, nativeDoc.title, nativeLoc.pathname + nativeLoc.hash);
  } else {
    nativeLoc.search = "";
  }
}
function getResponseMode(sdk) {
  var defaultResponseMode = sdk.options.pkce ? "query" : "fragment";
  var responseMode = sdk.options.responseMode || defaultResponseMode;
  return responseMode;
}
function parseOAuthResponseFromUrl(sdk, options) {
  options = options || {};
  if (isString(options)) {
    options = { url: options };
  } else {
    options = options;
  }
  var url = options.url;
  var responseMode = options.responseMode || getResponseMode(sdk);
  var nativeLoc = sdk.token.parseFromUrl._getLocation();
  var paramStr;
  if (responseMode === "query") {
    paramStr = url ? url.substring(url.indexOf("?")) : nativeLoc.search;
  } else {
    paramStr = url ? url.substring(url.indexOf("#")) : nativeLoc.hash;
  }
  if (!paramStr) {
    throw new AuthSdkError("Unable to parse a token from the url");
  }
  return urlParamsToObject(paramStr);
}
function cleanOAuthResponseFromUrl(sdk, options) {
  const responseMode = options.responseMode || getResponseMode(sdk);
  responseMode === "query" ? removeSearch(sdk) : removeHash(sdk);
}
function parseFromUrl(sdk, options) {
  return __async(this, null, function* () {
    options = options || {};
    if (isString(options)) {
      options = { url: options };
    } else {
      options = options;
    }
    const res = parseOAuthResponseFromUrl(sdk, options);
    const state = res.state;
    const oauthParams = sdk.transactionManager.load({
      state
    });
    if (!oauthParams) {
      if (sdk.options.pkce) {
        throw new AuthSdkError("Could not load PKCE codeVerifier from storage. This may indicate the auth flow has already completed or multiple auth flows are executing concurrently.", void 0);
      }
      throw new AuthSdkError("Unable to retrieve OAuth redirect params from storage");
    }
    const urls = oauthParams.urls;
    delete oauthParams.urls;
    if (!options.url) {
      cleanOAuthResponseFromUrl(sdk, options);
    }
    return handleOAuthResponse(sdk, oauthParams, res, urls).catch((err) => {
      if (!isInteractionRequiredError(err)) {
        sdk.transactionManager.clear({
          state
        });
      }
      throw err;
    }).then((res2) => {
      sdk.transactionManager.clear({
        state
      });
      return res2;
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/refreshToken.js
function isSameRefreshToken(a2, b2) {
  return a2.refreshToken === b2.refreshToken;
}
function isRefreshTokenError(err) {
  if (!isAuthApiError(err)) {
    return false;
  }
  if (!err.xhr || !err.xhr.responseJSON) {
    return false;
  }
  const { responseJSON } = err.xhr;
  if (responseJSON.error === "invalid_grant") {
    return true;
  }
  return false;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/renewTokensWithRefresh.js
function renewTokensWithRefresh(sdk, tokenParams, refreshTokenObject) {
  return __async(this, null, function* () {
    const { clientId, dpop } = sdk.options;
    if (!clientId) {
      throw new AuthSdkError("A clientId must be specified in the OktaAuth constructor to renew tokens");
    }
    try {
      const renewTokenParams = Object.assign({}, tokenParams, { clientId });
      const endpointParams = Object.assign({}, renewTokenParams);
      if (dpop) {
        const keyPair = yield findKeyPair(refreshTokenObject === null || refreshTokenObject === void 0 ? void 0 : refreshTokenObject.dpopPairId);
        endpointParams.dpopKeyPair = keyPair;
        renewTokenParams.dpop = dpop;
        renewTokenParams.dpopPairId = refreshTokenObject.dpopPairId;
      }
      const tokenResponse = yield postRefreshToken(sdk, endpointParams, refreshTokenObject);
      const urls = getOAuthUrls(sdk, tokenParams);
      const { tokens } = yield handleOAuthResponse(sdk, renewTokenParams, tokenResponse, urls);
      const { refreshToken } = tokens;
      if (refreshToken && !isSameRefreshToken(refreshToken, refreshTokenObject)) {
        sdk.tokenManager.updateRefreshToken(refreshToken);
      }
      return tokens;
    } catch (err) {
      if (isRefreshTokenInvalidError(err)) {
        sdk.tokenManager.removeRefreshToken();
      }
      throw err;
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/renewToken.js
function throwInvalidTokenError() {
  throw new AuthSdkError("Renew must be passed a token with an array of scopes and an accessToken or idToken");
}
function getSingleToken(originalToken, tokens) {
  if (isIDToken(originalToken)) {
    return tokens.idToken;
  }
  if (isAccessToken(originalToken)) {
    return tokens.accessToken;
  }
  throwInvalidTokenError();
}
function renewToken(sdk, token) {
  return __async(this, null, function* () {
    if (!isIDToken(token) && !isAccessToken(token)) {
      throwInvalidTokenError();
    }
    let tokens = sdk.tokenManager.getTokensSync();
    if (tokens.refreshToken) {
      tokens = yield renewTokensWithRefresh(sdk, {
        scopes: token.scopes
      }, tokens.refreshToken);
      return getSingleToken(token, tokens);
    }
    var responseType;
    if (sdk.options.pkce) {
      responseType = "code";
    } else if (isAccessToken(token)) {
      responseType = "token";
    } else {
      responseType = "id_token";
    }
    const { scopes, authorizeUrl, userinfoUrl, issuer, dpopPairId } = token;
    return getWithoutPrompt(sdk, {
      responseType,
      scopes,
      authorizeUrl,
      userinfoUrl,
      issuer,
      dpopPairId
    }).then(function(res) {
      return getSingleToken(token, res.tokens);
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/renewTokens.js
var import_tiny_emitter14 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch13 = __toESM(require_browser_ponyfill(), 1);
function renewTokens(sdk, options) {
  return __async(this, null, function* () {
    var _a;
    const tokens = (_a = options === null || options === void 0 ? void 0 : options.tokens) !== null && _a !== void 0 ? _a : sdk.tokenManager.getTokensSync();
    if (tokens.refreshToken) {
      return renewTokensWithRefresh(sdk, options || {}, tokens.refreshToken);
    }
    if (!tokens.accessToken && !tokens.idToken) {
      throw new AuthSdkError("renewTokens() was called but there is no existing token");
    }
    const accessToken = tokens.accessToken || {};
    const idToken = tokens.idToken || {};
    const scopes = accessToken.scopes || idToken.scopes;
    if (!scopes) {
      throw new AuthSdkError("renewTokens: invalid tokens: could not read scopes");
    }
    const authorizeUrl = accessToken.authorizeUrl || idToken.authorizeUrl;
    if (!authorizeUrl) {
      throw new AuthSdkError("renewTokens: invalid tokens: could not read authorizeUrl");
    }
    const userinfoUrl = accessToken.userinfoUrl || sdk.options.userinfoUrl;
    const issuer = idToken.issuer || sdk.options.issuer;
    const dpopPairId = accessToken === null || accessToken === void 0 ? void 0 : accessToken.dpopPairId;
    options = Object.assign({
      scopes,
      authorizeUrl,
      userinfoUrl,
      issuer,
      dpopPairId
    }, options);
    if (sdk.options.pkce) {
      options.responseType = "code";
    } else {
      const { responseType } = getDefaultTokenParams(sdk);
      options.responseType = responseType;
    }
    return getWithoutPrompt(sdk, options).then((res) => res.tokens);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/revokeToken.js
var import_tiny_emitter15 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch14 = __toESM(require_browser_ponyfill(), 1);
function revokeToken(sdk, token) {
  return __async(this, null, function* () {
    let accessToken = "";
    let refreshToken = "";
    if (token) {
      accessToken = token.accessToken;
      refreshToken = token.refreshToken;
    }
    if (!accessToken && !refreshToken) {
      throw new AuthSdkError("A valid access or refresh token object is required");
    }
    var clientId = sdk.options.clientId;
    var clientSecret = sdk.options.clientSecret;
    if (!clientId) {
      throw new AuthSdkError("A clientId must be specified in the OktaAuth constructor to revoke a token");
    }
    var revokeUrl = getOAuthUrls(sdk).revokeUrl;
    var args = toQueryString({
      token_type_hint: refreshToken ? "refresh_token" : "access_token",
      token: refreshToken || accessToken
    }).slice(1);
    var creds = clientSecret ? b(`${clientId}:${clientSecret}`) : b(clientId);
    return post(sdk, revokeUrl, args, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + creds
      }
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/introspect.js
var import_tiny_emitter16 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch15 = __toESM(require_browser_ponyfill(), 1);
var hintMap = {
  accessToken: "access_token",
  idToken: "id_token",
  refreshToken: "refresh_token"
};
function oidcIntrospect(sdk, kind, token) {
  return __async(this, null, function* () {
    var _a;
    let issuer;
    let clientId = sdk.options.clientId;
    let clientSecret = sdk.options.clientSecret;
    if (!token) {
      token = sdk.tokenManager.getTokens()[kind];
    }
    if (!token) {
      throw new AuthSdkError(`unable to find ${kind} in storage or fn params`);
    }
    if (kind !== TokenKind.ACCESS) {
      issuer = token === null || token === void 0 ? void 0 : token.issuer;
    } else {
      issuer = (_a = token === null || token === void 0 ? void 0 : token.claims) === null || _a === void 0 ? void 0 : _a.iss;
    }
    issuer = issuer || sdk.options.issuer;
    if (!clientId) {
      throw new AuthSdkError("A clientId must be specified in the OktaAuth constructor to introspect a token");
    }
    if (!issuer) {
      throw new AuthSdkError("Unable to find issuer");
    }
    const { introspection_endpoint: introspectUrl } = yield getWellKnown(sdk, issuer);
    const authHeader = clientSecret ? b(`${clientId}:${clientSecret}`) : b(clientId);
    const args = toQueryString({
      token_type_hint: hintMap[kind],
      token: token[kind]
    }).slice(1);
    return post(sdk, introspectUrl, args, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + authHeader
      }
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/enrollAuthenticatorMeta.js
function createEnrollAuthenticatorMeta(sdk, params) {
  const issuer = sdk.options.issuer;
  const urls = getOAuthUrls(sdk, params);
  const oauthMeta = {
    issuer,
    urls,
    clientId: params.clientId,
    redirectUri: params.redirectUri,
    responseType: params.responseType,
    responseMode: params.responseMode,
    state: params.state,
    acrValues: params.acrValues,
    enrollAmrValues: params.enrollAmrValues
  };
  return oauthMeta;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/enrollAuthenticator.js
var import_tiny_emitter17 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch16 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/defaultEnrollAuthenticatorParams.js
function getDefaultEnrollAuthenticatorParams(sdk) {
  const { clientId, redirectUri, responseMode, state } = sdk.options;
  const defaultRedirectUri = isBrowser() ? window.location.href : void 0;
  return removeNils({
    clientId,
    redirectUri: redirectUri || defaultRedirectUri,
    responseMode,
    state: state || generateState(),
    responseType: "none",
    prompt: "enroll_authenticator"
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/prepareEnrollAuthenticatorParams.js
function prepareParams(params) {
  params = Object.assign(Object.assign({}, params), {
    responseType: "none",
    prompt: "enroll_authenticator",
    maxAge: 0
  });
  if (!params.enrollAmrValues) {
    throw new AuthSdkError("enroll_amr_values must be specified");
  }
  if (!params.acrValues) {
    throw new AuthSdkError("acr_values must be specified");
  }
  delete params.scopes;
  delete params.nonce;
  return params;
}
function prepareEnrollAuthenticatorParams(sdk, options) {
  return prepareParams(Object.assign(Object.assign({}, getDefaultEnrollAuthenticatorParams(sdk)), options));
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/enrollAuthenticator.js
function enrollAuthenticator(sdk, options) {
  options = clone(options) || {};
  const params = prepareEnrollAuthenticatorParams(sdk, options);
  const meta = createEnrollAuthenticatorMeta(sdk, params);
  const requestUrl = meta.urls.authorizeUrl + buildAuthorizeParams(params);
  sdk.transactionManager.save(meta);
  if (sdk.options.setLocation) {
    sdk.options.setLocation(requestUrl);
  } else {
    window.location.assign(requestUrl);
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/factory/api.js
function createTokenAPI(sdk, queue) {
  const useQueue = (method) => {
    return PromiseQueue.prototype.push.bind(queue, method, null);
  };
  const getWithRedirectFn = useQueue(getWithRedirect.bind(null, sdk));
  const parseFromUrlFn = useQueue(parseFromUrl.bind(null, sdk));
  const parseFromUrlApi = Object.assign(parseFromUrlFn, {
    _getHistory: function() {
      return window.history;
    },
    _getLocation: function() {
      return window.location;
    },
    _getDocument: function() {
      return window.document;
    }
  });
  const token = {
    prepareTokenParams: prepareTokenParams.bind(null, sdk),
    exchangeCodeForTokens: exchangeCodeForTokens.bind(null, sdk),
    getWithoutPrompt: getWithoutPrompt.bind(null, sdk),
    getWithPopup: getWithPopup.bind(null, sdk),
    getWithRedirect: getWithRedirectFn,
    parseFromUrl: parseFromUrlApi,
    decode: decodeToken,
    revoke: revokeToken.bind(null, sdk),
    renew: renewToken.bind(null, sdk),
    renewTokensWithRefresh: renewTokensWithRefresh.bind(null, sdk),
    renewTokens: renewTokens.bind(null, sdk),
    getUserInfo: (accessTokenObject, idTokenObject) => {
      return getUserInfo(sdk, accessTokenObject, idTokenObject);
    },
    verify: verifyToken2.bind(null, sdk),
    isLoginRedirect: isLoginRedirect.bind(null, sdk),
    introspect: oidcIntrospect.bind(null, sdk)
  };
  const toWrap = [
    "getWithoutPrompt",
    "getWithPopup",
    "revoke",
    "renew",
    "renewTokensWithRefresh",
    "renewTokens"
  ];
  toWrap.forEach((key) => {
    token[key] = useQueue(token[key]);
  });
  return token;
}
function createEndpoints(sdk) {
  return {
    authorize: {
      enrollAuthenticator: enrollAuthenticator.bind(null, sdk)
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/TokenManager.js
var import_tiny_emitter18 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch17 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/validateToken.js
function validateToken(token, type5) {
  if (!isIDToken(token) && !isAccessToken(token) && !isRefreshToken(token)) {
    throw new AuthSdkError("Token must be an Object with scopes, expiresAt, and one of: an idToken, accessToken, or refreshToken property");
  }
  if (type5 === "accessToken" && !isAccessToken(token)) {
    throw new AuthSdkError("invalid accessToken");
  }
  if (type5 === "idToken" && !isIDToken(token)) {
    throw new AuthSdkError("invalid idToken");
  }
  if (type5 === "refreshToken" && !isRefreshToken(token)) {
    throw new AuthSdkError("invalid refreshToken");
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/clock.js
var SdkClock = class _SdkClock {
  constructor(localOffset) {
    this.localOffset = parseInt(localOffset || 0);
  }
  static create() {
    var localOffset = 0;
    return new _SdkClock(localOffset);
  }
  now() {
    var now2 = (Date.now() + this.localOffset) / 1e3;
    return now2;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/types/TokenManager.js
var EVENT_EXPIRED = "expired";
var EVENT_RENEWED = "renewed";
var EVENT_ADDED = "added";
var EVENT_REMOVED = "removed";
var EVENT_ERROR = "error";
var EVENT_SET_STORAGE = "set_storage";

// node_modules/@okta/okta-auth-js/esm/browser/oidc/TokenManager.js
var DEFAULT_OPTIONS = {
  autoRenew: true,
  autoRemove: true,
  syncStorage: true,
  clearPendingRemoveTokens: true,
  storage: void 0,
  expireEarlySeconds: 30,
  storageKey: TOKEN_STORAGE_NAME
};
function defaultState() {
  return {
    expireTimeouts: {},
    renewPromise: null
  };
}
var TokenManager = class {
  constructor(sdk, options = {}) {
    this.sdk = sdk;
    this.emitter = sdk.emitter;
    if (!this.emitter) {
      throw new AuthSdkError("Emitter should be initialized before TokenManager");
    }
    options = Object.assign({}, DEFAULT_OPTIONS, removeNils(options));
    if (!isLocalhost()) {
      options.expireEarlySeconds = DEFAULT_OPTIONS.expireEarlySeconds;
    }
    this.options = options;
    const storageOptions = removeNils({
      storageKey: options.storageKey,
      secure: options.secure
    });
    if (typeof options.storage === "object") {
      storageOptions.storageProvider = options.storage;
    } else if (options.storage) {
      storageOptions.storageType = options.storage;
    }
    this.storage = sdk.storageManager.getTokenStorage(Object.assign(Object.assign({}, storageOptions), { useSeparateCookies: true }));
    this.clock = SdkClock.create();
    this.state = defaultState();
  }
  on(event, handler, context) {
    if (context) {
      this.emitter.on(event, handler, context);
    } else {
      this.emitter.on(event, handler);
    }
  }
  off(event, handler) {
    if (handler) {
      this.emitter.off(event, handler);
    } else {
      this.emitter.off(event);
    }
  }
  start() {
    if (this.options.clearPendingRemoveTokens) {
      this.clearPendingRemoveTokens();
    }
    this.setExpireEventTimeoutAll();
    this.state.started = true;
  }
  stop() {
    this.clearExpireEventTimeoutAll();
    this.state.started = false;
  }
  isStarted() {
    return !!this.state.started;
  }
  getOptions() {
    return clone(this.options);
  }
  getExpireTime(token) {
    const expireEarlySeconds = this.options.expireEarlySeconds || 0;
    var expireTime = token.expiresAt - expireEarlySeconds;
    return expireTime;
  }
  hasExpired(token) {
    var expireTime = this.getExpireTime(token);
    return expireTime <= this.clock.now();
  }
  emitExpired(key, token) {
    this.emitter.emit(EVENT_EXPIRED, key, token);
  }
  emitRenewed(key, freshToken, oldToken) {
    this.emitter.emit(EVENT_RENEWED, key, freshToken, oldToken);
  }
  emitAdded(key, token) {
    this.emitter.emit(EVENT_ADDED, key, token);
  }
  emitRemoved(key, token) {
    this.emitter.emit(EVENT_REMOVED, key, token);
  }
  emitError(error) {
    this.emitter.emit(EVENT_ERROR, error);
  }
  clearExpireEventTimeout(key) {
    clearTimeout(this.state.expireTimeouts[key]);
    delete this.state.expireTimeouts[key];
    this.state.renewPromise = null;
  }
  clearExpireEventTimeoutAll() {
    var expireTimeouts = this.state.expireTimeouts;
    for (var key in expireTimeouts) {
      if (!Object.prototype.hasOwnProperty.call(expireTimeouts, key)) {
        continue;
      }
      this.clearExpireEventTimeout(key);
    }
  }
  setExpireEventTimeout(key, token) {
    if (isRefreshToken(token)) {
      return;
    }
    var expireTime = this.getExpireTime(token);
    var expireEventWait = Math.max(expireTime - this.clock.now(), 0) * 1e3;
    this.clearExpireEventTimeout(key);
    var expireEventTimeout = setTimeout(() => {
      this.emitExpired(key, token);
    }, expireEventWait);
    this.state.expireTimeouts[key] = expireEventTimeout;
  }
  setExpireEventTimeoutAll() {
    var tokenStorage = this.storage.getStorage();
    for (var key in tokenStorage) {
      if (!Object.prototype.hasOwnProperty.call(tokenStorage, key)) {
        continue;
      }
      var token = tokenStorage[key];
      this.setExpireEventTimeout(key, token);
    }
  }
  resetExpireEventTimeoutAll() {
    this.clearExpireEventTimeoutAll();
    this.setExpireEventTimeoutAll();
  }
  add(key, token) {
    var tokenStorage = this.storage.getStorage();
    validateToken(token);
    tokenStorage[key] = token;
    this.storage.setStorage(tokenStorage);
    this.emitSetStorageEvent();
    this.emitAdded(key, token);
    this.setExpireEventTimeout(key, token);
  }
  getSync(key) {
    var tokenStorage = this.storage.getStorage();
    return tokenStorage[key];
  }
  get(key) {
    return __async(this, null, function* () {
      return this.getSync(key);
    });
  }
  getTokensSync() {
    const tokens = {};
    const tokenStorage = this.storage.getStorage();
    Object.keys(tokenStorage).forEach((key) => {
      const token = tokenStorage[key];
      if (isAccessToken(token)) {
        tokens.accessToken = token;
      } else if (isIDToken(token)) {
        tokens.idToken = token;
      } else if (isRefreshToken(token)) {
        tokens.refreshToken = token;
      }
    });
    return tokens;
  }
  getTokens() {
    return __async(this, null, function* () {
      return this.getTokensSync();
    });
  }
  getStorageKeyByType(type5) {
    const tokenStorage = this.storage.getStorage();
    const key = Object.keys(tokenStorage).filter((key2) => {
      const token = tokenStorage[key2];
      return isAccessToken(token) && type5 === "accessToken" || isIDToken(token) && type5 === "idToken" || isRefreshToken(token) && type5 === "refreshToken";
    })[0];
    return key;
  }
  getTokenType(token) {
    if (isAccessToken(token)) {
      return "accessToken";
    }
    if (isIDToken(token)) {
      return "idToken";
    }
    if (isRefreshToken(token)) {
      return "refreshToken";
    }
    throw new AuthSdkError("Unknown token type");
  }
  emitSetStorageEvent() {
    if (isIE11OrLess()) {
      const storage = this.storage.getStorage();
      this.emitter.emit(EVENT_SET_STORAGE, storage);
    }
  }
  getStorage() {
    return this.storage;
  }
  setTokens(tokens, accessTokenCb, idTokenCb, refreshTokenCb) {
    const handleTokenCallback = (key, token) => {
      const type5 = this.getTokenType(token);
      if (type5 === "accessToken") {
        accessTokenCb && accessTokenCb(key, token);
      } else if (type5 === "idToken") {
        idTokenCb && idTokenCb(key, token);
      } else if (type5 === "refreshToken") {
        refreshTokenCb && refreshTokenCb(key, token);
      }
    };
    const handleAdded = (key, token) => {
      this.emitAdded(key, token);
      this.setExpireEventTimeout(key, token);
      handleTokenCallback(key, token);
    };
    const handleRenewed = (key, token, oldToken) => {
      this.emitRenewed(key, token, oldToken);
      this.clearExpireEventTimeout(key);
      this.setExpireEventTimeout(key, token);
      handleTokenCallback(key, token);
    };
    const handleRemoved = (key, token) => {
      this.clearExpireEventTimeout(key);
      this.emitRemoved(key, token);
      handleTokenCallback(key, token);
    };
    const types = ["idToken", "accessToken", "refreshToken"];
    const existingTokens = this.getTokensSync();
    types.forEach((type5) => {
      const token = tokens[type5];
      if (token) {
        validateToken(token, type5);
      }
    });
    const storage = types.reduce((storage2, type5) => {
      const token = tokens[type5];
      if (token) {
        const storageKey2 = this.getStorageKeyByType(type5) || type5;
        storage2[storageKey2] = token;
      }
      return storage2;
    }, {});
    this.storage.setStorage(storage);
    this.emitSetStorageEvent();
    types.forEach((type5) => {
      const newToken = tokens[type5];
      const existingToken = existingTokens[type5];
      const storageKey2 = this.getStorageKeyByType(type5) || type5;
      if (newToken && existingToken) {
        handleRemoved(storageKey2, existingToken);
        handleAdded(storageKey2, newToken);
        handleRenewed(storageKey2, newToken, existingToken);
      } else if (newToken) {
        handleAdded(storageKey2, newToken);
      } else if (existingToken) {
        handleRemoved(storageKey2, existingToken);
      }
    });
  }
  remove(key) {
    this.clearExpireEventTimeout(key);
    var tokenStorage = this.storage.getStorage();
    var removedToken = tokenStorage[key];
    delete tokenStorage[key];
    this.storage.setStorage(tokenStorage);
    this.emitSetStorageEvent();
    this.emitRemoved(key, removedToken);
  }
  renewToken(token) {
    return __async(this, null, function* () {
      var _a;
      return (_a = this.sdk.token) === null || _a === void 0 ? void 0 : _a.renew(token);
    });
  }
  validateToken(token) {
    return validateToken(token);
  }
  renew(key) {
    if (this.state.renewPromise) {
      return this.state.renewPromise;
    }
    try {
      var token = this.getSync(key);
      let shouldRenew = token !== void 0;
      if (!token && key === "accessToken") {
        const refreshKey = this.getStorageKeyByType("refreshToken");
        const refreshToken = this.getSync(refreshKey);
        shouldRenew = refreshToken !== void 0;
      }
      if (!shouldRenew) {
        throw new AuthSdkError("The tokenManager has no token for the key: " + key);
      }
    } catch (err) {
      this.emitError(err);
      return Promise.reject(err);
    }
    this.clearExpireEventTimeout(key);
    const renewPromise = this.state.renewPromise = this.sdk.token.renewTokens().then((tokens) => {
      this.setTokens(tokens);
      if (!token && key === "accessToken") {
        const accessToken = tokens["accessToken"];
        this.emitRenewed(key, accessToken, null);
        return accessToken;
      }
      const tokenType = this.getTokenType(token);
      return tokens[tokenType];
    }).catch((err) => {
      this.remove(key);
      err.tokenKey = key;
      this.emitError(err);
      throw err;
    }).finally(() => {
      this.state.renewPromise = null;
    });
    return renewPromise;
  }
  clear() {
    const tokens = this.getTokensSync();
    this.clearExpireEventTimeoutAll();
    this.storage.clearStorage();
    this.emitSetStorageEvent();
    Object.keys(tokens).forEach((key) => {
      this.emitRemoved(key, tokens[key]);
    });
  }
  clearPendingRemoveTokens() {
    const tokenStorage = this.storage.getStorage();
    const removedTokens = {};
    Object.keys(tokenStorage).forEach((key) => {
      if (tokenStorage[key].pendingRemove) {
        removedTokens[key] = tokenStorage[key];
        delete tokenStorage[key];
      }
    });
    this.storage.setStorage(tokenStorage);
    this.emitSetStorageEvent();
    Object.keys(removedTokens).forEach((key) => {
      this.clearExpireEventTimeout(key);
      this.emitRemoved(key, removedTokens[key]);
    });
  }
  updateRefreshToken(token) {
    const key = this.getStorageKeyByType("refreshToken") || REFRESH_TOKEN_STORAGE_KEY;
    var tokenStorage = this.storage.getStorage();
    validateToken(token);
    tokenStorage[key] = token;
    this.storage.setStorage(tokenStorage);
    this.emitSetStorageEvent();
  }
  removeRefreshToken() {
    const key = this.getStorageKeyByType("refreshToken") || REFRESH_TOKEN_STORAGE_KEY;
    this.remove(key);
  }
  addPendingRemoveFlags() {
    const tokens = this.getTokensSync();
    Object.keys(tokens).forEach((key) => {
      tokens[key].pendingRemove = true;
    });
    this.setTokens(tokens);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/browser/browserStorage.js
var storageUtil = {
  browserHasLocalStorage: function() {
    try {
      var storage = this.getLocalStorage();
      return this.testStorage(storage);
    } catch (e) {
      return false;
    }
  },
  browserHasSessionStorage: function() {
    try {
      var storage = this.getSessionStorage();
      return this.testStorage(storage);
    } catch (e) {
      return false;
    }
  },
  testStorageType: function(storageType) {
    var supported = false;
    switch (storageType) {
      case "sessionStorage":
        supported = this.browserHasSessionStorage();
        break;
      case "localStorage":
        supported = this.browserHasLocalStorage();
        break;
      case "cookie":
      case "memory":
        supported = true;
        break;
      default:
        supported = false;
        break;
    }
    return supported;
  },
  getStorageByType: function(storageType, options) {
    let storageProvider;
    switch (storageType) {
      case "sessionStorage":
        storageProvider = this.getSessionStorage();
        break;
      case "localStorage":
        storageProvider = this.getLocalStorage();
        break;
      case "cookie":
        storageProvider = this.getCookieStorage(options);
        break;
      case "memory":
        storageProvider = this.getInMemoryStorage();
        break;
      default:
        throw new AuthSdkError(`Unrecognized storage option: ${storageType}`);
    }
    return storageProvider;
  },
  findStorageType: function(types) {
    let curType;
    let nextType;
    types = types.slice();
    curType = types.shift();
    nextType = types.length ? types[0] : null;
    if (!nextType) {
      return curType;
    }
    if (this.testStorageType(curType)) {
      return curType;
    }
    warn(`This browser doesn't support ${curType}. Switching to ${nextType}.`);
    return this.findStorageType(types);
  },
  getLocalStorage: function() {
    if (isIE11OrLess() && !window.onstorage) {
      window.onstorage = function() {
      };
    }
    return localStorage;
  },
  getSessionStorage: function() {
    return sessionStorage;
  },
  getCookieStorage: function(options) {
    const secure = options.secure;
    const sameSite = options.sameSite;
    const sessionCookie = options.sessionCookie;
    if (typeof secure === "undefined" || typeof sameSite === "undefined") {
      throw new AuthSdkError('getCookieStorage: "secure" and "sameSite" options must be provided');
    }
    const storage = {
      getItem: this.storage.get,
      setItem: (key, value, expiresAt = "2200-01-01T00:00:00.000Z") => {
        expiresAt = sessionCookie ? null : expiresAt;
        this.storage.set(key, value, expiresAt, {
          secure,
          sameSite
        });
      },
      removeItem: (key) => {
        this.storage.delete(key);
      }
    };
    if (!options.useSeparateCookies) {
      return storage;
    }
    return {
      getItem: function(key) {
        var data = storage.getItem();
        var value = {};
        Object.keys(data).forEach((k) => {
          if (k.indexOf(key) === 0) {
            value[k.replace(`${key}_`, "")] = JSON.parse(data[k]);
          }
        });
        return JSON.stringify(value);
      },
      setItem: function(key, value) {
        var existingValues = JSON.parse(this.getItem(key));
        value = JSON.parse(value);
        Object.keys(value).forEach((k) => {
          var storageKey2 = key + "_" + k;
          var valueToStore = JSON.stringify(value[k]);
          storage.setItem(storageKey2, valueToStore);
          delete existingValues[k];
        });
        Object.keys(existingValues).forEach((k) => {
          storage.removeItem(key + "_" + k);
        });
      },
      removeItem: function(key) {
        var existingValues = JSON.parse(this.getItem(key));
        Object.keys(existingValues).forEach((k) => {
          storage.removeItem(key + "_" + k);
        });
      }
    };
  },
  inMemoryStore: {},
  getInMemoryStorage: function() {
    return {
      getItem: (key) => {
        return this.inMemoryStore[key];
      },
      setItem: (key, value) => {
        this.inMemoryStore[key] = value;
      }
    };
  },
  testStorage: function(storage) {
    var key = "okta-test-storage";
    try {
      storage.setItem(key, key);
      storage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  storage: {
    set: function(name, value, expiresAt, options) {
      const { sameSite, secure } = options;
      if (typeof secure === "undefined" || typeof sameSite === "undefined") {
        throw new AuthSdkError('storage.set: "secure" and "sameSite" options must be provided');
      }
      var cookieOptions = {
        path: options.path || "/",
        secure,
        sameSite
      };
      if (!!Date.parse(expiresAt)) {
        cookieOptions.expires = new Date(expiresAt);
      }
      api.set(name, value, cookieOptions);
      return this.get(name);
    },
    get: function(name) {
      if (!arguments.length) {
        return api.get();
      }
      return api.get(name);
    },
    delete: function(name) {
      return api.remove(name, { path: "/" });
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/mixin/browser.js
function provideOriginalUri(BaseClass) {
  return class WithOriginalUri extends BaseClass {
    setOriginalUri(originalUri, state) {
      const sessionStorage2 = storageUtil.getSessionStorage();
      sessionStorage2.setItem(REFERRER_PATH_STORAGE_KEY, originalUri);
      state = state || this.options.state;
      if (state) {
        const sharedStorage = this.storageManager.getOriginalUriStorage();
        sharedStorage.setItem(state, originalUri);
      }
    }
    getOriginalUri(state) {
      state = state || this.options.state;
      if (state) {
        const sharedStorage = this.storageManager.getOriginalUriStorage();
        const originalUri = sharedStorage.getItem(state);
        if (originalUri) {
          return originalUri;
        }
      }
      const storage = storageUtil.getSessionStorage();
      return storage ? storage.getItem(REFERRER_PATH_STORAGE_KEY) || void 0 : void 0;
    }
    removeOriginalUri(state) {
      const storage = storageUtil.getSessionStorage();
      storage.removeItem(REFERRER_PATH_STORAGE_KEY);
      state = state || this.options.state;
      if (state) {
        const sharedStorage = this.storageManager.getOriginalUriStorage();
        sharedStorage.removeItem && sharedStorage.removeItem(state);
      }
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/mixin/index.js
function mixinOAuth(Base, TransactionManagerConstructor) {
  var _a;
  const WithOriginalUri = provideOriginalUri(Base);
  return _a = class OktaAuthOAuth extends WithOriginalUri {
    constructor(...args) {
      super(...args);
      this.transactionManager = new TransactionManagerConstructor(Object.assign({
        storageManager: this.storageManager
      }, this.options.transactionManager));
      this.pkce = {
        DEFAULT_CODE_CHALLENGE_METHOD: PKCE.DEFAULT_CODE_CHALLENGE_METHOD,
        generateVerifier: PKCE.generateVerifier,
        computeChallenge: PKCE.computeChallenge
      };
      this._pending = { handleLogin: false };
      this._tokenQueue = new PromiseQueue();
      this.token = createTokenAPI(this, this._tokenQueue);
      this.tokenManager = new TokenManager(this, this.options.tokenManager);
      this.endpoints = createEndpoints(this);
    }
    clearStorage() {
      super.clearStorage();
      this.tokenManager.clear();
    }
    isAuthenticated() {
      return __async(this, arguments, function* (options = {}) {
        const { autoRenew, autoRemove } = this.tokenManager.getOptions();
        const shouldRenew = options.onExpiredToken ? options.onExpiredToken === "renew" : autoRenew;
        const shouldRemove = options.onExpiredToken ? options.onExpiredToken === "remove" : autoRemove;
        let { accessToken } = this.tokenManager.getTokensSync();
        if (accessToken && this.tokenManager.hasExpired(accessToken)) {
          accessToken = void 0;
          if (shouldRenew) {
            try {
              accessToken = yield this.tokenManager.renew("accessToken");
            } catch (_a2) {
            }
          } else if (shouldRemove) {
            this.tokenManager.remove("accessToken");
          }
        }
        let { idToken } = this.tokenManager.getTokensSync();
        if (idToken && this.tokenManager.hasExpired(idToken)) {
          idToken = void 0;
          if (shouldRenew) {
            try {
              idToken = yield this.tokenManager.renew("idToken");
            } catch (_b) {
            }
          } else if (shouldRemove) {
            this.tokenManager.remove("idToken");
          }
        }
        return !!(accessToken && idToken);
      });
    }
    signInWithRedirect() {
      return __async(this, arguments, function* (opts = {}) {
        const { originalUri } = opts, additionalParams = __rest(opts, ["originalUri"]);
        if (this._pending.handleLogin) {
          return;
        }
        this._pending.handleLogin = true;
        try {
          if (originalUri) {
            this.setOriginalUri(originalUri);
          }
          const params = Object.assign({
            scopes: this.options.scopes || ["openid", "email", "profile"]
          }, additionalParams);
          yield this.token.getWithRedirect(params);
        } finally {
          this._pending.handleLogin = false;
        }
      });
    }
    getUser() {
      return __async(this, null, function* () {
        const { idToken, accessToken } = this.tokenManager.getTokensSync();
        return this.token.getUserInfo(accessToken, idToken);
      });
    }
    getIdToken() {
      const { idToken } = this.tokenManager.getTokensSync();
      return idToken ? idToken.idToken : void 0;
    }
    getAccessToken() {
      const { accessToken } = this.tokenManager.getTokensSync();
      return accessToken ? accessToken.accessToken : void 0;
    }
    getRefreshToken() {
      const { refreshToken } = this.tokenManager.getTokensSync();
      return refreshToken ? refreshToken.refreshToken : void 0;
    }
    getOrRenewAccessToken() {
      return __async(this, null, function* () {
        var _a2;
        const { accessToken } = this.tokenManager.getTokensSync();
        if (accessToken && !this.tokenManager.hasExpired(accessToken)) {
          return accessToken.accessToken;
        }
        try {
          const key = this.tokenManager.getStorageKeyByType("accessToken");
          const token = yield this.tokenManager.renew(key !== null && key !== void 0 ? key : "accessToken");
          return (_a2 = token === null || token === void 0 ? void 0 : token.accessToken) !== null && _a2 !== void 0 ? _a2 : null;
        } catch (err) {
          this.emitter.emit("error", err);
          return null;
        }
      });
    }
    storeTokensFromRedirect() {
      return __async(this, null, function* () {
        const { tokens, responseType } = yield this.token.parseFromUrl();
        if (responseType !== "none") {
          this.tokenManager.setTokens(tokens);
        }
      });
    }
    isLoginRedirect() {
      return isLoginRedirect(this);
    }
    isPKCE() {
      return !!this.options.pkce;
    }
    hasResponseType(responseType) {
      return hasResponseType(responseType, this.options);
    }
    isAuthorizationCodeFlow() {
      return this.hasResponseType("code");
    }
    invokeApiMethod(options) {
      return __async(this, null, function* () {
        if (!options.accessToken) {
          const accessToken = (yield this.tokenManager.getTokens()).accessToken;
          options.accessToken = accessToken === null || accessToken === void 0 ? void 0 : accessToken.accessToken;
        }
        return httpRequest(this, options);
      });
    }
    revokeAccessToken(accessToken) {
      return __async(this, null, function* () {
        if (!accessToken) {
          const tokens = yield this.tokenManager.getTokens();
          accessToken = tokens.accessToken;
          const accessTokenKey = this.tokenManager.getStorageKeyByType("accessToken");
          this.tokenManager.remove(accessTokenKey);
          if (this.options.dpop) {
            yield clearDPoPKeyPairAfterRevoke("access", tokens);
          }
        }
        if (!accessToken) {
          return Promise.resolve(null);
        }
        return this.token.revoke(accessToken);
      });
    }
    revokeRefreshToken(refreshToken) {
      return __async(this, null, function* () {
        if (!refreshToken) {
          const tokens = yield this.tokenManager.getTokens();
          refreshToken = tokens.refreshToken;
          const refreshTokenKey = this.tokenManager.getStorageKeyByType("refreshToken");
          this.tokenManager.remove(refreshTokenKey);
          if (this.options.dpop) {
            yield clearDPoPKeyPairAfterRevoke("refresh", tokens);
          }
        }
        if (!refreshToken) {
          return Promise.resolve(null);
        }
        return this.token.revoke(refreshToken);
      });
    }
    getSignOutRedirectUrl(options = {}) {
      let { idToken, postLogoutRedirectUri, state } = options;
      if (!idToken) {
        idToken = this.tokenManager.getTokensSync().idToken;
      }
      if (!idToken) {
        return "";
      }
      if (postLogoutRedirectUri === void 0) {
        postLogoutRedirectUri = this.options.postLogoutRedirectUri;
      }
      const logoutUrl = getOAuthUrls(this).logoutUrl;
      const idTokenHint = idToken.idToken;
      let logoutUri = logoutUrl + "?id_token_hint=" + encodeURIComponent(idTokenHint);
      if (postLogoutRedirectUri) {
        logoutUri += "&post_logout_redirect_uri=" + encodeURIComponent(postLogoutRedirectUri);
      }
      if (state) {
        logoutUri += "&state=" + encodeURIComponent(state);
      }
      return logoutUri;
    }
    signOut(options) {
      return __async(this, null, function* () {
        var _a2;
        options = Object.assign({}, options);
        const defaultUri = window.location.origin;
        const currentUri = window.location.href;
        const postLogoutRedirectUri = options.postLogoutRedirectUri === null ? null : options.postLogoutRedirectUri || this.options.postLogoutRedirectUri || defaultUri;
        const state = options === null || options === void 0 ? void 0 : options.state;
        let accessToken = options.accessToken;
        let refreshToken = options.refreshToken;
        const revokeAccessToken = options.revokeAccessToken !== false;
        const revokeRefreshToken = options.revokeRefreshToken !== false;
        if (revokeRefreshToken && typeof refreshToken === "undefined") {
          refreshToken = this.tokenManager.getTokensSync().refreshToken;
        }
        if (revokeAccessToken && typeof accessToken === "undefined") {
          accessToken = this.tokenManager.getTokensSync().accessToken;
        }
        if (!options.idToken) {
          options.idToken = this.tokenManager.getTokensSync().idToken;
        }
        if (revokeRefreshToken && refreshToken) {
          yield this.revokeRefreshToken(refreshToken);
        }
        if (revokeAccessToken && accessToken) {
          yield this.revokeAccessToken(accessToken);
        }
        const dpopPairId = (_a2 = accessToken === null || accessToken === void 0 ? void 0 : accessToken.dpopPairId) !== null && _a2 !== void 0 ? _a2 : refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.dpopPairId;
        if (this.options.dpop && dpopPairId) {
          yield clearDPoPKeyPair(dpopPairId);
        }
        const logoutUri = this.getSignOutRedirectUrl(Object.assign(Object.assign({}, options), { postLogoutRedirectUri }));
        if (!logoutUri) {
          const sessionClosed = yield this.closeSession();
          const redirectUri = new URL(postLogoutRedirectUri || defaultUri);
          if (state) {
            redirectUri.searchParams.append("state", state);
          }
          if (postLogoutRedirectUri === currentUri) {
            window.location.href = redirectUri.href;
          } else {
            window.location.assign(redirectUri.href);
          }
          return sessionClosed;
        } else {
          if (options.clearTokensBeforeRedirect) {
            this.tokenManager.clear();
          } else {
            this.tokenManager.addPendingRemoveFlags();
          }
          window.location.assign(logoutUri);
          return true;
        }
      });
    }
    getDPoPAuthorizationHeaders(params) {
      return __async(this, null, function* () {
        if (!this.options.dpop) {
          throw new AuthSdkError("DPoP is not configured for this client instance");
        }
        let { accessToken } = params;
        if (!accessToken) {
          accessToken = this.tokenManager.getTokensSync().accessToken;
        }
        if (!accessToken) {
          throw new AuthSdkError("AccessToken is required to generate a DPoP Proof");
        }
        const keyPair = yield findKeyPair(accessToken === null || accessToken === void 0 ? void 0 : accessToken.dpopPairId);
        const proof = yield generateDPoPProof(Object.assign(Object.assign({}, params), { keyPair, accessToken: accessToken.accessToken }));
        return {
          Authorization: `DPoP ${accessToken.accessToken}`,
          Dpop: proof
        };
      });
    }
    clearDPoPStorage(clearAll = false) {
      return __async(this, null, function* () {
        var _a2, _b;
        if (clearAll) {
          return clearAllDPoPKeyPairs();
        }
        const tokens = yield this.tokenManager.getTokens();
        const keyPair = ((_a2 = tokens.accessToken) === null || _a2 === void 0 ? void 0 : _a2.dpopPairId) || ((_b = tokens.refreshToken) === null || _b === void 0 ? void 0 : _b.dpopPairId);
        if (keyPair) {
          yield clearDPoPKeyPair(keyPair);
        }
      });
    }
    parseUseDPoPNonceError(headers) {
      var _a2;
      const wwwAuth = WWWAuthError.getWWWAuthenticateHeader(headers);
      const wwwErr = WWWAuthError.parseHeader(wwwAuth !== null && wwwAuth !== void 0 ? wwwAuth : "");
      if (isDPoPNonceError(wwwErr)) {
        let nonce = null;
        if (isFunction(headers === null || headers === void 0 ? void 0 : headers.get)) {
          nonce = headers.get("DPoP-Nonce");
        }
        nonce = (_a2 = nonce !== null && nonce !== void 0 ? nonce : headers["dpop-nonce"]) !== null && _a2 !== void 0 ? _a2 : headers["DPoP-Nonce"];
        return nonce;
      }
      return null;
    }
  }, _a.crypto = crypto_exports, _a;
}

// node_modules/@okta/okta-auth-js/esm/browser/core/AuthStateManager.js
var import_p_cancelable = __toESM(require_p_cancelable(), 1);
var import_tiny_emitter20 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch19 = __toESM(require_browser_ponyfill(), 1);
var INITIAL_AUTH_STATE = null;
var DEFAULT_PENDING = {
  updateAuthStatePromise: null,
  canceledTimes: 0
};
var EVENT_AUTH_STATE_CHANGE = "authStateChange";
var MAX_PROMISE_CANCEL_TIMES = 10;
var isSameAuthState = (prevState, state) => {
  if (!prevState) {
    return false;
  }
  return prevState.isAuthenticated === state.isAuthenticated && JSON.stringify(prevState.idToken) === JSON.stringify(state.idToken) && JSON.stringify(prevState.accessToken) === JSON.stringify(state.accessToken) && prevState.error === state.error;
};
var AuthStateManager = class {
  constructor(sdk) {
    if (!sdk.emitter) {
      throw new AuthSdkError("Emitter should be initialized before AuthStateManager");
    }
    this._sdk = sdk;
    this._pending = Object.assign({}, DEFAULT_PENDING);
    this._authState = INITIAL_AUTH_STATE;
    this._logOptions = {};
    this._prevAuthState = null;
    this._transformQueue = new PromiseQueue({
      quiet: true
    });
    sdk.tokenManager.on(EVENT_ADDED, (key, token) => {
      this._setLogOptions({ event: EVENT_ADDED, key, token });
      this.updateAuthState();
    });
    sdk.tokenManager.on(EVENT_REMOVED, (key, token) => {
      this._setLogOptions({ event: EVENT_REMOVED, key, token });
      this.updateAuthState();
    });
  }
  _setLogOptions(options) {
    this._logOptions = options;
  }
  getAuthState() {
    return this._authState;
  }
  getPreviousAuthState() {
    return this._prevAuthState;
  }
  updateAuthState() {
    return __async(this, null, function* () {
      const { transformAuthState, devMode } = this._sdk.options;
      const log = (status) => {
        const { event, key, token } = this._logOptions;
        getConsole().group(`OKTA-AUTH-JS:updateAuthState: Event:${event} Status:${status}`);
        getConsole().log(key, token);
        getConsole().log("Current authState", this._authState);
        getConsole().groupEnd();
        this._logOptions = {};
      };
      const emitAuthStateChange = (authState) => {
        if (isSameAuthState(this._authState, authState)) {
          devMode && log("unchanged");
          return;
        }
        this._prevAuthState = this._authState;
        this._authState = authState;
        this._sdk.emitter.emit(EVENT_AUTH_STATE_CHANGE, Object.assign({}, authState));
        devMode && log("emitted");
      };
      const finalPromise = (origPromise) => {
        return this._pending.updateAuthStatePromise.then(() => {
          const curPromise = this._pending.updateAuthStatePromise;
          if (curPromise && curPromise !== origPromise) {
            return finalPromise(curPromise);
          }
          return this.getAuthState();
        });
      };
      if (this._pending.updateAuthStatePromise) {
        if (this._pending.canceledTimes >= MAX_PROMISE_CANCEL_TIMES) {
          devMode && log("terminated");
          return finalPromise(this._pending.updateAuthStatePromise);
        } else {
          this._pending.updateAuthStatePromise.cancel();
        }
      }
      const cancelablePromise = new import_p_cancelable.default((resolve, _, onCancel) => {
        onCancel.shouldReject = false;
        onCancel(() => {
          this._pending.updateAuthStatePromise = null;
          this._pending.canceledTimes = this._pending.canceledTimes + 1;
          devMode && log("canceled");
        });
        const emitAndResolve = (authState) => {
          if (cancelablePromise.isCanceled) {
            resolve();
            return;
          }
          emitAuthStateChange(authState);
          resolve();
          this._pending = Object.assign({}, DEFAULT_PENDING);
        };
        this._sdk.isAuthenticated().then(() => {
          if (cancelablePromise.isCanceled) {
            resolve();
            return;
          }
          const { accessToken, idToken, refreshToken } = this._sdk.tokenManager.getTokensSync();
          const authState = {
            accessToken,
            idToken,
            refreshToken,
            isAuthenticated: !!(accessToken && idToken)
          };
          const promise = transformAuthState ? this._transformQueue.push(transformAuthState, null, this._sdk, authState) : Promise.resolve(authState);
          promise.then((authState2) => emitAndResolve(authState2)).catch((error) => emitAndResolve({
            accessToken,
            idToken,
            refreshToken,
            isAuthenticated: false,
            error
          }));
        });
      });
      this._pending.updateAuthStatePromise = cancelablePromise;
      return finalPromise(cancelablePromise);
    });
  }
  subscribe(handler) {
    this._sdk.emitter.on(EVENT_AUTH_STATE_CHANGE, handler);
  }
  unsubscribe(handler) {
    this._sdk.emitter.off(EVENT_AUTH_STATE_CHANGE, handler);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/services/AutoRenewService.js
var AutoRenewService = class {
  constructor(tokenManager, options = {}) {
    this.started = false;
    this.tokenManager = tokenManager;
    this.options = options;
    this.renewTimeQueue = [];
    this.onTokenExpiredHandler = this.onTokenExpiredHandler.bind(this);
  }
  shouldThrottleRenew() {
    let res = false;
    this.renewTimeQueue.push(Date.now());
    if (this.renewTimeQueue.length >= 10) {
      const firstTime = this.renewTimeQueue.shift();
      const lastTime = this.renewTimeQueue[this.renewTimeQueue.length - 1];
      res = lastTime - firstTime < 30 * 1e3;
    }
    return res;
  }
  requiresLeadership() {
    return !!this.options.syncStorage && isBrowser();
  }
  processExpiredTokens() {
    const tokenStorage = this.tokenManager.getStorage();
    const tokens = tokenStorage.getStorage();
    Object.keys(tokens).forEach((key) => {
      const token = tokens[key];
      if (!isRefreshToken(token) && this.tokenManager.hasExpired(token)) {
        this.onTokenExpiredHandler(key);
      }
    });
  }
  onTokenExpiredHandler(key) {
    if (this.options.autoRenew) {
      if (this.shouldThrottleRenew()) {
        const error = new AuthSdkError("Too many token renew requests");
        this.tokenManager.emitError(error);
      } else {
        this.tokenManager.renew(key).catch(() => {
        });
      }
    } else if (this.options.autoRemove) {
      this.tokenManager.remove(key);
    }
  }
  canStart() {
    return (!!this.options.autoRenew || !!this.options.autoRemove) && !this.started;
  }
  start() {
    return __async(this, null, function* () {
      if (this.canStart()) {
        this.tokenManager.on(EVENT_EXPIRED, this.onTokenExpiredHandler);
        if (this.tokenManager.isStarted()) {
          this.processExpiredTokens();
        }
        this.started = true;
      }
    });
  }
  stop() {
    return __async(this, null, function* () {
      if (this.started) {
        this.tokenManager.off(EVENT_EXPIRED, this.onTokenExpiredHandler);
        this.renewTimeQueue = [];
        this.started = false;
      }
    });
  }
  isStarted() {
    return this.started;
  }
};

// node_modules/broadcast-channel/dist/esbrowser/util.js
function isPromise2(obj) {
  return obj && typeof obj.then === "function";
}
var PROMISE_RESOLVED_FALSE = Promise.resolve(false);
var PROMISE_RESOLVED_TRUE = Promise.resolve(true);
var PROMISE_RESOLVED_VOID = Promise.resolve();
function sleep(time, resolveWith) {
  if (!time)
    time = 0;
  return new Promise(function(res) {
    return setTimeout(function() {
      return res(resolveWith);
    }, time);
  });
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomToken() {
  return Math.random().toString(36).substring(2);
}
var lastMs = 0;
var additional = 0;
function microSeconds() {
  var ms = (/* @__PURE__ */ new Date()).getTime();
  if (ms === lastMs) {
    additional++;
    return ms * 1e3 + additional;
  } else {
    lastMs = ms;
    additional = 0;
    return ms * 1e3;
  }
}
function supportsWebLockAPI() {
  if (typeof navigator !== "undefined" && typeof navigator.locks !== "undefined" && typeof navigator.locks.request === "function") {
    return true;
  } else {
    return false;
  }
}

// node_modules/broadcast-channel/dist/esbrowser/methods/native.js
var microSeconds2 = microSeconds;
var type = "native";
function create(channelName) {
  var state = {
    messagesCallback: null,
    bc: new BroadcastChannel(channelName),
    subFns: []
    // subscriberFunctions
  };
  state.bc.onmessage = function(msg) {
    if (state.messagesCallback) {
      state.messagesCallback(msg.data);
    }
  };
  return state;
}
function close(channelState) {
  channelState.bc.close();
  channelState.subFns = [];
}
function postMessage(channelState, messageJson) {
  try {
    channelState.bc.postMessage(messageJson, false);
    return PROMISE_RESOLVED_VOID;
  } catch (err) {
    return Promise.reject(err);
  }
}
function onMessage(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  if ((typeof window !== "undefined" || typeof self !== "undefined") && typeof BroadcastChannel === "function") {
    if (BroadcastChannel._pubkey) {
      throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
    }
    return true;
  } else {
    return false;
  }
}
function averageResponseTime() {
  return 150;
}
var NativeMethod = {
  create,
  close,
  onMessage,
  postMessage,
  canBeUsed,
  type,
  averageResponseTime,
  microSeconds: microSeconds2
};

// node_modules/oblivious-set/dist/es/index.js
var ObliviousSet = (
  /** @class */
  function() {
    function ObliviousSet2(ttl) {
      this.ttl = ttl;
      this.map = /* @__PURE__ */ new Map();
      this._to = false;
    }
    ObliviousSet2.prototype.has = function(value) {
      return this.map.has(value);
    };
    ObliviousSet2.prototype.add = function(value) {
      var _this = this;
      this.map.set(value, now());
      if (!this._to) {
        this._to = true;
        setTimeout(function() {
          _this._to = false;
          removeTooOldValues(_this);
        }, 0);
      }
    };
    ObliviousSet2.prototype.clear = function() {
      this.map.clear();
    };
    return ObliviousSet2;
  }()
);
function removeTooOldValues(obliviousSet) {
  var olderThen = now() - obliviousSet.ttl;
  var iterator = obliviousSet.map[Symbol.iterator]();
  while (true) {
    var next = iterator.next().value;
    if (!next) {
      return;
    }
    var value = next[0];
    var time = next[1];
    if (time < olderThen) {
      obliviousSet.map.delete(value);
    } else {
      return;
    }
  }
}
function now() {
  return (/* @__PURE__ */ new Date()).getTime();
}

// node_modules/broadcast-channel/dist/esbrowser/options.js
function fillOptionsWithDefaults() {
  var originalOptions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var options = JSON.parse(JSON.stringify(originalOptions));
  if (typeof options.webWorkerSupport === "undefined")
    options.webWorkerSupport = true;
  if (!options.idb)
    options.idb = {};
  if (!options.idb.ttl)
    options.idb.ttl = 1e3 * 45;
  if (!options.idb.fallbackInterval)
    options.idb.fallbackInterval = 150;
  if (originalOptions.idb && typeof originalOptions.idb.onclose === "function")
    options.idb.onclose = originalOptions.idb.onclose;
  if (!options.localstorage)
    options.localstorage = {};
  if (!options.localstorage.removeTimeout)
    options.localstorage.removeTimeout = 1e3 * 60;
  if (originalOptions.methods)
    options.methods = originalOptions.methods;
  if (!options.node)
    options.node = {};
  if (!options.node.ttl)
    options.node.ttl = 1e3 * 60 * 2;
  if (!options.node.maxParallelWrites)
    options.node.maxParallelWrites = 2048;
  if (typeof options.node.useFastPath === "undefined")
    options.node.useFastPath = true;
  return options;
}

// node_modules/broadcast-channel/dist/esbrowser/methods/indexed-db.js
var microSeconds3 = microSeconds;
var DB_PREFIX = "pubkey.broadcast-channel-0-";
var OBJECT_STORE_ID = "messages";
var TRANSACTION_SETTINGS = {
  durability: "relaxed"
};
var type2 = "idb";
function getIdb() {
  if (typeof indexedDB !== "undefined")
    return indexedDB;
  if (typeof window !== "undefined") {
    if (typeof window.mozIndexedDB !== "undefined")
      return window.mozIndexedDB;
    if (typeof window.webkitIndexedDB !== "undefined")
      return window.webkitIndexedDB;
    if (typeof window.msIndexedDB !== "undefined")
      return window.msIndexedDB;
  }
  return false;
}
function commitIndexedDBTransaction(tx) {
  if (tx.commit) {
    tx.commit();
  }
}
function createDatabase(channelName) {
  var IndexedDB = getIdb();
  var dbName = DB_PREFIX + channelName;
  var openRequest = IndexedDB.open(dbName);
  openRequest.onupgradeneeded = function(ev) {
    var db = ev.target.result;
    db.createObjectStore(OBJECT_STORE_ID, {
      keyPath: "id",
      autoIncrement: true
    });
  };
  return new Promise(function(res, rej) {
    openRequest.onerror = function(ev) {
      return rej(ev);
    };
    openRequest.onsuccess = function() {
      res(openRequest.result);
    };
  });
}
function writeMessage(db, readerUuid, messageJson) {
  var time = (/* @__PURE__ */ new Date()).getTime();
  var writeObject = {
    uuid: readerUuid,
    time,
    data: messageJson
  };
  var tx = db.transaction([OBJECT_STORE_ID], "readwrite", TRANSACTION_SETTINGS);
  return new Promise(function(res, rej) {
    tx.oncomplete = function() {
      return res();
    };
    tx.onerror = function(ev) {
      return rej(ev);
    };
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    objectStore.add(writeObject);
    commitIndexedDBTransaction(tx);
  });
}
function getMessagesHigherThan(db, lastCursorId) {
  var tx = db.transaction(OBJECT_STORE_ID, "readonly", TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  var ret = [];
  var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
  if (objectStore.getAll) {
    var getAllRequest = objectStore.getAll(keyRangeValue);
    return new Promise(function(res, rej) {
      getAllRequest.onerror = function(err) {
        return rej(err);
      };
      getAllRequest.onsuccess = function(e) {
        res(e.target.result);
      };
    });
  }
  function openCursor() {
    try {
      keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
      return objectStore.openCursor(keyRangeValue);
    } catch (e) {
      return objectStore.openCursor();
    }
  }
  return new Promise(function(res, rej) {
    var openCursorRequest = openCursor();
    openCursorRequest.onerror = function(err) {
      return rej(err);
    };
    openCursorRequest.onsuccess = function(ev) {
      var cursor = ev.target.result;
      if (cursor) {
        if (cursor.value.id < lastCursorId + 1) {
          cursor["continue"](lastCursorId + 1);
        } else {
          ret.push(cursor.value);
          cursor["continue"]();
        }
      } else {
        commitIndexedDBTransaction(tx);
        res(ret);
      }
    };
  });
}
function removeMessagesById(channelState, ids) {
  if (channelState.closed) {
    return Promise.resolve([]);
  }
  var tx = channelState.db.transaction(OBJECT_STORE_ID, "readwrite", TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  return Promise.all(ids.map(function(id) {
    var deleteRequest = objectStore["delete"](id);
    return new Promise(function(res) {
      deleteRequest.onsuccess = function() {
        return res();
      };
    });
  }));
}
function getOldMessages(db, ttl) {
  var olderThen = (/* @__PURE__ */ new Date()).getTime() - ttl;
  var tx = db.transaction(OBJECT_STORE_ID, "readonly", TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function(res) {
    objectStore.openCursor().onsuccess = function(ev) {
      var cursor = ev.target.result;
      if (cursor) {
        var msgObk = cursor.value;
        if (msgObk.time < olderThen) {
          ret.push(msgObk);
          cursor["continue"]();
        } else {
          commitIndexedDBTransaction(tx);
          res(ret);
        }
      } else {
        res(ret);
      }
    };
  });
}
function cleanOldMessages(channelState) {
  return getOldMessages(channelState.db, channelState.options.idb.ttl).then(function(tooOld) {
    return removeMessagesById(channelState, tooOld.map(function(msg) {
      return msg.id;
    }));
  });
}
function create2(channelName, options) {
  options = fillOptionsWithDefaults(options);
  return createDatabase(channelName).then(function(db) {
    var state = {
      closed: false,
      lastCursorId: 0,
      channelName,
      options,
      uuid: randomToken(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new ObliviousSet(options.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: PROMISE_RESOLVED_VOID,
      messagesCallback: null,
      readQueuePromises: [],
      db
    };
    db.onclose = function() {
      state.closed = true;
      if (options.idb.onclose)
        options.idb.onclose();
    };
    _readLoop(state);
    return state;
  });
}
function _readLoop(state) {
  if (state.closed)
    return;
  readNewMessages(state).then(function() {
    return sleep(state.options.idb.fallbackInterval);
  }).then(function() {
    return _readLoop(state);
  });
}
function _filterMessage(msgObj, state) {
  if (msgObj.uuid === state.uuid)
    return false;
  if (state.eMIs.has(msgObj.id))
    return false;
  if (msgObj.data.time < state.messagesCallbackTime)
    return false;
  return true;
}
function readNewMessages(state) {
  if (state.closed)
    return PROMISE_RESOLVED_VOID;
  if (!state.messagesCallback)
    return PROMISE_RESOLVED_VOID;
  return getMessagesHigherThan(state.db, state.lastCursorId).then(function(newerMessages) {
    var useMessages = newerMessages.filter(function(msgObj) {
      return !!msgObj;
    }).map(function(msgObj) {
      if (msgObj.id > state.lastCursorId) {
        state.lastCursorId = msgObj.id;
      }
      return msgObj;
    }).filter(function(msgObj) {
      return _filterMessage(msgObj, state);
    }).sort(function(msgObjA, msgObjB) {
      return msgObjA.time - msgObjB.time;
    });
    useMessages.forEach(function(msgObj) {
      if (state.messagesCallback) {
        state.eMIs.add(msgObj.id);
        state.messagesCallback(msgObj.data);
      }
    });
    return PROMISE_RESOLVED_VOID;
  });
}
function close2(channelState) {
  channelState.closed = true;
  channelState.db.close();
}
function postMessage2(channelState, messageJson) {
  channelState.writeBlockPromise = channelState.writeBlockPromise.then(function() {
    return writeMessage(channelState.db, channelState.uuid, messageJson);
  }).then(function() {
    if (randomInt(0, 10) === 0) {
      cleanOldMessages(channelState);
    }
  });
  return channelState.writeBlockPromise;
}
function onMessage2(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
  readNewMessages(channelState);
}
function canBeUsed2() {
  return !!getIdb();
}
function averageResponseTime2(options) {
  return options.idb.fallbackInterval * 2;
}
var IndexedDBMethod = {
  create: create2,
  close: close2,
  onMessage: onMessage2,
  postMessage: postMessage2,
  canBeUsed: canBeUsed2,
  type: type2,
  averageResponseTime: averageResponseTime2,
  microSeconds: microSeconds3
};

// node_modules/broadcast-channel/dist/esbrowser/methods/localstorage.js
var microSeconds4 = microSeconds;
var KEY_PREFIX = "pubkey.broadcastChannel-";
var type3 = "localstorage";
function getLocalStorage() {
  var localStorage2;
  if (typeof window === "undefined")
    return null;
  try {
    localStorage2 = window.localStorage;
    localStorage2 = window["ie8-eventlistener/storage"] || window.localStorage;
  } catch (e) {
  }
  return localStorage2;
}
function storageKey(channelName) {
  return KEY_PREFIX + channelName;
}
function postMessage3(channelState, messageJson) {
  return new Promise(function(res) {
    sleep().then(function() {
      var key = storageKey(channelState.channelName);
      var writeObj = {
        token: randomToken(),
        time: (/* @__PURE__ */ new Date()).getTime(),
        data: messageJson,
        uuid: channelState.uuid
      };
      var value = JSON.stringify(writeObj);
      getLocalStorage().setItem(key, value);
      var ev = document.createEvent("Event");
      ev.initEvent("storage", true, true);
      ev.key = key;
      ev.newValue = value;
      window.dispatchEvent(ev);
      res();
    });
  });
}
function addStorageEventListener(channelName, fn) {
  var key = storageKey(channelName);
  var listener = function listener2(ev) {
    if (ev.key === key) {
      fn(JSON.parse(ev.newValue));
    }
  };
  window.addEventListener("storage", listener);
  return listener;
}
function removeStorageEventListener(listener) {
  window.removeEventListener("storage", listener);
}
function create3(channelName, options) {
  options = fillOptionsWithDefaults(options);
  if (!canBeUsed3()) {
    throw new Error("BroadcastChannel: localstorage cannot be used");
  }
  var uuid = randomToken();
  var eMIs = new ObliviousSet(options.localstorage.removeTimeout);
  var state = {
    channelName,
    uuid,
    eMIs
    // emittedMessagesIds
  };
  state.listener = addStorageEventListener(channelName, function(msgObj) {
    if (!state.messagesCallback)
      return;
    if (msgObj.uuid === uuid)
      return;
    if (!msgObj.token || eMIs.has(msgObj.token))
      return;
    if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime)
      return;
    eMIs.add(msgObj.token);
    state.messagesCallback(msgObj.data);
  });
  return state;
}
function close3(channelState) {
  removeStorageEventListener(channelState.listener);
}
function onMessage3(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
}
function canBeUsed3() {
  var ls = getLocalStorage();
  if (!ls)
    return false;
  try {
    var key = "__broadcastchannel_check";
    ls.setItem(key, "works");
    ls.removeItem(key);
  } catch (e) {
    return false;
  }
  return true;
}
function averageResponseTime3() {
  var defaultTime = 120;
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    return defaultTime * 2;
  }
  return defaultTime;
}
var LocalstorageMethod = {
  create: create3,
  close: close3,
  onMessage: onMessage3,
  postMessage: postMessage3,
  canBeUsed: canBeUsed3,
  type: type3,
  averageResponseTime: averageResponseTime3,
  microSeconds: microSeconds4
};

// node_modules/broadcast-channel/dist/esbrowser/methods/simulate.js
var microSeconds5 = microSeconds;
var type4 = "simulate";
var SIMULATE_CHANNELS = /* @__PURE__ */ new Set();
function create4(channelName) {
  var state = {
    name: channelName,
    messagesCallback: null
  };
  SIMULATE_CHANNELS.add(state);
  return state;
}
function close4(channelState) {
  SIMULATE_CHANNELS["delete"](channelState);
}
function postMessage4(channelState, messageJson) {
  return new Promise(function(res) {
    return setTimeout(function() {
      var channelArray = Array.from(SIMULATE_CHANNELS);
      channelArray.filter(function(channel) {
        return channel.name === channelState.name;
      }).filter(function(channel) {
        return channel !== channelState;
      }).filter(function(channel) {
        return !!channel.messagesCallback;
      }).forEach(function(channel) {
        return channel.messagesCallback(messageJson);
      });
      res();
    }, 5);
  });
}
function onMessage4(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed4() {
  return true;
}
function averageResponseTime4() {
  return 5;
}
var SimulateMethod = {
  create: create4,
  close: close4,
  onMessage: onMessage4,
  postMessage: postMessage4,
  canBeUsed: canBeUsed4,
  type: type4,
  averageResponseTime: averageResponseTime4,
  microSeconds: microSeconds5
};

// node_modules/broadcast-channel/dist/esbrowser/method-chooser.js
var METHODS = [
  NativeMethod,
  // fastest
  IndexedDBMethod,
  LocalstorageMethod
];
function chooseMethod(options) {
  var chooseMethods = [].concat(options.methods, METHODS).filter(Boolean);
  if (options.type) {
    if (options.type === "simulate") {
      return SimulateMethod;
    }
    var ret = chooseMethods.find(function(m) {
      return m.type === options.type;
    });
    if (!ret)
      throw new Error("method-type " + options.type + " not found");
    else
      return ret;
  }
  if (!options.webWorkerSupport) {
    chooseMethods = chooseMethods.filter(function(m) {
      return m.type !== "idb";
    });
  }
  var useMethod = chooseMethods.find(function(method) {
    return method.canBeUsed();
  });
  if (!useMethod) {
    throw new Error("No usable method found in " + JSON.stringify(METHODS.map(function(m) {
      return m.type;
    })));
  } else {
    return useMethod;
  }
}

// node_modules/broadcast-channel/dist/esbrowser/broadcast-channel.js
var OPEN_BROADCAST_CHANNELS = /* @__PURE__ */ new Set();
var lastId = 0;
var BroadcastChannel2 = function BroadcastChannel3(name, options) {
  this.id = lastId++;
  OPEN_BROADCAST_CHANNELS.add(this);
  this.name = name;
  if (ENFORCED_OPTIONS) {
    options = ENFORCED_OPTIONS;
  }
  this.options = fillOptionsWithDefaults(options);
  this.method = chooseMethod(this.options);
  this._iL = false;
  this._onML = null;
  this._addEL = {
    message: [],
    internal: []
  };
  this._uMP = /* @__PURE__ */ new Set();
  this._befC = [];
  this._prepP = null;
  _prepareChannel(this);
};
BroadcastChannel2._pubkey = true;
var ENFORCED_OPTIONS;
BroadcastChannel2.prototype = {
  postMessage: function postMessage5(msg) {
    if (this.closed) {
      throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(msg));
    }
    return _post(this, "message", msg);
  },
  postInternal: function postInternal(msg) {
    return _post(this, "internal", msg);
  },
  set onmessage(fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time,
      fn
    };
    _removeListenerObject(this, "message", this._onML);
    if (fn && typeof fn === "function") {
      this._onML = listenObj;
      _addListenerObject(this, "message", listenObj);
    } else {
      this._onML = null;
    }
  },
  addEventListener: function addEventListener(type5, fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time,
      fn
    };
    _addListenerObject(this, type5, listenObj);
  },
  removeEventListener: function removeEventListener(type5, fn) {
    var obj = this._addEL[type5].find(function(obj2) {
      return obj2.fn === fn;
    });
    _removeListenerObject(this, type5, obj);
  },
  close: function close5() {
    var _this = this;
    if (this.closed) {
      return;
    }
    OPEN_BROADCAST_CHANNELS["delete"](this);
    this.closed = true;
    var awaitPrepare = this._prepP ? this._prepP : PROMISE_RESOLVED_VOID;
    this._onML = null;
    this._addEL.message = [];
    return awaitPrepare.then(function() {
      return Promise.all(Array.from(_this._uMP));
    }).then(function() {
      return Promise.all(_this._befC.map(function(fn) {
        return fn();
      }));
    }).then(function() {
      return _this.method.close(_this._state);
    });
  },
  get type() {
    return this.method.type;
  },
  get isClosed() {
    return this.closed;
  }
};
function _post(broadcastChannel, type5, msg) {
  var time = broadcastChannel.method.microSeconds();
  var msgObj = {
    time,
    type: type5,
    data: msg
  };
  var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : PROMISE_RESOLVED_VOID;
  return awaitPrepare.then(function() {
    var sendPromise = broadcastChannel.method.postMessage(broadcastChannel._state, msgObj);
    broadcastChannel._uMP.add(sendPromise);
    sendPromise["catch"]().then(function() {
      return broadcastChannel._uMP["delete"](sendPromise);
    });
    return sendPromise;
  });
}
function _prepareChannel(channel) {
  var maybePromise = channel.method.create(channel.name, channel.options);
  if (isPromise2(maybePromise)) {
    channel._prepP = maybePromise;
    maybePromise.then(function(s) {
      channel._state = s;
    });
  } else {
    channel._state = maybePromise;
  }
}
function _hasMessageListeners(channel) {
  if (channel._addEL.message.length > 0)
    return true;
  if (channel._addEL.internal.length > 0)
    return true;
  return false;
}
function _addListenerObject(channel, type5, obj) {
  channel._addEL[type5].push(obj);
  _startListening(channel);
}
function _removeListenerObject(channel, type5, obj) {
  channel._addEL[type5] = channel._addEL[type5].filter(function(o) {
    return o !== obj;
  });
  _stopListening(channel);
}
function _startListening(channel) {
  if (!channel._iL && _hasMessageListeners(channel)) {
    var listenerFn = function listenerFn2(msgObj) {
      channel._addEL[msgObj.type].forEach(function(listenerObject) {
        var hundredMsInMicro = 100 * 1e3;
        var minMessageTime = listenerObject.time - hundredMsInMicro;
        if (msgObj.time >= minMessageTime) {
          listenerObject.fn(msgObj.data);
        }
      });
    };
    var time = channel.method.microSeconds();
    if (channel._prepP) {
      channel._prepP.then(function() {
        channel._iL = true;
        channel.method.onMessage(channel._state, listenerFn, time);
      });
    } else {
      channel._iL = true;
      channel.method.onMessage(channel._state, listenerFn, time);
    }
  }
}
function _stopListening(channel) {
  if (channel._iL && !_hasMessageListeners(channel)) {
    channel._iL = false;
    var time = channel.method.microSeconds();
    channel.method.onMessage(channel._state, null, time);
  }
}

// node_modules/unload/dist/es/browser.js
function addBrowser(fn) {
  if (typeof WorkerGlobalScope === "function" && self instanceof WorkerGlobalScope) {
    var oldClose = self.close.bind(self);
    self.close = function() {
      fn();
      return oldClose();
    };
  } else {
    if (typeof window.addEventListener !== "function") {
      return;
    }
    window.addEventListener("beforeunload", function() {
      fn();
    }, true);
    window.addEventListener("unload", function() {
      fn();
    }, true);
  }
}

// node_modules/unload/dist/es/node.js
function addNode(fn) {
  process.on("exit", function() {
    return fn();
  });
  process.on("beforeExit", function() {
    return fn().then(function() {
      return process.exit();
    });
  });
  process.on("SIGINT", function() {
    return fn().then(function() {
      return process.exit();
    });
  });
  process.on("uncaughtException", function(err) {
    return fn().then(function() {
      console.trace(err);
      process.exit(101);
    });
  });
}

// node_modules/unload/dist/es/index.js
var isNode = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
var USE_METHOD = isNode ? addNode : addBrowser;
var LISTENERS = /* @__PURE__ */ new Set();
var startedListening = false;
function startListening() {
  if (startedListening) {
    return;
  }
  startedListening = true;
  USE_METHOD(runAll);
}
function add(fn) {
  startListening();
  if (typeof fn !== "function") {
    throw new Error("Listener is no function");
  }
  LISTENERS.add(fn);
  var addReturn = {
    remove: function remove() {
      return LISTENERS["delete"](fn);
    },
    run: function run2() {
      LISTENERS["delete"](fn);
      return fn();
    }
  };
  return addReturn;
}
function runAll() {
  var promises = [];
  LISTENERS.forEach(function(fn) {
    promises.push(fn());
    LISTENERS["delete"](fn);
  });
  return Promise.all(promises);
}

// node_modules/broadcast-channel/dist/esbrowser/leader-election-util.js
function sendLeaderMessage(leaderElector, action) {
  var msgJson = {
    context: "leader",
    action,
    token: leaderElector.token
  };
  return leaderElector.broadcastChannel.postInternal(msgJson);
}
function beLeader(leaderElector) {
  leaderElector.isLeader = true;
  leaderElector._hasLeader = true;
  var unloadFn = add(function() {
    return leaderElector.die();
  });
  leaderElector._unl.push(unloadFn);
  var isLeaderListener = function isLeaderListener2(msg) {
    if (msg.context === "leader" && msg.action === "apply") {
      sendLeaderMessage(leaderElector, "tell");
    }
    if (msg.context === "leader" && msg.action === "tell" && !leaderElector._dpLC) {
      leaderElector._dpLC = true;
      leaderElector._dpL();
      sendLeaderMessage(leaderElector, "tell");
    }
  };
  leaderElector.broadcastChannel.addEventListener("internal", isLeaderListener);
  leaderElector._lstns.push(isLeaderListener);
  return sendLeaderMessage(leaderElector, "tell");
}

// node_modules/broadcast-channel/dist/esbrowser/leader-election-web-lock.js
var LeaderElectionWebLock = function LeaderElectionWebLock2(broadcastChannel, options) {
  var _this = this;
  this.broadcastChannel = broadcastChannel;
  broadcastChannel._befC.push(function() {
    return _this.die();
  });
  this._options = options;
  this.isLeader = false;
  this.isDead = false;
  this.token = randomToken();
  this._lstns = [];
  this._unl = [];
  this._dpL = function() {
  };
  this._dpLC = false;
  this._wKMC = {};
  this.lN = "pubkey-bc||" + broadcastChannel.method.type + "||" + broadcastChannel.name;
};
LeaderElectionWebLock.prototype = {
  hasLeader: function hasLeader() {
    var _this2 = this;
    return navigator.locks.query().then(function(locks) {
      var relevantLocks = locks.held ? locks.held.filter(function(lock) {
        return lock.name === _this2.lN;
      }) : [];
      if (relevantLocks && relevantLocks.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  },
  awaitLeadership: function awaitLeadership() {
    var _this3 = this;
    if (!this._wLMP) {
      this._wKMC.c = new AbortController();
      var returnPromise = new Promise(function(res, rej) {
        _this3._wKMC.res = res;
        _this3._wKMC.rej = rej;
      });
      this._wLMP = new Promise(function(res) {
        navigator.locks.request(_this3.lN, {
          signal: _this3._wKMC.c.signal
        }, function() {
          _this3._wKMC.c = void 0;
          beLeader(_this3);
          res();
          return returnPromise;
        })["catch"](function() {
        });
      });
    }
    return this._wLMP;
  },
  set onduplicate(_fn) {
  },
  die: function die() {
    var _this4 = this;
    this._lstns.forEach(function(listener) {
      return _this4.broadcastChannel.removeEventListener("internal", listener);
    });
    this._lstns = [];
    this._unl.forEach(function(uFn) {
      return uFn.remove();
    });
    this._unl = [];
    if (this.isLeader) {
      this.isLeader = false;
    }
    this.isDead = true;
    if (this._wKMC.res) {
      this._wKMC.res();
    }
    if (this._wKMC.c) {
      this._wKMC.c.abort("LeaderElectionWebLock.die() called");
    }
    return sendLeaderMessage(this, "death");
  }
};

// node_modules/broadcast-channel/dist/esbrowser/leader-election.js
var LeaderElection = function LeaderElection2(broadcastChannel, options) {
  var _this = this;
  this.broadcastChannel = broadcastChannel;
  this._options = options;
  this.isLeader = false;
  this._hasLeader = false;
  this.isDead = false;
  this.token = randomToken();
  this._aplQ = PROMISE_RESOLVED_VOID;
  this._aplQC = 0;
  this._unl = [];
  this._lstns = [];
  this._dpL = function() {
  };
  this._dpLC = false;
  var hasLeaderListener = function hasLeaderListener2(msg) {
    if (msg.context === "leader") {
      if (msg.action === "death") {
        _this._hasLeader = false;
      }
      if (msg.action === "tell") {
        _this._hasLeader = true;
      }
    }
  };
  this.broadcastChannel.addEventListener("internal", hasLeaderListener);
  this._lstns.push(hasLeaderListener);
};
LeaderElection.prototype = {
  hasLeader: function hasLeader2() {
    return Promise.resolve(this._hasLeader);
  },
  /**
   * Returns true if the instance is leader,
   * false if not.
   * @async
   */
  applyOnce: function applyOnce(isFromFallbackInterval) {
    var _this2 = this;
    if (this.isLeader) {
      return sleep(0, true);
    }
    if (this.isDead) {
      return sleep(0, false);
    }
    if (this._aplQC > 1) {
      return this._aplQ;
    }
    var applyRun = function applyRun2() {
      if (_this2.isLeader) {
        return PROMISE_RESOLVED_TRUE;
      }
      var stopCriteria = false;
      var stopCriteriaPromiseResolve;
      var stopCriteriaPromise = new Promise(function(res) {
        stopCriteriaPromiseResolve = function stopCriteriaPromiseResolve2() {
          stopCriteria = true;
          res();
        };
      });
      var handleMessage = function handleMessage2(msg) {
        if (msg.context === "leader" && msg.token != _this2.token) {
          if (msg.action === "apply") {
            if (msg.token > _this2.token) {
              stopCriteriaPromiseResolve();
            }
          }
          if (msg.action === "tell") {
            stopCriteriaPromiseResolve();
            _this2._hasLeader = true;
          }
        }
      };
      _this2.broadcastChannel.addEventListener("internal", handleMessage);
      var waitForAnswerTime = isFromFallbackInterval ? _this2._options.responseTime * 4 : _this2._options.responseTime;
      return sendLeaderMessage(_this2, "apply").then(function() {
        return Promise.race([sleep(waitForAnswerTime), stopCriteriaPromise.then(function() {
          return Promise.reject(new Error());
        })]);
      }).then(function() {
        return sendLeaderMessage(_this2, "apply");
      }).then(function() {
        return Promise.race([sleep(waitForAnswerTime), stopCriteriaPromise.then(function() {
          return Promise.reject(new Error());
        })]);
      })["catch"](function() {
      }).then(function() {
        _this2.broadcastChannel.removeEventListener("internal", handleMessage);
        if (!stopCriteria) {
          return beLeader(_this2).then(function() {
            return true;
          });
        } else {
          return false;
        }
      });
    };
    this._aplQC = this._aplQC + 1;
    this._aplQ = this._aplQ.then(function() {
      return applyRun();
    }).then(function() {
      _this2._aplQC = _this2._aplQC - 1;
    });
    return this._aplQ.then(function() {
      return _this2.isLeader;
    });
  },
  awaitLeadership: function awaitLeadership2() {
    if (
      /* _awaitLeadershipPromise */
      !this._aLP
    ) {
      this._aLP = _awaitLeadershipOnce(this);
    }
    return this._aLP;
  },
  set onduplicate(fn) {
    this._dpL = fn;
  },
  die: function die2() {
    var _this3 = this;
    this._lstns.forEach(function(listener) {
      return _this3.broadcastChannel.removeEventListener("internal", listener);
    });
    this._lstns = [];
    this._unl.forEach(function(uFn) {
      return uFn.remove();
    });
    this._unl = [];
    if (this.isLeader) {
      this._hasLeader = false;
      this.isLeader = false;
    }
    this.isDead = true;
    return sendLeaderMessage(this, "death");
  }
};
function _awaitLeadershipOnce(leaderElector) {
  if (leaderElector.isLeader) {
    return PROMISE_RESOLVED_VOID;
  }
  return new Promise(function(res) {
    var resolved = false;
    function finish() {
      if (resolved) {
        return;
      }
      resolved = true;
      leaderElector.broadcastChannel.removeEventListener("internal", whenDeathListener);
      res(true);
    }
    leaderElector.applyOnce().then(function() {
      if (leaderElector.isLeader) {
        finish();
      }
    });
    var tryOnFallBack = function tryOnFallBack2() {
      return sleep(leaderElector._options.fallbackInterval).then(function() {
        if (leaderElector.isDead || resolved) {
          return;
        }
        if (leaderElector.isLeader) {
          finish();
        } else {
          return leaderElector.applyOnce(true).then(function() {
            if (leaderElector.isLeader) {
              finish();
            } else {
              tryOnFallBack2();
            }
          });
        }
      });
    };
    tryOnFallBack();
    var whenDeathListener = function whenDeathListener2(msg) {
      if (msg.context === "leader" && msg.action === "death") {
        leaderElector._hasLeader = false;
        leaderElector.applyOnce().then(function() {
          if (leaderElector.isLeader) {
            finish();
          }
        });
      }
    };
    leaderElector.broadcastChannel.addEventListener("internal", whenDeathListener);
    leaderElector._lstns.push(whenDeathListener);
  });
}
function fillOptionsWithDefaults2(options, channel) {
  if (!options)
    options = {};
  options = JSON.parse(JSON.stringify(options));
  if (!options.fallbackInterval) {
    options.fallbackInterval = 3e3;
  }
  if (!options.responseTime) {
    options.responseTime = channel.method.averageResponseTime(channel.options);
  }
  return options;
}
function createLeaderElection(channel, options) {
  if (channel._leaderElector) {
    throw new Error("BroadcastChannel already has a leader-elector");
  }
  options = fillOptionsWithDefaults2(options, channel);
  var elector = supportsWebLockAPI() ? new LeaderElectionWebLock(channel, options) : new LeaderElection(channel, options);
  channel._befC.push(function() {
    return elector.die();
  });
  channel._leaderElector = elector;
  return elector;
}

// node_modules/@okta/okta-auth-js/esm/browser/services/SyncStorageService.js
var SyncStorageService = class {
  constructor(tokenManager, options = {}) {
    this.started = false;
    this.enablePostMessage = true;
    this.tokenManager = tokenManager;
    this.options = options;
    this.onTokenAddedHandler = this.onTokenAddedHandler.bind(this);
    this.onTokenRemovedHandler = this.onTokenRemovedHandler.bind(this);
    this.onTokenRenewedHandler = this.onTokenRenewedHandler.bind(this);
    this.onSetStorageHandler = this.onSetStorageHandler.bind(this);
    this.onSyncMessageHandler = this.onSyncMessageHandler.bind(this);
  }
  requiresLeadership() {
    return false;
  }
  isStarted() {
    return this.started;
  }
  canStart() {
    return !!this.options.syncStorage && isBrowser() && !this.started;
  }
  start() {
    return __async(this, null, function* () {
      if (!this.canStart()) {
        return;
      }
      const { syncChannelName } = this.options;
      try {
        this.channel = new BroadcastChannel2(syncChannelName);
      } catch (err) {
        throw new AuthSdkError("SyncStorageService is not supported in current browser.");
      }
      this.tokenManager.on(EVENT_ADDED, this.onTokenAddedHandler);
      this.tokenManager.on(EVENT_REMOVED, this.onTokenRemovedHandler);
      this.tokenManager.on(EVENT_RENEWED, this.onTokenRenewedHandler);
      this.tokenManager.on(EVENT_SET_STORAGE, this.onSetStorageHandler);
      this.channel.addEventListener("message", this.onSyncMessageHandler);
      this.started = true;
    });
  }
  stop() {
    return __async(this, null, function* () {
      var _a, _b;
      if (this.started) {
        this.tokenManager.off(EVENT_ADDED, this.onTokenAddedHandler);
        this.tokenManager.off(EVENT_REMOVED, this.onTokenRemovedHandler);
        this.tokenManager.off(EVENT_RENEWED, this.onTokenRenewedHandler);
        this.tokenManager.off(EVENT_SET_STORAGE, this.onSetStorageHandler);
        (_a = this.channel) === null || _a === void 0 ? void 0 : _a.removeEventListener("message", this.onSyncMessageHandler);
        yield (_b = this.channel) === null || _b === void 0 ? void 0 : _b.close();
        this.channel = void 0;
        this.started = false;
      }
    });
  }
  onTokenAddedHandler(key, token) {
    var _a;
    if (!this.enablePostMessage) {
      return;
    }
    (_a = this.channel) === null || _a === void 0 ? void 0 : _a.postMessage({
      type: EVENT_ADDED,
      key,
      token
    });
  }
  onTokenRemovedHandler(key, token) {
    var _a;
    if (!this.enablePostMessage) {
      return;
    }
    (_a = this.channel) === null || _a === void 0 ? void 0 : _a.postMessage({
      type: EVENT_REMOVED,
      key,
      token
    });
  }
  onTokenRenewedHandler(key, token, oldToken) {
    var _a;
    if (!this.enablePostMessage) {
      return;
    }
    (_a = this.channel) === null || _a === void 0 ? void 0 : _a.postMessage({
      type: EVENT_RENEWED,
      key,
      token,
      oldToken
    });
  }
  onSetStorageHandler(storage) {
    var _a;
    (_a = this.channel) === null || _a === void 0 ? void 0 : _a.postMessage({
      type: EVENT_SET_STORAGE,
      storage
    });
  }
  onSyncMessageHandler(msg) {
    this.enablePostMessage = false;
    switch (msg.type) {
      case EVENT_SET_STORAGE:
        this.tokenManager.getStorage().setStorage(msg.storage);
        break;
      case EVENT_ADDED:
        this.tokenManager.emitAdded(msg.key, msg.token);
        this.tokenManager.setExpireEventTimeout(msg.key, msg.token);
        break;
      case EVENT_REMOVED:
        this.tokenManager.clearExpireEventTimeout(msg.key);
        this.tokenManager.emitRemoved(msg.key, msg.token);
        break;
      case EVENT_RENEWED:
        this.tokenManager.emitRenewed(msg.key, msg.token, msg.oldToken);
        break;
    }
    this.enablePostMessage = true;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/services/LeaderElectionService.js
var LeaderElectionService = class {
  constructor(options = {}) {
    this.started = false;
    this.options = options;
    this.onLeaderDuplicate = this.onLeaderDuplicate.bind(this);
    this.onLeader = this.onLeader.bind(this);
  }
  onLeaderDuplicate() {
  }
  onLeader() {
    return __async(this, null, function* () {
      var _a, _b;
      yield (_b = (_a = this.options).onLeader) === null || _b === void 0 ? void 0 : _b.call(_a);
    });
  }
  isLeader() {
    var _a;
    return !!((_a = this.elector) === null || _a === void 0 ? void 0 : _a.isLeader);
  }
  hasLeader() {
    var _a;
    return !!((_a = this.elector) === null || _a === void 0 ? void 0 : _a.hasLeader);
  }
  start() {
    return __async(this, null, function* () {
      if (this.canStart()) {
        const { electionChannelName } = this.options;
        this.channel = new BroadcastChannel2(electionChannelName);
        this.elector = createLeaderElection(this.channel);
        this.elector.onduplicate = this.onLeaderDuplicate;
        this.elector.awaitLeadership().then(this.onLeader);
        this.started = true;
      }
    });
  }
  stop() {
    return __async(this, null, function* () {
      if (this.started) {
        if (this.elector) {
          yield this.elector.die();
          this.elector = void 0;
        }
        if (this.channel) {
          this.channel.postInternal = () => Promise.resolve();
          yield this.channel.close();
          this.channel = void 0;
        }
        this.started = false;
      }
    });
  }
  requiresLeadership() {
    return false;
  }
  isStarted() {
    return this.started;
  }
  canStart() {
    return isBrowser() && !this.started;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/services/RenewOnTabActivationService.js
var getNow = () => Math.floor(Date.now() / 1e3);
var RenewOnTabActivationService = class {
  constructor(tokenManager, options = {}) {
    this.started = false;
    this.lastHidden = -1;
    this.tokenManager = tokenManager;
    this.options = options;
    this.onPageVisbilityChange = this._onPageVisbilityChange.bind(this);
  }
  _onPageVisbilityChange() {
    if (document.hidden) {
      this.lastHidden = getNow();
    } else if (this.lastHidden > 0 && getNow() - this.lastHidden >= this.options.tabInactivityDuration) {
      const { accessToken, idToken } = this.tokenManager.getTokensSync();
      if (!!accessToken && this.tokenManager.hasExpired(accessToken)) {
        const key = this.tokenManager.getStorageKeyByType("accessToken");
        this.tokenManager.renew(key).catch(() => {
        });
      } else if (!!idToken && this.tokenManager.hasExpired(idToken)) {
        const key = this.tokenManager.getStorageKeyByType("idToken");
        this.tokenManager.renew(key).catch(() => {
        });
      }
    }
  }
  start() {
    return __async(this, null, function* () {
      if (this.canStart() && !!document) {
        document.addEventListener("visibilitychange", this.onPageVisbilityChange);
        this.started = true;
      }
    });
  }
  stop() {
    return __async(this, null, function* () {
      if (document) {
        document.removeEventListener("visibilitychange", this.onPageVisbilityChange);
        this.started = false;
      }
    });
  }
  canStart() {
    return isBrowser() && !!this.options.autoRenew && !!this.options.renewOnTabActivation && !this.started;
  }
  requiresLeadership() {
    return false;
  }
  isStarted() {
    return this.started;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/core/ServiceManager/browser.js
var AUTO_RENEW = "autoRenew";
var SYNC_STORAGE = "syncStorage";
var LEADER_ELECTION = "leaderElection";
var RENEW_ON_TAB_ACTIVATION = "renewOnTabActivation";
var ServiceManager = class _ServiceManager {
  constructor(sdk, options = {}) {
    this.sdk = sdk;
    this.onLeader = this.onLeader.bind(this);
    const { autoRenew, autoRemove, syncStorage } = sdk.tokenManager.getOptions();
    options.electionChannelName = options.electionChannelName || options.broadcastChannelName;
    this.options = Object.assign({}, _ServiceManager.defaultOptions, { autoRenew, autoRemove, syncStorage }, {
      electionChannelName: `${sdk.options.clientId}-election`,
      syncChannelName: `${sdk.options.clientId}-sync`
    }, removeNils(options));
    this.started = false;
    this.services = /* @__PURE__ */ new Map();
    _ServiceManager.knownServices.forEach((name) => {
      const svc = this.createService(name);
      if (svc) {
        this.services.set(name, svc);
      }
    });
  }
  onLeader() {
    return __async(this, null, function* () {
      if (this.started) {
        yield this.startServices();
      }
    });
  }
  isLeader() {
    var _a;
    return (_a = this.getService(LEADER_ELECTION)) === null || _a === void 0 ? void 0 : _a.isLeader();
  }
  isLeaderRequired() {
    return [...this.services.values()].some((srv) => srv.canStart() && srv.requiresLeadership());
  }
  start() {
    return __async(this, null, function* () {
      if (this.started) {
        return;
      }
      yield this.startServices();
      this.started = true;
    });
  }
  stop() {
    return __async(this, null, function* () {
      yield this.stopServices();
      this.started = false;
    });
  }
  getService(name) {
    return this.services.get(name);
  }
  startServices() {
    return __async(this, null, function* () {
      for (const [name, srv] of this.services.entries()) {
        if (this.canStartService(name, srv)) {
          yield srv.start();
        }
      }
    });
  }
  stopServices() {
    return __async(this, null, function* () {
      for (const srv of this.services.values()) {
        yield srv.stop();
      }
    });
  }
  canStartService(name, srv) {
    let canStart = srv.canStart() && !srv.isStarted();
    if (name === LEADER_ELECTION) {
      canStart && (canStart = this.isLeaderRequired());
    } else if (srv.requiresLeadership()) {
      canStart && (canStart = this.isLeader());
    }
    return canStart;
  }
  createService(name) {
    const tokenManager = this.sdk.tokenManager;
    let service;
    switch (name) {
      case LEADER_ELECTION:
        service = new LeaderElectionService(Object.assign(Object.assign({}, this.options), { onLeader: this.onLeader }));
        break;
      case AUTO_RENEW:
        service = new AutoRenewService(tokenManager, Object.assign({}, this.options));
        break;
      case SYNC_STORAGE:
        service = new SyncStorageService(tokenManager, Object.assign({}, this.options));
        break;
      case RENEW_ON_TAB_ACTIVATION:
        service = new RenewOnTabActivationService(tokenManager, Object.assign({}, this.options));
        break;
      default:
        throw new Error(`Unknown service ${name}`);
    }
    return service;
  }
};
ServiceManager.knownServices = [AUTO_RENEW, SYNC_STORAGE, LEADER_ELECTION, RENEW_ON_TAB_ACTIVATION];
ServiceManager.defaultOptions = {
  autoRenew: true,
  autoRemove: true,
  syncStorage: true,
  renewOnTabActivation: true,
  tabInactivityDuration: 1800
};

// node_modules/@okta/okta-auth-js/esm/browser/core/mixin.js
function mixinCore(Base) {
  return class OktaAuthCore extends Base {
    constructor(...args) {
      super(...args);
      this.authStateManager = new AuthStateManager(this);
      this.serviceManager = new ServiceManager(this, this.options.services);
    }
    start() {
      return __async(this, null, function* () {
        yield this.serviceManager.start();
        this.tokenManager.start();
        if (!this.token.isLoginRedirect()) {
          yield this.authStateManager.updateAuthState();
        }
      });
    }
    stop() {
      return __async(this, null, function* () {
        this.tokenManager.stop();
        yield this.serviceManager.stop();
      });
    }
    handleRedirect(originalUri) {
      return __async(this, null, function* () {
        yield this.handleLoginRedirect(void 0, originalUri);
      });
    }
    handleLoginRedirect(tokens, originalUri) {
      return __async(this, null, function* () {
        let state = this.options.state;
        if (tokens) {
          this.tokenManager.setTokens(tokens);
          originalUri = originalUri || this.getOriginalUri(this.options.state);
        } else if (this.isLoginRedirect()) {
          try {
            const oAuthResponse = yield parseOAuthResponseFromUrl(this, {});
            state = oAuthResponse.state;
            originalUri = originalUri || this.getOriginalUri(state);
            yield this.storeTokensFromRedirect();
          } catch (e) {
            yield this.authStateManager.updateAuthState();
            throw e;
          }
        } else {
          return;
        }
        yield this.authStateManager.updateAuthState();
        this.removeOriginalUri(state);
        const { restoreOriginalUri } = this.options;
        if (restoreOriginalUri) {
          yield restoreOriginalUri(this, originalUri);
        } else if (originalUri) {
          window.location.replace(originalUri);
        }
      });
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/session/api.js
var import_tiny_emitter21 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch20 = __toESM(require_browser_ponyfill(), 1);
function sessionExists(sdk) {
  return sdk.session.get().then(function(res) {
    if (res.status === "ACTIVE") {
      return true;
    }
    return false;
  }).catch(function() {
    return false;
  });
}
function getSession(sdk) {
  return get(sdk, "/api/v1/sessions/me", { withCredentials: true }).then(function(session) {
    var res = omit(session, "_links");
    res.refresh = function() {
      return post(sdk, getLink(session, "refresh").href, {}, { withCredentials: true });
    };
    res.user = function() {
      return get(sdk, getLink(session, "user").href, { withCredentials: true });
    };
    return res;
  }).catch(function() {
    return { status: "INACTIVE" };
  });
}
function closeSession(sdk) {
  return httpRequest(sdk, {
    url: sdk.getIssuerOrigin() + "/api/v1/sessions/me",
    method: "DELETE",
    withCredentials: true
  });
}
function refreshSession(sdk) {
  return post(sdk, "/api/v1/sessions/me/lifecycle/refresh", {}, { withCredentials: true });
}
function setCookieAndRedirect(sdk, sessionToken, redirectUrl) {
  redirectUrl = redirectUrl || window.location.href;
  window.location.assign(sdk.getIssuerOrigin() + "/login/sessionCookieRedirect" + toQueryString({
    checkAccountSetupComplete: true,
    token: sessionToken,
    redirectUrl
  }));
}

// node_modules/@okta/okta-auth-js/esm/browser/session/factory.js
function createSessionApi(sdk) {
  const session = {
    close: closeSession.bind(null, sdk),
    exists: sessionExists.bind(null, sdk),
    get: getSession.bind(null, sdk),
    refresh: refreshSession.bind(null, sdk),
    setCookieAndRedirect: setCookieAndRedirect.bind(null, sdk)
  };
  return session;
}

// node_modules/@okta/okta-auth-js/esm/browser/session/mixin.js
function mixinSession(Base) {
  return class OktaAuthSession extends Base {
    constructor(...args) {
      super(...args);
      this.session = createSessionApi(this);
    }
    closeSession() {
      return this.session.close().then(() => __async(this, null, function* () {
        this.clearStorage();
        return true;
      })).catch(function(e) {
        if (e.name === "AuthApiError" && e.errorCode === "E0000007") {
          return false;
        }
        throw e;
      });
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/core/factory.js
function createOktaAuthCore(StorageManagerConstructor, OptionsConstructor2, TransactionManagerConstructor) {
  const Base = createOktaAuthBase(OptionsConstructor2);
  const WithStorage = mixinStorage(Base, StorageManagerConstructor);
  const WithHttp = mixinHttp(WithStorage);
  const WithSession = mixinSession(WithHttp);
  const WithOAuth = mixinOAuth(WithSession, TransactionManagerConstructor);
  const Core = mixinCore(WithOAuth);
  return Core;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/webauthn.js
var webauthn_exports = {};
__export(webauthn_exports, {
  buildCredentialCreationOptions: () => buildCredentialCreationOptions,
  buildCredentialRequestOptions: () => buildCredentialRequestOptions,
  getAssertion: () => getAssertion,
  getAttestation: () => getAttestation
});
var getEnrolledCredentials = (authenticatorEnrollments = []) => {
  const credentials = [];
  authenticatorEnrollments.forEach((enrollement) => {
    if (enrollement.key === "webauthn") {
      credentials.push({
        type: "public-key",
        id: base64UrlToBuffer(enrollement.credentialId)
      });
    }
  });
  return credentials;
};
var buildCredentialCreationOptions = (activationData, authenticatorEnrollments) => {
  return {
    publicKey: {
      rp: activationData.rp,
      user: {
        id: base64UrlToBuffer(activationData.user.id),
        name: activationData.user.name,
        displayName: activationData.user.displayName
      },
      challenge: base64UrlToBuffer(activationData.challenge),
      pubKeyCredParams: activationData.pubKeyCredParams,
      attestation: activationData.attestation,
      authenticatorSelection: activationData.authenticatorSelection,
      excludeCredentials: getEnrolledCredentials(authenticatorEnrollments)
    }
  };
};
var buildCredentialRequestOptions = (challengeData, authenticatorEnrollments) => {
  return {
    publicKey: {
      challenge: base64UrlToBuffer(challengeData.challenge),
      userVerification: challengeData.userVerification,
      allowCredentials: getEnrolledCredentials(authenticatorEnrollments)
    }
  };
};
var getAttestation = (credential) => {
  const response = credential.response;
  const id = credential.id;
  const clientData = bufferToBase64Url(response.clientDataJSON);
  const attestation = bufferToBase64Url(response.attestationObject);
  return {
    id,
    clientData,
    attestation
  };
};
var getAssertion = (credential) => {
  const response = credential.response;
  const id = credential.id;
  const clientData = bufferToBase64Url(response.clientDataJSON);
  const authenticatorData = bufferToBase64Url(response.authenticatorData);
  const signatureData = bufferToBase64Url(response.signature);
  return {
    id,
    clientData,
    authenticatorData,
    signatureData
  };
};

// node_modules/@okta/okta-auth-js/esm/browser/idx/mixin.js
function mixinIdx(Base) {
  var _a;
  return _a = class OktaAuthIdx extends Base {
    constructor(...args) {
      super(...args);
      this.idx = createIdxAPI(this);
    }
  }, _a.webauthn = webauthn_exports, _a;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/factory/OktaAuthIdx.js
function createOktaAuthIdx(StorageManagerConstructor, OptionsConstructor2, TransactionManagerConstructor) {
  const Core = createOktaAuthCore(StorageManagerConstructor, OptionsConstructor2, TransactionManagerConstructor);
  const WithIdx2 = mixinIdx(Core);
  return WithIdx2;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/factory/minimalApi.js
function createMinimalIdxAPI(minimalSdk) {
  const sdk = minimalSdk;
  const boundStartTransaction = startTransaction.bind(null, sdk);
  const idx = {
    makeIdxResponse: makeIdxState2.bind(null, sdk),
    start: boundStartTransaction,
    startTransaction: boundStartTransaction,
    proceed: proceed.bind(null, sdk),
    canProceed: canProceed.bind(null, sdk),
    getSavedTransactionMeta: getSavedTransactionMeta.bind(null, sdk),
    createTransactionMeta: createTransactionMeta.bind(null, sdk),
    getTransactionMeta: getTransactionMeta.bind(null, sdk),
    saveTransactionMeta: saveTransactionMeta.bind(null, sdk),
    clearTransactionMeta: clearTransactionMeta.bind(null, sdk),
    isTransactionMetaValid
  };
  return idx;
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/mixinMinimal.js
function mixinMinimalIdx(Base) {
  var _a;
  return _a = class OktaAuthIdx extends Base {
    constructor(...args) {
      super(...args);
      this.idx = createMinimalIdxAPI(this);
    }
  }, _a.webauthn = webauthn_exports, _a;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/factory/baseApi.js
function createBaseTokenAPI(sdk) {
  const token = {
    prepareTokenParams: prepareTokenParams.bind(null, sdk),
    exchangeCodeForTokens: exchangeCodeForTokens.bind(null, sdk),
    decode: decodeToken
  };
  return token;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/mixin/minimal.js
var import_tiny_emitter22 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch21 = __toESM(require_browser_ponyfill(), 1);
function mixinMinimalOAuth(Base, TransactionManagerConstructor) {
  return class OktaAuthOAuth extends Base {
    constructor(...args) {
      super(...args);
      this.transactionManager = new TransactionManagerConstructor(Object.assign({
        storageManager: this.storageManager
      }, this.options.transactionManager));
      this.token = createBaseTokenAPI(this);
    }
    isLoginRedirect() {
      return isLoginRedirect(this);
    }
    isPKCE() {
      return !!this.options.pkce;
    }
    hasResponseType(responseType) {
      return hasResponseType(responseType, this.options);
    }
    isAuthorizationCodeFlow() {
      return this.hasResponseType("code");
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/factory/MinimalOktaAuthIdx.js
function createMinimalOktaAuthIdx(StorageManagerConstructor, OptionsConstructor2, TransactionManagerConstructor) {
  const Base = createOktaAuthBase(OptionsConstructor2);
  const WithStorage = mixinStorage(Base, StorageManagerConstructor);
  const WithHttp = mixinHttp(WithStorage);
  const WithSession = mixinSession(WithHttp);
  const WithOAuth = mixinMinimalOAuth(WithSession, TransactionManagerConstructor);
  const WithIdx2 = mixinMinimalIdx(WithOAuth);
  return WithIdx2;
}

// node_modules/@okta/okta-auth-js/esm/browser/core/options.js
var import_tiny_emitter24 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch23 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/storage/options/StorageOptionsConstructor.js
var import_tiny_emitter23 = __toESM(require_tiny_emitter(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/base/options.js
function createBaseOptionsConstructor() {
  return class BaseOptionsConstructor {
    constructor(args) {
      this.devMode = !!args.devMode;
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/storage/options/browser.js
function getStorage() {
  const storageUtil$1 = Object.assign({}, storageUtil, {
    inMemoryStore: {}
  });
  return storageUtil$1;
}
var STORAGE_MANAGER_OPTIONS = {
  token: {
    storageTypes: [
      "localStorage",
      "sessionStorage",
      "cookie"
    ]
  },
  cache: {
    storageTypes: [
      "localStorage",
      "sessionStorage",
      "cookie"
    ]
  },
  transaction: {
    storageTypes: [
      "sessionStorage",
      "localStorage",
      "cookie"
    ]
  },
  "shared-transaction": {
    storageTypes: [
      "localStorage"
    ]
  },
  "original-uri": {
    storageTypes: [
      "localStorage"
    ]
  }
};
function getCookieSettings(args = {}, isHTTPS2) {
  var cookieSettings = args.cookies || {};
  if (typeof cookieSettings.secure === "undefined") {
    cookieSettings.secure = isHTTPS2;
  }
  if (typeof cookieSettings.sameSite === "undefined") {
    cookieSettings.sameSite = cookieSettings.secure ? "none" : "lax";
  }
  if (cookieSettings.secure && !isHTTPS2) {
    warn('The current page is not being served with the HTTPS protocol.\nFor security reasons, we strongly recommend using HTTPS.\nIf you cannot use HTTPS, set "cookies.secure" option to false.');
    cookieSettings.secure = false;
  }
  if (cookieSettings.sameSite === "none" && !cookieSettings.secure) {
    cookieSettings.sameSite = "lax";
  }
  return cookieSettings;
}

// node_modules/@okta/okta-auth-js/esm/browser/storage/options/StorageOptionsConstructor.js
function createStorageOptionsConstructor() {
  const BaseOptionsConstructor = createBaseOptionsConstructor();
  return class StorageOptionsConstructor extends BaseOptionsConstructor {
    constructor(args) {
      super(args);
      this.cookies = getCookieSettings(args, isHTTPS());
      this.storageUtil = args.storageUtil || getStorage();
      this.storageManager = Object.assign(Object.assign({}, STORAGE_MANAGER_OPTIONS), args.storageManager);
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/fetch/fetchRequest.js
var import_cross_fetch22 = __toESM(require_browser_ponyfill(), 1);
var appJsonContentTypeRegex = /application\/\w*\+?json/;
function readData(response) {
  if (response.headers.get("Content-Type") && response.headers.get("Content-Type").toLowerCase().indexOf("application/json") >= 0) {
    return response.json().catch((e) => {
      return {
        error: e,
        errorSummary: "Could not parse server response"
      };
    });
  } else {
    return response.text();
  }
}
function formatResult(status, data, response) {
  const isObject2 = typeof data === "object";
  const headers = {};
  for (const pair of response.headers.entries()) {
    headers[pair[0]] = pair[1];
  }
  const result = {
    responseText: isObject2 ? JSON.stringify(data) : data,
    status,
    headers
  };
  if (isObject2) {
    result.responseType = "json";
    result.responseJSON = data;
  }
  return result;
}
function fetchRequest(method, url, args) {
  var body = args.data;
  var headers = args.headers || {};
  var contentType = headers["Content-Type"] || headers["content-type"] || "";
  if (body && typeof body !== "string") {
    if (appJsonContentTypeRegex.test(contentType)) {
      body = JSON.stringify(body);
    } else if (contentType === "application/x-www-form-urlencoded") {
      body = Object.entries(body).map(([param, value]) => `${param}=${encodeURIComponent(value)}`).join("&");
    }
  }
  var fetch = window.fetch || import_cross_fetch22.default;
  var fetchPromise = fetch(url, {
    method,
    headers: args.headers,
    body,
    credentials: args.withCredentials ? "include" : "omit"
  });
  if (!fetchPromise.finally) {
    fetchPromise = Promise.resolve(fetchPromise);
  }
  return fetchPromise.then(function(response) {
    var error = !response.ok;
    var status = response.status;
    return readData(response).then((data) => {
      return formatResult(status, data, response);
    }).then((result) => {
      var _a;
      if (error || ((_a = result.responseJSON) === null || _a === void 0 ? void 0 : _a.error)) {
        throw result;
      }
      return result;
    });
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/http/options.js
function createHttpOptionsConstructor() {
  const StorageOptionsConstructor = createStorageOptionsConstructor();
  return class HttpOptionsConstructor extends StorageOptionsConstructor {
    constructor(args) {
      super(args);
      this.issuer = args.issuer;
      this.transformErrorXHR = args.transformErrorXHR;
      this.headers = args.headers;
      this.httpRequestClient = args.httpRequestClient || fetchRequest;
      this.httpRequestInterceptors = args.httpRequestInterceptors;
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/options/browser.js
var enableSharedStorage = true;

// node_modules/@okta/okta-auth-js/esm/browser/oidc/options/OAuthOptionsConstructor.js
function assertValidConfig(args) {
  args = args || {};
  var scopes = args.scopes;
  if (scopes && !Array.isArray(scopes)) {
    throw new AuthSdkError('scopes must be a array of strings. Required usage: new OktaAuth({scopes: ["openid", "email"]})');
  }
  var issuer = args.issuer;
  if (!issuer) {
    throw new AuthSdkError('No issuer passed to constructor. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})');
  }
  var isUrlRegex = new RegExp("^http?s?://.+");
  if (!isUrlRegex.test(issuer)) {
    throw new AuthSdkError('Issuer must be a valid URL. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})');
  }
  if (issuer.indexOf("-admin.okta") !== -1) {
    throw new AuthSdkError('Issuer URL passed to constructor contains "-admin" in subdomain. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com})');
  }
}
function createOAuthOptionsConstructor() {
  const HttpOptionsConstructor = createHttpOptionsConstructor();
  return class OAuthOptionsConstructor extends HttpOptionsConstructor {
    constructor(options) {
      super(options);
      assertValidConfig(options);
      this.issuer = removeTrailingSlash(options.issuer);
      this.tokenUrl = removeTrailingSlash(options.tokenUrl);
      this.authorizeUrl = removeTrailingSlash(options.authorizeUrl);
      this.userinfoUrl = removeTrailingSlash(options.userinfoUrl);
      this.revokeUrl = removeTrailingSlash(options.revokeUrl);
      this.logoutUrl = removeTrailingSlash(options.logoutUrl);
      this.pkce = options.pkce === false ? false : true;
      this.clientId = options.clientId;
      this.redirectUri = options.redirectUri;
      if (isBrowser()) {
        this.redirectUri = toAbsoluteUrl(options.redirectUri, window.location.origin);
      }
      this.responseType = options.responseType;
      this.responseMode = options.responseMode;
      this.state = options.state;
      this.scopes = options.scopes;
      this.ignoreSignature = !!options.ignoreSignature;
      this.codeChallenge = options.codeChallenge;
      this.codeChallengeMethod = options.codeChallengeMethod;
      this.acrValues = options.acrValues;
      this.maxAge = options.maxAge;
      this.dpop = options.dpop === true;
      this.tokenManager = options.tokenManager;
      this.postLogoutRedirectUri = options.postLogoutRedirectUri;
      this.restoreOriginalUri = options.restoreOriginalUri;
      this.transactionManager = Object.assign({ enableSharedStorage }, options.transactionManager);
      this.clientSecret = options.clientSecret;
      this.setLocation = options.setLocation;
      this.ignoreLifetime = !!options.ignoreLifetime;
      if (!options.maxClockSkew && options.maxClockSkew !== 0) {
        this.maxClockSkew = DEFAULT_MAX_CLOCK_SKEW;
      } else {
        this.maxClockSkew = options.maxClockSkew;
      }
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/core/options.js
function createCoreOptionsConstructor() {
  const OAuthOptionsConstructor = createOAuthOptionsConstructor();
  return class CoreOptionsConstructor extends OAuthOptionsConstructor {
    constructor(options) {
      super(options);
      this.services = options.services;
      this.transformAuthState = options.transformAuthState;
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/options.js
function createIdxOptionsConstructor() {
  const CoreOptionsConstructor = createCoreOptionsConstructor();
  return class IdxOptionsConstructor extends CoreOptionsConstructor {
    constructor(options) {
      super(options);
      this.flow = options.flow;
      this.activationToken = options.activationToken;
      this.recoveryToken = options.recoveryToken;
      this.idx = options.idx;
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/storage.js
var import_tiny_emitter26 = __toESM(require_tiny_emitter(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/storage/SavedObject.js
var SavedObject = class {
  constructor(storage, storageName) {
    if (!storage) {
      throw new AuthSdkError('"storage" is required');
    }
    if (typeof storageName !== "string" || !storageName.length) {
      throw new AuthSdkError('"storageName" is required');
    }
    this.storageName = storageName;
    this.storageProvider = storage;
  }
  getItem(key) {
    return this.getStorage()[key];
  }
  setItem(key, value) {
    return this.updateStorage(key, value);
  }
  removeItem(key) {
    return this.clearStorage(key);
  }
  getStorage() {
    var storageString = this.storageProvider.getItem(this.storageName);
    storageString = storageString || "{}";
    try {
      return JSON.parse(storageString);
    } catch (e) {
      throw new AuthSdkError("Unable to parse storage string: " + this.storageName);
    }
  }
  setStorage(obj) {
    try {
      var storageString = obj ? JSON.stringify(obj) : "{}";
      this.storageProvider.setItem(this.storageName, storageString);
    } catch (e) {
      throw new AuthSdkError("Unable to set storage: " + this.storageName);
    }
  }
  clearStorage(key) {
    if (!key) {
      if (this.storageProvider.removeItem) {
        this.storageProvider.removeItem(this.storageName);
      } else {
        this.setStorage();
      }
      return;
    }
    var obj = this.getStorage();
    delete obj[key];
    this.setStorage(obj);
  }
  updateStorage(key, value) {
    var obj = this.getStorage();
    obj[key] = value;
    this.setStorage(obj);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/storage/BaseStorageManager.js
function logServerSideMemoryStorageWarning(options) {
  if (!isBrowser() && !options.storageProvider && !options.storageKey) {
    warn("Memory storage can only support simple single user use case on server side, please provide custom storageProvider or storageKey if advanced scenarios need to be supported.");
  }
}
var BaseStorageManager = class {
  constructor(storageManagerOptions, cookieOptions, storageUtil2) {
    this.storageManagerOptions = storageManagerOptions;
    this.cookieOptions = cookieOptions;
    this.storageUtil = storageUtil2;
  }
  getOptionsForSection(sectionName, overrideOptions) {
    return Object.assign({}, this.storageManagerOptions[sectionName], overrideOptions);
  }
  getStorage(options) {
    options = Object.assign({}, this.cookieOptions, options);
    if (options.storageProvider) {
      return options.storageProvider;
    }
    let { storageType, storageTypes } = options;
    if (storageType === "sessionStorage") {
      options.sessionCookie = true;
    }
    if (storageType && storageTypes) {
      const idx = storageTypes.indexOf(storageType);
      if (idx >= 0) {
        storageTypes = storageTypes.slice(idx);
        storageType = void 0;
      }
    }
    if (!storageType) {
      storageType = this.storageUtil.findStorageType(storageTypes);
    }
    return this.storageUtil.getStorageByType(storageType, options);
  }
  getTokenStorage(options) {
    options = this.getOptionsForSection("token", options);
    logServerSideMemoryStorageWarning(options);
    const storage = this.getStorage(options);
    const storageKey2 = options.storageKey || TOKEN_STORAGE_NAME;
    return new SavedObject(storage, storageKey2);
  }
  getHttpCache(options) {
    options = this.getOptionsForSection("cache", options);
    const storage = this.getStorage(options);
    const storageKey2 = options.storageKey || CACHE_STORAGE_NAME;
    return new SavedObject(storage, storageKey2);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/oidc/storage.js
var import_tiny_emitter25 = __toESM(require_tiny_emitter(), 1);
function createOAuthStorageManager() {
  return class OAuthStorageManager extends BaseStorageManager {
    constructor(storageManagerOptions, cookieOptions, storageUtil2) {
      super(storageManagerOptions, cookieOptions, storageUtil2);
    }
    getTransactionStorage(options) {
      options = this.getOptionsForSection("transaction", options);
      logServerSideMemoryStorageWarning(options);
      const storage = this.getStorage(options);
      const storageKey2 = options.storageKey || TRANSACTION_STORAGE_NAME;
      return new SavedObject(storage, storageKey2);
    }
    getSharedTansactionStorage(options) {
      options = this.getOptionsForSection("shared-transaction", options);
      logServerSideMemoryStorageWarning(options);
      const storage = this.getStorage(options);
      const storageKey2 = options.storageKey || SHARED_TRANSACTION_STORAGE_NAME;
      return new SavedObject(storage, storageKey2);
    }
    getOriginalUriStorage(options) {
      options = this.getOptionsForSection("original-uri", options);
      logServerSideMemoryStorageWarning(options);
      const storage = this.getStorage(options);
      const storageKey2 = options.storageKey || ORIGINAL_URI_STORAGE_NAME;
      return new SavedObject(storage, storageKey2);
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/core/storage.js
function createCoreStorageManager() {
  return createOAuthStorageManager();
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/storage.js
function createIdxStorageManager() {
  const CoreStorageManager = createCoreStorageManager();
  return class IdxStorageManager extends CoreStorageManager {
    constructor(storageManagerOptions, cookieOptions, storageUtil2) {
      super(storageManagerOptions, cookieOptions, storageUtil2);
    }
    getIdxResponseStorage(options) {
      let storage;
      if (isBrowser()) {
        try {
          storage = this.storageUtil.getStorageByType("memory", options);
        } catch (e) {
          warn("No response storage found, you may want to provide custom implementation for intermediate idx responses to optimize the network traffic");
        }
      } else {
        const transactionStorage = this.getTransactionStorage(options);
        if (transactionStorage) {
          storage = {
            getItem: (key) => {
              const transaction = transactionStorage.getStorage();
              if (transaction && transaction[key]) {
                return transaction[key];
              }
              return null;
            },
            setItem: (key, val) => {
              const transaction = transactionStorage.getStorage();
              if (!transaction) {
                throw new AuthSdkError("Transaction has been cleared, failed to save idxState");
              }
              transaction[key] = val;
              transactionStorage.setStorage(transaction);
            },
            removeItem: (key) => {
              const transaction = transactionStorage.getStorage();
              if (!transaction) {
                return;
              }
              delete transaction[key];
              transactionStorage.setStorage(transaction);
            }
          };
        }
      }
      if (!storage) {
        return null;
      }
      return new SavedObject(storage, IDX_RESPONSE_STORAGE_NAME);
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/types/Transaction.js
function isObjectWithProperties(obj) {
  if (!obj || typeof obj !== "object" || Object.values(obj).length === 0) {
    return false;
  }
  return true;
}
function isOAuthTransactionMeta(obj) {
  if (!isObjectWithProperties(obj)) {
    return false;
  }
  return !!obj.redirectUri || !!obj.responseType;
}
function isPKCETransactionMeta(obj) {
  if (!isOAuthTransactionMeta(obj)) {
    return false;
  }
  return !!obj.codeVerifier;
}
function isIdxTransactionMeta(obj) {
  if (!isPKCETransactionMeta(obj)) {
    return false;
  }
  return !!obj.interactionHandle;
}
function isCustomAuthTransactionMeta(obj) {
  if (!isObjectWithProperties(obj)) {
    return false;
  }
  const isAllStringValues = Object.values(obj).find((value) => typeof value !== "string") === void 0;
  return isAllStringValues;
}
function isTransactionMeta(obj) {
  if (isOAuthTransactionMeta(obj) || isCustomAuthTransactionMeta(obj)) {
    return true;
  }
  return false;
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/util/sharedStorage.js
var MAX_ENTRY_LIFETIME = 30 * 60 * 1e3;
function pruneSharedStorage(storageManager) {
  const sharedStorage = storageManager.getSharedTansactionStorage();
  const entries = sharedStorage.getStorage();
  Object.keys(entries).forEach((state) => {
    const entry = entries[state];
    const age = Date.now() - entry.dateCreated;
    if (age > MAX_ENTRY_LIFETIME) {
      delete entries[state];
    }
  });
  sharedStorage.setStorage(entries);
}
function saveTransactionToSharedStorage(storageManager, state, meta) {
  const sharedStorage = storageManager.getSharedTansactionStorage();
  const entries = sharedStorage.getStorage();
  entries[state] = {
    dateCreated: Date.now(),
    transaction: meta
  };
  sharedStorage.setStorage(entries);
}
function loadTransactionFromSharedStorage(storageManager, state) {
  const sharedStorage = storageManager.getSharedTansactionStorage();
  const entries = sharedStorage.getStorage();
  const entry = entries[state];
  if (entry && entry.transaction && isTransactionMeta(entry.transaction)) {
    return entry.transaction;
  }
  return null;
}
function clearTransactionFromSharedStorage(storageManager, state) {
  const sharedStorage = storageManager.getSharedTansactionStorage();
  const entries = sharedStorage.getStorage();
  delete entries[state];
  sharedStorage.setStorage(entries);
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/TransactionManager.js
function createTransactionManager() {
  return class TransactionManager {
    constructor(options) {
      this.storageManager = options.storageManager;
      this.enableSharedStorage = options.enableSharedStorage === false ? false : true;
      this.saveLastResponse = options.saveLastResponse === false ? false : true;
      this.options = options;
    }
    clear(options = {}) {
      const transactionStorage = this.storageManager.getTransactionStorage();
      const meta = transactionStorage.getStorage();
      transactionStorage.clearStorage();
      if (this.enableSharedStorage && options.clearSharedStorage !== false) {
        const state = options.state || (meta === null || meta === void 0 ? void 0 : meta.state);
        if (state) {
          clearTransactionFromSharedStorage(this.storageManager, state);
        }
      }
    }
    save(meta, options = {}) {
      let storage = this.storageManager.getTransactionStorage();
      const obj = storage.getStorage();
      if (isTransactionMeta(obj) && !options.muteWarning) {
        warn("a saved auth transaction exists in storage. This may indicate another auth flow is already in progress.");
      }
      storage.setStorage(meta);
      if (this.enableSharedStorage && meta.state) {
        saveTransactionToSharedStorage(this.storageManager, meta.state, meta);
      }
    }
    exists(options = {}) {
      try {
        const meta = this.load(options);
        return !!meta;
      } catch (_a) {
        return false;
      }
    }
    load(options = {}) {
      let meta;
      if (this.enableSharedStorage && options.state) {
        pruneSharedStorage(this.storageManager);
        meta = loadTransactionFromSharedStorage(this.storageManager, options.state);
        if (isTransactionMeta(meta)) {
          return meta;
        }
      }
      let storage = this.storageManager.getTransactionStorage();
      meta = storage.getStorage();
      if (isTransactionMeta(meta)) {
        return meta;
      }
      return null;
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/idx/IdxTransactionManager.js
function createIdxTransactionManager() {
  const TransactionManager2 = createTransactionManager();
  return class IdxTransactionManager extends TransactionManager2 {
    constructor(options) {
      super(options);
    }
    clear(options = {}) {
      super.clear(options);
      if (options.clearIdxResponse !== false) {
        this.clearIdxResponse();
      }
    }
    saveIdxResponse(data) {
      if (!this.saveLastResponse) {
        return;
      }
      const storage = this.storageManager.getIdxResponseStorage();
      if (!storage) {
        return;
      }
      storage.setStorage(data);
    }
    loadIdxResponse(options) {
      if (!this.saveLastResponse) {
        return null;
      }
      const storage = this.storageManager.getIdxResponseStorage();
      if (!storage) {
        return null;
      }
      const storedValue = storage.getStorage();
      if (!storedValue || !isRawIdxResponse(storedValue.rawIdxResponse)) {
        return null;
      }
      if (options) {
        const { stateHandle, interactionHandle } = options;
        if (!options.useGenericRemediator && stateHandle && storedValue.stateHandle !== stateHandle) {
          return null;
        }
        if (interactionHandle && storedValue.interactionHandle !== interactionHandle) {
          return null;
        }
      }
      return storedValue;
    }
    clearIdxResponse() {
      if (!this.saveLastResponse) {
        return;
      }
      const storage = this.storageManager.getIdxResponseStorage();
      storage === null || storage === void 0 ? void 0 : storage.clearStorage();
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/Base.js
var BaseTransaction = class {
  constructor(oktaAuth, options) {
    const { res } = options;
    const { headers } = res, rest = __rest(res, ["headers"]);
    if (headers) {
      this.headers = headers;
    }
    Object.keys(rest).forEach((key) => {
      if (key === "_links") {
        return;
      }
      this[key] = rest[key];
    });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/request.js
var import_tiny_emitter27 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch24 = __toESM(require_browser_ponyfill(), 1);
function sendRequest(_0, _1) {
  return __async(this, arguments, function* (oktaAuth, options, TransactionClass = BaseTransaction) {
    const { accessToken: accessTokenObj } = oktaAuth.tokenManager.getTokensSync();
    const accessToken = options.accessToken || (accessTokenObj === null || accessTokenObj === void 0 ? void 0 : accessTokenObj.accessToken);
    const issuer = oktaAuth.getIssuerOrigin();
    const { url, method, payload } = options;
    const requestUrl = url.startsWith(issuer) ? url : `${issuer}${url}`;
    if (!accessToken) {
      throw new AuthSdkError("AccessToken is required to request MyAccount API endpoints.");
    }
    const res = yield httpRequest(oktaAuth, Object.assign({ headers: { "Accept": "*/*;okta-version=1.0.0" }, accessToken, url: requestUrl, method }, payload && { args: payload }));
    let ret;
    if (Array.isArray(res)) {
      ret = res.map((item) => new TransactionClass(oktaAuth, {
        res: item,
        accessToken
      }));
    } else {
      ret = new TransactionClass(oktaAuth, {
        res,
        accessToken
      });
    }
    return ret;
  });
}
function generateRequestFnFromLinks({ oktaAuth, accessToken, methodName, links }, TransactionClass = BaseTransaction) {
  for (const method of ["GET", "POST", "PUT", "DELETE"]) {
    if (method.toLowerCase() === methodName) {
      const link2 = links.self;
      return (payload) => __async(this, null, function* () {
        return sendRequest(oktaAuth, {
          accessToken,
          url: link2.href,
          method,
          payload
        }, TransactionClass);
      });
    }
  }
  const link = links[methodName];
  if (!link) {
    throw new AuthSdkError(`No link is found with methodName: ${methodName}`);
  }
  return (payload) => __async(this, null, function* () {
    return sendRequest(oktaAuth, {
      accessToken,
      url: link.href,
      method: link.hints.allow[0],
      payload
    }, TransactionClass);
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/ProfileTransaction.js
var ProfileTransaction = class extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { createdAt, modifiedAt, profile } = options.res;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.profile = profile;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/ProfileSchemaTransaction.js
var ProfileSchemaTransaction = class extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    this.properties = options.res.properties;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/types.js
var EmailRole;
(function(EmailRole2) {
  EmailRole2["PRIMARY"] = "PRIMARY";
  EmailRole2["SECONDARY"] = "SECONDARY";
})(EmailRole || (EmailRole = {}));
var Status;
(function(Status2) {
  Status2["VERIFIED"] = "VERIFIED";
  Status2["UNVERIFIED"] = "UNVERIFIED";
})(Status || (Status = {}));
var PasswordStatus;
(function(PasswordStatus2) {
  PasswordStatus2["NOT_ENROLLED"] = "NOT_ENROLLED";
  PasswordStatus2["ACTIVE"] = "ACTIVE";
})(PasswordStatus || (PasswordStatus = {}));

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/profileApi.js
var getProfile = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/profile",
    method: "GET",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  }, ProfileTransaction);
  return transaction;
});
var updateProfile = (oktaAuth, options) => __async(void 0, null, function* () {
  const { payload, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/profile",
    method: "PUT",
    payload,
    accessToken
  }, ProfileTransaction);
  return transaction;
});
var getProfileSchema = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/profile/schema",
    method: "GET",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  }, ProfileSchemaTransaction);
  return transaction;
});

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailStatusTransaction.js
var EmailStatusTransaction = class extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { res } = options;
    const { id, profile, expiresAt, status } = res;
    this.id = id;
    this.expiresAt = expiresAt;
    this.profile = profile;
    this.status = status;
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailChallengeTransaction.js
var EmailChallengeTransaction = class _EmailChallengeTransaction extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { accessToken, res } = options;
    const { id, expiresAt, profile, status, _links } = res;
    this.id = id;
    this.expiresAt = expiresAt;
    this.profile = profile;
    this.status = status;
    this.poll = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "poll",
        links: _links
      }, EmailStatusTransaction);
      return yield fn();
    });
    this.verify = (payload) => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "verify",
        links: _links
      }, _EmailChallengeTransaction);
      return yield fn(payload);
    });
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailTransaction.js
var EmailTransaction = class _EmailTransaction extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { accessToken, res } = options;
    const { id, profile, roles, status, _links } = res;
    this.id = id;
    this.profile = profile;
    this.roles = roles;
    this.status = status;
    this.get = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "get",
        links: _links
      }, _EmailTransaction);
      return yield fn();
    });
    this.delete = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "delete",
        links: _links
      });
      return yield fn();
    });
    this.challenge = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "challenge",
        links: _links
      }, EmailChallengeTransaction);
      return yield fn();
    });
    if (_links.poll) {
      this.poll = () => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "poll",
          links: _links
        }, EmailStatusTransaction);
        return yield fn();
      });
    }
    if (_links.verify) {
      this.verify = (payload) => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "verify",
          links: _links
        });
        return yield fn(payload);
      });
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/emailApi.js
var getEmails = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/emails",
    method: "GET",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  }, EmailTransaction);
  return transaction;
});
var getEmail = (oktaAuth, options) => __async(void 0, null, function* () {
  const { id, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/emails/${id}`,
    method: "GET",
    accessToken
  }, EmailTransaction);
  return transaction;
});
var addEmail = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, payload } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/emails",
    method: "POST",
    payload,
    accessToken
  }, EmailTransaction);
  return transaction;
});
var deleteEmail = (oktaAuth, options) => __async(void 0, null, function* () {
  const { id, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/emails/${id}`,
    method: "DELETE",
    accessToken
  });
  return transaction;
});
var sendEmailChallenge = (oktaAuth, options) => __async(void 0, null, function* () {
  const { id, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/emails/${id}/challenge`,
    method: "POST",
    accessToken
  }, EmailChallengeTransaction);
  return transaction;
});
var getEmailChallenge = (oktaAuth, options) => __async(void 0, null, function* () {
  const { emailId, challengeId, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/emails/${emailId}/challenge/${challengeId}`,
    method: "POST",
    accessToken
  }, EmailChallengeTransaction);
  return transaction;
});
var verifyEmailChallenge = (oktaAuth, options) => __async(void 0, null, function* () {
  const { emailId, challengeId, payload, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/emails/${emailId}/challenge/${challengeId}/verify`,
    method: "POST",
    payload,
    accessToken
  });
  return transaction;
});

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/PhoneTransaction.js
var PhoneTransaction = class _PhoneTransaction extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { res, accessToken } = options;
    const { id, profile, status, _links } = res;
    this.id = id;
    this.profile = profile;
    this.status = status;
    this.get = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "get",
        links: _links
      }, _PhoneTransaction);
      return yield fn();
    });
    this.delete = () => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "delete",
        links: _links
      });
      return yield fn();
    });
    this.challenge = (payload) => __async(this, null, function* () {
      const fn = generateRequestFnFromLinks({
        oktaAuth,
        accessToken,
        methodName: "challenge",
        links: _links
      });
      return yield fn(payload);
    });
    if (_links.verify) {
      this.verify = (payload) => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "verify",
          links: _links
        });
        return yield fn(payload);
      });
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/phoneApi.js
var getPhones = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/phones",
    method: "GET",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  }, PhoneTransaction);
  return transaction;
});
var getPhone = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, id } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/phones/${id}`,
    method: "GET",
    accessToken
  }, PhoneTransaction);
  return transaction;
});
var addPhone = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, payload } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/phones",
    method: "POST",
    payload,
    accessToken
  }, PhoneTransaction);
  return transaction;
});
var deletePhone = (oktaAuth, options) => __async(void 0, null, function* () {
  const { id, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/phones/${id}`,
    method: "DELETE",
    accessToken
  });
  return transaction;
});
var sendPhoneChallenge = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, id, payload } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/phones/${id}/challenge`,
    method: "POST",
    payload,
    accessToken
  });
  return transaction;
});
var verifyPhoneChallenge = (oktaAuth, options) => __async(void 0, null, function* () {
  const { id, payload, accessToken } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/phones/${id}/verify`,
    method: "POST",
    payload,
    accessToken
  });
  return transaction;
});

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/transactions/PasswordTransaction.js
var PasswordTransaction = class _PasswordTransaction extends BaseTransaction {
  constructor(oktaAuth, options) {
    super(oktaAuth, options);
    const { res, accessToken } = options;
    const { id, status, created, lastUpdated, _links } = res;
    this.id = id;
    this.status = status;
    this.created = created;
    this.lastUpdated = lastUpdated;
    if (this.status == PasswordStatus.NOT_ENROLLED) {
      this.enroll = (payload) => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "enroll",
          links: _links
        }, _PasswordTransaction);
        return yield fn(payload);
      });
    } else {
      this.get = () => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "get",
          links: _links
        }, _PasswordTransaction);
        return yield fn();
      });
      this.update = (payload) => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "put",
          links: _links
        }, _PasswordTransaction);
        return yield fn(payload);
      });
      this.delete = () => __async(this, null, function* () {
        const fn = generateRequestFnFromLinks({
          oktaAuth,
          accessToken,
          methodName: "delete",
          links: _links
        });
        return yield fn();
      });
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/passwordApi.js
var getPassword = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/password`,
    method: "GET",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  }, PasswordTransaction);
  return transaction;
});
var enrollPassword = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, payload } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/password",
    method: "POST",
    payload,
    accessToken
  }, PasswordTransaction);
  return transaction;
});
var updatePassword = (oktaAuth, options) => __async(void 0, null, function* () {
  const { accessToken, payload } = options;
  const transaction = yield sendRequest(oktaAuth, {
    url: "/idp/myaccount/password",
    method: "PUT",
    payload,
    accessToken
  }, PasswordTransaction);
  return transaction;
});
var deletePassword = (oktaAuth, options) => __async(void 0, null, function* () {
  const transaction = yield sendRequest(oktaAuth, {
    url: `/idp/myaccount/password`,
    method: "DELETE",
    accessToken: options === null || options === void 0 ? void 0 : options.accessToken
  });
  return transaction;
});

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/api.js
var api_exports = {};
__export(api_exports, {
  addEmail: () => addEmail,
  addPhone: () => addPhone,
  deleteEmail: () => deleteEmail,
  deletePassword: () => deletePassword,
  deletePhone: () => deletePhone,
  enrollPassword: () => enrollPassword,
  getEmail: () => getEmail,
  getEmailChallenge: () => getEmailChallenge,
  getEmails: () => getEmails,
  getPassword: () => getPassword,
  getPhone: () => getPhone,
  getPhones: () => getPhones,
  getProfile: () => getProfile,
  getProfileSchema: () => getProfileSchema,
  sendEmailChallenge: () => sendEmailChallenge,
  sendPhoneChallenge: () => sendPhoneChallenge,
  updatePassword: () => updatePassword,
  updateProfile: () => updateProfile,
  verifyEmailChallenge: () => verifyEmailChallenge,
  verifyPhoneChallenge: () => verifyPhoneChallenge
});

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/mixin.js
function mixinMyAccount(Base) {
  return class OktaAuthMyAccount extends Base {
    constructor(...args) {
      super(...args);
      this.myaccount = Object.entries(api_exports).filter(([name]) => name !== "default").reduce((acc, [name, fn]) => {
        acc[name] = fn.bind(null, this);
        return acc;
      }, {});
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/myaccount/factory.js
function createOktaAuthMyAccount(StorageManagerConstructor, OptionsConstructor2, TransactionManager2) {
  const Core = createOktaAuthCore(StorageManagerConstructor, OptionsConstructor2, TransactionManager2);
  const WithMyAccount2 = mixinMyAccount(Core);
  return WithMyAccount2;
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/api.js
var import_tiny_emitter28 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch25 = __toESM(require_browser_ponyfill(), 1);

// node_modules/@okta/okta-auth-js/esm/browser/authn/util/stateToken.js
function addStateToken(res, options) {
  var builtArgs = {};
  Object.assign(builtArgs, options);
  if (!builtArgs.stateToken && res.stateToken) {
    builtArgs.stateToken = res.stateToken;
  }
  return builtArgs;
}
function getStateToken(res) {
  return addStateToken(res);
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/api.js
function transactionStatus(sdk, args) {
  args = addStateToken(sdk, args);
  return post(sdk, sdk.getIssuerOrigin() + "/api/v1/authn", args, { withCredentials: true });
}
function resumeTransaction(sdk, tx, args) {
  if (!args || !args.stateToken) {
    var stateToken = getSavedStateToken(sdk);
    if (stateToken) {
      args = {
        stateToken
      };
    } else {
      return Promise.reject(new AuthSdkError("No transaction to resume"));
    }
  }
  return transactionStatus(sdk, args).then(function(res) {
    return tx.createTransaction(res);
  });
}
function introspectAuthn(sdk, tx, args) {
  if (!args || !args.stateToken) {
    var stateToken = getSavedStateToken(sdk);
    if (stateToken) {
      args = {
        stateToken
      };
    } else {
      return Promise.reject(new AuthSdkError("No transaction to evaluate"));
    }
  }
  return transactionStep(sdk, args).then(function(res) {
    return tx.createTransaction(res);
  });
}
function transactionStep(sdk, args) {
  args = addStateToken(sdk, args);
  return post(sdk, sdk.getIssuerOrigin() + "/api/v1/authn/introspect", args, { withCredentials: true });
}
function transactionExists(sdk) {
  return !!getSavedStateToken(sdk);
}
function postToTransaction(sdk, tx, url, args, options) {
  options = Object.assign({ withCredentials: true }, options);
  return post(sdk, url, args, options).then(function(res) {
    return tx.createTransaction(res);
  });
}
function getSavedStateToken(sdk) {
  const storage = sdk.options.storageUtil.storage;
  return storage.get(STATE_TOKEN_KEY_NAME);
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/util/link2fn.js
var import_tiny_emitter29 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch26 = __toESM(require_browser_ponyfill(), 1);
function link2fn(sdk, tx, res, obj, link, ref) {
  if (Array.isArray(link)) {
    return function(name, opts) {
      if (!name) {
        throw new AuthSdkError("Must provide a link name");
      }
      var lk = find(link, { name });
      if (!lk) {
        throw new AuthSdkError("No link found for that name");
      }
      return link2fn(sdk, tx, res, obj, lk, ref)(opts);
    };
  } else if (link.hints && link.hints.allow && link.hints.allow.length === 1) {
    var method = link.hints.allow[0];
    switch (method) {
      case "GET":
        return function() {
          return get(sdk, link.href, { withCredentials: true });
        };
      case "POST":
        return function(opts) {
          if (ref && ref.isPolling) {
            ref.isPolling = false;
          }
          var data = addStateToken(res, opts);
          if (res.status === "MFA_ENROLL" || res.status === "FACTOR_ENROLL") {
            Object.assign(data, {
              factorType: obj.factorType,
              provider: obj.provider
            });
          }
          var params = {};
          var autoPush = data.autoPush;
          if (autoPush !== void 0) {
            if (typeof autoPush === "function") {
              try {
                params.autoPush = !!autoPush();
              } catch (e) {
                return Promise.reject(new AuthSdkError("AutoPush resulted in an error."));
              }
            } else if (autoPush !== null) {
              params.autoPush = !!autoPush;
            }
            data = omit(data, "autoPush");
          }
          var rememberDevice = data.rememberDevice;
          if (rememberDevice !== void 0) {
            if (typeof rememberDevice === "function") {
              try {
                params.rememberDevice = !!rememberDevice();
              } catch (e) {
                return Promise.reject(new AuthSdkError("RememberDevice resulted in an error."));
              }
            } else if (rememberDevice !== null) {
              params.rememberDevice = !!rememberDevice;
            }
            data = omit(data, "rememberDevice");
          } else if (data.profile && data.profile.updatePhone !== void 0) {
            if (data.profile.updatePhone) {
              params.updatePhone = true;
            }
            data.profile = omit(data.profile, "updatePhone");
          }
          var href = link.href + toQueryString(params);
          return postToTransaction(sdk, tx, href, data);
        };
    }
  }
}

// node_modules/@okta/okta-auth-js/esm/browser/errors/AuthPollStopError.js
var AuthPollStopError = class extends CustomError {
  constructor() {
    const message = "The poll was stopped by the sdk";
    super(message);
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/authn/util/poll.js
var import_tiny_emitter30 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch27 = __toESM(require_browser_ponyfill(), 1);
function getPollFn(sdk, res, ref) {
  return function(options) {
    var delay$1;
    var rememberDevice;
    var autoPush;
    var transactionCallBack;
    if (isNumber(options)) {
      delay$1 = options;
    } else if (isObject(options)) {
      options = options;
      delay$1 = options.delay;
      rememberDevice = options.rememberDevice;
      autoPush = options.autoPush;
      transactionCallBack = options.transactionCallBack;
    }
    if (!delay$1 && delay$1 !== 0) {
      delay$1 = DEFAULT_POLLING_DELAY;
    }
    var pollLink = getLink(res, "next", "poll");
    function pollFn() {
      var opts = {};
      if (typeof autoPush === "function") {
        try {
          opts.autoPush = !!autoPush();
        } catch (e) {
          return Promise.reject(new AuthSdkError("AutoPush resulted in an error."));
        }
      } else if (autoPush !== void 0 && autoPush !== null) {
        opts.autoPush = !!autoPush;
      }
      if (typeof rememberDevice === "function") {
        try {
          opts.rememberDevice = !!rememberDevice();
        } catch (e) {
          return Promise.reject(new AuthSdkError("RememberDevice resulted in an error."));
        }
      } else if (rememberDevice !== void 0 && rememberDevice !== null) {
        opts.rememberDevice = !!rememberDevice;
      }
      var href = pollLink.href + toQueryString(opts);
      return post(sdk, href, getStateToken(res), {
        saveAuthnState: false,
        withCredentials: true
      });
    }
    ref.isPolling = true;
    var retryCount = 0;
    var recursivePoll = function() {
      if (!ref.isPolling) {
        return Promise.reject(new AuthPollStopError());
      }
      return pollFn().then(function(pollRes) {
        retryCount = 0;
        if (pollRes.factorResult && pollRes.factorResult === "WAITING") {
          if (!ref.isPolling) {
            throw new AuthPollStopError();
          }
          if (typeof transactionCallBack === "function") {
            transactionCallBack(pollRes);
          }
          return delay(delay$1).then(recursivePoll);
        } else {
          ref.isPolling = false;
          return sdk.tx.createTransaction(pollRes);
        }
      }).catch(function(err) {
        if (err.xhr && (err.xhr.status === 0 || err.xhr.status === 429) && retryCount <= 4) {
          var delayLength = Math.pow(2, retryCount) * 1e3;
          retryCount++;
          return delay(delayLength).then(recursivePoll);
        }
        throw err;
      });
    };
    return recursivePoll().catch(function(err) {
      ref.isPolling = false;
      throw err;
    });
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/util/links2fns.js
function links2fns(sdk, tx, res, obj, ref) {
  var fns = {};
  for (var linkName in obj._links) {
    if (!Object.prototype.hasOwnProperty.call(obj._links, linkName)) {
      continue;
    }
    var link = obj._links[linkName];
    if (linkName === "next") {
      linkName = link.name;
    }
    if (link.type) {
      fns[linkName] = link;
      continue;
    }
    switch (linkName) {
      case "poll":
        fns.poll = getPollFn(sdk, res, ref);
        break;
      default:
        var fn = link2fn(sdk, tx, res, obj, link, ref);
        if (fn) {
          fns[linkName] = fn;
        }
    }
  }
  return fns;
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/util/flattenEmbedded.js
function flattenEmbedded(sdk, tx, res, obj, ref) {
  obj = obj || res;
  obj = clone(obj);
  if (Array.isArray(obj)) {
    var objArr = [];
    for (var o = 0, ol = obj.length; o < ol; o++) {
      objArr.push(flattenEmbedded(sdk, tx, res, obj[o], ref));
    }
    return objArr;
  }
  var embedded = obj._embedded || {};
  for (var key in embedded) {
    if (!Object.prototype.hasOwnProperty.call(embedded, key)) {
      continue;
    }
    if (isObject(embedded[key]) || Array.isArray(embedded[key])) {
      embedded[key] = flattenEmbedded(sdk, tx, res, embedded[key], ref);
    }
  }
  var fns = links2fns(sdk, tx, res, obj, ref);
  Object.assign(embedded, fns);
  obj = omit(obj, "_embedded", "_links");
  Object.assign(obj, embedded);
  return obj;
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/AuthnTransactionImpl.js
var AuthnTransactionImpl = class {
  constructor(sdk, tx, res = null) {
    this.data = void 0;
    this.status = void 0;
    if (res) {
      this.data = res;
      Object.assign(this, flattenEmbedded(sdk, tx, res, res, {}));
      delete this.stateToken;
      if (res.status === "RECOVERY_CHALLENGE" && !res._links) {
        this.cancel = function() {
          return Promise.resolve(tx.createTransaction());
        };
      }
    }
  }
};

// node_modules/@okta/okta-auth-js/esm/browser/authn/factory.js
function createAuthnTransactionAPI(sdk) {
  const tx = {
    status: transactionStatus.bind(null, sdk),
    resume(args) {
      return resumeTransaction(sdk, tx, args);
    },
    exists: transactionExists.bind(null, sdk),
    introspect(args) {
      return introspectAuthn(sdk, tx, args);
    },
    createTransaction: (res) => {
      return new AuthnTransactionImpl(sdk, tx, res);
    },
    postToTransaction: (url, args, options) => {
      return postToTransaction(sdk, tx, url, args, options);
    }
  };
  return tx;
}

// node_modules/@okta/okta-auth-js/esm/browser/browser/fingerprint.js
var import_tiny_emitter31 = __toESM(require_tiny_emitter(), 1);
var import_cross_fetch28 = __toESM(require_browser_ponyfill(), 1);
function fingerprint(sdk, options) {
  options = options || {};
  if (!isFingerprintSupported()) {
    return Promise.reject(new AuthSdkError("Fingerprinting is not supported on this device"));
  }
  var timeout;
  var iframe;
  var listener;
  var promise = new Promise(function(resolve, reject) {
    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    listener = function listener2(e) {
      if (!e || !e.data || e.origin !== sdk.getIssuerOrigin()) {
        return;
      }
      try {
        var msg = JSON.parse(e.data);
      } catch (err) {
        return;
      }
      if (!msg) {
        return;
      }
      if (msg.type === "FingerprintAvailable") {
        return resolve(msg.fingerprint);
      }
      if (msg.type === "FingerprintServiceReady") {
        e.source.postMessage(JSON.stringify({
          type: "GetFingerprint"
        }), e.origin);
      }
    };
    addListener(window, "message", listener);
    iframe.src = sdk.getIssuerOrigin() + "/auth/services/devicefingerprint";
    document.body.appendChild(iframe);
    timeout = setTimeout(function() {
      reject(new AuthSdkError("Fingerprinting timed out"));
    }, (options === null || options === void 0 ? void 0 : options.timeout) || 15e3);
  });
  return promise.finally(function() {
    clearTimeout(timeout);
    removeListener(window, "message", listener);
    if (document.body.contains(iframe)) {
      iframe.parentElement.removeChild(iframe);
    }
  });
}

// node_modules/@okta/okta-auth-js/esm/browser/authn/mixin.js
function mixinAuthn(Base) {
  return class OktaAuthTx extends Base {
    constructor(...args) {
      super(...args);
      this.authn = this.tx = createAuthnTransactionAPI(this);
      this.fingerprint = fingerprint.bind(null, this);
    }
    signIn(opts) {
      return __async(this, null, function* () {
        opts = clone(opts || {});
        const _postToTransaction = (options) => {
          delete opts.sendFingerprint;
          return this.tx.postToTransaction("/api/v1/authn", opts, options);
        };
        if (!opts.sendFingerprint) {
          return _postToTransaction();
        }
        return this.fingerprint().then(function(fingerprint2) {
          return _postToTransaction({
            headers: {
              "X-Device-Fingerprint": fingerprint2
            }
          });
        });
      });
    }
    signInWithCredentials(opts) {
      return __async(this, null, function* () {
        return this.signIn(opts);
      });
    }
    forgotPassword(opts) {
      return this.tx.postToTransaction("/api/v1/authn/recovery/password", opts);
    }
    unlockAccount(opts) {
      return this.tx.postToTransaction("/api/v1/authn/recovery/unlock", opts);
    }
    verifyRecoveryToken(opts) {
      return this.tx.postToTransaction("/api/v1/authn/recovery/token", opts);
    }
  };
}

// node_modules/@okta/okta-auth-js/esm/browser/oidc/factory/OktaAuthOAuth.js
function createOktaAuthOAuth(StorageManagerConstructor, OptionsConstructor2, TransactionManagerConstructor) {
  const Base = createOktaAuthBase(OptionsConstructor2);
  const WithStorage = mixinStorage(Base, StorageManagerConstructor);
  const WithHttp = mixinHttp(WithStorage);
  const WithSession = mixinSession(WithHttp);
  const WithOAuth = mixinOAuth(WithSession, TransactionManagerConstructor);
  return WithOAuth;
}

// node_modules/@okta/okta-auth-js/esm/browser/exports/exports/default.js
var OptionsConstructor = createIdxOptionsConstructor();
var StorageManager = createIdxStorageManager();
var TransactionManager = createIdxTransactionManager();
var WithIdx = createOktaAuthIdx(StorageManager, OptionsConstructor, TransactionManager);
var WithMyAccount = mixinMyAccount(WithIdx);
var WithAuthn = mixinAuthn(WithMyAccount);
var OktaAuth = class extends WithAuthn {
  constructor(options) {
    super(options);
  }
};

export {
  IdxStatus,
  AuthenticatorKey,
  IdxFeature,
  isAuthenticator,
  getNativeConsole,
  getConsole,
  warn,
  deprecate,
  deprecateWrap,
  bind,
  extend,
  removeNils,
  clone,
  omit,
  find,
  getLink,
  isString,
  isObject,
  isNumber,
  isFunction,
  isPromise,
  WWWAuthError,
  isoToUTCString,
  genRandomString,
  delay,
  split2,
  isAbsoluteUrl,
  toAbsoluteUrl,
  toRelativeUrl,
  toQueryString,
  removeTrailingSlash,
  AuthSdkError,
  generateState,
  generateNonce,
  getOAuthBaseUrl,
  getOAuthDomain,
  getOAuthUrls,
  createOAuthMeta,
  require_browser_ponyfill,
  TokenKind,
  isToken,
  isAccessToken,
  isIDToken,
  isRefreshToken,
  createTransactionMeta,
  hasSavedInteractionHandle,
  getSavedTransactionMeta,
  getTransactionMeta,
  saveTransactionMeta,
  clearTransactionMeta,
  isTransactionMetaValid,
  isTransactionMetaValidForFlow,
  isTransactionMetaValidForOptions,
  STATE_TOKEN_KEY_NAME,
  DEFAULT_POLLING_DELAY,
  DEFAULT_MAX_CLOCK_SKEW,
  DEFAULT_CACHE_DURATION,
  TOKEN_STORAGE_NAME,
  CACHE_STORAGE_NAME,
  PKCE_STORAGE_NAME,
  TRANSACTION_STORAGE_NAME,
  SHARED_TRANSACTION_STORAGE_NAME,
  ORIGINAL_URI_STORAGE_NAME,
  IDX_RESPONSE_STORAGE_NAME,
  ACCESS_TOKEN_STORAGE_KEY,
  ID_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  REFERRER_PATH_STORAGE_KEY,
  MIN_VERIFIER_LENGTH,
  MAX_VERIFIER_LENGTH,
  DEFAULT_CODE_CHALLENGE_METHOD,
  IDX_API_VERSION,
  AuthApiError,
  OAuthError,
  httpRequest,
  get,
  post,
  interact,
  isAuthApiError,
  isOAuthError,
  isWWWAuthError,
  introspect,
  authenticate,
  cancel,
  urlParamsToObject,
  isEmailVerifyCallbackError,
  isEmailVerifyCallback,
  parseEmailVerifyCallback,
  handleEmailVerifyCallback,
  canProceed,
  proceed,
  poll,
  startTransaction,
  register,
  recoverPassword,
  handleInteractionCodeRedirect,
  unlockAccount,
  isInteractionRequiredError,
  isAuthorizationCodeError,
  isRefreshTokenInvalidError,
  hasTokensInHash,
  hasAuthorizationCode,
  hasInteractionCode,
  hasErrorInUrl,
  isRedirectUri,
  isCodeFlow,
  hasResponseType,
  getHashOrSearch,
  isLoginRedirect,
  isInteractionRequired,
  createIdxAPI,
  createOktaAuthBase,
  mixinStorage,
  OktaUserAgent,
  setRequestHeader,
  mixinHttp,
  crypto_exports,
  PromiseQueue,
  PKCE,
  decodeToken,
  getDefaultTokenParams,
  postToTokenEndpoint,
  postRefreshToken,
  getWellKnown,
  getKey,
  validateClaims,
  verifyToken2 as verifyToken,
  handleOAuthResponse,
  exchangeCodeForTokens,
  getUserInfo,
  addListener,
  removeListener,
  loadFrame,
  loadPopup,
  addPostMessageListener,
  assertPKCESupport,
  validateCodeChallengeMethod,
  preparePKCE,
  prepareTokenParams,
  convertTokenParamsToOAuthParams,
  buildAuthorizeParams,
  getToken,
  getWithoutPrompt,
  getWithPopup,
  getWithRedirect,
  parseFromUrl,
  isSameRefreshToken,
  isRefreshTokenError,
  renewTokensWithRefresh,
  renewToken,
  renewTokens,
  revokeToken,
  oidcIntrospect,
  createEnrollAuthenticatorMeta,
  getDefaultEnrollAuthenticatorParams,
  prepareEnrollAuthenticatorParams,
  createTokenAPI,
  createEndpoints,
  validateToken,
  EVENT_EXPIRED,
  EVENT_RENEWED,
  EVENT_ADDED,
  EVENT_REMOVED,
  EVENT_ERROR,
  EVENT_SET_STORAGE,
  TokenManager,
  mixinOAuth,
  INITIAL_AUTH_STATE,
  AuthStateManager,
  ServiceManager,
  mixinCore,
  sessionExists,
  getSession,
  closeSession,
  refreshSession,
  setCookieAndRedirect,
  createSessionApi,
  mixinSession,
  createOktaAuthCore,
  mixinIdx,
  createOktaAuthIdx,
  createMinimalOktaAuthIdx,
  createBaseOptionsConstructor,
  createStorageOptionsConstructor,
  createHttpOptionsConstructor,
  createOAuthOptionsConstructor,
  createCoreOptionsConstructor,
  createIdxOptionsConstructor,
  SavedObject,
  logServerSideMemoryStorageWarning,
  BaseStorageManager,
  createOAuthStorageManager,
  createCoreStorageManager,
  createIdxStorageManager,
  isOAuthTransactionMeta,
  isPKCETransactionMeta,
  isIdxTransactionMeta,
  isCustomAuthTransactionMeta,
  isTransactionMeta,
  createTransactionManager,
  createIdxTransactionManager,
  EmailRole,
  Status,
  PasswordStatus,
  getProfile,
  updateProfile,
  getProfileSchema,
  getEmails,
  getEmail,
  addEmail,
  deleteEmail,
  sendEmailChallenge,
  getEmailChallenge,
  verifyEmailChallenge,
  getPhones,
  getPhone,
  addPhone,
  deletePhone,
  sendPhoneChallenge,
  verifyPhoneChallenge,
  getPassword,
  enrollPassword,
  updatePassword,
  deletePassword,
  mixinMyAccount,
  createOktaAuthMyAccount,
  AuthPollStopError,
  createAuthnTransactionAPI,
  mixinAuthn,
  createOktaAuthOAuth,
  OktaAuth
};
/*! Bundled license information:

@okta/okta-auth-js/esm/browser/idx/types/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/console.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/object.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/CustomError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/types.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/WWWAuthError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/misc.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/url.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/AuthSdkError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/oauth.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/oauthMeta.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)

@okta/okta-auth-js/esm/browser/oidc/types/Token.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/transactionMeta.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/constants.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/AuthApiError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/OAuthError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/http/request.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/interact.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/_virtual/_tslib.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/actionParser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/generateIdxAction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/remediationParser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/jsonpath.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/idxResponseParser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/makeIdxState.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/v1/parsers.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/idxState/index.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/types/idx-js.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/index.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/introspect.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/util.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/util.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Base/Remediator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/GenericRemediator/util.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/GenericRemediator/GenericRemediator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/util.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediate.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/run.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticate.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/Authenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/VerificationCodeAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/OktaVerifyTotp.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/OktaPassword.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/SecurityQuestionEnrollment.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/SecurityQuestionVerification.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/WebauthnEnrollment.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/WebauthnVerification.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/authenticator/getAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Base/VerifyAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/EnrollAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/EnrollPoll.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/SelectEnrollmentChannel.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/EnrollmentChannelData.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/ChallengeAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/ChallengePoll.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/ResetAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/EnrollProfile.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Identify.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/ReEnrollAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/ReEnrollAuthenticatorWarning.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/RedirectIdp.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Base/SelectAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorAuthenticate.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorEnroll.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/SelectAuthenticatorUnlockAccount.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/SelectEnrollProfile.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Base/AuthenticatorData.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/AuthenticatorVerificationData.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/AuthenticatorEnrollmentData.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/Skip.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/flow/AuthenticationFlow.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/flow/PasswordRecoveryFlow.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/flow/RegistrationFlow.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/flow/AccountUnlockFlow.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/flow/FlowSpecification.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/cancel.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/urlParams.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/emailVerify.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/proceed.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/poll.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/startTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/register.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/recoverPassword.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/handleInteractionCodeRedirect.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/unlockAccount.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/errors.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/loginRedirect.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/remediators/index.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/factory/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/crypto/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/features.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/base/factory.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/storage/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/http/OktaUserAgent.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/http/headers.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/http/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/crypto/base64.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/crypto/oidcHash.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/crypto/verifyToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/crypto/index.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/util/PromiseQueue.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/pkce.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/decodeToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/defaultTokenParams.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/dpop.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/endpoints/token.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/endpoints/well-known.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/validateClaims.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/verifyToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/handleOAuthResponse.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/exchangeCodeForTokens.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/getUserInfo.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/prepareTokenParams.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/endpoints/authorize.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/getToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/getWithoutPrompt.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/getWithPopup.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/getWithRedirect.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/parseFromUrl.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/refreshToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/renewTokensWithRefresh.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/renewToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/renewTokens.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/revokeToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/introspect.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/enrollAuthenticatorMeta.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/defaultEnrollAuthenticatorParams.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/prepareEnrollAuthenticatorParams.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/enrollAuthenticator.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/factory/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/validateToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/clock.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/types/TokenManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/TokenManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/browser/browserStorage.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/mixin/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/mixin/index.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/AuthStateManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/services/AutoRenewService.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/services/SyncStorageService.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/services/LeaderElectionService.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/services/RenewOnTabActivationService.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/ServiceManager/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/session/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/session/factory.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/session/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/factory.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/webauthn.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/factory/OktaAuthIdx.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/factory/minimalApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/mixinMinimal.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/factory/baseApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/mixin/minimal.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/factory/MinimalOktaAuthIdx.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/base/options.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/storage/options/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/storage/options/StorageOptionsConstructor.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/fetch/fetchRequest.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/http/options.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/options/browser.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/options/OAuthOptionsConstructor.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/options.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/options.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/storage/SavedObject.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/storage/BaseStorageManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/storage.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/core/storage.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/storage.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/types/Transaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/util/sharedStorage.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/TransactionManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/idx/IdxTransactionManager.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/Base.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/request.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/ProfileTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/ProfileSchemaTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/types.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/profileApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailStatusTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailChallengeTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/EmailTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/emailApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/PhoneTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/phoneApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/transactions/PasswordTransaction.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/passwordApi.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/myaccount/factory.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/util/stateToken.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/api.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/util/link2fn.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/errors/AuthPollStopError.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/util/poll.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/util/links2fns.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/util/flattenEmbedded.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/AuthnTransactionImpl.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/factory.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/browser/fingerprint.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/authn/mixin.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/oidc/factory/OktaAuthOAuth.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)

@okta/okta-auth-js/esm/browser/exports/exports/default.js:
  (*!
   * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
   * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
   *
   * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * 
   * See the License for the specific language governing permissions and limitations under the License.
   *)
*/
//# sourceMappingURL=chunk-3STTMA3D.js.map
