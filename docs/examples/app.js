(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
'use strict';

var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();







var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





var inheritsLoose$1 = function (subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};







var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

// eslint-disable-line
var ATOM_STATUS_DESTROYED = 0;
var ATOM_STATUS_OBSOLETE = 1;
var ATOM_STATUS_CHECKING = 2;
var ATOM_STATUS_PULLING = 3;
var ATOM_STATUS_ACTUAL = 4;
var catchedId = Symbol('lom_atom_catched');

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inheritsLoose = function inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};

inheritsLoose._r = [2];
var throwOnAccess = {
  get: function get$$1(target) {
    throw target.valueOf();
  },
  ownKeys: function ownKeys(target) {
    throw target.valueOf();
  }
};

function createMock(error) {
  return new Proxy(error, throwOnAccess);
}

createMock._r = [2];

function defaultNormalize(next, prev) {
  if (next === prev) return next;

  if (next instanceof Array && prev instanceof Array && next.length === prev.length) {
    for (var i = 0; i < next.length; i++) {
      if (next[i] !== prev[i]) {
        return next;
      }
    }

    return prev;
  }

  return next;
}

defaultNormalize._r = [2];

var AtomWait = function (_Error) {
  inheritsLoose(AtomWait, _Error);

  function AtomWait() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Wait...';
    _this = _Error.call(this, message) || this // $FlowFixMe new.target
    ;
    _this['__proto__'] = new.target.prototype;
    _this[catchedId] = true;
    return _this;
  }

  return AtomWait;
}(Error);

function checkSlave(slave) {
  slave.check();
}

checkSlave._r = [2];

function obsoleteSlave(slave) {
  slave.obsolete();
}

obsoleteSlave._r = [2];

function disleadThis(master) {
  master.dislead(this);
}

disleadThis._r = [2];

function actualizeMaster(master) {
  if (this.status === ATOM_STATUS_CHECKING) {
    master.actualize();
  }
}

actualizeMaster._r = [2];

var Atom = function () {
  function Atom(field, host, context, normalize, key, isComponent) {
    this._masters = null;
    this._slaves = null;
    this.key = key;
    this.field = field;
    this.host = host;
    this.isComponent = isComponent || false;
    this._normalize = normalize || defaultNormalize;
    this._context = context;
    this.value = context.create(host, field, key);
    this.status = this.value === undefined ? ATOM_STATUS_OBSOLETE : ATOM_STATUS_ACTUAL;
  }

  Atom.prototype.toString = function toString() {
    var hc = this.host.constructor;
    var k = this.key;
    return (this.host.displayName || (hc ? String(hc.displayName || hc.name) : '')) + '.' + this.field + (k ? '(' + (typeof k === 'function' ? k.displayName || k.name : String(k)) + ')' : '');
  };

  Atom.prototype.toJSON = function toJSON() {
    return this.value;
  };

  Atom.prototype.destroyed = function destroyed(isDestroyed) {
    if (isDestroyed === undefined) {
      return this.status === ATOM_STATUS_DESTROYED;
    }

    if (isDestroyed) {
      if (this.status !== ATOM_STATUS_DESTROYED) {
        if (this._masters) {
          this._masters.forEach(disleadThis, this);

          this._masters = null;
        }

        this._checkSlaves();

        if (this.host.destroy !== undefined) {
          this.host.destroy(this.value, this.field, this.key);
        }

        this._context.destroyHost(this);

        this.value = undefined;
        this.status = ATOM_STATUS_DESTROYED;
      }

      return true;
    }

    return false;
  };

  Atom.prototype.get = function get$$1(force) {
    if (force) {
      this._pullPush(undefined, true);
    } else {
      this.actualize();
    }

    var slave = this._context.last;

    if (slave && (!slave.isComponent || !this.isComponent)) {
      var slaves = this._slaves;

      if (!slaves) {
        this._context.unreap(this);

        slaves = this._slaves = new Set();
      }

      slaves.add(slave);
      slave.addMaster(this);
    }

    return this.value;
  };

  Atom.prototype.set = function set$$1(v, force) {
    var oldValue = this.value;

    var normalized = this._normalize(v, oldValue);

    if (oldValue === normalized) {
      return normalized;
    }

    if (normalized === undefined) {
      return oldValue;
    }

    if (!force || normalized instanceof Error) {
      this.status = ATOM_STATUS_ACTUAL;
      this.value = normalized instanceof Error ? createMock(normalized) : normalized;

      this._context.newValue(this, oldValue, normalized);

      if (this._slaves) {
        this._slaves.forEach(obsoleteSlave);
      }
    } else {
      this.obsolete();
      this.actualize(normalized);
    }

    return this.value;
  };

  Atom.prototype.actualize = function actualize(proposedValue) {
    if (this.status === ATOM_STATUS_ACTUAL) {
      return;
    }

    if (this.status === ATOM_STATUS_CHECKING) {
      if (this._masters) {
        this._masters.forEach(actualizeMaster, this);
      }

      if (this.status === ATOM_STATUS_CHECKING) {
        this.status = ATOM_STATUS_ACTUAL;
      }
    }

    if (this.status !== ATOM_STATUS_ACTUAL) {
      this._pullPush(proposedValue);
    }
  };

  Atom.prototype._pullPush = function _pullPush(proposedValue, force) {
    if (this._masters) {
      this._masters.forEach(disleadThis, this);
    }

    var newValue = void 0;
    this.status = ATOM_STATUS_PULLING;
    var context = this._context;
    var slave = context.last;
    context.last = this;
    var value = this.value;

    try {
      newValue = this._normalize(this.key === undefined ? this.host[this.field + '$'](proposedValue, force, value) : this.host[this.field + '$'](this.key, proposedValue, force, value), value);
    } catch (error) {
      if (error[catchedId] === undefined) {
        error[catchedId] = true;
        console.error(error.stack || error);
      }

      newValue = createMock(error);
    }

    context.last = slave;
    this.status = ATOM_STATUS_ACTUAL;

    if (newValue !== undefined && value !== newValue) {
      this.value = newValue;

      this._context.newValue(this, value, newValue, true);

      if (this._slaves) {
        this._slaves.forEach(obsoleteSlave);
      }
    }
  };

  Atom.prototype.dislead = function dislead(slave) {
    var slaves = this._slaves;

    if (slaves) {
      if (slaves.size === 1) {
        this._slaves = null;

        this._context.proposeToReap(this);
      } else {
        slaves.delete(slave);
      }
    }
  };

  Atom.prototype._checkSlaves = function _checkSlaves() {
    if (this._slaves) {
      this._slaves.forEach(checkSlave);
    } else {
      this._context.proposeToPull(this);
    }
  };

  Atom.prototype.check = function check() {
    if (this.status === ATOM_STATUS_ACTUAL) {
      this.status = ATOM_STATUS_CHECKING;

      this._checkSlaves();
    }
  };

  Atom.prototype.obsolete = function obsolete() {
    if (this.status !== ATOM_STATUS_OBSOLETE) {
      this.status = ATOM_STATUS_OBSOLETE;

      this._checkSlaves();
    }
  };

  Atom.prototype.addMaster = function addMaster(master) {
    if (!this._masters) {
      this._masters = new Set();
    }

    this._masters.add(master);
  };

  createClass(Atom, [{
    key: "displayName",
    get: function get$$1() {
      return this.toString();
    }
  }]);
  return Atom;
}();

var scheduleNative = typeof requestAnimationFrame == 'function' ? function (handler) {
  return requestAnimationFrame(handler);
} : function (handler) {
  return setTimeout(handler, 16);
};

function reap(atom, key, reaping) {
  reaping.delete(atom);

  if (!atom.slaves) {
    atom.destroyed(true);
  }
}

reap._r = [2];

var BaseLogger = function () {
  function BaseLogger() {}

  BaseLogger.prototype.create = function create(host, field, key) {};

  BaseLogger.prototype.destroy = function destroy(atom) {};

  BaseLogger.prototype.status = function status(_status, atom) {};

  BaseLogger.prototype.error = function error(atom, err) {};

  BaseLogger.prototype.newValue = function newValue(atom, from, to, isActualize) {};

  return BaseLogger;
}();

var ConsoleLogger = function (_BaseLogger) {
  inheritsLoose(ConsoleLogger, _BaseLogger);

  function ConsoleLogger() {
    return _BaseLogger.apply(this, arguments) || this;
  }

  ConsoleLogger.prototype.status = function status(_status2, atom) {
    console.log(_status2, atom.displayName);
  };

  ConsoleLogger.prototype.error = function error(atom, err) {
    console.log('error', atom.displayName, err);
  };

  ConsoleLogger.prototype.newValue = function newValue(atom, from, to, isActualize) {
    console.log(isActualize ? 'actualize' : 'cacheSet', atom.displayName, 'from', from, 'to', to);
  };

  return ConsoleLogger;
}(BaseLogger);

var Context = function () {
  function Context() {
    var _this2 = this;

    this.last = null;
    this._logger = undefined;
    this._updating = [];
    this._reaping = new Set();
    this._scheduled = false;

    this.__run = function () {
      if (_this2._scheduled) {
        _this2._scheduled = false;

        _this2._run();
      }
    };

    this._start = 0;
    this._pendCount = 0;
  }

  Context.prototype.create = function create(host, field, key) {
    if (this._logger !== undefined) {
      return this._logger.create(host, field, key);
    }
  };

  Context.prototype.destroyHost = function destroyHost(atom) {
    if (this._logger !== undefined) {
      this._logger.destroy(atom);
    }
  };

  Context.prototype.setLogger = function setLogger(logger) {
    this._logger = logger;
  };

  Context.prototype.newValue = function newValue(atom, from, to, isActualize) {
    if (this._logger !== undefined) {
      if (to instanceof AtomWait) {
        this._logger.status('waiting', atom);
      } else if (to instanceof Error) {
        this._logger.error(atom, to);
      } else {
        this._logger.newValue(atom, from, to, isActualize);
      }
    }
  };

  Context.prototype.proposeToPull = function proposeToPull(atom) {
    if (this._logger !== undefined) {
      this._logger.status('proposeToPull', atom);
    }

    this._updating.push(atom);

    this._schedule();
  };

  Context.prototype.proposeToReap = function proposeToReap(atom) {
    if (this._logger !== undefined) {
      this._logger.status('proposeToReap', atom);
    }

    this._reaping.add(atom);

    this._schedule();
  };

  Context.prototype.unreap = function unreap(atom) {
    this._reaping.delete(atom);
  };

  Context.prototype._schedule = function _schedule() {
    if (!this._scheduled) {
      scheduleNative(this.__run);
      this._scheduled = true;
    }
  };

  Context.prototype._run = function _run() {
    this._schedule();

    var reaping = this._reaping;
    var updating = this._updating;
    var start = this._start;

    do {
      var end = updating.length;

      for (var i = start; i < end; i++) {
        this._start = i; // save progress, atom.actualize or destroyed can throw exception

        var atom = updating[i];

        if (!reaping.has(atom) && !atom.destroyed()) {
          atom.actualize();
        }
      }

      start = end;
    } while (updating.length > start);

    updating.length = 0;
    this._start = 0;

    while (reaping.size > 0) {
      reaping.forEach(reap);
    }

    this._scheduled = false;
    this._pendCount = 0;
  };

  Context.prototype.beginTransaction = function beginTransaction() {
    this._pendCount++;
  };

  Context.prototype.endTransaction = function endTransaction() {
    if (this._pendCount === 1) {
      this._run();
    } else {
      this._pendCount--;
    }
  };

  return Context;
}();

var defaultContext = new Context();

function memMethod(proto, name, descr, normalize, isComponent) {
  if (descr.value === undefined) {
    throw new TypeError(name + " is not an function (next?: V)");
  }

  proto[name + "$"] = descr.value;
  var hostAtoms = new WeakMap();
  Object.defineProperty(proto, name + "()", {
    get: function get$$1() {
      return hostAtoms.get(this);
    }
  });

  var forcedFn = function forcedFn(next, force) {
    return this[name](next, force === undefined ? true : force);
  };

  forcedFn._r = [2];
  setFunctionName(forcedFn, name + "*");
  proto[name + "*"] = forcedFn;
  return {
    enumerable: descr.enumerable,
    configurable: descr.configurable,
    value: function value(next, force) {
      var atom = hostAtoms.get(this);

      if (atom === undefined) {
        atom = new Atom(name, this, defaultContext, normalize, undefined, isComponent);
        hostAtoms.set(this, atom);
      }

      return next === undefined ? atom.get(force) : atom.set(next, force);
    }
  };
}

memMethod._r = [2];

function createGetSetHandler(get$$1, set$$1) {
  return function getSetHandler(next) {
    if (next === undefined) {
      return get$$1.call(this);
    }

    set$$1.call(this, next);
    return next;
  };
}

createGetSetHandler._r = [2];

function createValueHandler(initializer) {
  return function valueHandler(next) {
    return next === undefined && initializer ? initializer.call(this) : next;
  };
}

createValueHandler._r = [2];
var isForced = false;

function setFunctionName(fn, name) {
  Object.defineProperty(fn, 'name', {
    value: name,
    writable: false
  });
  fn.displayName = name;
}

setFunctionName._r = [2];

function memProp(proto, name, descr, normalize) {
  var handlerKey = name + "$";

  if (proto[handlerKey] !== undefined) {
    return undefined;
  }

  if (descr.initializer) setFunctionName(descr.initializer, name);
  if (descr.get) setFunctionName(descr.get, "get#" + name);
  if (descr.set) setFunctionName(descr.set, "set#" + name);
  var handler = proto[handlerKey] = descr.get === undefined && descr.set === undefined ? createValueHandler(descr.initializer) : createGetSetHandler(descr.get, descr.set);
  setFunctionName(handler, name + "()");
  var hostAtoms = new WeakMap();
  Object.defineProperty(proto, name + "()", {
    get: function get$$1() {
      return hostAtoms.get(this);
    }
  });
  return {
    enumerable: descr.enumerable,
    configurable: descr.configurable,
    get: function get$$1() {
      var atom = hostAtoms.get(this);

      if (atom === undefined) {
        atom = new Atom(name, this, defaultContext, normalize);
        hostAtoms.set(this, atom);
      }

      if (isForced) {
        isForced = false;
        return atom.get(true);
      }

      return atom.get();
    },
    set: function set$$1(val) {
      var atom = hostAtoms.get(this);

      if (atom === undefined) {
        atom = new Atom(name, this, defaultContext, normalize);
        hostAtoms.set(this, atom);
      }

      if (isForced) {
        isForced = false;
        atom.set(val, true);
        return;
      }

      atom.set(val);
    }
  };
}

memProp._r = [2];

function getKeyFromObj(params) {
  var keys = Object.keys(params).sort();
  var result = '';

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var _value = params[key];
    result += "." + key + ":" + (_typeof(_value) === 'object' ? JSON.stringify(_value) : _value);
  }

  return result;
}

getKeyFromObj._r = [2];

function getKey(params) {
  if (!params) return '';
  if (params instanceof Array) return JSON.stringify(params);
  if (_typeof(params) === 'object') return getKeyFromObj(params);
  return '' + params;
}

getKey._r = [2];

function memKeyMethod(proto, name, descr, normalize) {
  var handler = descr.value;

  if (handler === undefined) {
    throw new TypeError(name + " is not an function (rawKey: K, next?: V)");
  }

  proto[name + "$"] = handler;
  var hostAtoms = new WeakMap();
  Object.defineProperty(proto, name + "()", {
    get: function get$$1() {
      return hostAtoms.get(this);
    }
  });

  var forcedFn = function forcedFn(rawKey, next, force) {
    return this[name](rawKey, next, force === undefined ? true : force);
  };

  forcedFn._r = [2];
  setFunctionName(forcedFn, name + "*");
  proto[name + "*"] = forcedFn;
  return {
    enumerable: descr.enumerable,
    configurable: descr.configurable,
    value: function value(rawKey, next, force) {
      var atomMap = hostAtoms.get(this);

      if (atomMap === undefined) {
        atomMap = new Map();
        hostAtoms.set(this, atomMap);
      }

      var key = getKey(rawKey);
      var atom = atomMap.get(key);

      if (atom === undefined) {
        atom = new Atom(name, this, defaultContext, normalize, rawKey);
        atomMap.set(key, atom);
      }

      return next === undefined ? atom.get(force) : atom.set(next, force);
    }
  };
}

memKeyMethod._r = [2];

function memkey() {
  if (arguments.length === 3) {
    return memKeyMethod(arguments[0], arguments[1], arguments[2]);
  }

  var normalize = arguments[0];
  return function (proto, name, descr) {
    return memKeyMethod(proto, name, descr, normalize);
  };
}

memkey._r = [2];
var forceProxyOpts = {
  get: function get$$1(t, name) {
    var forceFn = t[name + "*"]; // is property or get/set magic ?

    if (forceFn === undefined) {
      isForced = true;
      return t[name];
    }

    return forceFn.bind(t);
  },
  set: function set$$1(t, name, val) {
    // is property or get/set magic ?
    if (t[name + "*"] === undefined) {
      isForced = true;
      t[name] = val;
      return true;
    }

    return false;
  }
};

function force(proto, name, descr) {
  var proxyMap = new WeakMap();
  return {
    enumerable: descr.enumerable,
    configurable: descr.configurable,
    get: function get$$1() {
      var proxy = proxyMap.get(this);

      if (proxy === undefined) {
        proxy = new Proxy(this, forceProxyOpts);
        proxyMap.set(this, proxy);
      }

      return proxy;
    }
  };
}

force._r = [2];

function detached(proto, name, descr) {
  return memMethod(proto, name, descr, undefined, true);
}

detached._r = [2];

