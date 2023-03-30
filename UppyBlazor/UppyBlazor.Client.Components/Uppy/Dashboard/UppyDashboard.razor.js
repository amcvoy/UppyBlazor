var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/namespace-emitter/index.js
var require_namespace_emitter = __commonJS({
  "node_modules/namespace-emitter/index.js"(exports, module) {
    module.exports = function createNamespaceEmitter() {
      var emitter = {};
      var _fns = emitter._fns = {};
      emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
        var toEmit = getListeners(event);
        if (toEmit.length) {
          emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
        }
      };
      emitter.on = function on(event, fn) {
        if (!_fns[event]) {
          _fns[event] = [];
        }
        _fns[event].push(fn);
      };
      emitter.once = function once(event, fn) {
        function one() {
          fn.apply(this, arguments);
          emitter.off(event, one);
        }
        this.on(event, one);
      };
      emitter.off = function off(event, fn) {
        var keep = [];
        if (event && fn) {
          var fns = this._fns[event];
          var i3 = 0;
          var l3 = fns ? fns.length : 0;
          for (i3; i3 < l3; i3++) {
            if (fns[i3] !== fn) {
              keep.push(fns[i3]);
            }
          }
        }
        keep.length ? this._fns[event] = keep : delete this._fns[event];
      };
      function getListeners(e3) {
        var out = _fns[e3] ? _fns[e3] : [];
        var idx = e3.indexOf(":");
        var args = idx === -1 ? [e3] : [e3.substring(0, idx), e3.substring(idx + 1)];
        var keys = Object.keys(_fns);
        var i3 = 0;
        var l3 = keys.length;
        for (i3; i3 < l3; i3++) {
          var key = keys[i3];
          if (key === "*") {
            out = out.concat(_fns[key]);
          }
          if (args.length === 2 && args[0] === key) {
            out = out.concat(_fns[key]);
            break;
          }
        }
        return out;
      }
      function emitAll(e3, fns, args) {
        var i3 = 0;
        var l3 = fns.length;
        for (i3; i3 < l3; i3++) {
          if (!fns[i3])
            break;
          fns[i3].event = e3;
          fns[i3].apply(fns[i3], args);
        }
      }
      return emitter;
    };
  }
});

// node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.throttle/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce3(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle4(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce3(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = throttle4;
  }
});

// node_modules/@transloadit/prettier-bytes/prettierBytes.js
var require_prettierBytes = __commonJS({
  "node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
    module.exports = function prettierBytes4(num) {
      if (typeof num !== "number" || isNaN(num)) {
        throw new TypeError(`Expected a number, got ${typeof num}`);
      }
      const neg = num < 0;
      const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (neg) {
        num = -num;
      }
      if (num < 1) {
        return `${(neg ? "-" : "") + num} B`;
      }
      const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
      num = Number(num / Math.pow(1024, exponent));
      const unit = units[exponent];
      if (num >= 10 || num % 1 === 0) {
        return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
      }
      return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
    };
  }
});

// node_modules/wildcard/index.js
var require_wildcard = __commonJS({
  "node_modules/wildcard/index.js"(exports, module) {
    "use strict";
    function WildcardMatcher(text, separator2) {
      this.text = text = text || "";
      this.hasWild = ~text.indexOf("*");
      this.separator = separator2;
      this.parts = text.split(separator2);
    }
    WildcardMatcher.prototype.match = function(input) {
      var matches = true;
      var parts = this.parts;
      var ii;
      var partsCount = parts.length;
      var testParts;
      if (typeof input == "string" || input instanceof String) {
        if (!this.hasWild && this.text != input) {
          matches = false;
        } else {
          testParts = (input || "").split(this.separator);
          for (ii = 0; matches && ii < partsCount; ii++) {
            if (parts[ii] === "*") {
              continue;
            } else if (ii < testParts.length) {
              matches = parts[ii] === testParts[ii];
            } else {
              matches = false;
            }
          }
          matches = matches && testParts;
        }
      } else if (typeof input.splice == "function") {
        matches = [];
        for (ii = input.length; ii--; ) {
          if (this.match(input[ii])) {
            matches[matches.length] = input[ii];
          }
        }
      } else if (typeof input == "object") {
        matches = {};
        for (var key in input) {
          if (this.match(key)) {
            matches[key] = input[key];
          }
        }
      }
      return matches;
    };
    module.exports = function(text, test, separator2) {
      var matcher = new WildcardMatcher(text, separator2 || /[\/\.]/);
      if (typeof test != "undefined") {
        return matcher.match(test);
      }
      return matcher;
    };
  }
});

// node_modules/mime-match/index.js
var require_mime_match = __commonJS({
  "node_modules/mime-match/index.js"(exports, module) {
    var wildcard = require_wildcard();
    var reMimePartSplit = /[\/\+\.]/;
    module.exports = function(target, pattern) {
      function test(pattern2) {
        var result = wildcard(pattern2, target, reMimePartSplit);
        return result && result.length >= 2;
      }
      return pattern ? test(pattern.split(";")[0]) : test;
    };
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      var nativeCodeString = "[native code]";
      function classNames10() {
        var classes = [];
        for (var i3 = 0; i3 < arguments.length; i3++) {
          var arg = arguments[i3];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames10.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames10.default = classNames10;
        module.exports = classNames10;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames10;
        });
      } else {
        window.classNames = classNames10;
      }
    })();
  }
});

// node_modules/lodash.debounce/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce3(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce3;
  }
});

// node_modules/is-shallow-equal/index.js
var require_is_shallow_equal = __commonJS({
  "node_modules/is-shallow-equal/index.js"(exports, module) {
    module.exports = function isShallowEqual(a3, b3) {
      if (a3 === b3)
        return true;
      for (var i3 in a3)
        if (!(i3 in b3))
          return false;
      for (var i3 in b3)
        if (a3[i3] !== b3[i3])
          return false;
      return true;
    };
  }
});

// node_modules/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js
var require_prettierBytes2 = __commonJS({
  "node_modules/@uppy/dashboard/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
    module.exports = function prettierBytes4(num) {
      if (typeof num !== "number" || isNaN(num)) {
        throw new TypeError("Expected a number, got " + typeof num);
      }
      var neg = num < 0;
      var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (neg) {
        num = -num;
      }
      if (num < 1) {
        return (neg ? "-" : "") + num + " B";
      }
      var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
      num = Number(num / Math.pow(1024, exponent));
      var unit = units[exponent];
      if (num >= 10 || num % 1 === 0) {
        return (neg ? "-" : "") + num.toFixed(0) + " " + unit;
      } else {
        return (neg ? "-" : "") + num.toFixed(1) + " " + unit;
      }
    };
  }
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports, module) {
    "use strict";
    module.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports) {
    "use strict";
    var has2 = Object.prototype.hasOwnProperty;
    var undef;
    function decode2(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e3) {
        return null;
      }
    }
    function encode2(input) {
      try {
        return encodeURIComponent(input);
      } catch (e3) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode2(part[1]), value = decode2(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has2.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode2(key);
          value = encode2(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports.stringify = querystringify;
    exports.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports, module) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match2 = protocolre.exec(address);
      var protocol = match2[1] ? match2[1].toLowerCase() : "";
      var forwardSlashes = !!match2[2];
      var otherSlashes = !!match2[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match2[2] + match2[3] + match2[4];
          slashesCount = match2[2].length + match2[3].length;
        } else {
          rest = match2[2] + match2[4];
          slashesCount = match2[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match2[3] + match2[4];
          slashesCount = match2[3].length;
        } else {
          rest = match2[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match2[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match2[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "")
        return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i3 = path.length, last = path[i3 - 1], unshift = false, up = 0;
      while (i3--) {
        if (path[i3] === ".") {
          path.splice(i3, 1);
        } else if (path[i3] === "..") {
          path.splice(i3, 1);
          up++;
        } else if (up) {
          if (i3 === 0)
            unshift = true;
          path.splice(i3, 1);
          up--;
        }
      }
      if (unshift)
        path.unshift("");
      if (last === "." || last === "..")
        path.push("");
      return path.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i3 = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i3 < instructions.length; i3++) {
        instruction = instructions[i3];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url[key] = url[key].toLowerCase();
      }
      if (parser)
        url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port)
            value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i3 = 0; i3 < rules.length; i3++) {
        var ins = rules[i3];
        if (ins[4])
          url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify)
        stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password)
          result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash)
        result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module.exports = Url;
  }
});

// node_modules/@uppy/utils/lib/hasProperty.js
function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

// node_modules/@uppy/utils/lib/Translator.js
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
function insertReplacement(source, rx, replacement) {
  const newParts = [];
  source.forEach((chunk) => {
    if (typeof chunk !== "string") {
      return newParts.push(chunk);
    }
    return rx[Symbol.split](chunk).forEach((raw, i3, list) => {
      if (raw !== "") {
        newParts.push(raw);
      }
      if (i3 < list.length - 1) {
        newParts.push(replacement);
      }
    });
  });
  return newParts;
}
function interpolate(phrase, options) {
  const dollarRegex = /\$/g;
  const dollarBillsYall = "$$$$";
  let interpolated = [phrase];
  if (options == null)
    return interpolated;
  for (const arg of Object.keys(options)) {
    if (arg !== "_") {
      let replacement = options[arg];
      if (typeof replacement === "string") {
        replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
      }
      interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
    }
  }
  return interpolated;
}
var _apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply");
var Translator = class {
  /**
   * @param {object|Array<object>} locales - locale or list of locales.
   */
  constructor(locales) {
    Object.defineProperty(this, _apply, {
      value: _apply2
    });
    this.locale = {
      strings: {},
      pluralize(n3) {
        if (n3 === 1) {
          return 0;
        }
        return 1;
      }
    };
    if (Array.isArray(locales)) {
      locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
    } else {
      _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
    }
  }
  /**
   * Public translate method
   *
   * @param {string} key
   * @param {object} options with values that will be used later to replace placeholders in string
   * @returns {string} translated (and interpolated)
   */
  translate(key, options) {
    return this.translateArray(key, options).join("");
  }
  /**
   * Get a translation and return the translated and interpolated parts as an array.
   *
   * @param {string} key
   * @param {object} options with values that will be used to replace placeholders
   * @returns {Array} The translated and interpolated parts, in order.
   */
  translateArray(key, options) {
    if (!has(this.locale.strings, key)) {
      throw new Error(`missing string: ${key}`);
    }
    const string = this.locale.strings[key];
    const hasPluralForms = typeof string === "object";
    if (hasPluralForms) {
      if (options && typeof options.smart_count !== "undefined") {
        const plural = this.locale.pluralize(options.smart_count);
        return interpolate(string[plural], options);
      }
      throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
    }
    return interpolate(string, options);
  }
};
function _apply2(locale) {
  if (!(locale != null && locale.strings)) {
    return;
  }
  const prevLocale = this.locale;
  this.locale = {
    ...prevLocale,
    strings: {
      ...prevLocale.strings,
      ...locale.strings
    }
  };
  this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
}

// node_modules/@uppy/core/lib/Uppy.js
var import_namespace_emitter = __toESM(require_namespace_emitter(), 1);

// node_modules/nanoid/non-secure/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var nanoid = (size = 21) => {
  let id11 = "";
  let i3 = size;
  while (i3--) {
    id11 += urlAlphabet[Math.random() * 64 | 0];
  }
  return id11;
};

// node_modules/@uppy/core/lib/Uppy.js
var import_lodash = __toESM(require_lodash(), 1);

// node_modules/@uppy/store-default/lib/index.js
function _classPrivateFieldLooseBase2(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id2 = 0;
function _classPrivateFieldLooseKey2(name) {
  return "__private_" + id2++ + "_" + name;
}
var packageJson = {
  "version": "3.0.2"
};
var _callbacks = /* @__PURE__ */ _classPrivateFieldLooseKey2("callbacks");
var _publish = /* @__PURE__ */ _classPrivateFieldLooseKey2("publish");
var DefaultStore = class {
  constructor() {
    Object.defineProperty(this, _publish, {
      value: _publish2
    });
    Object.defineProperty(this, _callbacks, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    this.state = {};
  }
  getState() {
    return this.state;
  }
  setState(patch) {
    const prevState = {
      ...this.state
    };
    const nextState = {
      ...this.state,
      ...patch
    };
    this.state = nextState;
    _classPrivateFieldLooseBase2(this, _publish)[_publish](prevState, nextState, patch);
  }
  subscribe(listener) {
    _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].add(listener);
    return () => {
      _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].delete(listener);
    };
  }
};
function _publish2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  _classPrivateFieldLooseBase2(this, _callbacks)[_callbacks].forEach((listener) => {
    listener(...args);
  });
}
DefaultStore.VERSION = packageJson.version;
var lib_default = DefaultStore;

// node_modules/@uppy/utils/lib/getFileNameAndExtension.js
function getFileNameAndExtension(fullFileName) {
  const lastDot = fullFileName.lastIndexOf(".");
  if (lastDot === -1 || lastDot === fullFileName.length - 1) {
    return {
      name: fullFileName,
      extension: void 0
    };
  }
  return {
    name: fullFileName.slice(0, lastDot),
    extension: fullFileName.slice(lastDot + 1)
  };
}

// node_modules/@uppy/utils/lib/mimeTypes.js
var mimeTypes_default = {
  md: "text/markdown",
  markdown: "text/markdown",
  mp4: "video/mp4",
  mp3: "audio/mp3",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  yaml: "text/yaml",
  yml: "text/yaml",
  csv: "text/csv",
  tsv: "text/tab-separated-values",
  tab: "text/tab-separated-values",
  avi: "video/x-msvideo",
  mks: "video/x-matroska",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  dicom: "application/dicom",
  doc: "application/msword",
  docm: "application/vnd.ms-word.document.macroenabled.12",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  dot: "application/msword",
  dotm: "application/vnd.ms-word.template.macroenabled.12",
  dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  xla: "application/vnd.ms-excel",
  xlam: "application/vnd.ms-excel.addin.macroenabled.12",
  xlc: "application/vnd.ms-excel",
  xlf: "application/x-xliff+xml",
  xlm: "application/vnd.ms-excel",
  xls: "application/vnd.ms-excel",
  xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xlt: "application/vnd.ms-excel",
  xltm: "application/vnd.ms-excel.template.macroenabled.12",
  xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  xlw: "application/vnd.ms-excel",
  txt: "text/plain",
  text: "text/plain",
  conf: "text/plain",
  log: "text/plain",
  pdf: "application/pdf",
  zip: "application/zip",
  "7z": "application/x-7z-compressed",
  rar: "application/x-rar-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
  dmg: "application/x-apple-diskimage"
};

// node_modules/@uppy/utils/lib/getFileType.js
function getFileType(file) {
  var _getFileNameAndExtens;
  if (file.type)
    return file.type;
  const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
  if (fileExtension && fileExtension in mimeTypes_default) {
    return mimeTypes_default[fileExtension];
  }
  return "application/octet-stream";
}

// node_modules/@uppy/utils/lib/generateFileID.js
function encodeCharacter(character) {
  return character.charCodeAt(0).toString(32);
}
function encodeFilename(name) {
  let suffix = "";
  return name.replace(/[^A-Z0-9]/ig, (character) => {
    suffix += `-${encodeCharacter(character)}`;
    return "/";
  }) + suffix;
}
function generateFileID(file) {
  let id11 = "uppy";
  if (typeof file.name === "string") {
    id11 += `-${encodeFilename(file.name.toLowerCase())}`;
  }
  if (file.type !== void 0) {
    id11 += `-${file.type}`;
  }
  if (file.meta && typeof file.meta.relativePath === "string") {
    id11 += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
  }
  if (file.data.size !== void 0) {
    id11 += `-${file.data.size}`;
  }
  if (file.data.lastModified !== void 0) {
    id11 += `-${file.data.lastModified}`;
  }
  return id11;
}

// node_modules/@uppy/core/lib/supportsUploadProgress.js
function supportsUploadProgress(userAgent) {
  if (userAgent == null && typeof navigator !== "undefined") {
    userAgent = navigator.userAgent;
  }
  if (!userAgent)
    return true;
  const m3 = /Edge\/(\d+\.\d+)/.exec(userAgent);
  if (!m3)
    return true;
  const edgeVersion = m3[1];
  let [major, minor] = edgeVersion.split(".");
  major = parseInt(major, 10);
  minor = parseInt(minor, 10);
  if (major < 15 || major === 15 && minor < 15063) {
    return true;
  }
  if (major > 18 || major === 18 && minor >= 18218) {
    return true;
  }
  return false;
}

// node_modules/@uppy/core/lib/getFileName.js
function getFileName(fileType, fileDescriptor) {
  if (fileDescriptor.name) {
    return fileDescriptor.name;
  }
  if (fileType.split("/")[0] === "image") {
    return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
  }
  return "noname";
}

// node_modules/@uppy/utils/lib/getTimeStamp.js
function pad(number) {
  return number < 10 ? `0${number}` : number.toString();
}
function getTimeStamp() {
  const date = /* @__PURE__ */ new Date();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

// node_modules/@uppy/core/lib/loggers.js
var justErrorsLogger = {
  debug: () => {
  },
  warn: () => {
  },
  error: function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
  }
};
var debugLogger = {
  debug: function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
  },
  warn: function() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
  },
  error: function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
  }
};

// node_modules/@uppy/core/lib/Restricter.js
var import_prettier_bytes = __toESM(require_prettierBytes(), 1);
var import_mime_match = __toESM(require_mime_match(), 1);
var defaultOptions = {
  maxFileSize: null,
  minFileSize: null,
  maxTotalFileSize: null,
  maxNumberOfFiles: null,
  minNumberOfFiles: null,
  allowedFileTypes: null,
  requiredMetaFields: []
};
var RestrictionError = class extends Error {
  constructor() {
    super(...arguments);
    this.isRestriction = true;
  }
};
var Restricter = class {
  constructor(getOpts, i18n) {
    this.i18n = i18n;
    this.getOpts = () => {
      const opts = getOpts();
      if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
        throw new TypeError("`restrictions.allowedFileTypes` must be an array");
      }
      return opts;
    };
  }
  validate(file, files) {
    const {
      maxFileSize,
      minFileSize,
      maxTotalFileSize,
      maxNumberOfFiles,
      allowedFileTypes
    } = this.getOpts().restrictions;
    if (maxNumberOfFiles) {
      const nonGhostFiles = files.filter((f3) => !f3.isGhost);
      if (nonGhostFiles.length + 1 > maxNumberOfFiles) {
        throw new RestrictionError(`${this.i18n("youCanOnlyUploadX", {
          smart_count: maxNumberOfFiles
        })}`);
      }
    }
    if (allowedFileTypes) {
      const isCorrectFileType = allowedFileTypes.some((type) => {
        if (type.includes("/")) {
          if (!file.type)
            return false;
          return (0, import_mime_match.default)(file.type.replace(/;.*?$/, ""), type);
        }
        if (type[0] === "." && file.extension) {
          return file.extension.toLowerCase() === type.slice(1).toLowerCase();
        }
        return false;
      });
      if (!isCorrectFileType) {
        const allowedFileTypesString = allowedFileTypes.join(", ");
        throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
          types: allowedFileTypesString
        }));
      }
    }
    if (maxTotalFileSize && file.size != null) {
      const totalFilesSize = files.reduce((total, f3) => total + f3.size, file.size);
      if (totalFilesSize > maxTotalFileSize) {
        throw new RestrictionError(this.i18n("exceedsSize", {
          size: (0, import_prettier_bytes.default)(maxTotalFileSize),
          file: file.name
        }));
      }
    }
    if (maxFileSize && file.size != null && file.size > maxFileSize) {
      throw new RestrictionError(this.i18n("exceedsSize", {
        size: (0, import_prettier_bytes.default)(maxFileSize),
        file: file.name
      }));
    }
    if (minFileSize && file.size != null && file.size < minFileSize) {
      throw new RestrictionError(this.i18n("inferiorSize", {
        size: (0, import_prettier_bytes.default)(minFileSize)
      }));
    }
  }
  validateMinNumberOfFiles(files) {
    const {
      minNumberOfFiles
    } = this.getOpts().restrictions;
    if (Object.keys(files).length < minNumberOfFiles) {
      throw new RestrictionError(this.i18n("youHaveToAtLeastSelectX", {
        smart_count: minNumberOfFiles
      }));
    }
  }
  getMissingRequiredMetaFields(file) {
    const error = new RestrictionError(this.i18n("missingRequiredMetaFieldOnFile", {
      fileName: file.name
    }));
    const {
      requiredMetaFields
    } = this.getOpts().restrictions;
    const missingFields = [];
    for (const field of requiredMetaFields) {
      if (!Object.hasOwn(file.meta, field) || file.meta[field] === "") {
        missingFields.push(field);
      }
    }
    return {
      missingFields,
      error
    };
  }
};

// node_modules/@uppy/core/lib/locale.js
var locale_default = {
  strings: {
    addBulkFilesFailed: {
      0: "Failed to add %{smart_count} file due to an internal error",
      1: "Failed to add %{smart_count} files due to internal errors"
    },
    youCanOnlyUploadX: {
      0: "You can only upload %{smart_count} file",
      1: "You can only upload %{smart_count} files"
    },
    youHaveToAtLeastSelectX: {
      0: "You have to select at least %{smart_count} file",
      1: "You have to select at least %{smart_count} files"
    },
    exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
    missingRequiredMetaField: "Missing required meta fields",
    missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
    inferiorSize: "This file is smaller than the allowed size of %{size}",
    youCanOnlyUploadFileTypes: "You can only upload: %{types}",
    noMoreFilesAllowed: "Cannot add more files",
    noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
    companionError: "Connection with Companion failed",
    authAborted: "Authentication aborted",
    companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
    failedToUpload: "Failed to upload %{file}",
    noInternetConnection: "No Internet connection",
    connectedToInternet: "Connected to the Internet",
    // Strings for remote providers
    noFilesFound: "You have no files or folders here",
    selectX: {
      0: "Select %{smart_count}",
      1: "Select %{smart_count}"
    },
    allFilesFromFolderNamed: "All files from folder %{name}",
    openFolderNamed: "Open folder %{name}",
    cancel: "Cancel",
    logOut: "Log out",
    filter: "Filter",
    resetFilter: "Reset filter",
    loading: "Loading...",
    authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
    authenticateWith: "Connect to %{pluginName}",
    signInWithGoogle: "Sign in with Google",
    searchImages: "Search for images",
    enterTextToSearch: "Enter text to search for images",
    search: "Search",
    emptyFolderAdded: "No files were added from empty folder",
    folderAlreadyAdded: 'The folder "%{folder}" was already added',
    folderAdded: {
      0: "Added %{smart_count} file from %{folder}",
      1: "Added %{smart_count} files from %{folder}"
    }
  }
};

// node_modules/@uppy/core/lib/Uppy.js
var _Symbol$for;
var _Symbol$for2;
function _classPrivateFieldLooseBase3(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id3 = 0;
function _classPrivateFieldLooseKey3(name) {
  return "__private_" + id3++ + "_" + name;
}
var packageJson2 = {
  "version": "3.1.1"
};
var _plugins = /* @__PURE__ */ _classPrivateFieldLooseKey3("plugins");
var _restricter = /* @__PURE__ */ _classPrivateFieldLooseKey3("restricter");
var _storeUnsubscribe = /* @__PURE__ */ _classPrivateFieldLooseKey3("storeUnsubscribe");
var _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey3("emitter");
var _preProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("preProcessors");
var _uploaders = /* @__PURE__ */ _classPrivateFieldLooseKey3("uploaders");
var _postProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey3("postProcessors");
var _informAndEmit = /* @__PURE__ */ _classPrivateFieldLooseKey3("informAndEmit");
var _checkRequiredMetaFieldsOnFile = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFieldsOnFile");
var _checkRequiredMetaFields = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkRequiredMetaFields");
var _assertNewUploadAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey3("assertNewUploadAllowed");
var _checkAndCreateFileStateObject = /* @__PURE__ */ _classPrivateFieldLooseKey3("checkAndCreateFileStateObject");
var _startIfAutoProceed = /* @__PURE__ */ _classPrivateFieldLooseKey3("startIfAutoProceed");
var _addListeners = /* @__PURE__ */ _classPrivateFieldLooseKey3("addListeners");
var _updateOnlineStatus = /* @__PURE__ */ _classPrivateFieldLooseKey3("updateOnlineStatus");
var _createUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("createUpload");
var _getUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("getUpload");
var _removeUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("removeUpload");
var _runUpload = /* @__PURE__ */ _classPrivateFieldLooseKey3("runUpload");
_Symbol$for = Symbol.for("uppy test: getPlugins");
_Symbol$for2 = Symbol.for("uppy test: createUpload");
var Uppy = class {
  /** @type {Record<string, BasePlugin[]>} */
  /**
   * Instantiate Uppy
   *
   * @param {object} opts — Uppy options
   */
  constructor(_opts) {
    Object.defineProperty(this, _runUpload, {
      value: _runUpload2
    });
    Object.defineProperty(this, _removeUpload, {
      value: _removeUpload2
    });
    Object.defineProperty(this, _getUpload, {
      value: _getUpload2
    });
    Object.defineProperty(this, _createUpload, {
      value: _createUpload2
    });
    Object.defineProperty(this, _addListeners, {
      value: _addListeners2
    });
    Object.defineProperty(this, _startIfAutoProceed, {
      value: _startIfAutoProceed2
    });
    Object.defineProperty(this, _checkAndCreateFileStateObject, {
      value: _checkAndCreateFileStateObject2
    });
    Object.defineProperty(this, _assertNewUploadAllowed, {
      value: _assertNewUploadAllowed2
    });
    Object.defineProperty(this, _checkRequiredMetaFields, {
      value: _checkRequiredMetaFields2
    });
    Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
      value: _checkRequiredMetaFieldsOnFile2
    });
    Object.defineProperty(this, _informAndEmit, {
      value: _informAndEmit2
    });
    Object.defineProperty(this, _plugins, {
      writable: true,
      value: /* @__PURE__ */ Object.create(null)
    });
    Object.defineProperty(this, _restricter, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _storeUnsubscribe, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _emitter, {
      writable: true,
      value: (0, import_namespace_emitter.default)()
    });
    Object.defineProperty(this, _preProcessors, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    Object.defineProperty(this, _uploaders, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    Object.defineProperty(this, _postProcessors, {
      writable: true,
      value: /* @__PURE__ */ new Set()
    });
    Object.defineProperty(this, _updateOnlineStatus, {
      writable: true,
      value: this.updateOnlineStatus.bind(this)
    });
    this.defaultLocale = locale_default;
    const defaultOptions4 = {
      id: "uppy",
      autoProceed: false,
      allowMultipleUploadBatches: true,
      debug: false,
      restrictions: defaultOptions,
      meta: {},
      onBeforeFileAdded: (currentFile) => currentFile,
      onBeforeUpload: (files) => files,
      store: new lib_default(),
      logger: justErrorsLogger,
      infoTimeout: 5e3
    };
    this.opts = {
      ...defaultOptions4,
      ..._opts,
      restrictions: {
        ...defaultOptions4.restrictions,
        ..._opts && _opts.restrictions
      }
    };
    if (_opts && _opts.logger && _opts.debug) {
      this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
    } else if (_opts && _opts.debug) {
      this.opts.logger = debugLogger;
    }
    this.log(`Using Core v${this.constructor.VERSION}`);
    this.i18nInit();
    this.calculateProgress = (0, import_lodash.default)(this.calculateProgress.bind(this), 500, {
      leading: true,
      trailing: true
    });
    this.store = this.opts.store;
    this.setState({
      plugins: {},
      files: {},
      currentUploads: {},
      allowNewUpload: true,
      capabilities: {
        uploadProgress: supportsUploadProgress(),
        individualCancellation: true,
        resumableUploads: false
      },
      totalProgress: 0,
      meta: {
        ...this.opts.meta
      },
      info: [],
      recoveredState: null
    });
    _classPrivateFieldLooseBase3(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
    _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
      this.emit("state-update", prevState, nextState, patch);
      this.updateAll(nextState);
    });
    if (this.opts.debug && typeof window !== "undefined") {
      window[this.opts.id] = this;
    }
    _classPrivateFieldLooseBase3(this, _addListeners)[_addListeners]();
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    _classPrivateFieldLooseBase3(this, _emitter)[_emitter].emit(event, ...args);
  }
  on(event, callback) {
    _classPrivateFieldLooseBase3(this, _emitter)[_emitter].on(event, callback);
    return this;
  }
  once(event, callback) {
    _classPrivateFieldLooseBase3(this, _emitter)[_emitter].once(event, callback);
    return this;
  }
  off(event, callback) {
    _classPrivateFieldLooseBase3(this, _emitter)[_emitter].off(event, callback);
    return this;
  }
  /**
   * Iterate on all plugins and run `update` on them.
   * Called each time state changes.
   *
   */
  updateAll(state) {
    this.iteratePlugins((plugin) => {
      plugin.update(state);
    });
  }
  /**
   * Updates state with a patch
   *
   * @param {object} patch {foo: 'bar'}
   */
  setState(patch) {
    this.store.setState(patch);
  }
  /**
   * Returns current state.
   *
   * @returns {object}
   */
  getState() {
    return this.store.getState();
  }
  /**
   * Shorthand to set state for a specific file.
   */
  setFileState(fileID, state) {
    if (!this.getState().files[fileID]) {
      throw new Error(`Can\u2019t set state for ${fileID} (the file could have been removed)`);
    }
    this.setState({
      files: {
        ...this.getState().files,
        [fileID]: {
          ...this.getState().files[fileID],
          ...state
        }
      }
    });
  }
  i18nInit() {
    const translator = new Translator([this.defaultLocale, this.opts.locale]);
    this.i18n = translator.translate.bind(translator);
    this.i18nArray = translator.translateArray.bind(translator);
    this.locale = translator.locale;
  }
  setOptions(newOpts) {
    this.opts = {
      ...this.opts,
      ...newOpts,
      restrictions: {
        ...this.opts.restrictions,
        ...newOpts && newOpts.restrictions
      }
    };
    if (newOpts.meta) {
      this.setMeta(newOpts.meta);
    }
    this.i18nInit();
    if (newOpts.locale) {
      this.iteratePlugins((plugin) => {
        plugin.setOptions();
      });
    }
    this.setState();
  }
  resetProgress() {
    const defaultProgress = {
      percentage: 0,
      bytesUploaded: 0,
      uploadComplete: false,
      uploadStarted: null
    };
    const files = {
      ...this.getState().files
    };
    const updatedFiles = {};
    Object.keys(files).forEach((fileID) => {
      updatedFiles[fileID] = {
        ...files[fileID],
        progress: {
          ...files[fileID].progress,
          ...defaultProgress
        }
      };
    });
    this.setState({
      files: updatedFiles,
      totalProgress: 0,
      allowNewUpload: true,
      error: null,
      recoveredState: null
    });
    this.emit("reset-progress");
  }
  addPreProcessor(fn) {
    _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].add(fn);
  }
  removePreProcessor(fn) {
    return _classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors].delete(fn);
  }
  addPostProcessor(fn) {
    _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].add(fn);
  }
  removePostProcessor(fn) {
    return _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].delete(fn);
  }
  addUploader(fn) {
    _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].add(fn);
  }
  removeUploader(fn) {
    return _classPrivateFieldLooseBase3(this, _uploaders)[_uploaders].delete(fn);
  }
  setMeta(data) {
    const updatedMeta = {
      ...this.getState().meta,
      ...data
    };
    const updatedFiles = {
      ...this.getState().files
    };
    Object.keys(updatedFiles).forEach((fileID) => {
      updatedFiles[fileID] = {
        ...updatedFiles[fileID],
        meta: {
          ...updatedFiles[fileID].meta,
          ...data
        }
      };
    });
    this.log("Adding metadata:");
    this.log(data);
    this.setState({
      meta: updatedMeta,
      files: updatedFiles
    });
  }
  setFileMeta(fileID, data) {
    const updatedFiles = {
      ...this.getState().files
    };
    if (!updatedFiles[fileID]) {
      this.log("Was trying to set metadata for a file that has been removed: ", fileID);
      return;
    }
    const newMeta = {
      ...updatedFiles[fileID].meta,
      ...data
    };
    updatedFiles[fileID] = {
      ...updatedFiles[fileID],
      meta: newMeta
    };
    this.setState({
      files: updatedFiles
    });
  }
  /**
   * Get a file object.
   *
   * @param {string} fileID The ID of the file object to return.
   */
  getFile(fileID) {
    return this.getState().files[fileID];
  }
  /**
   * Get all files in an array.
   */
  getFiles() {
    const {
      files
    } = this.getState();
    return Object.values(files);
  }
  getObjectOfFilesPerState() {
    const {
      files: filesObject,
      totalProgress,
      error
    } = this.getState();
    const files = Object.values(filesObject);
    const inProgressFiles = files.filter((_ref) => {
      let {
        progress
      } = _ref;
      return !progress.uploadComplete && progress.uploadStarted;
    });
    const newFiles = files.filter((file) => !file.progress.uploadStarted);
    const startedFiles = files.filter((file) => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
    const uploadStartedFiles = files.filter((file) => file.progress.uploadStarted);
    const pausedFiles = files.filter((file) => file.isPaused);
    const completeFiles = files.filter((file) => file.progress.uploadComplete);
    const erroredFiles = files.filter((file) => file.error);
    const inProgressNotPausedFiles = inProgressFiles.filter((file) => !file.isPaused);
    const processingFiles = files.filter((file) => file.progress.preprocess || file.progress.postprocess);
    return {
      newFiles,
      startedFiles,
      uploadStartedFiles,
      pausedFiles,
      completeFiles,
      erroredFiles,
      inProgressFiles,
      inProgressNotPausedFiles,
      processingFiles,
      isUploadStarted: uploadStartedFiles.length > 0,
      isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
      isAllErrored: !!error && erroredFiles.length === files.length,
      isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
      isUploadInProgress: inProgressFiles.length > 0,
      isSomeGhost: files.some((file) => file.isGhost)
    };
  }
  /*
  * @constructs
  * @param { Error } error
  * @param { undefined } file
  */
  /*
  * @constructs
  * @param { RestrictionError } error
  * @param { UppyFile | undefined } file
  */
  validateRestrictions(file, files) {
    if (files === void 0) {
      files = this.getFiles();
    }
    try {
      _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(file, files);
    } catch (err) {
      return err;
    }
    return null;
  }
  checkIfFileAlreadyExists(fileID) {
    const {
      files
    } = this.getState();
    if (files[fileID] && !files[fileID].isGhost) {
      return true;
    }
    return false;
  }
  /**
   * Create a file state object based on user-provided `addFile()` options.
   *
   * Note this is extremely side-effectful and should only be done when a file state object
   * will be added to state immediately afterward!
   *
   * The `files` value is passed in because it may be updated by the caller without updating the store.
   */
  /**
   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
   * try to guess file type in a clever way, check file against restrictions,
   * and start an upload if `autoProceed === true`.
   *
   * @param {object} file object to add
   * @returns {string} id for the added file
   */
  addFile(file) {
    _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
    const {
      files
    } = this.getState();
    let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, file);
    if (files[newFile.id] && files[newFile.id].isGhost) {
      newFile = {
        ...files[newFile.id],
        data: file.data,
        isGhost: false
      };
      this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
    }
    this.setState({
      files: {
        ...files,
        [newFile.id]: newFile
      }
    });
    this.emit("file-added", newFile);
    this.emit("files-added", [newFile]);
    this.log(`Added file: ${newFile.name}, ${newFile.id}, mime type: ${newFile.type}`);
    _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
    return newFile.id;
  }
  /**
   * Add multiple files to `state.files`. See the `addFile()` documentation.
   *
   * If an error occurs while adding a file, it is logged and the user is notified.
   * This is good for UI plugins, but not for programmatic use.
   * Programmatic users should usually still use `addFile()` on individual files.
   */
  addFiles(fileDescriptors) {
    _classPrivateFieldLooseBase3(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
    const files = {
      ...this.getState().files
    };
    const newFiles = [];
    const errors = [];
    for (let i3 = 0; i3 < fileDescriptors.length; i3++) {
      try {
        let newFile = _classPrivateFieldLooseBase3(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i3]);
        if (files[newFile.id] && files[newFile.id].isGhost) {
          newFile = {
            ...files[newFile.id],
            data: fileDescriptors[i3].data,
            isGhost: false
          };
          this.log(`Replaced blob in a ghost file: ${newFile.name}, ${newFile.id}`);
        }
        files[newFile.id] = newFile;
        newFiles.push(newFile);
      } catch (err) {
        if (!err.isRestriction) {
          errors.push(err);
        }
      }
    }
    this.setState({
      files
    });
    newFiles.forEach((newFile) => {
      this.emit("file-added", newFile);
    });
    this.emit("files-added", newFiles);
    if (newFiles.length > 5) {
      this.log(`Added batch of ${newFiles.length} files`);
    } else {
      Object.keys(newFiles).forEach((fileID) => {
        this.log(`Added file: ${newFiles[fileID].name}
 id: ${newFiles[fileID].id}
 type: ${newFiles[fileID].type}`);
      });
    }
    if (newFiles.length > 0) {
      _classPrivateFieldLooseBase3(this, _startIfAutoProceed)[_startIfAutoProceed]();
    }
    if (errors.length > 0) {
      let message = "Multiple errors occurred while adding files:\n";
      errors.forEach((subError) => {
        message += `
 * ${subError.message}`;
      });
      this.info({
        message: this.i18n("addBulkFilesFailed", {
          smart_count: errors.length
        }),
        details: message
      }, "error", this.opts.infoTimeout);
      if (typeof AggregateError === "function") {
        throw new AggregateError(errors, message);
      } else {
        const err = new Error(message);
        err.errors = errors;
        throw err;
      }
    }
  }
  removeFiles(fileIDs, reason) {
    const {
      files,
      currentUploads
    } = this.getState();
    const updatedFiles = {
      ...files
    };
    const updatedUploads = {
      ...currentUploads
    };
    const removedFiles = /* @__PURE__ */ Object.create(null);
    fileIDs.forEach((fileID) => {
      if (files[fileID]) {
        removedFiles[fileID] = files[fileID];
        delete updatedFiles[fileID];
      }
    });
    function fileIsNotRemoved(uploadFileID) {
      return removedFiles[uploadFileID] === void 0;
    }
    Object.keys(updatedUploads).forEach((uploadID) => {
      const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
      if (newFileIDs.length === 0) {
        delete updatedUploads[uploadID];
        return;
      }
      const {
        capabilities
      } = this.getState();
      if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
        throw new Error("individualCancellation is disabled");
      }
      updatedUploads[uploadID] = {
        ...currentUploads[uploadID],
        fileIDs: newFileIDs
      };
    });
    const stateUpdate = {
      currentUploads: updatedUploads,
      files: updatedFiles
    };
    if (Object.keys(updatedFiles).length === 0) {
      stateUpdate.allowNewUpload = true;
      stateUpdate.error = null;
      stateUpdate.recoveredState = null;
    }
    this.setState(stateUpdate);
    this.calculateTotalProgress();
    const removedFileIDs = Object.keys(removedFiles);
    removedFileIDs.forEach((fileID) => {
      this.emit("file-removed", removedFiles[fileID], reason);
    });
    if (removedFileIDs.length > 5) {
      this.log(`Removed ${removedFileIDs.length} files`);
    } else {
      this.log(`Removed files: ${removedFileIDs.join(", ")}`);
    }
  }
  removeFile(fileID, reason) {
    if (reason === void 0) {
      reason = null;
    }
    this.removeFiles([fileID], reason);
  }
  pauseResume(fileID) {
    if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
      return void 0;
    }
    const wasPaused = this.getFile(fileID).isPaused || false;
    const isPaused = !wasPaused;
    this.setFileState(fileID, {
      isPaused
    });
    this.emit("upload-pause", fileID, isPaused);
    return isPaused;
  }
  pauseAll() {
    const updatedFiles = {
      ...this.getState().files
    };
    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
    });
    inProgressUpdatedFiles.forEach((file) => {
      const updatedFile = {
        ...updatedFiles[file],
        isPaused: true
      };
      updatedFiles[file] = updatedFile;
    });
    this.setState({
      files: updatedFiles
    });
    this.emit("pause-all");
  }
  resumeAll() {
    const updatedFiles = {
      ...this.getState().files
    };
    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
    });
    inProgressUpdatedFiles.forEach((file) => {
      const updatedFile = {
        ...updatedFiles[file],
        isPaused: false,
        error: null
      };
      updatedFiles[file] = updatedFile;
    });
    this.setState({
      files: updatedFiles
    });
    this.emit("resume-all");
  }
  retryAll() {
    const updatedFiles = {
      ...this.getState().files
    };
    const filesToRetry = Object.keys(updatedFiles).filter((file) => {
      return updatedFiles[file].error;
    });
    filesToRetry.forEach((file) => {
      const updatedFile = {
        ...updatedFiles[file],
        isPaused: false,
        error: null
      };
      updatedFiles[file] = updatedFile;
    });
    this.setState({
      files: updatedFiles,
      error: null
    });
    this.emit("retry-all", filesToRetry);
    if (filesToRetry.length === 0) {
      return Promise.resolve({
        successful: [],
        failed: []
      });
    }
    const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](filesToRetry, {
      forceAllowNewUpload: true
      // create new upload even if allowNewUpload: false
    });
    return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
  }
  cancelAll(_temp) {
    let {
      reason = "user"
    } = _temp === void 0 ? {} : _temp;
    this.emit("cancel-all", {
      reason
    });
    if (reason === "user") {
      const {
        files
      } = this.getState();
      const fileIDs = Object.keys(files);
      if (fileIDs.length) {
        this.removeFiles(fileIDs, "cancel-all");
      }
      this.setState({
        totalProgress: 0,
        error: null,
        recoveredState: null
      });
    }
  }
  retryUpload(fileID) {
    this.setFileState(fileID, {
      error: null,
      isPaused: false
    });
    this.emit("upload-retry", fileID);
    const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload]([fileID], {
      forceAllowNewUpload: true
      // create new upload even if allowNewUpload: false
    });
    return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
  }
  logout() {
    this.iteratePlugins((plugin) => {
      if (plugin.provider && plugin.provider.logout) {
        plugin.provider.logout();
      }
    });
  }
  calculateProgress(file, data) {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
    this.setFileState(file.id, {
      progress: {
        ...this.getFile(file.id).progress,
        bytesUploaded: data.bytesUploaded,
        bytesTotal: data.bytesTotal,
        percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
      }
    });
    this.calculateTotalProgress();
  }
  calculateTotalProgress() {
    const files = this.getFiles();
    const inProgress = files.filter((file) => {
      return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
    });
    if (inProgress.length === 0) {
      this.emit("progress", 0);
      this.setState({
        totalProgress: 0
      });
      return;
    }
    const sizedFiles = inProgress.filter((file) => file.progress.bytesTotal != null);
    const unsizedFiles = inProgress.filter((file) => file.progress.bytesTotal == null);
    if (sizedFiles.length === 0) {
      const progressMax = inProgress.length * 100;
      const currentProgress = unsizedFiles.reduce((acc, file) => {
        return acc + file.progress.percentage;
      }, 0);
      const totalProgress2 = Math.round(currentProgress / progressMax * 100);
      this.setState({
        totalProgress: totalProgress2
      });
      return;
    }
    let totalSize = sizedFiles.reduce((acc, file) => {
      return acc + file.progress.bytesTotal;
    }, 0);
    const averageSize = totalSize / sizedFiles.length;
    totalSize += averageSize * unsizedFiles.length;
    let uploadedSize = 0;
    sizedFiles.forEach((file) => {
      uploadedSize += file.progress.bytesUploaded;
    });
    unsizedFiles.forEach((file) => {
      uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
    });
    let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
    if (totalProgress > 100) {
      totalProgress = 100;
    }
    this.setState({
      totalProgress
    });
    this.emit("progress", totalProgress);
  }
  /**
   * Registers listeners for all global actions, like:
   * `error`, `file-removed`, `upload-progress`
   */
  updateOnlineStatus() {
    const online = typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true;
    if (!online) {
      this.emit("is-offline");
      this.info(this.i18n("noInternetConnection"), "error", 0);
      this.wasOffline = true;
    } else {
      this.emit("is-online");
      if (this.wasOffline) {
        this.emit("back-online");
        this.info(this.i18n("connectedToInternet"), "success", 3e3);
        this.wasOffline = false;
      }
    }
  }
  getID() {
    return this.opts.id;
  }
  /**
   * Registers a plugin with Core.
   *
   * @param {object} Plugin object
   * @param {object} [opts] object with options to be passed to Plugin
   * @returns {object} self for chaining
   */
  // eslint-disable-next-line no-shadow
  use(Plugin, opts) {
    if (typeof Plugin !== "function") {
      const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
      throw new TypeError(msg);
    }
    const plugin = new Plugin(this, opts);
    const pluginId = plugin.id;
    if (!pluginId) {
      throw new Error("Your plugin must have an id");
    }
    if (!plugin.type) {
      throw new Error("Your plugin must have a type");
    }
    const existsPluginAlready = this.getPlugin(pluginId);
    if (existsPluginAlready) {
      const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
      throw new Error(msg);
    }
    if (Plugin.VERSION) {
      this.log(`Using ${pluginId} v${Plugin.VERSION}`);
    }
    if (plugin.type in _classPrivateFieldLooseBase3(this, _plugins)[_plugins]) {
      _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type].push(plugin);
    } else {
      _classPrivateFieldLooseBase3(this, _plugins)[_plugins][plugin.type] = [plugin];
    }
    plugin.install();
    return this;
  }
  /**
   * Find one Plugin by name.
   *
   * @param {string} id plugin id
   * @returns {BasePlugin|undefined}
   */
  getPlugin(id11) {
    for (const plugins of Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins])) {
      const foundPlugin = plugins.find((plugin) => plugin.id === id11);
      if (foundPlugin != null)
        return foundPlugin;
    }
    return void 0;
  }
  [_Symbol$for](type) {
    return _classPrivateFieldLooseBase3(this, _plugins)[_plugins][type];
  }
  /**
   * Iterate through all `use`d plugins.
   *
   * @param {Function} method that will be run on each plugin
   */
  iteratePlugins(method) {
    Object.values(_classPrivateFieldLooseBase3(this, _plugins)[_plugins]).flat(1).forEach(method);
  }
  /**
   * Uninstall and remove a plugin.
   *
   * @param {object} instance The plugin instance to remove.
   */
  removePlugin(instance) {
    this.log(`Removing plugin ${instance.id}`);
    this.emit("plugin-remove", instance);
    if (instance.uninstall) {
      instance.uninstall();
    }
    const list = _classPrivateFieldLooseBase3(this, _plugins)[_plugins][instance.type];
    const index = list.findIndex((item) => item.id === instance.id);
    if (index !== -1) {
      list.splice(index, 1);
    }
    const state = this.getState();
    const updatedState = {
      plugins: {
        ...state.plugins,
        [instance.id]: void 0
      }
    };
    this.setState(updatedState);
  }
  /**
   * Uninstall all plugins and close down this Uppy instance.
   */
  close(_temp2) {
    let {
      reason
    } = _temp2 === void 0 ? {} : _temp2;
    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
    this.cancelAll({
      reason
    });
    _classPrivateFieldLooseBase3(this, _storeUnsubscribe)[_storeUnsubscribe]();
    this.iteratePlugins((plugin) => {
      this.removePlugin(plugin);
    });
    if (typeof window !== "undefined" && window.removeEventListener) {
      window.removeEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
      window.removeEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
    }
  }
  hideInfo() {
    const {
      info
    } = this.getState();
    this.setState({
      info: info.slice(1)
    });
    this.emit("info-hidden");
  }
  /**
   * Set info message in `state.info`, so that UI plugins like `Informer`
   * can display the message.
   *
   * @param {string | object} message Message to be displayed by the informer
   * @param {string} [type]
   * @param {number} [duration]
   */
  info(message, type, duration2) {
    if (type === void 0) {
      type = "info";
    }
    if (duration2 === void 0) {
      duration2 = 3e3;
    }
    const isComplexMessage = typeof message === "object";
    this.setState({
      info: [...this.getState().info, {
        type,
        message: isComplexMessage ? message.message : message,
        details: isComplexMessage ? message.details : null
      }]
    });
    setTimeout(() => this.hideInfo(), duration2);
    this.emit("info-visible");
  }
  /**
   * Passes messages to a function, provided in `opts.logger`.
   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
   *
   * @param {string|object} message to log
   * @param {string} [type] optional `error` or `warning`
   */
  log(message, type) {
    const {
      logger
    } = this.opts;
    switch (type) {
      case "error":
        logger.error(message);
        break;
      case "warning":
        logger.warn(message);
        break;
      default:
        logger.debug(message);
        break;
    }
  }
  /**
   * Restore an upload by its ID.
   */
  restore(uploadID) {
    this.log(`Core: attempting to restore upload "${uploadID}"`);
    if (!this.getState().currentUploads[uploadID]) {
      _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
      return Promise.reject(new Error("Nonexistent upload"));
    }
    return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
  }
  /**
   * Create an upload for a bunch of files.
   *
   * @param {Array<string>} fileIDs File IDs to include in this upload.
   * @returns {string} ID of this upload.
   */
  [_Symbol$for2]() {
    return _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](...arguments);
  }
  /**
   * Add data to an upload's result object.
   *
   * @param {string} uploadID The ID of the upload.
   * @param {object} data Data properties to add to the result object.
   */
  addResultData(uploadID, data) {
    if (!_classPrivateFieldLooseBase3(this, _getUpload)[_getUpload](uploadID)) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
      return;
    }
    const {
      currentUploads
    } = this.getState();
    const currentUpload = {
      ...currentUploads[uploadID],
      result: {
        ...currentUploads[uploadID].result,
        ...data
      }
    };
    this.setState({
      currentUploads: {
        ...currentUploads,
        [uploadID]: currentUpload
      }
    });
  }
  /**
   * Remove an upload, eg. if it has been canceled or completed.
   *
   * @param {string} uploadID The ID of the upload.
   */
  /**
   * Start an upload for all the files that are not currently being uploaded.
   *
   * @returns {Promise}
   */
  upload() {
    var _classPrivateFieldLoo;
    if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase3(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
      this.log("No uploader type plugins are used", "warning");
    }
    let {
      files
    } = this.getState();
    const onBeforeUploadResult = this.opts.onBeforeUpload(files);
    if (onBeforeUploadResult === false) {
      return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
    }
    if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
      files = onBeforeUploadResult;
      this.setState({
        files
      });
    }
    return Promise.resolve().then(() => _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch((err) => {
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err);
      throw err;
    }).then(() => {
      if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
        throw new RestrictionError(this.i18n("missingRequiredMetaField"));
      }
    }).catch((err) => {
      throw err;
    }).then(() => {
      const {
        currentUploads
      } = this.getState();
      const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
      const waitingFileIDs = [];
      Object.keys(files).forEach((fileID) => {
        const file = this.getFile(fileID);
        if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
          waitingFileIDs.push(file.id);
        }
      });
      const uploadID = _classPrivateFieldLooseBase3(this, _createUpload)[_createUpload](waitingFileIDs);
      return _classPrivateFieldLooseBase3(this, _runUpload)[_runUpload](uploadID);
    }).catch((err) => {
      this.emit("error", err);
      this.log(err, "error");
      throw err;
    });
  }
};
function _informAndEmit2(error, file) {
  const {
    message,
    details = ""
  } = error;
  if (error.isRestriction) {
    this.emit("restriction-failed", file, error);
  } else {
    this.emit("error", error);
  }
  this.info({
    message,
    details
  }, "error", this.opts.infoTimeout);
  this.log(error, "warning");
}
function _checkRequiredMetaFieldsOnFile2(file) {
  const {
    missingFields,
    error
  } = _classPrivateFieldLooseBase3(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
  if (missingFields.length > 0) {
    this.setFileState(file.id, {
      missingRequiredMetaFields: missingFields
    });
    this.log(error.message);
    this.emit("restriction-failed", file, error);
    return false;
  }
  return true;
}
function _checkRequiredMetaFields2(files) {
  let success = true;
  for (const file of Object.values(files)) {
    if (!_classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
      success = false;
    }
  }
  return success;
}
function _assertNewUploadAllowed2(file) {
  const {
    allowNewUpload
  } = this.getState();
  if (allowNewUpload === false) {
    const error = new RestrictionError(this.i18n("noMoreFilesAllowed"));
    _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, file);
    throw error;
  }
}
function _checkAndCreateFileStateObject2(files, fileDescriptor) {
  if (fileDescriptor instanceof File) {
    fileDescriptor = {
      name: fileDescriptor.name,
      type: fileDescriptor.type,
      size: fileDescriptor.size,
      data: fileDescriptor
    };
  }
  const fileType = getFileType(fileDescriptor);
  const fileName = getFileName(fileType, fileDescriptor);
  const fileExtension = getFileNameAndExtension(fileName).extension;
  const isRemote = Boolean(fileDescriptor.isRemote);
  const fileID = generateFileID({
    ...fileDescriptor,
    type: fileType
  });
  if (this.checkIfFileAlreadyExists(fileID)) {
    const error = new RestrictionError(this.i18n("noDuplicates", {
      fileName
    }));
    _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error, fileDescriptor);
    throw error;
  }
  const meta = fileDescriptor.meta || {};
  meta.name = fileName;
  meta.type = fileType;
  const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
  let newFile = {
    source: fileDescriptor.source || "",
    id: fileID,
    name: fileName,
    extension: fileExtension || "",
    meta: {
      ...this.getState().meta,
      ...meta
    },
    type: fileType,
    data: fileDescriptor.data,
    progress: {
      percentage: 0,
      bytesUploaded: 0,
      bytesTotal: size,
      uploadComplete: false,
      uploadStarted: null
    },
    size,
    isRemote,
    remote: fileDescriptor.remote || "",
    preview: fileDescriptor.preview
  };
  const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, files);
  if (onBeforeFileAddedResult === false) {
    const error = new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
    this.emit("restriction-failed", fileDescriptor, error);
    throw error;
  } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
    newFile = onBeforeFileAddedResult;
  }
  try {
    const filesArray = Object.keys(files).map((i3) => files[i3]);
    _classPrivateFieldLooseBase3(this, _restricter)[_restricter].validate(newFile, filesArray);
  } catch (err) {
    _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](err, newFile);
    throw err;
  }
  return newFile;
}
function _startIfAutoProceed2() {
  if (this.opts.autoProceed && !this.scheduledAutoProceed) {
    this.scheduledAutoProceed = setTimeout(() => {
      this.scheduledAutoProceed = null;
      this.upload().catch((err) => {
        if (!err.isRestriction) {
          this.log(err.stack || err.message || err);
        }
      });
    }, 4);
  }
}
function _addListeners2() {
  const errorHandler = (error, file, response) => {
    let errorMsg = error.message || "Unknown error";
    if (error.details) {
      errorMsg += ` ${error.details}`;
    }
    this.setState({
      error: errorMsg
    });
    if (file != null && file.id in this.getState().files) {
      this.setFileState(file.id, {
        error: errorMsg,
        response
      });
    }
  };
  this.on("error", errorHandler);
  this.on("upload-error", (file, error, response) => {
    errorHandler(error, file, response);
    if (typeof error === "object" && error.message) {
      const newError = new Error(error.message);
      newError.details = error.message;
      if (error.details) {
        newError.details += ` ${error.details}`;
      }
      newError.message = this.i18n("failedToUpload", {
        file: file == null ? void 0 : file.name
      });
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](newError);
    } else {
      _classPrivateFieldLooseBase3(this, _informAndEmit)[_informAndEmit](error);
    }
  });
  let uploadStalledWarningRecentlyEmitted;
  this.on("upload-stalled", (error, files) => {
    const {
      message
    } = error;
    const details = files.map((file) => file.meta.name).join(", ");
    if (!uploadStalledWarningRecentlyEmitted) {
      this.info({
        message,
        details
      }, "warning", this.opts.infoTimeout);
      uploadStalledWarningRecentlyEmitted = setTimeout(() => {
        uploadStalledWarningRecentlyEmitted = null;
      }, this.opts.infoTimeout);
    }
    this.log(`${message} ${details}`.trim(), "warning");
  });
  this.on("upload", () => {
    this.setState({
      error: null
    });
  });
  this.on("upload-started", (file) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    this.setFileState(file.id, {
      progress: {
        uploadStarted: Date.now(),
        uploadComplete: false,
        percentage: 0,
        bytesUploaded: 0,
        bytesTotal: file.size
      }
    });
  });
  this.on("upload-progress", this.calculateProgress);
  this.on("upload-success", (file, uploadResp) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    const currentProgress = this.getFile(file.id).progress;
    this.setFileState(file.id, {
      progress: {
        ...currentProgress,
        postprocess: _classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors].size > 0 ? {
          mode: "indeterminate"
        } : null,
        uploadComplete: true,
        percentage: 100,
        bytesUploaded: currentProgress.bytesTotal
      },
      response: uploadResp,
      uploadURL: uploadResp.uploadURL,
      isPaused: false
    });
    if (file.size == null) {
      this.setFileState(file.id, {
        size: uploadResp.bytesUploaded || currentProgress.bytesTotal
      });
    }
    this.calculateTotalProgress();
  });
  this.on("preprocess-progress", (file, progress) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    this.setFileState(file.id, {
      progress: {
        ...this.getFile(file.id).progress,
        preprocess: progress
      }
    });
  });
  this.on("preprocess-complete", (file) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    const files = {
      ...this.getState().files
    };
    files[file.id] = {
      ...files[file.id],
      progress: {
        ...files[file.id].progress
      }
    };
    delete files[file.id].progress.preprocess;
    this.setState({
      files
    });
  });
  this.on("postprocess-progress", (file, progress) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    this.setFileState(file.id, {
      progress: {
        ...this.getState().files[file.id].progress,
        postprocess: progress
      }
    });
  });
  this.on("postprocess-complete", (file) => {
    if (file == null || !this.getFile(file.id)) {
      this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
      return;
    }
    const files = {
      ...this.getState().files
    };
    files[file.id] = {
      ...files[file.id],
      progress: {
        ...files[file.id].progress
      }
    };
    delete files[file.id].progress.postprocess;
    this.setState({
      files
    });
  });
  this.on("restored", () => {
    this.calculateTotalProgress();
  });
  this.on("dashboard:file-edit-complete", (file) => {
    if (file) {
      _classPrivateFieldLooseBase3(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
    }
  });
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("online", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
    window.addEventListener("offline", _classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus]);
    setTimeout(_classPrivateFieldLooseBase3(this, _updateOnlineStatus)[_updateOnlineStatus], 3e3);
  }
}
function _createUpload2(fileIDs, opts) {
  if (opts === void 0) {
    opts = {};
  }
  const {
    forceAllowNewUpload = false
  } = opts;
  const {
    allowNewUpload,
    currentUploads
  } = this.getState();
  if (!allowNewUpload && !forceAllowNewUpload) {
    throw new Error("Cannot create a new upload: already uploading.");
  }
  const uploadID = nanoid();
  this.emit("upload", {
    id: uploadID,
    fileIDs
  });
  this.setState({
    allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
    currentUploads: {
      ...currentUploads,
      [uploadID]: {
        fileIDs,
        step: 0,
        result: {}
      }
    }
  });
  return uploadID;
}
function _getUpload2(uploadID) {
  const {
    currentUploads
  } = this.getState();
  return currentUploads[uploadID];
}
function _removeUpload2(uploadID) {
  const currentUploads = {
    ...this.getState().currentUploads
  };
  delete currentUploads[uploadID];
  this.setState({
    currentUploads
  });
}
async function _runUpload2(uploadID) {
  let {
    currentUploads
  } = this.getState();
  let currentUpload = currentUploads[uploadID];
  const restoreStep = currentUpload.step || 0;
  const steps = [..._classPrivateFieldLooseBase3(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase3(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase3(this, _postProcessors)[_postProcessors]];
  try {
    for (let step = restoreStep; step < steps.length; step++) {
      if (!currentUpload) {
        break;
      }
      const fn = steps[step];
      const updatedUpload = {
        ...currentUpload,
        step
      };
      this.setState({
        currentUploads: {
          ...currentUploads,
          [uploadID]: updatedUpload
        }
      });
      await fn(updatedUpload.fileIDs, uploadID);
      currentUploads = this.getState().currentUploads;
      currentUpload = currentUploads[uploadID];
    }
  } catch (err) {
    _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
    throw err;
  }
  if (currentUpload) {
    currentUpload.fileIDs.forEach((fileID) => {
      const file = this.getFile(fileID);
      if (file && file.progress.postprocess) {
        this.emit("postprocess-complete", file);
      }
    });
    const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
    const successful = files.filter((file) => !file.error);
    const failed = files.filter((file) => file.error);
    await this.addResultData(uploadID, {
      successful,
      failed,
      uploadID
    });
    currentUploads = this.getState().currentUploads;
    currentUpload = currentUploads[uploadID];
  }
  let result;
  if (currentUpload) {
    result = currentUpload.result;
    this.emit("complete", result);
    _classPrivateFieldLooseBase3(this, _removeUpload)[_removeUpload](uploadID);
  }
  if (result == null) {
    this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
  }
  return result;
}
Uppy.VERSION = packageJson2.version;
var Uppy_default = Uppy;

// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var r;
var o;
var f;
var e;
var c = {};
var s = [];
var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n3, l3) {
  for (var u3 in l3)
    n3[u3] = l3[u3];
  return n3;
}
function v(n3) {
  var l3 = n3.parentNode;
  l3 && l3.removeChild(n3);
}
function y(l3, u3, i3) {
  var t3, r3, o3, f3 = {};
  for (o3 in u3)
    "key" == o3 ? t3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : f3[o3] = u3[o3];
  if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), "function" == typeof l3 && null != l3.defaultProps)
    for (o3 in l3.defaultProps)
      void 0 === f3[o3] && (f3[o3] = l3.defaultProps[o3]);
  return p(l3, f3, t3, r3, null);
}
function p(n3, i3, t3, r3, o3) {
  var f3 = { type: n3, props: i3, key: t3, ref: r3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o3 ? ++u : o3 };
  return null == o3 && null != l.vnode && l.vnode(f3), f3;
}
function d() {
  return { current: null };
}
function _(n3) {
  return n3.children;
}
function k(n3, l3) {
  this.props = n3, this.context = l3;
}
function b(n3, l3) {
  if (null == l3)
    return n3.__ ? b(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u3; l3 < n3.__k.length; l3++)
    if (null != (u3 = n3.__k[l3]) && null != u3.__e)
      return u3.__e;
  return "function" == typeof n3.type ? b(n3) : null;
}
function g(n3) {
  var l3, u3;
  if (null != (n3 = n3.__) && null != n3.__c) {
    for (n3.__e = n3.__c.base = null, l3 = 0; l3 < n3.__k.length; l3++)
      if (null != (u3 = n3.__k[l3]) && null != u3.__e) {
        n3.__e = n3.__c.base = u3.__e;
        break;
      }
    return g(n3);
  }
}
function m(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !w.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(w);
}
function w() {
  var n3, l3, u3, i3, r3, o3, e3, c3;
  for (t.sort(f); n3 = t.shift(); )
    n3.__d && (l3 = t.length, i3 = void 0, r3 = void 0, e3 = (o3 = (u3 = n3).__v).__e, (c3 = u3.__P) && (i3 = [], (r3 = h({}, o3)).__v = o3.__v + 1, L(c3, o3, r3, u3.__n, void 0 !== c3.ownerSVGElement, null != o3.__h ? [e3] : null, i3, null == e3 ? b(o3) : e3, o3.__h), M(i3, o3), o3.__e != e3 && g(o3)), t.length > l3 && t.sort(f));
  w.__r = 0;
}
function x(n3, l3, u3, i3, t3, r3, o3, f3, e3, a3) {
  var h3, v3, y3, d3, k3, g3, m3, w3 = i3 && i3.__k || s, x3 = w3.length;
  for (u3.__k = [], h3 = 0; h3 < l3.length; h3++)
    if (null != (d3 = u3.__k[h3] = null == (d3 = l3[h3]) || "boolean" == typeof d3 || "function" == typeof d3 ? null : "string" == typeof d3 || "number" == typeof d3 || "bigint" == typeof d3 ? p(null, d3, null, null, d3) : Array.isArray(d3) ? p(_, { children: d3 }, null, null, null) : d3.__b > 0 ? p(d3.type, d3.props, d3.key, d3.ref ? d3.ref : null, d3.__v) : d3)) {
      if (d3.__ = u3, d3.__b = u3.__b + 1, null === (y3 = w3[h3]) || y3 && d3.key == y3.key && d3.type === y3.type)
        w3[h3] = void 0;
      else
        for (v3 = 0; v3 < x3; v3++) {
          if ((y3 = w3[v3]) && d3.key == y3.key && d3.type === y3.type) {
            w3[v3] = void 0;
            break;
          }
          y3 = null;
        }
      L(n3, d3, y3 = y3 || c, t3, r3, o3, f3, e3, a3), k3 = d3.__e, (v3 = d3.ref) && y3.ref != v3 && (m3 || (m3 = []), y3.ref && m3.push(y3.ref, null, d3), m3.push(v3, d3.__c || k3, d3)), null != k3 ? (null == g3 && (g3 = k3), "function" == typeof d3.type && d3.__k === y3.__k ? d3.__d = e3 = A(d3, e3, n3) : e3 = C(n3, d3, y3, w3, k3, e3), "function" == typeof u3.type && (u3.__d = e3)) : e3 && y3.__e == e3 && e3.parentNode != n3 && (e3 = b(y3));
    }
  for (u3.__e = g3, h3 = x3; h3--; )
    null != w3[h3] && ("function" == typeof u3.type && null != w3[h3].__e && w3[h3].__e == u3.__d && (u3.__d = $(i3).nextSibling), S(w3[h3], w3[h3]));
  if (m3)
    for (h3 = 0; h3 < m3.length; h3++)
      O(m3[h3], m3[++h3], m3[++h3]);
}
function A(n3, l3, u3) {
  for (var i3, t3 = n3.__k, r3 = 0; t3 && r3 < t3.length; r3++)
    (i3 = t3[r3]) && (i3.__ = n3, l3 = "function" == typeof i3.type ? A(i3, l3, u3) : C(u3, i3, i3, t3, i3.__e, l3));
  return l3;
}
function P(n3, l3) {
  return l3 = l3 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
    P(n4, l3);
  }) : l3.push(n3)), l3;
}
function C(n3, l3, u3, i3, t3, r3) {
  var o3, f3, e3;
  if (void 0 !== l3.__d)
    o3 = l3.__d, l3.__d = void 0;
  else if (null == u3 || t3 != r3 || null == t3.parentNode)
    n:
      if (null == r3 || r3.parentNode !== n3)
        n3.appendChild(t3), o3 = null;
      else {
        for (f3 = r3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 1)
          if (f3 == t3)
            break n;
        n3.insertBefore(t3, r3), o3 = r3;
      }
  return void 0 !== o3 ? o3 : t3.nextSibling;
}
function $(n3) {
  var l3, u3, i3;
  if (null == n3.type || "string" == typeof n3.type)
    return n3.__e;
  if (n3.__k) {
    for (l3 = n3.__k.length - 1; l3 >= 0; l3--)
      if ((u3 = n3.__k[l3]) && (i3 = $(u3)))
        return i3;
  }
  return null;
}
function H(n3, l3, u3, i3, t3) {
  var r3;
  for (r3 in u3)
    "children" === r3 || "key" === r3 || r3 in l3 || T(n3, r3, null, u3[r3], i3);
  for (r3 in l3)
    t3 && "function" != typeof l3[r3] || "children" === r3 || "key" === r3 || "value" === r3 || "checked" === r3 || u3[r3] === l3[r3] || T(n3, r3, l3[r3], u3[r3], i3);
}
function I(n3, l3, u3) {
  "-" === l3[0] ? n3.setProperty(l3, null == u3 ? "" : u3) : n3[l3] = null == u3 ? "" : "number" != typeof u3 || a.test(l3) ? u3 : u3 + "px";
}
function T(n3, l3, u3, i3, t3) {
  var r3;
  n:
    if ("style" === l3)
      if ("string" == typeof u3)
        n3.style.cssText = u3;
      else {
        if ("string" == typeof i3 && (n3.style.cssText = i3 = ""), i3)
          for (l3 in i3)
            u3 && l3 in u3 || I(n3.style, l3, "");
        if (u3)
          for (l3 in u3)
            i3 && u3[l3] === i3[l3] || I(n3.style, l3, u3[l3]);
      }
    else if ("o" === l3[0] && "n" === l3[1])
      r3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n3 ? l3.toLowerCase().slice(2) : l3.slice(2), n3.l || (n3.l = {}), n3.l[l3 + r3] = u3, u3 ? i3 || n3.addEventListener(l3, r3 ? z : j, r3) : n3.removeEventListener(l3, r3 ? z : j, r3);
    else if ("dangerouslySetInnerHTML" !== l3) {
      if (t3)
        l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== l3 && "height" !== l3 && "href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && l3 in n3)
        try {
          n3[l3] = null == u3 ? "" : u3;
          break n;
        } catch (n4) {
        }
      "function" == typeof u3 || (null == u3 || false === u3 && -1 == l3.indexOf("-") ? n3.removeAttribute(l3) : n3.setAttribute(l3, u3));
    }
}
function j(n3) {
  return this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function z(n3) {
  return this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function L(n3, u3, i3, t3, r3, o3, f3, e3, c3) {
  var s3, a3, v3, y3, p3, d3, b3, g3, m3, w3, A3, P3, C3, $3, H3, I3 = u3.type;
  if (void 0 !== u3.constructor)
    return null;
  null != i3.__h && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, o3 = [e3]), (s3 = l.__b) && s3(u3);
  try {
    n:
      if ("function" == typeof I3) {
        if (g3 = u3.props, m3 = (s3 = I3.contextType) && t3[s3.__c], w3 = s3 ? m3 ? m3.props.value : s3.__ : t3, i3.__c ? b3 = (a3 = u3.__c = i3.__c).__ = a3.__E : ("prototype" in I3 && I3.prototype.render ? u3.__c = a3 = new I3(g3, w3) : (u3.__c = a3 = new k(g3, w3), a3.constructor = I3, a3.render = q), m3 && m3.sub(a3), a3.props = g3, a3.state || (a3.state = {}), a3.context = w3, a3.__n = t3, v3 = a3.__d = true, a3.__h = [], a3._sb = []), null == a3.__s && (a3.__s = a3.state), null != I3.getDerivedStateFromProps && (a3.__s == a3.state && (a3.__s = h({}, a3.__s)), h(a3.__s, I3.getDerivedStateFromProps(g3, a3.__s))), y3 = a3.props, p3 = a3.state, a3.__v = u3, v3)
          null == I3.getDerivedStateFromProps && null != a3.componentWillMount && a3.componentWillMount(), null != a3.componentDidMount && a3.__h.push(a3.componentDidMount);
        else {
          if (null == I3.getDerivedStateFromProps && g3 !== y3 && null != a3.componentWillReceiveProps && a3.componentWillReceiveProps(g3, w3), !a3.__e && null != a3.shouldComponentUpdate && false === a3.shouldComponentUpdate(g3, a3.__s, w3) || u3.__v === i3.__v) {
            for (u3.__v !== i3.__v && (a3.props = g3, a3.state = a3.__s, a3.__d = false), a3.__e = false, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n4) {
              n4 && (n4.__ = u3);
            }), A3 = 0; A3 < a3._sb.length; A3++)
              a3.__h.push(a3._sb[A3]);
            a3._sb = [], a3.__h.length && f3.push(a3);
            break n;
          }
          null != a3.componentWillUpdate && a3.componentWillUpdate(g3, a3.__s, w3), null != a3.componentDidUpdate && a3.__h.push(function() {
            a3.componentDidUpdate(y3, p3, d3);
          });
        }
        if (a3.context = w3, a3.props = g3, a3.__P = n3, P3 = l.__r, C3 = 0, "prototype" in I3 && I3.prototype.render) {
          for (a3.state = a3.__s, a3.__d = false, P3 && P3(u3), s3 = a3.render(a3.props, a3.state, a3.context), $3 = 0; $3 < a3._sb.length; $3++)
            a3.__h.push(a3._sb[$3]);
          a3._sb = [];
        } else
          do {
            a3.__d = false, P3 && P3(u3), s3 = a3.render(a3.props, a3.state, a3.context), a3.state = a3.__s;
          } while (a3.__d && ++C3 < 25);
        a3.state = a3.__s, null != a3.getChildContext && (t3 = h(h({}, t3), a3.getChildContext())), v3 || null == a3.getSnapshotBeforeUpdate || (d3 = a3.getSnapshotBeforeUpdate(y3, p3)), H3 = null != s3 && s3.type === _ && null == s3.key ? s3.props.children : s3, x(n3, Array.isArray(H3) ? H3 : [H3], u3, i3, t3, r3, o3, f3, e3, c3), a3.base = u3.__e, u3.__h = null, a3.__h.length && f3.push(a3), b3 && (a3.__E = a3.__ = null), a3.__e = false;
      } else
        null == o3 && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = N(i3.__e, u3, i3, t3, r3, o3, f3, c3);
    (s3 = l.diffed) && s3(u3);
  } catch (n4) {
    u3.__v = null, (c3 || null != o3) && (u3.__e = e3, u3.__h = !!c3, o3[o3.indexOf(e3)] = null), l.__e(n4, u3, i3);
  }
}
function M(n3, u3) {
  l.__c && l.__c(u3, n3), n3.some(function(u4) {
    try {
      n3 = u4.__h, u4.__h = [], n3.some(function(n4) {
        n4.call(u4);
      });
    } catch (n4) {
      l.__e(n4, u4.__v);
    }
  });
}
function N(l3, u3, i3, t3, r3, o3, f3, e3) {
  var s3, a3, h3, y3 = i3.props, p3 = u3.props, d3 = u3.type, _3 = 0;
  if ("svg" === d3 && (r3 = true), null != o3) {
    for (; _3 < o3.length; _3++)
      if ((s3 = o3[_3]) && "setAttribute" in s3 == !!d3 && (d3 ? s3.localName === d3 : 3 === s3.nodeType)) {
        l3 = s3, o3[_3] = null;
        break;
      }
  }
  if (null == l3) {
    if (null === d3)
      return document.createTextNode(p3);
    l3 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), o3 = null, e3 = false;
  }
  if (null === d3)
    y3 === p3 || e3 && l3.data === p3 || (l3.data = p3);
  else {
    if (o3 = o3 && n.call(l3.childNodes), a3 = (y3 = i3.props || c).dangerouslySetInnerHTML, h3 = p3.dangerouslySetInnerHTML, !e3) {
      if (null != o3)
        for (y3 = {}, _3 = 0; _3 < l3.attributes.length; _3++)
          y3[l3.attributes[_3].name] = l3.attributes[_3].value;
      (h3 || a3) && (h3 && (a3 && h3.__html == a3.__html || h3.__html === l3.innerHTML) || (l3.innerHTML = h3 && h3.__html || ""));
    }
    if (H(l3, p3, y3, r3, e3), h3)
      u3.__k = [];
    else if (_3 = u3.props.children, x(l3, Array.isArray(_3) ? _3 : [_3], u3, i3, t3, r3 && "foreignObject" !== d3, o3, f3, o3 ? o3[0] : i3.__k && b(i3, 0), e3), null != o3)
      for (_3 = o3.length; _3--; )
        null != o3[_3] && v(o3[_3]);
    e3 || ("value" in p3 && void 0 !== (_3 = p3.value) && (_3 !== l3.value || "progress" === d3 && !_3 || "option" === d3 && _3 !== y3.value) && T(l3, "value", _3, y3.value, false), "checked" in p3 && void 0 !== (_3 = p3.checked) && _3 !== l3.checked && T(l3, "checked", _3, y3.checked, false));
  }
  return l3;
}
function O(n3, u3, i3) {
  try {
    "function" == typeof n3 ? n3(u3) : n3.current = u3;
  } catch (n4) {
    l.__e(n4, i3);
  }
}
function S(n3, u3, i3) {
  var t3, r3;
  if (l.unmount && l.unmount(n3), (t3 = n3.ref) && (t3.current && t3.current !== n3.__e || O(t3, null, u3)), null != (t3 = n3.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u3);
      }
    t3.base = t3.__P = null, n3.__c = void 0;
  }
  if (t3 = n3.__k)
    for (r3 = 0; r3 < t3.length; r3++)
      t3[r3] && S(t3[r3], u3, i3 || "function" != typeof n3.type);
  i3 || null == n3.__e || v(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
}
function q(n3, l3, u3) {
  return this.constructor(n3, u3);
}
function B(u3, i3, t3) {
  var r3, o3, f3;
  l.__ && l.__(u3, i3), o3 = (r3 = "function" == typeof t3) ? null : t3 && t3.__k || i3.__k, f3 = [], L(i3, u3 = (!r3 && t3 || i3).__k = y(_, null, [u3]), o3 || c, c, void 0 !== i3.ownerSVGElement, !r3 && t3 ? [t3] : o3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, f3, !r3 && t3 ? t3 : o3 ? o3.__e : i3.firstChild, r3), M(f3, u3);
}
function E(l3, u3, i3) {
  var t3, r3, o3, f3 = h({}, l3.props);
  for (o3 in u3)
    "key" == o3 ? t3 = u3[o3] : "ref" == o3 ? r3 = u3[o3] : f3[o3] = u3[o3];
  return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), p(l3.type, f3, t3 || l3.key, r3 || l3.ref, null);
}
n = s.slice, l = { __e: function(n3, l3, u3, i3) {
  for (var t3, r3, o3; l3 = l3.__; )
    if ((t3 = l3.__c) && !t3.__)
      try {
        if ((r3 = t3.constructor) && null != r3.getDerivedStateFromError && (t3.setState(r3.getDerivedStateFromError(n3)), o3 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n3, i3 || {}), o3 = t3.__d), o3)
          return t3.__E = t3;
      } catch (l4) {
        n3 = l4;
      }
  throw n3;
} }, u = 0, i = function(n3) {
  return null != n3 && void 0 === n3.constructor;
}, k.prototype.setState = function(n3, l3) {
  var u3;
  u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n3 && (n3 = n3(h({}, u3), this.props)), n3 && h(u3, n3), null != n3 && this.__v && (l3 && this._sb.push(l3), m(this));
}, k.prototype.forceUpdate = function(n3) {
  this.__v && (this.__e = true, n3 && this.__h.push(n3), m(this));
}, k.prototype.render = _, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n3, l3) {
  return n3.__v.__b - l3.__v.__b;
}, w.__r = 0, e = 0;

// node_modules/@uppy/utils/lib/isDOMElement.js
function isDOMElement(obj) {
  return (obj == null ? void 0 : obj.nodeType) === Node.ELEMENT_NODE;
}

// node_modules/@uppy/utils/lib/findDOMElement.js
function findDOMElement(element, context) {
  if (context === void 0) {
    context = document;
  }
  if (typeof element === "string") {
    return context.querySelector(element);
  }
  if (isDOMElement(element)) {
    return element;
  }
  return null;
}

// node_modules/@uppy/utils/lib/getTextDirection.js
function getTextDirection(element) {
  var _element;
  while (element && !element.dir) {
    element = element.parentNode;
  }
  return (_element = element) == null ? void 0 : _element.dir;
}
var getTextDirection_default = getTextDirection;

// node_modules/@uppy/core/lib/BasePlugin.js
var BasePlugin = class {
  constructor(uppy, opts) {
    if (opts === void 0) {
      opts = {};
    }
    this.uppy = uppy;
    this.opts = opts;
  }
  getPluginState() {
    const {
      plugins
    } = this.uppy.getState();
    return plugins[this.id] || {};
  }
  setPluginState(update) {
    const {
      plugins
    } = this.uppy.getState();
    this.uppy.setState({
      plugins: {
        ...plugins,
        [this.id]: {
          ...plugins[this.id],
          ...update
        }
      }
    });
  }
  setOptions(newOpts) {
    this.opts = {
      ...this.opts,
      ...newOpts
    };
    this.setPluginState();
    this.i18nInit();
  }
  i18nInit() {
    const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
    this.i18n = translator.translate.bind(translator);
    this.i18nArray = translator.translateArray.bind(translator);
    this.setPluginState();
  }
  /**
   * Extendable methods
   * ==================
   * These methods are here to serve as an overview of the extendable methods as well as
   * making them not conditional in use, such as `if (this.afterUpdate)`.
   */
  // eslint-disable-next-line class-methods-use-this
  addTarget() {
    throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
  }
  // eslint-disable-next-line class-methods-use-this
  install() {
  }
  // eslint-disable-next-line class-methods-use-this
  uninstall() {
  }
  /**
   * Called when plugin is mounted, whether in DOM or into another plugin.
   * Needed because sometimes plugins are mounted separately/after `install`,
   * so this.el and this.parent might not be available in `install`.
   * This is the case with @uppy/react plugins, for example.
   */
  render() {
    throw new Error("Extend the render method to add your plugin to a DOM element");
  }
  // eslint-disable-next-line class-methods-use-this
  update() {
  }
  // Called after every state update, after everything's mounted. Debounced.
  // eslint-disable-next-line class-methods-use-this
  afterUpdate() {
  }
};

// node_modules/@uppy/core/lib/UIPlugin.js
function _classPrivateFieldLooseBase4(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id4 = 0;
function _classPrivateFieldLooseKey4(name) {
  return "__private_" + id4++ + "_" + name;
}
function debounce(fn) {
  let calling = null;
  let latestArgs = null;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    latestArgs = args;
    if (!calling) {
      calling = Promise.resolve().then(() => {
        calling = null;
        return fn(...latestArgs);
      });
    }
    return calling;
  };
}
var _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey4("updateUI");
var UIPlugin = class extends BasePlugin {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, _updateUI, {
      writable: true,
      value: void 0
    });
  }
  getTargetPlugin(target) {
    let targetPlugin;
    if (typeof target === "object" && target instanceof UIPlugin) {
      targetPlugin = target;
    } else if (typeof target === "function") {
      const Target = target;
      this.uppy.iteratePlugins((p3) => {
        if (p3 instanceof Target) {
          targetPlugin = p3;
        }
      });
    }
    return targetPlugin;
  }
  /**
   * Check if supplied `target` is a DOM element or an `object`.
   * If it’s an object — target is a plugin, and we search `plugins`
   * for a plugin with same name and return its target.
   */
  mount(target, plugin) {
    const callerPluginName = plugin.id;
    const targetElement = findDOMElement(target);
    if (targetElement) {
      this.isTargetDOMEl = true;
      const uppyRootElement = document.createElement("div");
      uppyRootElement.classList.add("uppy-Root");
      _classPrivateFieldLooseBase4(this, _updateUI)[_updateUI] = debounce((state) => {
        if (!this.uppy.getPlugin(this.id))
          return;
        B(this.render(state), uppyRootElement);
        this.afterUpdate();
      });
      this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
      if (this.opts.replaceTargetContent) {
        targetElement.innerHTML = "";
      }
      B(this.render(this.uppy.getState()), uppyRootElement);
      this.el = uppyRootElement;
      targetElement.appendChild(uppyRootElement);
      uppyRootElement.dir = this.opts.direction || getTextDirection_default(uppyRootElement) || "ltr";
      this.onMount();
      return this.el;
    }
    const targetPlugin = this.getTargetPlugin(target);
    if (targetPlugin) {
      this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
      this.parent = targetPlugin;
      this.el = targetPlugin.addTarget(plugin);
      this.onMount();
      return this.el;
    }
    this.uppy.log(`Not installing ${callerPluginName}`);
    let message = `Invalid target option given to ${callerPluginName}.`;
    if (typeof target === "function") {
      message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
    } else {
      message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
    }
    throw new Error(message);
  }
  update(state) {
    if (this.el != null) {
      var _classPrivateFieldLoo, _classPrivateFieldLoo2;
      (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase4(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
    }
  }
  unmount() {
    if (this.isTargetDOMEl) {
      var _this$el;
      (_this$el = this.el) == null ? void 0 : _this$el.remove();
    }
    this.onUnmount();
  }
  // eslint-disable-next-line class-methods-use-this
  onMount() {
  }
  // eslint-disable-next-line class-methods-use-this
  onUnmount() {
  }
};
var UIPlugin_default = UIPlugin;

// node_modules/@uppy/utils/lib/getSpeed.js
function getSpeed(fileProgress) {
  if (!fileProgress.bytesUploaded)
    return 0;
  const timeElapsed = Date.now() - fileProgress.uploadStarted;
  const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1e3);
  return uploadSpeed;
}

// node_modules/@uppy/utils/lib/getBytesRemaining.js
function getBytesRemaining(fileProgress) {
  return fileProgress.bytesTotal - fileProgress.bytesUploaded;
}

// node_modules/@uppy/status-bar/lib/StatusBarStates.js
var StatusBarStates_default = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete"
};

// node_modules/@uppy/status-bar/lib/StatusBarUI.js
var import_classnames2 = __toESM(require_classnames(), 1);

// node_modules/@uppy/status-bar/lib/calculateProcessingProgress.js
function calculateProcessingProgress(files) {
  const values = [];
  let mode;
  let message;
  for (const {
    progress
  } of Object.values(files)) {
    const {
      preprocess,
      postprocess
    } = progress;
    if (message == null && (preprocess || postprocess)) {
      ({
        mode,
        message
      } = preprocess || postprocess);
    }
    if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
      values.push(preprocess.value);
    if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
      values.push(postprocess.value);
  }
  const value = values.reduce((total, progressValue) => {
    return total + progressValue / values.length;
  }, 0);
  return {
    mode,
    message,
    value
  };
}

// node_modules/@uppy/status-bar/lib/Components.js
var import_classnames = __toESM(require_classnames(), 1);
var import_lodash2 = __toESM(require_lodash(), 1);
var import_prettier_bytes2 = __toESM(require_prettierBytes(), 1);

// node_modules/@uppy/utils/lib/secondsToTime.js
function secondsToTime(rawSeconds) {
  const hours = Math.floor(rawSeconds / 3600) % 24;
  const minutes = Math.floor(rawSeconds / 60) % 60;
  const seconds = Math.floor(rawSeconds % 60);
  return {
    hours,
    minutes,
    seconds
  };
}

// node_modules/@uppy/utils/lib/prettyETA.js
function prettyETA(seconds) {
  const time = secondsToTime(seconds);
  const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
  const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
  const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
  return `${hoursStr}${minutesStr}${secondsStr}`;
}

// node_modules/@uppy/status-bar/lib/Components.js
var DOT = `\xB7`;
var renderDot = () => ` ${DOT} `;
function UploadBtn(props) {
  const {
    newFiles,
    isUploadStarted,
    recoveredState,
    i18n,
    uploadState,
    isSomeGhost,
    startUpload
  } = props;
  const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
    "uppy-c-btn-primary": uploadState === StatusBarStates_default.STATE_WAITING
  }, {
    "uppy-StatusBar-actionBtn--disabled": isSomeGhost
  });
  const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
    smart_count: newFiles
  }) : i18n("uploadXFiles", {
    smart_count: newFiles
  });
  return y("button", {
    type: "button",
    className: uploadBtnClassNames,
    "aria-label": i18n("uploadXFiles", {
      smart_count: newFiles
    }),
    onClick: startUpload,
    disabled: isSomeGhost,
    "data-uppy-super-focusable": true
  }, uploadBtnText);
}
function RetryBtn(props) {
  const {
    i18n,
    uppy
  } = props;
  return y("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
    "aria-label": i18n("retryUpload"),
    onClick: () => uppy.retryAll(),
    "data-uppy-super-focusable": true
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "8",
    height: "10",
    viewBox: "0 0 8 10"
  }, y("path", {
    d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
  })), i18n("retry"));
}
function CancelBtn(props) {
  const {
    i18n,
    uppy
  } = props;
  return y("button", {
    type: "button",
    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
    title: i18n("cancel"),
    "aria-label": i18n("cancel"),
    onClick: () => uppy.cancelAll(),
    "data-cy": "cancel",
    "data-uppy-super-focusable": true
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, y("g", {
    fill: "none",
    fillRule: "evenodd"
  }, y("circle", {
    fill: "#888",
    cx: "8",
    cy: "8",
    r: "8"
  }), y("path", {
    fill: "#FFF",
    d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
  }))));
}
function PauseResumeButton(props) {
  const {
    isAllPaused,
    i18n,
    isAllComplete,
    resumableUploads,
    uppy
  } = props;
  const title = isAllPaused ? i18n("resume") : i18n("pause");
  function togglePauseResume() {
    if (isAllComplete)
      return null;
    if (!resumableUploads) {
      return uppy.cancelAll();
    }
    if (isAllPaused) {
      return uppy.resumeAll();
    }
    return uppy.pauseAll();
  }
  return y("button", {
    title,
    "aria-label": title,
    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
    type: "button",
    onClick: togglePauseResume,
    "data-uppy-super-focusable": true
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, y("g", {
    fill: "none",
    fillRule: "evenodd"
  }, y("circle", {
    fill: "#888",
    cx: "8",
    cy: "8",
    r: "8"
  }), y("path", {
    fill: "#FFF",
    d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
  }))));
}
function DoneBtn(props) {
  const {
    i18n,
    doneButtonHandler
  } = props;
  return y("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
    onClick: doneButtonHandler,
    "data-uppy-super-focusable": true
  }, i18n("done"));
}
function LoadingSpinner() {
  return y("svg", {
    className: "uppy-StatusBar-spinner",
    "aria-hidden": "true",
    focusable: "false",
    width: "14",
    height: "14"
  }, y("path", {
    d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
    fillRule: "evenodd"
  }));
}
function ProgressBarProcessing(props) {
  const {
    progress
  } = props;
  const {
    value,
    mode,
    message
  } = progress;
  const roundedValue = Math.round(value * 100);
  const dot = `\xB7`;
  return y("div", {
    className: "uppy-StatusBar-content"
  }, y(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
}
function ProgressDetails(props) {
  const {
    numUploads,
    complete,
    totalUploadedSize,
    totalSize,
    totalETA,
    i18n
  } = props;
  const ifShowFilesUploadedOfTotal = numUploads > 1;
  return y("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
    complete,
    smart_count: numUploads
  }), y("span", {
    className: "uppy-StatusBar-additionalInfo"
  }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
    complete: (0, import_prettier_bytes2.default)(totalUploadedSize),
    total: (0, import_prettier_bytes2.default)(totalSize)
  }), renderDot(), i18n("xTimeLeft", {
    time: prettyETA(totalETA)
  })));
}
function FileUploadCount(props) {
  const {
    i18n,
    complete,
    numUploads
  } = props;
  return y("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, i18n("filesUploadedOfTotal", {
    complete,
    smart_count: numUploads
  }));
}
function UploadNewlyAddedFiles(props) {
  const {
    i18n,
    newFiles,
    startUpload
  } = props;
  const uploadBtnClassNames = (0, import_classnames.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
  return y("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, y("div", {
    className: "uppy-StatusBar-statusSecondaryHint"
  }, i18n("xMoreFilesAdded", {
    smart_count: newFiles
  })), y("button", {
    type: "button",
    className: uploadBtnClassNames,
    "aria-label": i18n("uploadXFiles", {
      smart_count: newFiles
    }),
    onClick: startUpload
  }, i18n("upload")));
}
var ThrottledProgressDetails = (0, import_lodash2.default)(ProgressDetails, 500, {
  leading: true,
  trailing: true
});
function ProgressBarUploading(props) {
  const {
    i18n,
    supportsUploadProgress: supportsUploadProgress2,
    totalProgress,
    showProgressDetails,
    isUploadStarted,
    isAllComplete,
    isAllPaused,
    newFiles,
    numUploads,
    complete,
    totalUploadedSize,
    totalSize,
    totalETA,
    startUpload
  } = props;
  const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
  if (!isUploadStarted || isAllComplete) {
    return null;
  }
  const title = isAllPaused ? i18n("paused") : i18n("uploading");
  function renderProgressDetails() {
    if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
      if (supportsUploadProgress2) {
        return y(ThrottledProgressDetails, {
          numUploads,
          complete,
          totalUploadedSize,
          totalSize,
          totalETA,
          i18n
        });
      }
      return y(FileUploadCount, {
        i18n,
        complete,
        numUploads
      });
    }
    return null;
  }
  return y("div", {
    className: "uppy-StatusBar-content",
    "aria-label": title,
    title
  }, !isAllPaused ? y(LoadingSpinner, null) : null, y("div", {
    className: "uppy-StatusBar-status"
  }, y("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, supportsUploadProgress2 ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? y(UploadNewlyAddedFiles, {
    i18n,
    newFiles,
    startUpload
  }) : null));
}
function ProgressBarComplete(props) {
  const {
    i18n
  } = props;
  return y("div", {
    className: "uppy-StatusBar-content",
    role: "status",
    title: i18n("complete")
  }, y("div", {
    className: "uppy-StatusBar-status"
  }, y("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
    width: "15",
    height: "11",
    viewBox: "0 0 15 11"
  }, y("path", {
    d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
  })), i18n("complete"))));
}
function ProgressBarError(props) {
  const {
    error,
    i18n,
    complete,
    numUploads
  } = props;
  function displayErrorAlert() {
    const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
    alert(errorMessage);
  }
  return y("div", {
    className: "uppy-StatusBar-content",
    title: i18n("uploadFailed")
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
    width: "11",
    height: "11",
    viewBox: "0 0 11 11"
  }, y("path", {
    d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
  })), y("div", {
    className: "uppy-StatusBar-status"
  }, y("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, i18n("uploadFailed"), y("button", {
    className: "uppy-u-reset uppy-StatusBar-details",
    "aria-label": i18n("showErrorDetails"),
    "data-microtip-position": "top-right",
    "data-microtip-size": "medium",
    onClick: displayErrorAlert,
    type: "button"
  }, "?")), y(FileUploadCount, {
    i18n,
    complete,
    numUploads
  })));
}

// node_modules/@uppy/status-bar/lib/StatusBarUI.js
var {
  STATE_ERROR,
  STATE_WAITING,
  STATE_PREPROCESSING,
  STATE_UPLOADING,
  STATE_POSTPROCESSING,
  STATE_COMPLETE
} = StatusBarStates_default;
function StatusBar(props) {
  const {
    newFiles,
    allowNewUpload,
    isUploadInProgress,
    isAllPaused,
    resumableUploads,
    error,
    hideUploadButton,
    hidePauseResumeButton,
    hideCancelButton,
    hideRetryButton,
    recoveredState,
    uploadState,
    totalProgress,
    files,
    supportsUploadProgress: supportsUploadProgress2,
    hideAfterFinish,
    isSomeGhost,
    doneButtonHandler,
    isUploadStarted,
    i18n,
    startUpload,
    uppy,
    isAllComplete,
    showProgressDetails,
    numUploads,
    complete,
    totalSize,
    totalETA,
    totalUploadedSize
  } = props;
  function getProgressValue() {
    switch (uploadState) {
      case STATE_POSTPROCESSING:
      case STATE_PREPROCESSING: {
        const progress = calculateProcessingProgress(files);
        if (progress.mode === "determinate") {
          return progress.value * 100;
        }
        return totalProgress;
      }
      case STATE_ERROR: {
        return null;
      }
      case STATE_UPLOADING: {
        if (!supportsUploadProgress2) {
          return null;
        }
        return totalProgress;
      }
      default:
        return totalProgress;
    }
  }
  function getIsIndeterminate() {
    switch (uploadState) {
      case STATE_POSTPROCESSING:
      case STATE_PREPROCESSING: {
        const {
          mode
        } = calculateProcessingProgress(files);
        return mode === "indeterminate";
      }
      case STATE_UPLOADING: {
        if (!supportsUploadProgress2) {
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  }
  function getIsHidden() {
    if (recoveredState) {
      return false;
    }
    switch (uploadState) {
      case STATE_WAITING:
        return hideUploadButton || newFiles === 0;
      case STATE_COMPLETE:
        return hideAfterFinish;
      default:
        return false;
    }
  }
  const progressValue = getProgressValue();
  const isHidden = getIsHidden();
  const width = progressValue != null ? progressValue : 100;
  const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
  const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
  const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
  const showRetryBtn = error && !isAllComplete && !hideRetryButton;
  const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
  const progressClassNames = (0, import_classnames2.default)("uppy-StatusBar-progress", {
    "is-indeterminate": getIsIndeterminate()
  });
  const statusBarClassNames = (0, import_classnames2.default)("uppy-StatusBar", `is-${uploadState}`, {
    "has-ghosts": isSomeGhost
  });
  return y("div", {
    className: statusBarClassNames,
    "aria-hidden": isHidden
  }, y("div", {
    className: progressClassNames,
    style: {
      width: `${width}%`
    },
    role: "progressbar",
    "aria-label": `${width}%`,
    "aria-valuetext": `${width}%`,
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": progressValue
  }), (() => {
    switch (uploadState) {
      case STATE_PREPROCESSING:
      case STATE_POSTPROCESSING:
        return y(ProgressBarProcessing, {
          progress: calculateProcessingProgress(files)
        });
      case STATE_COMPLETE:
        return y(ProgressBarComplete, {
          i18n
        });
      case STATE_ERROR:
        return y(ProgressBarError, {
          error,
          i18n,
          numUploads,
          complete
        });
      case STATE_UPLOADING:
        return y(ProgressBarUploading, {
          i18n,
          supportsUploadProgress: supportsUploadProgress2,
          totalProgress,
          showProgressDetails,
          isUploadStarted,
          isAllComplete,
          isAllPaused,
          newFiles,
          numUploads,
          complete,
          totalUploadedSize,
          totalSize,
          totalETA,
          startUpload
        });
      default:
        return null;
    }
  })(), y("div", {
    className: "uppy-StatusBar-actions"
  }, recoveredState || showUploadBtn ? y(UploadBtn, {
    newFiles,
    isUploadStarted,
    recoveredState,
    i18n,
    isSomeGhost,
    startUpload,
    uploadState
  }) : null, showRetryBtn ? y(RetryBtn, {
    i18n,
    uppy
  }) : null, showPauseResumeBtn ? y(PauseResumeButton, {
    isAllPaused,
    i18n,
    isAllComplete,
    resumableUploads,
    uppy
  }) : null, showCancelBtn ? y(CancelBtn, {
    i18n,
    uppy
  }) : null, showDoneBtn ? y(DoneBtn, {
    i18n,
    doneButtonHandler
  }) : null));
}

// node_modules/@uppy/status-bar/lib/locale.js
var locale_default2 = {
  strings: {
    // Shown in the status bar while files are being uploaded.
    uploading: "Uploading",
    // Shown in the status bar once all files have been uploaded.
    complete: "Complete",
    // Shown in the status bar if an upload failed.
    uploadFailed: "Upload failed",
    // Shown in the status bar while the upload is paused.
    paused: "Paused",
    // Used as the label for the button that retries an upload.
    retry: "Retry",
    // Used as the label for the button that cancels an upload.
    cancel: "Cancel",
    // Used as the label for the button that pauses an upload.
    pause: "Pause",
    // Used as the label for the button that resumes an upload.
    resume: "Resume",
    // Used as the label for the button that resets the upload state after an upload
    done: "Done",
    // When `showProgressDetails` is set, shows the number of files that have been fully uploaded so far.
    filesUploadedOfTotal: {
      0: "%{complete} of %{smart_count} file uploaded",
      1: "%{complete} of %{smart_count} files uploaded"
    },
    // When `showProgressDetails` is set, shows the amount of bytes that have been uploaded so far.
    dataUploadedOfTotal: "%{complete} of %{total}",
    // When `showProgressDetails` is set, shows an estimation of how long the upload will take to complete.
    xTimeLeft: "%{time} left",
    // Used as the label for the button that starts an upload.
    uploadXFiles: {
      0: "Upload %{smart_count} file",
      1: "Upload %{smart_count} files"
    },
    // Used as the label for the button that starts an upload, if another upload has been started in the past
    // and new files were added later.
    uploadXNewFiles: {
      0: "Upload +%{smart_count} file",
      1: "Upload +%{smart_count} files"
    },
    upload: "Upload",
    retryUpload: "Retry upload",
    xMoreFilesAdded: {
      0: "%{smart_count} more file added",
      1: "%{smart_count} more files added"
    },
    showErrorDetails: "Show error details"
  }
};

// node_modules/@uppy/status-bar/lib/StatusBar.js
var packageJson3 = {
  "version": "3.0.1"
};
function getTotalSpeed(files) {
  let totalSpeed = 0;
  files.forEach((file) => {
    totalSpeed += getSpeed(file.progress);
  });
  return totalSpeed;
}
function getTotalETA(files) {
  const totalSpeed = getTotalSpeed(files);
  if (totalSpeed === 0) {
    return 0;
  }
  const totalBytesRemaining = files.reduce((total, file) => {
    return total + getBytesRemaining(file.progress);
  }, 0);
  return Math.round(totalBytesRemaining / totalSpeed * 10) / 10;
}
function getUploadingState(error, isAllComplete, recoveredState, files) {
  if (error && !isAllComplete) {
    return StatusBarStates_default.STATE_ERROR;
  }
  if (isAllComplete) {
    return StatusBarStates_default.STATE_COMPLETE;
  }
  if (recoveredState) {
    return StatusBarStates_default.STATE_WAITING;
  }
  let state = StatusBarStates_default.STATE_WAITING;
  const fileIDs = Object.keys(files);
  for (let i3 = 0; i3 < fileIDs.length; i3++) {
    const {
      progress
    } = files[fileIDs[i3]];
    if (progress.uploadStarted && !progress.uploadComplete) {
      return StatusBarStates_default.STATE_UPLOADING;
    }
    if (progress.preprocess && state !== StatusBarStates_default.STATE_UPLOADING) {
      state = StatusBarStates_default.STATE_PREPROCESSING;
    }
    if (progress.postprocess && state !== StatusBarStates_default.STATE_UPLOADING && state !== StatusBarStates_default.STATE_PREPROCESSING) {
      state = StatusBarStates_default.STATE_POSTPROCESSING;
    }
  }
  return state;
}
var StatusBar2 = class extends UIPlugin_default {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.startUpload = () => {
      const {
        recoveredState
      } = this.uppy.getState();
      if (recoveredState) {
        this.uppy.emit("restore-confirmed");
        return void 0;
      }
      return this.uppy.upload().catch(() => {
      });
    };
    this.id = this.opts.id || "StatusBar";
    this.title = "StatusBar";
    this.type = "progressindicator";
    this.defaultLocale = locale_default2;
    const defaultOptions4 = {
      target: "body",
      hideUploadButton: false,
      hideRetryButton: false,
      hidePauseResumeButton: false,
      hideCancelButton: false,
      showProgressDetails: false,
      hideAfterFinish: true,
      doneButtonHandler: null
    };
    this.opts = {
      ...defaultOptions4,
      ...opts
    };
    this.i18nInit();
    this.render = this.render.bind(this);
    this.install = this.install.bind(this);
  }
  render(state) {
    const {
      capabilities,
      files,
      allowNewUpload,
      totalProgress,
      error,
      recoveredState
    } = state;
    const {
      newFiles,
      startedFiles,
      completeFiles,
      inProgressNotPausedFiles,
      isUploadStarted,
      isAllComplete,
      isAllErrored,
      isAllPaused,
      isUploadInProgress,
      isSomeGhost
    } = this.uppy.getObjectOfFilesPerState();
    const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
    const totalETA = getTotalETA(inProgressNotPausedFiles);
    const resumableUploads = !!capabilities.resumableUploads;
    const supportsUploadProgress2 = capabilities.uploadProgress !== false;
    let totalSize = 0;
    let totalUploadedSize = 0;
    startedFiles.forEach((file) => {
      totalSize += file.progress.bytesTotal || 0;
      totalUploadedSize += file.progress.bytesUploaded || 0;
    });
    return StatusBar({
      error,
      uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
      allowNewUpload,
      totalProgress,
      totalSize,
      totalUploadedSize,
      isAllComplete: false,
      isAllPaused,
      isAllErrored,
      isUploadStarted,
      isUploadInProgress,
      isSomeGhost,
      recoveredState,
      complete: completeFiles.length,
      newFiles: newFilesOrRecovered.length,
      numUploads: startedFiles.length,
      totalETA,
      files,
      i18n: this.i18n,
      uppy: this.uppy,
      startUpload: this.startUpload,
      doneButtonHandler: this.opts.doneButtonHandler,
      resumableUploads,
      supportsUploadProgress: supportsUploadProgress2,
      showProgressDetails: this.opts.showProgressDetails,
      hideUploadButton: this.opts.hideUploadButton,
      hideRetryButton: this.opts.hideRetryButton,
      hidePauseResumeButton: this.opts.hidePauseResumeButton,
      hideCancelButton: this.opts.hideCancelButton,
      hideAfterFinish: this.opts.hideAfterFinish,
      isTargetDOMEl: this.isTargetDOMEl
    });
  }
  onMount() {
    const element = this.el;
    const direction = getTextDirection_default(element);
    if (!direction) {
      element.dir = "ltr";
    }
  }
  install() {
    const {
      target
    } = this.opts;
    if (target) {
      this.mount(target, this);
    }
  }
  uninstall() {
    this.unmount();
  }
};
StatusBar2.VERSION = packageJson3.version;

// node_modules/@uppy/informer/lib/FadeIn.js
var TRANSITION_MS = 300;
var FadeIn = class extends k {
  constructor() {
    super(...arguments);
    this.ref = d();
  }
  componentWillEnter(callback) {
    this.ref.current.style.opacity = "1";
    this.ref.current.style.transform = "none";
    setTimeout(callback, TRANSITION_MS);
  }
  componentWillLeave(callback) {
    this.ref.current.style.opacity = "0";
    this.ref.current.style.transform = "translateY(350%)";
    setTimeout(callback, TRANSITION_MS);
  }
  render() {
    const {
      children
    } = this.props;
    return y("div", {
      className: "uppy-Informer-animated",
      ref: this.ref
    }, children);
  }
};

// node_modules/@uppy/informer/lib/TransitionGroup.js
function assign(obj, props) {
  return Object.assign(obj, props);
}
function getKey(vnode, fallback) {
  var _vnode$key;
  return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
}
function linkRef(component, name) {
  const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
  return cache[name] || (cache[name] = (c3) => {
    component.refs[name] = c3;
  });
}
function getChildMapping(children) {
  const out = {};
  for (let i3 = 0; i3 < children.length; i3++) {
    if (children[i3] != null) {
      const key = getKey(children[i3], i3.toString(36));
      out[key] = children[i3];
    }
  }
  return out;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  const getValueForKey = (key) => next.hasOwnProperty(key) ? next[key] : prev[key];
  const nextKeysPending = {};
  let pendingKeys = [];
  for (const prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  const childMapping = {};
  for (const nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (let i3 = 0; i3 < nextKeysPending[nextKey].length; i3++) {
        const pendingNextKey = nextKeysPending[nextKey][i3];
        childMapping[nextKeysPending[nextKey][i3]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (let i3 = 0; i3 < pendingKeys.length; i3++) {
    childMapping[pendingKeys[i3]] = getValueForKey(pendingKeys[i3]);
  }
  return childMapping;
}
var identity = (i3) => i3;
var TransitionGroup = class extends k {
  constructor(props, context) {
    super(props, context);
    this.refs = {};
    this.state = {
      children: getChildMapping(P(P(this.props.children)) || [])
    };
    this.performAppear = this.performAppear.bind(this);
    this.performEnter = this.performEnter.bind(this);
    this.performLeave = this.performLeave.bind(this);
  }
  componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToAbortLeave = [];
    this.keysToEnter = [];
    this.keysToLeave = [];
  }
  componentDidMount() {
    const initialChildMapping = this.state.children;
    for (const key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const nextChildMapping = getChildMapping(P(nextProps.children) || []);
    const prevChildMapping = this.state.children;
    this.setState((prevState) => ({
      children: mergeChildMappings(prevState.children, nextChildMapping)
    }));
    let key;
    for (key in nextChildMapping) {
      if (nextChildMapping.hasOwnProperty(key)) {
        const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
        if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
          this.keysToAbortLeave.push(key);
        } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
        }
      }
    }
    for (key in prevChildMapping) {
      if (prevChildMapping.hasOwnProperty(key)) {
        const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
          this.keysToLeave.push(key);
        }
      }
    }
  }
  componentDidUpdate() {
    const {
      keysToEnter
    } = this;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    const {
      keysToLeave
    } = this;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  }
  _finishAbort(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      this.keysToAbortLeave.splice(idx, 1);
    }
  }
  performAppear(key) {
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component.componentWillAppear) {
      component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
    } else {
      this._handleDoneAppearing(key);
    }
  }
  _handleDoneAppearing(key) {
    const component = this.refs[key];
    if (component.componentDidAppear) {
      component.componentDidAppear();
    }
    delete this.currentlyTransitioningKeys[key];
    this._finishAbort(key);
    const currentChildMapping = getChildMapping(P(this.props.children) || []);
    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      this.performLeave(key);
    }
  }
  performEnter(key) {
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component.componentWillEnter) {
      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
    } else {
      this._handleDoneEntering(key);
    }
  }
  _handleDoneEntering(key) {
    const component = this.refs[key];
    if (component.componentDidEnter) {
      component.componentDidEnter();
    }
    delete this.currentlyTransitioningKeys[key];
    this._finishAbort(key);
    const currentChildMapping = getChildMapping(P(this.props.children) || []);
    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      this.performLeave(key);
    }
  }
  performLeave(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      return;
    }
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else {
      this._handleDoneLeaving(key);
    }
  }
  _handleDoneLeaving(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      return;
    }
    const component = this.refs[key];
    if (component.componentDidLeave) {
      component.componentDidLeave();
    }
    delete this.currentlyTransitioningKeys[key];
    const currentChildMapping = getChildMapping(P(this.props.children) || []);
    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
      this.performEnter(key);
    } else {
      const children = assign({}, this.state.children);
      delete children[key];
      this.setState({
        children
      });
    }
  }
  render(_ref, _ref2) {
    let {
      childFactory,
      transitionLeave,
      transitionName: transitionName2,
      transitionAppear,
      transitionEnter,
      transitionLeaveTimeout,
      transitionEnterTimeout,
      transitionAppearTimeout,
      component,
      ...props
    } = _ref;
    let {
      children
    } = _ref2;
    const childrenToRender = Object.entries(children).map((_ref3) => {
      let [key, child] = _ref3;
      if (!child)
        return void 0;
      const ref = linkRef(this, key);
      return E(childFactory(child), {
        ref,
        key
      });
    }).filter(Boolean);
    return y(component, props, childrenToRender);
  }
};
TransitionGroup.defaultProps = {
  component: "span",
  childFactory: identity
};
var TransitionGroup_default = TransitionGroup;

// node_modules/@uppy/informer/lib/Informer.js
var packageJson4 = {
  "version": "3.0.1"
};
var Informer = class extends UIPlugin_default {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.render = (state) => {
      return y("div", {
        className: "uppy uppy-Informer"
      }, y(TransitionGroup_default, null, state.info.map((info) => y(FadeIn, {
        key: info.message
      }, y("p", {
        role: "alert"
      }, info.message, " ", info.details && y("span", {
        "aria-label": info.details,
        "data-microtip-position": "top-left",
        "data-microtip-size": "medium",
        role: "tooltip",
        onClick: () => alert(`${info.message} 

 ${info.details}`)
      }, "?"))))));
    };
    this.type = "progressindicator";
    this.id = this.opts.id || "Informer";
    this.title = "Informer";
    const defaultOptions4 = {};
    this.opts = {
      ...defaultOptions4,
      ...opts
    };
  }
  install() {
    const {
      target
    } = this.opts;
    if (target) {
      this.mount(target, this);
    }
  }
};
Informer.VERSION = packageJson4.version;

// node_modules/@uppy/utils/lib/dataURItoBlob.js
var DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function dataURItoBlob(dataURI, opts, toFile) {
  var _ref, _opts$mimeType;
  const dataURIData = DATA_URL_PATTERN.exec(dataURI);
  const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : "plain/text";
  let data;
  if (dataURIData[2] != null) {
    const binary = atob(decodeURIComponent(dataURIData[3]));
    const bytes = new Uint8Array(binary.length);
    for (let i3 = 0; i3 < binary.length; i3++) {
      bytes[i3] = binary.charCodeAt(i3);
    }
    data = [bytes];
  } else {
    data = [decodeURIComponent(dataURIData[3])];
  }
  if (toFile) {
    return new File(data, opts.name || "", {
      type: mimeType
    });
  }
  return new Blob(data, {
    type: mimeType
  });
}

// node_modules/@uppy/utils/lib/isObjectURL.js
function isObjectURL(url) {
  return url.startsWith("blob:");
}

// node_modules/@uppy/utils/lib/isPreviewSupported.js
function isPreviewSupported(fileType) {
  if (!fileType)
    return false;
  return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
}

// node_modules/exifr/dist/mini.esm.mjs
function e2(e3, t3, s3) {
  return t3 in e3 ? Object.defineProperty(e3, t3, { value: s3, enumerable: true, configurable: true, writable: true }) : e3[t3] = s3, e3;
}
var t2 = "undefined" != typeof self ? self : global;
var s2 = "undefined" != typeof navigator;
var i2 = s2 && "undefined" == typeof HTMLImageElement;
var n2 = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node);
var r2 = t2.Buffer;
var a2 = !!r2;
var h2 = (e3) => void 0 !== e3;
function f2(e3) {
  return void 0 === e3 || (e3 instanceof Map ? 0 === e3.size : 0 === Object.values(e3).filter(h2).length);
}
function l2(e3) {
  let t3 = new Error(e3);
  throw delete t3.stack, t3;
}
function o2(e3) {
  let t3 = function(e4) {
    let t4 = 0;
    return e4.ifd0.enabled && (t4 += 1024), e4.exif.enabled && (t4 += 2048), e4.makerNote && (t4 += 2048), e4.userComment && (t4 += 1024), e4.gps.enabled && (t4 += 512), e4.interop.enabled && (t4 += 100), e4.ifd1.enabled && (t4 += 1024), t4 + 2048;
  }(e3);
  return e3.jfif.enabled && (t3 += 50), e3.xmp.enabled && (t3 += 2e4), e3.iptc.enabled && (t3 += 14e3), e3.icc.enabled && (t3 += 6e3), t3;
}
var u2 = (e3) => String.fromCharCode.apply(null, e3);
var d2 = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
var c2 = class {
  static from(e3, t3) {
    return e3 instanceof this && e3.le === t3 ? e3 : new c2(e3, void 0, void 0, t3);
  }
  constructor(e3, t3 = 0, s3, i3) {
    if ("boolean" == typeof i3 && (this.le = i3), Array.isArray(e3) && (e3 = new Uint8Array(e3)), 0 === e3)
      this.byteOffset = 0, this.byteLength = 0;
    else if (e3 instanceof ArrayBuffer) {
      void 0 === s3 && (s3 = e3.byteLength - t3);
      let i4 = new DataView(e3, t3, s3);
      this._swapDataView(i4);
    } else if (e3 instanceof Uint8Array || e3 instanceof DataView || e3 instanceof c2) {
      void 0 === s3 && (s3 = e3.byteLength - t3), (t3 += e3.byteOffset) + s3 > e3.byteOffset + e3.byteLength && l2("Creating view outside of available memory in ArrayBuffer");
      let i4 = new DataView(e3.buffer, t3, s3);
      this._swapDataView(i4);
    } else if ("number" == typeof e3) {
      let t4 = new DataView(new ArrayBuffer(e3));
      this._swapDataView(t4);
    } else
      l2("Invalid input argument for BufferView: " + e3);
  }
  _swapArrayBuffer(e3) {
    this._swapDataView(new DataView(e3));
  }
  _swapBuffer(e3) {
    this._swapDataView(new DataView(e3.buffer, e3.byteOffset, e3.byteLength));
  }
  _swapDataView(e3) {
    this.dataView = e3, this.buffer = e3.buffer, this.byteOffset = e3.byteOffset, this.byteLength = e3.byteLength;
  }
  _lengthToEnd(e3) {
    return this.byteLength - e3;
  }
  set(e3, t3, s3 = c2) {
    return e3 instanceof DataView || e3 instanceof c2 ? e3 = new Uint8Array(e3.buffer, e3.byteOffset, e3.byteLength) : e3 instanceof ArrayBuffer && (e3 = new Uint8Array(e3)), e3 instanceof Uint8Array || l2("BufferView.set(): Invalid data argument."), this.toUint8().set(e3, t3), new s3(this, t3, e3.byteLength);
  }
  subarray(e3, t3) {
    return t3 = t3 || this._lengthToEnd(e3), new c2(this, e3, t3);
  }
  toUint8() {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }
  getUint8Array(e3, t3) {
    return new Uint8Array(this.buffer, this.byteOffset + e3, t3);
  }
  getString(e3 = 0, t3 = this.byteLength) {
    let s3 = this.getUint8Array(e3, t3);
    return i3 = s3, d2 ? d2.decode(i3) : a2 ? Buffer.from(i3).toString("utf8") : decodeURIComponent(escape(u2(i3)));
    var i3;
  }
  getLatin1String(e3 = 0, t3 = this.byteLength) {
    let s3 = this.getUint8Array(e3, t3);
    return u2(s3);
  }
  getUnicodeString(e3 = 0, t3 = this.byteLength) {
    const s3 = [];
    for (let i3 = 0; i3 < t3 && e3 + i3 < this.byteLength; i3 += 2)
      s3.push(this.getUint16(e3 + i3));
    return u2(s3);
  }
  getInt8(e3) {
    return this.dataView.getInt8(e3);
  }
  getUint8(e3) {
    return this.dataView.getUint8(e3);
  }
  getInt16(e3, t3 = this.le) {
    return this.dataView.getInt16(e3, t3);
  }
  getInt32(e3, t3 = this.le) {
    return this.dataView.getInt32(e3, t3);
  }
  getUint16(e3, t3 = this.le) {
    return this.dataView.getUint16(e3, t3);
  }
  getUint32(e3, t3 = this.le) {
    return this.dataView.getUint32(e3, t3);
  }
  getFloat32(e3, t3 = this.le) {
    return this.dataView.getFloat32(e3, t3);
  }
  getFloat64(e3, t3 = this.le) {
    return this.dataView.getFloat64(e3, t3);
  }
  getFloat(e3, t3 = this.le) {
    return this.dataView.getFloat32(e3, t3);
  }
  getDouble(e3, t3 = this.le) {
    return this.dataView.getFloat64(e3, t3);
  }
  getUintBytes(e3, t3, s3) {
    switch (t3) {
      case 1:
        return this.getUint8(e3, s3);
      case 2:
        return this.getUint16(e3, s3);
      case 4:
        return this.getUint32(e3, s3);
      case 8:
        return this.getUint64 && this.getUint64(e3, s3);
    }
  }
  getUint(e3, t3, s3) {
    switch (t3) {
      case 8:
        return this.getUint8(e3, s3);
      case 16:
        return this.getUint16(e3, s3);
      case 32:
        return this.getUint32(e3, s3);
      case 64:
        return this.getUint64 && this.getUint64(e3, s3);
    }
  }
  toString(e3) {
    return this.dataView.toString(e3, this.constructor.name);
  }
  ensureChunk() {
  }
};
function p2(e3, t3) {
  l2(`${e3} '${t3}' was not loaded, try using full build of exifr.`);
}
var g2 = class extends Map {
  constructor(e3) {
    super(), this.kind = e3;
  }
  get(e3, t3) {
    return this.has(e3) || p2(this.kind, e3), t3 && (e3 in t3 || function(e4, t4) {
      l2(`Unknown ${e4} '${t4}'.`);
    }(this.kind, e3), t3[e3].enabled || p2(this.kind, e3)), super.get(e3);
  }
  keyList() {
    return Array.from(this.keys());
  }
};
var m2 = new g2("file parser");
var y2 = new g2("segment parser");
var b2 = new g2("file reader");
var w2 = t2.fetch;
function k2(e3, t3) {
  return (i3 = e3).startsWith("data:") || i3.length > 1e4 ? v2(e3, t3, "base64") : n2 && e3.includes("://") ? O2(e3, t3, "url", S2) : n2 ? v2(e3, t3, "fs") : s2 ? O2(e3, t3, "url", S2) : void l2("Invalid input argument");
  var i3;
}
async function O2(e3, t3, s3, i3) {
  return b2.has(s3) ? v2(e3, t3, s3) : i3 ? async function(e4, t4) {
    let s4 = await t4(e4);
    return new c2(s4);
  }(e3, i3) : void l2(`Parser ${s3} is not loaded`);
}
async function v2(e3, t3, s3) {
  let i3 = new (b2.get(s3))(e3, t3);
  return await i3.read(), i3;
}
var S2 = (e3) => w2(e3).then((e4) => e4.arrayBuffer());
var A2 = (e3) => new Promise((t3, s3) => {
  let i3 = new FileReader();
  i3.onloadend = () => t3(i3.result || new ArrayBuffer()), i3.onerror = s3, i3.readAsArrayBuffer(e3);
});
var U = class extends Map {
  get tagKeys() {
    return this.allKeys || (this.allKeys = Array.from(this.keys())), this.allKeys;
  }
  get tagValues() {
    return this.allValues || (this.allValues = Array.from(this.values())), this.allValues;
  }
};
function x2(e3, t3, s3) {
  let i3 = new U();
  for (let [e4, t4] of s3)
    i3.set(e4, t4);
  if (Array.isArray(t3))
    for (let s4 of t3)
      e3.set(s4, i3);
  else
    e3.set(t3, i3);
  return i3;
}
function C2(e3, t3, s3) {
  let i3, n3 = e3.get(t3);
  for (i3 of s3)
    n3.set(i3[0], i3[1]);
}
var B2 = /* @__PURE__ */ new Map();
var V = /* @__PURE__ */ new Map();
var I2 = /* @__PURE__ */ new Map();
var L2 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
var T2 = ["jfif", "xmp", "icc", "iptc", "ihdr"];
var z2 = ["tiff", ...T2];
var P2 = ["ifd0", "ifd1", "exif", "gps", "interop"];
var F = [...z2, ...P2];
var j2 = ["makerNote", "userComment"];
var E2 = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
var M2 = [...E2, "sanitize", "mergeOutput", "silentErrors"];
var _2 = class {
  get translate() {
    return this.translateKeys || this.translateValues || this.reviveValues;
  }
};
var D = class extends _2 {
  get needed() {
    return this.enabled || this.deps.size > 0;
  }
  constructor(t3, s3, i3, n3) {
    if (super(), e2(this, "enabled", false), e2(this, "skip", /* @__PURE__ */ new Set()), e2(this, "pick", /* @__PURE__ */ new Set()), e2(this, "deps", /* @__PURE__ */ new Set()), e2(this, "translateKeys", false), e2(this, "translateValues", false), e2(this, "reviveValues", false), this.key = t3, this.enabled = s3, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = P2.includes(t3), this.canBeFiltered && (this.dict = B2.get(t3)), void 0 !== i3)
      if (Array.isArray(i3))
        this.parse = this.enabled = true, this.canBeFiltered && i3.length > 0 && this.translateTagSet(i3, this.pick);
      else if ("object" == typeof i3) {
        if (this.enabled = true, this.parse = false !== i3.parse, this.canBeFiltered) {
          let { pick: e3, skip: t4 } = i3;
          e3 && e3.length > 0 && this.translateTagSet(e3, this.pick), t4 && t4.length > 0 && this.translateTagSet(t4, this.skip);
        }
        this.applyInheritables(i3);
      } else
        true === i3 || false === i3 ? this.parse = this.enabled = i3 : l2(`Invalid options argument: ${i3}`);
  }
  applyInheritables(e3) {
    let t3, s3;
    for (t3 of E2)
      s3 = e3[t3], void 0 !== s3 && (this[t3] = s3);
  }
  translateTagSet(e3, t3) {
    if (this.dict) {
      let s3, i3, { tagKeys: n3, tagValues: r3 } = this.dict;
      for (s3 of e3)
        "string" == typeof s3 ? (i3 = r3.indexOf(s3), -1 === i3 && (i3 = n3.indexOf(Number(s3))), -1 !== i3 && t3.add(Number(n3[i3]))) : t3.add(s3);
    } else
      for (let s3 of e3)
        t3.add(s3);
  }
  finalizeFilters() {
    !this.enabled && this.deps.size > 0 ? (this.enabled = true, X(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && X(this.pick, this.deps);
  }
};
var N2 = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 };
var $2 = /* @__PURE__ */ new Map();
var R = class extends _2 {
  static useCached(e3) {
    let t3 = $2.get(e3);
    return void 0 !== t3 || (t3 = new this(e3), $2.set(e3, t3)), t3;
  }
  constructor(e3) {
    super(), true === e3 ? this.setupFromTrue() : void 0 === e3 ? this.setupFromUndefined() : Array.isArray(e3) ? this.setupFromArray(e3) : "object" == typeof e3 ? this.setupFromObject(e3) : l2(`Invalid options argument ${e3}`), void 0 === this.firstChunkSize && (this.firstChunkSize = s2 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
  }
  setupFromUndefined() {
    let e3;
    for (e3 of L2)
      this[e3] = N2[e3];
    for (e3 of M2)
      this[e3] = N2[e3];
    for (e3 of j2)
      this[e3] = N2[e3];
    for (e3 of F)
      this[e3] = new D(e3, N2[e3], void 0, this);
  }
  setupFromTrue() {
    let e3;
    for (e3 of L2)
      this[e3] = N2[e3];
    for (e3 of M2)
      this[e3] = N2[e3];
    for (e3 of j2)
      this[e3] = true;
    for (e3 of F)
      this[e3] = new D(e3, true, void 0, this);
  }
  setupFromArray(e3) {
    let t3;
    for (t3 of L2)
      this[t3] = N2[t3];
    for (t3 of M2)
      this[t3] = N2[t3];
    for (t3 of j2)
      this[t3] = N2[t3];
    for (t3 of F)
      this[t3] = new D(t3, false, void 0, this);
    this.setupGlobalFilters(e3, void 0, P2);
  }
  setupFromObject(e3) {
    let t3;
    for (t3 of (P2.ifd0 = P2.ifd0 || P2.image, P2.ifd1 = P2.ifd1 || P2.thumbnail, Object.assign(this, e3), L2))
      this[t3] = W(e3[t3], N2[t3]);
    for (t3 of M2)
      this[t3] = W(e3[t3], N2[t3]);
    for (t3 of j2)
      this[t3] = W(e3[t3], N2[t3]);
    for (t3 of z2)
      this[t3] = new D(t3, N2[t3], e3[t3], this);
    for (t3 of P2)
      this[t3] = new D(t3, N2[t3], e3[t3], this.tiff);
    this.setupGlobalFilters(e3.pick, e3.skip, P2, F), true === e3.tiff ? this.batchEnableWithBool(P2, true) : false === e3.tiff ? this.batchEnableWithUserValue(P2, e3) : Array.isArray(e3.tiff) ? this.setupGlobalFilters(e3.tiff, void 0, P2) : "object" == typeof e3.tiff && this.setupGlobalFilters(e3.tiff.pick, e3.tiff.skip, P2);
  }
  batchEnableWithBool(e3, t3) {
    for (let s3 of e3)
      this[s3].enabled = t3;
  }
  batchEnableWithUserValue(e3, t3) {
    for (let s3 of e3) {
      let e4 = t3[s3];
      this[s3].enabled = false !== e4 && void 0 !== e4;
    }
  }
  setupGlobalFilters(e3, t3, s3, i3 = s3) {
    if (e3 && e3.length) {
      for (let e4 of i3)
        this[e4].enabled = false;
      let t4 = K(e3, s3);
      for (let [e4, s4] of t4)
        X(this[e4].pick, s4), this[e4].enabled = true;
    } else if (t3 && t3.length) {
      let e4 = K(t3, s3);
      for (let [t4, s4] of e4)
        X(this[t4].skip, s4);
    }
  }
  filterNestedSegmentTags() {
    let { ifd0: e3, exif: t3, xmp: s3, iptc: i3, icc: n3 } = this;
    this.makerNote ? t3.deps.add(37500) : t3.skip.add(37500), this.userComment ? t3.deps.add(37510) : t3.skip.add(37510), s3.enabled || e3.skip.add(700), i3.enabled || e3.skip.add(33723), n3.enabled || e3.skip.add(34675);
  }
  traverseTiffDependencyTree() {
    let { ifd0: e3, exif: t3, gps: s3, interop: i3 } = this;
    i3.needed && (t3.deps.add(40965), e3.deps.add(40965)), t3.needed && e3.deps.add(34665), s3.needed && e3.deps.add(34853), this.tiff.enabled = P2.some((e4) => true === this[e4].enabled) || this.makerNote || this.userComment;
    for (let e4 of P2)
      this[e4].finalizeFilters();
  }
  get onlyTiff() {
    return !T2.map((e3) => this[e3].enabled).some((e3) => true === e3) && this.tiff.enabled;
  }
  checkLoadedPlugins() {
    for (let e3 of z2)
      this[e3].enabled && !y2.has(e3) && p2("segment parser", e3);
  }
};
function K(e3, t3) {
  let s3, i3, n3, r3, a3 = [];
  for (n3 of t3) {
    for (r3 of (s3 = B2.get(n3), i3 = [], s3))
      (e3.includes(r3[0]) || e3.includes(r3[1])) && i3.push(r3[0]);
    i3.length && a3.push([n3, i3]);
  }
  return a3;
}
function W(e3, t3) {
  return void 0 !== e3 ? e3 : void 0 !== t3 ? t3 : void 0;
}
function X(e3, t3) {
  for (let s3 of t3)
    e3.add(s3);
}
e2(R, "default", N2);
var H2 = class {
  constructor(t3) {
    e2(this, "parsers", {}), e2(this, "output", {}), e2(this, "errors", []), e2(this, "pushToErrors", (e3) => this.errors.push(e3)), this.options = R.useCached(t3);
  }
  async read(e3) {
    this.file = await function(e4, t3) {
      return "string" == typeof e4 ? k2(e4, t3) : s2 && !i2 && e4 instanceof HTMLImageElement ? k2(e4.src, t3) : e4 instanceof Uint8Array || e4 instanceof ArrayBuffer || e4 instanceof DataView ? new c2(e4) : s2 && e4 instanceof Blob ? O2(e4, t3, "blob", A2) : void l2("Invalid input argument");
    }(e3, this.options);
  }
  setup() {
    if (this.fileParser)
      return;
    let { file: e3 } = this, t3 = e3.getUint16(0);
    for (let [s3, i3] of m2)
      if (i3.canHandle(e3, t3))
        return this.fileParser = new i3(this.options, this.file, this.parsers), e3[s3] = true;
    this.file.close && this.file.close(), l2("Unknown file format");
  }
  async parse() {
    let { output: e3, errors: t3 } = this;
    return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t3.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t3.length > 0 && (e3.errors = t3), f2(s3 = e3) ? void 0 : s3;
    var s3;
  }
  async executeParsers() {
    let { output: e3 } = this;
    await this.fileParser.parse();
    let t3 = Object.values(this.parsers).map(async (t4) => {
      let s3 = await t4.parse();
      t4.assignToOutput(e3, s3);
    });
    this.options.silentErrors && (t3 = t3.map((e4) => e4.catch(this.pushToErrors))), await Promise.all(t3);
  }
  async extractThumbnail() {
    this.setup();
    let { options: e3, file: t3 } = this, s3 = y2.get("tiff", e3);
    var i3;
    if (t3.tiff ? i3 = { start: 0, type: "tiff" } : t3.jpeg && (i3 = await this.fileParser.getOrFindSegment("tiff")), void 0 === i3)
      return;
    let n3 = await this.fileParser.ensureSegmentChunk(i3), r3 = this.parsers.tiff = new s3(n3, e3, t3), a3 = await r3.extractThumbnail();
    return t3.close && t3.close(), a3;
  }
};
async function Y(e3, t3) {
  let s3 = new H2(t3);
  return await s3.read(e3), s3.parse();
}
var G = Object.freeze({ __proto__: null, parse: Y, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B2, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S2, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E2, allFormatters: M2, Options: R });
var J = class {
  static findPosition(e3, t3) {
    let s3 = e3.getUint16(t3 + 2) + 2, i3 = "function" == typeof this.headerLength ? this.headerLength(e3, t3, s3) : this.headerLength, n3 = t3 + i3, r3 = s3 - i3;
    return { offset: t3, length: s3, headerLength: i3, start: n3, size: r3, end: n3 + r3 };
  }
  static parse(e3, t3 = {}) {
    return new this(e3, new R({ [this.type]: t3 }), e3).parse();
  }
  normalizeInput(e3) {
    return e3 instanceof c2 ? e3 : new c2(e3);
  }
  constructor(t3, s3 = {}, i3) {
    e2(this, "errors", []), e2(this, "raw", /* @__PURE__ */ new Map()), e2(this, "handleError", (e3) => {
      if (!this.options.silentErrors)
        throw e3;
      this.errors.push(e3.message);
    }), this.chunk = this.normalizeInput(t3), this.file = i3, this.type = this.constructor.type, this.globalOptions = this.options = s3, this.localOptions = s3[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
  }
  translate() {
    this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
  }
  get output() {
    return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
  }
  translateBlock(e3, t3) {
    let s3 = I2.get(t3), i3 = V.get(t3), n3 = B2.get(t3), r3 = this.options[t3], a3 = r3.reviveValues && !!s3, h3 = r3.translateValues && !!i3, f3 = r3.translateKeys && !!n3, l3 = {};
    for (let [t4, r4] of e3)
      a3 && s3.has(t4) ? r4 = s3.get(t4)(r4) : h3 && i3.has(t4) && (r4 = this.translateValue(r4, i3.get(t4))), f3 && n3.has(t4) && (t4 = n3.get(t4) || t4), l3[t4] = r4;
    return l3;
  }
  translateValue(e3, t3) {
    return t3[e3] || t3.DEFAULT || e3;
  }
  assignToOutput(e3, t3) {
    this.assignObjectToOutput(e3, this.constructor.type, t3);
  }
  assignObjectToOutput(e3, t3, s3) {
    if (this.globalOptions.mergeOutput)
      return Object.assign(e3, s3);
    e3[t3] ? Object.assign(e3[t3], s3) : e3[t3] = s3;
  }
};
e2(J, "headerLength", 4), e2(J, "type", void 0), e2(J, "multiSegment", false), e2(J, "canHandle", () => false);
function q2(e3) {
  return 192 === e3 || 194 === e3 || 196 === e3 || 219 === e3 || 221 === e3 || 218 === e3 || 254 === e3;
}
function Q(e3) {
  return e3 >= 224 && e3 <= 239;
}
function Z(e3, t3, s3) {
  for (let [i3, n3] of y2)
    if (n3.canHandle(e3, t3, s3))
      return i3;
}
var ee2 = class extends class {
  constructor(t3, s3, i3) {
    e2(this, "errors", []), e2(this, "ensureSegmentChunk", async (e3) => {
      let t4 = e3.start, s4 = e3.size || 65536;
      if (this.file.chunked)
        if (this.file.available(t4, s4))
          e3.chunk = this.file.subarray(t4, s4);
        else
          try {
            e3.chunk = await this.file.readChunk(t4, s4);
          } catch (t5) {
            l2(`Couldn't read segment: ${JSON.stringify(e3)}. ${t5.message}`);
          }
      else
        this.file.byteLength > t4 + s4 ? e3.chunk = this.file.subarray(t4, s4) : void 0 === e3.size ? e3.chunk = this.file.subarray(t4) : l2("Segment unreachable: " + JSON.stringify(e3));
      return e3.chunk;
    }), this.extendOptions && this.extendOptions(t3), this.options = t3, this.file = s3, this.parsers = i3;
  }
  injectSegment(e3, t3) {
    this.options[e3].enabled && this.createParser(e3, t3);
  }
  createParser(e3, t3) {
    let s3 = new (y2.get(e3))(t3, this.options, this.file);
    return this.parsers[e3] = s3;
  }
  createParsers(e3) {
    for (let t3 of e3) {
      let { type: e4, chunk: s3 } = t3, i3 = this.options[e4];
      if (i3 && i3.enabled) {
        let t4 = this.parsers[e4];
        t4 && t4.append || t4 || this.createParser(e4, s3);
      }
    }
  }
  async readSegments(e3) {
    let t3 = e3.map(this.ensureSegmentChunk);
    await Promise.all(t3);
  }
} {
  constructor(...t3) {
    super(...t3), e2(this, "appSegments", []), e2(this, "jpegSegments", []), e2(this, "unknownSegments", []);
  }
  static canHandle(e3, t3) {
    return 65496 === t3;
  }
  async parse() {
    await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
  }
  setupSegmentFinderArgs(e3) {
    true === e3 ? (this.findAll = true, this.wanted = new Set(y2.keyList())) : (e3 = void 0 === e3 ? y2.keyList().filter((e4) => this.options[e4].enabled) : e3.filter((e4) => this.options[e4].enabled && y2.has(e4)), this.findAll = false, this.remaining = new Set(e3), this.wanted = new Set(e3)), this.unfinishedMultiSegment = false;
  }
  async findAppSegments(e3 = 0, t3) {
    this.setupSegmentFinderArgs(t3);
    let { file: s3, findAll: i3, wanted: n3, remaining: r3 } = this;
    if (!i3 && this.file.chunked && (i3 = Array.from(n3).some((e4) => {
      let t4 = y2.get(e4), s4 = this.options[e4];
      return t4.multiSegment && s4.multiSegment;
    }), i3 && await this.file.readWhole()), e3 = this.findAppSegmentsInRange(e3, s3.byteLength), !this.options.onlyTiff && s3.chunked) {
      let t4 = false;
      for (; r3.size > 0 && !t4 && (s3.canReadNextChunk || this.unfinishedMultiSegment); ) {
        let { nextChunkOffset: i4 } = s3, n4 = this.appSegments.some((e4) => !this.file.available(e4.offset || e4.start, e4.length || e4.size));
        if (t4 = e3 > i4 && !n4 ? !await s3.readNextChunk(e3) : !await s3.readNextChunk(i4), void 0 === (e3 = this.findAppSegmentsInRange(e3, s3.byteLength)))
          return;
      }
    }
  }
  findAppSegmentsInRange(e3, t3) {
    t3 -= 2;
    let s3, i3, n3, r3, a3, h3, { file: f3, findAll: l3, wanted: o3, remaining: u3, options: d3 } = this;
    for (; e3 < t3; e3++)
      if (255 === f3.getUint8(e3)) {
        if (s3 = f3.getUint8(e3 + 1), Q(s3)) {
          if (i3 = f3.getUint16(e3 + 2), n3 = Z(f3, e3, i3), n3 && o3.has(n3) && (r3 = y2.get(n3), a3 = r3.findPosition(f3, e3), h3 = d3[n3], a3.type = n3, this.appSegments.push(a3), !l3 && (r3.multiSegment && h3.multiSegment ? (this.unfinishedMultiSegment = a3.chunkNumber < a3.chunkCount, this.unfinishedMultiSegment || u3.delete(n3)) : u3.delete(n3), 0 === u3.size)))
            break;
          d3.recordUnknownSegments && (a3 = J.findPosition(f3, e3), a3.marker = s3, this.unknownSegments.push(a3)), e3 += i3 + 1;
        } else if (q2(s3)) {
          if (i3 = f3.getUint16(e3 + 2), 218 === s3 && false !== d3.stopAfterSos)
            return;
          d3.recordJpegSegments && this.jpegSegments.push({ offset: e3, length: i3, marker: s3 }), e3 += i3 + 1;
        }
      }
    return e3;
  }
  mergeMultiSegments() {
    if (!this.appSegments.some((e4) => e4.multiSegment))
      return;
    let e3 = function(e4, t3) {
      let s3, i3, n3, r3 = /* @__PURE__ */ new Map();
      for (let a3 = 0; a3 < e4.length; a3++)
        s3 = e4[a3], i3 = s3[t3], r3.has(i3) ? n3 = r3.get(i3) : r3.set(i3, n3 = []), n3.push(s3);
      return Array.from(r3);
    }(this.appSegments, "type");
    this.mergedAppSegments = e3.map(([e4, t3]) => {
      let s3 = y2.get(e4, this.options);
      if (s3.handleMultiSegments) {
        return { type: e4, chunk: s3.handleMultiSegments(t3) };
      }
      return t3[0];
    });
  }
  getSegment(e3) {
    return this.appSegments.find((t3) => t3.type === e3);
  }
  async getOrFindSegment(e3) {
    let t3 = this.getSegment(e3);
    return void 0 === t3 && (await this.findAppSegments(0, [e3]), t3 = this.getSegment(e3)), t3;
  }
};
e2(ee2, "type", "jpeg"), m2.set("jpeg", ee2);
var te = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
var se = class extends J {
  parseHeader() {
    var e3 = this.chunk.getUint16();
    18761 === e3 ? this.le = true : 19789 === e3 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
  }
  parseTags(e3, t3, s3 = /* @__PURE__ */ new Map()) {
    let { pick: i3, skip: n3 } = this.options[t3];
    i3 = new Set(i3);
    let r3 = i3.size > 0, a3 = 0 === n3.size, h3 = this.chunk.getUint16(e3);
    e3 += 2;
    for (let f3 = 0; f3 < h3; f3++) {
      let h4 = this.chunk.getUint16(e3);
      if (r3) {
        if (i3.has(h4) && (s3.set(h4, this.parseTag(e3, h4, t3)), i3.delete(h4), 0 === i3.size))
          break;
      } else
        !a3 && n3.has(h4) || s3.set(h4, this.parseTag(e3, h4, t3));
      e3 += 12;
    }
    return s3;
  }
  parseTag(e3, t3, s3) {
    let { chunk: i3 } = this, n3 = i3.getUint16(e3 + 2), r3 = i3.getUint32(e3 + 4), a3 = te[n3];
    if (a3 * r3 <= 4 ? e3 += 8 : e3 = i3.getUint32(e3 + 8), (n3 < 1 || n3 > 13) && l2(`Invalid TIFF value type. block: ${s3.toUpperCase()}, tag: ${t3.toString(16)}, type: ${n3}, offset ${e3}`), e3 > i3.byteLength && l2(`Invalid TIFF value offset. block: ${s3.toUpperCase()}, tag: ${t3.toString(16)}, type: ${n3}, offset ${e3} is outside of chunk size ${i3.byteLength}`), 1 === n3)
      return i3.getUint8Array(e3, r3);
    if (2 === n3)
      return "" === (h3 = function(e4) {
        for (; e4.endsWith("\0"); )
          e4 = e4.slice(0, -1);
        return e4;
      }(h3 = i3.getString(e3, r3)).trim()) ? void 0 : h3;
    var h3;
    if (7 === n3)
      return i3.getUint8Array(e3, r3);
    if (1 === r3)
      return this.parseTagValue(n3, e3);
    {
      let t4 = new (function(e4) {
        switch (e4) {
          case 1:
            return Uint8Array;
          case 3:
            return Uint16Array;
          case 4:
            return Uint32Array;
          case 5:
            return Array;
          case 6:
            return Int8Array;
          case 8:
            return Int16Array;
          case 9:
            return Int32Array;
          case 10:
            return Array;
          case 11:
            return Float32Array;
          case 12:
            return Float64Array;
          default:
            return Array;
        }
      }(n3))(r3), s4 = a3;
      for (let i4 = 0; i4 < r3; i4++)
        t4[i4] = this.parseTagValue(n3, e3), e3 += s4;
      return t4;
    }
  }
  parseTagValue(e3, t3) {
    let { chunk: s3 } = this;
    switch (e3) {
      case 1:
        return s3.getUint8(t3);
      case 3:
        return s3.getUint16(t3);
      case 4:
        return s3.getUint32(t3);
      case 5:
        return s3.getUint32(t3) / s3.getUint32(t3 + 4);
      case 6:
        return s3.getInt8(t3);
      case 8:
        return s3.getInt16(t3);
      case 9:
        return s3.getInt32(t3);
      case 10:
        return s3.getInt32(t3) / s3.getInt32(t3 + 4);
      case 11:
        return s3.getFloat(t3);
      case 12:
        return s3.getDouble(t3);
      case 13:
        return s3.getUint32(t3);
      default:
        l2(`Invalid tiff type ${e3}`);
    }
  }
};
var ie = class extends se {
  static canHandle(e3, t3) {
    return 225 === e3.getUint8(t3 + 1) && 1165519206 === e3.getUint32(t3 + 4) && 0 === e3.getUint16(t3 + 8);
  }
  async parse() {
    this.parseHeader();
    let { options: e3 } = this;
    return e3.ifd0.enabled && await this.parseIfd0Block(), e3.exif.enabled && await this.safeParse("parseExifBlock"), e3.gps.enabled && await this.safeParse("parseGpsBlock"), e3.interop.enabled && await this.safeParse("parseInteropBlock"), e3.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
  }
  safeParse(e3) {
    let t3 = this[e3]();
    return void 0 !== t3.catch && (t3 = t3.catch(this.handleError)), t3;
  }
  findIfd0Offset() {
    void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
  }
  findIfd1Offset() {
    if (void 0 === this.ifd1Offset) {
      this.findIfd0Offset();
      let e3 = this.chunk.getUint16(this.ifd0Offset), t3 = this.ifd0Offset + 2 + 12 * e3;
      this.ifd1Offset = this.chunk.getUint32(t3);
    }
  }
  parseBlock(e3, t3) {
    let s3 = /* @__PURE__ */ new Map();
    return this[t3] = s3, this.parseTags(e3, t3, s3), s3;
  }
  async parseIfd0Block() {
    if (this.ifd0)
      return;
    let { file: e3 } = this;
    this.findIfd0Offset(), this.ifd0Offset < 8 && l2("Malformed EXIF data"), !e3.chunked && this.ifd0Offset > e3.byteLength && l2(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e3.byteLength}`), e3.tiff && await e3.ensureChunk(this.ifd0Offset, o2(this.options));
    let t3 = this.parseBlock(this.ifd0Offset, "ifd0");
    return 0 !== t3.size ? (this.exifOffset = t3.get(34665), this.interopOffset = t3.get(40965), this.gpsOffset = t3.get(34853), this.xmp = t3.get(700), this.iptc = t3.get(33723), this.icc = t3.get(34675), this.options.sanitize && (t3.delete(34665), t3.delete(40965), t3.delete(34853), t3.delete(700), t3.delete(33723), t3.delete(34675)), t3) : void 0;
  }
  async parseExifBlock() {
    if (this.exif)
      return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset)
      return;
    this.file.tiff && await this.file.ensureChunk(this.exifOffset, o2(this.options));
    let e3 = this.parseBlock(this.exifOffset, "exif");
    return this.interopOffset || (this.interopOffset = e3.get(40965)), this.makerNote = e3.get(37500), this.userComment = e3.get(37510), this.options.sanitize && (e3.delete(40965), e3.delete(37500), e3.delete(37510)), this.unpack(e3, 41728), this.unpack(e3, 41729), e3;
  }
  unpack(e3, t3) {
    let s3 = e3.get(t3);
    s3 && 1 === s3.length && e3.set(t3, s3[0]);
  }
  async parseGpsBlock() {
    if (this.gps)
      return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset)
      return;
    let e3 = this.parseBlock(this.gpsOffset, "gps");
    return e3 && e3.has(2) && e3.has(4) && (e3.set("latitude", ne(...e3.get(2), e3.get(1))), e3.set("longitude", ne(...e3.get(4), e3.get(3)))), e3;
  }
  async parseInteropBlock() {
    if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset))
      return this.parseBlock(this.interopOffset, "interop");
  }
  async parseThumbnailBlock(e3 = false) {
    if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e3))
      return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
  }
  async extractThumbnail() {
    if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1)
      return;
    let e3 = this.ifd1.get(513), t3 = this.ifd1.get(514);
    return this.chunk.getUint8Array(e3, t3);
  }
  get image() {
    return this.ifd0;
  }
  get thumbnail() {
    return this.ifd1;
  }
  createOutput() {
    let e3, t3, s3, i3 = {};
    for (t3 of P2)
      if (e3 = this[t3], !f2(e3))
        if (s3 = this.canTranslate ? this.translateBlock(e3, t3) : Object.fromEntries(e3), this.options.mergeOutput) {
          if ("ifd1" === t3)
            continue;
          Object.assign(i3, s3);
        } else
          i3[t3] = s3;
    return this.makerNote && (i3.makerNote = this.makerNote), this.userComment && (i3.userComment = this.userComment), i3;
  }
  assignToOutput(e3, t3) {
    if (this.globalOptions.mergeOutput)
      Object.assign(e3, t3);
    else
      for (let [s3, i3] of Object.entries(t3))
        this.assignObjectToOutput(e3, s3, i3);
  }
};
function ne(e3, t3, s3, i3) {
  var n3 = e3 + t3 / 60 + s3 / 3600;
  return "S" !== i3 && "W" !== i3 || (n3 *= -1), n3;
}
e2(ie, "type", "tiff"), e2(ie, "headerLength", 10), y2.set("tiff", ie);
var re = Object.freeze({ __proto__: null, default: G, Exifr: H2, fileParsers: m2, segmentParsers: y2, fileReaders: b2, tagKeys: B2, tagValues: V, tagRevivers: I2, createDictionary: x2, extendDictionary: C2, fetchUrlAsArrayBuffer: S2, readBlobAsArrayBuffer: A2, chunkedProps: L2, otherSegments: T2, segments: z2, tiffBlocks: P2, segmentsAndBlocks: F, tiffExtractables: j2, inheritables: E2, allFormatters: M2, Options: R, parse: Y });
var ae = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false };
var he = Object.assign({}, ae, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
var le = Object.assign({}, ae, { tiff: false, ifd1: true, mergeOutput: false });
var de = Object.assign({}, ae, { firstChunkSize: 4e4, ifd0: [274] });
async function ce(e3) {
  let t3 = new H2(de);
  await t3.read(e3);
  let s3 = await t3.parse();
  if (s3 && s3.ifd0)
    return s3.ifd0[274];
}
var pe = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
var ge = true;
var me = true;
if ("object" == typeof navigator) {
  let e3 = navigator.userAgent;
  if (e3.includes("iPad") || e3.includes("iPhone")) {
    let t3 = e3.match(/OS (\d+)_(\d+)/);
    if (t3) {
      let [, e4, s3] = t3, i3 = Number(e4) + 0.1 * Number(s3);
      ge = i3 < 13.4, me = false;
    }
  } else if (e3.includes("OS X 10")) {
    let [, t3] = e3.match(/OS X 10[_.](\d+)/);
    ge = me = Number(t3) < 15;
  }
  if (e3.includes("Chrome/")) {
    let [, t3] = e3.match(/Chrome\/(\d+)/);
    ge = me = Number(t3) < 81;
  } else if (e3.includes("Firefox/")) {
    let [, t3] = e3.match(/Firefox\/(\d+)/);
    ge = me = Number(t3) < 77;
  }
}
async function ye(e3) {
  let t3 = await ce(e3);
  return Object.assign({ canvas: ge, css: me }, pe[t3]);
}
var be = class extends c2 {
  constructor(...t3) {
    super(...t3), e2(this, "ranges", new we()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
  }
  _tryExtend(e3, t3, s3) {
    if (0 === e3 && 0 === this.byteLength && s3) {
      let e4 = new DataView(s3.buffer || s3, s3.byteOffset, s3.byteLength);
      this._swapDataView(e4);
    } else {
      let s4 = e3 + t3;
      if (s4 > this.byteLength) {
        let { dataView: e4 } = this._extend(s4);
        this._swapDataView(e4);
      }
    }
  }
  _extend(e3) {
    let t3;
    t3 = a2 ? r2.allocUnsafe(e3) : new Uint8Array(e3);
    let s3 = new DataView(t3.buffer, t3.byteOffset, t3.byteLength);
    return t3.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t3, dataView: s3 };
  }
  subarray(e3, t3, s3 = false) {
    return t3 = t3 || this._lengthToEnd(e3), s3 && this._tryExtend(e3, t3), this.ranges.add(e3, t3), super.subarray(e3, t3);
  }
  set(e3, t3, s3 = false) {
    s3 && this._tryExtend(t3, e3.byteLength, e3);
    let i3 = super.set(e3, t3);
    return this.ranges.add(t3, i3.byteLength), i3;
  }
  async ensureChunk(e3, t3) {
    this.chunked && (this.ranges.available(e3, t3) || await this.readChunk(e3, t3));
  }
  available(e3, t3) {
    return this.ranges.available(e3, t3);
  }
};
var we = class {
  constructor() {
    e2(this, "list", []);
  }
  get length() {
    return this.list.length;
  }
  add(e3, t3, s3 = 0) {
    let i3 = e3 + t3, n3 = this.list.filter((t4) => ke(e3, t4.offset, i3) || ke(e3, t4.end, i3));
    if (n3.length > 0) {
      e3 = Math.min(e3, ...n3.map((e4) => e4.offset)), i3 = Math.max(i3, ...n3.map((e4) => e4.end)), t3 = i3 - e3;
      let s4 = n3.shift();
      s4.offset = e3, s4.length = t3, s4.end = i3, this.list = this.list.filter((e4) => !n3.includes(e4));
    } else
      this.list.push({ offset: e3, length: t3, end: i3 });
  }
  available(e3, t3) {
    let s3 = e3 + t3;
    return this.list.some((t4) => t4.offset <= e3 && s3 <= t4.end);
  }
};
function ke(e3, t3, s3) {
  return e3 <= t3 && t3 <= s3;
}
var Oe = class extends be {
  constructor(t3, s3) {
    super(0), e2(this, "chunksRead", 0), this.input = t3, this.options = s3;
  }
  async readWhole() {
    this.chunked = false, await this.readChunk(this.nextChunkOffset);
  }
  async readChunked() {
    this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
  }
  async readNextChunk(e3 = this.nextChunkOffset) {
    if (this.fullyRead)
      return this.chunksRead++, false;
    let t3 = this.options.chunkSize, s3 = await this.readChunk(e3, t3);
    return !!s3 && s3.byteLength === t3;
  }
  async readChunk(e3, t3) {
    if (this.chunksRead++, 0 !== (t3 = this.safeWrapAddress(e3, t3)))
      return this._readChunk(e3, t3);
  }
  safeWrapAddress(e3, t3) {
    return void 0 !== this.size && e3 + t3 > this.size ? Math.max(0, this.size - e3) : t3;
  }
  get nextChunkOffset() {
    if (0 !== this.ranges.list.length)
      return this.ranges.list[0].length;
  }
  get canReadNextChunk() {
    return this.chunksRead < this.options.chunkLimit;
  }
  get fullyRead() {
    return void 0 !== this.size && this.nextChunkOffset === this.size;
  }
  read() {
    return this.options.chunked ? this.readChunked() : this.readWhole();
  }
  close() {
  }
};
b2.set("blob", class extends Oe {
  async readWhole() {
    this.chunked = false;
    let e3 = await A2(this.input);
    this._swapArrayBuffer(e3);
  }
  readChunked() {
    return this.chunked = true, this.size = this.input.size, super.readChunked();
  }
  async _readChunk(e3, t3) {
    let s3 = t3 ? e3 + t3 : void 0, i3 = this.input.slice(e3, s3), n3 = await A2(i3);
    return this.set(n3, e3, true);
  }
});

// node_modules/@uppy/thumbnail-generator/lib/locale.js
var locale_default3 = {
  strings: {
    generatingThumbnails: "Generating thumbnails..."
  }
};

// node_modules/@uppy/thumbnail-generator/lib/index.js
var packageJson5 = {
  "version": "3.0.2"
};
function canvasToBlob(canvas, type, quality) {
  try {
    canvas.getContext("2d").getImageData(0, 0, 1, 1);
  } catch (err) {
    if (err.code === 18) {
      return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
    }
  }
  if (canvas.toBlob) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type, quality);
    }).then((blob) => {
      if (blob === null) {
        throw new Error("cannot read image, probably an svg with external resources");
      }
      return blob;
    });
  }
  return Promise.resolve().then(() => {
    return dataURItoBlob(canvas.toDataURL(type, quality), {});
  }).then((blob) => {
    if (blob === null) {
      throw new Error("could not extract blob, probably an old browser");
    }
    return blob;
  });
}
function rotateImage(image, translate) {
  let w3 = image.width;
  let h3 = image.height;
  if (translate.deg === 90 || translate.deg === 270) {
    w3 = image.height;
    h3 = image.width;
  }
  const canvas = document.createElement("canvas");
  canvas.width = w3;
  canvas.height = h3;
  const context = canvas.getContext("2d");
  context.translate(w3 / 2, h3 / 2);
  if (translate.canvas) {
    context.rotate(translate.rad);
    context.scale(translate.scaleX, translate.scaleY);
  }
  context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
  return canvas;
}
function protect(image) {
  const ratio = image.width / image.height;
  const maxSquare = 5e6;
  const maxSize = 4096;
  let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
  let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
  if (maxW > maxSize) {
    maxW = maxSize;
    maxH = Math.round(maxW / ratio);
  }
  if (maxH > maxSize) {
    maxH = maxSize;
    maxW = Math.round(ratio * maxH);
  }
  if (image.width > maxW) {
    const canvas = document.createElement("canvas");
    canvas.width = maxW;
    canvas.height = maxH;
    canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
    return canvas;
  }
  return image;
}
var ThumbnailGenerator = class extends UIPlugin_default {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.onFileAdded = (file) => {
      if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
        this.addToQueue(file.id);
      }
    };
    this.onCancelRequest = (file) => {
      const index = this.queue.indexOf(file.id);
      if (index !== -1) {
        this.queue.splice(index, 1);
      }
    };
    this.onFileRemoved = (file) => {
      const index = this.queue.indexOf(file.id);
      if (index !== -1) {
        this.queue.splice(index, 1);
      }
      if (file.preview && isObjectURL(file.preview)) {
        URL.revokeObjectURL(file.preview);
      }
    };
    this.onRestored = () => {
      const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
      restoredFiles.forEach((file) => {
        if (!file.preview || isObjectURL(file.preview)) {
          this.addToQueue(file.id);
        }
      });
    };
    this.onAllFilesRemoved = () => {
      this.queue = [];
    };
    this.waitUntilAllProcessed = (fileIDs) => {
      fileIDs.forEach((fileID) => {
        const file = this.uppy.getFile(fileID);
        this.uppy.emit("preprocess-progress", file, {
          mode: "indeterminate",
          message: this.i18n("generatingThumbnails")
        });
      });
      const emitPreprocessCompleteForAll = () => {
        fileIDs.forEach((fileID) => {
          const file = this.uppy.getFile(fileID);
          this.uppy.emit("preprocess-complete", file);
        });
      };
      return new Promise((resolve) => {
        if (this.queueProcessing) {
          this.uppy.once("thumbnail:all-generated", () => {
            emitPreprocessCompleteForAll();
            resolve();
          });
        } else {
          emitPreprocessCompleteForAll();
          resolve();
        }
      });
    };
    this.type = "modifier";
    this.id = this.opts.id || "ThumbnailGenerator";
    this.title = "Thumbnail Generator";
    this.queue = [];
    this.queueProcessing = false;
    this.defaultThumbnailDimension = 200;
    this.thumbnailType = this.opts.thumbnailType || "image/jpeg";
    this.defaultLocale = locale_default3;
    const defaultOptions4 = {
      thumbnailWidth: null,
      thumbnailHeight: null,
      waitForThumbnailsBeforeUpload: false,
      lazy: false
    };
    this.opts = {
      ...defaultOptions4,
      ...opts
    };
    this.i18nInit();
    if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
      throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
    }
  }
  /**
   * Create a thumbnail for the given Uppy file object.
   *
   * @param {{data: Blob}} file
   * @param {number} targetWidth
   * @param {number} targetHeight
   * @returns {Promise}
   */
  createThumbnail(file, targetWidth, targetHeight) {
    const originalUrl = URL.createObjectURL(file.data);
    const onload = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = originalUrl;
      image.addEventListener("load", () => {
        URL.revokeObjectURL(originalUrl);
        resolve(image);
      });
      image.addEventListener("error", (event) => {
        URL.revokeObjectURL(originalUrl);
        reject(event.error || new Error("Could not create thumbnail"));
      });
    });
    const orientationPromise = ye(file.data).catch(() => 1);
    return Promise.all([onload, orientationPromise]).then((_ref) => {
      let [image, orientation] = _ref;
      const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
      const rotatedImage = rotateImage(image, orientation);
      const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
      return canvasToBlob(resizedImage, this.thumbnailType, 80);
    }).then((blob) => {
      return URL.createObjectURL(blob);
    });
  }
  /**
   * Get the new calculated dimensions for the given image and a target width
   * or height. If both width and height are given, only width is taken into
   * account. If neither width nor height are given, the default dimension
   * is used.
   */
  getProportionalDimensions(img, width, height, rotation) {
    let aspect = img.width / img.height;
    if (rotation === 90 || rotation === 270) {
      aspect = img.height / img.width;
    }
    if (width != null) {
      return {
        width,
        height: Math.round(width / aspect)
      };
    }
    if (height != null) {
      return {
        width: Math.round(height * aspect),
        height
      };
    }
    return {
      width: this.defaultThumbnailDimension,
      height: Math.round(this.defaultThumbnailDimension / aspect)
    };
  }
  /**
   * Resize an image to the target `width` and `height`.
   *
   * Returns a Canvas with the resized image on it.
   */
  // eslint-disable-next-line class-methods-use-this
  resizeImage(image, targetWidth, targetHeight) {
    let img = protect(image);
    let steps = Math.ceil(Math.log2(img.width / targetWidth));
    if (steps < 1) {
      steps = 1;
    }
    let sW = targetWidth * 2 ** (steps - 1);
    let sH = targetHeight * 2 ** (steps - 1);
    const x3 = 2;
    while (steps--) {
      const canvas = document.createElement("canvas");
      canvas.width = sW;
      canvas.height = sH;
      canvas.getContext("2d").drawImage(img, 0, 0, sW, sH);
      img = canvas;
      sW = Math.round(sW / x3);
      sH = Math.round(sH / x3);
    }
    return img;
  }
  /**
   * Set the preview URL for a file.
   */
  setPreviewURL(fileID, preview) {
    this.uppy.setFileState(fileID, {
      preview
    });
  }
  addToQueue(item) {
    this.queue.push(item);
    if (this.queueProcessing === false) {
      this.processQueue();
    }
  }
  processQueue() {
    this.queueProcessing = true;
    if (this.queue.length > 0) {
      const current = this.uppy.getFile(this.queue.shift());
      if (!current) {
        this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
        return Promise.resolve();
      }
      return this.requestThumbnail(current).catch(() => {
      }).then(() => this.processQueue());
    }
    this.queueProcessing = false;
    this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
    this.uppy.emit("thumbnail:all-generated");
    return Promise.resolve();
  }
  requestThumbnail(file) {
    if (isPreviewSupported(file.type) && !file.isRemote) {
      return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
        this.setPreviewURL(file.id, preview);
        this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
        this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
      }).catch((err) => {
        this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
        this.uppy.log(err, "warning");
        this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
      });
    }
    return Promise.resolve();
  }
  install() {
    this.uppy.on("file-removed", this.onFileRemoved);
    this.uppy.on("cancel-all", this.onAllFilesRemoved);
    if (this.opts.lazy) {
      this.uppy.on("thumbnail:request", this.onFileAdded);
      this.uppy.on("thumbnail:cancel", this.onCancelRequest);
    } else {
      this.uppy.on("file-added", this.onFileAdded);
      this.uppy.on("restored", this.onRestored);
    }
    if (this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.addPreProcessor(this.waitUntilAllProcessed);
    }
  }
  uninstall() {
    this.uppy.off("file-removed", this.onFileRemoved);
    this.uppy.off("cancel-all", this.onAllFilesRemoved);
    if (this.opts.lazy) {
      this.uppy.off("thumbnail:request", this.onFileAdded);
      this.uppy.off("thumbnail:cancel", this.onCancelRequest);
    } else {
      this.uppy.off("file-added", this.onFileAdded);
      this.uppy.off("restored", this.onRestored);
    }
    if (this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.removePreProcessor(this.waitUntilAllProcessed);
    }
  }
};
ThumbnailGenerator.VERSION = packageJson5.version;

// node_modules/@uppy/utils/lib/findAllDOMElements.js
function findAllDOMElements(element) {
  if (typeof element === "string") {
    const elements = document.querySelectorAll(element);
    return elements.length === 0 ? null : Array.from(elements);
  }
  if (typeof element === "object" && isDOMElement(element)) {
    return [element];
  }
  return null;
}

// node_modules/@uppy/utils/lib/toArray.js
var toArray_default = Array.from;

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
  let {
    onSuccess
  } = _ref;
  directoryReader.readEntries(
    (entries) => {
      const newEntries = [...oldEntries, ...entries];
      if (entries.length) {
        queueMicrotask(() => {
          getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
            onSuccess
          });
        });
      } else {
        onSuccess(newEntries);
      }
    },
    // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
    (error) => {
      logDropError(error);
      onSuccess(oldEntries);
    }
  );
}

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
function getAsFileSystemHandleFromEntry(entry, logDropError) {
  if (entry == null)
    return entry;
  return {
    // eslint-disable-next-line no-nested-ternary
    kind: entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0,
    name: entry.name,
    getFile() {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    },
    async *values() {
      const directoryReader = entry.createReader();
      const entries = await new Promise((resolve) => {
        getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
          onSuccess: (dirEntries) => resolve(dirEntries.map((file) => getAsFileSystemHandleFromEntry(file, logDropError)))
        });
      });
      yield* entries;
    }
  };
}
async function* createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile) {
  if (lastResortFile === void 0) {
    lastResortFile = void 0;
  }
  if (entry.kind === "file") {
    const file = await entry.getFile();
    if (file !== null) {
      file.relativePath = relativePath ? `${relativePath}/${entry.name}` : null;
      yield file;
    } else if (lastResortFile != null)
      yield lastResortFile;
  } else if (entry.kind === "directory") {
    for await (const handle of entry.values()) {
      yield* createPromiseToAddFileOrParseDirectory(handle, `${relativePath}/${entry.name}`);
    }
  } else if (lastResortFile != null)
    yield lastResortFile;
}
async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
  const entries = await Promise.all(Array.from(dataTransfer.items, async (item) => {
    var _entry;
    const lastResortFile = item.getAsFile();
    let entry;
    if (window.isSecureContext && item.getAsFileSystemHandle != null)
      entry = await item.getAsFileSystemHandle();
    (_entry = entry) != null ? _entry : entry = getAsFileSystemHandleFromEntry(item.webkitGetAsEntry(), logDropError);
    return {
      lastResortFile,
      entry
    };
  }));
  for (const {
    lastResortFile,
    entry
  } of entries) {
    if (entry != null) {
      try {
        yield* createPromiseToAddFileOrParseDirectory(entry, "", lastResortFile);
      } catch (err) {
        if (lastResortFile != null) {
          yield lastResortFile;
        } else {
          logDropError(err);
        }
      }
    } else if (lastResortFile != null)
      yield lastResortFile;
  }
}

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
function fallbackApi(dataTransfer) {
  const files = toArray_default(dataTransfer.files);
  return Promise.resolve(files);
}

// node_modules/@uppy/utils/lib/getDroppedFiles/index.js
async function getDroppedFiles(dataTransfer, _temp) {
  let {
    logDropError = () => {
    }
  } = _temp === void 0 ? {} : _temp;
  try {
    const accumulator = [];
    for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
      accumulator.push(file);
    }
    return accumulator;
  } catch {
    return fallbackApi(dataTransfer);
  }
}

// node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i3 = 0; i3 < newInputs.length; i3++) {
    if (!isEqual(newInputs[i3], lastInputs[i3])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}

// node_modules/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js
var FOCUSABLE_ELEMENTS_default = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

// node_modules/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
function getActiveOverlayEl(dashboardEl, activeOverlayType) {
  if (activeOverlayType) {
    const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
    if (overlayEl)
      return overlayEl;
  }
  return dashboardEl;
}

// node_modules/@uppy/dashboard/lib/utils/trapFocus.js
function focusOnFirstNode(event, nodes) {
  const node = nodes[0];
  if (node) {
    node.focus();
    event.preventDefault();
  }
}
function focusOnLastNode(event, nodes) {
  const node = nodes[nodes.length - 1];
  if (node) {
    node.focus();
    event.preventDefault();
  }
}
function isFocusInOverlay(activeOverlayEl) {
  return activeOverlayEl.contains(document.activeElement);
}
function trapFocus(event, activeOverlayType, dashboardEl) {
  const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
  const focusableNodes = toArray_default(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS_default));
  const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
  if (!isFocusInOverlay(activeOverlayEl)) {
    focusOnFirstNode(event, focusableNodes);
  } else if (event.shiftKey && focusedItemIndex === 0) {
    focusOnLastNode(event, focusableNodes);
  } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
    focusOnFirstNode(event, focusableNodes);
  }
}
function forInline(event, activeOverlayType, dashboardEl) {
  if (activeOverlayType === null) {
  } else {
    trapFocus(event, activeOverlayType, dashboardEl);
  }
}

// node_modules/@uppy/dashboard/lib/utils/createSuperFocus.js
var import_lodash3 = __toESM(require_lodash2(), 1);
function createSuperFocus() {
  let lastFocusWasOnSuperFocusableEl = false;
  const superFocus = (dashboardEl, activeOverlayType) => {
    const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
    const isFocusInOverlay2 = overlayEl.contains(document.activeElement);
    if (isFocusInOverlay2 && lastFocusWasOnSuperFocusableEl)
      return;
    const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
    if (isFocusInOverlay2 && !superFocusableEl)
      return;
    if (superFocusableEl) {
      superFocusableEl.focus({
        preventScroll: true
      });
      lastFocusWasOnSuperFocusableEl = true;
    } else {
      const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS_default);
      firstEl == null ? void 0 : firstEl.focus({
        preventScroll: true
      });
      lastFocusWasOnSuperFocusableEl = false;
    }
  };
  return (0, import_lodash3.default)(superFocus, 260);
}

// node_modules/@uppy/dashboard/lib/components/Dashboard.js
var import_classnames9 = __toESM(require_classnames(), 1);

// node_modules/@uppy/utils/lib/isDragDropSupported.js
function isDragDropSupported() {
  const div = document.body;
  if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
    return false;
  }
  if (!("FormData" in window)) {
    return false;
  }
  if (!("FileReader" in window)) {
    return false;
  }
  return true;
}

// node_modules/@uppy/dashboard/lib/components/FileItem/index.js
var import_classnames3 = __toESM(require_classnames(), 1);
var import_is_shallow_equal = __toESM(require_is_shallow_equal(), 1);

// node_modules/@uppy/dashboard/lib/utils/getFileTypeIcon.js
function iconImage() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("g", {
    fill: "#686DE0",
    fillRule: "evenodd"
  }, y("path", {
    d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
    fillRule: "nonzero"
  }), y("path", {
    d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
    fillRule: "nonzero"
  }), y("circle", {
    cx: "7.5",
    cy: "9.5",
    r: "1.5"
  })));
}
function iconAudio() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("path", {
    d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
    fill: "#049BCF",
    fillRule: "nonzero"
  }));
}
function iconVideo() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("path", {
    d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
    fill: "#19AF67",
    fillRule: "nonzero"
  }));
}
function iconPDF() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("path", {
    d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
    fill: "#E2514A",
    fillRule: "nonzero"
  }));
}
function iconArchive() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("path", {
    d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
    fill: "#00C469",
    fillRule: "nonzero"
  }));
}
function iconFile() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("g", {
    fill: "#A7AFB7",
    fillRule: "nonzero"
  }, y("path", {
    d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
  }), y("path", {
    d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
  })));
}
function iconText() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, y("path", {
    d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
    fill: "#5A5E69",
    fillRule: "nonzero"
  }));
}
function getIconByMime(fileType) {
  const defaultChoice = {
    color: "#838999",
    icon: iconFile()
  };
  if (!fileType)
    return defaultChoice;
  const fileTypeGeneral = fileType.split("/")[0];
  const fileTypeSpecific = fileType.split("/")[1];
  if (fileTypeGeneral === "text") {
    return {
      color: "#5a5e69",
      icon: iconText()
    };
  }
  if (fileTypeGeneral === "image") {
    return {
      color: "#686de0",
      icon: iconImage()
    };
  }
  if (fileTypeGeneral === "audio") {
    return {
      color: "#068dbb",
      icon: iconAudio()
    };
  }
  if (fileTypeGeneral === "video") {
    return {
      color: "#19af67",
      icon: iconVideo()
    };
  }
  if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
    return {
      color: "#e25149",
      icon: iconPDF()
    };
  }
  const archiveTypes = ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"];
  if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
    return {
      color: "#00C469",
      icon: iconArchive()
    };
  }
  return defaultChoice;
}

// node_modules/@uppy/dashboard/lib/components/FilePreview.js
function FilePreview(props) {
  const {
    file
  } = props;
  if (file.preview) {
    return y("img", {
      className: "uppy-Dashboard-Item-previewImg",
      alt: file.name,
      src: file.preview
    });
  }
  const {
    color,
    icon
  } = getIconByMime(file.type);
  return y("div", {
    className: "uppy-Dashboard-Item-previewIconWrap"
  }, y("span", {
    className: "uppy-Dashboard-Item-previewIcon",
    style: {
      color
    }
  }, icon), y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-Dashboard-Item-previewIconBg",
    width: "58",
    height: "76",
    viewBox: "0 0 58 76"
  }, y("rect", {
    fill: "#FFF",
    width: "58",
    height: "76",
    rx: "3",
    fillRule: "evenodd"
  })));
}

// node_modules/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
var metaFieldIdToName = (metaFieldId, metaFields) => {
  const fields = typeof metaFields === "function" ? metaFields() : metaFields;
  const field = fields.filter((f3) => f3.id === metaFieldId);
  return field[0].name;
};
function renderMissingMetaFieldsError(props) {
  const {
    file,
    toggleFileCard,
    i18n,
    metaFields
  } = props;
  const {
    missingRequiredMetaFields
  } = file;
  if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
    return null;
  }
  const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
  return y("div", {
    className: "uppy-Dashboard-Item-errorMessage"
  }, i18n("missingRequiredMetaFields", {
    smart_count: missingRequiredMetaFields.length,
    fields: metaFieldsString
  }), " ", y("button", {
    type: "button",
    class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
    onClick: () => toggleFileCard(true, file.id)
  }, i18n("editFile")));
}

// node_modules/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
function FilePreviewAndLink(props) {
  return y("div", {
    className: "uppy-Dashboard-Item-previewInnerWrap",
    style: {
      backgroundColor: getIconByMime(props.file.type).color
    }
  }, props.showLinkToFileUploadResult && props.file.uploadURL && y("a", {
    className: "uppy-Dashboard-Item-previewLink",
    href: props.file.uploadURL,
    rel: "noreferrer noopener",
    target: "_blank",
    "aria-label": props.file.meta.name
  }, y("span", {
    hidden: true
  }, props.file.meta.name)), y(FilePreview, {
    file: props.file
  }), y(renderMissingMetaFieldsError, {
    file: props.file,
    i18n: props.i18n,
    toggleFileCard: props.toggleFileCard,
    metaFields: props.metaFields
  }));
}

// node_modules/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
function onPauseResumeCancelRetry(props) {
  if (props.isUploaded)
    return;
  if (props.error && !props.hideRetryButton) {
    props.uppy.retryUpload(props.file.id);
    return;
  }
  if (props.resumableUploads && !props.hidePauseResumeButton) {
    props.uppy.pauseResume(props.file.id);
  } else if (props.individualCancellation && !props.hideCancelButton) {
    props.uppy.removeFile(props.file.id);
  }
}
function progressIndicatorTitle(props) {
  if (props.isUploaded) {
    return props.i18n("uploadComplete");
  }
  if (props.error) {
    return props.i18n("retryUpload");
  }
  if (props.resumableUploads) {
    if (props.file.isPaused) {
      return props.i18n("resumeUpload");
    }
    return props.i18n("pauseUpload");
  }
  if (props.individualCancellation) {
    return props.i18n("cancelUpload");
  }
  return "";
}
function ProgressIndicatorButton(props) {
  return y("div", {
    className: "uppy-Dashboard-Item-progress"
  }, y("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
    type: "button",
    "aria-label": progressIndicatorTitle(props),
    title: progressIndicatorTitle(props),
    onClick: () => onPauseResumeCancelRetry(props)
  }, props.children));
}
function ProgressCircleContainer(_ref) {
  let {
    children
  } = _ref;
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "70",
    height: "70",
    viewBox: "0 0 36 36",
    className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
  }, children);
}
function ProgressCircle(_ref2) {
  let {
    progress
  } = _ref2;
  const circleLength = 2 * Math.PI * 15;
  return y("g", null, y("circle", {
    className: "uppy-Dashboard-Item-progressIcon--bg",
    r: "15",
    cx: "18",
    cy: "18",
    "stroke-width": "2",
    fill: "none"
  }), y("circle", {
    className: "uppy-Dashboard-Item-progressIcon--progress",
    r: "15",
    cx: "18",
    cy: "18",
    transform: "rotate(-90, 18, 18)",
    fill: "none",
    "stroke-width": "2",
    "stroke-dasharray": circleLength,
    "stroke-dashoffset": circleLength - circleLength / 100 * progress
  }));
}
function FileProgress(props) {
  if (!props.file.progress.uploadStarted) {
    return null;
  }
  if (props.isUploaded) {
    return y("div", {
      className: "uppy-Dashboard-Item-progress"
    }, y("div", {
      className: "uppy-Dashboard-Item-progressIndicator"
    }, y(ProgressCircleContainer, null, y("circle", {
      r: "15",
      cx: "18",
      cy: "18",
      fill: "#1bb240"
    }), y("polygon", {
      className: "uppy-Dashboard-Item-progressIcon--check",
      transform: "translate(2, 3)",
      points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
    }))));
  }
  if (props.recoveredState) {
    return void 0;
  }
  if (props.error && !props.hideRetryButton) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      y(ProgressIndicatorButton, props, y("svg", {
        "aria-hidden": "true",
        focusable: "false",
        className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
        width: "28",
        height: "31",
        viewBox: "0 0 16 19"
      }, y("path", {
        d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
      }), y("path", {
        d: "M7.9 3H10v2H7.9z"
      }), y("path", {
        d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
      }), y("path", {
        d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
      })))
    );
  }
  if (props.resumableUploads && !props.hidePauseResumeButton) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      y(ProgressIndicatorButton, props, y(ProgressCircleContainer, null, y(ProgressCircle, {
        progress: props.file.progress.percentage
      }), props.file.isPaused ? y("polygon", {
        className: "uppy-Dashboard-Item-progressIcon--play",
        transform: "translate(3, 3)",
        points: "12 20 12 10 20 15"
      }) : y("g", {
        className: "uppy-Dashboard-Item-progressIcon--pause",
        transform: "translate(14.5, 13)"
      }, y("rect", {
        x: "0",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }), y("rect", {
        x: "5",
        y: "0",
        width: "2",
        height: "10",
        rx: "0"
      }))))
    );
  }
  if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      y(ProgressIndicatorButton, props, y(ProgressCircleContainer, null, y(ProgressCircle, {
        progress: props.file.progress.percentage
      }), y("polygon", {
        className: "cancel",
        transform: "translate(2, 2)",
        points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
      })))
    );
  }
  return y("div", {
    className: "uppy-Dashboard-Item-progress"
  }, y("div", {
    className: "uppy-Dashboard-Item-progressIndicator"
  }, y(ProgressCircleContainer, null, y(ProgressCircle, {
    progress: props.file.progress.percentage
  }))));
}

// node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
var import_prettier_bytes3 = __toESM(require_prettierBytes2(), 1);

// node_modules/@uppy/utils/lib/truncateString.js
var separator = "...";
function truncateString(string, maxLength) {
  if (maxLength === 0)
    return "";
  if (string.length <= maxLength)
    return string;
  if (maxLength <= separator.length + 1)
    return `${string.slice(0, maxLength - 1)}\u2026`;
  const charsToShow = maxLength - separator.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return string.slice(0, frontChars) + separator + string.slice(-backChars);
}

// node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
var renderFileName = (props) => {
  const {
    author,
    name
  } = props.file.meta;
  function getMaxNameLength() {
    if (props.singleFile) {
      return 200;
    }
    if (props.containerWidth <= 352) {
      return 35;
    }
    if (props.containerWidth <= 576) {
      return 60;
    }
    return author ? 20 : 30;
  }
  return y("div", {
    className: "uppy-Dashboard-Item-name",
    title: name
  }, truncateString(name, getMaxNameLength()));
};
var renderAuthor = (props) => {
  const {
    author
  } = props.file.meta;
  const {
    providerName
  } = props.file.remote;
  const dot = `\xB7`;
  if (!author) {
    return null;
  }
  return y("div", {
    className: "uppy-Dashboard-Item-author"
  }, y("a", {
    href: `${author.url}?utm_source=Companion&utm_medium=referral`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, truncateString(author.name, 13)), providerName ? y(_, null, ` ${dot} `, providerName, ` ${dot} `) : null);
};
var renderFileSize = (props) => props.file.size && y("div", {
  className: "uppy-Dashboard-Item-statusSize"
}, (0, import_prettier_bytes3.default)(props.file.size));
var ReSelectButton = (props) => props.file.isGhost && y("span", null, " \u2022 ", y("button", {
  className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
  type: "button",
  onClick: props.toggleAddFilesPanel
}, props.i18n("reSelect")));
var ErrorButton = (_ref) => {
  let {
    file,
    onClick
  } = _ref;
  if (file.error) {
    return y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
      "aria-label": file.error,
      "data-microtip-position": "bottom",
      "data-microtip-size": "medium",
      onClick,
      type: "button"
    }, "?");
  }
  return null;
};
function FileInfo(props) {
  const {
    file
  } = props;
  return y("div", {
    className: "uppy-Dashboard-Item-fileInfo",
    "data-uppy-file-source": file.source
  }, y("div", {
    className: "uppy-Dashboard-Item-fileName"
  }, renderFileName(props), y(ErrorButton, {
    file: props.file,
    onClick: () => alert(props.file.error)
    // TODO: move to a custom alert implementation
  })), y("div", {
    className: "uppy-Dashboard-Item-status"
  }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), y(renderMissingMetaFieldsError, {
    file: props.file,
    i18n: props.i18n,
    toggleFileCard: props.toggleFileCard,
    metaFields: props.metaFields
  }));
}

// node_modules/@uppy/dashboard/lib/utils/copyToClipboard.js
function copyToClipboard(textToCopy, fallbackString) {
  if (fallbackString === void 0) {
    fallbackString = "Copy the URL below";
  }
  return new Promise((resolve) => {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("style", {
      position: "fixed",
      top: 0,
      left: 0,
      width: "2em",
      height: "2em",
      padding: 0,
      border: "none",
      outline: "none",
      boxShadow: "none",
      background: "transparent"
    });
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    const magicCopyFailed = () => {
      document.body.removeChild(textArea);
      window.prompt(fallbackString, textToCopy);
      resolve();
    };
    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        return magicCopyFailed("copy command unavailable");
      }
      document.body.removeChild(textArea);
      return resolve();
    } catch (err) {
      document.body.removeChild(textArea);
      return magicCopyFailed(err);
    }
  });
}

// node_modules/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
function EditButton(_ref) {
  let {
    file,
    uploadInProgressOrComplete,
    metaFields,
    canEditFile,
    i18n,
    onClick
  } = _ref;
  if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
    return y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
      type: "button",
      "aria-label": i18n("editFileWithFilename", {
        file: file.meta.name
      }),
      title: i18n("editFileWithFilename", {
        file: file.meta.name
      }),
      onClick: () => onClick()
    }, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon",
      width: "14",
      height: "14",
      viewBox: "0 0 14 14"
    }, y("g", {
      fillRule: "evenodd"
    }, y("path", {
      d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
      fillRule: "nonzero"
    }), y("rect", {
      x: "1",
      y: "12.293",
      width: "11",
      height: "1",
      rx: ".5"
    }), y("path", {
      fillRule: "nonzero",
      d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
    }))));
  }
  return null;
}
function RemoveButton(_ref2) {
  let {
    i18n,
    onClick,
    file
  } = _ref2;
  return y("button", {
    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
    type: "button",
    "aria-label": i18n("removeFile", {
      file: file.meta.name
    }),
    title: i18n("removeFile", {
      file: file.meta.name
    }),
    onClick: () => onClick()
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "18",
    height: "18",
    viewBox: "0 0 18 18"
  }, y("path", {
    d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
  }), y("path", {
    fill: "#FFF",
    d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
  })));
}
var copyLinkToClipboard = (event, props) => {
  copyToClipboard(props.file.uploadURL, props.i18n("copyLinkToClipboardFallback")).then(() => {
    props.uppy.log("Link copied to clipboard.");
    props.uppy.info(props.i18n("copyLinkToClipboardSuccess"), "info", 3e3);
  }).catch(props.uppy.log).then(() => event.target.focus({
    preventScroll: true
  }));
};
function CopyLinkButton(props) {
  const {
    i18n
  } = props;
  return y("button", {
    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
    type: "button",
    "aria-label": i18n("copyLink"),
    title: i18n("copyLink"),
    onClick: (event) => copyLinkToClipboard(event, props)
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "14",
    height: "14",
    viewBox: "0 0 14 12"
  }, y("path", {
    d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
  })));
}
function Buttons(props) {
  const {
    uppy,
    file,
    uploadInProgressOrComplete,
    canEditFile,
    metaFields,
    showLinkToFileUploadResult,
    showRemoveButton,
    i18n,
    toggleFileCard,
    openFileEditor
  } = props;
  const editAction = () => {
    if (metaFields && metaFields.length > 0) {
      toggleFileCard(true, file.id);
    } else {
      openFileEditor(file);
    }
  };
  return y("div", {
    className: "uppy-Dashboard-Item-actionWrapper"
  }, y(EditButton, {
    i18n,
    file,
    uploadInProgressOrComplete,
    canEditFile,
    metaFields,
    onClick: editAction
  }), showLinkToFileUploadResult && file.uploadURL ? y(CopyLinkButton, {
    file,
    uppy,
    i18n
  }) : null, showRemoveButton ? y(RemoveButton, {
    i18n,
    file,
    uppy,
    onClick: () => props.uppy.removeFile(file.id, "removed-by-user")
  }) : null);
}

// node_modules/@uppy/dashboard/lib/components/FileItem/index.js
var FileItem = class extends k {
  componentDidMount() {
    const {
      file
    } = this.props;
    if (!file.preview) {
      this.props.handleRequestThumbnail(file);
    }
  }
  shouldComponentUpdate(nextProps) {
    return !(0, import_is_shallow_equal.default)(this.props, nextProps);
  }
  // VirtualList mounts FileItems again and they emit `thumbnail:request`
  // Otherwise thumbnails are broken or missing after Golden Retriever restores files
  componentDidUpdate() {
    const {
      file
    } = this.props;
    if (!file.preview) {
      this.props.handleRequestThumbnail(file);
    }
  }
  componentWillUnmount() {
    const {
      file
    } = this.props;
    if (!file.preview) {
      this.props.handleCancelThumbnail(file);
    }
  }
  render() {
    const {
      file
    } = this.props;
    const isProcessing = file.progress.preprocess || file.progress.postprocess;
    const isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
    const uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
    const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
    const error = file.error || false;
    const {
      isGhost
    } = file;
    let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
    if (isUploaded && this.props.showRemoveButtonAfterComplete) {
      showRemoveButton = true;
    }
    const dashboardItemClass = (0, import_classnames3.default)({
      "uppy-Dashboard-Item": true,
      "is-inprogress": uploadInProgress && !this.props.recoveredState,
      "is-processing": isProcessing,
      "is-complete": isUploaded,
      "is-error": !!error,
      "is-resumable": this.props.resumableUploads,
      "is-noIndividualCancellation": !this.props.individualCancellation,
      "is-ghost": isGhost
    });
    return y("div", {
      className: dashboardItemClass,
      id: `uppy_${file.id}`,
      role: this.props.role
    }, y("div", {
      className: "uppy-Dashboard-Item-preview"
    }, y(FilePreviewAndLink, {
      file,
      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
      i18n: this.props.i18n,
      toggleFileCard: this.props.toggleFileCard,
      metaFields: this.props.metaFields
    }), y(FileProgress, {
      uppy: this.props.uppy,
      file,
      error,
      isUploaded,
      hideRetryButton: this.props.hideRetryButton,
      hideCancelButton: this.props.hideCancelButton,
      hidePauseResumeButton: this.props.hidePauseResumeButton,
      recoveredState: this.props.recoveredState,
      showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
      resumableUploads: this.props.resumableUploads,
      individualCancellation: this.props.individualCancellation,
      i18n: this.props.i18n
    })), y("div", {
      className: "uppy-Dashboard-Item-fileInfoAndButtons"
    }, y(FileInfo, {
      file,
      id: this.props.id,
      acquirers: this.props.acquirers,
      containerWidth: this.props.containerWidth,
      i18n: this.props.i18n,
      toggleAddFilesPanel: this.props.toggleAddFilesPanel,
      toggleFileCard: this.props.toggleFileCard,
      metaFields: this.props.metaFields,
      singleFile: this.props.singleFile
    }), y(Buttons, {
      file,
      metaFields: this.props.metaFields,
      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
      showRemoveButton,
      canEditFile: this.props.canEditFile,
      uploadInProgressOrComplete,
      toggleFileCard: this.props.toggleFileCard,
      openFileEditor: this.props.openFileEditor,
      uppy: this.props.uppy,
      i18n: this.props.i18n
    })));
  }
};

// node_modules/@uppy/dashboard/lib/components/VirtualList.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var STYLE_INNER = {
  position: "relative",
  // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
  // and this additional property would hide things that we want to show.
  //
  // overflow: 'hidden',
  width: "100%",
  minHeight: "100%"
};
var STYLE_CONTENT = {
  position: "absolute",
  top: 0,
  left: 0,
  // Because the `top` value gets set to some offset, this `height` being 100% would make the scrollbar
  // stretch far beyond the content. For our use case, the content div actually can get its height from
  // the elements inside it, so we don't need to specify a `height` property at all.
  //
  // height: '100%',
  width: "100%",
  overflow: "visible"
};
var VirtualList = class extends k {
  constructor(props) {
    super(props);
    this.handleScroll = () => {
      this.setState({
        offset: this.base.scrollTop
      });
    };
    this.handleResize = () => {
      this.resize();
    };
    this.focusElement = null;
    this.state = {
      offset: 0,
      height: 0
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.handleResize);
  }
  // TODO: refactor to stable lifecycle method
  // eslint-disable-next-line
  componentWillUpdate() {
    if (this.base.contains(document.activeElement)) {
      this.focusElement = document.activeElement;
    }
  }
  componentDidUpdate() {
    if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
      this.focusElement.focus();
    }
    this.focusElement = null;
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  resize() {
    const {
      height
    } = this.state;
    if (height !== this.base.offsetHeight) {
      this.setState({
        height: this.base.offsetHeight
      });
    }
  }
  render(_ref) {
    let {
      data,
      rowHeight,
      renderRow,
      overscanCount = 10,
      ...props
    } = _ref;
    const {
      offset,
      height
    } = this.state;
    let start = Math.floor(offset / rowHeight);
    let visibleRowCount = Math.floor(height / rowHeight);
    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }
    const end = start + visibleRowCount + 4;
    const selection = data.slice(start, end);
    const styleInner = {
      ...STYLE_INNER,
      height: data.length * rowHeight
    };
    const styleContent = {
      ...STYLE_CONTENT,
      top: start * rowHeight
    };
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      y("div", _extends({
        onScroll: this.handleScroll
      }, props), y("div", {
        role: "presentation",
        style: styleInner
      }, y("div", {
        role: "presentation",
        style: styleContent
      }, selection.map(renderRow))))
    );
  }
};
var VirtualList_default = VirtualList;

// node_modules/@uppy/dashboard/lib/components/FileList.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function chunks(list, size) {
  const chunked = [];
  let currentChunk = [];
  list.forEach((item) => {
    if (currentChunk.length < size) {
      currentChunk.push(item);
    } else {
      chunked.push(currentChunk);
      currentChunk = [item];
    }
  });
  if (currentChunk.length)
    chunked.push(currentChunk);
  return chunked;
}
var FileList_default = (props) => {
  const rowHeight = props.itemsPerRow === 1 ? 71 : 200;
  const fileProps = {
    // FIXME This is confusing, it's actually the Dashboard's plugin ID
    id: props.id,
    error: props.error,
    // TODO move this to context
    i18n: props.i18n,
    uppy: props.uppy,
    // features
    acquirers: props.acquirers,
    resumableUploads: props.resumableUploads,
    individualCancellation: props.individualCancellation,
    // visual options
    hideRetryButton: props.hideRetryButton,
    hidePauseResumeButton: props.hidePauseResumeButton,
    hideCancelButton: props.hideCancelButton,
    showLinkToFileUploadResult: props.showLinkToFileUploadResult,
    showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
    isWide: props.isWide,
    metaFields: props.metaFields,
    recoveredState: props.recoveredState,
    singleFile: props.singleFile,
    // callbacks
    toggleFileCard: props.toggleFileCard,
    handleRequestThumbnail: props.handleRequestThumbnail,
    handleCancelThumbnail: props.handleCancelThumbnail
  };
  const sortByGhostComesFirst = (file1, file2) => {
    return props.files[file2].isGhost - props.files[file1].isGhost;
  };
  const files = Object.keys(props.files);
  if (props.recoveredState)
    files.sort(sortByGhostComesFirst);
  const rows = chunks(files, props.itemsPerRow);
  const renderRow = (row) => (
    // The `role="presentation` attribute ensures that the list items are properly
    // associated with the `VirtualList` element.
    // We use the first file ID as the key—this should not change across scroll rerenders
    y("div", {
      class: "uppy-Dashboard-filesInner",
      role: "presentation",
      key: row[0]
    }, row.map((fileID) => y(FileItem, _extends2({
      key: fileID,
      uppy: props.uppy
    }, fileProps, {
      // eslint-disable-line react/jsx-props-no-spreading
      role: "listitem",
      openFileEditor: props.openFileEditor,
      canEditFile: props.canEditFile,
      toggleAddFilesPanel: props.toggleAddFilesPanel,
      file: props.files[fileID]
    }))))
  );
  if (props.singleFile) {
    return y("div", {
      class: "uppy-Dashboard-files"
    }, renderRow(rows[0]));
  }
  return y(VirtualList_default, {
    class: "uppy-Dashboard-files",
    role: "list",
    data: rows,
    renderRow,
    rowHeight
  });
};

// node_modules/@uppy/dashboard/lib/components/AddFiles.js
var _Symbol$for3;
_Symbol$for3 = Symbol.for("uppy test: disable unused locale key warning");
var AddFiles = class extends k {
  constructor() {
    super(...arguments);
    this.triggerFileInputClick = () => {
      this.fileInput.click();
    };
    this.triggerFolderInputClick = () => {
      this.folderInput.click();
    };
    this.triggerVideoCameraInputClick = () => {
      this.mobileVideoFileInput.click();
    };
    this.triggerPhotoCameraInputClick = () => {
      this.mobilePhotoFileInput.click();
    };
    this.onFileInputChange = (event) => {
      this.props.handleInputChange(event);
      event.target.value = null;
    };
    this.renderHiddenInput = (isFolder, refCallback) => {
      return y("input", {
        className: "uppy-Dashboard-input",
        hidden: true,
        "aria-hidden": "true",
        tabIndex: -1,
        webkitdirectory: isFolder,
        type: "file",
        name: "files[]",
        multiple: this.props.maxNumberOfFiles !== 1,
        onChange: this.onFileInputChange,
        accept: this.props.allowedFileTypes,
        ref: refCallback
      });
    };
    this.renderHiddenCameraInput = (type, nativeCameraFacingMode, refCallback) => {
      const typeToAccept = {
        photo: "image/*",
        video: "video/*"
      };
      const accept = typeToAccept[type];
      return y("input", {
        className: "uppy-Dashboard-input",
        hidden: true,
        "aria-hidden": "true",
        tabIndex: -1,
        type: "file",
        name: `camera-${type}`,
        onChange: this.onFileInputChange,
        capture: nativeCameraFacingMode,
        accept,
        ref: refCallback
      });
    };
    this.renderMyDeviceAcquirer = () => {
      return y("div", {
        className: "uppy-DashboardTab",
        role: "presentation",
        "data-uppy-acquirer-id": "MyDevice"
      }, y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
        role: "tab",
        tabIndex: 0,
        "data-uppy-super-focusable": true,
        onClick: this.triggerFileInputClick
      }, y("div", {
        className: "uppy-DashboardTab-inner"
      }, y("svg", {
        className: "uppy-DashboardTab-iconMyDevice",
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, y("path", {
        d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
        fill: "currentcolor",
        "fill-rule": "evenodd"
      }))), y("div", {
        className: "uppy-DashboardTab-name"
      }, this.props.i18n("myDevice"))));
    };
    this.renderPhotoCamera = () => {
      return y("div", {
        className: "uppy-DashboardTab",
        role: "presentation",
        "data-uppy-acquirer-id": "MobilePhotoCamera"
      }, y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
        role: "tab",
        tabIndex: 0,
        "data-uppy-super-focusable": true,
        onClick: this.triggerPhotoCameraInputClick
      }, y("div", {
        className: "uppy-DashboardTab-inner"
      }, y("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, y("path", {
        d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
        fill: "#02B383",
        "fill-rule": "nonzero"
      }))), y("div", {
        className: "uppy-DashboardTab-name"
      }, this.props.i18n("takePictureBtn"))));
    };
    this.renderVideoCamera = () => {
      return y("div", {
        className: "uppy-DashboardTab",
        role: "presentation",
        "data-uppy-acquirer-id": "MobileVideoCamera"
      }, y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
        role: "tab",
        tabIndex: 0,
        "data-uppy-super-focusable": true,
        onClick: this.triggerVideoCameraInputClick
      }, y("div", {
        className: "uppy-DashboardTab-inner"
      }, y("svg", {
        "aria-hidden": "true",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, y("path", {
        fill: "#FF675E",
        fillRule: "nonzero",
        d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
      }))), y("div", {
        className: "uppy-DashboardTab-name"
      }, this.props.i18n("recordVideoBtn"))));
    };
    this.renderBrowseButton = (text, onClickFn) => {
      const numberOfAcquirers = this.props.acquirers.length;
      return y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
        onClick: onClickFn,
        "data-uppy-super-focusable": numberOfAcquirers === 0
      }, text);
    };
    this.renderDropPasteBrowseTagline = (numberOfAcquirers) => {
      const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
      const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
      const lowerFMSelectionType = this.props.fileManagerSelectionType;
      const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
      return y(
        "div",
        {
          class: "uppy-Dashboard-AddFiles-title"
        },
        // eslint-disable-next-line no-nested-ternary
        this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
          browseFiles,
          browseFolders,
          browse: browseFiles
        }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
          browseFiles,
          browseFolders,
          browse: browseFiles
        })
      );
    };
    this.renderAcquirer = (acquirer) => {
      return y("div", {
        className: "uppy-DashboardTab",
        role: "presentation",
        "data-uppy-acquirer-id": acquirer.id
      }, y("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
        role: "tab",
        tabIndex: 0,
        "data-cy": acquirer.id,
        "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
        "aria-selected": this.props.activePickerPanel.id === acquirer.id,
        "data-uppy-super-focusable": true,
        onClick: () => this.props.showPanel(acquirer.id)
      }, y("div", {
        className: "uppy-DashboardTab-inner"
      }, acquirer.icon()), y("div", {
        className: "uppy-DashboardTab-name"
      }, acquirer.name)));
    };
    this.renderAcquirers = (acquirers) => {
      const acquirersWithoutLastTwo = [...acquirers];
      const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
      return y(_, null, acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), y("span", {
        role: "presentation",
        style: {
          "white-space": "nowrap"
        }
      }, lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer))));
    };
    this.renderSourcesList = (acquirers, disableLocalFiles) => {
      const {
        showNativePhotoCameraButton,
        showNativeVideoCameraButton
      } = this.props;
      let list = [];
      const myDeviceKey = "myDevice";
      if (!disableLocalFiles) {
        list.push({
          key: myDeviceKey,
          elements: this.renderMyDeviceAcquirer()
        });
        if (showNativePhotoCameraButton)
          list.push({
            key: "nativePhotoCameraButton",
            elements: this.renderPhotoCamera()
          });
        if (showNativeVideoCameraButton)
          list.push({
            key: "nativePhotoCameraButton",
            elements: this.renderVideoCamera()
          });
      }
      list.push(...acquirers.map((acquirer) => ({
        key: acquirer.id,
        elements: this.renderAcquirer(acquirer)
      })));
      const hasOnlyMyDevice = list.length === 1 && list[0].key === myDeviceKey;
      if (hasOnlyMyDevice)
        list = [];
      const listWithoutLastTwo = [...list];
      const lastTwo = listWithoutLastTwo.splice(list.length - 2, list.length);
      const renderList = (l3) => l3.map((_ref) => {
        let {
          key,
          elements
        } = _ref;
        return y(_, {
          key
        }, elements);
      });
      return y(_, null, this.renderDropPasteBrowseTagline(list.length), y("div", {
        className: "uppy-Dashboard-AddFiles-list",
        role: "tablist"
      }, renderList(listWithoutLastTwo), y("span", {
        role: "presentation",
        style: {
          "white-space": "nowrap"
        }
      }, renderList(lastTwo))));
    };
  }
  [_Symbol$for3]() {
    this.props.i18nArray("dropPasteBoth");
    this.props.i18nArray("dropPasteFiles");
    this.props.i18nArray("dropPasteFolders");
    this.props.i18nArray("dropPasteImportBoth");
    this.props.i18nArray("dropPasteImportFiles");
    this.props.i18nArray("dropPasteImportFolders");
  }
  renderPoweredByUppy() {
    const {
      i18nArray
    } = this.props;
    const uppyBranding = y("span", null, y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, y("path", {
      d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
      fillRule: "evenodd"
    })), y("span", {
      className: "uppy-Dashboard-poweredByUppy"
    }, "Uppy"));
    const linkText = i18nArray("poweredBy", {
      uppy: uppyBranding
    });
    return y("a", {
      tabIndex: "-1",
      href: "https://uppy.io",
      rel: "noreferrer noopener",
      target: "_blank",
      className: "uppy-Dashboard-poweredBy"
    }, linkText);
  }
  render() {
    const {
      showNativePhotoCameraButton,
      showNativeVideoCameraButton,
      nativeCameraFacingMode
    } = this.props;
    return y("div", {
      className: "uppy-Dashboard-AddFiles"
    }, this.renderHiddenInput(false, (ref) => {
      this.fileInput = ref;
    }), this.renderHiddenInput(true, (ref) => {
      this.folderInput = ref;
    }), showNativePhotoCameraButton && this.renderHiddenCameraInput("photo", nativeCameraFacingMode, (ref) => {
      this.mobilePhotoFileInput = ref;
    }), showNativeVideoCameraButton && this.renderHiddenCameraInput("video", nativeCameraFacingMode, (ref) => {
      this.mobileVideoFileInput = ref;
    }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), y("div", {
      className: "uppy-Dashboard-AddFiles-info"
    }, this.props.note && y("div", {
      className: "uppy-Dashboard-note"
    }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
  }
};
var AddFiles_default = AddFiles;

// node_modules/@uppy/dashboard/lib/components/AddFilesPanel.js
var import_classnames4 = __toESM(require_classnames(), 1);
var AddFilesPanel = (props) => {
  return y("div", {
    className: (0, import_classnames4.default)("uppy-Dashboard-AddFilesPanel", props.className),
    "data-uppy-panelType": "AddFiles",
    "aria-hidden": props.showAddFilesPanel
  }, y("div", {
    className: "uppy-DashboardContent-bar"
  }, y("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, props.i18n("addingMoreFiles")), y("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: () => props.toggleAddFilesPanel(false)
  }, props.i18n("back"))), y(AddFiles_default, props));
};
var AddFilesPanel_default = AddFilesPanel;

// node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
var import_classnames5 = __toESM(require_classnames(), 1);

// node_modules/@uppy/dashboard/lib/utils/ignoreEvent.js
function ignoreEvent(ev) {
  const {
    tagName
  } = ev.target;
  if (tagName === "INPUT" || tagName === "TEXTAREA") {
    ev.stopPropagation();
    return;
  }
  ev.preventDefault();
  ev.stopPropagation();
}
var ignoreEvent_default = ignoreEvent;

// node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
function PickerPanelContent(_ref) {
  let {
    activePickerPanel,
    className,
    hideAllPanels,
    i18n,
    state,
    uppy
  } = _ref;
  return y("div", {
    className: (0, import_classnames5.default)("uppy-DashboardContent-panel", className),
    role: "tabpanel",
    "data-uppy-panelType": "PickerPanel",
    id: `uppy-DashboardContent-panel--${activePickerPanel.id}`,
    onDragOver: ignoreEvent_default,
    onDragLeave: ignoreEvent_default,
    onDrop: ignoreEvent_default,
    onPaste: ignoreEvent_default
  }, y("div", {
    className: "uppy-DashboardContent-bar"
  }, y("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, i18n("importFrom", {
    name: activePickerPanel.name
  })), y("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: hideAllPanels
  }, i18n("cancel"))), y("div", {
    className: "uppy-DashboardContent-panelBody"
  }, uppy.getPlugin(activePickerPanel.id).render(state)));
}
var PickerPanelContent_default = PickerPanelContent;

// node_modules/@uppy/dashboard/lib/components/EditorPanel.js
var import_classnames6 = __toESM(require_classnames(), 1);
function EditorPanel(props) {
  const file = props.files[props.fileCardFor];
  return y("div", {
    className: (0, import_classnames6.default)("uppy-DashboardContent-panel", props.className),
    role: "tabpanel",
    "data-uppy-panelType": "FileEditor",
    id: "uppy-DashboardContent-panel--editor"
  }, y("div", {
    className: "uppy-DashboardContent-bar"
  }, y("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, props.i18nArray("editing", {
    file: y("span", {
      className: "uppy-DashboardContent-titleFile"
    }, file.meta ? file.meta.name : file.name)
  })), y("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: props.hideAllPanels
  }, props.i18n("cancel")), y("button", {
    className: "uppy-DashboardContent-save",
    type: "button",
    onClick: props.saveFileEditor
  }, props.i18n("save"))), y("div", {
    className: "uppy-DashboardContent-panelBody"
  }, props.editors.map((target) => {
    return props.uppy.getPlugin(target.id).render(props.state);
  })));
}
var EditorPanel_default = EditorPanel;

// node_modules/@uppy/dashboard/lib/components/PickerPanelTopBar.js
var uploadStates = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete",
  STATE_PAUSED: "paused"
};
function getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files) {
  if (files === void 0) {
    files = {};
  }
  if (isAllErrored) {
    return uploadStates.STATE_ERROR;
  }
  if (isAllComplete) {
    return uploadStates.STATE_COMPLETE;
  }
  if (isAllPaused) {
    return uploadStates.STATE_PAUSED;
  }
  let state = uploadStates.STATE_WAITING;
  const fileIDs = Object.keys(files);
  for (let i3 = 0; i3 < fileIDs.length; i3++) {
    const {
      progress
    } = files[fileIDs[i3]];
    if (progress.uploadStarted && !progress.uploadComplete) {
      return uploadStates.STATE_UPLOADING;
    }
    if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
      state = uploadStates.STATE_PREPROCESSING;
    }
    if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
      state = uploadStates.STATE_POSTPROCESSING;
    }
  }
  return state;
}
function UploadStatus(_ref) {
  let {
    files,
    i18n,
    isAllComplete,
    isAllErrored,
    isAllPaused,
    inProgressNotPausedFiles,
    newFiles,
    processingFiles
  } = _ref;
  const uploadingState = getUploadingState2(isAllErrored, isAllComplete, isAllPaused, files);
  switch (uploadingState) {
    case "uploading":
      return i18n("uploadingXFiles", {
        smart_count: inProgressNotPausedFiles.length
      });
    case "preprocessing":
    case "postprocessing":
      return i18n("processingXFiles", {
        smart_count: processingFiles.length
      });
    case "paused":
      return i18n("uploadPaused");
    case "waiting":
      return i18n("xFilesSelected", {
        smart_count: newFiles.length
      });
    case "complete":
      return i18n("uploadComplete");
    default:
  }
}
function PanelTopBar(props) {
  const {
    i18n,
    isAllComplete,
    hideCancelButton,
    maxNumberOfFiles,
    toggleAddFilesPanel,
    uppy
  } = props;
  let {
    allowNewUpload
  } = props;
  if (allowNewUpload && maxNumberOfFiles) {
    allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
  }
  return y("div", {
    className: "uppy-DashboardContent-bar"
  }, !isAllComplete && !hideCancelButton ? y("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: () => uppy.cancelAll()
  }, i18n("cancel")) : y("div", null), y("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, y(UploadStatus, props)), allowNewUpload ? y("button", {
    className: "uppy-DashboardContent-addMore",
    type: "button",
    "aria-label": i18n("addMoreFiles"),
    title: i18n("addMoreFiles"),
    onClick: () => toggleAddFilesPanel(true)
  }, y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15"
  }, y("path", {
    d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
  })), y("span", {
    className: "uppy-DashboardContent-addMoreCaption"
  }, i18n("addMore"))) : y("div", null));
}
var PickerPanelTopBar_default = PanelTopBar;

// node_modules/@uppy/dashboard/lib/components/FileCard/index.js
var import_classnames7 = __toESM(require_classnames(), 1);
var FileCard = class extends k {
  constructor(props) {
    super(props);
    this.form = document.createElement("form");
    this.updateMeta = (newVal, name) => {
      this.setState((_ref) => {
        let {
          formState
        } = _ref;
        return {
          formState: {
            ...formState,
            [name]: newVal
          }
        };
      });
    };
    this.handleSave = (e3) => {
      e3.preventDefault();
      const fileID = this.props.fileCardFor;
      this.props.saveFileCard(this.state.formState, fileID);
    };
    this.handleCancel = () => {
      const file = this.props.files[this.props.fileCardFor];
      this.props.uppy.emit("file-editor:cancel", file);
      this.props.toggleFileCard(false);
    };
    this.saveOnEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.stopPropagation();
        ev.preventDefault();
        const file = this.props.files[this.props.fileCardFor];
        this.props.saveFileCard(this.state.formState, file.id);
      }
    };
    this.renderMetaFields = () => {
      const metaFields = this.getMetaFields() || [];
      const fieldCSSClasses = {
        text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
      };
      return metaFields.map((field) => {
        const id11 = `uppy-Dashboard-FileCard-input-${field.id}`;
        const required = this.props.requiredMetaFields.includes(field.id);
        return y("fieldset", {
          key: field.id,
          className: "uppy-Dashboard-FileCard-fieldset"
        }, y("label", {
          className: "uppy-Dashboard-FileCard-label",
          htmlFor: id11
        }, field.name), field.render !== void 0 ? field.render({
          value: this.state.formState[field.id],
          onChange: (newVal) => this.updateMeta(newVal, field.id),
          fieldCSSClasses,
          required,
          form: this.form.id
        }, y) : y("input", {
          className: fieldCSSClasses.text,
          id: id11,
          form: this.form.id,
          type: field.type || "text",
          required,
          value: this.state.formState[field.id],
          placeholder: field.placeholder,
          onKeyUp: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
          onKeyDown: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
          onKeyPress: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
          onInput: (ev) => this.updateMeta(ev.target.value, field.id),
          "data-uppy-super-focusable": true
        }));
      });
    };
    const _file = this.props.files[this.props.fileCardFor];
    const _metaFields = this.getMetaFields() || [];
    const storedMetaData = {};
    _metaFields.forEach((field) => {
      storedMetaData[field.id] = _file.meta[field.id] || "";
    });
    this.state = {
      formState: storedMetaData
    };
    this.form.id = nanoid();
  }
  // TODO(aduh95): move this to `UNSAFE_componentWillMount` when updating to Preact X+.
  componentWillMount() {
    this.form.addEventListener("submit", this.handleSave);
    document.body.appendChild(this.form);
  }
  componentWillUnmount() {
    this.form.removeEventListener("submit", this.handleSave);
    document.body.removeChild(this.form);
  }
  getMetaFields() {
    return typeof this.props.metaFields === "function" ? this.props.metaFields(this.props.files[this.props.fileCardFor]) : this.props.metaFields;
  }
  render() {
    const file = this.props.files[this.props.fileCardFor];
    const showEditButton = this.props.canEditFile(file);
    return y("div", {
      className: (0, import_classnames7.default)("uppy-Dashboard-FileCard", this.props.className),
      "data-uppy-panelType": "FileCard",
      onDragOver: ignoreEvent_default,
      onDragLeave: ignoreEvent_default,
      onDrop: ignoreEvent_default,
      onPaste: ignoreEvent_default
    }, y("div", {
      className: "uppy-DashboardContent-bar"
    }, y("div", {
      className: "uppy-DashboardContent-title",
      role: "heading",
      "aria-level": "1"
    }, this.props.i18nArray("editing", {
      file: y("span", {
        className: "uppy-DashboardContent-titleFile"
      }, file.meta ? file.meta.name : file.name)
    })), y("button", {
      className: "uppy-DashboardContent-back",
      type: "button",
      form: this.form.id,
      title: this.props.i18n("finishEditingFile"),
      onClick: this.handleCancel
    }, this.props.i18n("cancel"))), y("div", {
      className: "uppy-Dashboard-FileCard-inner"
    }, y("div", {
      className: "uppy-Dashboard-FileCard-preview",
      style: {
        backgroundColor: getIconByMime(file.type).color
      }
    }, y(FilePreview, {
      file
    }), showEditButton && y("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
      onClick: (event) => {
        this.handleSave(event);
        this.props.openFileEditor(file);
      },
      form: this.form.id
    }, this.props.i18n("editFile"))), y("div", {
      className: "uppy-Dashboard-FileCard-info"
    }, this.renderMetaFields()), y("div", {
      className: "uppy-Dashboard-FileCard-actions"
    }, y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
      type: "form" in HTMLButtonElement.prototype ? "submit" : "button",
      onClick: "form" in HTMLButtonElement.prototype ? void 0 : this.handleSave,
      form: this.form.id
    }, this.props.i18n("saveChanges")), y("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
      type: "button",
      onClick: this.handleCancel,
      form: this.form.id
    }, this.props.i18n("cancel")))));
  }
};
var FileCard_default = FileCard;

// node_modules/@uppy/dashboard/lib/components/Slide.js
var import_classnames8 = __toESM(require_classnames(), 1);
var transitionName = "uppy-transition-slideDownUp";
var duration = 250;
var Slide = class extends k {
  constructor(props) {
    super(props);
    this.state = {
      cachedChildren: null,
      className: ""
    };
  }
  // TODO: refactor to stable lifecycle method
  // eslint-disable-next-line
  componentWillUpdate(nextProps) {
    const {
      cachedChildren
    } = this.state;
    const child = P(nextProps.children)[0];
    if (cachedChildren === child)
      return null;
    const patch = {
      cachedChildren: child
    };
    if (child && !cachedChildren) {
      patch.className = `${transitionName}-enter`;
      cancelAnimationFrame(this.animationFrame);
      clearTimeout(this.leaveTimeout);
      this.leaveTimeout = void 0;
      this.animationFrame = requestAnimationFrame(() => {
        this.setState({
          className: `${transitionName}-enter ${transitionName}-enter-active`
        });
        this.enterTimeout = setTimeout(() => {
          this.setState({
            className: ""
          });
        }, duration);
      });
    }
    if (cachedChildren && !child && this.leaveTimeout === void 0) {
      patch.cachedChildren = cachedChildren;
      patch.className = `${transitionName}-leave`;
      cancelAnimationFrame(this.animationFrame);
      clearTimeout(this.enterTimeout);
      this.enterTimeout = void 0;
      this.animationFrame = requestAnimationFrame(() => {
        this.setState({
          className: `${transitionName}-leave ${transitionName}-leave-active`
        });
        this.leaveTimeout = setTimeout(() => {
          this.setState({
            cachedChildren: null,
            className: ""
          });
        }, duration);
      });
    }
    this.setState(patch);
  }
  render() {
    const {
      cachedChildren,
      className
    } = this.state;
    if (!cachedChildren) {
      return null;
    }
    return E(cachedChildren, {
      className: (0, import_classnames8.default)(className, cachedChildren.props.className)
    });
  }
};
var Slide_default = Slide;

// node_modules/@uppy/dashboard/lib/components/Dashboard.js
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
var WIDTH_XL = 900;
var WIDTH_LG = 700;
var WIDTH_MD = 576;
var HEIGHT_MD = 400;
function Dashboard(props) {
  const noFiles = props.totalFileCount === 0;
  const singleFile = props.totalFileCount === 1;
  const isSizeMD = props.containerWidth > WIDTH_MD;
  const dashboardClassName = (0, import_classnames9.default)({
    "uppy-Dashboard": true,
    "uppy-Dashboard--isDisabled": props.disabled,
    "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
    "uppy-Dashboard--isClosing": props.isClosing,
    "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
    "uppy-Dashboard--modal": !props.inline,
    "uppy-size--md": props.containerWidth > WIDTH_MD,
    "uppy-size--lg": props.containerWidth > WIDTH_LG,
    "uppy-size--xl": props.containerWidth > WIDTH_XL,
    "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
    "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
    "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible,
    "uppy-Dashboard--singleFile": singleFile
  });
  let itemsPerRow = 1;
  if (props.containerWidth > WIDTH_XL) {
    itemsPerRow = 5;
  } else if (props.containerWidth > WIDTH_LG) {
    itemsPerRow = 4;
  } else if (props.containerWidth > WIDTH_MD) {
    itemsPerRow = 3;
  }
  const showFileList = props.showSelectedFiles && !noFiles;
  const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
  const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : null;
  const renderRestoredText = () => {
    if (numberOfGhosts > 0) {
      return props.i18n("recoveredXFiles", {
        smart_count: numberOfGhosts
      });
    }
    return props.i18n("recoveredAllFiles");
  };
  const dashboard = y("div", {
    className: dashboardClassName,
    "data-uppy-theme": props.theme,
    "data-uppy-num-acquirers": props.acquirers.length,
    "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
    "aria-hidden": props.inline ? "false" : props.isHidden,
    "aria-disabled": props.disabled,
    "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"),
    onPaste: props.handlePaste,
    onDragOver: props.handleDragOver,
    onDragLeave: props.handleDragLeave,
    onDrop: props.handleDrop
  }, y("div", {
    "aria-hidden": "true",
    className: "uppy-Dashboard-overlay",
    tabIndex: -1,
    onClick: props.handleClickOutside
  }), y("div", {
    className: "uppy-Dashboard-inner",
    "aria-modal": !props.inline && "true",
    role: !props.inline && "dialog",
    style: {
      width: props.inline && props.width ? props.width : "",
      height: props.inline && props.height ? props.height : ""
    }
  }, !props.inline ? y("button", {
    className: "uppy-u-reset uppy-Dashboard-close",
    type: "button",
    "aria-label": props.i18n("closeModal"),
    title: props.i18n("closeModal"),
    onClick: props.closeModal
  }, y("span", {
    "aria-hidden": "true"
  }, "\xD7")) : null, y("div", {
    className: "uppy-Dashboard-innerWrap"
  }, y("div", {
    className: "uppy-Dashboard-dropFilesHereHint"
  }, props.i18n("dropHint")), showFileList && y(PickerPanelTopBar_default, props), numberOfFilesForRecovery && y("div", {
    className: "uppy-Dashboard-serviceMsg"
  }, y("svg", {
    className: "uppy-Dashboard-serviceMsg-icon",
    "aria-hidden": "true",
    focusable: "false",
    width: "21",
    height: "16",
    viewBox: "0 0 24 19"
  }, y("g", {
    transform: "translate(0 -1)",
    fill: "none",
    fillRule: "evenodd"
  }, y("path", {
    d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
    fill: "#FFD300"
  }), y("path", {
    fill: "#000",
    d: "M11 6h2l-.3 8h-1.4z"
  }), y("circle", {
    fill: "#000",
    cx: "12",
    cy: "17",
    r: "1"
  }))), y("strong", {
    className: "uppy-Dashboard-serviceMsg-title"
  }, props.i18n("sessionRestored")), y("div", {
    className: "uppy-Dashboard-serviceMsg-text"
  }, renderRestoredText())), showFileList ? y(
    FileList_default,
    _extends3({}, props, {
      singleFile,
      itemsPerRow
    })
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    y(AddFiles_default, _extends3({}, props, {
      isSizeMD
    }))
  ), y(Slide_default, null, props.showAddFilesPanel ? y(AddFilesPanel_default, _extends3({
    key: "AddFiles"
  }, props, {
    isSizeMD
  })) : null), y(Slide_default, null, props.fileCardFor ? y(FileCard_default, _extends3({
    key: "FileCard"
  }, props)) : null), y(Slide_default, null, props.activePickerPanel ? y(PickerPanelContent_default, _extends3({
    key: "Picker"
  }, props)) : null), y(Slide_default, null, props.showFileEditor ? y(EditorPanel_default, _extends3({
    key: "Editor"
  }, props)) : null), y("div", {
    className: "uppy-Dashboard-progressindicators"
  }, props.progressindicators.map((target) => {
    return props.uppy.getPlugin(target.id).render(props.state);
  })))));
  return dashboard;
}

// node_modules/@uppy/dashboard/lib/locale.js
var locale_default4 = {
  strings: {
    // When `inline: false`, used as the screen reader label for the button that closes the modal.
    closeModal: "Close Modal",
    // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
    addMoreFiles: "Add more files",
    addingMoreFiles: "Adding more files",
    // Used as the header for import panels, e.g., “Import from Google Drive”.
    importFrom: "Import from %{name}",
    // When `inline: false`, used as the screen reader label for the dashboard modal.
    dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
    // When `inline: true`, used as the screen reader label for the dashboard area.
    dashboardTitle: "Uppy Dashboard",
    // Shown in the Informer when a link to a file was copied to the clipboard.
    copyLinkToClipboardSuccess: "Link copied to clipboard.",
    // Used when a link cannot be copied automatically — the user has to select the text from the
    // input element below this string.
    copyLinkToClipboardFallback: "Copy the URL below",
    // Used as the hover title and screen reader label for buttons that copy a file link.
    copyLink: "Copy link",
    back: "Back",
    // Used as the screen reader label for buttons that remove a file.
    removeFile: "Remove file",
    // Used as the screen reader label for buttons that open the metadata editor panel for a file.
    editFile: "Edit file",
    // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
    editing: "Editing %{file}",
    // Used as the screen reader label for the button that saves metadata edits and returns to the
    // file list view.
    finishEditingFile: "Finish editing file",
    saveChanges: "Save changes",
    // Used as the label for the tab button that opens the system file selection dialog.
    myDevice: "My Device",
    dropHint: "Drop your files here",
    // Used as the hover text and screen reader label for file progress indicators when
    // they have been fully uploaded.
    uploadComplete: "Upload complete",
    uploadPaused: "Upload paused",
    // Used as the hover text and screen reader label for the buttons to resume paused uploads.
    resumeUpload: "Resume upload",
    // Used as the hover text and screen reader label for the buttons to pause uploads.
    pauseUpload: "Pause upload",
    // Used as the hover text and screen reader label for the buttons to retry failed uploads.
    retryUpload: "Retry upload",
    // Used as the hover text and screen reader label for the buttons to cancel uploads.
    cancelUpload: "Cancel upload",
    // Used in a title, how many files are currently selected
    xFilesSelected: {
      0: "%{smart_count} file selected",
      1: "%{smart_count} files selected"
    },
    uploadingXFiles: {
      0: "Uploading %{smart_count} file",
      1: "Uploading %{smart_count} files"
    },
    processingXFiles: {
      0: "Processing %{smart_count} file",
      1: "Processing %{smart_count} files"
    },
    // The "powered by Uppy" link at the bottom of the Dashboard.
    poweredBy: "Powered by %{uppy}",
    addMore: "Add more",
    editFileWithFilename: "Edit file %{file}",
    save: "Save",
    cancel: "Cancel",
    dropPasteFiles: "Drop files here or %{browseFiles}",
    dropPasteFolders: "Drop files here or %{browseFolders}",
    dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
    dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
    dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
    dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
    importFiles: "Import files from:",
    browseFiles: "browse files",
    browseFolders: "browse folders",
    recoveredXFiles: {
      0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
      1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
    },
    recoveredAllFiles: "We restored all files. You can now resume the upload.",
    sessionRestored: "Session restored",
    reSelect: "Re-select",
    missingRequiredMetaFields: {
      0: "Missing required meta field: %{fields}.",
      1: "Missing required meta fields: %{fields}."
    },
    // Used for native device camera buttons on mobile
    takePictureBtn: "Take Picture",
    recordVideoBtn: "Record Video"
  }
};

// node_modules/@uppy/dashboard/lib/Dashboard.js
function _classPrivateFieldLooseBase5(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id5 = 0;
function _classPrivateFieldLooseKey5(name) {
  return "__private_" + id5++ + "_" + name;
}
var packageJson6 = {
  "version": "3.3.1"
};
var memoize = memoizeOne.default || memoizeOne;
var TAB_KEY = 9;
var ESC_KEY = 27;
function createPromise() {
  const o3 = {};
  o3.promise = new Promise((resolve, reject) => {
    o3.resolve = resolve;
    o3.reject = reject;
  });
  return o3;
}
function defaultPickerIcon() {
  return y("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "30",
    height: "30",
    viewBox: "0 0 30 30"
  }, y("path", {
    d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
  }));
}
var _disabledNodes = /* @__PURE__ */ _classPrivateFieldLooseKey5("disabledNodes");
var _generateLargeThumbnailIfSingleFile = /* @__PURE__ */ _classPrivateFieldLooseKey5("generateLargeThumbnailIfSingleFile");
var _openFileEditorWhenFilesAdded = /* @__PURE__ */ _classPrivateFieldLooseKey5("openFileEditorWhenFilesAdded");
var _attachRenderFunctionToTarget = /* @__PURE__ */ _classPrivateFieldLooseKey5("attachRenderFunctionToTarget");
var _isTargetSupported = /* @__PURE__ */ _classPrivateFieldLooseKey5("isTargetSupported");
var _getAcquirers = /* @__PURE__ */ _classPrivateFieldLooseKey5("getAcquirers");
var _getProgressIndicators = /* @__PURE__ */ _classPrivateFieldLooseKey5("getProgressIndicators");
var _getEditors = /* @__PURE__ */ _classPrivateFieldLooseKey5("getEditors");
var Dashboard2 = class extends UIPlugin_default {
  constructor(uppy, _opts) {
    var _this;
    super(uppy, _opts);
    _this = this;
    Object.defineProperty(this, _disabledNodes, {
      writable: true,
      value: null
    });
    this.removeTarget = (plugin) => {
      const pluginState = this.getPluginState();
      const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
      this.setPluginState({
        targets: newTargets
      });
    };
    this.addTarget = (plugin) => {
      const callerPluginId = plugin.id || plugin.constructor.name;
      const callerPluginName = plugin.title || callerPluginId;
      const callerPluginType = plugin.type;
      if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
        const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
        this.uppy.log(msg, "error");
        return void 0;
      }
      const target = {
        id: callerPluginId,
        name: callerPluginName,
        type: callerPluginType
      };
      const state = this.getPluginState();
      const newTargets = state.targets.slice();
      newTargets.push(target);
      this.setPluginState({
        targets: newTargets
      });
      return this.el;
    };
    this.hideAllPanels = () => {
      const state = this.getPluginState();
      const update = {
        activePickerPanel: false,
        showAddFilesPanel: false,
        activeOverlayType: null,
        fileCardFor: null,
        showFileEditor: false
      };
      if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
        return;
      }
      this.setPluginState(update);
    };
    this.showPanel = (id11) => {
      const {
        targets
      } = this.getPluginState();
      const activePickerPanel = targets.filter((target) => {
        return target.type === "acquirer" && target.id === id11;
      })[0];
      this.setPluginState({
        activePickerPanel,
        activeOverlayType: "PickerPanel"
      });
      this.uppy.emit("dashboard:show-panel", id11);
    };
    this.canEditFile = (file) => {
      const {
        targets
      } = this.getPluginState();
      const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
      return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
    };
    this.openFileEditor = (file) => {
      const {
        targets
      } = this.getPluginState();
      const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
      this.setPluginState({
        showFileEditor: true,
        fileCardFor: file.id || null,
        activeOverlayType: "FileEditor"
      });
      editors.forEach((editor) => {
        this.uppy.getPlugin(editor.id).selectFile(file);
      });
    };
    this.saveFileEditor = () => {
      const {
        targets
      } = this.getPluginState();
      const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](targets);
      editors.forEach((editor) => {
        this.uppy.getPlugin(editor.id).save();
      });
      this.hideAllPanels();
    };
    this.openModal = () => {
      const {
        promise,
        resolve
      } = createPromise();
      this.savedScrollPosition = window.pageYOffset;
      this.savedActiveElement = document.activeElement;
      if (this.opts.disablePageScrollWhenModalOpen) {
        document.body.classList.add("uppy-Dashboard-isFixed");
      }
      if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
        const handler = () => {
          this.setPluginState({
            isHidden: false
          });
          this.el.removeEventListener("animationend", handler, false);
          resolve();
        };
        this.el.addEventListener("animationend", handler, false);
      } else {
        this.setPluginState({
          isHidden: false
        });
        resolve();
      }
      if (this.opts.browserBackButtonClose) {
        this.updateBrowserHistory();
      }
      document.addEventListener("keydown", this.handleKeyDownInModal);
      this.uppy.emit("dashboard:modal-open");
      return promise;
    };
    this.closeModal = function(opts) {
      if (opts === void 0) {
        opts = {};
      }
      const {
        // Whether the modal is being closed by the user (`true`) or by other means (e.g. browser back button)
        manualClose = true
      } = opts;
      const {
        isHidden,
        isClosing
      } = _this.getPluginState();
      if (isHidden || isClosing) {
        return void 0;
      }
      const {
        promise,
        resolve
      } = createPromise();
      if (_this.opts.disablePageScrollWhenModalOpen) {
        document.body.classList.remove("uppy-Dashboard-isFixed");
      }
      if (_this.opts.animateOpenClose) {
        _this.setPluginState({
          isClosing: true
        });
        const handler = () => {
          _this.setPluginState({
            isHidden: true,
            isClosing: false
          });
          _this.superFocus.cancel();
          _this.savedActiveElement.focus();
          _this.el.removeEventListener("animationend", handler, false);
          resolve();
        };
        _this.el.addEventListener("animationend", handler, false);
      } else {
        _this.setPluginState({
          isHidden: true
        });
        _this.superFocus.cancel();
        _this.savedActiveElement.focus();
        resolve();
      }
      document.removeEventListener("keydown", _this.handleKeyDownInModal);
      if (manualClose) {
        if (_this.opts.browserBackButtonClose) {
          var _history$state;
          if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
            history.back();
          }
        }
      }
      _this.uppy.emit("dashboard:modal-closed");
      return promise;
    };
    this.isModalOpen = () => {
      return !this.getPluginState().isHidden || false;
    };
    this.requestCloseModal = () => {
      if (this.opts.onRequestCloseModal) {
        return this.opts.onRequestCloseModal();
      }
      return this.closeModal();
    };
    this.setDarkModeCapability = (isDarkModeOn) => {
      const {
        capabilities
      } = this.uppy.getState();
      this.uppy.setState({
        capabilities: {
          ...capabilities,
          darkMode: isDarkModeOn
        }
      });
    };
    this.handleSystemDarkModeChange = (event) => {
      const isDarkModeOnNow = event.matches;
      this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
      this.setDarkModeCapability(isDarkModeOnNow);
    };
    this.toggleFileCard = (show, fileID) => {
      const file = this.uppy.getFile(fileID);
      if (show) {
        this.uppy.emit("dashboard:file-edit-start", file);
      } else {
        this.uppy.emit("dashboard:file-edit-complete", file);
      }
      this.setPluginState({
        fileCardFor: show ? fileID : null,
        activeOverlayType: show ? "FileCard" : null
      });
    };
    this.toggleAddFilesPanel = (show) => {
      this.setPluginState({
        showAddFilesPanel: show,
        activeOverlayType: show ? "AddFiles" : null
      });
    };
    this.addFiles = (files) => {
      const descriptors = files.map((file) => ({
        source: this.id,
        name: file.name,
        type: file.type,
        data: file,
        meta: {
          // path of the file relative to the ancestor directory the user selected.
          // e.g. 'docs/Old Prague/airbnb.pdf'
          relativePath: file.relativePath || file.webkitRelativePath || null
        }
      }));
      try {
        this.uppy.addFiles(descriptors);
      } catch (err) {
        this.uppy.log(err);
      }
    };
    this.startListeningToResize = () => {
      this.resizeObserver = new ResizeObserver((entries) => {
        const uppyDashboardInnerEl = entries[0];
        const {
          width,
          height
        } = uppyDashboardInnerEl.contentRect;
        this.setPluginState({
          containerWidth: width,
          containerHeight: height,
          areInsidesReadyToBeVisible: true
        });
      });
      this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
      this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
        const pluginState = this.getPluginState();
        const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
        if (
          // if ResizeObserver hasn't yet fired,
          !pluginState.areInsidesReadyToBeVisible && !isModalAndClosed
        ) {
          this.uppy.log("[Dashboard] resize event didn\u2019t fire on time: defaulted to mobile layout", "warning");
          this.setPluginState({
            areInsidesReadyToBeVisible: true
          });
        }
      }, 1e3);
    };
    this.stopListeningToResize = () => {
      this.resizeObserver.disconnect();
      clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
    };
    this.recordIfFocusedOnUppyRecently = (event) => {
      if (this.el.contains(event.target)) {
        this.ifFocusedOnUppyRecently = true;
      } else {
        this.ifFocusedOnUppyRecently = false;
        this.superFocus.cancel();
      }
    };
    this.disableInteractiveElements = (disable) => {
      var _classPrivateFieldLoo;
      const NODES_TO_DISABLE = ["a[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", '[role="button"]:not([disabled])'];
      const nodesToDisable = (_classPrivateFieldLoo = _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes]) != null ? _classPrivateFieldLoo : toArray_default(this.el.querySelectorAll(NODES_TO_DISABLE)).filter((node) => !node.classList.contains("uppy-Dashboard-close"));
      for (const node of nodesToDisable) {
        if (node.tagName === "A") {
          node.setAttribute("aria-disabled", disable);
        } else {
          node.disabled = disable;
        }
      }
      if (disable) {
        _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes] = nodesToDisable;
      } else {
        _classPrivateFieldLooseBase5(this, _disabledNodes)[_disabledNodes] = null;
      }
      this.dashboardIsDisabled = disable;
    };
    this.updateBrowserHistory = () => {
      var _history$state2;
      if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
        history.pushState({
          // eslint-disable-next-line no-restricted-globals
          ...history.state,
          [this.modalName]: true
        }, "");
      }
      window.addEventListener("popstate", this.handlePopState, false);
    };
    this.handlePopState = (event) => {
      var _event$state;
      if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
        this.closeModal({
          manualClose: false
        });
      }
      if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
        history.back();
      }
    };
    this.handleKeyDownInModal = (event) => {
      if (event.keyCode === ESC_KEY)
        this.requestCloseModal(event);
      if (event.keyCode === TAB_KEY)
        trapFocus(event, this.getPluginState().activeOverlayType, this.el);
    };
    this.handleClickOutside = () => {
      if (this.opts.closeModalOnClickOutside)
        this.requestCloseModal();
    };
    this.handlePaste = (event) => {
      this.uppy.iteratePlugins((plugin) => {
        if (plugin.type === "acquirer") {
          plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
        }
      });
      const files = toArray_default(event.clipboardData.files);
      if (files.length > 0) {
        this.uppy.log("[Dashboard] Files pasted");
        this.addFiles(files);
      }
    };
    this.handleInputChange = (event) => {
      event.preventDefault();
      const files = toArray_default(event.target.files);
      if (files.length > 0) {
        this.uppy.log("[Dashboard] Files selected through input");
        this.addFiles(files);
      }
    };
    this.handleDragOver = (event) => {
      var _this$opts$onDragOver, _this$opts;
      event.preventDefault();
      event.stopPropagation();
      const canSomePluginHandleRootDrop = () => {
        let somePluginCanHandleRootDrop2 = true;
        this.uppy.iteratePlugins((plugin) => {
          if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
            somePluginCanHandleRootDrop2 = true;
          }
        });
        return somePluginCanHandleRootDrop2;
      };
      const doesEventHaveFiles = () => {
        const {
          types
        } = event.dataTransfer;
        return types.some((type) => type === "Files");
      };
      const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
      const hasFiles = doesEventHaveFiles(event);
      if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
        event.dataTransfer.dropEffect = "none";
        clearTimeout(this.removeDragOverClassTimeout);
        return;
      }
      event.dataTransfer.dropEffect = "copy";
      clearTimeout(this.removeDragOverClassTimeout);
      this.setPluginState({
        isDraggingOver: true
      });
      (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
    };
    this.handleDragLeave = (event) => {
      var _this$opts$onDragLeav, _this$opts2;
      event.preventDefault();
      event.stopPropagation();
      clearTimeout(this.removeDragOverClassTimeout);
      this.removeDragOverClassTimeout = setTimeout(() => {
        this.setPluginState({
          isDraggingOver: false
        });
      }, 50);
      (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
    };
    this.handleDrop = async (event) => {
      var _this$opts$onDrop, _this$opts3;
      event.preventDefault();
      event.stopPropagation();
      clearTimeout(this.removeDragOverClassTimeout);
      this.setPluginState({
        isDraggingOver: false
      });
      this.uppy.iteratePlugins((plugin) => {
        if (plugin.type === "acquirer") {
          plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
        }
      });
      let executedDropErrorOnce = false;
      const logDropError = (error) => {
        this.uppy.log(error, "error");
        if (!executedDropErrorOnce) {
          this.uppy.info(error.message, "error");
          executedDropErrorOnce = true;
        }
      };
      const files = await getDroppedFiles(event.dataTransfer, {
        logDropError
      });
      if (files.length > 0) {
        this.uppy.log("[Dashboard] Files dropped");
        this.addFiles(files);
      }
      (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
    };
    this.handleRequestThumbnail = (file) => {
      if (!this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.emit("thumbnail:request", file);
      }
    };
    this.handleCancelThumbnail = (file) => {
      if (!this.opts.waitForThumbnailsBeforeUpload) {
        this.uppy.emit("thumbnail:cancel", file);
      }
    };
    this.handleKeyDownInInline = (event) => {
      if (event.keyCode === TAB_KEY)
        forInline(event, this.getPluginState().activeOverlayType, this.el);
    };
    this.handlePasteOnBody = (event) => {
      const isFocusInOverlay2 = this.el.contains(document.activeElement);
      if (isFocusInOverlay2) {
        this.handlePaste(event);
      }
    };
    this.handleComplete = (_ref) => {
      let {
        failed
      } = _ref;
      if (this.opts.closeAfterFinish && failed.length === 0) {
        this.requestCloseModal();
      }
    };
    this.handleCancelRestore = () => {
      this.uppy.emit("restore-canceled");
    };
    Object.defineProperty(this, _generateLargeThumbnailIfSingleFile, {
      writable: true,
      value: () => {
        if (this.opts.disableThumbnailGenerator) {
          return;
        }
        const LARGE_THUMBNAIL = 600;
        const files = this.uppy.getFiles();
        if (files.length === 1) {
          const thumbnailGenerator = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
          thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
            thumbnailWidth: LARGE_THUMBNAIL
          });
          const fileForThumbnail = {
            ...files[0],
            preview: void 0
          };
          thumbnailGenerator.requestThumbnail(fileForThumbnail).then(() => {
            thumbnailGenerator == null ? void 0 : thumbnailGenerator.setOptions({
              thumbnailWidth: this.opts.thumbnailWidth
            });
          });
        }
      }
    });
    Object.defineProperty(this, _openFileEditorWhenFilesAdded, {
      writable: true,
      value: (files) => {
        const firstFile = files[0];
        if (this.canEditFile(firstFile)) {
          this.openFileEditor(firstFile);
        }
      }
    });
    this.initEvents = () => {
      if (this.opts.trigger && !this.opts.inline) {
        const showModalTrigger = findAllDOMElements(this.opts.trigger);
        if (showModalTrigger) {
          showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
        } else {
          this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
        }
      }
      this.startListeningToResize();
      document.addEventListener("paste", this.handlePasteOnBody);
      this.uppy.on("plugin-remove", this.removeTarget);
      this.uppy.on("file-added", this.hideAllPanels);
      this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
      this.uppy.on("file-editor:complete", this.hideAllPanels);
      this.uppy.on("complete", this.handleComplete);
      this.uppy.on("files-added", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
      this.uppy.on("file-removed", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
      document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
      document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
      if (this.opts.inline) {
        this.el.addEventListener("keydown", this.handleKeyDownInInline);
      }
      if (this.opts.autoOpenFileEditor) {
        this.uppy.on("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
      }
    };
    this.removeEvents = () => {
      const showModalTrigger = findAllDOMElements(this.opts.trigger);
      if (!this.opts.inline && showModalTrigger) {
        showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
      }
      this.stopListeningToResize();
      document.removeEventListener("paste", this.handlePasteOnBody);
      window.removeEventListener("popstate", this.handlePopState, false);
      this.uppy.off("plugin-remove", this.removeTarget);
      this.uppy.off("file-added", this.hideAllPanels);
      this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
      this.uppy.off("file-editor:complete", this.hideAllPanels);
      this.uppy.off("complete", this.handleComplete);
      this.uppy.off("files-added", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
      this.uppy.off("file-removed", _classPrivateFieldLooseBase5(this, _generateLargeThumbnailIfSingleFile)[_generateLargeThumbnailIfSingleFile]);
      document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
      document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
      if (this.opts.inline) {
        this.el.removeEventListener("keydown", this.handleKeyDownInInline);
      }
      if (this.opts.autoOpenFileEditor) {
        this.uppy.off("files-added", _classPrivateFieldLooseBase5(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
      }
    };
    this.superFocusOnEachUpdate = () => {
      const isFocusInUppy = this.el.contains(document.activeElement);
      const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
      const isInformerHidden = this.uppy.getState().info.length === 0;
      const isModal = !this.opts.inline;
      if (
        // If update is connected to showing the Informer - let the screen reader calmly read it.
        isInformerHidden && // If we are in a modal - always superfocus without concern for other elements
        // on the page (user is unlikely to want to interact with the rest of the page)
        (isModal || isFocusInUppy || isFocusNowhere && this.ifFocusedOnUppyRecently)
      ) {
        this.superFocus(this.el, this.getPluginState().activeOverlayType);
      } else {
        this.superFocus.cancel();
      }
    };
    this.afterUpdate = () => {
      if (this.opts.disabled && !this.dashboardIsDisabled) {
        this.disableInteractiveElements(true);
        return;
      }
      if (!this.opts.disabled && this.dashboardIsDisabled) {
        this.disableInteractiveElements(false);
      }
      this.superFocusOnEachUpdate();
    };
    this.saveFileCard = (meta, fileID) => {
      this.uppy.setFileMeta(fileID, meta);
      this.toggleFileCard(false, fileID);
    };
    Object.defineProperty(this, _attachRenderFunctionToTarget, {
      writable: true,
      value: (target) => {
        const plugin = this.uppy.getPlugin(target.id);
        return {
          ...target,
          icon: plugin.icon || this.opts.defaultPickerIcon,
          render: plugin.render
        };
      }
    });
    Object.defineProperty(this, _isTargetSupported, {
      writable: true,
      value: (target) => {
        const plugin = this.uppy.getPlugin(target.id);
        if (typeof plugin.isSupported !== "function") {
          return true;
        }
        return plugin.isSupported();
      }
    });
    Object.defineProperty(this, _getAcquirers, {
      writable: true,
      value: memoize((targets) => {
        return targets.filter((target) => target.type === "acquirer" && _classPrivateFieldLooseBase5(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
      })
    });
    Object.defineProperty(this, _getProgressIndicators, {
      writable: true,
      value: memoize((targets) => {
        return targets.filter((target) => target.type === "progressindicator").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
      })
    });
    Object.defineProperty(this, _getEditors, {
      writable: true,
      value: memoize((targets) => {
        return targets.filter((target) => target.type === "editor").map(_classPrivateFieldLooseBase5(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
      })
    });
    this.render = (state) => {
      const pluginState = this.getPluginState();
      const {
        files,
        capabilities,
        allowNewUpload
      } = state;
      const {
        newFiles,
        uploadStartedFiles,
        completeFiles,
        erroredFiles,
        inProgressFiles,
        inProgressNotPausedFiles,
        processingFiles,
        isUploadStarted,
        isAllComplete,
        isAllErrored,
        isAllPaused
      } = this.uppy.getObjectOfFilesPerState();
      const acquirers = _classPrivateFieldLooseBase5(this, _getAcquirers)[_getAcquirers](pluginState.targets);
      const progressindicators = _classPrivateFieldLooseBase5(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
      const editors = _classPrivateFieldLooseBase5(this, _getEditors)[_getEditors](pluginState.targets);
      let theme;
      if (this.opts.theme === "auto") {
        theme = capabilities.darkMode ? "dark" : "light";
      } else {
        theme = this.opts.theme;
      }
      if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
        this.opts.fileManagerSelectionType = "files";
        console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
      }
      return Dashboard({
        state,
        isHidden: pluginState.isHidden,
        files,
        newFiles,
        uploadStartedFiles,
        completeFiles,
        erroredFiles,
        inProgressFiles,
        inProgressNotPausedFiles,
        processingFiles,
        isUploadStarted,
        isAllComplete,
        isAllErrored,
        isAllPaused,
        totalFileCount: Object.keys(files).length,
        totalProgress: state.totalProgress,
        allowNewUpload,
        acquirers,
        theme,
        disabled: this.opts.disabled,
        disableLocalFiles: this.opts.disableLocalFiles,
        direction: this.opts.direction,
        activePickerPanel: pluginState.activePickerPanel,
        showFileEditor: pluginState.showFileEditor,
        saveFileEditor: this.saveFileEditor,
        disableInteractiveElements: this.disableInteractiveElements,
        animateOpenClose: this.opts.animateOpenClose,
        isClosing: pluginState.isClosing,
        progressindicators,
        editors,
        autoProceed: this.uppy.opts.autoProceed,
        id: this.id,
        closeModal: this.requestCloseModal,
        handleClickOutside: this.handleClickOutside,
        handleInputChange: this.handleInputChange,
        handlePaste: this.handlePaste,
        inline: this.opts.inline,
        showPanel: this.showPanel,
        hideAllPanels: this.hideAllPanels,
        i18n: this.i18n,
        i18nArray: this.i18nArray,
        uppy: this.uppy,
        note: this.opts.note,
        recoveredState: state.recoveredState,
        metaFields: pluginState.metaFields,
        resumableUploads: capabilities.resumableUploads || false,
        individualCancellation: capabilities.individualCancellation,
        isMobileDevice: capabilities.isMobileDevice,
        fileCardFor: pluginState.fileCardFor,
        toggleFileCard: this.toggleFileCard,
        toggleAddFilesPanel: this.toggleAddFilesPanel,
        showAddFilesPanel: pluginState.showAddFilesPanel,
        saveFileCard: this.saveFileCard,
        openFileEditor: this.openFileEditor,
        canEditFile: this.canEditFile,
        width: this.opts.width,
        height: this.opts.height,
        showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
        fileManagerSelectionType: this.opts.fileManagerSelectionType,
        proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
        hideCancelButton: this.opts.hideCancelButton,
        hideRetryButton: this.opts.hideRetryButton,
        hidePauseResumeButton: this.opts.hidePauseResumeButton,
        showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
        containerWidth: pluginState.containerWidth,
        containerHeight: pluginState.containerHeight,
        areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
        isTargetDOMEl: this.isTargetDOMEl,
        parentElement: this.el,
        allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
        maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
        requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
        showSelectedFiles: this.opts.showSelectedFiles,
        showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
        showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
        nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
        handleCancelRestore: this.handleCancelRestore,
        handleRequestThumbnail: this.handleRequestThumbnail,
        handleCancelThumbnail: this.handleCancelThumbnail,
        // drag props
        isDraggingOver: pluginState.isDraggingOver,
        handleDragOver: this.handleDragOver,
        handleDragLeave: this.handleDragLeave,
        handleDrop: this.handleDrop
      });
    };
    this.discoverProviderPlugins = () => {
      this.uppy.iteratePlugins((plugin) => {
        if (plugin && !plugin.target && plugin.opts && plugin.opts.target === this.constructor) {
          this.addTarget(plugin);
        }
      });
    };
    this.install = () => {
      this.setPluginState({
        isHidden: true,
        fileCardFor: null,
        activeOverlayType: null,
        showAddFilesPanel: false,
        activePickerPanel: false,
        showFileEditor: false,
        metaFields: this.opts.metaFields,
        targets: [],
        // We'll make them visible once .containerWidth is determined
        areInsidesReadyToBeVisible: false,
        isDraggingOver: false
      });
      const {
        inline,
        closeAfterFinish
      } = this.opts;
      if (inline && closeAfterFinish) {
        throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
      }
      const {
        allowMultipleUploads,
        allowMultipleUploadBatches
      } = this.uppy.opts;
      if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
        this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
      }
      const {
        target
      } = this.opts;
      if (target) {
        this.mount(target, this);
      }
      const plugins = this.opts.plugins || [];
      plugins.forEach((pluginID) => {
        const plugin = this.uppy.getPlugin(pluginID);
        if (plugin) {
          plugin.mount(this, plugin);
        }
      });
      if (!this.opts.disableStatusBar) {
        this.uppy.use(StatusBar2, {
          id: `${this.id}:StatusBar`,
          target: this,
          hideUploadButton: this.opts.hideUploadButton,
          hideRetryButton: this.opts.hideRetryButton,
          hidePauseResumeButton: this.opts.hidePauseResumeButton,
          hideCancelButton: this.opts.hideCancelButton,
          showProgressDetails: this.opts.showProgressDetails,
          hideAfterFinish: this.opts.hideProgressAfterFinish,
          locale: this.opts.locale,
          doneButtonHandler: this.opts.doneButtonHandler
        });
      }
      if (!this.opts.disableInformer) {
        this.uppy.use(Informer, {
          id: `${this.id}:Informer`,
          target: this
        });
      }
      if (!this.opts.disableThumbnailGenerator) {
        this.uppy.use(ThumbnailGenerator, {
          id: `${this.id}:ThumbnailGenerator`,
          thumbnailWidth: this.opts.thumbnailWidth,
          thumbnailHeight: this.opts.thumbnailHeight,
          thumbnailType: this.opts.thumbnailType,
          waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
          // If we don't block on thumbnails, we can lazily generate them
          lazy: !this.opts.waitForThumbnailsBeforeUpload
        });
      }
      this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
      const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
      this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
      this.setDarkModeCapability(isDarkModeOnFromTheStart);
      if (this.opts.theme === "auto") {
        this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
      }
      this.discoverProviderPlugins();
      this.initEvents();
    };
    this.uninstall = () => {
      if (!this.opts.disableInformer) {
        const informer = this.uppy.getPlugin(`${this.id}:Informer`);
        if (informer)
          this.uppy.removePlugin(informer);
      }
      if (!this.opts.disableStatusBar) {
        const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
        if (statusBar)
          this.uppy.removePlugin(statusBar);
      }
      if (!this.opts.disableThumbnailGenerator) {
        const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
        if (thumbnail)
          this.uppy.removePlugin(thumbnail);
      }
      const plugins = this.opts.plugins || [];
      plugins.forEach((pluginID) => {
        const plugin = this.uppy.getPlugin(pluginID);
        if (plugin)
          plugin.unmount();
      });
      if (this.opts.theme === "auto") {
        this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
      }
      this.unmount();
      this.removeEvents();
    };
    this.id = this.opts.id || "Dashboard";
    this.title = "Dashboard";
    this.type = "orchestrator";
    this.modalName = `uppy-Dashboard-${nanoid()}`;
    this.defaultLocale = locale_default4;
    const defaultOptions4 = {
      target: "body",
      metaFields: [],
      trigger: null,
      inline: false,
      width: 750,
      height: 550,
      thumbnailWidth: 280,
      thumbnailType: "image/jpeg",
      waitForThumbnailsBeforeUpload: false,
      defaultPickerIcon,
      showLinkToFileUploadResult: false,
      showProgressDetails: false,
      hideUploadButton: false,
      hideCancelButton: false,
      hideRetryButton: false,
      hidePauseResumeButton: false,
      hideProgressAfterFinish: false,
      doneButtonHandler: () => {
        this.uppy.cancelAll();
        this.requestCloseModal();
      },
      note: null,
      closeModalOnClickOutside: false,
      closeAfterFinish: false,
      disableStatusBar: false,
      disableInformer: false,
      disableThumbnailGenerator: false,
      disablePageScrollWhenModalOpen: true,
      animateOpenClose: true,
      fileManagerSelectionType: "files",
      proudlyDisplayPoweredByUppy: true,
      onRequestCloseModal: () => this.closeModal(),
      showSelectedFiles: true,
      showRemoveButtonAfterComplete: false,
      browserBackButtonClose: false,
      showNativePhotoCameraButton: false,
      showNativeVideoCameraButton: false,
      theme: "light",
      autoOpenFileEditor: false,
      disabled: false,
      disableLocalFiles: false
    };
    this.opts = {
      ...defaultOptions4,
      ..._opts
    };
    this.i18nInit();
    this.superFocus = createSuperFocus();
    this.ifFocusedOnUppyRecently = false;
    this.makeDashboardInsidesVisibleAnywayTimeout = null;
    this.removeDragOverClassTimeout = null;
  }
};
Dashboard2.VERSION = packageJson6.version;

// node_modules/js-base64/base64.mjs
var version = "3.7.5";
var VERSION = version;
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a3) => {
  let tab = {};
  a3.forEach((c3, i3) => tab[c3] = i3);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s3) => s3.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c22, asc = "";
  const pad2 = bin.length % 3;
  for (let i3 = 0; i3 < bin.length; ) {
    if ((c0 = bin.charCodeAt(i3++)) > 255 || (c1 = bin.charCodeAt(i3++)) > 255 || (c22 = bin.charCodeAt(i3++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c22;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad2 ? asc.slice(0, pad2 - 3) + "===".substring(pad2) : asc;
};
var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i3 = 0, l3 = u8a.length; i3 < l3; i3 += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i3, i3 + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c3) => {
  if (c3.length < 2) {
    var cc = c3.charCodeAt(0);
    return cc < 128 ? c3 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c3.charCodeAt(0) - 55296) * 1024 + (c3.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u3) => u3.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s3) => Buffer.from(s3, "utf8").toString("base64") : _TE ? (s3) => _fromUint8Array(_TE.encode(s3)) : (s3) => _btoa(utob(s3));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b3) => b3.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r22;
  for (let i3 = 0; i3 < asc.length; ) {
    u24 = b64tab[asc.charAt(i3++)] << 18 | b64tab[asc.charAt(i3++)] << 12 | (r1 = b64tab[asc.charAt(i3++)]) << 6 | (r22 = b64tab[asc.charAt(i3++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r22 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a3) => _U8Afrom(Buffer.from(a3, "base64")) : (a3) => _U8Afrom(_atob(a3).split("").map((c3) => c3.charCodeAt(0)));
var toUint8Array = (a3) => _toUint8Array(_unURI(a3));
var _decode = _hasBuffer ? (a3) => Buffer.from(a3, "base64").toString("utf8") : _TD ? (a3) => _TD.decode(_toUint8Array(a3)) : (a3) => btou(_atob(a3));
var _unURI = (a3) => _tidyB64(a3.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string")
    return false;
  const s3 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s3) || !/[^\s0-9a-zA-Z\-_]/.test(s3);
};
var _noEnum = (v3) => {
  return {
    value: v3,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI,
  encodeURL: encodeURI,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// node_modules/tus-js-client/lib.esm/upload.js
var import_url_parse = __toESM(require_url_parse());

// node_modules/tus-js-client/lib.esm/error.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
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
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
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
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
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
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a3 = [null];
      a3.push.apply(a3, args2);
      var Constructor = Function.bind.apply(Parent2, a3);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
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
  } catch (e3) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o3, p3) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o4, p4) {
    o4.__proto__ = p4;
    return o4;
  };
  return _setPrototypeOf(o3, p3);
}
function _getPrototypeOf(o3) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o4) {
    return o4.__proto__ || Object.getPrototypeOf(o4);
  };
  return _getPrototypeOf(o3);
}
var DetailedError = /* @__PURE__ */ function(_Error) {
  _inherits(DetailedError2, _Error);
  var _super = _createSuper(DetailedError2);
  function DetailedError2(message) {
    var _this;
    var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    _classCallCheck(this, DetailedError2);
    _this = _super.call(this, message);
    _this.originalRequest = req;
    _this.originalResponse = res;
    _this.causingError = causingErr;
    if (causingErr != null) {
      message += ", caused by ".concat(causingErr.toString());
    }
    if (req != null) {
      var requestId = req.getHeader("X-Request-ID") || "n/a";
      var method = req.getMethod();
      var url = req.getURL();
      var status = res ? res.getStatus() : "n/a";
      var body = res ? res.getBody() || "" : "n/a";
      message += ", originated from request (method: ".concat(method, ", url: ").concat(url, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
    }
    _this.message = message;
    return _this;
  }
  return _createClass(DetailedError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var error_default = DetailedError;

// node_modules/tus-js-client/lib.esm/logger.js
var isEnabled = false;
function log(msg) {
  if (!isEnabled)
    return;
  console.log(msg);
}

// node_modules/tus-js-client/lib.esm/uuid.js
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c3) {
    var r3 = Math.random() * 16 | 0;
    var v3 = c3 === "x" ? r3 : r3 & 3 | 8;
    return v3.toString(16);
  });
}

// node_modules/tus-js-client/lib.esm/upload.js
function _slicedToArray(arr, i3) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i3) || _unsupportedIterableToArray(arr, i3) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o3, minLen) {
  if (!o3)
    return;
  if (typeof o3 === "string")
    return _arrayLikeToArray(o3, minLen);
  var n3 = Object.prototype.toString.call(o3).slice(8, -1);
  if (n3 === "Object" && o3.constructor)
    n3 = o3.constructor.name;
  if (n3 === "Map" || n3 === "Set")
    return Array.from(o3);
  if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3))
    return _arrayLikeToArray(o3, minLen);
}
function _arrayLikeToArray(arr, len2) {
  if (len2 == null || len2 > arr.length)
    len2 = arr.length;
  for (var i3 = 0, arr2 = new Array(len2); i3 < len2; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i3) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i3 && _arr.length === i3)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var defaultOptions2 = {
  endpoint: null,
  uploadUrl: null,
  metadata: {},
  fingerprint: null,
  uploadSize: null,
  onProgress: null,
  onChunkComplete: null,
  onSuccess: null,
  onError: null,
  onUploadUrlAvailable: null,
  overridePatchMethod: false,
  headers: {},
  addRequestId: false,
  onBeforeRequest: null,
  onAfterResponse: null,
  onShouldRetry: null,
  chunkSize: Infinity,
  retryDelays: [0, 1e3, 3e3, 5e3],
  parallelUploads: 1,
  parallelUploadBoundaries: null,
  storeFingerprintForResuming: true,
  removeFingerprintOnSuccess: false,
  uploadLengthDeferred: false,
  uploadDataDuringCreation: false,
  urlStorage: null,
  fileReader: null,
  httpStack: null
};
var BaseUpload = /* @__PURE__ */ function() {
  function BaseUpload2(file, options) {
    _classCallCheck2(this, BaseUpload2);
    if ("resume" in options) {
      console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
    }
    this.options = options;
    this.options.chunkSize = Number(this.options.chunkSize);
    this._urlStorage = this.options.urlStorage;
    this.file = file;
    this.url = null;
    this._req = null;
    this._fingerprint = null;
    this._urlStorageKey = null;
    this._offset = null;
    this._aborted = false;
    this._size = null;
    this._source = null;
    this._retryAttempt = 0;
    this._retryTimeout = null;
    this._offsetBeforeRetry = 0;
    this._parallelUploads = null;
    this._parallelUploadUrls = null;
  }
  _createClass2(BaseUpload2, [{
    key: "findPreviousUploads",
    value: function findPreviousUploads() {
      var _this = this;
      return this.options.fingerprint(this.file, this.options).then(function(fingerprint2) {
        return _this._urlStorage.findUploadsByFingerprint(fingerprint2);
      });
    }
  }, {
    key: "resumeFromPreviousUpload",
    value: function resumeFromPreviousUpload(previousUpload) {
      this.url = previousUpload.uploadUrl || null;
      this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
      this._urlStorageKey = previousUpload.urlStorageKey;
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      var file = this.file;
      if (!file) {
        this._emitError(new Error("tus: no file or stream to upload provided"));
        return;
      }
      if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
        this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
        return;
      }
      var retryDelays = this.options.retryDelays;
      if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
        this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
        return;
      }
      if (this.options.parallelUploads > 1) {
        for (var _i = 0, _arr = ["uploadUrl", "uploadSize", "uploadLengthDeferred"]; _i < _arr.length; _i++) {
          var optionName = _arr[_i];
          if (this.options[optionName]) {
            this._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
            return;
          }
        }
      }
      if (this.options.parallelUploadBoundaries) {
        if (this.options.parallelUploads <= 1) {
          this._emitError(new Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
          return;
        }
        if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
          this._emitError(new Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
          return;
        }
      }
      this.options.fingerprint(file, this.options).then(function(fingerprint2) {
        if (fingerprint2 == null) {
          log("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
        } else {
          log("Calculated fingerprint: ".concat(fingerprint2));
        }
        _this2._fingerprint = fingerprint2;
        if (_this2._source) {
          return _this2._source;
        }
        return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
      }).then(function(source) {
        _this2._source = source;
        if (_this2.options.uploadLengthDeferred) {
          _this2._size = null;
        } else if (_this2.options.uploadSize != null) {
          _this2._size = Number(_this2.options.uploadSize);
          if (Number.isNaN(_this2._size)) {
            _this2._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
            return;
          }
        } else {
          _this2._size = _this2._source.size;
          if (_this2._size == null) {
            _this2._emitError(new Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
            return;
          }
        }
        if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
          _this2._startParallelUpload();
        } else {
          _this2._startSingleUpload();
        }
      })["catch"](function(err) {
        _this2._emitError(err);
      });
    }
    /**
     * Initiate the uploading procedure for a parallelized upload, where one file is split into
     * multiple request which are run in parallel.
     *
     * @api private
     */
  }, {
    key: "_startParallelUpload",
    value: function _startParallelUpload() {
      var _this$options$paralle, _this3 = this;
      var totalSize = this._size;
      var totalProgress = 0;
      this._parallelUploads = [];
      var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
      var parts = (_this$options$paralle = this.options.parallelUploadBoundaries) !== null && _this$options$paralle !== void 0 ? _this$options$paralle : splitSizeIntoParts(this._source.size, partCount);
      if (this._parallelUploadUrls) {
        parts.forEach(function(part, index) {
          part.uploadUrl = _this3._parallelUploadUrls[index] || null;
        });
      }
      this._parallelUploadUrls = new Array(parts.length);
      var uploads = parts.map(function(part, index) {
        var lastPartProgress = 0;
        return _this3._source.slice(part.start, part.end).then(function(_ref) {
          var value = _ref.value;
          return new Promise(function(resolve, reject) {
            var options = _objectSpread(_objectSpread({}, _this3.options), {}, {
              // If available, the partial upload should be resumed from a previous URL.
              uploadUrl: part.uploadUrl || null,
              // We take manually care of resuming for partial uploads, so they should
              // not be stored in the URL storage.
              storeFingerprintForResuming: false,
              removeFingerprintOnSuccess: false,
              // Reset the parallelUploads option to not cause recursion.
              parallelUploads: 1,
              // Reset this option as we are not doing a parallel upload.
              parallelUploadBoundaries: null,
              metadata: {},
              // Add the header to indicate the this is a partial upload.
              headers: _objectSpread(_objectSpread({}, _this3.options.headers), {}, {
                "Upload-Concat": "partial"
              }),
              // Reject or resolve the promise if the upload errors or completes.
              onSuccess: resolve,
              onError: reject,
              // Based in the progress for this partial upload, calculate the progress
              // for the entire final upload.
              onProgress: function onProgress(newPartProgress) {
                totalProgress = totalProgress - lastPartProgress + newPartProgress;
                lastPartProgress = newPartProgress;
                _this3._emitProgress(totalProgress, totalSize);
              },
              // Wait until every partial upload has an upload URL, so we can add
              // them to the URL storage.
              onUploadUrlAvailable: function onUploadUrlAvailable() {
                _this3._parallelUploadUrls[index] = upload.url;
                if (_this3._parallelUploadUrls.filter(function(u3) {
                  return Boolean(u3);
                }).length === parts.length) {
                  _this3._saveUploadInUrlStorage();
                }
              }
            });
            var upload = new BaseUpload2(value, options);
            upload.start();
            _this3._parallelUploads.push(upload);
          });
        });
      });
      var req;
      Promise.all(uploads).then(function() {
        req = _this3._openRequest("POST", _this3.options.endpoint);
        req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
        var metadata = encodeMetadata(_this3.options.metadata);
        if (metadata !== "") {
          req.setHeader("Upload-Metadata", metadata);
        }
        return _this3._sendRequest(req, null);
      }).then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
          return;
        }
        var location = res.getHeader("Location");
        if (location == null) {
          _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
          return;
        }
        _this3.url = resolveUrl(_this3.options.endpoint, location);
        log("Created upload at ".concat(_this3.url));
        _this3._emitSuccess();
      })["catch"](function(err) {
        _this3._emitError(err);
      });
    }
    /**
     * Initiate the uploading procedure for a non-parallel upload. Here the entire file is
     * uploaded in a sequential matter.
     *
     * @api private
     */
  }, {
    key: "_startSingleUpload",
    value: function _startSingleUpload() {
      this._aborted = false;
      if (this.url != null) {
        log("Resuming upload from previous URL: ".concat(this.url));
        this._resumeUpload();
        return;
      }
      if (this.options.uploadUrl != null) {
        log("Resuming upload from provided URL: ".concat(this.options.uploadUrl));
        this.url = this.options.uploadUrl;
        this._resumeUpload();
        return;
      }
      log("Creating a new upload");
      this._createUpload();
    }
    /**
     * Abort any running request and stop the current upload. After abort is called, no event
     * handler will be invoked anymore. You can use the `start` method to resume the upload
     * again.
     * If `shouldTerminate` is true, the `terminate` function will be called to remove the
     * current upload from the server.
     *
     * @param {boolean} shouldTerminate True if the upload should be deleted from the server.
     * @return {Promise} The Promise will be resolved/rejected when the requests finish.
     */
  }, {
    key: "abort",
    value: function abort(shouldTerminate) {
      var _this4 = this;
      if (this._parallelUploads != null) {
        this._parallelUploads.forEach(function(upload) {
          upload.abort(shouldTerminate);
        });
      }
      if (this._req !== null) {
        this._req.abort();
      }
      this._aborted = true;
      if (this._retryTimeout != null) {
        clearTimeout(this._retryTimeout);
        this._retryTimeout = null;
      }
      if (!shouldTerminate || this.url == null) {
        return Promise.resolve();
      }
      return BaseUpload2.terminate(this.url, this.options).then(function() {
        return _this4._removeFromUrlStorage();
      });
    }
  }, {
    key: "_emitHttpError",
    value: function _emitHttpError(req, res, message, causingErr) {
      this._emitError(new error_default(message, causingErr, req, res));
    }
  }, {
    key: "_emitError",
    value: function _emitError(err) {
      var _this5 = this;
      if (this._aborted)
        return;
      if (this.options.retryDelays != null) {
        var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
        if (shouldResetDelays) {
          this._retryAttempt = 0;
        }
        if (shouldRetry(err, this._retryAttempt, this.options)) {
          var delay = this.options.retryDelays[this._retryAttempt++];
          this._offsetBeforeRetry = this._offset;
          this._retryTimeout = setTimeout(function() {
            _this5.start();
          }, delay);
          return;
        }
      }
      if (typeof this.options.onError === "function") {
        this.options.onError(err);
      } else {
        throw err;
      }
    }
    /**
     * Publishes notification if the upload has been successfully completed.
     *
     * @api private
     */
  }, {
    key: "_emitSuccess",
    value: function _emitSuccess() {
      if (this.options.removeFingerprintOnSuccess) {
        this._removeFromUrlStorage();
      }
      if (typeof this.options.onSuccess === "function") {
        this.options.onSuccess();
      }
    }
    /**
     * Publishes notification when data has been sent to the server. This
     * data may not have been accepted by the server yet.
     *
     * @param {number} bytesSent  Number of bytes sent to the server.
     * @param {number} bytesTotal Total number of bytes to be sent to the server.
     * @api private
     */
  }, {
    key: "_emitProgress",
    value: function _emitProgress(bytesSent, bytesTotal) {
      if (typeof this.options.onProgress === "function") {
        this.options.onProgress(bytesSent, bytesTotal);
      }
    }
    /**
     * Publishes notification when a chunk of data has been sent to the server
     * and accepted by the server.
     * @param {number} chunkSize  Size of the chunk that was accepted by the server.
     * @param {number} bytesAccepted Total number of bytes that have been
     *                                accepted by the server.
     * @param {number} bytesTotal Total number of bytes to be sent to the server.
     * @api private
     */
  }, {
    key: "_emitChunkComplete",
    value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
      if (typeof this.options.onChunkComplete === "function") {
        this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
      }
    }
    /**
     * Create a new upload using the creation extension by sending a POST
     * request to the endpoint. After successful creation the file will be
     * uploaded
     *
     * @api private
     */
  }, {
    key: "_createUpload",
    value: function _createUpload3() {
      var _this6 = this;
      if (!this.options.endpoint) {
        this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
        return;
      }
      var req = this._openRequest("POST", this.options.endpoint);
      if (this.options.uploadLengthDeferred) {
        req.setHeader("Upload-Defer-Length", 1);
      } else {
        req.setHeader("Upload-Length", this._size);
      }
      var metadata = encodeMetadata(this.options.metadata);
      if (metadata !== "") {
        req.setHeader("Upload-Metadata", metadata);
      }
      var promise;
      if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
        this._offset = 0;
        promise = this._addChunkToRequest(req);
      } else {
        promise = this._sendRequest(req, null);
      }
      promise.then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
          return;
        }
        var location = res.getHeader("Location");
        if (location == null) {
          _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
          return;
        }
        _this6.url = resolveUrl(_this6.options.endpoint, location);
        log("Created upload at ".concat(_this6.url));
        if (typeof _this6.options.onUploadUrlAvailable === "function") {
          _this6.options.onUploadUrlAvailable();
        }
        if (_this6._size === 0) {
          _this6._emitSuccess();
          _this6._source.close();
          return;
        }
        _this6._saveUploadInUrlStorage().then(function() {
          if (_this6.options.uploadDataDuringCreation) {
            _this6._handleUploadResponse(req, res);
          } else {
            _this6._offset = 0;
            _this6._performUpload();
          }
        });
      })["catch"](function(err) {
        _this6._emitHttpError(req, null, "tus: failed to create upload", err);
      });
    }
    /*
     * Try to resume an existing upload. First a HEAD request will be sent
     * to retrieve the offset. If the request fails a new upload will be
     * created. In the case of a successful response the file will be uploaded.
     *
     * @api private
     */
  }, {
    key: "_resumeUpload",
    value: function _resumeUpload() {
      var _this7 = this;
      var req = this._openRequest("HEAD", this.url);
      var promise = this._sendRequest(req, null);
      promise.then(function(res) {
        var status = res.getStatus();
        if (!inStatusCategory(status, 200)) {
          if (status === 423) {
            _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
            return;
          }
          if (inStatusCategory(status, 400)) {
            _this7._removeFromUrlStorage();
          }
          if (!_this7.options.endpoint) {
            _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
            return;
          }
          _this7.url = null;
          _this7._createUpload();
          return;
        }
        var offset = parseInt(res.getHeader("Upload-Offset"), 10);
        if (Number.isNaN(offset)) {
          _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
          return;
        }
        var length = parseInt(res.getHeader("Upload-Length"), 10);
        if (Number.isNaN(length) && !_this7.options.uploadLengthDeferred) {
          _this7._emitHttpError(req, res, "tus: invalid or missing length value");
          return;
        }
        if (typeof _this7.options.onUploadUrlAvailable === "function") {
          _this7.options.onUploadUrlAvailable();
        }
        _this7._saveUploadInUrlStorage().then(function() {
          if (offset === length) {
            _this7._emitProgress(length, length);
            _this7._emitSuccess();
            return;
          }
          _this7._offset = offset;
          _this7._performUpload();
        });
      })["catch"](function(err) {
        _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
      });
    }
    /**
     * Start uploading the file using PATCH requests. The file will be divided
     * into chunks as specified in the chunkSize option. During the upload
     * the onProgress event handler may be invoked multiple times.
     *
     * @api private
     */
  }, {
    key: "_performUpload",
    value: function _performUpload() {
      var _this8 = this;
      if (this._aborted) {
        return;
      }
      var req;
      if (this.options.overridePatchMethod) {
        req = this._openRequest("POST", this.url);
        req.setHeader("X-HTTP-Method-Override", "PATCH");
      } else {
        req = this._openRequest("PATCH", this.url);
      }
      req.setHeader("Upload-Offset", this._offset);
      var promise = this._addChunkToRequest(req);
      promise.then(function(res) {
        if (!inStatusCategory(res.getStatus(), 200)) {
          _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
          return;
        }
        _this8._handleUploadResponse(req, res);
      })["catch"](function(err) {
        if (_this8._aborted) {
          return;
        }
        _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
      });
    }
    /**
     * _addChunktoRequest reads a chunk from the source and sends it using the
     * supplied request object. It will not handle the response.
     *
     * @api private
     */
  }, {
    key: "_addChunkToRequest",
    value: function _addChunkToRequest(req) {
      var _this9 = this;
      var start = this._offset;
      var end = this._offset + this.options.chunkSize;
      req.setProgressHandler(function(bytesSent) {
        _this9._emitProgress(start + bytesSent, _this9._size);
      });
      req.setHeader("Content-Type", "application/offset+octet-stream");
      if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
        end = this._size;
      }
      return this._source.slice(start, end).then(function(_ref2) {
        var value = _ref2.value, done = _ref2.done;
        if (_this9.options.uploadLengthDeferred && done) {
          _this9._size = _this9._offset + (value && value.size ? value.size : 0);
          req.setHeader("Upload-Length", _this9._size);
        }
        if (value === null) {
          return _this9._sendRequest(req);
        }
        _this9._emitProgress(_this9._offset, _this9._size);
        return _this9._sendRequest(req, value);
      });
    }
    /**
     * _handleUploadResponse is used by requests that haven been sent using _addChunkToRequest
     * and already have received a response.
     *
     * @api private
     */
  }, {
    key: "_handleUploadResponse",
    value: function _handleUploadResponse(req, res) {
      var offset = parseInt(res.getHeader("Upload-Offset"), 10);
      if (Number.isNaN(offset)) {
        this._emitHttpError(req, res, "tus: invalid or missing offset value");
        return;
      }
      this._emitProgress(offset, this._size);
      this._emitChunkComplete(offset - this._offset, offset, this._size);
      this._offset = offset;
      if (offset === this._size) {
        this._emitSuccess();
        this._source.close();
        return;
      }
      this._performUpload();
    }
    /**
     * Create a new HTTP request object with the given method and URL.
     *
     * @api private
     */
  }, {
    key: "_openRequest",
    value: function _openRequest(method, url) {
      var req = openRequest(method, url, this.options);
      this._req = req;
      return req;
    }
    /**
     * Remove the entry in the URL storage, if it has been saved before.
     *
     * @api private
     */
  }, {
    key: "_removeFromUrlStorage",
    value: function _removeFromUrlStorage() {
      var _this10 = this;
      if (!this._urlStorageKey)
        return;
      this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
        _this10._emitError(err);
      });
      this._urlStorageKey = null;
    }
    /**
     * Add the upload URL to the URL storage, if possible.
     *
     * @api private
     */
  }, {
    key: "_saveUploadInUrlStorage",
    value: function _saveUploadInUrlStorage() {
      var _this11 = this;
      if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) {
        return Promise.resolve();
      }
      var storedUpload = {
        size: this._size,
        metadata: this.options.metadata,
        creationTime: (/* @__PURE__ */ new Date()).toString()
      };
      if (this._parallelUploads) {
        storedUpload.parallelUploadUrls = this._parallelUploadUrls;
      } else {
        storedUpload.uploadUrl = this.url;
      }
      return this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
        _this11._urlStorageKey = urlStorageKey;
      });
    }
    /**
     * Send a request with the provided body.
     *
     * @api private
     */
  }, {
    key: "_sendRequest",
    value: function _sendRequest(req) {
      var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      return sendRequest(req, body, this.options);
    }
  }], [{
    key: "terminate",
    value: function terminate(url) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var req = openRequest("DELETE", url, options);
      return sendRequest(req, null, options).then(function(res) {
        if (res.getStatus() === 204) {
          return;
        }
        throw new error_default("tus: unexpected response while terminating upload", null, req, res);
      })["catch"](function(err) {
        if (!(err instanceof error_default)) {
          err = new error_default("tus: failed to terminate upload", err, req, null);
        }
        if (!shouldRetry(err, 0, options)) {
          throw err;
        }
        var delay = options.retryDelays[0];
        var remainingDelays = options.retryDelays.slice(1);
        var newOptions = _objectSpread(_objectSpread({}, options), {}, {
          retryDelays: remainingDelays
        });
        return new Promise(function(resolve) {
          return setTimeout(resolve, delay);
        }).then(function() {
          return BaseUpload2.terminate(url, newOptions);
        });
      });
    }
  }]);
  return BaseUpload2;
}();
function encodeMetadata(metadata) {
  return Object.entries(metadata).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
    return "".concat(key, " ").concat(gBase64.encode(String(value)));
  }).join(",");
}
function inStatusCategory(status, category) {
  return status >= category && status < category + 100;
}
function openRequest(method, url, options) {
  var req = options.httpStack.createRequest(method, url);
  req.setHeader("Tus-Resumable", "1.0.0");
  var headers = options.headers || {};
  Object.entries(headers).forEach(function(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2), name = _ref6[0], value = _ref6[1];
    req.setHeader(name, value);
  });
  if (options.addRequestId) {
    var requestId = uuid();
    req.setHeader("X-Request-ID", requestId);
  }
  return req;
}
function sendRequest(req, body, options) {
  var onBeforeRequestPromise = typeof options.onBeforeRequest === "function" ? Promise.resolve(options.onBeforeRequest(req)) : Promise.resolve();
  return onBeforeRequestPromise.then(function() {
    return req.send(body).then(function(res) {
      var onAfterResponsePromise = typeof options.onAfterResponse === "function" ? Promise.resolve(options.onAfterResponse(req, res)) : Promise.resolve();
      return onAfterResponsePromise.then(function() {
        return res;
      });
    });
  });
}
function isOnline() {
  var online = true;
  if (typeof window !== "undefined" && "navigator" in window && window.navigator.onLine === false) {
    online = false;
  }
  return online;
}
function shouldRetry(err, retryAttempt, options) {
  if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
    return false;
  }
  if (options && typeof options.onShouldRetry === "function") {
    return options.onShouldRetry(err, retryAttempt, options);
  }
  var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
  return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
}
function resolveUrl(origin, link) {
  return new import_url_parse.default(link, origin).toString();
}
function splitSizeIntoParts(totalSize, partCount) {
  var partSize = Math.floor(totalSize / partCount);
  var parts = [];
  for (var i3 = 0; i3 < partCount; i3++) {
    parts.push({
      start: partSize * i3,
      end: partSize * (i3 + 1)
    });
  }
  parts[partCount - 1].end = totalSize;
  return parts;
}
BaseUpload.defaultOptions = defaultOptions2;
var upload_default = BaseUpload;

// node_modules/tus-js-client/lib.esm/noopUrlStorage.js
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var NoopUrlStorage = /* @__PURE__ */ function() {
  function NoopUrlStorage2() {
    _classCallCheck3(this, NoopUrlStorage2);
  }
  _createClass3(NoopUrlStorage2, [{
    key: "listAllUploads",
    value: function listAllUploads() {
      return Promise.resolve([]);
    }
  }, {
    key: "findUploadsByFingerprint",
    value: function findUploadsByFingerprint(fingerprint2) {
      return Promise.resolve([]);
    }
  }, {
    key: "removeUpload",
    value: function removeUpload(urlStorageKey) {
      return Promise.resolve();
    }
  }, {
    key: "addUpload",
    value: function addUpload(fingerprint2, upload) {
      return Promise.resolve(null);
    }
  }]);
  return NoopUrlStorage2;
}();

// node_modules/tus-js-client/lib.esm/browser/urlStorage.js
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties4(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties4(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var hasStorage = false;
try {
  hasStorage = "localStorage" in window;
  key = "tusSupport";
  originalValue = localStorage.getItem(key);
  localStorage.setItem(key, originalValue);
  if (originalValue === null)
    localStorage.removeItem(key);
} catch (e3) {
  if (e3.code === e3.SECURITY_ERR || e3.code === e3.QUOTA_EXCEEDED_ERR) {
    hasStorage = false;
  } else {
    throw e3;
  }
}
var key;
var originalValue;
var canStoreURLs = hasStorage;
var WebStorageUrlStorage = /* @__PURE__ */ function() {
  function WebStorageUrlStorage2() {
    _classCallCheck4(this, WebStorageUrlStorage2);
  }
  _createClass4(WebStorageUrlStorage2, [{
    key: "findAllUploads",
    value: function findAllUploads() {
      var results = this._findEntries("tus::");
      return Promise.resolve(results);
    }
  }, {
    key: "findUploadsByFingerprint",
    value: function findUploadsByFingerprint(fingerprint2) {
      var results = this._findEntries("tus::".concat(fingerprint2, "::"));
      return Promise.resolve(results);
    }
  }, {
    key: "removeUpload",
    value: function removeUpload(urlStorageKey) {
      localStorage.removeItem(urlStorageKey);
      return Promise.resolve();
    }
  }, {
    key: "addUpload",
    value: function addUpload(fingerprint2, upload) {
      var id11 = Math.round(Math.random() * 1e12);
      var key = "tus::".concat(fingerprint2, "::").concat(id11);
      localStorage.setItem(key, JSON.stringify(upload));
      return Promise.resolve(key);
    }
  }, {
    key: "_findEntries",
    value: function _findEntries(prefix) {
      var results = [];
      for (var i3 = 0; i3 < localStorage.length; i3++) {
        var _key = localStorage.key(i3);
        if (_key.indexOf(prefix) !== 0)
          continue;
        try {
          var upload = JSON.parse(localStorage.getItem(_key));
          upload.urlStorageKey = _key;
          results.push(upload);
        } catch (e3) {
        }
      }
      return results;
    }
  }]);
  return WebStorageUrlStorage2;
}();

// node_modules/tus-js-client/lib.esm/browser/httpStack.js
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties5(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties5(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var XHRHttpStack = /* @__PURE__ */ function() {
  function XHRHttpStack2() {
    _classCallCheck5(this, XHRHttpStack2);
  }
  _createClass5(XHRHttpStack2, [{
    key: "createRequest",
    value: function createRequest(method, url) {
      return new Request(method, url);
    }
  }, {
    key: "getName",
    value: function getName2() {
      return "XHRHttpStack";
    }
  }]);
  return XHRHttpStack2;
}();
var Request = /* @__PURE__ */ function() {
  function Request2(method, url) {
    _classCallCheck5(this, Request2);
    this._xhr = new XMLHttpRequest();
    this._xhr.open(method, url, true);
    this._method = method;
    this._url = url;
    this._headers = {};
  }
  _createClass5(Request2, [{
    key: "getMethod",
    value: function getMethod() {
      return this._method;
    }
  }, {
    key: "getURL",
    value: function getURL() {
      return this._url;
    }
  }, {
    key: "setHeader",
    value: function setHeader(header, value) {
      this._xhr.setRequestHeader(header, value);
      this._headers[header] = value;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._headers[header];
    }
  }, {
    key: "setProgressHandler",
    value: function setProgressHandler(progressHandler) {
      if (!("upload" in this._xhr)) {
        return;
      }
      this._xhr.upload.onprogress = function(e3) {
        if (!e3.lengthComputable) {
          return;
        }
        progressHandler(e3.loaded);
      };
    }
  }, {
    key: "send",
    value: function send() {
      var _this = this;
      var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      return new Promise(function(resolve, reject) {
        _this._xhr.onload = function() {
          resolve(new Response(_this._xhr));
        };
        _this._xhr.onerror = function(err) {
          reject(err);
        };
        _this._xhr.send(body);
      });
    }
  }, {
    key: "abort",
    value: function abort() {
      this._xhr.abort();
      return Promise.resolve();
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._xhr;
    }
  }]);
  return Request2;
}();
var Response = /* @__PURE__ */ function() {
  function Response2(xhr) {
    _classCallCheck5(this, Response2);
    this._xhr = xhr;
  }
  _createClass5(Response2, [{
    key: "getStatus",
    value: function getStatus() {
      return this._xhr.status;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._xhr.getResponseHeader(header);
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this._xhr.responseText;
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._xhr;
    }
  }]);
  return Response2;
}();

// node_modules/tus-js-client/lib.esm/browser/isReactNative.js
var isReactNative = function isReactNative2() {
  return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
};
var isReactNative_default = isReactNative;

// node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
function uriToBlob(uri) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function() {
      var blob = xhr.response;
      resolve(blob);
    };
    xhr.onerror = function(err) {
      reject(err);
    };
    xhr.open("GET", uri);
    xhr.send();
  });
}

// node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
var isCordova = function isCordova2() {
  return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
};
var isCordova_default = isCordova;

// node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
function readAsByteArray(chunk) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      var value = new Uint8Array(reader.result);
      resolve({
        value
      });
    };
    reader.onerror = function(err) {
      reject(err);
    };
    reader.readAsArrayBuffer(chunk);
  });
}

// node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties6(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties6(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties6(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var FileSource = /* @__PURE__ */ function() {
  function FileSource2(file) {
    _classCallCheck6(this, FileSource2);
    this._file = file;
    this.size = file.size;
  }
  _createClass6(FileSource2, [{
    key: "slice",
    value: function slice(start, end) {
      if (isCordova_default()) {
        return readAsByteArray(this._file.slice(start, end));
      }
      var value = this._file.slice(start, end);
      return Promise.resolve({
        value
      });
    }
  }, {
    key: "close",
    value: function close() {
    }
  }]);
  return FileSource2;
}();

// node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties7(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties7(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties7(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function len(blobOrArray) {
  if (blobOrArray === void 0)
    return 0;
  if (blobOrArray.size !== void 0)
    return blobOrArray.size;
  return blobOrArray.length;
}
function concat(a3, b3) {
  if (a3.concat) {
    return a3.concat(b3);
  }
  if (a3 instanceof Blob) {
    return new Blob([a3, b3], {
      type: a3.type
    });
  }
  if (a3.set) {
    var c3 = new a3.constructor(a3.length + b3.length);
    c3.set(a3);
    c3.set(b3, a3.length);
    return c3;
  }
  throw new Error("Unknown data type");
}
var StreamSource = /* @__PURE__ */ function() {
  function StreamSource2(reader) {
    _classCallCheck7(this, StreamSource2);
    this._buffer = void 0;
    this._bufferOffset = 0;
    this._reader = reader;
    this._done = false;
  }
  _createClass7(StreamSource2, [{
    key: "slice",
    value: function slice(start, end) {
      if (start < this._bufferOffset) {
        return Promise.reject(new Error("Requested data is before the reader's current offset"));
      }
      return this._readUntilEnoughDataOrDone(start, end);
    }
  }, {
    key: "_readUntilEnoughDataOrDone",
    value: function _readUntilEnoughDataOrDone(start, end) {
      var _this = this;
      var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
      if (this._done || hasEnoughData) {
        var value = this._getDataFromBuffer(start, end);
        var done = value == null ? this._done : false;
        return Promise.resolve({
          value,
          done
        });
      }
      return this._reader.read().then(function(_ref) {
        var value2 = _ref.value, done2 = _ref.done;
        if (done2) {
          _this._done = true;
        } else if (_this._buffer === void 0) {
          _this._buffer = value2;
        } else {
          _this._buffer = concat(_this._buffer, value2);
        }
        return _this._readUntilEnoughDataOrDone(start, end);
      });
    }
  }, {
    key: "_getDataFromBuffer",
    value: function _getDataFromBuffer(start, end) {
      if (start > this._bufferOffset) {
        this._buffer = this._buffer.slice(start - this._bufferOffset);
        this._bufferOffset = start;
      }
      var hasAllDataBeenRead = len(this._buffer) === 0;
      if (this._done && hasAllDataBeenRead) {
        return null;
      }
      return this._buffer.slice(0, end - start);
    }
  }, {
    key: "close",
    value: function close() {
      if (this._reader.cancel) {
        this._reader.cancel();
      }
    }
  }]);
  return StreamSource2;
}();

// node_modules/tus-js-client/lib.esm/browser/fileReader.js
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties8(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties8(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties8(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var FileReader2 = /* @__PURE__ */ function() {
  function FileReader3() {
    _classCallCheck8(this, FileReader3);
  }
  _createClass8(FileReader3, [{
    key: "openFile",
    value: function openFile(input, chunkSize) {
      if (isReactNative_default() && input && typeof input.uri !== "undefined") {
        return uriToBlob(input.uri).then(function(blob) {
          return new FileSource(blob);
        })["catch"](function(err) {
          throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(err));
        });
      }
      if (typeof input.slice === "function" && typeof input.size !== "undefined") {
        return Promise.resolve(new FileSource(input));
      }
      if (typeof input.read === "function") {
        chunkSize = Number(chunkSize);
        if (!Number.isFinite(chunkSize)) {
          return Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"));
        }
        return Promise.resolve(new StreamSource(input, chunkSize));
      }
      return Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
    }
  }]);
  return FileReader3;
}();

// node_modules/tus-js-client/lib.esm/browser/fileSignature.js
function fingerprint(file, options) {
  if (isReactNative_default()) {
    return Promise.resolve(reactNativeFingerprint(file, options));
  }
  return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
}
function reactNativeFingerprint(file, options) {
  var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
  return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
}
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i3 = 0; i3 < str.length; i3++) {
    var _char = str.charCodeAt(i3);
    hash = (hash << 5) - hash + _char;
    hash &= hash;
  }
  return hash;
}

// node_modules/tus-js-client/lib.esm/browser/index.js
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties9(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties9(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties9(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf2(subClass, superClass);
}
function _setPrototypeOf2(o3, p3) {
  _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o4, p4) {
    o4.__proto__ = p4;
    return o4;
  };
  return _setPrototypeOf2(o3, p3);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self2, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized2(self2);
}
function _assertThisInitialized2(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _isNativeReflectConstruct2() {
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
  } catch (e3) {
    return false;
  }
}
function _getPrototypeOf2(o3) {
  _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o4) {
    return o4.__proto__ || Object.getPrototypeOf(o4);
  };
  return _getPrototypeOf2(o3);
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var defaultOptions3 = _objectSpread2(_objectSpread2({}, upload_default.defaultOptions), {}, {
  httpStack: new XHRHttpStack(),
  fileReader: new FileReader2(),
  urlStorage: canStoreURLs ? new WebStorageUrlStorage() : new NoopUrlStorage(),
  fingerprint
});
var Upload = /* @__PURE__ */ function(_BaseUpload) {
  _inherits2(Upload2, _BaseUpload);
  var _super = _createSuper2(Upload2);
  function Upload2() {
    var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck9(this, Upload2);
    options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
    return _super.call(this, file, options);
  }
  _createClass9(Upload2, null, [{
    key: "terminate",
    value: function terminate(url) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      options = _objectSpread2(_objectSpread2({}, defaultOptions3), options);
      return upload_default.terminate(url, options);
    }
  }]);
  return Upload2;
}(upload_default);
var _window = window;
var XMLHttpRequest2 = _window.XMLHttpRequest;
var Blob2 = _window.Blob;
var isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";

// node_modules/@uppy/utils/lib/NetworkError.js
var NetworkError = class extends Error {
  constructor(error, xhr) {
    if (xhr === void 0) {
      xhr = null;
    }
    super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
    this.cause = error;
    this.isNetworkError = true;
    this.request = xhr;
  }
};
var NetworkError_default = NetworkError;

// node_modules/@uppy/utils/lib/fetchWithNetworkError.js
function fetchWithNetworkError() {
  return fetch(...arguments).catch((err) => {
    if (err.name === "AbortError") {
      throw err;
    } else {
      throw new NetworkError_default(err);
    }
  });
}

// node_modules/@uppy/utils/lib/ErrorWithCause.js
var ErrorWithCause = class extends Error {
  constructor(message, options) {
    if (options === void 0) {
      options = {};
    }
    super(message);
    this.cause = options.cause;
    if (this.cause && has(this.cause, "isNetworkError")) {
      this.isNetworkError = this.cause.isNetworkError;
    }
  }
};
var ErrorWithCause_default = ErrorWithCause;

// node_modules/@uppy/companion-client/lib/AuthError.js
var AuthError = class extends Error {
  constructor() {
    super("Authorization required");
    this.name = "AuthError";
    this.isAuthError = true;
  }
};
var AuthError_default = AuthError;

// node_modules/@uppy/companion-client/lib/RequestClient.js
var _Symbol$for4;
function _classPrivateFieldLooseBase6(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id6 = 0;
function _classPrivateFieldLooseKey6(name) {
  return "__private_" + id6++ + "_" + name;
}
var packageJson7 = {
  "version": "3.1.1"
};
function stripSlash(url) {
  return url.replace(/\/$/, "");
}
async function handleJSONResponse(res) {
  if (res.status === 401) {
    throw new AuthError_default();
  }
  const jsonPromise = res.json();
  if (res.ok) {
    return jsonPromise;
  }
  let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
  try {
    const errData = await jsonPromise;
    errMsg = errData.message ? `${errMsg} message: ${errData.message}` : errMsg;
    errMsg = errData.requestId ? `${errMsg} request-Id: ${errData.requestId}` : errMsg;
  } catch {
  }
  throw new Error(errMsg);
}
var allowedHeadersCache = /* @__PURE__ */ new Map();
var _companionHeaders = /* @__PURE__ */ _classPrivateFieldLooseKey6("companionHeaders");
var _getUrl = /* @__PURE__ */ _classPrivateFieldLooseKey6("getUrl");
var _request = /* @__PURE__ */ _classPrivateFieldLooseKey6("request");
_Symbol$for4 = Symbol.for("uppy test: getCompanionHeaders");
var RequestClient = class {
  constructor(uppy, opts) {
    Object.defineProperty(this, _request, {
      value: _request2
    });
    Object.defineProperty(this, _getUrl, {
      value: _getUrl2
    });
    Object.defineProperty(this, _companionHeaders, {
      writable: true,
      value: void 0
    });
    this.uppy = uppy;
    this.opts = opts;
    this.onReceiveResponse = this.onReceiveResponse.bind(this);
    _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders] = opts == null ? void 0 : opts.companionHeaders;
  }
  setCompanionHeaders(headers) {
    _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders] = headers;
  }
  [_Symbol$for4]() {
    return _classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders];
  }
  get hostname() {
    const {
      companion
    } = this.uppy.getState();
    const host = this.opts.companionUrl;
    return stripSlash(companion && companion[host] ? companion[host] : host);
  }
  async headers() {
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Uppy-Versions": `@uppy/companion-client=${RequestClient.VERSION}`
    };
    return {
      ...defaultHeaders,
      ..._classPrivateFieldLooseBase6(this, _companionHeaders)[_companionHeaders]
    };
  }
  onReceiveResponse(_ref) {
    let {
      headers
    } = _ref;
    const state = this.uppy.getState();
    const companion = state.companion || {};
    const host = this.opts.companionUrl;
    if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
      this.uppy.setState({
        companion: {
          ...companion,
          [host]: headers.get("i-am")
        }
      });
    }
  }
  /*
    Preflight was added to avoid breaking change between older Companion-client versions and
    newer Companion versions and vice-versa. Usually the break will manifest via CORS errors because a
    version of companion-client could be sending certain headers to a version of Companion server that
    does not support those headers. In which case, the default preflight would lead to CORS.
    So to avoid those errors, we do preflight ourselves, to see what headers the Companion server
    we are communicating with allows. And based on that, companion-client knows what headers to
    send and what headers to not send.
     The preflight only happens once throughout the life-cycle of a certain
    Companion-client <-> Companion-server pair (allowedHeadersCache).
    Subsequent requests use the cached result of the preflight.
    However if there is an error retrieving the allowed headers, we will try again next time
  */
  async preflight(path) {
    const allowedHeadersCached = allowedHeadersCache.get(this.hostname);
    if (allowedHeadersCached != null)
      return allowedHeadersCached;
    const fallbackAllowedHeaders = ["accept", "content-type", "uppy-auth-token"];
    const promise = (async () => {
      try {
        const response = await fetch(_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path), {
          method: "OPTIONS"
        });
        const header = response.headers.get("access-control-allow-headers");
        if (header == null || header === "*") {
          allowedHeadersCache.set(this.hostname, fallbackAllowedHeaders);
          return fallbackAllowedHeaders;
        }
        this.uppy.log(`[CompanionClient] adding allowed preflight headers to companion cache: ${this.hostname} ${header}`);
        const allowedHeaders = header.split(",").map((headerName) => headerName.trim().toLowerCase());
        allowedHeadersCache.set(this.hostname, allowedHeaders);
        return allowedHeaders;
      } catch (err) {
        this.uppy.log(`[CompanionClient] unable to make preflight request ${err}`, "warning");
        allowedHeadersCache.delete(this.hostname);
        return fallbackAllowedHeaders;
      }
    })();
    allowedHeadersCache.set(this.hostname, promise);
    return promise;
  }
  async preflightAndHeaders(path) {
    const [allowedHeaders, headers] = await Promise.all([this.preflight(path), this.headers()]);
    return Object.fromEntries(Object.entries(headers).filter((_ref2) => {
      let [header] = _ref2;
      if (!allowedHeaders.includes(header.toLowerCase())) {
        this.uppy.log(`[CompanionClient] excluding disallowed header ${header}`);
        return false;
      }
      return true;
    }));
  }
  async get(path, options) {
    if (options === void 0) {
      options = void 0;
    }
    if (typeof options === "boolean")
      options = {
        skipPostResponse: options
      };
    return _classPrivateFieldLooseBase6(this, _request)[_request]({
      ...options,
      path
    });
  }
  async post(path, data, options) {
    if (options === void 0) {
      options = void 0;
    }
    if (typeof options === "boolean")
      options = {
        skipPostResponse: options
      };
    return _classPrivateFieldLooseBase6(this, _request)[_request]({
      ...options,
      path,
      method: "POST",
      data
    });
  }
  async delete(path, data, options) {
    if (data === void 0) {
      data = void 0;
    }
    if (typeof options === "boolean")
      options = {
        skipPostResponse: options
      };
    return _classPrivateFieldLooseBase6(this, _request)[_request]({
      ...options,
      path,
      method: "DELETE",
      data
    });
  }
};
function _getUrl2(url) {
  if (/^(https?:|)\/\//.test(url)) {
    return url;
  }
  return `${this.hostname}/${url}`;
}
async function _request2(_ref3) {
  let {
    path,
    method = "GET",
    data,
    skipPostResponse,
    signal
  } = _ref3;
  try {
    const headers = await this.preflightAndHeaders(path);
    const response = await fetchWithNetworkError(_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path), {
      method,
      signal,
      headers,
      credentials: this.opts.companionCookiesRule || "same-origin",
      body: data ? JSON.stringify(data) : null
    });
    if (!skipPostResponse)
      this.onReceiveResponse(response);
    return handleJSONResponse(response);
  } catch (err) {
    if (err != null && err.isAuthError)
      throw err;
    throw new ErrorWithCause_default(`Could not ${method} ${_classPrivateFieldLooseBase6(this, _getUrl)[_getUrl](path)}`, {
      cause: err
    });
  }
}
RequestClient.VERSION = packageJson7.version;

// node_modules/@uppy/companion-client/lib/tokenStorage.js
var tokenStorage_exports = {};
__export(tokenStorage_exports, {
  getItem: () => getItem,
  removeItem: () => removeItem,
  setItem: () => setItem
});
function setItem(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
}
function getItem(key) {
  return Promise.resolve(localStorage.getItem(key));
}
function removeItem(key) {
  return new Promise((resolve) => {
    localStorage.removeItem(key);
    resolve();
  });
}

// node_modules/@uppy/companion-client/lib/Provider.js
var getName = (id11) => {
  return id11.split("-").map((s3) => s3.charAt(0).toUpperCase() + s3.slice(1)).join(" ");
};
var Provider = class extends RequestClient {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.provider = opts.provider;
    this.id = this.provider;
    this.name = this.opts.name || getName(this.id);
    this.pluginId = this.opts.pluginId;
    this.tokenKey = `companion-${this.pluginId}-auth-token`;
    this.companionKeysParams = this.opts.companionKeysParams;
    this.preAuthToken = null;
  }
  async headers() {
    const [headers, token] = await Promise.all([super.headers(), this.getAuthToken()]);
    const authHeaders = {};
    if (token) {
      authHeaders["uppy-auth-token"] = token;
    }
    if (this.companionKeysParams) {
      authHeaders["uppy-credentials-params"] = btoa(JSON.stringify({
        params: this.companionKeysParams
      }));
    }
    return {
      ...headers,
      ...authHeaders
    };
  }
  onReceiveResponse(response) {
    super.onReceiveResponse(response);
    const plugin = this.uppy.getPlugin(this.pluginId);
    const oldAuthenticated = plugin.getPluginState().authenticated;
    const authenticated = oldAuthenticated ? response.status !== 401 : response.status < 400;
    plugin.setPluginState({
      authenticated
    });
    return response;
  }
  setAuthToken(token) {
    return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, token);
  }
  getAuthToken() {
    return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey);
  }
  /**
   * Ensure we have a preauth token if necessary. Attempts to fetch one if we don't,
   * or rejects if loading one fails.
   */
  async ensurePreAuth() {
    if (this.companionKeysParams && !this.preAuthToken) {
      await this.fetchPreAuthToken();
      if (!this.preAuthToken) {
        throw new Error("Could not load authentication data required for third-party login. Please try again later.");
      }
    }
  }
  authUrl(queries) {
    if (queries === void 0) {
      queries = {};
    }
    const params = new URLSearchParams(queries);
    if (this.preAuthToken) {
      params.set("uppyPreAuthToken", this.preAuthToken);
    }
    return `${this.hostname}/${this.id}/connect?${params}`;
  }
  fileUrl(id11) {
    return `${this.hostname}/${this.id}/get/${id11}`;
  }
  async fetchPreAuthToken() {
    if (!this.companionKeysParams) {
      return;
    }
    try {
      const res = await this.post(`${this.id}/preauth/`, {
        params: this.companionKeysParams
      });
      this.preAuthToken = res.token;
    } catch (err) {
      this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${err}`, "warning");
    }
  }
  list(directory) {
    return this.get(`${this.id}/list/${directory || ""}`);
  }
  logout() {
    return this.get(`${this.id}/logout`).then((response) => Promise.all([response, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)])).then((_ref) => {
      let [response] = _ref;
      return response;
    });
  }
  static initPlugin(plugin, opts, defaultOpts) {
    plugin.type = "acquirer";
    plugin.files = [];
    if (defaultOpts) {
      plugin.opts = {
        ...defaultOpts,
        ...opts
      };
    }
    if (opts.serverUrl || opts.serverPattern) {
      throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
    }
    if (opts.companionAllowedHosts) {
      const pattern = opts.companionAllowedHosts;
      if (typeof pattern !== "string" && !Array.isArray(pattern) && !(pattern instanceof RegExp)) {
        throw new TypeError(`${plugin.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
      }
      plugin.opts.companionAllowedHosts = pattern;
    } else if (/^(?!https?:\/\/).*$/i.test(opts.companionUrl)) {
      plugin.opts.companionAllowedHosts = `https://${opts.companionUrl.replace(/^\/\//, "")}`;
    } else {
      plugin.opts.companionAllowedHosts = new URL(opts.companionUrl).origin;
    }
    plugin.storage = plugin.opts.storage || tokenStorage_exports;
  }
};

// node_modules/@uppy/companion-client/lib/Socket.js
var import_namespace_emitter2 = __toESM(require_namespace_emitter(), 1);
var _Symbol$for5;
var _Symbol$for22;
function _classPrivateFieldLooseBase7(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id7 = 0;
function _classPrivateFieldLooseKey7(name) {
  return "__private_" + id7++ + "_" + name;
}
var _queued = /* @__PURE__ */ _classPrivateFieldLooseKey7("queued");
var _emitter2 = /* @__PURE__ */ _classPrivateFieldLooseKey7("emitter");
var _isOpen = /* @__PURE__ */ _classPrivateFieldLooseKey7("isOpen");
var _socket = /* @__PURE__ */ _classPrivateFieldLooseKey7("socket");
var _handleMessage = /* @__PURE__ */ _classPrivateFieldLooseKey7("handleMessage");
_Symbol$for5 = Symbol.for("uppy test: getSocket");
_Symbol$for22 = Symbol.for("uppy test: getQueued");
var UppySocket = class {
  constructor(opts) {
    Object.defineProperty(this, _queued, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _emitter2, {
      writable: true,
      value: (0, import_namespace_emitter2.default)()
    });
    Object.defineProperty(this, _isOpen, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _socket, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _handleMessage, {
      writable: true,
      value: (e3) => {
        try {
          const message = JSON.parse(e3.data);
          this.emit(message.action, message.payload);
        } catch (err) {
          console.log(err);
        }
      }
    });
    this.opts = opts;
    if (!opts || opts.autoOpen !== false) {
      this.open();
    }
  }
  get isOpen() {
    return _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen];
  }
  [_Symbol$for5]() {
    return _classPrivateFieldLooseBase7(this, _socket)[_socket];
  }
  [_Symbol$for22]() {
    return _classPrivateFieldLooseBase7(this, _queued)[_queued];
  }
  open() {
    _classPrivateFieldLooseBase7(this, _socket)[_socket] = new WebSocket(this.opts.target);
    _classPrivateFieldLooseBase7(this, _socket)[_socket].onopen = () => {
      _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen] = true;
      while (_classPrivateFieldLooseBase7(this, _queued)[_queued].length > 0 && _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen]) {
        const first = _classPrivateFieldLooseBase7(this, _queued)[_queued].shift();
        this.send(first.action, first.payload);
      }
    };
    _classPrivateFieldLooseBase7(this, _socket)[_socket].onclose = () => {
      _classPrivateFieldLooseBase7(this, _isOpen)[_isOpen] = false;
    };
    _classPrivateFieldLooseBase7(this, _socket)[_socket].onmessage = _classPrivateFieldLooseBase7(this, _handleMessage)[_handleMessage];
  }
  close() {
    var _classPrivateFieldLoo;
    (_classPrivateFieldLoo = _classPrivateFieldLooseBase7(this, _socket)[_socket]) == null ? void 0 : _classPrivateFieldLoo.close();
  }
  send(action, payload) {
    if (!_classPrivateFieldLooseBase7(this, _isOpen)[_isOpen]) {
      _classPrivateFieldLooseBase7(this, _queued)[_queued].push({
        action,
        payload
      });
      return;
    }
    _classPrivateFieldLooseBase7(this, _socket)[_socket].send(JSON.stringify({
      action,
      payload
    }));
  }
  on(action, handler) {
    _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].on(action, handler);
  }
  emit(action, payload) {
    _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].emit(action, payload);
  }
  once(action, handler) {
    _classPrivateFieldLooseBase7(this, _emitter2)[_emitter2].once(action, handler);
  }
};

// node_modules/@uppy/utils/lib/emitSocketProgress.js
var import_lodash4 = __toESM(require_lodash(), 1);
function emitSocketProgress(uploader, progressData, file) {
  const {
    progress,
    bytesUploaded,
    bytesTotal
  } = progressData;
  if (progress) {
    uploader.uppy.log(`Upload progress: ${progress}`);
    uploader.uppy.emit("upload-progress", file, {
      uploader,
      bytesUploaded,
      bytesTotal
    });
  }
}
var emitSocketProgress_default = (0, import_lodash4.default)(emitSocketProgress, 300, {
  leading: true,
  trailing: true
});

// node_modules/@uppy/utils/lib/getSocketHost.js
function getSocketHost(url) {
  const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i;
  const host = regex.exec(url)[1];
  const socketProtocol = /^http:\/\//i.test(url) ? "ws" : "wss";
  return `${socketProtocol}://${host}`;
}

// node_modules/@uppy/utils/lib/settle.js
function settle(promises) {
  const resolutions = [];
  const rejections = [];
  function resolved(value) {
    resolutions.push(value);
  }
  function rejected(error) {
    rejections.push(error);
  }
  const wait = Promise.all(promises.map((promise) => promise.then(resolved, rejected)));
  return wait.then(() => {
    return {
      successful: resolutions,
      failed: rejections
    };
  });
}

// node_modules/@uppy/utils/lib/EventTracker.js
function _classPrivateFieldLooseBase8(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id8 = 0;
function _classPrivateFieldLooseKey8(name) {
  return "__private_" + id8++ + "_" + name;
}
var _emitter3 = /* @__PURE__ */ _classPrivateFieldLooseKey8("emitter");
var _events = /* @__PURE__ */ _classPrivateFieldLooseKey8("events");
var EventTracker = class {
  constructor(emitter) {
    Object.defineProperty(this, _emitter3, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _events, {
      writable: true,
      value: []
    });
    _classPrivateFieldLooseBase8(this, _emitter3)[_emitter3] = emitter;
  }
  on(event, fn) {
    _classPrivateFieldLooseBase8(this, _events)[_events].push([event, fn]);
    return _classPrivateFieldLooseBase8(this, _emitter3)[_emitter3].on(event, fn);
  }
  remove() {
    for (const [event, fn] of _classPrivateFieldLooseBase8(this, _events)[_events].splice(0)) {
      _classPrivateFieldLooseBase8(this, _emitter3)[_emitter3].off(event, fn);
    }
  }
};

// node_modules/@uppy/utils/lib/isNetworkError.js
function isNetworkError(xhr) {
  if (!xhr) {
    return false;
  }
  return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
}
var isNetworkError_default = isNetworkError;

// node_modules/@uppy/utils/lib/RateLimitedQueue.js
function _classPrivateFieldLooseBase9(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id9 = 0;
function _classPrivateFieldLooseKey9(name) {
  return "__private_" + id9++ + "_" + name;
}
function createCancelError(cause) {
  return new Error("Cancelled", {
    cause
  });
}
function abortOn(signal) {
  if (signal != null) {
    const abortPromise = () => this.abort(signal.reason);
    signal.addEventListener("abort", abortPromise, {
      once: true
    });
    const removeAbortListener = () => {
      signal.removeEventListener("abort", abortPromise);
    };
    this.then(removeAbortListener, removeAbortListener);
  }
  return this;
}
var _activeRequests = /* @__PURE__ */ _classPrivateFieldLooseKey9("activeRequests");
var _queuedHandlers = /* @__PURE__ */ _classPrivateFieldLooseKey9("queuedHandlers");
var _paused = /* @__PURE__ */ _classPrivateFieldLooseKey9("paused");
var _pauseTimer = /* @__PURE__ */ _classPrivateFieldLooseKey9("pauseTimer");
var _downLimit = /* @__PURE__ */ _classPrivateFieldLooseKey9("downLimit");
var _upperLimit = /* @__PURE__ */ _classPrivateFieldLooseKey9("upperLimit");
var _rateLimitingTimer = /* @__PURE__ */ _classPrivateFieldLooseKey9("rateLimitingTimer");
var _call = /* @__PURE__ */ _classPrivateFieldLooseKey9("call");
var _queueNext = /* @__PURE__ */ _classPrivateFieldLooseKey9("queueNext");
var _next = /* @__PURE__ */ _classPrivateFieldLooseKey9("next");
var _queue = /* @__PURE__ */ _classPrivateFieldLooseKey9("queue");
var _dequeue = /* @__PURE__ */ _classPrivateFieldLooseKey9("dequeue");
var _resume = /* @__PURE__ */ _classPrivateFieldLooseKey9("resume");
var _increaseLimit = /* @__PURE__ */ _classPrivateFieldLooseKey9("increaseLimit");
var RateLimitedQueue = class {
  constructor(limit) {
    Object.defineProperty(this, _dequeue, {
      value: _dequeue2
    });
    Object.defineProperty(this, _queue, {
      value: _queue2
    });
    Object.defineProperty(this, _next, {
      value: _next2
    });
    Object.defineProperty(this, _queueNext, {
      value: _queueNext2
    });
    Object.defineProperty(this, _call, {
      value: _call2
    });
    Object.defineProperty(this, _activeRequests, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _queuedHandlers, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _paused, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _pauseTimer, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _downLimit, {
      writable: true,
      value: 1
    });
    Object.defineProperty(this, _upperLimit, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _rateLimitingTimer, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _resume, {
      writable: true,
      value: () => this.resume()
    });
    Object.defineProperty(this, _increaseLimit, {
      writable: true,
      value: () => {
        if (_classPrivateFieldLooseBase9(this, _paused)[_paused]) {
          _classPrivateFieldLooseBase9(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase9(this, _increaseLimit)[_increaseLimit], 0);
          return;
        }
        _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit] = this.limit;
        this.limit = Math.ceil((_classPrivateFieldLooseBase9(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit]) / 2);
        for (let i3 = _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit]; i3 <= this.limit; i3++) {
          _classPrivateFieldLooseBase9(this, _queueNext)[_queueNext]();
        }
        if (_classPrivateFieldLooseBase9(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit] > 3) {
          _classPrivateFieldLooseBase9(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase9(this, _increaseLimit)[_increaseLimit], 2e3);
        } else {
          _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase9(this, _downLimit)[_downLimit] / 2);
        }
      }
    });
    if (typeof limit !== "number" || limit === 0) {
      this.limit = Infinity;
    } else {
      this.limit = limit;
    }
  }
  run(fn, queueOptions) {
    if (!_classPrivateFieldLooseBase9(this, _paused)[_paused] && _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] < this.limit) {
      return _classPrivateFieldLooseBase9(this, _call)[_call](fn);
    }
    return _classPrivateFieldLooseBase9(this, _queue)[_queue](fn, queueOptions);
  }
  wrapPromiseFunction(fn, queueOptions) {
    var _this = this;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      let queuedRequest;
      const outerPromise = new Promise((resolve, reject) => {
        queuedRequest = _this.run(() => {
          let cancelError;
          let innerPromise;
          try {
            innerPromise = Promise.resolve(fn(...args));
          } catch (err) {
            innerPromise = Promise.reject(err);
          }
          innerPromise.then((result) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              resolve(result);
            }
          }, (err) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              reject(err);
            }
          });
          return (cause) => {
            cancelError = createCancelError(cause);
          };
        }, queueOptions);
      });
      outerPromise.abort = (cause) => {
        queuedRequest.abort(cause);
      };
      outerPromise.abortOn = abortOn;
      return outerPromise;
    };
  }
  resume() {
    _classPrivateFieldLooseBase9(this, _paused)[_paused] = false;
    clearTimeout(_classPrivateFieldLooseBase9(this, _pauseTimer)[_pauseTimer]);
    for (let i3 = 0; i3 < this.limit; i3++) {
      _classPrivateFieldLooseBase9(this, _queueNext)[_queueNext]();
    }
  }
  /**
   * Freezes the queue for a while or indefinitely.
   *
   * @param {number | null } [duration] Duration for the pause to happen, in milliseconds.
   *                                    If omitted, the queue won't resume automatically.
   */
  pause(duration2) {
    if (duration2 === void 0) {
      duration2 = null;
    }
    _classPrivateFieldLooseBase9(this, _paused)[_paused] = true;
    clearTimeout(_classPrivateFieldLooseBase9(this, _pauseTimer)[_pauseTimer]);
    if (duration2 != null) {
      _classPrivateFieldLooseBase9(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase9(this, _resume)[_resume], duration2);
    }
  }
  /**
   * Pauses the queue for a duration, and lower the limit of concurrent requests
   * when the queue resumes. When the queue resumes, it tries to progressively
   * increase the limit in `this.#increaseLimit` until another call is made to
   * `this.rateLimit`.
   * Call this function when using the RateLimitedQueue for network requests and
   * the remote server responds with 429 HTTP code.
   *
   * @param {number} duration in milliseconds.
   */
  rateLimit(duration2) {
    clearTimeout(_classPrivateFieldLooseBase9(this, _rateLimitingTimer)[_rateLimitingTimer]);
    this.pause(duration2);
    if (this.limit > 1 && Number.isFinite(this.limit)) {
      _classPrivateFieldLooseBase9(this, _upperLimit)[_upperLimit] = this.limit - 1;
      this.limit = _classPrivateFieldLooseBase9(this, _downLimit)[_downLimit];
      _classPrivateFieldLooseBase9(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase9(this, _increaseLimit)[_increaseLimit], duration2);
    }
  }
  get isPaused() {
    return _classPrivateFieldLooseBase9(this, _paused)[_paused];
  }
};
function _call2(fn) {
  _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] += 1;
  let done = false;
  let cancelActive;
  try {
    cancelActive = fn();
  } catch (err) {
    _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] -= 1;
    throw err;
  }
  return {
    abort: (cause) => {
      if (done)
        return;
      done = true;
      _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] -= 1;
      cancelActive(cause);
      _classPrivateFieldLooseBase9(this, _queueNext)[_queueNext]();
    },
    done: () => {
      if (done)
        return;
      done = true;
      _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] -= 1;
      _classPrivateFieldLooseBase9(this, _queueNext)[_queueNext]();
    }
  };
}
function _queueNext2() {
  queueMicrotask(() => _classPrivateFieldLooseBase9(this, _next)[_next]());
}
function _next2() {
  if (_classPrivateFieldLooseBase9(this, _paused)[_paused] || _classPrivateFieldLooseBase9(this, _activeRequests)[_activeRequests] >= this.limit) {
    return;
  }
  if (_classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].length === 0) {
    return;
  }
  const next = _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].shift();
  const handler = _classPrivateFieldLooseBase9(this, _call)[_call](next.fn);
  next.abort = handler.abort;
  next.done = handler.done;
}
function _queue2(fn, options) {
  if (options === void 0) {
    options = {};
  }
  const handler = {
    fn,
    priority: options.priority || 0,
    abort: () => {
      _classPrivateFieldLooseBase9(this, _dequeue)[_dequeue](handler);
    },
    done: () => {
      throw new Error("Cannot mark a queued request as done: this indicates a bug");
    }
  };
  const index = _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
    return handler.priority > other.priority;
  });
  if (index === -1) {
    _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].push(handler);
  } else {
    _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
  }
  return handler;
}
function _dequeue2(handler) {
  const index = _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
  if (index !== -1) {
    _classPrivateFieldLooseBase9(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
  }
}
var internalRateLimitedQueue = Symbol("__queue");

// node_modules/@uppy/tus/lib/getFingerprint.js
function isCordova3() {
  return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
}
function isReactNative3() {
  return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
}
function getFingerprint(uppyFileObj) {
  return (file, options) => {
    if (isCordova3() || isReactNative3()) {
      return defaultOptions3.fingerprint(file, options);
    }
    const uppyFingerprint = ["tus", uppyFileObj.id, options.endpoint].join("-");
    return Promise.resolve(uppyFingerprint);
  };
}

// node_modules/@uppy/tus/lib/index.js
function _classPrivateFieldLooseBase10(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id10 = 0;
function _classPrivateFieldLooseKey10(name) {
  return "__private_" + id10++ + "_" + name;
}
var packageJson8 = {
  "version": "3.0.5"
};
var tusDefaultOptions = {
  endpoint: "",
  uploadUrl: null,
  metadata: {},
  uploadSize: null,
  onProgress: null,
  onChunkComplete: null,
  onSuccess: null,
  onError: null,
  overridePatchMethod: false,
  headers: {},
  addRequestId: false,
  chunkSize: Infinity,
  retryDelays: [100, 1e3, 3e3, 5e3],
  parallelUploads: 1,
  removeFingerprintOnSuccess: false,
  uploadLengthDeferred: false,
  uploadDataDuringCreation: false
};
var _retryDelayIterator = /* @__PURE__ */ _classPrivateFieldLooseKey10("retryDelayIterator");
var _queueRequestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey10("queueRequestSocketToken");
var _requestSocketToken = /* @__PURE__ */ _classPrivateFieldLooseKey10("requestSocketToken");
var Tus = class extends BasePlugin {
  /**
   * @param {Uppy} uppy
   * @param {TusOptions} opts
   */
  constructor(uppy, _opts) {
    var _this$opts$rateLimite, _this$opts$retryDelay;
    super(uppy, _opts);
    Object.defineProperty(this, _retryDelayIterator, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _queueRequestSocketToken, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _requestSocketToken, {
      writable: true,
      value: async (file) => {
        const Client = file.remote.providerOptions.provider ? Provider : RequestClient;
        const client = new Client(this.uppy, file.remote.providerOptions);
        const opts = {
          ...this.opts
        };
        if (file.tus) {
          Object.assign(opts, file.tus);
        }
        const res = await client.post(file.remote.url, {
          ...file.remote.body,
          endpoint: opts.endpoint,
          uploadUrl: opts.uploadUrl,
          protocol: "tus",
          size: file.data.size,
          headers: opts.headers,
          metadata: file.meta
        });
        return res.token;
      }
    });
    this.type = "uploader";
    this.id = this.opts.id || "Tus";
    this.title = "Tus";
    const defaultOptions4 = {
      useFastRemoteRetry: true,
      limit: 20,
      retryDelays: tusDefaultOptions.retryDelays,
      withCredentials: false
    };
    this.opts = {
      ...defaultOptions4,
      ..._opts
    };
    if ((_opts == null ? void 0 : _opts.allowedMetaFields) === void 0 && "metaFields" in this.opts) {
      throw new Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
    }
    if ("autoRetry" in _opts) {
      throw new Error("The `autoRetry` option was deprecated and has been removed.");
    }
    this.requests = (_this$opts$rateLimite = this.opts.rateLimitedQueue) != null ? _this$opts$rateLimite : new RateLimitedQueue(this.opts.limit);
    _classPrivateFieldLooseBase10(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
    this.uploaders = /* @__PURE__ */ Object.create(null);
    this.uploaderEvents = /* @__PURE__ */ Object.create(null);
    this.uploaderSockets = /* @__PURE__ */ Object.create(null);
    this.handleResetProgress = this.handleResetProgress.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    _classPrivateFieldLooseBase10(this, _queueRequestSocketToken)[_queueRequestSocketToken] = this.requests.wrapPromiseFunction(_classPrivateFieldLooseBase10(this, _requestSocketToken)[_requestSocketToken], {
      priority: -1
    });
  }
  handleResetProgress() {
    const files = {
      ...this.uppy.getState().files
    };
    Object.keys(files).forEach((fileID) => {
      if (files[fileID].tus && files[fileID].tus.uploadUrl) {
        const tusState = {
          ...files[fileID].tus
        };
        delete tusState.uploadUrl;
        files[fileID] = {
          ...files[fileID],
          tus: tusState
        };
      }
    });
    this.uppy.setState({
      files
    });
  }
  /**
   * Clean up all references for a file's upload: the tus.Upload instance,
   * any events related to the file, and the Companion WebSocket connection.
   *
   * @param {string} fileID
   */
  resetUploaderReferences(fileID, opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (this.uploaders[fileID]) {
      const uploader = this.uploaders[fileID];
      uploader.abort();
      if (opts.abort) {
        uploader.abort(true);
      }
      this.uploaders[fileID] = null;
    }
    if (this.uploaderEvents[fileID]) {
      this.uploaderEvents[fileID].remove();
      this.uploaderEvents[fileID] = null;
    }
    if (this.uploaderSockets[fileID]) {
      this.uploaderSockets[fileID].close();
      this.uploaderSockets[fileID] = null;
    }
  }
  /**
   * Create a new Tus upload.
   *
   * A lot can happen during an upload, so this is quite hard to follow!
   * - First, the upload is started. If the file was already paused by the time the upload starts, nothing should happen.
   *   If the `limit` option is used, the upload must be queued onto the `this.requests` queue.
   *   When an upload starts, we store the tus.Upload instance, and an EventTracker instance that manages the event listeners
   *   for pausing, cancellation, removal, etc.
   * - While the upload is in progress, it may be paused or cancelled.
   *   Pausing aborts the underlying tus.Upload, and removes the upload from the `this.requests` queue. All other state is
   *   maintained.
   *   Cancelling removes the upload from the `this.requests` queue, and completely aborts the upload-- the `tus.Upload`
   *   instance is aborted and discarded, the EventTracker instance is destroyed (removing all listeners).
   *   Resuming the upload uses the `this.requests` queue as well, to prevent selectively pausing and resuming uploads from
   *   bypassing the limit.
   * - After completing an upload, the tus.Upload and EventTracker instances are cleaned up, and the upload is marked as done
   *   in the `this.requests` queue.
   * - When an upload completed with an error, the same happens as on successful completion, but the `upload()` promise is
   *   rejected.
   *
   * When working on this function, keep in mind:
   *  - When an upload is completed or cancelled for any reason, the tus.Upload and EventTracker instances need to be cleaned
   *    up using this.resetUploaderReferences().
   *  - When an upload is cancelled or paused, for any reason, it needs to be removed from the `this.requests` queue using
   *    `queuedRequest.abort()`.
   *  - When an upload is completed for any reason, including errors, it needs to be marked as such using
   *    `queuedRequest.done()`.
   *  - When an upload is started or resumed, it needs to go through the `this.requests` queue. The `queuedRequest` variable
   *    must be updated so the other uses of it are valid.
   *  - Before replacing the `queuedRequest` variable, the previous `queuedRequest` must be aborted, else it will keep taking
   *    up a spot in the queue.
   *
   * @param {UppyFile} file for use with upload
   * @returns {Promise<void>}
   */
  upload(file) {
    var _this = this;
    this.resetUploaderReferences(file.id);
    return new Promise((resolve, reject) => {
      let queuedRequest;
      let qRequest;
      let upload;
      this.uppy.emit("upload-started", file);
      const opts = {
        ...this.opts,
        ...file.tus || {}
      };
      if (typeof opts.headers === "function") {
        opts.headers = opts.headers(file);
      }
      const uploadOptions = {
        ...tusDefaultOptions,
        ...opts
      };
      uploadOptions.fingerprint = getFingerprint(file);
      uploadOptions.onBeforeRequest = (req) => {
        const xhr = req.getUnderlyingObject();
        xhr.withCredentials = !!opts.withCredentials;
        let userProvidedPromise;
        if (typeof opts.onBeforeRequest === "function") {
          userProvidedPromise = opts.onBeforeRequest(req, file);
        }
        if (has(queuedRequest, "shouldBeRequeued")) {
          if (!queuedRequest.shouldBeRequeued)
            return Promise.reject();
          let done;
          const p3 = new Promise((res) => {
            done = res;
          });
          queuedRequest = this.requests.run(() => {
            if (file.isPaused) {
              queuedRequest.abort();
            }
            done();
            return () => {
            };
          });
          return Promise.all([p3, userProvidedPromise]);
        }
        return userProvidedPromise;
      };
      uploadOptions.onError = (err) => {
        var _queuedRequest;
        this.uppy.log(err);
        const xhr = err.originalRequest ? err.originalRequest.getUnderlyingObject() : null;
        if (isNetworkError_default(xhr)) {
          err = new NetworkError_default(err, xhr);
        }
        this.resetUploaderReferences(file.id);
        (_queuedRequest = queuedRequest) == null ? void 0 : _queuedRequest.abort();
        this.uppy.emit("upload-error", file, err);
        reject(err);
      };
      uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
        this.onReceiveUploadUrl(file, upload.url);
        this.uppy.emit("upload-progress", file, {
          uploader: this,
          bytesUploaded,
          bytesTotal
        });
      };
      uploadOptions.onSuccess = () => {
        const uploadResp = {
          uploadURL: upload.url
        };
        this.resetUploaderReferences(file.id);
        queuedRequest.done();
        this.uppy.emit("upload-success", file, uploadResp);
        if (upload.url) {
          this.uppy.log(`Download ${upload.file.name} from ${upload.url}`);
        }
        resolve(upload);
      };
      const defaultOnShouldRetry = (err) => {
        var _err$originalResponse;
        const status = err == null ? void 0 : (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
        if (status === 429) {
          if (!this.requests.isPaused) {
            var _classPrivateFieldLoo;
            const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase10(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
            if (next == null || next.done) {
              return false;
            }
            this.requests.rateLimit(next.value);
          }
        } else if (status > 400 && status < 500 && status !== 409) {
          return false;
        } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
          if (!this.requests.isPaused) {
            this.requests.pause();
            window.addEventListener("online", () => {
              this.requests.resume();
            }, {
              once: true
            });
          }
        }
        queuedRequest.abort();
        queuedRequest = {
          shouldBeRequeued: true,
          abort() {
            this.shouldBeRequeued = false;
          },
          done() {
            throw new Error("Cannot mark a queued request as done: this indicates a bug");
          },
          fn() {
            throw new Error("Cannot run a queued request: this indicates a bug");
          }
        };
        return true;
      };
      if (opts.onShouldRetry != null) {
        uploadOptions.onShouldRetry = function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return opts.onShouldRetry(...args, defaultOnShouldRetry);
        };
      } else {
        uploadOptions.onShouldRetry = defaultOnShouldRetry;
      }
      const copyProp = (obj, srcProp, destProp) => {
        if (has(obj, srcProp) && !has(obj, destProp)) {
          obj[destProp] = obj[srcProp];
        }
      };
      const meta = {};
      const allowedMetaFields = Array.isArray(opts.allowedMetaFields) ? opts.allowedMetaFields : Object.keys(file.meta);
      allowedMetaFields.forEach((item) => {
        meta[item] = file.meta[item];
      });
      copyProp(meta, "type", "filetype");
      copyProp(meta, "name", "filename");
      uploadOptions.metadata = meta;
      upload = new Upload(file.data, uploadOptions);
      this.uploaders[file.id] = upload;
      this.uploaderEvents[file.id] = new EventTracker(this.uppy);
      qRequest = () => {
        if (!file.isPaused) {
          upload.start();
        }
        return () => {
        };
      };
      upload.findPreviousUploads().then((previousUploads) => {
        const previousUpload = previousUploads[0];
        if (previousUpload) {
          this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
          upload.resumeFromPreviousUpload(previousUpload);
        }
      });
      queuedRequest = this.requests.run(qRequest);
      this.onFileRemove(file.id, (targetFileID) => {
        queuedRequest.abort();
        this.resetUploaderReferences(file.id, {
          abort: !!upload.url
        });
        resolve(`upload ${targetFileID} was removed`);
      });
      this.onPause(file.id, (isPaused) => {
        queuedRequest.abort();
        if (isPaused) {
          upload.abort();
        } else {
          queuedRequest = this.requests.run(qRequest);
        }
      });
      this.onPauseAll(file.id, () => {
        queuedRequest.abort();
        upload.abort();
      });
      this.onCancelAll(file.id, function(_temp) {
        let {
          reason
        } = _temp === void 0 ? {} : _temp;
        if (reason === "user") {
          queuedRequest.abort();
          _this.resetUploaderReferences(file.id, {
            abort: !!upload.url
          });
        }
        resolve(`upload ${file.id} was canceled`);
      });
      this.onResumeAll(file.id, () => {
        queuedRequest.abort();
        if (file.error) {
          upload.abort();
        }
        queuedRequest = this.requests.run(qRequest);
      });
    }).catch((err) => {
      this.uppy.emit("upload-error", file, err);
      throw err;
    });
  }
  /**
   * @param {UppyFile} file for use with upload
   * @returns {Promise<void>}
   */
  async uploadRemote(file) {
    this.resetUploaderReferences(file.id);
    if (!file.progress.uploadStarted || !file.isRestored) {
      this.uppy.emit("upload-started", file);
    }
    try {
      if (file.serverToken) {
        return this.connectToServerSocket(file);
      }
      const serverToken = await _classPrivateFieldLooseBase10(this, _queueRequestSocketToken)[_queueRequestSocketToken](file);
      if (!this.uppy.getState().files[file.id])
        return void 0;
      this.uppy.setFileState(file.id, {
        serverToken
      });
      return this.connectToServerSocket(this.uppy.getFile(file.id));
    } catch (err) {
      this.uppy.emit("upload-error", file, err);
      throw err;
    }
  }
  /**
   * See the comment on the upload() method.
   *
   * Additionally, when an upload is removed, completed, or cancelled, we need to close the WebSocket connection. This is
   * handled by the resetUploaderReferences() function, so the same guidelines apply as in upload().
   *
   * @param {UppyFile} file
   */
  connectToServerSocket(file) {
    var _this2 = this;
    return new Promise((resolve, reject) => {
      const token = file.serverToken;
      const host = getSocketHost(file.remote.companionUrl);
      const socket = new UppySocket({
        target: `${host}/api/${token}`
      });
      this.uploaderSockets[file.id] = socket;
      this.uploaderEvents[file.id] = new EventTracker(this.uppy);
      let queuedRequest;
      this.onFileRemove(file.id, () => {
        queuedRequest.abort();
        socket.send("cancel", {});
        this.resetUploaderReferences(file.id);
        resolve(`upload ${file.id} was removed`);
      });
      this.onPause(file.id, (isPaused) => {
        if (isPaused) {
          queuedRequest.abort();
          socket.send("pause", {});
        } else {
          queuedRequest.abort();
          queuedRequest = this.requests.run(() => {
            socket.send("resume", {});
            return () => {
            };
          });
        }
      });
      this.onPauseAll(file.id, () => {
        queuedRequest.abort();
        socket.send("pause", {});
      });
      this.onCancelAll(file.id, function(_temp2) {
        let {
          reason
        } = _temp2 === void 0 ? {} : _temp2;
        if (reason === "user") {
          queuedRequest.abort();
          socket.send("cancel", {});
          _this2.resetUploaderReferences(file.id);
        }
        resolve(`upload ${file.id} was canceled`);
      });
      this.onResumeAll(file.id, () => {
        queuedRequest.abort();
        if (file.error) {
          socket.send("pause", {});
        }
        queuedRequest = this.requests.run(() => {
          socket.send("resume", {});
          return () => {
          };
        });
      });
      this.onRetry(file.id, () => {
        if (socket.isOpen) {
          socket.send("pause", {});
          socket.send("resume", {});
        }
      });
      this.onRetryAll(file.id, () => {
        if (socket.isOpen) {
          socket.send("pause", {});
          socket.send("resume", {});
        }
      });
      socket.on("progress", (progressData) => emitSocketProgress_default(this, progressData, file));
      socket.on("error", (errData) => {
        const {
          message
        } = errData.error;
        const error = Object.assign(new Error(message), {
          cause: errData.error
        });
        if (!this.opts.useFastRemoteRetry) {
          this.resetUploaderReferences(file.id);
          this.uppy.setFileState(file.id, {
            serverToken: null
          });
        } else {
          socket.close();
        }
        this.uppy.emit("upload-error", file, error);
        queuedRequest.done();
        reject(error);
      });
      socket.on("success", (data) => {
        const uploadResp = {
          uploadURL: data.url
        };
        this.uppy.emit("upload-success", file, uploadResp);
        this.resetUploaderReferences(file.id);
        queuedRequest.done();
        resolve();
      });
      queuedRequest = this.requests.run(() => {
        if (file.isPaused) {
          socket.send("pause", {});
        }
        return () => {
        };
      });
    });
  }
  /**
   * Store the uploadUrl on the file options, so that when Golden Retriever
   * restores state, we will continue uploading to the correct URL.
   *
   * @param {UppyFile} file
   * @param {string} uploadURL
   */
  onReceiveUploadUrl(file, uploadURL) {
    const currentFile = this.uppy.getFile(file.id);
    if (!currentFile)
      return;
    if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
      this.uppy.log("[Tus] Storing upload url");
      this.uppy.setFileState(currentFile.id, {
        tus: {
          ...currentFile.tus,
          uploadUrl: uploadURL
        }
      });
    }
  }
  /**
   * @param {string} fileID
   * @param {function(string): void} cb
   */
  onFileRemove(fileID, cb) {
    this.uploaderEvents[fileID].on("file-removed", (file) => {
      if (fileID === file.id)
        cb(file.id);
    });
  }
  /**
   * @param {string} fileID
   * @param {function(boolean): void} cb
   */
  onPause(fileID, cb) {
    this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
      if (fileID === targetFileID) {
        cb(isPaused);
      }
    });
  }
  /**
   * @param {string} fileID
   * @param {function(): void} cb
   */
  onRetry(fileID, cb) {
    this.uploaderEvents[fileID].on("upload-retry", (targetFileID) => {
      if (fileID === targetFileID) {
        cb();
      }
    });
  }
  /**
   * @param {string} fileID
   * @param {function(): void} cb
   */
  onRetryAll(fileID, cb) {
    this.uploaderEvents[fileID].on("retry-all", () => {
      if (!this.uppy.getFile(fileID))
        return;
      cb();
    });
  }
  /**
   * @param {string} fileID
   * @param {function(): void} cb
   */
  onPauseAll(fileID, cb) {
    this.uploaderEvents[fileID].on("pause-all", () => {
      if (!this.uppy.getFile(fileID))
        return;
      cb();
    });
  }
  /**
   * @param {string} fileID
   * @param {function(): void} eventHandler
   */
  onCancelAll(fileID, eventHandler) {
    var _this3 = this;
    this.uploaderEvents[fileID].on("cancel-all", function() {
      if (!_this3.uppy.getFile(fileID))
        return;
      eventHandler(...arguments);
    });
  }
  /**
   * @param {string} fileID
   * @param {function(): void} cb
   */
  onResumeAll(fileID, cb) {
    this.uploaderEvents[fileID].on("resume-all", () => {
      if (!this.uppy.getFile(fileID))
        return;
      cb();
    });
  }
  /**
   * @param {(UppyFile | FailedUppyFile)[]} files
   */
  uploadFiles(files) {
    const promises = files.map((file, i3) => {
      const current = i3 + 1;
      const total = files.length;
      if ("error" in file && file.error) {
        return Promise.reject(new Error(file.error));
      }
      if (file.isRemote) {
        if (!file.progress.uploadStarted || !file.isRestored) {
          this.uppy.emit("upload-started", file);
        }
        return this.uploadRemote(file, current, total);
      }
      if (!file.progress.uploadStarted || !file.isRestored) {
        this.uppy.emit("upload-started", file);
      }
      return this.upload(file, current, total);
    });
    return settle(promises);
  }
  /**
   * @param {string[]} fileIDs
   */
  handleUpload(fileIDs) {
    if (fileIDs.length === 0) {
      this.uppy.log("[Tus] No files to upload");
      return Promise.resolve();
    }
    if (this.opts.limit === 0) {
      this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
    }
    this.uppy.log("[Tus] Uploading...");
    const filesToUpload = fileIDs.map((fileID) => this.uppy.getFile(fileID));
    return this.uploadFiles(filesToUpload).then(() => null);
  }
  install() {
    this.uppy.setState({
      capabilities: {
        ...this.uppy.getState().capabilities,
        resumableUploads: true
      }
    });
    this.uppy.addUploader(this.handleUpload);
    this.uppy.on("reset-progress", this.handleResetProgress);
  }
  uninstall() {
    this.uppy.setState({
      capabilities: {
        ...this.uppy.getState().capabilities,
        resumableUploads: false
      }
    });
    this.uppy.removeUploader(this.handleUpload);
  }
};
Tus.VERSION = packageJson8.version;

// Uppy/Dashboard/UppyDashboard.razor.ts
var UppyDashboard = class {
  constructor(selectorId, endpoint, darkMode) {
    __publicField(this, "uppy");
    __publicField(this, "resizeObserver");
    this.uppy = new Uppy_default({ id: selectorId, autoProceed: true, debug: true }).use(Dashboard2, {
      target: `#${selectorId}`,
      inline: true,
      showProgressDetails: true,
      proudlyDisplayPoweredByUppy: true,
      theme: darkMode ? "dark" : "light"
    }).use(Tus, { endpoint });
    this.startListeningToResize(selectorId);
  }
  // Set Dashboard specific options
  setDashboardOptions(options) {
    const dashboard = this.uppy.getPlugin("Dashboard");
    dashboard?.setOptions(options);
  }
  // Set Uppy specific options
  setUppyOptions(options) {
    this.uppy.setOptions(options);
  }
  setAutoProceed(autoProceed) {
    this.setUppyOptions({ autoProceed });
  }
  setDarkMode(enabled) {
    this.setDashboardOptions({ theme: enabled ? "dark" : "light" });
  }
  setDisabled(disabled) {
    this.setDashboardOptions({ disabled });
  }
  setNote(note) {
    this.setDashboardOptions({ note });
  }
  onModalOpen(selectorId, component, methodName) {
    const handler = () => {
      if (component != null) {
        component.invokeMethodAsync(methodName);
        return;
      }
      console.warn("BlazorUppy:: JS callback executed after Blazor component unmounted.");
    };
    this.uppy.on("dashboard:modal-open", handler);
  }
  onModalClosed(selectorId, component, methodName) {
    const handler = () => {
      if (component != null) {
        component.invokeMethodAsync(methodName);
        return;
      }
      console.warn("BlazorUppy:: JS callback executed after Blazor component unmounted.");
    };
    this.uppy.on("dashboard:modal-closed", handler);
  }
  // Resizing
  startListeningToResize(selectorId) {
    this.resizeObserver = new ResizeObserver((entries) => {
      const uppyDashboardInnerEl = entries[0];
      const { width, height } = uppyDashboardInnerEl.contentRect;
      this.setDashboardOptions({
        width,
        height
      });
    });
    this.resizeObserver.observe(document.getElementById(selectorId));
  }
  stopListeningToResize() {
    this.resizeObserver?.disconnect();
  }
  // End Resizing
};
function initDashboardInstance(selectorId, endpoint, darkMode) {
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("href", " https://releases.transloadit.com/uppy/v3.6.1/uppy.min.css");
  document.getElementsByTagName("head")[0].appendChild(element);
  return new UppyDashboard(selectorId, endpoint, darkMode);
}
export {
  initDashboardInstance
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

@uppy/utils/lib/Translator.js:
  (**
   * Takes a string with placeholder variables like `%{smart_count} file selected`
   * and replaces it with values from options `{smart_count: 5}`
   *
   * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
   * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
   *
   * @param {string} phrase that needs interpolation, with placeholders
   * @param {object} options with values that will be used to replace placeholders
   * @returns {any[]} interpolated
   *)
*/
