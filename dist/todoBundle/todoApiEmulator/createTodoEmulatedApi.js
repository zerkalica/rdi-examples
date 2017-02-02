'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createTodoEmulatedApi;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _index = require('../../../modules/rdi-api-emulator/index');

var _index2 = require('../../../modules/rdi-fetcher/index');

var _index3 = require('../../../modules/rdi-helpers/index');

var _Todo = require('../common/Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTodos = [new _Todo2.default({
    id: 't1',
    title: 'test todo #1',
    isCompleted: false
}), new _Todo2.default({
    id: 't2',
    title: 'test todo #2',
    isCompleted: true
})];

var defaultLogin = {
    isAuthorized: false
};

function findByKeys(data, criteria) {
    var keys = Object.keys(criteria);
    return keys.filter(function (prop) {
        return data[prop] !== criteria[prop];
    }).length !== 0;
}

findByKeys._rdiFn = true;
findByKeys._rdiArg = [{}, {}];
function getBody(body) {
    return typeof body === 'string' ? JSON.parse(body) : body || {};
}

getBody._rdiFn = true;
function sortByDate(el1, el2) {
    if (String(el1.created) > String(el2.created)) {
        return 1;
    }
    if (String(el1.created) < String(el2.created)) {
        return -1;
    }
    return 0;
}

sortByDate._rdiFn = true;
sortByDate._rdiArg = [_Todo2.default, _Todo2.default];
function createTodoEmulatedApi(storage) {
    function assertAuth() {
        var session = storage.get('session');
        if (session && !session.isAuthorized) {
            throw new _index2.HttpError(403, 'Not authorized');
        }
    }

    return new _index.EmulatedApi([{
        method: 'GET',
        url: new RegExp('/session'),
        execute: function execute(params, match) {
            // eslint-disable-line
            var data = storage.get('session');
            return Promise.resolve(data || defaultLogin);
        }
    }, {
        method: 'PUT',
        url: new RegExp('/session'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve, reject) {
                var data = getBody(params.body);
                if (data.password !== 'admin') {
                    reject(new _index2.HttpError(400, 'invalid login or password'));
                    return;
                }
                storage.set('session', { isAuthorized: true });

                resolve({
                    sessionId: '123213124345346'
                });
            });
        }
    }, {
        method: 'GET',
        url: new RegExp('/todos'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var newTodos = storage.get('todos');
                if (!newTodos) {
                    newTodos = defaultTodos;
                    storage.set('todos', newTodos);
                }
                resolve(newTodos.sort(sortByDate));
            });
        }
    }, {
        method: 'POST',
        url: new RegExp('/todos'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var data = storage.get('todos');
                var todos = data || defaultTodos;
                var newTodos = todos.map(function (todo) {
                    return _extends({}, todo, getBody(params.body));
                }).sort(sortByDate);
                storage.set('todos', newTodos);
                resolve(newTodos);
            });
        }
    }, {
        method: 'DELETE',
        url: new RegExp('/todos'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var data = storage.get('todos');
                var todos = data || defaultTodos;
                var newTodos = todos.filter(function (todo) {
                    return findByKeys(todo, getBody(params.body));
                });
                storage.set('todos', newTodos);
                resolve(null);
            });
        }
    }, {
        method: 'DELETE',
        url: new RegExp('/todo/(.*)'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var data = storage.get('todos');
                var todos = data || [];
                var id = match[1];
                var newTodos = todos.filter(function (todo) {
                    return todo.id !== id;
                });
                storage.set('todos', newTodos.sort(sortByDate));
                resolve(null);
            });
        }
    }, {
        method: 'POST',
        url: new RegExp('/todo/(.*)'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var data = storage.get('todos');
                var id = match[1];
                var body = getBody(params.body);
                var newTodos = (data || []).map(function (todo) {
                    return todo.id === id ? body : todo;
                });
                storage.set('todos', newTodos);
                resolve(body);
            });
        }
    }, {
        method: 'PUT',
        url: new RegExp('/todo'),
        execute: function execute(params, match) {
            // eslint-disable-line
            return new Promise(function (resolve) {
                assertAuth();
                var data = storage.get('todos');
                var todos = data || [];
                var body = getBody(params.body);
                var newTodo = _extends({}, body, {
                    id: _shortid2.default.generate()
                });
                todos.push(newTodo);
                storage.set('todos', todos);
                resolve(newTodo);
            });
        }
    }]);
}
createTodoEmulatedApi._rdiFn = true;
createTodoEmulatedApi._rdiArg = [_index3.AbstractStorage];
//# sourceMappingURL=createTodoEmulatedApi.js.map