function createActionMethod(t, hk, context) {
  function action() {
    var result = void 0;
    context.beginTransaction();

    switch (arguments.length) {
      case 0:
        result = t[hk]();
        break;

      case 1:
        result = t[hk](arguments[0]);
        break;

      case 2:
        result = t[hk](arguments[0], arguments[1]);
        break;

      case 3:
        result = t[hk](arguments[0], arguments[1], arguments[2]);
        break;

      case 4:
        result = t[hk](arguments[0], arguments[1], arguments[2], arguments[3]);
        break;

      case 5:
        result = t[hk](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        break;

      default:
        result = t[hk].apply(t, arguments);
    }

    context.endTransaction();
    return result;
  }

  setFunctionName(action, hk);
  return action;
}

createActionMethod._r = [2];

function createActionFn(fn, name, context) {
  function action() {
    var result = void 0;
    context.beginTransaction();

    switch (arguments.length) {
      case 0:
        result = fn();
        break;

      case 1:
        result = fn(arguments[0]);
        break;

      case 2:
        result = fn(arguments[0], arguments[1]);
        break;

      case 3:
        result = fn(arguments[0], arguments[1], arguments[2]);
        break;

      case 4:
        result = fn(arguments[0], arguments[1], arguments[2], arguments[3]);
        break;

      case 5:
        result = fn(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        break;

      default:
        result = fn.apply(null, arguments);
    }

    context.endTransaction();
    return result;
  }

  setFunctionName(action, name || fn.displayName || fn.name);
  return action;
}

createActionFn._r = [2];

function actionMethod(proto, field, descr, context) {
  var hk = field + "$";

  if (descr.value === undefined) {
    throw new TypeError(field + " is not an function (next?: V)");
  }

  proto[hk] = descr.value;
  var definingProperty = false;
  return {
    enumerable: descr.enumerable,
    configurable: descr.configurable,
    get: function get$$1() {
      if (definingProperty) {
        return this[hk];
      }

      definingProperty = true;
      var actionFn = createActionMethod(this, hk, context);
      Object.defineProperty(this, field, {
        configurable: true,
        value: actionFn
      });
      definingProperty = false;
      return actionFn;
    }
  };
}

actionMethod._r = [2];

function action() {
  if (arguments.length === 3) {
    return actionMethod(arguments[0], arguments[1], arguments[2], defaultContext);
  }

  return createActionFn(arguments[0], arguments[1], defaultContext);
}

action._r = [2];

function mem() {
  if (arguments.length === 3) {
    return arguments[2].value === undefined ? memProp(arguments[0], arguments[1], arguments[2]) : memMethod(arguments[0], arguments[1], arguments[2]);
  }

  var normalize = arguments[0];
  return function (proto, name, descr) {
    return descr.value === undefined ? memProp(proto, name, descr, normalize) : memMethod(proto, name, descr, normalize);
  };
}

mem._r = [2];

function props(proto, name, descr) {
  proto.constructor.__lom_prop = name;

  if (!descr.value && !descr.set) {
    descr.writable = true;
  }
}

props._r = [2];
mem.Wait = AtomWait;
mem.key = memkey;
mem.detached = detached;

var _typeof$2 = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var createClass$2 = function () {
  function defineProperties(target, props$$1) {
    for (var i = 0; i < props$$1.length; i++) {
      var descriptor = props$$1[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inheritsLoose$2 = function inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};

inheritsLoose$2._r = [2];

var _class2$1;

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

_applyDecoratedDescriptor$1._r = [2];

var FakeSheet = function () {
  function FakeSheet() {
    this.classes = {};
  }

  FakeSheet.prototype.update = function update(name, props$$1) {
    return this;
  };

  FakeSheet.prototype.attach = function attach() {
    return this;
  };

  FakeSheet.prototype.detach = function detach() {
    return this;
  };

  return FakeSheet;
}();

var defaultSheetProcessor = {
  createStyleSheet: function createStyleSheet(cssProps) {
    return new FakeSheet();
  },
  removeStyleSheet: function removeStyleSheet(sheet) {}
};
var SheetManager = (_class2$1 = function () {
  function SheetManager(sheetProcessor, injector) {
    this._sheetProcessor = sheetProcessor || defaultSheetProcessor;
    this._injector = injector;
  }

  SheetManager.prototype.sheet = function sheet(key, value, force$$1, oldValue) {
    if (value !== undefined) return value;

    if (oldValue !== undefined) {
      this._sheetProcessor.removeStyleSheet(oldValue); // oldValue.detach()

    }

    var newValue = this._sheetProcessor.createStyleSheet(this._injector.invoke(key));

    newValue.attach();
    return newValue;
  };

  SheetManager.prototype.destroy = function destroy(value) {
    this._sheetProcessor.removeStyleSheet(value); // value.detach()

  };

  return SheetManager;
}(), _applyDecoratedDescriptor$1(_class2$1.prototype, "sheet", [memkey], Object.getOwnPropertyDescriptor(_class2$1.prototype, "sheet"), _class2$1.prototype), _class2$1);
var depId = 0;

var Alias = function Alias(dest) {
  dest.__rdi_id = '' + ++depId;
  this.dest = dest;
};

Alias._r = [2];

var Injector = function () {
  function Injector(items, sheetProcessor, state, displayName, instance, cache) {
    this._resolved = false;
    this._listeners = undefined;
    this._state = state;
    this._instance = instance || 0;
    this.displayName = displayName || '$';
    this._sheetManager = sheetProcessor instanceof SheetManager ? sheetProcessor : new SheetManager(sheetProcessor, this);
    var map = this._cache = cache || Object.create(null);

    if (items !== undefined) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item instanceof Array) {
          var src = item[0];

          if (typeof src === 'string') {
            map[src] = item[1];
          } else {
            if (src.__rdi_id === undefined) {
              src.__rdi_id = '' + ++depId;
            }

            var dest = item[1];
            map[src.__rdi_id] = typeof dest === 'function' && !(dest instanceof Alias) ? new Alias(dest) : dest;
          }
        } else {
          var _src = item.constructor;

          if (_src.__rdi_id === undefined) {
            _src.__rdi_id = '' + ++depId;
          }

          map[_src.__rdi_id] = item;
        }
      }
    }
  }

  Injector.prototype.toString = function toString() {
    return this.displayName;
  };

  Injector.prototype.toJSON = function toJSON() {
    return this._cache;
  };

  Injector.prototype.value = function value(key) {
    var id = key.__rdi_id;

    if (key.__rdi_id === undefined) {
      id = key.__rdi_id = '' + ++depId;
    }

    var value = this._cache[id];

    if (value === undefined) {
      value = this._cache[id] = this.invoke(key);
      var depName = (key.displayName || key.name) + (this._instance > 0 ? '[' + this._instance + ']' : '');
      value.displayName = this.displayName + "." + depName;
      var state = this._state === undefined ? undefined : this._state[depName];

      if (state && _typeof$2(state) === 'object') {
        for (var prop in state) {
          value[prop] = state[prop];
        }
      }
    } else if (value instanceof Alias) {
      value = this._cache[id] = this.value(value.dest);
    }

    return value;
  };

  Injector.prototype.destroy = function destroy() {
    this._cache = undefined;
    this._listeners = undefined;
    this._sheetManager = undefined;
  };

  Injector.prototype.invoke = function invoke(key) {
    var isFn = key.theme;
    var deps = key.deps;

    if (key._r !== undefined) {
      isFn = key._r[0] === 2;
      deps = deps || key._r[1];
    }

    var a = this.resolve(deps);

    if (isFn) {
      switch (a.length) {
        case 0:
          return key();

        case 1:
          return key(a[0]);

        case 2:
          return key(a[0], a[1]);

        case 3:
          return key(a[0], a[1], a[2]);

        case 4:
          return key(a[0], a[1], a[2], a[3]);

        case 5:
          return key(a[0], a[1], a[2], a[3], a[4]);

        case 6:
          return key(a[0], a[1], a[2], a[3], a[4], a[5]);

        default:
          return key.apply(undefined, a);
      }
    }

    switch (a.length) {
      case 0:
        return new key();

      case 1:
        return new key(a[0]);

      case 2:
        return new key(a[0], a[1]);

      case 3:
        return new key(a[0], a[1], a[2]);

      case 4:
        return new key(a[0], a[1], a[2], a[3]);

      case 5:
        return new key(a[0], a[1], a[2], a[3], a[4]);

      case 6:
        return new key(a[0], a[1], a[2], a[3], a[4], a[5]);

      default:
        return new (Function.prototype.bind.apply(key, [null].concat(a)))();
    }
  };

  Injector.prototype.alias = function alias(key, rawId) {
    var id = rawId;

    if (id === undefined) {
      id = key.__rdi_id;

      if (id === undefined) {
        id = key.__rdi_id = '' + ++depId;
      }
    }

    var newKey = this._cache[id];
    if (newKey instanceof Alias) return newKey.dest;
    if (newKey === undefined) return key;
    return newKey;
  };

  Injector.prototype.invokeWithProps = function invokeWithProps(key, props$$1, propsChanged) {
    var deps = key.deps || (key._r === undefined ? undefined : key._r[1]);

    if (deps === undefined) {
      return key(props$$1);
    }

    var a = this.resolve(deps);

    if (propsChanged === true) {
      var listeners = this._listeners;

      if (listeners !== undefined) {
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener[listener.constructor.__lom_prop] = props$$1;
        }
      }
    }

    this._resolved = true;

    switch (a.length) {
      case 0:
        return key(props$$1);

      case 1:
        return key(props$$1, a[0]);

      case 2:
        return key(props$$1, a[0], a[1]);

      case 3:
        return key(props$$1, a[0], a[1], a[2]);

      case 4:
        return key(props$$1, a[0], a[1], a[2], a[3]);

      case 5:
        return key(props$$1, a[0], a[1], a[2], a[3], a[4]);

      case 6:
        return key(props$$1, a[0], a[1], a[2], a[3], a[4], a[5]);

      case 7:
        return key(props$$1, a[0], a[1], a[2], a[3], a[4], a[5], a[6]);

      default:
        return key.apply(undefined, [props$$1].concat(a));
    }
  };

  Injector.prototype.copy = function copy(items, displayName, instance) {
    return new Injector(items, this._sheetManager, this._state, this.displayName + '.' + displayName, instance, Object.create(this._cache));
  };

  Injector.prototype.resolve = function resolve(argDeps) {
    var result = [];
    if (argDeps !== undefined) {
      var sm = this._sheetManager;
      var resolved = this._resolved;

      for (var i = 0, l = argDeps.length; i < l; i++) {
        var argDep = argDeps[i];

        if (_typeof$2(argDep) === 'object') {
          var obj = {};

          if (!resolved) {
            for (var prop in argDep) {
              // eslint-disable-line
              var key = argDep[prop];

              if (key.theme !== undefined) {
                obj[prop] = sm.sheet(key).classes;
              }
            }
          }

          for (var _prop in argDep) {
            // eslint-disable-line
            var _key = argDep[_prop];
            var dep = _key.theme === undefined ? this.value(_key) : sm.sheet(_key).classes;

            if (resolved === false && _key.__lom_prop !== undefined) {
              if (this._listeners === undefined) {
                this._listeners = [];
              }

              this._listeners.push(dep);
            }

            obj[_prop] = dep;
          }

          result.push(obj);
        } else {
          var _dep = argDep.theme === undefined ? this.value(argDep) : sm.sheet(argDep).classes;

          if (resolved === false && argDep.__lom_prop !== undefined) {
            if (this._listeners === undefined) {
              this._listeners = [];
            }

            this._listeners.push(_dep);
          }

          result.push(_dep);
        }
      }
    }

    return result;
  };

  return Injector;
}();

function _applyDecoratedDescriptor$1$1(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

_applyDecoratedDescriptor$1$1._r = [2];
var parentContext = undefined;

function createCreateElement(atomize, createElement) {
  return function lomCreateElement() {
    var el = arguments[0];
    var attrs = arguments[1];
    var newEl = void 0;
    var isAtomic = typeof el === 'function' && el.constructor.render === undefined;
    var id = attrs ? attrs.id : undefined;

    if (isAtomic) {
      if (!attrs) {
        attrs = {
          __lom_ctx: parentContext
        };
      } else {
        attrs.__lom_ctx = parentContext;
      }

      if (parentContext !== undefined) {
        newEl = parentContext.alias(el, id);
        if (newEl === null) return null;
        if (newEl !== undefined) el = newEl;
      }

      if (el.__lom === undefined) {
        el.__lom = atomize(el);
      }

      newEl = el.__lom;
    } else {
      if (parentContext !== undefined && id) {
        newEl = parentContext.alias(el, id);
        if (newEl === null) return null;
        if (newEl !== undefined) el = newEl;
      }

      newEl = el;
    }

    switch (arguments.length) {
      case 2:
        return createElement(newEl, attrs);

      case 3:
        return createElement(newEl, attrs, arguments[2]);

      case 4:
        return createElement(newEl, attrs, arguments[2], arguments[3]);

      case 5:
        return createElement(newEl, attrs, arguments[2], arguments[3], arguments[4]);

      case 6:
        return createElement(newEl, attrs, arguments[2], arguments[3], arguments[4], arguments[5]);

      case 7:
        return createElement(newEl, attrs, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);

      case 8:
        return createElement(newEl, attrs, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);

      case 9:
        return createElement(newEl, attrs, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);

      default:
        if (isAtomic === false) {
          return createElement.apply(null, arguments);
        }

        var args = [newEl, attrs];

        for (var i = 2, l = arguments.length; i < l; i++) {
          args.push(arguments[i]);
        }

        return createElement.apply(null, args);
    }
  };
}

createCreateElement._r = [2];

function createReactWrapper(BaseComponent, defaultFromError) {
  var _class;

  var rootInjector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Injector();
  var AtomizedComponent = (_class = function (_BaseComponent) {
    inheritsLoose$2(AtomizedComponent, _BaseComponent);

    function AtomizedComponent(props$$1, reactContext) {
      var _this;

      _this = _BaseComponent.call(this, props$$1, reactContext) || this;
      _this._propsChanged = true;
      _this._el = undefined;
      _this._keys = props$$1 ? Object.keys(props$$1) : undefined;
      var cns = _this.constructor;
      _this._render = cns.render;
      _this._injector = (props$$1.__lom_ctx || rootInjector).copy(_this._render.aliases, cns.displayName + (cns.instance ? '[' + cns.instance + ']' : ''), cns.instance);
      cns.instance++;
      return _this;
    }

    AtomizedComponent.prototype.toString = function toString() {
      return this._injector.displayName;
    };

    AtomizedComponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(props$$1) {
      var keys = this._keys;
      if (!keys) return false;
      var oldProps = this.props;

      for (var i = 0, l = keys.length; i < l; i++) {
        // eslint-disable-line
        var k = keys[i];

        if (oldProps[k] !== props$$1[k]) {
          this._propsChanged = true;
          return true;
        }
      }

      return false;
    };

    AtomizedComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this['r()'].destroyed(true);
    };

    AtomizedComponent.prototype.destroy = function destroy() {
      this._el = undefined;
      this._keys = undefined;
      this.props = undefined;

      if (this._render !== undefined) {
        this.constructor.instance--;

        this._injector.destroy();

        this._injector = undefined;
      }
    };

    AtomizedComponent.prototype.r = function r(element, force$$1) {
      var data = void 0;
      var render = this._render;
      var prevContext = parentContext;
      parentContext = this._injector;

      try {
        data = parentContext.invokeWithProps(render, this.props, force$$1);
      } catch (error) {
        data = parentContext.invokeWithProps(render.onError || defaultFromError, {
          error: error
        });
      }

      parentContext = prevContext;

      if (!force$$1) {
        this._el = data;
        this.forceUpdate();
        this._el = undefined;
      }

      this._propsChanged = false;
      return data;
    };

    AtomizedComponent.prototype.render = function render() {
      return this._el === undefined ? this.r(undefined, this._propsChanged) : this._el;
    };

    createClass$2(AtomizedComponent, [{
      key: "displayName",
      get: function get$$1() {
        return this.toString();
      }
    }]);
    return AtomizedComponent;
  }(BaseComponent), _applyDecoratedDescriptor$1$1(_class.prototype, "r", [detached], Object.getOwnPropertyDescriptor(_class.prototype, "r"), _class.prototype), _class);
  return function reactWrapper(render) {
    var WrappedComponent = function WrappedComponent(props$$1, context) {
      AtomizedComponent.call(this, props$$1, context);
    };

    WrappedComponent._r = [2];
    WrappedComponent.instance = 0;
    WrappedComponent.render = render;
    WrappedComponent.displayName = render.displayName || render.name;
    WrappedComponent.prototype = Object.create(AtomizedComponent.prototype);
    WrappedComponent.prototype.constructor = WrappedComponent;
    return WrappedComponent;
  };
}

createReactWrapper._r = [2];

function dn(fn) {
  if (!fn) return 'null';

  if (_typeof$2(fn) === 'object') {
    var cons = fn.constructor;
    return cons.displayName || cons.name;
  }

  if (typeof fn === 'function') {
    return fn.displayName || fn.name;
  }

  return String(fn);
}

dn._r = [2];

function provideMap(item) {
  return item instanceof Array ? "[" + dn(item[0]) + ", " + dn(item[1]) + "]" : dn(item);
}

provideMap._r = [2];

function cloneComponent(fn, aliases, name) {
  var cloned = function cloned() {
    switch (arguments.length) {
      case 1:
        return fn(arguments[0]);

      case 2:
        return fn(arguments[0], arguments[1]);

      case 3:
        return fn(arguments[0], arguments[1], arguments[2]);

      case 4:
        return fn(arguments[0], arguments[1], arguments[2], arguments[3]);

      case 5:
        return fn(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);

      default:
        return fn.apply(null, arguments);
    }
  };

  cloned._r = [2];
  cloned.deps = fn.deps;
  cloned._r = fn._r;
  cloned.aliases = fn.aliases ? fn.aliases.concat(aliases) : aliases;
  cloned.displayName = name || "cloneComponent(" + dn(fn) + ", [" + aliases.map(provideMap).join(', ') + "])";
  return cloned;
}

cloneComponent._r = [2];

/** Virtual DOM Node */
function VNode() {}
/** Global options
 *	@public
 *	@namespace options {Object}
 */


VNode._r = [2];
var options = {
  /** If `true`, `prop` changes trigger synchronous component updates.
   *	@name syncComponentUpdates
   *	@type Boolean
   *	@default true
   */
  //syncComponentUpdates: true,

  /** Processes all created VNodes.
   *	@param {VNode} vnode	A newly-created VNode to normalize/process
   */
  //vnode(vnode) { }

  /** Hook invoked after a component is mounted. */
  // afterMount(component) { }

  /** Hook invoked after the DOM is updated with a component's latest render. */
  // afterUpdate(component) { }

  /** Hook invoked immediately before a component is unmounted. */
  // beforeUnmount(component) { }
};
var stack = [];
var EMPTY_CHILDREN = [];
/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */

function h(nodeName, attributes) {
  var children = EMPTY_CHILDREN,
      lastSimple,
      child,
      simple,
      i;

  for (i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }

  if (attributes && attributes.children != null) {
    if (!stack.length) stack.push(attributes.children);
    delete attributes.children;
  }

  while (stack.length) {
    if ((child = stack.pop()) && child.pop !== undefined) {
      for (i = child.length; i--;) {
        stack.push(child[i]);
      }
    } else {
      if (typeof child === 'boolean') child = null;

      if (simple = typeof nodeName !== 'function') {
        if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
      }

      if (simple && lastSimple) {
        children[children.length - 1] += child;
      } else if (children === EMPTY_CHILDREN) {
        children = [child];
      } else {
        children.push(child);
      }

      lastSimple = simple;
    }
  }

  var p = new VNode();
  p.nodeName = nodeName;
  p.children = children;
  p.attributes = attributes == null ? undefined : attributes;
  p.key = attributes == null ? undefined : attributes.key; // if a "vnode hook" is defined, pass every created VNode to it

  if (options.vnode !== undefined) options.vnode(p);
  return p;
}
/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */


h._r = [2];

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }

  return obj;
}
/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */


extend._r = [2];
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
} // DOM properties that should NOT have "px" added when numeric


cloneElement._r = [2];
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
  if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
    (options.debounceRendering || defer)(rerender);
  }
}

enqueueRender._r = [2];

function rerender() {
  var p,
      list = items;
  items = [];

  while (p = list.pop()) {
    if (p._dirty) renderComponent(p);
  }
}
/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */


rerender._r = [2];

function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }

  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }

  return hydrating || node._componentConstructor === vnode.nodeName;
}
/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */


isSameNodeType._r = [2];

function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}
/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */


isNamedNode._r = [2];

function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;
  var defaultProps = vnode.nodeName.defaultProps;

  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}
/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */


getNodeProps._r = [2];

function createNode(nodeName, isSvg) {
  var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
  node.normalizedNodeName = nodeName;
  return node;
}
/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */


createNode._r = [2];

function removeNode(node) {
  var parentNode = node.parentNode;
  if (parentNode) parentNode.removeChild(node);
}
/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */


removeNode._r = [2];

function setAccessor(node, name, old, value, isSvg) {
  if (name === 'className') name = 'class';

  if (name === 'key') {// ignore
  } else if (name === 'ref') {
    if (old) old(null);
    if (value) value(node);
  } else if (name === 'class' && !isSvg) {
    node.className = value || '';
  } else if (name === 'style') {
    if (!value || typeof value === 'string' || typeof old === 'string') {
      node.style.cssText = value || '';
    }

    if (value && _typeof$1(value) === 'object') {
      if (typeof old !== 'string') {
        for (var i in old) {
          if (!(i in value)) node.style[i] = '';
        }
      }

      for (var i in value) {
        node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
      }
    }
  } else if (name === 'dangerouslySetInnerHTML') {
    if (value) node.innerHTML = value.__html || '';
  } else if (name[0] == 'o' && name[1] == 'n') {
    var useCapture = name !== (name = name.replace(/Capture$/, ''));
    name = name.toLowerCase().substring(2);

    if (value) {
      if (!old) node.addEventListener(name, eventProxy, useCapture);
    } else {
      node.removeEventListener(name, eventProxy, useCapture);
    }

    (node._listeners || (node._listeners = {}))[name] = value;
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
    setProperty(node, name, value == null ? '' : value);
    if (value == null || value === false) node.removeAttribute(name);
  } else {
    var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));

    if (value == null || value === false) {
      if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
    } else if (typeof value !== 'function') {
      if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
    }
  }
}
/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */


setAccessor._r = [2];

function setProperty(node, name, value) {
  try {
    node[name] = value;
  } catch (e) {}
}
/** Proxy an event to hooked event handlers
 *	@private
 */


setProperty._r = [2];

function eventProxy(e) {
  return this._listeners[e.type](options.event && options.event(e) || e);
}
/** Queue of components that have been mounted and are awaiting componentDidMount */


eventProxy._r = [2];
var mounts = [];
/** Diff recursion count, used to track the end of the diff cycle. */

var diffLevel = 0;
/** Global flag indicating if the diff is currently within an SVG */

var isSvgMode = false;
/** Global flag indicating if the diff is performing hydration */

var hydrating = false;
/** Invoke queued componentDidMount lifecycle methods */

function flushMounts() {
  var c;

  while (c = mounts.pop()) {
    if (options.afterMount) options.afterMount(c);
    if (c.componentDidMount) c.componentDidMount();
  }
}
/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */


flushMounts._r = [2];

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
  // diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
  if (!diffLevel++) {
    // when first starting the diff, check if we're diffing an SVG or within an SVG
    isSvgMode = parent != null && parent.ownerSVGElement !== undefined; // hydration is indicated by the existing element to be diffed not having a prop cache

    hydrating = dom != null && !('__preactattr_' in dom);
  }

  var ret = idiff(dom, vnode, context, mountAll, componentRoot); // append the element if its a new parent

  if (parent && ret.parentNode !== parent) parent.appendChild(ret); // diffLevel being reduced to 0 means we're exiting the diff

  if (! --diffLevel) {
    hydrating = false; // invoke queued componentDidMount lifecycle methods

    if (!componentRoot) flushMounts();
  }

  return ret;
}
/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */


diff._r = [2];

function idiff(dom, vnode, context, mountAll, componentRoot) {
  var out = dom,
      prevSvgMode = isSvgMode; // empty values (null, undefined, booleans) render as empty Text nodes

  if (vnode == null || typeof vnode === 'boolean') vnode = ''; // Fast case: Strings & Numbers create/update Text nodes.

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    // update if it's already a Text node:
    if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
      /* istanbul ignore if */

      /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
      if (dom.nodeValue != vnode) {
        dom.nodeValue = vnode;
      }
    } else {
      // it wasn't a Text node: replace it with one and recycle the old Element
      out = document.createTextNode(vnode);

      if (dom) {
        if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
        recollectNodeTree(dom, true);
      }
    }

    out['__preactattr_'] = true;
    return out;
  } // If the VNode represents a Component, perform a component diff:


  var vnodeName = vnode.nodeName;

  if (typeof vnodeName === 'function') {
    return buildComponentFromVNode(dom, vnode, context, mountAll);
  } // Tracks entering and exiting SVG namespace when descending through the tree.


  isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode; // If there's no existing element or it's the wrong type, create a new one:

  vnodeName = String(vnodeName);

  if (!dom || !isNamedNode(dom, vnodeName)) {
    out = createNode(vnodeName, isSvgMode);

    if (dom) {
      // move children into the replacement node
      while (dom.firstChild) {
        out.appendChild(dom.firstChild);
      } // if the previous Element was mounted into the DOM, replace it inline


      if (dom.parentNode) dom.parentNode.replaceChild(out, dom); // recycle the old element (skips non-Element node types)

      recollectNodeTree(dom, true);
    }
  }

  var fc = out.firstChild,
      props = out['__preactattr_'],
      vchildren = vnode.children;

  if (props == null) {
    props = out['__preactattr_'] = {};

    for (var a = out.attributes, i = a.length; i--;) {
      props[a[i].name] = a[i].value;
    }
  } // Optimization: fast-path for elements containing a single TextNode:


  if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
    if (fc.nodeValue != vchildren[0]) {
      fc.nodeValue = vchildren[0];
    }
  } // otherwise, if there are existing or new children, diff them:
  else if (vchildren && vchildren.length || fc != null) {
      innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
    } // Apply attributes/props from VNode to the DOM Element:


  diffAttributes(out, vnode.attributes, props); // restore previous SVG mode: (in case we're exiting an SVG namespace)

  isSvgMode = prevSvgMode;
  return out;
}
/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */


idiff._r = [2];

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
  var originalChildren = dom.childNodes,
      children = [],
      keyed = {},
      keyedLen = 0,
      min = 0,
      len = originalChildren.length,
      childrenLen = 0,
      vlen = vchildren ? vchildren.length : 0,
      j,
      c,
      f,
      vchild,
      child; // Build up a map of keyed children and an Array of unkeyed children:

  if (len !== 0) {
    for (var i = 0; i < len; i++) {
      var _child = originalChildren[i],
          props = _child['__preactattr_'],
          key = vlen && props ? _child._component ? _child._component.__key : props.key : null;

      if (key != null) {
        keyedLen++;
        keyed[key] = _child;
      } else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
        children[childrenLen++] = _child;
      }
    }
  }

  if (vlen !== 0) {
    for (var i = 0; i < vlen; i++) {
      vchild = vchildren[i];
      child = null; // attempt to find a node based on key matching

      var key = vchild.key;

      if (key != null) {
        if (keyedLen && keyed[key] !== undefined) {
          child = keyed[key];
          keyed[key] = undefined;
          keyedLen--;
        }
      } // attempt to pluck a node of the same type from the existing children
      else if (!child && min < childrenLen) {
          for (j = min; j < childrenLen; j++) {
            if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
              child = c;
              children[j] = undefined;
              if (j === childrenLen - 1) childrenLen--;
              if (j === min) min++;
              break;
            }
          }
        } // morph the matched/found/created DOM child to match vchild (deep)


      child = idiff(child, vchild, context, mountAll);
      f = originalChildren[i];

      if (child && child !== dom && child !== f) {
        if (f == null) {
          dom.appendChild(child);
        } else if (child === f.nextSibling) {
          removeNode(f);
        } else {
          dom.insertBefore(child, f);
        }
      }
    }
  } // remove unused keyed children:


  if (keyedLen) {
    for (var i in keyed) {
      if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
    }
  } // remove orphaned unkeyed children:


  while (min <= childrenLen) {
    if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
  }
}
/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */


innerDiffNode._r = [2];

function recollectNodeTree(node, unmountOnly) {
  var component = node._component;

  if (component) {
    // if node is owned by a Component, unmount that component (ends up recursing back here)
    unmountComponent(component);
  } else {
    // If the node's VNode had a ref function, invoke it with null here.
    // (this is part of the React spec, and smart for unsetting references)
    if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

    if (unmountOnly === false || node['__preactattr_'] == null) {
      removeNode(node);
    }

    removeChildren(node);
  }
}
/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */


