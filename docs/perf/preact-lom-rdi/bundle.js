(function () {
'use strict';

var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
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







var createClass$2 = function () {
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











var inheritsLoose$2 = function (subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};

// eslint-disable-line
var ATOM_STATUS_DESTROYED = 0;
var ATOM_STATUS_OBSOLETE = 1;
var ATOM_STATUS_CHECKING = 2;
var ATOM_STATUS_PULLING = 3;
var ATOM_STATUS_ACTUAL = 4;
var catchedId = Symbol('lom_atom_catched');

var _typeof$1 = typeof Symbol === "function" && _typeof$2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$2(obj);
};

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

var inheritsLoose$1 = function inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};

inheritsLoose$1._r = [2];
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
  inheritsLoose$1(AtomWait, _Error);

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

  createClass$1(Atom, [{
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
  inheritsLoose$1(ConsoleLogger, _BaseLogger);

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
  forcedFn.displayName = name + "*";
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

function memProp(proto, name, descr, normalize) {
  var handlerKey = name + "$";

  if (proto[handlerKey] !== undefined) {
    return undefined;
  }

  proto[handlerKey] = descr.get === undefined && descr.set === undefined ? createValueHandler(descr.initializer) : createGetSetHandler(descr.get, descr.set);
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
    result += "." + key + ":" + (_typeof$1(_value) === 'object' ? JSON.stringify(_value) : _value);
  }

  return result;
}

getKeyFromObj._r = [2];

function getKey(params) {
  if (!params) return '';
  if (params instanceof Array) return JSON.stringify(params);
  if (_typeof$1(params) === 'object') return getKeyFromObj(params);
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
  forcedFn.displayName = name + "*";
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

  action.displayName = hk;
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

  action.displayName = name || fn.displayName || fn.name;
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

var _typeof = typeof Symbol === "function" && _typeof$2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$2(obj);
};

var createClass = function () {
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

var inheritsLoose = function inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
};

inheritsLoose._r = [2];

var _class2;

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
  }
};
var SheetManager = (_class2 = function () {
  function SheetManager(sheetProcessor, injector) {
    this._sheetProcessor = sheetProcessor || defaultSheetProcessor;
    this._injector = injector;
  }

  SheetManager.prototype.sheet = function sheet(key, value, force$$1, oldValue) {
    if (value !== undefined) return value;

    if (oldValue === undefined) {
      var newValue = this._sheetProcessor.createStyleSheet(this._injector.invoke(key));

      newValue.attach();
      return newValue;
    }

    oldValue.update(undefined, this._injector.invoke(key));
    oldValue.attach();
    return oldValue;
  };

  SheetManager.prototype.destroy = function destroy(value) {
    value.detach();
  };

  return SheetManager;
}(), _applyDecoratedDescriptor$1(_class2.prototype, "sheet", [memkey], Object.getOwnPropertyDescriptor(_class2.prototype, "sheet"), _class2.prototype), _class2);
var depId = 0;

var Alias = function Alias(dest) {
  dest.__rdi_id = '' + ++depId;
  this.dest = dest;
};

Alias._r = [2];

var Injector = function () {
  function Injector(items, sheetProcessor, displayName, instance, cache) {
    this._resolved = false;
    this._listeners = undefined;
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
      value = this._cache[id] = this._fastNew(key);

      if (!value.displayName) {
        value.displayName = this.displayName + '.' + (key.displayName || key.name) + (this._instance > 0 ? '[' + this._instance + ']' : '');
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

  Injector.prototype._fastNew = function _fastNew(key) {
    var a = this.resolve(key.deps || (key._r === undefined ? undefined : key._r[1]));

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

  Injector.prototype.invoke = function invoke(key) {
    var a = this.resolve(key.deps || (key._r === undefined ? undefined : key._r[1]));

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
    return new Injector(items, this._sheetManager, this.displayName + '.' + displayName, instance, Object.create(this._cache));
  };

  Injector.prototype.resolve = function resolve(argDeps) {
    var result = [];
    if (argDeps !== undefined) {
      var resolved = this._resolved;

      for (var i = 0, l = argDeps.length; i < l; i++) {
        var argDep = argDeps[i];

        if (_typeof(argDep) === 'object') {
          var obj = {};

          for (var prop in argDep) {
            // eslint-disable-line
            var key = argDep[prop];
            var dep = key.theme === undefined ? this.value(key) : this._sheetManager.sheet(key).classes;

            if (resolved === false && key.__lom_prop !== undefined) {
              if (this._listeners === undefined) {
                this._listeners = [];
              }

              this._listeners.push(dep);
            }

            obj[prop] = dep;
          }

          result.push(obj);
        } else {
          var _dep = argDep.theme === undefined ? this.value(argDep) : this._sheetManager.sheet(argDep).classes;

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

_applyDecoratedDescriptor._r = [2];
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
    inheritsLoose(AtomizedComponent, _BaseComponent);

    function AtomizedComponent(props$$1, reactContext) {
      var _this;

      _this = _BaseComponent.call(this, props$$1, reactContext) || this;
      _this._propsChanged = true;
      _this._el = undefined;
      _this._keys = props$$1 ? Object.keys(props$$1) : undefined;
      var cns = _this.constructor;
      var parentInjector = props$$1.__lom_ctx || rootInjector;
      _this._render = cns.render;
      var injectorName = cns.displayName + (cns.instance ? '[' + cns.instance + ']' : '');
      _this._injector = parentInjector.copy(_this._render.aliases, injectorName, cns.instance);
      cns.instance++;
      return _this;
    }

    AtomizedComponent.prototype.toString = function toString() {
      return this._injector.displayName + "." + this.constructor.displayName;
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

    createClass(AtomizedComponent, [{
      key: "displayName",
      get: function get$$1() {
        return this.toString();
      }
    }]);
    return AtomizedComponent;
  }(BaseComponent), _applyDecoratedDescriptor(_class.prototype, "r", [detached], Object.getOwnPropertyDescriptor(_class.prototype, "r"), _class.prototype), _class);
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

    if (value && _typeof$2(value) === 'object') {
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

var _class;

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
function pluralize(count, word) {
  return count === 1 ? word : word + 's';
}
pluralize._r = [2, [Number, String]];
var AbstractLocationStore = function () {
  function AbstractLocationStore() {}

  var _proto = AbstractLocationStore.prototype;

  _proto.location = function location(key, value, force$$1) {
    throw new Error('implement');
  };

  return AbstractLocationStore;
}();
var BrowserLocationStore = (_class = function (_AbstractLocationStor) {
  inheritsLoose$2(BrowserLocationStore, _AbstractLocationStor);

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
}(AbstractLocationStore), (_applyDecoratedDescriptor$1$1(_class.prototype, "location", [memkey], Object.getOwnPropertyDescriptor(_class.prototype, "location"), _class.prototype)), _class);
BrowserLocationStore._r = [0, [Location, History]];

function ErrorableView(_ref) {
  var error = _ref.error;
  return lom_h("div", null, error instanceof mem.Wait ? lom_h("div", null, "Loading...") : lom_h("div", null, lom_h("h3", null, "Fatal error !"), lom_h("div", null, error.message), lom_h("pre", null, error.stack.toString())));
}

ErrorableView._r = [1];
var atomize = createReactWrapper(Component, ErrorableView, new Injector([[AbstractLocationStore, new BrowserLocationStore(location, history)]]));

var lomCreateElement = createCreateElement(atomize, h);
global$1['lom_h'] = lomCreateElement;

var _class2$1;

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

var TodoModel = function () {
  function TodoModel() {
    var _this = this;

    var todo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var store = arguments[1];
    this.completed = void 0;
    this._title = void 0;
    this.id = void 0;
    this._store = void 0;

    this.destroy = function () {
      _this._store.remove(_this.id);
    };

    this.toggle = function () {
      _this.completed = !_this.completed;

      _this._store.saveTodo(_this.toJSON());
    };

    this._title = todo.title || '';
    this.id = todo.id || uuid();
    this.completed = todo.completed || false;
    this._store = store;
  }

  var _proto = TodoModel.prototype;

  _proto.toJSON = function toJSON() {
    return {
      completed: this.completed,
      title: this._title,
      id: this.id
    };
  };

  createClass$2(TodoModel, [{
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
var TodoService = (_class2$1 = function () {
  function TodoService() {}

  var _proto2 = TodoService.prototype;

  _proto2.addTodo = function addTodo(title) {
    var todo = new TodoModel({
      title: title
    }, this);
    var newTodos = this.todos.slice(0);
    newTodos.push(todo);
    this.todos = newTodos;
  };

  _proto2.saveTodo = function saveTodo(todo) {
    var _this2 = this;

    this.todos = this.todos.map(function (t) {
      return t.id === todo.id ? new TodoModel(todo, _this2) : t;
    });
  };

  _proto2.remove = function remove(id) {
    this.todos = this.todos.filter(function (todo) {
      return todo.id !== id;
    });
  };

  _proto2.toggleAll = function toggleAll() {
    var _this3 = this;

    var completed = this.activeTodoCount > 0;
    this.todos = this.todos.map(function (todo) {
      return new TodoModel({
        title: todo.title,
        id: todo.id,
        completed: completed
      }, _this3);
    });
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
  };

  createClass$2(TodoService, [{
    key: "todos",
    get: function get$$1() {
      return [];
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
}(), (_applyDecoratedDescriptor$2(_class2$1.prototype, "todos", [mem], Object.getOwnPropertyDescriptor(_class2$1.prototype, "todos"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "todos", [mem], Object.getOwnPropertyDescriptor(_class2$1.prototype, "todos"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "activeTodoCount", [mem], Object.getOwnPropertyDescriptor(_class2$1.prototype, "activeTodoCount"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "addTodo", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "addTodo"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "saveTodo", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "saveTodo"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "remove", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "remove"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "toggleAll", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "toggleAll"), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, "clearCompleted", [action], Object.getOwnPropertyDescriptor(_class2$1.prototype, "clearCompleted"), _class2$1.prototype)), _class2$1);

var _class$1;
var _class2$2;
var _temp;
var _initialiseProps;

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

var TODO_FILTER = {
  ALL: 'all',
  COMPLETE: 'complete',
  ACTIVE: 'active'
};
var TodoFilterService = (_class$1 = (_temp = _class2$2 = function () {
  function TodoFilterService(TodoService$$1, locationStore) {
    _initialiseProps.call(this);

    this._todoService = TodoService$$1;
    this._locationStore = locationStore;
  }

  createClass$2(TodoFilterService, [{
    key: "filter",
    get: function get$$1() {
      return this._locationStore.location('todo_filter') || TODO_FILTER.ALL;
    },
    set: function set$$1(filter) {
      return this._locationStore.location('todo_filter', filter);
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
}(), _class2$2.deps = [TodoService, AbstractLocationStore], _initialiseProps = function _initialiseProps() {
  this._todoService = void 0;
  this._locationStore = void 0;
}, _temp), (_applyDecoratedDescriptor$3(_class$1.prototype, "filteredTodos", [mem], Object.getOwnPropertyDescriptor(_class$1.prototype, "filteredTodos"), _class$1.prototype)), _class$1);
TodoFilterService._r = [0, [TodoService, AbstractLocationStore]];

var _class$2;
var _descriptor;
var _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
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

var ENTER_KEY = 13;
var TodoToAdd = (_class$2 = function () {
  function TodoToAdd() {
    var _this = this;

    _initDefineProp(this, "title", _descriptor, this);

    _initDefineProp(this, "_props", _descriptor2, this);

    this.onKeyDown = function (e) {
      if (e.keyCode === ENTER_KEY && _this.title) {
        e.preventDefault();

        var text = _this.title.trim();

        if (text) {
          _this._props.addTodo(text);

          _this.title = '';
        }
      }
    };
  }

  var _proto = TodoToAdd.prototype;

  _proto.onInput = function onInput(_ref) {
    var target = _ref.target;
    this.title = target.value;
  };

  return TodoToAdd;
}(), (_descriptor = _applyDecoratedDescriptor$4(_class$2.prototype, "title", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor$4(_class$2.prototype, "_props", [props], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$4(_class$2.prototype, "onInput", [action], Object.getOwnPropertyDescriptor(_class$2.prototype, "onInput"), _class$2.prototype)), _class$2);
function TodoHeaderView(_, _ref2) {
  var todoToAdd = _ref2.todoToAdd;
  return lom_h("header", {
    id: "header"
  }, lom_h("h1", null, "todos"), lom_h("input", {
    id: "new-todo",
    placeholder: "What needs to be done?",
    onInput: todoToAdd.onInput,
    value: todoToAdd.title,
    onKeyDown: todoToAdd.onKeyDown,
    autoFocus: true
  }));
}
TodoHeaderView._r = [1, [{
  todoToAdd: TodoToAdd
}]];
TodoHeaderView.deps = [{
  todoToAdd: TodoToAdd
}];

var ALL_TODOS = 'all';
var ACTIVE_TODOS = 'active';
var COMPLETED_TODOS = 'completed';

function TodoFooterView(_ref) {
  var nowShowing = _ref.nowShowing,
      count = _ref.count,
      completedCount = _ref.completedCount,
      onClearCompleted = _ref.onClearCompleted;
  return lom_h("footer", {
    id: "footer"
  }, lom_h("span", {
    id: "todo-count"
  }, lom_h("strong", null, count), " ", pluralize(count, 'item'), " left"), lom_h("ul", {
    id: "filters"
  }, lom_h("li", null, lom_h("a", {
    href: "./?todo_filter=all",
    "class": {
      selected: nowShowing === ALL_TODOS
    }
  }, "All")), "\xA0", lom_h("li", null, lom_h("a", {
    href: "./?todo_filter=active",
    "class": {
      selected: nowShowing === ACTIVE_TODOS
    }
  }, "Active")), "\xA0", lom_h("li", null, lom_h("a", {
    href: "./?todo_filter=completed",
    "class": {
      selected: nowShowing === COMPLETED_TODOS
    }
  }, "Completed"))), completedCount > 0 ? lom_h("button", {
    id: "clear-completed",
    onClick: onClearCompleted
  }, "Clear completed") : null);
}

TodoFooterView._r = [1];

var _class$3;
var _descriptor$1;
var _descriptor2$1;
var _descriptor3;

function _initDefineProp$1(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

var ESCAPE_KEY = 27;
var ENTER_KEY$1 = 13;
var TodoItemService = (_class$3 = function () {
  function TodoItemService() {
    var _this = this;

    _initDefineProp$1(this, "editingId", _descriptor$1, this);

    _initDefineProp$1(this, "editText", _descriptor2$1, this);

    _initDefineProp$1(this, "_props", _descriptor3, this);

    this.beginEdit = function () {
      _this.editText = _this._props.todo.title;
      _this.editingId = _this._props.todo.id;
    };

    this.setFocus = function (el) {
      if (el) {
        setTimeout(function () {
          return el.focus();
        }, 0);
      }
    };

    this.cancel = function () {
      // this.editText = ''
      _this.editingId = null;
    };

    this.submit = function () {
      _this._props.todo.title = _this.editText;
      _this.editText = '';
      _this.editingId = null;
    };

    this.onKey = function (e) {
      if (e.which === ESCAPE_KEY) {
        _this.cancel();
      } else if (e.which === ENTER_KEY$1) {
        _this.submit();
      }
    };
  }

  var _proto = TodoItemService.prototype;

  _proto.setEditText = function setEditText(e) {
    this.editText = e.target.value;
  };

  return TodoItemService;
}(), (_descriptor$1 = _applyDecoratedDescriptor$5(_class$3.prototype, "editingId", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2$1 = _applyDecoratedDescriptor$5(_class$3.prototype, "editText", [mem], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor$5(_class$3.prototype, "_props", [props], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor$5(_class$3.prototype, "setEditText", [action], Object.getOwnPropertyDescriptor(_class$3.prototype, "setEditText"), _class$3.prototype)), _class$3);
function TodoItemView(_ref, todoItemService) {
  var todo = _ref.todo;
  var editing = todoItemService.editingId === todo.id;
  return lom_h("li", {
    "class": "" + (todo.completed ? 'completed ' : ' ') + (editing ? 'editing' : '')
  }, lom_h("div", {
    "class": "view"
  }, lom_h("input", {
    "class": "toggle",
    type: "checkbox",
    checked: todo.completed || 0,
    onClick: todo.toggle
  }), lom_h("label", {
    onDblClick: todoItemService.beginEdit
  }, todo.title), lom_h("button", {
    "class": "destroy",
    onClick: todo.destroy
  })), editing ? lom_h("input", {
    ref: todoItemService.setFocus,
    "class": "edit",
    value: todoItemService.editingId && todoItemService.editText || todo.title,
    onBlur: todoItemService.submit,
    onInput: todoItemService.setEditText,
    onKeyDown: todoItemService.onKey
  }) : null);
}
TodoItemView._r = [1, [TodoItemService]];
TodoItemView.deps = [TodoItemService];

function TodoPerfView(_, _ref) {
  var todoService = _ref.todoService,
      todoFilterService = _ref.todoFilterService;
  var todos = todoService.todos;
  return lom_h("div", null, lom_h(TodoHeaderView, {
    addTodo: todoService.addTodo
  }), todos.length ? lom_h("section", {
    id: "main"
  }, lom_h("input", {
    id: "toggle-all",
    type: "checkbox",
    onChange: todoService.toggleAll,
    checked: todoService.activeTodoCount === 0
  }), lom_h("ul", {
    id: "todo-list"
  }, todoFilterService.filteredTodos.map(function (todo) {
    return lom_h(TodoItemView, {
      key: todo.id,
      todo: todo
    });
  }))) : null, todoService.activeTodoCount || todoService.completedCount ? lom_h(TodoFooterView, {
    count: todoService.activeTodoCount,
    completedCount: todoService.completedCount,
    nowShowing: todoFilterService.filter,
    onClearCompleted: todoService.clearCompleted
  }) : null);
}

TodoPerfView._r = [1, [{
  todoService: TodoService,
  todoFilterService: TodoFilterService
}]];
TodoPerfView.deps = [{
  todoService: TodoService,
  todoFilterService: TodoFilterService
}];

render(lom_h(TodoPerfView, null), document.getElementById('todoapp'));

}());
//# sourceMappingURL=bundle.js.map