recollectNodeTree._r = [2];

function removeChildren(node) {
  node = node.lastChild;

  while (node) {
    var next = node.previousSibling;
    recollectNodeTree(node, true);
    node = next;
  }
}
/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */


removeChildren._r = [2];

function diffAttributes(dom, attrs, old) {
  var name; // remove attributes no longer present on the vnode by setting them to undefined

  for (name in old) {
    if (!(attrs && attrs[name] != null) && old[name] != null) {
      setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
    }
  } // add new & update changed attributes


  for (name in attrs) {
    if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
      setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
  }
}
/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */


diffAttributes._r = [2];
var components = {};
/** Reclaim a component for later re-use by the recycler. */

function collectComponent(component) {
  var name = component.constructor.name;
  (components[name] || (components[name] = [])).push(component);
}
/** Create a component. Normalizes differences between PFC's and classful Components. */


collectComponent._r = [2];

function createComponent(Ctor, props, context) {
  var list = components[Ctor.name],
      inst;

  if (Ctor.prototype && Ctor.prototype.render) {
    inst = new Ctor(props, context);
    Component.call(inst, props, context);
  } else {
    inst = new Component(props, context);
    inst.constructor = Ctor;
    inst.render = doRender;
  }

  if (list) {
    for (var i = list.length; i--;) {
      if (list[i].constructor === Ctor) {
        inst.nextBase = list[i].nextBase;
        list.splice(i, 1);
        break;
      }
    }
  }

  return inst;
}
/** The `.render()` method for a PFC backing instance. */


createComponent._r = [2];

function doRender(props, state, context) {
  return this.constructor(props, context);
}
/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */


doRender._r = [2];

function setComponentProps(component, props, opts, context, mountAll) {
  if (component._disable) return;
  component._disable = true;
  if (component.__ref = props.ref) delete props.ref;
  if (component.__key = props.key) delete props.key;

  if (!component.base || mountAll) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props, context);
  }

  if (context && context !== component.context) {
    if (!component.prevContext) component.prevContext = component.context;
    component.context = context;
  }

  if (!component.prevProps) component.prevProps = component.props;
  component.props = props;
  component._disable = false;

  if (opts !== 0) {
    if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
      renderComponent(component, 1, mountAll);
    } else {
      enqueueRender(component);
    }
  }

  if (component.__ref) component.__ref(component);
}
/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */


setComponentProps._r = [2];

function renderComponent(component, opts, mountAll, isChild) {
  if (component._disable) return;
  var props = component.props,
      state = component.state,
      context = component.context,
      previousProps = component.prevProps || props,
      previousState = component.prevState || state,
      previousContext = component.prevContext || context,
      isUpdate = component.base,
      nextBase = component.nextBase,
      initialBase = isUpdate || nextBase,
      initialChildComponent = component._component,
      skip = false,
      rendered,
      inst,
      cbase; // if updating

  if (isUpdate) {
    component.props = previousProps;
    component.state = previousState;
    component.context = previousContext;

    if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
      skip = true;
    } else if (component.componentWillUpdate) {
      component.componentWillUpdate(props, state, context);
    }

    component.props = props;
    component.state = state;
    component.context = context;
  }

  component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
  component._dirty = false;

  if (!skip) {
    rendered = component.render(props, state, context); // context to pass to the child, can be updated via (grand-)parent component

    if (component.getChildContext) {
      context = extend(extend({}, context), component.getChildContext());
    }

    var childComponent = rendered && rendered.nodeName,
        toUnmount,
        base;

    if (typeof childComponent === 'function') {
      // set up high order component link
      var childProps = getNodeProps(rendered);
      inst = initialChildComponent;

      if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
        setComponentProps(inst, childProps, 1, context, false);
      } else {
        toUnmount = inst;
        component._component = inst = createComponent(childComponent, childProps, context);
        inst.nextBase = inst.nextBase || nextBase;
        inst._parentComponent = component;
        setComponentProps(inst, childProps, 0, context, false);
        renderComponent(inst, 1, mountAll, true);
      }

      base = inst.base;
    } else {
      cbase = initialBase; // destroy high order component link

      toUnmount = initialChildComponent;

      if (toUnmount) {
        cbase = component._component = null;
      }

      if (initialBase || opts === 1) {
        if (cbase) cbase._component = null;
        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
      }
    }

    if (initialBase && base !== initialBase && inst !== initialChildComponent) {
      var baseParent = initialBase.parentNode;

      if (baseParent && base !== baseParent) {
        baseParent.replaceChild(base, initialBase);

        if (!toUnmount) {
          initialBase._component = null;
          recollectNodeTree(initialBase, false);
        }
      }
    }

    if (toUnmount) {
      unmountComponent(toUnmount);
    }

    component.base = base;

    if (base && !isChild) {
      var componentRef = component,
          t = component;

      while (t = t._parentComponent) {
        (componentRef = t).base = base;
      }

      base._component = componentRef;
      base._componentConstructor = componentRef.constructor;
    }
  }

  if (!isUpdate || mountAll) {
    mounts.unshift(component);
  } else if (!skip) {
    // Ensure that pending componentDidMount() hooks of child components
    // are called before the componentDidUpdate() hook in the parent.
    // Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
    // flushMounts();
    if (component.componentDidUpdate) {
      component.componentDidUpdate(previousProps, previousState, previousContext);
    }

    if (options.afterUpdate) options.afterUpdate(component);
  }

  if (component._renderCallbacks != null) {
    while (component._renderCallbacks.length) {
      component._renderCallbacks.pop().call(component);
    }
  }

  if (!diffLevel && !isChild) flushMounts();
}
/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */


renderComponent._r = [2];

function buildComponentFromVNode(dom, vnode, context, mountAll) {
  var c = dom && dom._component,
      originalComponent = c,
      oldDom = dom,
      isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
      isOwner = isDirectOwner,
      props = getNodeProps(vnode);

  while (c && !isOwner && (c = c._parentComponent)) {
    isOwner = c.constructor === vnode.nodeName;
  }

  if (c && isOwner && (!mountAll || c._component)) {
    setComponentProps(c, props, 3, context, mountAll);
    dom = c.base;
  } else {
    if (originalComponent && !isDirectOwner) {
      unmountComponent(originalComponent);
      dom = oldDom = null;
    }

    c = createComponent(vnode.nodeName, props, context);

    if (dom && !c.nextBase) {
      c.nextBase = dom; // passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:

      oldDom = null;
    }

    setComponentProps(c, props, 1, context, mountAll);
    dom = c.base;

    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      recollectNodeTree(oldDom, false);
    }
  }

  return dom;
}
/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */


buildComponentFromVNode._r = [2];

function unmountComponent(component) {
  if (options.beforeUnmount) options.beforeUnmount(component);
  var base = component.base;
  component._disable = true;
  if (component.componentWillUnmount) component.componentWillUnmount();
  component.base = null; // recursively tear down & recollect high-order component children:

  var inner = component._component;

  if (inner) {
    unmountComponent(inner);
  } else if (base) {
    if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);
    component.nextBase = base;
    removeNode(base);
    collectComponent(component);
    removeChildren(base);
  }

  if (component.__ref) component.__ref(null);
}
/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */


unmountComponent._r = [2];

function Component(props, context) {
  this._dirty = true;
  /** @public
   *	@type {object}
   */

  this.context = context;
  /** @public
   *	@type {object}
   */

  this.props = props;
  /** @public
   *	@type {object}
   */

  this.state = this.state || {};
}

Component._r = [2];
extend(Component.prototype, {
  /** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
   *	@param {object} nextProps
   *	@param {object} nextState
   *	@param {object} nextContext
   *	@returns {Boolean} should the component re-render
   *	@name shouldComponentUpdate
   *	@function
   */

  /** Update component state by copying properties from `state` to `this.state`.
   *	@param {object} state		A hash of state properties to update with new values
   *	@param {function} callback	A function to be called once component state is updated
   */
  setState: function setState(state, callback) {
    var s = this.state;
    if (!this.prevState) this.prevState = extend({}, s);
    extend(s, typeof state === 'function' ? state(s, this.props) : state);
    if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
    enqueueRender(this);
  },

  /** Immediately perform a synchronous re-render of the component.
   *	@param {function} callback		A function to be called after component is re-rendered.
   *	@private
   */
  forceUpdate: function forceUpdate(callback) {
    if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
    renderComponent(this, 2);
  },

  /** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
   *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
   *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
   *	@param {object} state		The component's current state
   *	@param {object} context		Context object (if a parent component has provided context)
   *	@returns VNode
   */
  render: function render() {}
});
/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

render._r = [2];
var preact = {
  h: h,
  createElement: h,
  cloneElement: cloneElement,
  Component: Component,
  render: render,
  rerender: rerender,
  options: options
};


var preact_esm = Object.freeze({
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options,
	default: preact
});

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var require$$0 = ( preact_esm && preact ) || preact_esm;

var devtools = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    factory(require$$0);
  })(commonjsGlobal, function (preact) {
    'use strict'; // render modes

    var ATTR_KEY = '__preactattr_'; // DOM properties that should NOT have "px" added when numeric

    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    // Internal helpers from preact

    /**
     * Return a ReactElement-compatible object for the current state of a preact
     * component.
     */

    function createReactElement(component) {
      return {
        type: component.constructor,
        key: component.key,
        ref: null,
        // Unsupported
        props: component.props
      };
    }
    /**
     * Create a ReactDOMComponent-compatible object for a given DOM node rendered
     * by preact.
     *
     * This implements the subset of the ReactDOMComponent interface that
     * React DevTools requires in order to display DOM nodes in the inspector with
     * the correct type and properties.
     *
     * @param {Node} node
     */


    function createReactDOMComponent(node) {
      var childNodes = node.nodeType === Node.ELEMENT_NODE ? Array.from(node.childNodes) : [];
      var isText = node.nodeType === Node.TEXT_NODE;
      return {
        // --- ReactDOMComponent interface
        _currentElement: isText ? node.textContent : {
          type: node.nodeName.toLowerCase(),
          props: node[ATTR_KEY]
        },
        _renderedChildren: childNodes.map(function (child) {
          if (child._component) {
            return updateReactComponent(child._component);
          }

          return updateReactComponent(child);
        }),
        _stringText: isText ? node.textContent : null,
        // --- Additional properties used by preact devtools
        // A flag indicating whether the devtools have been notified about the
        // existence of this component instance yet.
        // This is used to send the appropriate notifications when DOM components
        // are added or updated between composite component updates.
        _inDevTools: false,
        node: node
      };
    }
    /**
     * Return the name of a component created by a `ReactElement`-like object.
     *
     * @param {ReactElement} element
     */


    function typeName(element) {
      if (typeof element.type === 'function') {
        return element.type.displayName || element.type.name;
      }

      return element.type;
    }
    /**
     * Return a ReactCompositeComponent-compatible object for a given preact
     * component instance.
     *
     * This implements the subset of the ReactCompositeComponent interface that
     * the DevTools requires in order to walk the component tree and inspect the
     * component's properties.
     *
     * See https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/getData.js
     */


    function createReactCompositeComponent(component) {
      var _currentElement = createReactElement(component);

      var node = component.base;
      var instance = {
        // --- ReactDOMComponent properties
        getName: function getName() {
          return typeName(_currentElement);
        },
        _currentElement: createReactElement(component),
        props: component.props,
        state: component.state,
        forceUpdate: component.forceUpdate && component.forceUpdate.bind(component),
        setState: component.setState && component.setState.bind(component),
        // --- Additional properties used by preact devtools
        node: node
      }; // React DevTools exposes the `_instance` field of the selected item in the
      // component tree as `$r` in the console.  `_instance` must refer to a
      // React Component (or compatible) class instance with `props` and `state`
      // fields and `setState()`, `forceUpdate()` methods.

      instance._instance = component; // If the root node returned by this component instance's render function
      // was itself a composite component, there will be a `_component` property
      // containing the child component instance.

      if (component._component) {
        instance._renderedComponent = updateReactComponent(component._component);
      } else {
        // Otherwise, if the render() function returned an HTML/SVG element,
        // create a ReactDOMComponent-like object for the DOM node itself.
        instance._renderedComponent = updateReactComponent(node);
      }

      return instance;
    }
    /**
     * Map of Component|Node to ReactDOMComponent|ReactCompositeComponent-like
     * object.
     *
     * The same React*Component instance must be used when notifying devtools
     * about the initial mount of a component and subsequent updates.
     */


    var instanceMap = typeof Map === 'function' && new Map();
    /**
     * Update (and create if necessary) the ReactDOMComponent|ReactCompositeComponent-like
     * instance for a given preact component instance or DOM Node.
     *
     * @param {Component|Node} componentOrNode
     */

    function updateReactComponent(componentOrNode) {
      var newInstance = componentOrNode instanceof Node ? createReactDOMComponent(componentOrNode) : createReactCompositeComponent(componentOrNode);

      if (instanceMap.has(componentOrNode)) {
        var inst = instanceMap.get(componentOrNode);
        Object.assign(inst, newInstance);
        return inst;
      }

      instanceMap.set(componentOrNode, newInstance);
      return newInstance;
    }

    function nextRootKey(roots) {
      return '.' + Object.keys(roots).length;
    }
    /**
     * Find all root component instances rendered by preact in `node`'s children
     * and add them to the `roots` map.
     *
     * @param {DOMElement} node
     * @param {[key: string] => ReactDOMComponent|ReactCompositeComponent}
     */


    function findRoots(node, roots) {
      Array.from(node.childNodes).forEach(function (child) {
        if (child._component) {
          roots[nextRootKey(roots)] = updateReactComponent(child._component);
        } else {
          findRoots(child, roots);
        }
      });
    }
    /**
     * Create a bridge for exposing preact's component tree to React DevTools.
     *
     * It creates implementations of the interfaces that ReactDOM passes to
     * devtools to enable it to query the component tree and hook into component
     * updates.
     *
     * See https://github.com/facebook/react/blob/59ff7749eda0cd858d5ee568315bcba1be75a1ca/src/renderers/dom/ReactDOM.js
     * for how ReactDOM exports its internals for use by the devtools and
     * the `attachRenderer()` function in
     * https://github.com/facebook/react-devtools/blob/e31ec5825342eda570acfc9bcb43a44258fceb28/backend/attachRenderer.js
     * for how the devtools consumes the resulting objects.
     */


    function createDevToolsBridge() {
      // The devtools has different paths for interacting with the renderers from
      // React Native, legacy React DOM and current React DOM.
      //
      // Here we emulate the interface for the current React DOM (v15+) lib.
      // ReactDOMComponentTree-like object
      var ComponentTree = {
        getNodeFromInstance: function getNodeFromInstance(instance) {
          return instance.node;
        },
        getClosestInstanceFromNode: function getClosestInstanceFromNode(node) {
          while (node && !node._component) {
            node = node.parentNode;
          }

          return node ? updateReactComponent(node._component) : null;
        }
      }; // Map of root ID (the ID is unimportant) to component instance.

      var roots = {};
      findRoots(document.body, roots); // ReactMount-like object
      //
      // Used by devtools to discover the list of root component instances and get
      // notified when new root components are rendered.

      var Mount = {
        _instancesByReactRootID: roots,
        // Stub - React DevTools expects to find this method and replace it
        // with a wrapper in order to observe new root components being added
        _renderNewRootComponent: function _renderNewRootComponent()
        /* instance, ... */
        {}
      }; // ReactReconciler-like object

      var Reconciler = {
        // Stubs - React DevTools expects to find these methods and replace them
        // with wrappers in order to observe components being mounted, updated and
        // unmounted
        mountComponent: function mountComponent()
        /* instance, ... */
        {},
        performUpdateIfNecessary: function performUpdateIfNecessary()
        /* instance, ... */
        {},
        receiveComponent: function receiveComponent()
        /* instance, ... */
        {},
        unmountComponent: function unmountComponent()
        /* instance, ... */
        {}
      };
      /** Notify devtools that a new component instance has been mounted into the DOM. */

      var componentAdded = function componentAdded(component) {
        var instance = updateReactComponent(component);

        if (isRootComponent(component)) {
          instance._rootID = nextRootKey(roots);
          roots[instance._rootID] = instance;

          Mount._renderNewRootComponent(instance);
        }

        visitNonCompositeChildren(instance, function (childInst) {
          childInst._inDevTools = true;
          Reconciler.mountComponent(childInst);
        });
        Reconciler.mountComponent(instance);
      };
      /** Notify devtools that a component has been updated with new props/state. */


      componentAdded._r = [2];

      var componentUpdated = function componentUpdated(component) {
        var prevRenderedChildren = [];
        visitNonCompositeChildren(instanceMap.get(component), function (childInst) {
          prevRenderedChildren.push(childInst);
        }); // Notify devtools about updates to this component and any non-composite
        // children

        var instance = updateReactComponent(component);
        Reconciler.receiveComponent(instance);
        visitNonCompositeChildren(instance, function (childInst) {
          if (!childInst._inDevTools) {
            // New DOM child component
            childInst._inDevTools = true;
            Reconciler.mountComponent(childInst);
          } else {
            // Updated DOM child component
            Reconciler.receiveComponent(childInst);
          }
        }); // For any non-composite children that were removed by the latest render,
        // remove the corresponding ReactDOMComponent-like instances and notify
        // the devtools

        prevRenderedChildren.forEach(function (childInst) {
          if (!document.body.contains(childInst.node)) {
            instanceMap.delete(childInst.node);
            Reconciler.unmountComponent(childInst);
          }
        });
      };
      /** Notify devtools that a component has been unmounted from the DOM. */


      componentUpdated._r = [2];

      var componentRemoved = function componentRemoved(component) {
        var instance = updateReactComponent(component);
        visitNonCompositeChildren(function (childInst) {
          instanceMap.delete(childInst.node);
          Reconciler.unmountComponent(childInst);
        });
        Reconciler.unmountComponent(instance);
        instanceMap.delete(component);

        if (instance._rootID) {
          delete roots[instance._rootID];
        }
      };

      componentRemoved._r = [2];
      return {
        componentAdded: componentAdded,
        componentUpdated: componentUpdated,
        componentRemoved: componentRemoved,
        // Interfaces passed to devtools via __REACT_DEVTOOLS_GLOBAL_HOOK__.inject()
        ComponentTree: ComponentTree,
        Mount: Mount,
        Reconciler: Reconciler
      };
    }
    /**
     * Return `true` if a preact component is a top level component rendered by
     * `render()` into a container Element.
     */


    function isRootComponent(component) {
      // `_parentComponent` is actually `__u` after minification
      if (component._parentComponent || component.__u) {
        // Component with a composite parent
        return false;
      }

      if (component.base.parentElement && component.base.parentElement[ATTR_KEY]) {
        // Component with a parent DOM element rendered by Preact
        return false;
      }

      return true;
    }
    /**
     * Visit all child instances of a ReactCompositeComponent-like object that are
     * not composite components (ie. they represent DOM elements or text)
     *
     * @param {Component} component
     * @param {(Component) => void} visitor
     */


    function visitNonCompositeChildren(component, visitor) {
      if (component._renderedComponent) {
        if (!component._renderedComponent._component) {
          visitor(component._renderedComponent);
          visitNonCompositeChildren(component._renderedComponent, visitor);
        }
      } else if (component._renderedChildren) {
        component._renderedChildren.forEach(function (child) {
          visitor(child);
          if (!child._component) visitNonCompositeChildren(child, visitor);
        });
      }
    }
    /**
     * Create a bridge between the preact component tree and React's dev tools
     * and register it.
     *
     * After this function is called, the React Dev Tools should be able to detect
     * "React" on the page and show the component tree.
     *
     * This function hooks into preact VNode creation in order to expose functional
     * components correctly, so it should be called before the root component(s)
     * are rendered.
     *
     * Returns a cleanup function which unregisters the hooks.
     */


    function initDevTools() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        // React DevTools are not installed
        return;
      } // Notify devtools when preact components are mounted, updated or unmounted


      var bridge = createDevToolsBridge();
      var nextAfterMount = preact.options.afterMount;

      preact.options.afterMount = function (component) {
        bridge.componentAdded(component);
        if (nextAfterMount) nextAfterMount(component);
      };

      var nextAfterUpdate = preact.options.afterUpdate;

      preact.options.afterUpdate = function (component) {
        bridge.componentUpdated(component);
        if (nextAfterUpdate) nextAfterUpdate(component);
      };

      var nextBeforeUnmount = preact.options.beforeUnmount;

      preact.options.beforeUnmount = function (component) {
        bridge.componentRemoved(component);
        if (nextBeforeUnmount) nextBeforeUnmount(component);
      }; // Notify devtools about this instance of "React"


      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(bridge);

      return function () {
        preact.options.afterMount = nextAfterMount;
        preact.options.afterUpdate = nextAfterUpdate;
        preact.options.beforeUnmount = nextBeforeUnmount;
      };
    }

    initDevTools();
  }); //# sourceMappingURL=devtools.js.map

});

var getDynamicStyles = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof$1(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
  };
  /**
   * Extracts a styles object with only props that contain function values.
   */


  exports['default'] = function (styles) {
    // eslint-disable-next-line no-shadow
    function extract(styles) {
      var to = null;

      for (var key in styles) {
        var value = styles[key];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (type === 'function') {
          if (!to) to = {};
          to[key] = value;
        } else if (type === 'object' && value !== null && !Array.isArray(value)) {
          var extracted = extract(value);

          if (extracted) {
            if (!to) to = {};
            to[key] = extracted;
          }
        }
      }

      return to;
    }

    return extract(styles);
  };
});
unwrapExports(getDynamicStyles);

var SheetsRegistry_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * Sheets registry to access them all at one place.
   */


  var SheetsRegistry = function () {
    function SheetsRegistry() {
      _classCallCheck(this, SheetsRegistry);

      this.registry = [];
    }

    _createClass(SheetsRegistry, [{
      key: 'add',

      /**
       * Register a Style Sheet.
       */
      value: function add(sheet) {
        var registry = this.registry;
        var index = sheet.options.index;
        if (registry.indexOf(sheet) !== -1) return;

        if (registry.length === 0 || index >= this.index) {
          registry.push(sheet);
          return;
        } // Find a position.


        for (var i = 0; i < registry.length; i++) {
          if (registry[i].options.index > index) {
            registry.splice(i, 0, sheet);
            return;
          }
        }
      }
      /**
       * Reset the registry.
       */

    }, {
      key: 'reset',
      value: function reset() {
        this.registry = [];
      }
      /**
       * Remove a Style Sheet.
       */

    }, {
      key: 'remove',
      value: function remove(sheet) {
        var index = this.registry.indexOf(sheet);
        this.registry.splice(index, 1);
      }
      /**
       * Convert all attached sheets to a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString(options) {
        return this.registry.filter(function (sheet) {
          return sheet.attached;
        }).map(function (sheet) {
          return sheet.toString(options);
        }).join('\n');
      }
    }, {
      key: 'index',

      /**
       * Current highest index number.
       */
      get: function get() {
        return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
      }
    }]);

    return SheetsRegistry;
  }();

  exports['default'] = SheetsRegistry;
});
unwrapExports(SheetsRegistry_1);

// v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item._r = [2];

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};






 // empty string to avoid regexp issues
















 // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

'use strict';
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function warning() {};

warning._r = [2];

{
  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

var browser = warning;

var SheetsManager_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _warning2 = _interopRequireDefault(browser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * SheetsManager is like a WeakMap which is designed to count StyleSheet
   * instances and attach/detach automatically.
   */


  var SheetsManager = function () {
    function SheetsManager() {
      _classCallCheck(this, SheetsManager);

      this.sheets = [];
      this.refs = [];
      this.keys = [];
    }

    _createClass(SheetsManager, [{
      key: 'get',
      value: function get(key) {
        var index = this.keys.indexOf(key);
        return this.sheets[index];
      }
    }, {
      key: 'add',
      value: function add(key, sheet) {
        var sheets = this.sheets,
            refs = this.refs,
            keys = this.keys;
        var index = sheets.indexOf(sheet);
        if (index !== -1) return index;
        sheets.push(sheet);
        refs.push(0);
        keys.push(key);
        return sheets.length - 1;
      }
    }, {
      key: 'manage',
      value: function manage(key) {
        var index = this.keys.indexOf(key);
        var sheet = this.sheets[index];
        if (this.refs[index] === 0) sheet.attach();
        this.refs[index]++;
        if (!this.keys[index]) this.keys.splice(index, 0, key);
        return sheet;
      }
    }, {
      key: 'unmanage',
      value: function unmanage(key) {
        var index = this.keys.indexOf(key);

        if (index === -1) {
          // eslint-ignore-next-line no-console
          (0, _warning2['default'])('SheetsManager: can\'t find sheet to unmanage');
          return;
        }

        if (this.refs[index] > 0) {
          this.refs[index]--;
          if (this.refs[index] === 0) this.sheets[index].detach();
        }
      }
    }]);

    return SheetsManager;
  }();

  exports['default'] = SheetsManager;
});
unwrapExports(SheetsManager_1);

var toCssValue_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports['default'] = toCssValue;

  var joinWithSpace = function joinWithSpace(value) {
    return value.join(' ');
  };
  /**
   * Converts array values to string.
   *
   * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
   * `border: ['1px', '2px']` > `border: 1px, 2px;`
   */


  joinWithSpace._r = [2];

  function toCssValue(value) {
    if (!Array.isArray(value)) return value; // Support space separated values.

    if (Array.isArray(value[0])) {
      return toCssValue(value.map(joinWithSpace));
    }

    return value.join(', ');
  }
});
unwrapExports(toCssValue_1);

var toCss_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports['default'] = toCss;

  var _toCssValue2 = _interopRequireDefault(toCssValue_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
  /**
   * Indent a string.
   * http://jsperf.com/array-join-vs-for
   */


  function indentStr(str, indent) {
    var result = '';

    for (var index = 0; index < indent; index++) {
      result += '  ';
    }

    return result + str;
  }
  /**
   * Converts a Rule to CSS string.
   */


  function toCss(selector, style) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var result = '';
    if (!style) return result;
    var _options$indent = options.indent,
        indent = _options$indent === undefined ? 0 : _options$indent;
    var fallbacks = style.fallbacks;
    indent++; // Apply fallbacks first.

    if (fallbacks) {
      // Array syntax {fallbacks: [{prop: value}]}
      if (Array.isArray(fallbacks)) {
        for (var index = 0; index < fallbacks.length; index++) {
          var fallback = fallbacks[index];

          for (var prop in fallback) {
            var value = fallback[prop];

            if (value != null) {
              result += '\n' + indentStr(prop + ': ' + (0, _toCssValue2['default'])(value) + ';', indent);
            }
          }
        }
      } // Object syntax {fallbacks: {prop: value}}
      else {
          for (var _prop in fallbacks) {
            var _value = fallbacks[_prop];

            if (_value != null) {
              result += '\n' + indentStr(_prop + ': ' + (0, _toCssValue2['default'])(_value) + ';', indent);
            }
          }
        }
    }

    var hasFunctionValue = false;

    for (var _prop2 in style) {
      var _value2 = style[_prop2];

      if (typeof _value2 === 'function') {
        _value2 = style['$' + _prop2];
        hasFunctionValue = true;
      }

      if (_value2 != null && _prop2 !== 'fallbacks') {
        result += '\n' + indentStr(_prop2 + ': ' + (0, _toCssValue2['default'])(_value2) + ';', indent);
      }
    }

    if (!result && !hasFunctionValue) return result;
    indent--;
    result = indentStr(selector + ' {' + result + '\n', indent) + indentStr('}', indent);
    return result;
  }
});
unwrapExports(toCss_1);

var StyleRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof$1(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _toCss2 = _interopRequireDefault(toCss_1);

  var _toCssValue2 = _interopRequireDefault(toCssValue_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var StyleRule = function () {
    function StyleRule(key, style, options) {
      _classCallCheck(this, StyleRule);

      this.type = 'style';
      this.isProcessed = false;
      var generateClassName = options.generateClassName,
          sheet = options.sheet,
          Renderer = options.Renderer,
          selector = options.selector;
      this.key = key;
      this.options = options;
      this.style = style;
      this.selectorText = selector || '.' + generateClassName(this, sheet);
      this.renderer = sheet ? sheet.renderer : new Renderer();
    }
    /**
     * Set selector string.
     * TODO rewrite this #419
     * Attention: use this with caution. Most browsers didn't implement
     * selectorText setter, so this may result in rerendering of entire Style Sheet.
     */


    _createClass(StyleRule, [{
      key: 'prop',

      /**
       * Get or set a style property.
       */
      value: function prop(name, nextValue) {
        var $name = typeof this.style[name] === 'function' ? '$' + name : name;
        var currValue = this.style[$name]; // Its a setter.

        if (nextValue != null) {
          // Don't do anything if the value has not changed.
          if (currValue !== nextValue) {
            nextValue = this.options.jss.plugins.onChangeValue(nextValue, name, this);
            Object.defineProperty(this.style, $name, {
              value: nextValue,
              writable: true
            }); // Defined if StyleSheet option `link` is true.

            if (this.renderable) this.renderer.setStyle(this.renderable, name, nextValue);
          }

          return this;
        } // Its a getter, read the value from the DOM if its not cached.


        if (this.renderable && currValue == null) {
          // Cache the value after we have got it from the DOM first time.
          Object.defineProperty(this.style, $name, {
            value: this.renderer.getStyle(this.renderable, name),
            writable: true
          });
        }

        return this.style[$name];
      }
      /**
       * Apply rule to an element inline.
       */

    }, {
      key: 'applyTo',
      value: function applyTo(renderable) {
        var json = this.toJSON();

        for (var prop in json) {
          this.renderer.setStyle(renderable, prop, json[prop]);
        }

        return this;
      }
      /**
       * Returns JSON representation of the rule.
       * Fallbacks are not supported.
       * Useful for inline styles.
       */

    }, {
      key: 'toJSON',
      value: function toJSON() {
        var json = {};

        for (var prop in this.style) {
          var value = this.style[prop];
          var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
          if (type === 'function') json[prop] = this.style['$' + prop];else if (type !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _toCssValue2['default'])(value);
        }

        return json;
      }
      /**
       * Generates a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString(options) {
        return (0, _toCss2['default'])(this.selector, this.style, options);
      }
    }, {
      key: 'selector',
      set: function set$$1(selector) {
        var sheet = this.options.sheet; // After we modify a selector, ref by old selector needs to be removed.

        if (sheet) sheet.rules.unregister(this);
        this.selectorText = selector;

        if (!this.renderable) {
          // Register the rule with new selector.
          if (sheet) sheet.rules.register(this);
          return;
        }

        var changed = this.renderer.setSelector(this.renderable, selector);

        if (changed && sheet) {
          sheet.rules.register(this);
          return;
        } // If selector setter is not implemented, rerender the sheet.
        // We need to delete renderable from the rule, because when sheet.deploy()
        // calls rule.toString, it will get the old selector.


        delete this.renderable;

        if (sheet) {
          sheet.rules.register(this);
          sheet.deploy().link();
        }
      }
      /**
       * Get selector string.
       */
      ,
      get: function get$$1() {
        if (this.renderable) {
          return this.renderer.getSelector(this.renderable);
        }

        return this.selectorText;
      }
    }]);

    return StyleRule;
  }();

  exports['default'] = StyleRule;
});
unwrapExports(StyleRule_1);

var cloneStyle_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof$1(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
  };

  exports.default = cloneStyle;
  var isArray = Array.isArray;

  function cloneStyle(style) {
    // Support empty values in case user ends up with them by accident.
    if (style == null) return style; // Support string value for SimpleRule.

    var typeOfStyle = typeof style === 'undefined' ? 'undefined' : _typeof(style);
    if (typeOfStyle === 'string' || typeOfStyle === 'number') return style; // Support array for FontFaceRule.

    if (isArray(style)) return style.map(cloneStyle);
    var newStyle = {};

    for (var name in style) {
      var value = style[name];

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        newStyle[name] = cloneStyle(value);
        continue;
      }

      newStyle[name] = value;
    }

    return newStyle;
  }
});
unwrapExports(cloneStyle_1);

var createRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports['default'] = createRule;

  var _warning2 = _interopRequireDefault(browser);

  var _StyleRule2 = _interopRequireDefault(StyleRule_1);

  var _cloneStyle2 = _interopRequireDefault(cloneStyle_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
  /**
   * Create a rule instance.
   */


  function createRule() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unnamed';
    var decl = arguments[1];
    var options = arguments[2];
    var jss = options.jss;
    var declCopy = (0, _cloneStyle2['default'])(decl);
    var rule = jss.plugins.onCreateRule(name, declCopy, options);
    if (rule) return rule; // It is an at-rule and it has no instance.

    if (name[0] === '@') {
      (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
    }

    return new _StyleRule2['default'](name, declCopy, options);
  }
});
unwrapExports(createRule_1);

var updateRule = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports['default'] = function (rule, data, RuleList) {
    if (rule.type === 'style') {
      for (var prop in rule.style) {
        var value = rule.style[prop];

        if (typeof value === 'function') {
          rule.prop(prop, value(data));
        }
      }
    } else if (rule.rules instanceof RuleList) {
      rule.rules.update(data);
    }
  };
});
unwrapExports(updateRule);

var linkRule_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = linkRule;
  /**
   * Link rule with CSSStyleRule and nested rules with corresponding nested cssRules if both exists.
   */

  function linkRule(rule, cssRule) {
    rule.renderable = cssRule;
    if (rule.rules && cssRule.cssRules) rule.rules.link(cssRule.cssRules);
  }
});
unwrapExports(linkRule_1);

var RuleList_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _createRule2$$1 = _interopRequireDefault(createRule_1);

  var _updateRule2 = _interopRequireDefault(updateRule);

  var _linkRule2 = _interopRequireDefault(linkRule_1);

  var _StyleRule2 = _interopRequireDefault(StyleRule_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */


  var RuleList = function () {
    // Original styles object.
    function RuleList(options) {
      _classCallCheck(this, RuleList);

      this.map = {};
      this.raw = {};
      this.index = [];
      this.options = options;
      this.classes = options.classes;
    }
    /**
     * Create and register rule.
     *
     * Will not render after Style Sheet was rendered the first time.
     */
    // Used to ensure correct rules order.
    // Rules registry for access by .get() method.
    // It contains the same rule registered by name and by selector.


    _createClass(RuleList, [{
      key: 'add',
      value: function add(name, decl, options) {
        var _options = this.options,
            parent = _options.parent,
            sheet = _options.sheet,
            jss = _options.jss,
            Renderer = _options.Renderer,
            generateClassName = _options.generateClassName;
        options = _extends({
          classes: this.classes,
          parent: parent,
          sheet: sheet,
          jss: jss,
          Renderer: Renderer,
          generateClassName: generateClassName
        }, options);
        if (!options.selector && this.classes[name]) options.selector = '.' + this.classes[name];
        this.raw[name] = decl;
        var rule = (0, _createRule2$$1['default'])(name, decl, options);
        this.register(rule);
        var index = options.index === undefined ? this.index.length : options.index;
        this.index.splice(index, 0, rule);
        return rule;
      }
      /**
       * Get a rule.
       */

    }, {
      key: 'get',
      value: function get(name) {
        return this.map[name];
      }
      /**
       * Delete a rule.
       */

    }, {
      key: 'remove',
      value: function remove(rule) {
        this.unregister(rule);
        this.index.splice(this.indexOf(rule), 1);
      }
      /**
       * Get index of a rule.
       */

    }, {
      key: 'indexOf',
      value: function indexOf(rule) {
        return this.index.indexOf(rule);
      }
      /**
       * Run `onProcessRule()` plugins on every rule.
       */

    }, {
      key: 'process',
      value: function process() {
        var plugins = this.options.jss.plugins; // We need to clone array because if we modify the index somewhere else during a loop
        // we end up with very hard-to-track-down side effects.

        this.index.slice(0).forEach(plugins.onProcessRule, plugins);
      }
      /**
       * Register a rule in `.map` and `.classes` maps.
       */

    }, {
      key: 'register',
      value: function register(rule) {
        this.map[rule.key] = rule;

        if (rule instanceof _StyleRule2['default']) {
          this.map[rule.selector] = rule;
          this.classes[rule.key] = rule.selector.substr(1);
        }
      }
      /**
       * Unregister a rule.
       */

    }, {
      key: 'unregister',
      value: function unregister(rule) {
        delete this.map[rule.key];
        delete this.classes[rule.key];
        if (rule instanceof _StyleRule2['default']) delete this.map[rule.selector];
      }
      /**
       * Update the function values with a new data.
       */

    }, {
      key: 'update',
      value: function update(name, data) {
        if (typeof name === 'string') {
          (0, _updateRule2['default'])(this.get(name), data, RuleList);
          return;
        }

        for (var index = 0; index < this.index.length; index++) {
          (0, _updateRule2['default'])(this.index[index], name, RuleList);
        }
      }
      /**
       * Link renderable rules with CSSRuleList.
       */

    }, {
      key: 'link',
      value: function link(cssRules) {
        for (var i = 0; i < cssRules.length; i++) {
          var cssRule = cssRules[i];
          var rule = this.get(this.options.sheet.renderer.getSelector(cssRule));
          if (rule) (0, _linkRule2['default'])(rule, cssRule);
        }
      }
      /**
       * Convert rules to a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString(options) {
        var str = '';

        for (var index = 0; index < this.index.length; index++) {
          var rule = this.index[index];
          var css = rule.toString(options); // No need to render an empty rule.

          if (!css) continue;
          if (str) str += '\n';
          str += css;
        }

        return str;
      }
    }]);

    return RuleList;
  }();

  exports['default'] = RuleList;
});
unwrapExports(RuleList_1);

var sheets = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SheetsRegistry2 = _interopRequireDefault(SheetsRegistry_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
  /**
   * This is a global sheets registry. Only DomRenderer will add sheets to it.
   * On the server one should use an own SheetsRegistry instance and add the
   * sheets to it, because you need to make sure to create a new registry for
   * each request in order to not leak sheets across requests.
   */


  exports['default'] = new _SheetsRegistry2['default']();
});
unwrapExports(sheets);

var StyleSheet_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _linkRule2 = _interopRequireDefault(linkRule_1);

  var _RuleList2 = _interopRequireDefault(RuleList_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var StyleSheet = function () {
    function StyleSheet(styles, options) {
      _classCallCheck(this, StyleSheet);

      this.attached = false;
      this.deployed = false;
      this.linked = false;
      this.classes = {};
      this.options = _extends({}, options, {
        sheet: this,
        parent: this,
        classes: this.classes
      });
      this.renderer = new options.Renderer(this);
      this.rules = new _RuleList2['default'](this.options);

      for (var name in styles) {
        this.rules.add(name, styles[name]);
      }

      this.rules.process();
    }
    /**
     * Attach renderable to the render tree.
     */


    _createClass(StyleSheet, [{
      key: 'attach',
      value: function attach() {
        if (this.attached) return this;
        if (!this.deployed) this.deploy();
        this.renderer.attach();
        if (!this.linked && this.options.link) this.link();
        this.attached = true;
        return this;
      }
      /**
       * Remove renderable from render tree.
       */

    }, {
      key: 'detach',
      value: function detach() {
        if (!this.attached) return this;
        this.renderer.detach();
        this.attached = false;
        return this;
      }
      /**
       * Add a rule to the current stylesheet.
       * Will insert a rule also after the stylesheet has been rendered first time.
       */

    }, {
      key: 'addRule',
      value: function addRule(name, decl, options) {
        var queue = this.queue; // Plugins can create rules.
        // In order to preserve the right order, we need to queue all `.addRule` calls,
        // which happen after the first `rules.add()` call.

        if (this.attached && !queue) this.queue = [];
        var rule = this.rules.add(name, decl, options);
        this.options.jss.plugins.onProcessRule(rule);

        if (this.attached) {
          if (!this.deployed) return rule; // Don't insert rule directly if there is no stringified version yet.
          // It will be inserted all together when .attach is called.

          if (queue) queue.push(rule);else {
            this.insertRule(rule);

            if (this.queue) {
              this.queue.forEach(this.insertRule, this);
              this.queue = undefined;
            }
          }
          return rule;
        } // We can't add rules to a detached style node.
        // We will redeploy the sheet once user will attach it.


        this.deployed = false;
        return rule;
      }
      /**
       * Insert rule into the StyleSheet
       */

    }, {
      key: 'insertRule',
      value: function insertRule(rule) {
        var renderable = this.renderer.insertRule(rule);
        if (renderable && this.options.link) (0, _linkRule2['default'])(rule, renderable);
      }
      /**
       * Create and add rules.
       * Will render also after Style Sheet was rendered the first time.
       */

    }, {
      key: 'addRules',
      value: function addRules(styles, options) {
        var added = [];

        for (var name in styles) {
          added.push(this.addRule(name, styles[name], options));
        }

        return added;
      }
      /**
       * Get a rule by name.
       */

    }, {
      key: 'getRule',
      value: function getRule(name) {
        return this.rules.get(name);
      }
      /**
       * Delete a rule by name.
       * Returns `true`: if rule has been deleted from the DOM.
       */

    }, {
      key: 'deleteRule',
      value: function deleteRule(name) {
        var rule = this.rules.get(name);
        if (!rule) return false;
        this.rules.remove(rule);

        if (this.attached && rule.renderable) {
          return this.renderer.deleteRule(rule.renderable);
        }

        return true;
      }
      /**
       * Get index of a rule.
       */

    }, {
      key: 'indexOf',
      value: function indexOf(rule) {
        return this.rules.indexOf(rule);
      }
      /**
       * Deploy pure CSS string to a renderable.
       */

    }, {
      key: 'deploy',
      value: function deploy() {
        this.renderer.deploy();
        this.deployed = true;
        return this;
      }
      /**
       * Link renderable CSS rules from sheet with their corresponding models.
       */

    }, {
      key: 'link',
      value: function link() {
        var cssRules = this.renderer.getRules(); // Is undefined when VirtualRenderer is used.

        if (cssRules) this.rules.link(cssRules);
        this.linked = true;
        return this;
      }
      /**
       * Update the function values with a new data.
       */

    }, {
      key: 'update',
      value: function update(name, data) {
        this.rules.update(name, data);
        return this;
      }
      /**
       * Convert rules to a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString(options) {
        return this.rules.toString(options);
      }
    }]);

    return StyleSheet;
  }();

  exports['default'] = StyleSheet;
});
unwrapExports(StyleSheet_1);

var PluginsRegistry_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _warning2 = _interopRequireDefault(browser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PluginsRegistry = function () {
    function PluginsRegistry() {
      _classCallCheck(this, PluginsRegistry);

      this.hooks = {
        onCreateRule: [],
        onProcessRule: [],
        onProcessStyle: [],
        onProcessSheet: [],
        onChangeValue: []
        /**
         * Call `onCreateRule` hooks and return an object if returned by a hook.
         */

      };
    }

    _createClass(PluginsRegistry, [{
      key: 'onCreateRule',
      value: function onCreateRule(name, decl, options) {
        for (var i = 0; i < this.hooks.onCreateRule.length; i++) {
          var rule = this.hooks.onCreateRule[i](name, decl, options);
          if (rule) return rule;
        }

        return null;
      }
      /**
       * Call `onProcessRule` hooks.
       */

    }, {
      key: 'onProcessRule',
      value: function onProcessRule(rule) {
        if (rule.isProcessed) return;
        var sheet = rule.options.sheet;

        for (var i = 0; i < this.hooks.onProcessRule.length; i++) {
          this.hooks.onProcessRule[i](rule, sheet);
        } // $FlowFixMe


        if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
        rule.isProcessed = true;
      }
      /**
       * Call `onProcessStyle` hooks.
       */

    }, {
      key: 'onProcessStyle',
      value: function onProcessStyle(style, rule, sheet) {
        var nextStyle = style;

        for (var i = 0; i < this.hooks.onProcessStyle.length; i++) {
          nextStyle = this.hooks.onProcessStyle[i](nextStyle, rule, sheet); // $FlowFixMe

          rule.style = nextStyle;
        }
      }
      /**
       * Call `onProcessSheet` hooks.
       */

    }, {
      key: 'onProcessSheet',
      value: function onProcessSheet(sheet) {
        for (var i = 0; i < this.hooks.onProcessSheet.length; i++) {
          this.hooks.onProcessSheet[i](sheet);
        }
      }
      /**
       * Call `onChangeValue` hooks.
       */

    }, {
      key: 'onChangeValue',
      value: function onChangeValue(value, prop, rule) {
        var processedValue = value;

        for (var i = 0; i < this.hooks.onChangeValue.length; i++) {
          processedValue = this.hooks.onChangeValue[i](processedValue, prop, rule);
        }

        return processedValue;
      }
      /**
       * Register a plugin.
       * If function is passed, it is a shortcut for `{onProcessRule}`.
       */

    }, {
      key: 'use',
      value: function use(plugin) {
        for (var name in plugin) {
          if (this.hooks[name]) this.hooks[name].push(plugin[name]);else (0, _warning2['default'])(false, '[JSS] Unknown hook "%s".', name);
        }
      }
    }]);

    return PluginsRegistry;
  }();

  exports['default'] = PluginsRegistry;
});
unwrapExports(PluginsRegistry_1);

var SimpleRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SimpleRule = function () {
    function SimpleRule(key, value, options) {
      _classCallCheck(this, SimpleRule);

      this.type = 'simple';
      this.isProcessed = false;
      this.key = key;
      this.value = value;
      this.options = options;
    }
    /**
     * Generates a CSS string.
     */
    // eslint-disable-next-line no-unused-vars


    _createClass(SimpleRule, [{
      key: 'toString',
      value: function toString(options) {
        if (Array.isArray(this.value)) {
          var str = '';

          for (var index = 0; index < this.value.length; index++) {
            str += this.key + ' ' + this.value[index] + ';';
            if (this.value[index + 1]) str += '\n';
          }

          return str;
        }

        return this.key + ' ' + this.value + ';';
      }
    }]);

    return SimpleRule;
  }();

  exports['default'] = SimpleRule;
});
unwrapExports(SimpleRule_1);

var KeyframesRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _RuleList2 = _interopRequireDefault(RuleList_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * Rule for @keyframes
   */


  var KeyframesRule = function () {
    function KeyframesRule(key, frames, options) {
      _classCallCheck(this, KeyframesRule);

      this.type = 'keyframes';
      this.isProcessed = false;
      this.key = key;
      this.options = options;
      this.rules = new _RuleList2['default'](_extends({}, options, {
        parent: this
      }));

      for (var name in frames) {
        this.rules.add(name, frames[name], _extends({}, this.options, {
          parent: this,
          selector: name
        }));
      }

      this.rules.process();
    }
    /**
     * Generates a CSS string.
     */


    _createClass(KeyframesRule, [{
      key: 'toString',
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          indent: 1
        };
        var inner = this.rules.toString(options);
        if (inner) inner += '\n';
        return this.key + ' {\n' + inner + '}';
      }
    }]);

    return KeyframesRule;
  }();

  exports['default'] = KeyframesRule;
});
unwrapExports(KeyframesRule_1);

var ConditionalRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _RuleList2 = _interopRequireDefault(RuleList_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * Conditional rule for @media, @supports
   */


  var ConditionalRule = function () {
    function ConditionalRule(key, styles, options) {
      _classCallCheck(this, ConditionalRule);

      this.type = 'conditional';
      this.isProcessed = false;
      this.key = key;
      this.options = options;
      this.rules = new _RuleList2['default'](_extends({}, options, {
        parent: this
      }));

      for (var name in styles) {
        this.rules.add(name, styles[name]);
      }

      this.rules.process();
    }
    /**
     * Get a rule.
     */


    _createClass(ConditionalRule, [{
      key: 'getRule',
      value: function getRule(name) {
        return this.rules.get(name);
      }
      /**
       * Get index of a rule.
       */

    }, {
      key: 'indexOf',
      value: function indexOf(rule) {
        return this.rules.indexOf(rule);
      }
      /**
       * Create and register rule, run plugins.
       */

    }, {
      key: 'addRule',
      value: function addRule(name, style, options) {
        var rule = this.rules.add(name, style, options);
        this.options.jss.plugins.onProcessRule(rule);
        return rule;
      }
      /**
       * Generates a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          indent: 1
        };
        var inner = this.rules.toString(options);
        return inner ? this.key + ' {\n' + inner + '\n}' : '';
      }
    }]);

    return ConditionalRule;
  }();

  exports['default'] = ConditionalRule;
});
unwrapExports(ConditionalRule_1);

var FontFaceRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _toCss2 = _interopRequireDefault(toCss_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FontFaceRule = function () {
    function FontFaceRule(key, style, options) {
      _classCallCheck(this, FontFaceRule);

      this.type = 'font-face';
      this.isProcessed = false;
      this.key = key;
      this.style = style;
      this.options = options;
    }
    /**
     * Generates a CSS string.
     */


    _createClass(FontFaceRule, [{
      key: 'toString',
      value: function toString(options) {
        if (Array.isArray(this.style)) {
          var str = '';

          for (var index = 0; index < this.style.length; index++) {
            str += (0, _toCss2['default'])(this.key, this.style[index]);
            if (this.style[index + 1]) str += '\n';
          }

          return str;
        }

        return (0, _toCss2['default'])(this.key, this.style, options);
      }
    }]);

    return FontFaceRule;
  }();

  exports['default'] = FontFaceRule;
});
unwrapExports(FontFaceRule_1);

var ViewportRule_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _toCss2 = _interopRequireDefault(toCss_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ViewportRule = function () {
    function ViewportRule(key, style, options) {
      _classCallCheck(this, ViewportRule);

      this.type = 'viewport';
      this.isProcessed = false;
      this.key = key;
      this.style = style;
      this.options = options;
    }
    /**
     * Generates a CSS string.
     */


    _createClass(ViewportRule, [{
      key: 'toString',
      value: function toString(options) {
        return (0, _toCss2['default'])(this.key, this.style, options);
      }
    }]);

    return ViewportRule;
  }();

  exports['default'] = ViewportRule;
});
unwrapExports(ViewportRule_1);

var rules = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SimpleRule2 = _interopRequireDefault(SimpleRule_1);

  var _KeyframesRule2 = _interopRequireDefault(KeyframesRule_1);

  var _ConditionalRule2 = _interopRequireDefault(ConditionalRule_1);

  var _FontFaceRule2 = _interopRequireDefault(FontFaceRule_1);

  var _ViewportRule2 = _interopRequireDefault(ViewportRule_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  var classes = {
    '@charset': _SimpleRule2['default'],
    '@import': _SimpleRule2['default'],
    '@namespace': _SimpleRule2['default'],
    '@keyframes': _KeyframesRule2['default'],
    '@media': _ConditionalRule2['default'],
    '@supports': _ConditionalRule2['default'],
    '@font-face': _FontFaceRule2['default'],
    '@viewport': _ViewportRule2['default'],
    '@-ms-viewport': _ViewportRule2['default']
    /**
     * Generate plugins which will register all rules.
     */

  };
  exports['default'] = Object.keys(classes).map(function (key) {
    // https://jsperf.com/indexof-vs-substr-vs-regex-at-the-beginning-3
    var re = new RegExp('^' + key);

    var onCreateRule = function onCreateRule(name, decl, options) {
      return re.test(name) ? new classes[key](name, decl, options) : null;
    };

    onCreateRule._r = [2];
    return {
      onCreateRule: onCreateRule
    };
  });
});
unwrapExports(rules);

var createGenerateClassName = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var globalRef = typeof window === 'undefined' ? commonjsGlobal : window;
  var namespace = '__JSS_VERSION_COUNTER__';
  if (globalRef[namespace] == null) globalRef[namespace] = 0; // In case we have more than one JSS version.

  var jssCounter = globalRef[namespace]++;
  /**
   * Returns a function which generates unique class names based on counters.
   * When new generator function is created, rule counter is reseted.
   * We need to reset the rule counter for SSR for each request.
   */

  exports['default'] = function () {
    var ruleCounter = 0;
    return function (rule) {
      return rule.key + '-' + jssCounter + '-' + ruleCounter++;
    };
  };
});
unwrapExports(createGenerateClassName);

var _typeof$3 = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof$3(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof$3(document)) === 'object' && document.nodeType === 9;


var module$1 = Object.freeze({
	isBrowser: isBrowser,
	default: isBrowser
});

var DomRenderer_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _warning2 = _interopRequireDefault(browser);

  var _sheets2 = _interopRequireDefault(sheets);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * Get a style property.
   */


  function getStyle(rule, prop) {
    try {
      return rule.style.getPropertyValue(prop);
    } catch (err) {
      // IE may throw if property is unknown.
      return '';
    }
  }
  /**
   * Set a style property.
   */


  function setStyle(rule, prop, value) {
    try {
      rule.style.setProperty(prop, value);
    } catch (err) {
      // IE may throw if property is unknown.
      return false;
    }

    return true;
  }

  function extractSelector(cssText) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return cssText.substr(from, cssText.indexOf('{') - 1);
  }

  var CSSRuleTypes = {
    STYLE_RULE: 1,
    KEYFRAMES_RULE: 7
    /**
     * Get the selector.
     */

  };

  function getSelector(rule) {
    if (rule.type === CSSRuleTypes.STYLE_RULE) return rule.selectorText;

    if (rule.type === CSSRuleTypes.KEYFRAMES_RULE) {
      var name = rule.name;
      if (name) return '@keyframes ' + name; // There is no rule.name in the following browsers:
      // - IE 9
      // - Safari 7.1.8
      // - Mobile Safari 9.0.0

      var cssText = rule.cssText;
      return '@' + extractSelector(cssText, cssText.indexOf('keyframes'));
    }

    return extractSelector(rule.cssText);
  }
  /**
   * Set the selector.
   */


  function setSelector(rule, selectorText) {
    rule.selectorText = selectorText; // Return false if setter was not successful.
    // Currently works in chrome only.

    return rule.selectorText === selectorText;
  }
  /**
   * Gets the `head` element upon the first call and caches it.
   */


  var getHead = function () {
    var head = void 0;
    return function () {
      if (!head) head = document.head || document.getElementsByTagName('head')[0];
      return head;
    };
  }();
  /**
   * Find attached sheet with an index higher than the passed one.
   */


  function findHigherSheet(registry, options) {
    for (var i = 0; i < registry.length; i++) {
      var sheet = registry[i];

      if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
        return sheet;
      }
    }

    return null;
  }
  /**
   * Find attached sheet with the highest index.
   */


  function findHighestSheet(registry, options) {
    for (var i = registry.length - 1; i >= 0; i--) {
      var sheet = registry[i];

      if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
        return sheet;
      }
    }

    return null;
  }
  /**
   * Find a comment with "jss" inside.
   */


  function findCommentNode(text) {
    var head = getHead();

    for (var i = 0; i < head.childNodes.length; i++) {
      var node = head.childNodes[i];

      if (node.nodeType === 8 && node.nodeValue.trim() === text) {
        return node;
      }
    }

    return null;
  }
  /**
   * Find a node before which we can insert the sheet.
   */


  function findPrevNode(options) {
    var registry = _sheets2['default'].registry;

    if (registry.length > 0) {
      // Try to insert before the next higher sheet.
      var sheet = findHigherSheet(registry, options);
      if (sheet) return sheet.renderer.element; // Otherwise insert after the last attached.

      sheet = findHighestSheet(registry, options);
      if (sheet) return sheet.renderer.element.nextElementSibling;
    } // Try to find a comment placeholder if registry is empty.


    var insertionPoint = options.insertionPoint;

    if (insertionPoint && typeof insertionPoint === 'string') {
      var comment = findCommentNode(insertionPoint);
      if (comment) return comment.nextSibling; // If user specifies an insertion point and it can't be found in the document -
      // bad specificity issues may appear.

      (0, _warning2['default'])(insertionPoint === 'jss', '[JSS] Insertion point "%s" not found.', insertionPoint);
    }

    return null;
  }
  /**
   * Insert style element into the DOM.
   */


  function insertStyle(style, options) {
    var insertionPoint = options.insertionPoint;
    var prevNode = findPrevNode(options);

    if (prevNode) {
      var parentNode = prevNode.parentNode;
      if (parentNode) parentNode.insertBefore(style, prevNode);
      return;
    } // Works with iframes and any node types.


    if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
      // https://stackoverflow.com/questions/41328728/force-casting-in-flow
      var insertionPointElement = insertionPoint;
      var _parentNode = insertionPointElement.parentNode;
      if (_parentNode) _parentNode.insertBefore(style, insertionPointElement.nextSibling);else (0, _warning2['default'])(false, '[JSS] Insertion point is not in the DOM.');
      return;
    }

    getHead().insertBefore(style, prevNode);
  }

  var DomRenderer = function () {
    function DomRenderer(sheet) {
      _classCallCheck(this, DomRenderer);

      this.getStyle = getStyle;
      this.setStyle = setStyle;
      this.setSelector = setSelector;
      this.getSelector = getSelector;
      this.hasInsertedRules = false; // There is no sheet when the renderer is used from a standalone StyleRule.

      if (sheet) _sheets2['default'].add(sheet);
      this.sheet = sheet;

      var _ref = this.sheet ? this.sheet.options : {},
          media = _ref.media,
          meta = _ref.meta,
          element = _ref.element;

      this.element = element || document.createElement('style');
      this.element.type = 'text/css';
      this.element.setAttribute('data-jss', '');
      if (media) this.element.setAttribute('media', media);
      if (meta) this.element.setAttribute('data-meta', meta);
    }
    /**
     * Insert style element into render tree.
     */
    // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696


    _createClass(DomRenderer, [{
      key: 'attach',
      value: function attach() {
        // In the case the element node is external and it is already in the DOM.
        if (this.element.parentNode || !this.sheet) return; // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
        // browsers remove those rules.
        // TODO figure out if its a bug and if it is known.
        // Workaround is to redeploy the sheet before attaching as a string.

        if (this.hasInsertedRules) {
          this.deploy();
          this.hasInsertedRules = false;
        }

        insertStyle(this.element, this.sheet.options);
      }
      /**
       * Remove style element from render tree.
       */

    }, {
      key: 'detach',
      value: function detach() {
        this.element.parentNode.removeChild(this.element);
      }
      /**
       * Inject CSS string into element.
       */

    }, {
      key: 'deploy',
      value: function deploy() {
        if (!this.sheet) return;
        this.element.textContent = '\n' + this.sheet.toString() + '\n';
      }
      /**
       * Insert a rule into element.
       */

    }, {
      key: 'insertRule',
      value: function insertRule(rule) {
        var sheet = this.element.sheet;
        var cssRules = sheet.cssRules;
        var index = cssRules.length;
        var str = rule.toString();
        if (!str) return false;

        try {
          sheet.insertRule(str, index);
        } catch (err) {
          (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule);
          return false;
        }

        this.hasInsertedRules = true;
        return cssRules[index];
      }
      /**
       * Delete a rule.
       */

    }, {
      key: 'deleteRule',
      value: function deleteRule(rule) {
        var sheet = this.element.sheet;
        var cssRules = sheet.cssRules;

        for (var _index = 0; _index < cssRules.length; _index++) {
          if (rule === cssRules[_index]) {
            sheet.deleteRule(_index);
            return true;
          }
        }

        return false;
      }
      /**
       * Get all rules elements.
       */

    }, {
      key: 'getRules',
      value: function getRules() {
        return this.element.sheet.cssRules;
      }
    }]);

    return DomRenderer;
  }();

  exports['default'] = DomRenderer;
});
unwrapExports(DomRenderer_1);

var VirtualRenderer_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /* eslint-disable class-methods-use-this */

  /**
   * Rendering backend to do nothing in nodejs.
   */


  var VirtualRenderer = function () {
    function VirtualRenderer() {
      _classCallCheck(this, VirtualRenderer);
    }

    _createClass(VirtualRenderer, [{
      key: 'setStyle',
      value: function setStyle() {
        return true;
      }
    }, {
      key: 'getStyle',
      value: function getStyle() {
        return '';
      }
    }, {
      key: 'setSelector',
      value: function setSelector() {
        return true;
      }
    }, {
      key: 'getSelector',
      value: function getSelector() {
        return '';
      }
    }, {
      key: 'attach',
      value: function attach() {}
    }, {
      key: 'detach',
      value: function detach() {}
    }, {
      key: 'deploy',
      value: function deploy() {}
    }, {
      key: 'insertRule',
      value: function insertRule() {
        return false;
      }
    }, {
      key: 'deleteRule',
      value: function deleteRule() {
        return true;
      }
    }, {
      key: 'getRules',
      value: function getRules() {}
    }]);

    return VirtualRenderer;
  }();

  exports['default'] = VirtualRenderer;
});
unwrapExports(VirtualRenderer_1);

var _isInBrowser = ( module$1 && isBrowser ) || module$1;

var findRenderer_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports['default'] = findRenderer;

  var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

  var _DomRenderer2 = _interopRequireDefault(DomRenderer_1);

  var _VirtualRenderer2 = _interopRequireDefault(VirtualRenderer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
  /**
   * Find proper renderer.
   * Option `virtual` is used to force use of VirtualRenderer even if DOM is
   * detected, used for testing only.
   */


  function findRenderer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (options.Renderer) return options.Renderer;
    var useVirtual = options.virtual || !_isInBrowser2['default'];
    return useVirtual ? _VirtualRenderer2['default'] : _DomRenderer2['default'];
  }
});
unwrapExports(findRenderer_1);

var Jss_1 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof$1(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
  };

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _StyleSheet2 = _interopRequireDefault(StyleSheet_1);

  var _PluginsRegistry2 = _interopRequireDefault(PluginsRegistry_1);

  var _rules2 = _interopRequireDefault(rules);

  var _sheets2 = _interopRequireDefault(sheets);

  var _createGenerateClassName2 = _interopRequireDefault(createGenerateClassName);

  var _createRule3 = _interopRequireDefault(createRule_1);

  var _findRenderer2 = _interopRequireDefault(findRenderer_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Jss = function () {
    function Jss(options) {
      _classCallCheck(this, Jss);

      this.version = "8.1.0";
      this.plugins = new _PluginsRegistry2['default'](); // eslint-disable-next-line prefer-spread

      this.use.apply(this, _rules2['default']);
      this.setup(options);
    }

    _createClass(Jss, [{
      key: 'setup',
      value: function setup() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var createGenerateClassName$$1 = options.createGenerateClassName || _createGenerateClassName2['default'];
        this.generateClassName = createGenerateClassName$$1();
        this.options = _extends$$1({}, options, {
          createGenerateClassName: createGenerateClassName$$1,
          Renderer: (0, _findRenderer2['default'])(options) // eslint-disable-next-line prefer-spread

        });
        if (options.plugins) this.use.apply(this, options.plugins);
        return this;
      }
      /**
       * Create a Style Sheet.
       */

    }, {
      key: 'createStyleSheet',
      value: function createStyleSheet(styles) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var index = options.index;

        if (typeof index !== 'number') {
          index = _sheets2['default'].index === 0 ? 0 : _sheets2['default'].index + 1;
        }

        var sheet = new _StyleSheet2['default'](styles, _extends$$1({}, options, {
          jss: this,
          generateClassName: options.generateClassName || this.generateClassName,
          insertionPoint: this.options.insertionPoint,
          Renderer: this.options.Renderer,
          index: index
        }));
        this.plugins.onProcessSheet(sheet);
        return sheet;
      }
      /**
       * Detach the Style Sheet and remove it from the registry.
       */

    }, {
      key: 'removeStyleSheet',
      value: function removeStyleSheet(sheet) {
        sheet.detach();

        _sheets2['default'].remove(sheet);

        return this;
      }
      /**
       * Create a rule without a Style Sheet.
       */

    }, {
      key: 'createRule',
      value: function createRule(name) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}; // Enable rule without name for inline styles.

        if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
          options = style;
          style = name;
          name = undefined;
        } // Cast from RuleFactoryOptions to RuleOptions
        // https://stackoverflow.com/questions/41328728/force-casting-in-flow


        var ruleOptions = options;
        ruleOptions.jss = this;
        ruleOptions.Renderer = this.options.Renderer;
        if (!ruleOptions.generateClassName) ruleOptions.generateClassName = this.generateClassName;
        if (!ruleOptions.classes) ruleOptions.classes = {};
        var rule = (0, _createRule3['default'])(name, style, ruleOptions);
        this.plugins.onProcessRule(rule);
        return rule;
      }
      /**
       * Register plugin. Passed function will be invoked with a rule instance.
       */

    }, {
      key: 'use',
      value: function use() {
        var _this = this;

        for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
          plugins[_key] = arguments[_key];
        }

        plugins.forEach(function (plugin) {
          return _this.plugins.use(plugin);
        });
        return this;
      }
    }]);

    return Jss;
  }();

  exports['default'] = Jss;
});
unwrapExports(Jss_1);

var lib = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.create = exports.sheets = exports.RuleList = exports.SheetsManager = exports.SheetsRegistry = exports.getDynamicStyles = undefined;
  Object.defineProperty(exports, 'getDynamicStyles', {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault(getDynamicStyles)['default'];
    }
  });
  Object.defineProperty(exports, 'SheetsRegistry', {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault(SheetsRegistry_1)['default'];
    }
  });
  Object.defineProperty(exports, 'SheetsManager', {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault(SheetsManager_1)['default'];
    }
  });
  Object.defineProperty(exports, 'RuleList', {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault(RuleList_1)['default'];
    }
  });
  Object.defineProperty(exports, 'sheets', {
    enumerable: true,
    get: function get() {
      return _interopRequireDefault(sheets)['default'];
    }
  });

  var _Jss2 = _interopRequireDefault(Jss_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      'default': obj
    };
  }
  /**
   * Creates a new instance of Jss.
   */


  var create = exports.create = function create(options) {
    return new _Jss2['default'](options);
  };
  /**
   * A global Jss instance.
   */


  exports['default'] = create();
});
unwrapExports(lib);
var lib_1 = lib.create;

var lib$1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = camelCase;
  var regExp = /([A-Z])/g;
  /**
   * Replace a string passed from String#replace.
   * @param {String} str
   * @return {String}
   */

  function replace(str) {
    return "-" + str.toLowerCase();
  }
  /**
   * Convert camel cased property names to dash separated.
   *
   * @param {Object} style
   * @return {Object}
   */


  function convertCase(style) {
    var converted = {};

    for (var prop in style) {
      converted[prop.replace(regExp, replace)] = style[prop];
    }

    if (style.fallbacks) {
      if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
    }

    return converted;
  }
  /**
   * Allow camel cased property names by converting them back to dasherized.
   *
   * @param {Rule} rule
   */


  function camelCase() {
    function onProcessStyle(style) {
      if (Array.isArray(style)) {
        // Handle rules like @font-face, which can have multiple styles in an array
        for (var index = 0; index < style.length; index++) {
          style[index] = convertCase(style[index]);
        }

        return style;
      }

      return convertCase(style);
    }

    return {
      onProcessStyle: onProcessStyle
    };
  }
});
var jssCamel = unwrapExports(lib$1);

var lib$2 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  exports['default'] = jssGlobal;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var propKey = '@global';
  var prefixKey = '@global ';

  var GlobalContainerRule = function () {
    function GlobalContainerRule(key, styles, options) {
      _classCallCheck(this, GlobalContainerRule);

      this.type = 'global';
      this.key = key;
      this.options = options;
      this.rules = new lib.RuleList(_extends({}, options, {
        parent: this
      }));

      for (var selector in styles) {
        this.rules.add(selector, styles[selector], {
          selector: selector
        });
      }

      this.rules.process();
    }
    /**
     * Get a rule.
     */


    _createClass(GlobalContainerRule, [{
      key: 'getRule',
      value: function getRule(name) {
        return this.rules.get(name);
      }
      /**
       * Create and register rule, run plugins.
       */

    }, {
      key: 'addRule',
      value: function addRule(name, style, options) {
        var rule = this.rules.add(name, style, options);
        this.options.jss.plugins.onProcessRule(rule);
        return rule;
      }
      /**
       * Get index of a rule.
       */

    }, {
      key: 'indexOf',
      value: function indexOf(rule) {
        return this.rules.indexOf(rule);
      }
      /**
       * Generates a CSS string.
       */

    }, {
      key: 'toString',
      value: function toString() {
        return this.rules.toString();
      }
    }]);

    return GlobalContainerRule;
  }();

  var GlobalPrefixedRule = function () {
    function GlobalPrefixedRule(name, style, options) {
      _classCallCheck(this, GlobalPrefixedRule);

      this.name = name;
      this.options = options;
      var selector = name.substr(prefixKey.length);
      this.rule = options.jss.createRule(selector, style, _extends({}, options, {
        parent: this,
        selector: selector
      }));
    }

    _createClass(GlobalPrefixedRule, [{
      key: 'toString',
      value: function toString(options) {
        return this.rule.toString(options);
      }
    }]);

    return GlobalPrefixedRule;
  }();

  var separatorRegExp = /\s*,\s*/g;

  function addScope(selector, scope) {
    var parts = selector.split(separatorRegExp);
    var scoped = '';

    for (var i = 0; i < parts.length; i++) {
      scoped += scope + ' ' + parts[i].trim();
      if (parts[i + 1]) scoped += ', ';
    }

    return scoped;
  }

  function handleNestedGlobalContainerRule(rule) {
    var options = rule.options,
        style = rule.style;
    var rules = style[propKey];
    if (!rules) return;

    for (var name in rules) {
      options.sheet.addRule(name, rules[name], _extends({}, options, {
        selector: addScope(name, rule.selector)
      }));
    }

    delete style[propKey];
  }

  function handlePrefixedGlobalRule(rule) {
    var options = rule.options,
        style = rule.style;

    for (var prop in style) {
      if (prop.substr(0, propKey.length) !== propKey) continue;
      var selector = addScope(prop.substr(propKey.length), rule.selector);
      options.sheet.addRule(selector, style[prop], _extends({}, options, {
        selector: selector
      }));
      delete style[prop];
    }
  }
  /**
   * Convert nested rules to separate, remove them from original styles.
   *
   * @param {Rule} rule
   * @api public
   */


  function jssGlobal() {
    function onCreateRule(name, styles, options) {
      if (name === propKey) {
        return new GlobalContainerRule(name, styles, options);
      }

      if (name[0] === '@' && name.substr(0, prefixKey.length) === prefixKey) {
        return new GlobalPrefixedRule(name, styles, options);
      }

      var parent = options.parent;

      if (parent) {
        if (parent.type === 'global' || parent.options.parent.type === 'global') {
          options.global = true;
        }
      }

      if (options.global) options.selector = name;
      return null;
    }

    function onProcessRule(rule) {
      if (rule.type !== 'style') return;
      handleNestedGlobalContainerRule(rule);
      handlePrefixedGlobalRule(rule);
    }

    return {
      onCreateRule: onCreateRule,
      onProcessRule: onProcessRule
    };
  }
});
var jssGlobal = unwrapExports(lib$2);

var lib$3 = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  exports.default = jssNested;

  var _warning2 = _interopRequireDefault(browser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var separatorRegExp = /\s*,\s*/g;
  var parentRegExp = /&/g;
  var refRegExp = /\$([\w-]+)/g;
  /**
   * Convert nested rules to separate, remove them from original styles.
   *
   * @param {Rule} rule
   * @api public
   */

  function jssNested() {
    // Get a function to be used for $ref replacement.
    function getReplaceRef(container) {
      return function (match, key) {
        var rule = container.getRule(key);
        if (rule) return rule.selector;
        (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);
        return key;
      };
    }

    var hasAnd = function hasAnd(str) {
      return str.indexOf('&') !== -1;
    };

    hasAnd._r = [2];

    function replaceParentRefs(nestedProp, parentProp) {
      var parentSelectors = parentProp.split(separatorRegExp);
      var nestedSelectors = nestedProp.split(separatorRegExp);
      var result = '';

      for (var i = 0; i < parentSelectors.length; i++) {
        var parent = parentSelectors[i];

        for (var j = 0; j < nestedSelectors.length; j++) {
          var nested = nestedSelectors[j];
          if (result) result += ', '; // Replace all & by the parent or prefix & with the parent.

          result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;
        }
      }

      return result;
    }

    function getOptions(rule, container, options) {
      // Options has been already created, now we only increase index.
      if (options) return _extends({}, options, {
        index: options.index + 1
      });
      var nestingLevel = rule.options.nestingLevel;
      nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;
      return _extends({}, rule.options, {
        nestingLevel: nestingLevel,
        index: container.indexOf(rule) + 1
      });
    }

    function onProcessStyle(style, rule) {
      if (rule.type !== 'style') return style;
      var container = rule.options.parent;
      var options = void 0;
      var replaceRef = void 0;

      for (var prop in style) {
        var isNested = hasAnd(prop);
        var isNestedConditional = prop[0] === '@';
        if (!isNested && !isNestedConditional) continue;
        options = getOptions(rule, container, options);

        if (isNested) {
          var selector = replaceParentRefs(prop, rule.selector // Lazily create the ref replacer function just once for
          // all nested rules within the sheet.
          );
          if (!replaceRef) replaceRef = getReplaceRef(container // Replace all $refs.
          );
          selector = selector.replace(refRegExp, replaceRef);
          container.addRule(selector, style[prop], _extends({}, options, {
            selector: selector
          }));
        } else if (isNestedConditional) {
          // Place conditional right after the parent rule to ensure right ordering.
          container.addRule(prop, _defineProperty({}, rule.key, style[prop]), options);
        }

        delete style[prop];
      }

      return style;
    }

    return {
      onProcessStyle: onProcessStyle
    };
  }
});
var jssNested = unwrapExports(lib$3);

var _class$1;

function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function uuid() {
  var uuid = '';

  for (var i = 0; i < 32; i++) {
    var random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }

    uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
  }

  return uuid;
}
uuid._r = [2];

var AbstractLocationStore = function () {
  function AbstractLocationStore() {}

  var _proto = AbstractLocationStore.prototype;

  _proto.location = function location(key, value, force$$1) {
    throw new Error('implement');
  };

  return AbstractLocationStore;
}();
var BrowserLocationStore = (_class$1 = function (_AbstractLocationStor) {
  inheritsLoose$1(BrowserLocationStore, _AbstractLocationStor);

  function BrowserLocationStore(location, history) {
    var _this;

    _this = _AbstractLocationStor.call(this) || this;
    _this._location = void 0;
    _this._history = void 0;
    _this._ns = 'lom_app';
    _this._location = location;
    _this._history = history;
    return _this;
  }

  var _proto2 = BrowserLocationStore.prototype;

  _proto2._params = function _params() {
    return new URLSearchParams(this._location.search);
  };

  _proto2.location = function location(key, value, force$$1) {
    var params = this._params();

    if (value === undefined) return params.get(key);
    params.set(key, value);

    this._history.pushState(null, this._ns, "?" + params.toString());

    return value;
  };

  return BrowserLocationStore;
}(AbstractLocationStore), (_applyDecoratedDescriptor$2(_class$1.prototype, "location", [memkey], Object.getOwnPropertyDescriptor(_class$1.prototype, "location"), _class$1.prototype)), _class$1);
BrowserLocationStore._r = [0, [Location, History]];

var logger = new ConsoleLogger();
defaultContext.setLogger(logger);

function ErrorableView(_ref) {
  var error = _ref.error;
  return lom_h("div", null, error instanceof mem.Wait ? lom_h("div", null, "Loading...") : lom_h("div", null, lom_h("h3", null, "Fatal error !"), lom_h("div", null, error.message), lom_h("pre", null, error.stack.toString())));
}

ErrorableView._r = [1];
var jss = lib_1({
  plugins: [jssNested(), jssCamel(), jssGlobal()]
});
var injector = new Injector([[AbstractLocationStore, new BrowserLocationStore(location, history)]], jss);
var lomCreateElement = createCreateElement(createReactWrapper(Component, ErrorableView, injector), h);
global$1['lom_h'] = lomCreateElement;

var _class$2;
var _descriptor$1;

function _initDefineProp$1(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var FirstCounterService = (_class$2 = function () {
  function FirstCounterService() {
    _initDefineProp$1(this, "$", _descriptor$1, this);

    this.lang = {
      add: 'Add',
      error: 'Gen error'
    };
  }

  createClass$1(FirstCounterService, [{
    key: "value",
    get: function get$$1() {
      var _this = this;

      setTimeout(function () {
        _this.value = 1; // this.value = new Error('loading error')
      }, 500);
      throw new mem.Wait();
    },
    set: function set$$1(v) {
      if (typeof v === 'string') {
        throw new TypeError('Test error');
      }
    }
  }]);
  return FirstCounterService;
}(), (_descriptor$1 = _applyDecoratedDescriptor$3(_class$2.prototype, "$", [force], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$3(_class$2.prototype, "value", [mem], Object.getOwnPropertyDescriptor(_class$2.prototype, "value"), _class$2.prototype), _applyDecoratedDescriptor$3(_class$2.prototype, "value", [mem], Object.getOwnPropertyDescriptor(_class$2.prototype, "value"), _class$2.prototype)), _class$2);

function CounterMessageView(_ref) {
  var value = _ref.value;
  return lom_h("div", null, "Count: ", value);
}

CounterMessageView._r = [1];

function FirstCounterView(_, counter) {
  return lom_h("div", null, lom_h(CounterMessageView, {
    value: counter.value
  }), lom_h("button", {
    id: "FirstCounterAddButton",
    onClick: function onClick() {
      counter.value++;
    }
  }, counter.lang.add), lom_h("button", {
    id: "FirstCounterGenErrorButton",
    onClick: function onClick() {
      counter.$.value = 'someStr';
    }
  }, counter.lang.error));
}

FirstCounterView._r = [1, [FirstCounterService]];

var SecondCounterService = function (_FirstCounterService) {
  inheritsLoose$1(SecondCounterService, _FirstCounterService);

  function SecondCounterService() {
    var _temp, _this2;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this2 = _FirstCounterService.call.apply(_FirstCounterService, [this].concat(args)) || this, _this2.lang = {
      add: 'cloned Add',
      error: 'cloned Gen error'
    }, _temp) || _this2;
  }

  return SecondCounterService;
}(FirstCounterService);

function SecondCounterMessageView(_ref2) {
  var value = _ref2.value;
  return lom_h("div", null, "SecondCounter Count: ", value);
}

SecondCounterMessageView._r = [1];

function SecondCounterAddButtonView(_ref3) {
  var onClick = _ref3.onClick,
      children = _ref3.children;
  return lom_h("button", {
    id: "SecondCounterAddButton",
    onClick: onClick
  }, "SecondCounterAddButton: ", children);
}

SecondCounterAddButtonView._r = [1];
var SecondCounterView = cloneComponent(FirstCounterView, [[FirstCounterService, SecondCounterService], [CounterMessageView, SecondCounterMessageView], ['FirstCounterAddButton', SecondCounterAddButtonView], ['FirstCounterGenErrorButton', null]], 'SecondCounterView');

function ThirdCounterAddButtonView(_ref4) {
  var onClick = _ref4.onClick,
      children = _ref4.children;
  return lom_h("button", {
    id: "ThirdCounterAddButton",
    onClick: onClick
  }, "ThirdCounterAddButton: ", children);
}

ThirdCounterAddButtonView._r = [1];
var ThirdCounterView = cloneComponent(SecondCounterView, [['FirstCounterAddButton', ThirdCounterAddButtonView]], 'ThirdCounterView');
function CounterView() {
  return lom_h("ul", null, lom_h("li", null, "FirstCounter: ", lom_h(FirstCounterView, null)), lom_h("li", null, "SecondCounter extends FirstCounter: ", lom_h(SecondCounterView, null)), lom_h("li", null, "ThirdCounter extends SecondCounter: ", lom_h(ThirdCounterView, null)));
}
CounterView._r = [1];

var globToRegexp = function globToRegexp(glob, opts) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string');
  }

  var str = String(glob); // The regexp we are building, as a string.

  var reStr = ""; // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.

  var extended = opts ? !!opts.extended : false; // When globstar is _false_ (default), '/foo/*' is translated a regexp like
  // '^\/foo\/.*$' which will match any string beginning with '/foo/'
  // When globstar is _true_, '/foo/*' is translated to regexp like
  // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
  // which does not have a '/' to the right of it.
  // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
  // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
  // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
  // globstar is _false_

  var globstar = opts ? !!opts.globstar : false; // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.

  var inGroup = false; // RegExp flags (eg "i" ) to pass in to RegExp constructor.

  var flags = opts && typeof opts.flags === "string" ? opts.flags : "";
  var c;

  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
      case "\\":
      case "/":
      case "$":
      case "^":
      case "+":
      case ".":
      case "(":
      case ")":
      case "=":
      case "!":
      case "|":
        reStr += "\\" + c;
        break;

      case "?":
        if (extended) {
          reStr += ".";
          break;
        }

      case "[":
      case "]":
        if (extended) {
          reStr += c;
          break;
        }

      case "{":
        if (extended) {
          inGroup = true;
          reStr += "(";
          break;
        }

      case "}":
        if (extended) {
          inGroup = false;
          reStr += ")";
          break;
        }

      case ",":
        if (inGroup) {
          reStr += "|";
          break;
        }

        reStr += "\\" + c;
        break;

      case "*":
        // Move over all consecutive "*"'s.
        // Also store the previous and next characters
        var prevChar = str[i - 1];
        var starCount = 1;

        while (str[i + 1] === "*") {
          starCount++;
          i++;
        }

        var nextChar = str[i + 1];

        if (!globstar) {
          // globstar is disabled, so treat any number of "*" as one
          reStr += ".*";
        } else {
          // globstar is enabled, so determine if this is a globstar segment
          var isGlobstar = starCount > 1 // multiple "*"'s
          && (prevChar === "/" || prevChar === undefined) // from the start of the segment
          && (nextChar === "/" || nextChar === undefined); // to the end of the segment

          if (isGlobstar) {
            // it's a globstar, so match zero or more path segments
            reStr += "(?:[^/]*(?:\/|$))*";
            i++; // move over the "/"
          } else {
            // it's not a globstar, so only match one path segment
            reStr += "[^/]*";
          }
        }

        break;

      default:
        reStr += c;
    }
  } // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $


  if (!flags || !~flags.indexOf('g')) {
    reStr = "^" + reStr + "$";
  }

  return new RegExp(reStr, flags);
};

globToRegexp._r = [2];

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


parse._r = [2];

function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


compile._r = [2];

function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


encodeURIComponentPretty._r = [2];

function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


encodeAsterisk._r = [2];

function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (_typeof$1(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


tokensToFunction._r = [2];

function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


escapeString._r = [2];

function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


escapeGroup._r = [2];

function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


attachKeys._r = [2];

function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


flags._r = [2];

function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


regexpToRegexp._r = [2];

function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


arrayToRegexp._r = [2];

function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


stringToRegexp._r = [2];

function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


tokensToRegExp._r = [2];

function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

pathToRegexp._r = [2];
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

'use strict';

var _extends$2 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var stringMatchers = {
  begin: function begin(targetString) {
    return function (url) {
      return url.indexOf(targetString) === 0;
    };
  },
  end: function end(targetString) {
    return function (url) {
      return url.substr(-targetString.length) === targetString;
    };
  },
  glob: function glob(targetString) {
    var urlRX = globToRegexp(targetString.replace(/^glob:/, ''));

    return function (url) {
      return urlRX.test(url);
    };
  },
  express: function express(targetString) {
    var urlRX = pathToRegexp_1(targetString.replace(/^express:/, ''));

    return function (url) {
      return urlRX.test(url);
    };
  }
};

function getHeaderMatcher(expectedHeaders, HeadersConstructor) {
  var expectation = Object.keys(expectedHeaders).map(function (k) {
    return {
      key: k.toLowerCase(),
      val: expectedHeaders[k]
    };
  });
  return function (headers) {
    if (!headers) {
      headers = {};
    }

    if (headers instanceof HeadersConstructor) {
      headers = headers.raw();
    }

    var lowerCaseHeaders = Object.keys(headers).reduce(function (obj, k) {
      obj[k.toLowerCase()] = headers[k];
      return obj;
    }, {});
    return expectation.every(function (header) {
      return areHeadersEqual(lowerCaseHeaders, header);
    });
  };
}

getHeaderMatcher._r = [2];

function areHeadersEqual(currentHeader, expectedHeader) {
  var key = expectedHeader.key;
  var val = expectedHeader.val;
  var currentHeaderValue = Array.isArray(currentHeader[key]) ? currentHeader[key] : [currentHeader[key]];
  var expectedHeaderValue = Array.isArray(val) ? val : [val];

  if (currentHeaderValue.length !== expectedHeaderValue.length) {
    return false;
  }

  for (var i = 0; i < currentHeaderValue.length; ++i) {
    if (currentHeaderValue[i] !== expectedHeaderValue[i]) {
      return false;
    }
  }

  return true;
}

areHeadersEqual._r = [2];

function normalizeRequest(url, options, Request) {
  if (Request.prototype.isPrototypeOf(url)) {
    return {
      url: url.url,
      method: url.method,
      headers: function () {
        var headers = {};
        url.headers.forEach(function (name) {
          return headers[name] = url.headers.name;
        });
        return headers;
      }()
    };
  } else {
    return {
      url: url,
      method: options && options.method || 'GET',
      headers: options && options.headers
    };
  }
}

normalizeRequest._r = [2];

var compileRoute = function compileRoute(route, Request, HeadersConstructor) {
  route = _extends$2({}, route);

  if (typeof route.response === 'undefined') {
    throw new Error('Each route must define a response');
  }

  if (!route.matcher) {
    throw new Error('each route must specify a string, regex or function to match calls to fetch');
  }

  if (!route.name) {
    route.name = route.matcher.toString();
    route.__unnamed = true;
  }

  var matchUrl = void 0;
  var expectedMethod = route.method && route.method.toLowerCase();

  function matchMethod(method) {
    return !expectedMethod || expectedMethod === (method ? method.toLowerCase() : 'get');
  }

  
  var matchHeaders = route.headers ? getHeaderMatcher(route.headers, HeadersConstructor) : function () {
    return true;
  };

  if (typeof route.matcher === 'function') {
    matchUrl = route.matcher;
  } else if (typeof route.matcher === 'string') {
    Object.keys(stringMatchers).some(function (name) {
      if (route.matcher.indexOf(name + ':') === 0) {
        var url = route.matcher.replace(new RegExp('^' + name + ':'), '');
        matchUrl = stringMatchers[name](url);
        return true;
      }
    });

    if (!matchUrl) {
      if (route.matcher === '*') {
        matchUrl = function matchUrl() {
          return true;
        };
      } else if (route.matcher.indexOf('^') === 0) {
        (function () {
          console.warn('Using \'^\' to denote the start of a url is deprecated. Use \'begin:\' instead');
          var expectedUrl = route.matcher.substr(1);

          matchUrl = function matchUrl(url) {
            return url.indexOf(expectedUrl) === 0;
          };
        })();
      } else {
        (function () {
          var expectedUrl = route.matcher;

          matchUrl = function matchUrl(url) {
            return url === expectedUrl;
          };
        })();
      }
    }
  } else if (route.matcher instanceof RegExp) {
    (function () {
      var urlRX = route.matcher;

      matchUrl = function matchUrl(url) {
        return urlRX.test(url);
      };
    })();
  }

  var matcher = function matcher(url, options) {
    var req = normalizeRequest(url, options, Request);
    return matchHeaders(req.headers) && matchMethod(req.method) && matchUrl(req.url, options);
  };

  matcher._r = [2];

  if (route.times) {
    (function () {
      var timesLeft = route.times;

      route.matcher = function (url, options) {
        var match = timesLeft && matcher(url, options);

        if (match) {
          timesLeft--;
          return true;
        }
      };

      route.reset = function () {
        return timesLeft = route.times;
      };
    })();
  } else {
    route.matcher = matcher;
  }

  return route;
};

compileRoute._r = [2];

'use strict';

var _typeof$4 = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var FetchMock = function FetchMock() {
  this.routes = [];
  this._calls = {};
  this._matchedCalls = [];
  this._unmatchedCalls = [];
  this._holdingPromises = [];
  this.bindMethods();
};

FetchMock._r = [2];

FetchMock.prototype.bindMethods = function () {
  this.fetchMock = FetchMock.prototype.fetchMock.bind(this);
  this.restore = FetchMock.prototype.restore.bind(this);
  this.reset = FetchMock.prototype.reset.bind(this);
};

FetchMock.prototype.mock = function (matcher, response, options) {
  var route = void 0; // Handle the variety of parameters accepted by mock (see README)

  if (matcher && response && options) {
    route = _extends$1({
      matcher: matcher,
      response: response
    }, options);
  } else if (matcher && response) {
    route = {
      matcher: matcher,
      response: response
    };
  } else if (matcher && matcher.matcher) {
    route = matcher;
  } else {
    throw new Error('Invalid parameters passed to fetch-mock');
  }

  this.addRoute(route);
  return this._mock();
};

FetchMock.prototype.once = function (matcher, response, options) {
  return this.mock(matcher, response, _extends$1({}, options, {
    times: 1
  }));
};

FetchMock.prototype._mock = function () {
  if (!this.isSandbox) {
    // Do this here rather than in the constructor to ensure it's scoped to the test
    this.realFetch = this.realFetch || FetchMock.global.fetch;
    FetchMock.global.fetch = this.fetchMock;
  }

  return this;
};

FetchMock.prototype._unMock = function () {
  if (this.realFetch) {
    FetchMock.global.fetch = this.realFetch;
    this.realFetch = null;
  }

  this.fallbackResponse = null;
  return this;
};

FetchMock.prototype.catch = function (response) {
  if (this.fallbackResponse) {
    console.warn('calling fetchMock.catch() twice - are you sure you want to overwrite the previous fallback response');
  }

  this.fallbackResponse = response || 'ok';
  return this._mock();
};

FetchMock.prototype.spy = function () {
  this._mock();

  return this.catch(this.realFetch);
};

FetchMock.prototype.fetchMock = function (url, opts) {
  var _this = this;

  var Promise = this.Promise || FetchMock.Promise;
  var resolveHoldingPromise = void 0;
  var holdingPromise = new Promise(function (res) {
    return resolveHoldingPromise = res;
  });

  this._holdingPromises.push(holdingPromise);

  var response = this.router(url, opts);

  if (!response) {
    console.warn('Unmatched ' + (opts && opts.method || 'GET') + ' to ' + url);
    this.push(null, [url, opts]);

    if (this.fallbackResponse) {
      response = this.fallbackResponse;
    } else {
      throw new Error('No fallback response defined for ' + (opts && opts.method || 'GET') + ' to ' + url);
    }
  }

  if (typeof response === 'function') {
    response = response(url, opts);
  }

  if (typeof response.then === 'function') {
    var responsePromise = response.then(function (response) {
      return _this.mockResponse(url, response, opts, resolveHoldingPromise);
    });
    return Promise.resolve(responsePromise); // Ensure Promise is always our implementation.
  } else {
    return this.mockResponse(url, response, opts, resolveHoldingPromise);
  }
};

FetchMock.prototype.router = function (url, opts) {
  var route = void 0;

  for (var i = 0, il = this.routes.length; i < il; i++) {
    route = this.routes[i];

    if (route.matcher(url, opts)) {
      this.push(route.name, [url, opts]);
      return route.response;
    }
  }
};

FetchMock.prototype.addRoute = function (route) {
  if (!route) {
    throw new Error('.mock() must be passed configuration for a route');
  } // Allows selective application of some of the preregistered routes


  this.routes.push(compileRoute(route, FetchMock.Request, FetchMock.Headers));
};

FetchMock.prototype.mockResponse = function (url, responseConfig, fetchOpts, resolveHoldingPromise) {
  var Promise = this.Promise || FetchMock.Promise; // It seems odd to call this in here even though it's already called within fetchMock
  // It's to handle the fact that because we want to support making it very easy to add a
  // delay to any sort of response (including responses which are defined with a function)
  // while also allowing function responses to return a Promise for a response config.

  if (typeof responseConfig === 'function') {
    responseConfig = responseConfig(url, fetchOpts);
  } // If the response is a pre-made Response, respond with it


  if (FetchMock.Response.prototype.isPrototypeOf(responseConfig)) {
    return this.respond(Promise.resolve(responseConfig), resolveHoldingPromise);
  } // If the response says to throw an error, throw it


  if (responseConfig.throws) {
    return this.respond(Promise.reject(responseConfig.throws), resolveHoldingPromise);
  } // If the response config looks like a status, start to generate a simple response


  if (typeof responseConfig === 'number') {
    responseConfig = {
      status: responseConfig
    }; // If the response config is not an object, or is an object that doesn't use
    // any reserved properties, assume it is meant to be the body of the response
  } else if (typeof responseConfig === 'string' || !(responseConfig.body || responseConfig.headers || responseConfig.throws || responseConfig.status || responseConfig.__redirectUrl)) {
    responseConfig = {
      body: responseConfig
    };
  } // Now we are sure we're dealing with a response config object, so start to
  // construct a real response from it


  var opts = responseConfig.opts || {}; // set the response url

  opts.url = responseConfig.__redirectUrl || url; // Handle a reasonably common misuse of the library - returning an object
  // with the property 'status'

  if (responseConfig.status && (typeof responseConfig.status !== 'number' || parseInt(responseConfig.status, 10) !== responseConfig.status || responseConfig.status < 200 || responseConfig.status > 599)) {
    throw new TypeError('Invalid status ' + responseConfig.status + ' passed on response object.\nTo respond with a JSON object that has status as a property assign the object to body\ne.g. {"body": {"status: "registered"}}');
  } // set up the response status


  opts.status = responseConfig.status || 200;
  opts.statusText = FetchMock.statusTextMap['' + opts.status]; // Set up response headers. The ternary operator is to cope with
  // new Headers(undefined) throwing in Chrome
  // https://code.google.com/p/chromium/issues/detail?id=335871

  opts.headers = responseConfig.headers ? new FetchMock.Headers(responseConfig.headers) : new FetchMock.Headers(); // start to construct the body

  var body = responseConfig.body; // convert to json if we need to

  opts.sendAsJson = responseConfig.sendAsJson === undefined ? FetchMock.config.sendAsJson : responseConfig.sendAsJson;

  if (opts.sendAsJson && responseConfig.body != null && (typeof body === 'undefined' ? 'undefined' : _typeof$4(body)) === 'object') {
    //eslint-disable-line
    body = JSON.stringify(body);
  } // On the server we need to manually construct the readable stream for the
  // Response object (on the client this is done automatically)


  if (FetchMock.stream) {
    var s = new FetchMock.stream.Readable();

    if (body != null) {
      //eslint-disable-line
      s.push(body, 'utf-8');
    }

    s.push(null);
    body = s;
  }

  var response = new FetchMock.Response(body, opts); // When mocking a followed redirect we must wrap the response in an object
  // which sets the redirected flag (not a writable property on the actual response)

  if (responseConfig.__redirectUrl) {
    response = Object.create(response, {
      redirected: {
        value: true
      }
    });
  }

  return this.respond(Promise.resolve(response), resolveHoldingPromise);
};

FetchMock.prototype.respond = function (response, resolveHoldingPromise) {
  response.then(resolveHoldingPromise, resolveHoldingPromise);
  return response;
};

FetchMock.prototype.flush = function () {
  return Promise.all(this._holdingPromises);
};

FetchMock.prototype.push = function (name, call) {
  if (name) {
    this._calls[name] = this._calls[name] || [];

    this._calls[name].push(call);

    this._matchedCalls.push(call);
  } else {
    this._unmatchedCalls.push(call);
  }
};

FetchMock.prototype.restore = function () {
  this._unMock();

  this.reset();
  this.routes = [];
  return this;
};

FetchMock.prototype.reset = function () {
  this._calls = {};
  this._matchedCalls = [];
  this._unmatchedCalls = [];
  this._holdingPromises = [];
  this.routes.forEach(function (route) {
    return route.reset && route.reset();
  });
  return this;
};

FetchMock.prototype.calls = function (name) {
  return name ? this._calls[name] || [] : {
    matched: this._matchedCalls,
    unmatched: this._unmatchedCalls
  };
};

FetchMock.prototype.lastCall = function (name) {
  var calls = name ? this.calls(name) : this.calls().matched;

  if (calls && calls.length) {
    return calls[calls.length - 1];
  } else {
    return undefined;
  }
};

FetchMock.prototype.lastUrl = function (name) {
  var call = this.lastCall(name);
  return call && call[0];
};

FetchMock.prototype.lastOptions = function (name) {
  var call = this.lastCall(name);
  return call && call[1];
};

FetchMock.prototype.called = function (name) {
  if (!name) {
    return !!(this._matchedCalls.length || this._unmatchedCalls.length);
  }

  return !!(this._calls[name] && this._calls[name].length);
};

FetchMock.prototype.done = function (name) {
  var _this2 = this;

  var names = name ? [name] : this.routes.map(function (r) {
    return r.name;
  }); // Can't use array.every because
  // a) not widely supported
  // b) would exit after first failure, which would break the logging

  return names.map(function (name) {
    if (!_this2.called(name)) {
      console.warn('Warning: ' + name + ' not called');
      return false;
    } // would use array.find... but again not so widely supported


    var expectedTimes = (_this2.routes.filter(function (r) {
      return r.name === name;
    }) || [{}])[0].times;

    if (!expectedTimes) {
      return true;
    }

    var actualTimes = _this2.calls(name).length;

    if (expectedTimes > actualTimes) {
      console.warn('Warning: ' + name + ' only called ' + actualTimes + ' times, but ' + expectedTimes + ' expected');
      return false;
    } else {
      return true;
    }
  }).filter(function (bool) {
    return !bool;
  }).length === 0;
};

FetchMock.config = {
  sendAsJson: true
};

FetchMock.prototype.configure = function (opts) {
  _extends$1(FetchMock.config, opts);
};

FetchMock.setImplementations = FetchMock.prototype.setImplementations = function (implementations) {
  FetchMock.Headers = implementations.Headers || FetchMock.Headers;
  FetchMock.Request = implementations.Request || FetchMock.Request;
  FetchMock.Response = implementations.Response || FetchMock.Response;
  FetchMock.Promise = implementations.Promise || FetchMock.Promise;
};

FetchMock.prototype.sandbox = function (Promise) {
  if (this.routes.length || this.fallbackResponse) {
    throw new Error('.sandbox() can only be called on fetch-mock instances that don\'t have routes configured already');
  }

  var instance = new FetchMock(); // this construct allows us to create a fetch-mock instance which is also
  // a callable function, while circumventing circularity when defining the
  // object that this function should be bound to

  var boundMock = void 0;

  var proxy = function proxy() {
    return boundMock.apply(null, arguments);
  };

  proxy._r = [2];

  var functionInstance = _extends$1(proxy, // Ensures that the entire returned object is a callable function
  FetchMock.prototype, // all prototype methods
  instance // instance data
  );

  functionInstance.bindMethods();
  boundMock = functionInstance.fetchMock;
  functionInstance.isSandbox = true;

  if (Promise) {
    functionInstance.Promise = Promise;
  }

  return functionInstance;
};

['get', 'post', 'put', 'delete', 'head', 'patch'].forEach(function (method) {
  FetchMock.prototype[method] = function (matcher, response, options) {
    return this.mock(matcher, response, _extends$1({}, options, {
      method: method.toUpperCase()
    }));
  };

  FetchMock.prototype[method + 'Once'] = function (matcher, response, options) {
    return this.once(matcher, response, _extends$1({}, options, {
      method: method.toUpperCase()
    }));
  };
});
var fetchMock$1 = FetchMock;

'use strict';

var statusTextMap = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Unordered Collection',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required'
};
var statusText = statusTextMap;

'use strict';

var theGlobal = typeof window !== 'undefined' ? window : self;
fetchMock$1.global = theGlobal;
fetchMock$1.statusTextMap = statusText;
fetchMock$1.setImplementations({
  Promise: theGlobal.Promise,
  Request: theGlobal.Request,
  Response: theGlobal.Response,
  Headers: theGlobal.Headers
});
var client = new fetchMock$1();

var _class$4;

function _applyDecoratedDescriptor$5(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function KeyValueTheme() {
  return {
    item: {
      display: 'flex'
    },
    key: {
      width: '20%'
    },
    value: {
      width: '80%'
    }
  };
}

KeyValueTheme._r = [2];
KeyValueTheme.theme = true;

function KeyView(_ref, _ref2) {
  var children = _ref.children;
  var theme = _ref2.theme;
  return lom_h("div", {
    "class": theme.key
  }, children);
}

KeyView._r = [1, [{
  theme: KeyValueTheme
}]];

function ValueView(_ref3, _ref4) {
  var children = _ref3.children;
  var theme = _ref4.theme;
  return lom_h("div", {
    "class": theme.value
  }, children);
}

ValueView._r = [1, [{
  theme: KeyValueTheme
}]];
function ItemView(_ref5, _ref6) {
  var children = _ref5.children;
  var theme = _ref6.theme;
  return lom_h("div", {
    "class": theme.item
  }, children);
}
ItemView._r = [1, [{
  theme: KeyValueTheme
}]];
ItemView.Key = KeyView;
ItemView.Value = ValueView;
var Locale = (_class$4 = function () {
  createClass$1(Locale, [{
    key: "lang",
    get: function get$$1() {
      var _this = this;

      setTimeout(function () {
        _this.lang = 'gb';
      }, 400);
      return this._defaultLang;
    },
    set: function set$$1(lang) {}
  }]);

  function Locale(lang) {
    this._defaultLang = void 0;
    this._defaultLang = lang;
  }

  return Locale;
}(), (_applyDecoratedDescriptor$5(_class$4.prototype, "lang", [mem], Object.getOwnPropertyDescriptor(_class$4.prototype, "lang"), _class$4.prototype), _applyDecoratedDescriptor$5(_class$4.prototype, "lang", [mem], Object.getOwnPropertyDescriptor(_class$4.prototype, "lang"), _class$4.prototype)), _class$4);
Locale._r = [0, [String]];
var BrowserLocalStorage = function () {
  function BrowserLocalStorage(storage, key) {
    this._storage = void 0;
    this._key = void 0;
    this._storage = storage;
    this._key = key;
  }

  var _proto = BrowserLocalStorage.prototype;

  _proto.get = function get$$1() {
    var value = this._storage.getItem(this._key);

    return !value ? null : JSON.parse(value || '');
  };

  _proto.set = function set$$1(value) {
    this._storage.setItem(this._key, JSON.stringify(value));
  };

  _proto.clear = function clear() {
    this._storage.removeItem(this._key);
  };

  _proto.clearAll = function clearAll() {
    this._storage.clear();
  };

  return BrowserLocalStorage;
}();
BrowserLocalStorage._r = [0, [Storage, String]];

function delayed(v, delay) {
  return function resp(url, params) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(v);
      }, delay);
    });
  };
}

delayed._r = [2, ["V", Number]];
function mockFetch(storage) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var mocks = arguments[2];
  mocks.forEach(function (createMock) {
    createMock(storage).forEach(function (data) {
      client.mock(_extends({}, data, {
        response: delayed(data.response, delay)
      }));
    });
  });
}
mockFetch._r = [2, [Storage]];

var _class$3;
var _descriptor$2;
var _class3;
var _descriptor2;

function _initDefineProp$2(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$4(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Hello = (_class$3 = function Hello() {
  _initDefineProp$2(this, "name", _descriptor$2, this);
}, (_descriptor$2 = _applyDecoratedDescriptor$4(_class$3.prototype, "name", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return 'test';
  }
})), _class$3);
var HelloOptions = (_class3 = function () {
  function HelloOptions() {
    _initDefineProp$2(this, "_props", _descriptor2, this);
  }

  createClass$1(HelloOptions, [{
    key: "actionName",
    get: function get$$1() {
      return this._props.name + '-hello';
    },
    set: function set$$1(name) {}
  }]);
  return HelloOptions;
}(), (_descriptor2 = _applyDecoratedDescriptor$4(_class3.prototype, "_props", [mem, props], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$4(_class3.prototype, "actionName", [mem], Object.getOwnPropertyDescriptor(_class3.prototype, "actionName"), _class3.prototype), _applyDecoratedDescriptor$4(_class3.prototype, "actionName", [mem], Object.getOwnPropertyDescriptor(_class3.prototype, "actionName"), _class3.prototype)), _class3);

var SomeService = function () {
  function SomeService(opts) {
    this._opts = void 0;
    this._opts = opts;
  }

  var _proto = SomeService.prototype;

  _proto.value = function value() {
    return this._opts.actionName + '-srv';
  };

  return SomeService;
}();

SomeService._r = [0, [HelloOptions]];
function HelloView(_, _ref) {
  var locale = _ref.locale,
      options = _ref.options,
      service = _ref.service,
      hello = _ref.hello;
  return lom_h("div", null, lom_h("h3", null, options.actionName, ", ", hello.name), lom_h(ItemView, null, lom_h(ItemView.Key, null, "Lang:"), lom_h(ItemView.Value, null, locale.lang)), lom_h(ItemView, null, lom_h(ItemView.Key, null, "Srv:"), lom_h(ItemView.Value, null, service.value())), lom_h(ItemView, null, lom_h(ItemView.Key, null, "Name:"), lom_h(ItemView.Value, null, lom_h("input", {
    value: hello.name,
    onInput: function onInput(_ref2) {
      var target = _ref2.target;
      hello.name = target.value;
    }
  }))), lom_h(ItemView, null, lom_h(ItemView.Key, null, "Action:"), lom_h(ItemView.Value, null, lom_h("input", {
    value: options.actionName,
    onInput: function onInput(_ref3) {
      var target = _ref3.target;
      options.actionName = target.value;
    }
  }))));
}
HelloView._r = [1, [{
  locale: Locale,
  options: HelloOptions,
  service: SomeService,
  hello: Hello
}]];

function getBody(body) {
  return typeof body === 'string' ? JSON.parse(body) : body || {};
}

getBody._r = [2];

function sortByDate(el1, el2) {
  if (!el2.created || el1.created) {
    return 0;
  }

  if (String(el1.created) > String(el2.created)) {
    return 1;
  }

  if (String(el1.created) < String(el2.created)) {
    return -1;
  }

  return 0;
}

sortByDate._r = [2, [{
  id: String,
  title: String,
  completed: Boolean
}, {
  id: String,
  title: String,
  completed: Boolean
}]];
function todoMocks(rawStorage) {
  var storage = new BrowserLocalStorage(rawStorage, 'lom_todomvc');
  var infos = new BrowserLocalStorage(rawStorage, 'lom_todomvc_info');
  var defaultTodos = [{
    id: 't1',
    title: 'test todo #1',
    completed: false
  }, {
    id: 't2',
    title: 'test todo #2',
    completed: true
  }];
  return [{
    method: 'GET',
    matcher: new RegExp('/api/todos'),
    response: function response(url, params) {
      // eslint-disable-line
      var newTodos = storage.get();

      if (!newTodos) {
        newTodos = defaultTodos;
        storage.set(newTodos);
      }

      return newTodos.sort(sortByDate);
    }
  }, {
    method: 'GET',
    matcher: new RegExp('/api/todo/(.*)/info'),
    response: function response(url, params) {
      // eslint-disable-line
      var data = infos.get() || [];
      var id = url.match(new RegExp('/api/todo/(.+)/info'))[1];
      var i = data.find(function (inf) {
        return inf.id === id;
      });
      return {
        id: id,
        description: i ? i.description : 'desc'
      };
    }
  }, {
    method: 'PUT',
    matcher: new RegExp('/api/todos'),
    response: function response(url, params) {
      // eslint-disable-line
      var data = storage.get();
      var todos = data || defaultTodos;
      var updates = new Map(getBody(params.body));
      var newTodos = todos.map(function (todo) {
        return updates.has(todo.id) ? todo : _extends({}, todo, updates.get(todo.id));
      }).sort(sortByDate);
      storage.set(newTodos);
      return newTodos;
    }
  }, {
    method: 'DELETE',
    matcher: new RegExp('/api/todos'),
    response: function response(url, params) {
      // eslint-disable-line
      var data = storage.get();
      var todos = data || defaultTodos;
      var ids = getBody(params.body);
      var newTodos = todos.filter(function (todo) {
        return ids.indexOf(todo.id) === -1;
      });
      storage.set(newTodos);
      return newTodos.map(function (_ref) {
        var id = _ref.id;
        return id;
      });
    }
  }, {
    method: 'DELETE',
    matcher: new RegExp('/api/todo/(.*)'),
    response: function response(url, params) {
      // eslint-disable-line
      var data = storage.get();
      var todos = data || [];
      var id = url.match(new RegExp('/api/todo/(.+)'))[1];
      var newTodos = todos.filter(function (todo) {
        return todo.id !== id;
      });
      storage.set(newTodos.sort(sortByDate));
      return {
        id: id
      };
    }
  }, {
    method: 'POST',
    matcher: new RegExp('/api/todo/(.*)'),
    response: function response(url, params) {
      // eslint-disable-line
      var data = storage.get();
      var id = url.match(new RegExp('/api/todo/(.+)'))[1];
      var newTodo = getBody(params.body);
      var newTodos = (data || []).map(function (todo) {
        return todo.id === id ? newTodo : todo;
      });
      storage.set(newTodos);
      return newTodo;
    }
  }, {
    method: 'PUT',
    matcher: new RegExp('/api/todo'),
    response: function response(url, params) {
      // eslint-disable-line
      var todos = storage.get();
      var body = getBody(params.body);
      var id = uuid();
      var newTodo = _extends({}, body, {
        id: id
      });
      todos.push(newTodo);
      storage.set(todos);
      infos.set((infos.get() || []).concat([{
        id: id,
        description: 'desc#' + id
      }]));
      return newTodo;
    }
  }];
}
todoMocks._r = [2, [Storage]];

var _class2$2;
var _descriptor$3;

function _initDefineProp$3(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$6(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function toJson(r) {
  return r.json();
}

toJson._r = [2, [Response]];

var TodoModel = function () {
  function TodoModel() {
    var todo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var store = arguments[1];
    this.completed = void 0;
    this._title = void 0;
    this.id = void 0;
    this._store = void 0;
    this._title = todo.title || '';
    this.id = todo.id || uuid();
    this.completed = todo.completed || false;
    this._store = store;
  }

  var _proto = TodoModel.prototype;

  _proto.destroy = function destroy() {
    this._store.remove(this.id);
  };

  _proto.toggle = function toggle() {
    this.completed = !this.completed;

    this._store.saveTodo(this.toJSON());
  };

  _proto.toJSON = function toJSON() {
    return {
      completed: this.completed,
      title: this._title,
      id: this.id
    };
  };

  createClass$1(TodoModel, [{
    key: "title",
    get: function get$$1() {
      return this._title;
    },
    set: function set$$1(t) {
      this._title = t;

      this._store.saveTodo(this.toJSON());
    }
  }]);
  return TodoModel;
}();

TodoModel._r = [0, [TodoService]];
var TodoService = (_class2$2 = function () {
  function TodoService() {
    _initDefineProp$3(this, "opCount", _descriptor$3, this);
  }

  var _proto2 = TodoService.prototype;

  _proto2.todoExtInfo = function todoExtInfo(id, info) {
    var _this = this;

    if (info !== undefined && !(info instanceof Error)) return info;
    fetch("/api/todo/" + id + "/info", {
      method: 'GET'
    }).then(toJson).then(function (info) {
      _this.todoExtInfo(id, info);
    }).catch(function (error) {
      _this.todoExtInfo(id, error);
    });
    throw new mem.Wait();
  };

  _proto2._handlePromise = function _handlePromise(p) {
    var _this2 = this;

    this.opCount++;
    return p.then(function () {
      _this2.opCount--;
    }).catch(function (e) {
      _this2.opCount--;
      _this2.todos = e;
    });
  };

  _proto2.addTodo = function addTodo(title) {
    var _this3 = this;

    var todo = new TodoModel({
      title: title
    }, this);
    this.todos = this.todos.concat([todo]);

    this._handlePromise(fetch('/api/todo', {
      method: 'PUT',
      body: JSON.stringify(todo)
    }).then(toJson).then(function (updatedTodo) {
      _this3.todos = _this3.todos.map(function (t) {
        return t.id === todo.id ? new TodoModel(updatedTodo, _this3) : t;
      });
    }));
  };

  _proto2.saveTodo = function saveTodo(todo) {
    var _this4 = this;

    this.todos = this.todos.map(function (t) {
      return t.id === todo.id ? new TodoModel(todo, _this4) : t;
    });

    this._handlePromise(fetch("/api/todo/" + todo.id, {
      method: 'POST',
      body: JSON.stringify(todo)
    }).then(toJson).then(function (updatedTodo) {
      _this4.todos = _this4.todos.map(function (t) {
        return t.id === todo.id ? new TodoModel(updatedTodo, _this4) : t;
      });
    }));
  };

  _proto2.remove = function remove(id) {
    this.todos = this.todos.filter(function (todo) {
      return todo.id !== id;
    });

    this._handlePromise(fetch("/api/todo/" + id, {
      method: 'DELETE'
    }));
  };

  _proto2.toggleAll = function toggleAll() {
    var _this5 = this;

    this.todos = this.todos.map(function (todo) {
      return new TodoModel({
        title: todo.title,
        id: todo.id,
        completed: true
      }, _this5);
    });

    this._handlePromise(fetch("/api/todos", {
      method: 'PUT',
      body: JSON.stringify(this.todos.map(function (todo) {
        return [todo.id, {
          completed: true
        }];
      }))
    }));
  };

  _proto2.clearCompleted = function clearCompleted() {
    var newTodos = [];
    var delIds = [];

    for (var i = 0; i < this.todos.length; i++) {
      var todo = this.todos[i];

      if (todo.completed) {
        delIds.push(todo.id);
      } else {
        newTodos.push(todo);
      }
    }

    this.todos = newTodos;

    this._handlePromise(fetch("/api/todos", {
      method: 'DELETE',
      body: JSON.stringify(delIds)
    }));
  };

  createClass$1(TodoService, [{
    key: "isOperationRunning",
    get: function get$$1() {
      return this.opCount !== 0;
    }
  }, {
    key: "todos",
    get: function get$$1() {
      var _this6 = this;

      fetch('/api/todos', {
        method: 'GET'
      }).then(toJson).then(function (todos) {
        _this6.todos = todos.map(function (todo) {
          return new TodoModel(todo, _this6);
        });
      }).catch(function (e) {
        _this6.todos = e;
      });
      throw new mem.Wait();
    },
    set: function set$$1(todos) {}
  }, {
    key: "activeTodoCount",
    get: function get$$1() {
      return this.todos.reduce(function (sum, todo) {
        return sum + (todo.completed ? 0 : 1);
      }, 0);
    }
  }, {
    key: "completedCount",
    get: function get$$1() {
      return this.todos.length - this.activeTodoCount;
    }
  }]);
  return TodoService;
}(), (_descriptor$3 = _applyDecoratedDescriptor$6(_class2$2.prototype, "opCount", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor$6(_class2$2.prototype, "todoExtInfo", [memkey], Object.getOwnPropertyDescriptor(_class2$2.prototype, "todoExtInfo"), _class2$2.prototype), _applyDecoratedDescriptor$6(_class2$2.prototype, "todos", [mem], Object.getOwnPropertyDescriptor(_class2$2.prototype, "todos"), _class2$2.prototype), _applyDecoratedDescriptor$6(_class2$2.prototype, "todos", [mem], Object.getOwnPropertyDescriptor(_class2$2.prototype, "todos"), _class2$2.prototype), _applyDecoratedDescriptor$6(_class2$2.prototype, "activeTodoCount", [mem], Object.getOwnPropertyDescriptor(_class2$2.prototype, "activeTodoCount"), _class2$2.prototype), _applyDecoratedDescriptor$6(_class2$2.prototype, "remove", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "remove"), _class2$2.prototype), _applyDecoratedDescriptor$6(_class2$2.prototype, "toggleAll", [action], Object.getOwnPropertyDescriptor(_class2$2.prototype, "toggleAll"), _class2$2.prototype)), _class2$2);

var _class$5;

function _applyDecoratedDescriptor$7(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var TODO_FILTER = {
  ALL: 'all',
  COMPLETE: 'complete',
  ACTIVE: 'active'
};
var TodoFilterService = (_class$5 = function () {
  function TodoFilterService(todoService, locationStore) {
    this._todoService = void 0;
    this._locationStore = void 0;
    this._todoService = todoService;
    this._locationStore = locationStore;
  }

  createClass$1(TodoFilterService, [{
    key: "filter",
    get: function get$$1() {
      return this._locationStore.location('todo_filter') || TODO_FILTER.ALL;
    },
    set: function set$$1(filter) {
      return this._locationStore.location('todo_filter', filter, true);
    }
  }, {
    key: "filteredTodos",
    get: function get$$1() {
      var todos = this._todoService.todos;

      switch (this.filter) {
        case TODO_FILTER.ALL:
          return todos;

        case TODO_FILTER.COMPLETE:
          return todos.filter(function (todo) {
            return !!todo.completed;
          });

        case TODO_FILTER.ACTIVE:
          return todos.filter(function (todo) {
            return !todo.completed;
          });

        default:
          throw new Error("Unknown filter value: " + this.filter);
      }
    }
  }]);
  return TodoFilterService;
}(), (_applyDecoratedDescriptor$7(_class$5.prototype, "filteredTodos", [mem], Object.getOwnPropertyDescriptor(_class$5.prototype, "filteredTodos"), _class$5.prototype)), _class$5);
TodoFilterService._r = [0, [TodoService, AbstractLocationStore]];

var _class$6;
var _descriptor$4;

function _initDefineProp$4(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$8(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var TodoToAdd = (_class$6 = function () {
  function TodoToAdd() {
    var _this = this;

    _initDefineProp$4(this, "title", _descriptor$4, this);

    this._todoService = void 0;

    this.onKeyDown = function (e) {
      if (e.keyCode === 13 && _this.title) {
        _this._todoService.addTodo(_this.title);

        _this.title = '';
      }
    };
  }

  var _proto = TodoToAdd.prototype;

  _proto.onInput = function onInput(_ref) {
    var target = _ref.target;
    this.title = target.value;
  };

  createClass$1(TodoToAdd, [{
    key: "props",
    set: function set$$1(_ref2) {
      var todoService = _ref2.todoService;
      this._todoService = todoService;
    }
  }]);
  return TodoToAdd;
}(), (_descriptor$4 = _applyDecoratedDescriptor$8(_class$6.prototype, "title", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor$8(_class$6.prototype, "props", [props], Object.getOwnPropertyDescriptor(_class$6.prototype, "props"), _class$6.prototype), _applyDecoratedDescriptor$8(_class$6.prototype, "onInput", [action], Object.getOwnPropertyDescriptor(_class$6.prototype, "onInput"), _class$6.prototype)), _class$6);

function TodoHeaderTheme() {
  var _newTodo;

  return {
    newTodo: (_newTodo = {
      position: 'relative',
      margin: '0',
      width: '100%',
      fontSize: '24px',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      lineHeight: '1.4em',
      border: '0',
      color: 'inherit',
      padding: '16px 16px 16px 60px'
    }, _newTodo["border"] = 'none', _newTodo.background = 'rgba(0, 0, 0, 0.003)', _newTodo.boxShadow = 'inset 0 -2px 1px rgba(0,0,0,0.03)', _newTodo.boxSizing = 'border-box', _newTodo['-webkit-font-smoothing'] = 'antialiased', _newTodo['-moz-osx-font-smoothing'] = 'grayscale', _newTodo)
  };
}

TodoHeaderTheme._r = [2];
TodoHeaderTheme.theme = true;
function TodoHeaderView(_, _ref3) {
  var todoToAdd = _ref3.todoToAdd,
      theme = _ref3.theme;
  return lom_h("header", null, lom_h("input", {
    "class": theme.newTodo,
    placeholder: "What needs to be done?",
    onInput: todoToAdd.onInput,
    value: todoToAdd.title,
    onKeyDown: todoToAdd.onKeyDown,
    autoFocus: true
  }));
}
TodoHeaderView._r = [1, [{
  theme: TodoHeaderTheme,
  todoToAdd: TodoToAdd
}]];

var _class$7;
var _descriptor$5;
var _descriptor2$1;
var _descriptor3;

function _initDefineProp$5(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$9(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
var TodoItemStore = (_class$7 = function () {
  function TodoItemStore() {
    var _this = this;

    _initDefineProp$5(this, "todoBeingEditedId", _descriptor$5, this);

    _initDefineProp$5(this, "editText", _descriptor2$1, this);

    _initDefineProp$5(this, "props", _descriptor3, this);

    this.beginEdit = function () {
      var todo = _this.props.todo;
      _this.todoBeingEditedId = todo.id;
      _this.editText = todo.title;
    };

    this._focused = false;

    this.setEditInputRef = function (el) {
      if (el && !_this._focused) {
        _this._focused = true;
        setTimeout(function () {
          if (el) {
            el.focus();
          }
        }, 0);
      }
    };

    this.handleSubmit = function (event) {
      var val = _this.editText.trim();

      if (val) {
        _this.props.todo.title = val;
        _this.editText = '';
      } else {
        _this.handleDestroy();
      }

      _this.todoBeingEditedId = null;
    };

    this.handleKeyDown = function (event) {
      if (event.which === ESCAPE_KEY) {
        _this.editText = _this.props.todo.title;
        _this.todoBeingEditedId = null;
      } else if (event.which === ENTER_KEY) {
        _this.handleSubmit(event);
      }
    };

    this.toggle = function () {
      _this.props.todo.toggle();

      _this.todoBeingEditedId = null;
    };

    this.handleDestroy = function () {
      _this.props.todo.destroy();

      _this.todoBeingEditedId = null;
    };
  }

  var _proto = TodoItemStore.prototype;

  _proto.setText = function setText(_ref) {
    var target = _ref.target;
    this.editText = target.value;
  };

  return TodoItemStore;
}(), (_descriptor$5 = _applyDecoratedDescriptor$9(_class$7.prototype, "todoBeingEditedId", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$1 = _applyDecoratedDescriptor$9(_class$7.prototype, "editText", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor$9(_class$7.prototype, "props", [props], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$9(_class$7.prototype, "setText", [action], Object.getOwnPropertyDescriptor(_class$7.prototype, "setText"), _class$7.prototype)), _class$7);

function TodoItemTheme() {
  var itemBase = {
    position: 'relative',
    fontSize: '24px',
    borderBottom: '1px solid #ededed',
    '&:last-child': {
      borderBottom: 'none'
    },
    '&:hover $destroy': {
      display: 'block'
    }
  };
  var viewLabelBase = {
    wordBreak: 'break-all',
    padding: '15px 15px 15px 60px',
    display: 'block',
    lineHeight: '1.2',
    transition: 'color 0.4s'
  };
  return {
    regular: _extends({}, itemBase),
    completed: _extends({}, itemBase),
    editing: {
      borderBottom: 'none',
      padding: 0,
      '&:last-child': {
        marginBottom: '-1px'
      }
    },
    edit: {
      backgroundColor: '#F2FFAB',
      display: 'block',
      border: 0,
      position: 'relative',
      fontSize: '24px',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      lineHeight: '1.4em',
      width: '406px',
      padding: '12px 16px',
      margin: '0 0 0 43px'
    },
    toggle: {
      textAlign: 'center',
      width: '40px',

      /* auto, since non-WebKit browsers doesn't support input styling */
      height: 'auto',
      position: 'absolute',
      top: 0,
      bottom: 0,
      margin: 'auto 0',
      border: 'none',

      /* Mobile Safari */
      '-webkit-appearance': 'none',
      appearance: 'none',
      opacity: 0,
      '& + label': {
        /*
            Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center left'
      },
      '&:checked + label': {
        backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')"
      }
    },
    viewLabelRegular: _extends({}, viewLabelBase),
    viewLabelCompleted: _extends({}, viewLabelBase, {
      color: '#d9d9d9',
      textDecoration: 'line-through'
    }),
    destroy: {
      padding: 0,
      border: 0,
      background: 'none',
      verticalAlign: 'baseline',
      display: 'none',
      position: 'absolute',
      right: '10px',
      top: 0,
      bottom: 0,
      width: '40px',
      height: '40px',
      fontSize: '30px',
      margin: 'auto 0',
      color: '#cc9a9a',
      marginBottom: '11px',
      transition: 'color 0.2s ease-out',
      '&:hover': {
        color: '#af5b5e'
      },
      '&:after': {
        content: '\'×\''
      }
    }
  };
}

TodoItemTheme._r = [2];
TodoItemTheme.theme = true;
function TodoItemView(_ref2, _ref3) {
  var todo = _ref2.todo;
  var itemStore = _ref3.itemStore,
      theme = _ref3.theme,
      service = _ref3.service;
  var info = service.todoExtInfo(todo.id);
  return itemStore.todoBeingEditedId === todo.id ? lom_h("li", {
    "class": theme.editing
  }, lom_h("input", {
    id: "edit",
    ref: itemStore.setEditInputRef,
    "class": theme.edit,
    value: itemStore.editText,
    onBlur: itemStore.handleSubmit,
    onInput: itemStore.setText,
    onKeyDown: itemStore.handleKeyDown
  })) : lom_h("li", {
    "class": todo.completed ? theme.completed : theme.regular
  }, lom_h("input", {
    id: "toggle",
    "class": theme.toggle,
    type: "checkbox",
    checked: todo.completed,
    onChange: itemStore.toggle
  }), lom_h("label", {
    "class": todo.completed ? theme.viewLabelCompleted : theme.viewLabelRegular,
    id: "beginEdit",
    onDblClick: itemStore.beginEdit
  }, todo.title, ", desc: ", info.description), lom_h("button", {
    "class": theme.destroy,
    id: "destroy",
    onClick: itemStore.handleDestroy
  }));
}
TodoItemView._r = [1, [{
  service: TodoService,
  theme: TodoItemTheme,
  itemStore: TodoItemStore
}]];

function TodoMainTheme() {
  var toggleAll = {
    outline: 'none',
    position: 'absolute',
    top: '-55px',
    left: '-12px',
    width: '60px',
    height: '34px',
    textAlign: 'center',
    border: 'none',

    /* Mobile Safari */
    '&:before': {
      content: '\'❯\'',
      fontSize: '22px',
      color: '#e6e6e6',
      padding: '10px 27px 10px 27px'
    },
    '&:checked:before': {
      color: '#737373'
    }
  };
  return {
    main: {
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid #e6e6e6'
    },
    toggleAll: _extends({}, toggleAll),
    todoList: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },

    /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
    */
    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      toggleAll: _extends({}, toggleAll, {
        transform: 'rotate(90deg)',
        appearance: 'none',
        '-webkit-appearance': 'none'
      })
    }
  };
}

TodoMainTheme._r = [2];
TodoMainTheme.theme = true;
function TodoMainView(_ref, _ref2) {
  var todoService = _ref.todoService,
      todoFilterService = _ref.todoFilterService;
  var theme = _ref2.theme;

  if (!todoService.todos.length) {
    return null;
  }

  return lom_h("section", {
    "class": theme.main
  }, lom_h("input", {
    "class": theme.toggleAll,
    type: "checkbox",
    onChange: todoService.toggleAll,
    checked: todoService.activeTodoCount === 0
  }), lom_h("ul", {
    "class": theme.todoList
  }, todoFilterService.filteredTodos.map(function (todo) {
    return lom_h(TodoItemView, {
      key: todo.id,
      todo: todo
    });
  })));
}
TodoMainView._r = [1, [{
  theme: TodoMainTheme
}]];

var links = [{
  id: TODO_FILTER.ALL,
  title: 'All'
}, {
  id: TODO_FILTER.ACTIVE,
  title: 'Active'
}, {
  id: TODO_FILTER.COMPLETE,
  title: 'Completed'
}];

function createHandler(todoFilterService, id) {
  return function handler(e) {
    e.preventDefault();
    todoFilterService.filter = id;
  };
}

createHandler._r = [2, [TodoFilterService, "V"]];

function TodoFooterTheme() {
  var linkBase = {
    color: 'inherit',
    margin: '3px',
    padding: '3px 7px',
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: '3px',
    '& :hover': {
      borderColor: 'rgba(175, 47, 47, 0.1)'
    }
  };
  return {
    footer: {
      color: '#777',
      padding: '10px 15px',
      height: '20px',
      textAlign: 'center',
      borderTop: '1px solid #e6e6e6',
      '&:before': {
        content: '\'\'',
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
        height: '50px',
        overflow: 'hidden',
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2),\n                    0 8px 0 -3px #f6f6f6,\n                    0 9px 1px -3px rgba(0, 0, 0, 0.2),\n                    0 16px 0 -6px #f6f6f6,\n                    0 17px 2px -6px rgba(0, 0, 0, 0.2)"
      }
    },
    todoCount: {
      float: 'left',
      textAlign: 'left'
    },
    filters: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      position: 'absolute',
      right: 0,
      left: 0
    },
    filterItem: {
      display: 'inline'
    },
    linkRegular: _extends({}, linkBase),
    linkSelected: _extends({}, linkBase, {
      borderColor: 'rgba(175, 47, 47, 0.2)'
    }),
    clearCompleted: {
      margin: 0,
      padding: 0,
      border: 0,
      background: 'none',
      fontSize: '100%',
      verticalAlign: 'baseline',
      appearance: 'none',
      float: 'right',
      position: 'relative',
      lineHeight: '20px',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  };
}

TodoFooterTheme._r = [2];
TodoFooterTheme.theme = true;
function TodoFooterView(_ref, _ref2) {
  var todoService = _ref.todoService,
      todoFilterService = _ref.todoFilterService;
  var theme = _ref2.theme;

  if (!todoService.activeTodoCount && !todoService.completedCount) {
    return null;
  }

  var filter = todoFilterService.filter;
  return lom_h("footer", {
    "class": theme.footer
  }, lom_h("span", {
    "class": theme.todoCount
  }, lom_h("strong", null, todoService.activeTodoCount), " item(s) left"), lom_h("ul", {
    "class": theme.filters
  }, links.map(function (link) {
    return lom_h("li", {
      key: link.id,
      "class": theme.filterItem
    }, lom_h("a", {
      id: "todo-filter-" + link.id,
      "class": filter === link.id ? theme.linkSelected : theme.linkRegular,
      href: "?todo_filter=" + link.id,
      onClick: createHandler(todoFilterService, link.id)
    }, link.title));
  })), todoService.completedCount === 0 ? null : lom_h("button", {
    "class": theme.clearCompleted,
    onClick: function onClick() {
      return todoService.clearCompleted();
    }
  }, "Clear completed"));
}
TodoFooterView._r = [1, [{
  theme: TodoFooterTheme
}]];

function TodoAppTheme() {
  return {
    todoapp: {
      background: '#fff',
      position: 'relative',
      border: '1px solid #ededed',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
    },
    '@global': {
      ':focus': {
        outline: 0
      },
      html: {
        margin: 0,
        padding: 0
      },
      body: {
        font: '14px "Helvetica Neue", Helvetica, Arial, sans-serif',
        lineHeight: '1.4em',
        background: '#f5f5f5',
        color: '#4d4d4d',
        minWidth: '230px',
        maxWidth: '550px',
        margin: '0 auto',
        padding: 0,
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        fontWeight: '300'
      }
    }
  };
}

TodoAppTheme._r = [2];
TodoAppTheme.theme = true;
function TodoApp(_ref, _ref2) {
  objectDestructuringEmpty(_ref);
  var todoService = _ref2.todoService,
      todoFilterService = _ref2.todoFilterService,
      theme = _ref2.theme;
  return lom_h("div", null, todoService.activeTodoCount > 0 ? null : null, lom_h("div", {
    style: {
      padding: '0.3em 0.5em'
    }
  }, todoService.isOperationRunning ? 'Saving...' : 'Idle'), lom_h("div", {
    "class": theme.todoapp
  }, lom_h(TodoHeaderView, {
    todoService: todoService
  }), lom_h(TodoMainView, {
    todoService: todoService,
    todoFilterService: todoFilterService
  }), lom_h(TodoFooterView, {
    todoService: todoService,
    todoFilterService: todoFilterService
  })));
}
TodoApp._r = [1, [{
  todoService: TodoService,
  todoFilterService: TodoFilterService,
  theme: TodoAppTheme
}]];

var _class$8;
var _descriptor$6;

function _initDefineProp$6(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$10(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var AutocompleteService = (_class$8 = function () {
  function AutocompleteService() {
    var _this = this;

    _initDefineProp$6(this, "nameToSearch", _descriptor$6, this);

    this._handler = 0;

    this.setValue = function (e) {
      _this.nameToSearch = e.target.value;
    };
  }

  var _proto = AutocompleteService.prototype;

  _proto._destroy = function _destroy() {
    clearTimeout(this._handler);
  };

  createClass$1(AutocompleteService, [{
    key: "props",
    set: function set$$1(_ref) {
      var initialValue = _ref.initialValue;
      this.nameToSearch = initialValue;
    }
  }, {
    key: "searchResults",
    get: function get$$1() {
      var _this2 = this;

      clearTimeout(this._handler);
      var name = this.nameToSearch;
      this._handler = setTimeout(function () {
        fetch("/api/autocomplete?q=" + name).then(function (r) {
          return r.json();
        }).then(function (data) {
          _this2.searchResults = data;
        }).catch(function (e) {
          _this2.searchResults = e;
        });
      }, 500);
      throw new mem.Wait();
    },
    set: function set$$1(searchResults) {}
  }]);
  return AutocompleteService;
}(), (_descriptor$6 = _applyDecoratedDescriptor$10(_class$8.prototype, "nameToSearch", [mem], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$10(_class$8.prototype, "props", [props], Object.getOwnPropertyDescriptor(_class$8.prototype, "props"), _class$8.prototype), _applyDecoratedDescriptor$10(_class$8.prototype, "searchResults", [mem], Object.getOwnPropertyDescriptor(_class$8.prototype, "searchResults"), _class$8.prototype), _applyDecoratedDescriptor$10(_class$8.prototype, "searchResults", [mem], Object.getOwnPropertyDescriptor(_class$8.prototype, "searchResults"), _class$8.prototype)), _class$8);

function AutocompleteResultsView(_ref2) {
  var searchResults = _ref2.searchResults;
  return lom_h("ul", null, searchResults.map(function (result, i) {
    return lom_h("li", {
      key: result + i
    }, result);
  }));
}

AutocompleteResultsView._r = [1];
function AutocompleteView(_, service) {
  return lom_h("div", null, lom_h("div", null, "Filter:", lom_h("input", {
    value: service.nameToSearch,
    onInput: service.setValue
  })), "Values:", lom_h(AutocompleteResultsView, {
    searchResults: service.searchResults
  }));
}
AutocompleteView._r = [1, [AutocompleteService]];
function autocompleteMocks(rawStorage) {
  var fixture = ['John Doe', 'Vasia Pupkin'];
  return [{
    method: 'GET',
    matcher: new RegExp('/api/autocomplete'),
    response: function response(url, params) {
      // eslint-disable-line
      var names = url.match(new RegExp('/api/autocomplete\\?q=(.+)'));
      var name = names && names.length ? names[1] : '';
      return name ? fixture.filter(function (userName) {
        return userName.indexOf(name) === 0;
      }) : fixture;
    }
  }];
}
autocompleteMocks._r = [2, [Storage]];

var _class$9;
var _descriptor$7;

function _initDefineProp$7(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$11(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Store$1 = (_class$9 = function Store() {
  _initDefineProp$7(this, "red", _descriptor$7, this);
}, (_descriptor$7 = _applyDecoratedDescriptor$11(_class$9.prototype, "red", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return 140;
  }
})), _class$9);

function CssChangeTheme(store) {
  return {
    wrapper: {
      background: "rgb(" + store.red + ", 0, 0)"
    }
  };
}

CssChangeTheme._r = [2, [Store$1]];
CssChangeTheme.theme = true;
function CssChangeView(_, _ref) {
  var store = _ref.store,
      theme = _ref.theme;
  return lom_h("div", {
    className: theme.wrapper
  }, "color via css ", store.red, ": ", lom_h("input", {
    type: "range",
    min: "0",
    max: "255",
    value: store.red,
    onInput: function onInput(_ref2) {
      var target = _ref2.target;
      store.red = Number(target.value);
    }
  }));
}
CssChangeView._r = [1, [{
  theme: CssChangeTheme,
  store: Store$1
}]];

var _class;
var _descriptor;
var _class2;
var _temp;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

mockFetch(localStorage, 500, [todoMocks, autocompleteMocks]);
var Store = (_class = (_temp = _class2 = function () {
  function Store(locationStore) {
    this._locationStore = void 0;
    this.pages = ['hello', 'counter', 'error', 'todomvc', 'autocomplete', 'css-change'];

    _initDefineProp(this, "name", _descriptor, this);

    this._locationStore = locationStore;
  }

  createClass$1(Store, [{
    key: "page",
    get: function get$$1() {
      return this._locationStore.location('page') || this.pages[0];
    },
    set: function set$$1(page) {
      return this._locationStore.location('page', page, true);
    }
  }]);
  return Store;
}(), _class2.deps = [AbstractLocationStore], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return 'vvv';
  }
})), _class);
Store._r = [0, [AbstractLocationStore]];

function AppView(_ref, _ref2) {
  var store = _ref2.store;
  var page = void 0;

  switch (store.page) {
    case 'hello':
      page = lom_h(HelloView, {
        name: store.name
      });
      break;

    case 'counter':
      page = lom_h(CounterView, null);
      break;

    case 'autocomplete':
      page = lom_h(AutocompleteView, {
        initialValue: store.name
      });
      break;

    case 'todomvc':
      page = lom_h(TodoApp, null);
      break;

    case 'css-change':
      page = lom_h(CssChangeView, null);
      break;

    default:
      page = lom_h("div", null, "Unknown page");
  }

  return lom_h("div", {
    style: {
      dislay: 'flex',
      justifyContent: 'center'
    }
  }, lom_h("div", {
    style: {
      padding: '1em'
    }
  }, store.pages.map(function (link) {
    return lom_h("button", {
      key: link,
      style: {
        margin: '0.3em'
      },
      id: link,
      onClick: function onClick() {
        return store.page = link;
      }
    }, link);
  })), lom_h("div", {
    style: {
      border: '1px solid gray',
      padding: '1em',
      margin: '0 1em'
    }
  }, lom_h("h1", null, store.page), page), lom_h(ItemView, null, lom_h(ItemView.Key, null, "APPName:"), lom_h(ItemView.Value, null, lom_h("input", {
    value: store.name,
    onInput: function onInput(_ref3) {
      var target = _ref3.target;
      store.name = target.value;
    }
  }))));
}

AppView._r = [1, [{
  store: Store
}]];
render(lom_h(AppView, {
  lang: "ru"
}), document.getElementById('app'));

}());
//# sourceMappingURL=app.js.map
