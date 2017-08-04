!function(){"use strict";function t(t){return new Proxy(t,ct)}function e(t,e){if(t===e)return t;if(t instanceof Array&&e instanceof Array&&t.length===e.length){for(var o=0;o<t.length;o++)if(t[o]!==e[o])return t;return e}return t}function o(t){t.check()}function n(t){t.obsolete()}function i(t){t.dislead(this)}function r(t){this.status===st&&t.actualize()}function s(t,e,o){o.delete(t),t.destroyed(!0)}function l(t){return"string"!=typeof t&&"number"!=typeof t&&"function"!=typeof t&&t?"object"===at(t)?Object.keys(t).sort().map(function(e){return e+":"+JSON.stringify(t[e])}).join("."):JSON.stringify(t):t||""}function a(t,e,o,n,i){var r=e+"$";if(void 0===o.value)throw new TypeError(e+" is not an function (next?: V)");return t[r]=o.value,{enumerable:o.enumerable,configurable:o.configurable,value:function(t,e){return ft.getAtom(r,this,void 0,n,i).value(t,e)}}}function u(t,e){return function(o){return void 0===o?t.call(this):(e.call(this,o),o)}}function c(t){return function(e){return void 0===e&&void 0!==t?t.call(this):e}}function p(t,e,o,n){var i=e+"$";if(void 0===t[i]){t[i]=void 0===o.get&&void 0===o.set?c(o.initializer):u(o.get,o.set);return{enumerable:o.enumerable,configurable:o.configurable,get:function(){return ft.getAtom(i,this,void 0,n).get()},set:function(t){ft.getAtom(i,this,void 0,n).set(t)}}}}function d(t,e,o,n){var i=o.value;if(void 0===i)throw new TypeError(e+" is not an function (rawKey: K, next?: V)");var r=e+"$";return t[r]=i,{enumerable:o.enumerable,configurable:o.configurable,value:function(t,e,o){return ft.getAtom(r,this,t,n).value(e,o)}}}function h(){if(3===arguments.length)return d(arguments[0],arguments[1],arguments[2]);var t=arguments[0];return function(e,o,n){return d(e,o,n,t)}}function f(t,e,o){return a(t,e,o,void 0,!0)}function v(){if(3===arguments.length)return void 0===arguments[2].value?p(arguments[0],arguments[1],arguments[2]):a(arguments[0],arguments[1],arguments[2]);var t=arguments[0];return function(e,o,n){return void 0===n.value?p(e,o,n,t):a(e,o,n,t)}}function _(t,e,o,n,i){var r={};return Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null),r}function y(t){function e(e){t(e),ft.run()}return e.displayName=t.displayName||t.name,e}function m(t,e){if(t===e)return!1;if(!t&&e||!e&&t)return!0;var o=0;for(var n in t){if(t[n]!==e[n])return!0;o++}for(var i in e)o--;return 0!==o}function g(){}function b(t,e){for(var o in e)t[o]=e[o];return t}function w(t){!t._dirty&&(t._dirty=!0)&&1==Ot.push(t)&&(kt.debounceRendering||zt)(C)}function C(){var t,e=Ot;for(Ot=[];t=e.pop();)t._dirty&&B(t)}function k(t,e,o){return"string"==typeof e||"number"==typeof e?void 0!==t.splitText:"string"==typeof e.nodeName?!t._componentConstructor&&S(t,e.nodeName):o||t._componentConstructor===e.nodeName}function S(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function x(t){var e=b({},t.attributes);e.children=t.children;var o=t.nodeName.defaultProps;if(void 0!==o)for(var n in o)void 0===e[n]&&(e[n]=o[n]);return e}function z(t,e){var o=e?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);return o.normalizedNodeName=t,o}function T(t){var e=t.parentNode;e&&e.removeChild(t)}function O(t,e,o,n,i){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)o&&o(null),n&&n(t);else if("class"!==e||i)if("style"===e){if(n&&"string"!=typeof n&&"string"!=typeof o||(t.style.cssText=n||""),n&&"object"===ot(n)){if("string"!=typeof o)for(var r in o)r in n||(t.style[r]="");for(var r in n)t.style[r]="number"==typeof n[r]&&!1===Tt.test(r)?n[r]+"px":n[r]}}else if("dangerouslySetInnerHTML"===e)n&&(t.innerHTML=n.__html||"");else if("o"==e[0]&&"n"==e[1]){var s=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),n?o||t.addEventListener(e,j,s):t.removeEventListener(e,j,s),(t._listeners||(t._listeners={}))[e]=n}else if("list"!==e&&"type"!==e&&!i&&e in t)P(t,e,null==n?"":n),null!=n&&!1!==n||t.removeAttribute(e);else{var l=i&&e!==(e=e.replace(/^xlink\:?/,""));null==n||!1===n?l?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof n&&(l?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),n):t.setAttribute(e,n))}else t.className=n||""}function P(t,e,o){try{t[e]=o}catch(t){}}function j(t){return this._listeners[t.type](kt.event&&kt.event(t)||t)}function N(){for(var t;t=Pt.pop();)kt.afterMount&&kt.afterMount(t),t.componentDidMount&&t.componentDidMount()}function E(t,e,o,n,i,r){jt++||(Nt=null!=i&&void 0!==i.ownerSVGElement,Et=null!=t&&!("__preactattr_"in t));var s=A(t,e,o,n,r);return i&&s.parentNode!==i&&i.appendChild(s),--jt||(Et=!1,r||N()),s}function A(t,e,o,n,i){var r=t,s=Nt;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||i)?t.nodeValue!=e&&(t.nodeValue=e):(r=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(r,t),I(t,!0))),r.__preactattr_=!0,r;var l=e.nodeName;if("function"==typeof l)return F(t,e,o,n);if(Nt="svg"===l||"foreignObject"!==l&&Nt,l=String(l),(!t||!S(t,l))&&(r=z(l,Nt),t)){for(;t.firstChild;)r.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(r,t),I(t,!0)}var a=r.firstChild,u=r.__preactattr_,c=e.children;if(null==u){u=r.__preactattr_={};for(var p=r.attributes,d=p.length;d--;)u[p[d].name]=p[d].value}return!Et&&c&&1===c.length&&"string"==typeof c[0]&&null!=a&&void 0!==a.splitText&&null==a.nextSibling?a.nodeValue!=c[0]&&(a.nodeValue=c[0]):(c&&c.length||null!=a)&&D(r,c,o,n,Et||null!=u.dangerouslySetInnerHTML),M(r,e.attributes,u),Nt=s,r}function D(t,e,o,n,i){var r,s,l,a,u,c=t.childNodes,p=[],d={},h=0,f=0,v=c.length,_=0,y=e?e.length:0;if(0!==v)for(w=0;w<v;w++){var m=c[w],g=m.__preactattr_;null!=(b=y&&g?m._component?m._component.__key:g.key:null)?(h++,d[b]=m):(g||(void 0!==m.splitText?!i||m.nodeValue.trim():i))&&(p[_++]=m)}if(0!==y)for(w=0;w<y;w++){u=null;var b=(a=e[w]).key;if(null!=b)h&&void 0!==d[b]&&(u=d[b],d[b]=void 0,h--);else if(!u&&f<_)for(r=f;r<_;r++)if(void 0!==p[r]&&k(s=p[r],a,i)){u=s,p[r]=void 0,r===_-1&&_--,r===f&&f++;break}u=A(u,a,o,n),l=c[w],u&&u!==t&&u!==l&&(null==l?t.appendChild(u):u===l.nextSibling?T(l):t.insertBefore(u,l))}if(h)for(var w in d)void 0!==d[w]&&I(d[w],!1);for(;f<=_;)void 0!==(u=p[_--])&&I(u,!1)}function I(t,e){var o=t._component;o?H(o):(null!=t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),!1!==e&&null!=t.__preactattr_||T(t),L(t))}function L(t){for(t=t.lastChild;t;){var e=t.previousSibling;I(t,!0),t=e}}function M(t,e,o){var n;for(n in o)e&&null!=e[n]||null==o[n]||O(t,n,o[n],o[n]=void 0,Nt);for(n in e)"children"===n||"innerHTML"===n||n in o&&e[n]===("value"===n||"checked"===n?t[n]:o[n])||O(t,n,o[n],o[n]=e[n],Nt)}function U(t){var e=t.constructor.name;(At[e]||(At[e]=[])).push(t)}function K(t,e,o){var n,i=At[t.name];if(t.prototype&&t.prototype.render?(n=new t(e,o),R.call(n,e,o)):((n=new R(e,o)).constructor=t,n.render=V),i)for(var r=i.length;r--;)if(i[r].constructor===t){n.nextBase=i[r].nextBase,i.splice(r,1);break}return n}function V(t,e,o){return this.constructor(t,o)}function W(t,e,o,n,i){t._disable||(t._disable=!0,(t.__ref=e.ref)&&delete e.ref,(t.__key=e.key)&&delete e.key,!t.base||i?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,n),n&&n!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=n),t.prevProps||(t.prevProps=t.props),t.props=e,t._disable=!1,0!==o&&(1!==o&&!1===kt.syncComponentUpdates&&t.base?w(t):B(t,1,i)),t.__ref&&t.__ref(t))}function B(t,e,o,n){if(!t._disable){var i,r,s,l=t.props,a=t.state,u=t.context,c=t.prevProps||l,p=t.prevState||a,d=t.prevContext||u,h=t.base,f=t.nextBase,v=h||f,_=t._component,y=!1;if(h&&(t.props=c,t.state=p,t.context=d,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(l,a,u)?y=!0:t.componentWillUpdate&&t.componentWillUpdate(l,a,u),t.props=l,t.state=a,t.context=u),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!y){i=t.render(l,a,u),t.getChildContext&&(u=b(b({},u),t.getChildContext()));var m,g,w=i&&i.nodeName;if("function"==typeof w){var C=x(i);(r=_)&&r.constructor===w&&C.key==r.__key?W(r,C,1,u,!1):(m=r,t._component=r=K(w,C,u),r.nextBase=r.nextBase||f,r._parentComponent=t,W(r,C,0,u,!1),B(r,1,o,!0)),g=r.base}else s=v,(m=_)&&(s=t._component=null),(v||1===e)&&(s&&(s._component=null),g=E(s,i,u,o||!h,v&&v.parentNode,!0));if(v&&g!==v&&r!==_){var k=v.parentNode;k&&g!==k&&(k.replaceChild(g,v),m||(v._component=null,I(v,!1)))}if(m&&H(m),t.base=g,g&&!n){for(var S=t,z=t;z=z._parentComponent;)(S=z).base=g;g._component=S,g._componentConstructor=S.constructor}}if(!h||o?Pt.unshift(t):y||(t.componentDidUpdate&&t.componentDidUpdate(c,p,d),kt.afterUpdate&&kt.afterUpdate(t)),null!=t._renderCallbacks)for(;t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);jt||n||N()}}function F(t,e,o,n){for(var i=t&&t._component,r=i,s=t,l=i&&t._componentConstructor===e.nodeName,a=l,u=x(e);i&&!a&&(i=i._parentComponent);)a=i.constructor===e.nodeName;return i&&a&&(!n||i._component)?(W(i,u,3,o,n),t=i.base):(r&&!l&&(H(r),t=s=null),i=K(e.nodeName,u,o),t&&!i.nextBase&&(i.nextBase=t,s=null),W(i,u,1,o,n),t=i.base,s&&t!==s&&(s._component=null,I(s,!1))),t}function H(t){kt.beforeUnmount&&kt.beforeUnmount(t);var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var o=t._component;o?H(o):e&&(e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),t.nextBase=e,T(e),U(t),L(e)),t.__ref&&t.__ref(null)}function R(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{}}function $(){for(var t="",e=0;e<32;e++){var o=16*Math.random()|0;8!==e&&12!==e&&16!==e&&20!==e||(t+="-"),t+=(12===e?4:16===e?3&o|8:o).toString(16)}return t}function J(t,e){return 1===t?e:e+"s"}function q(t,e,o,n,i){var r={};return Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null),r}function G(t,e,o,n){o&&Object.defineProperty(t,e,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(n):void 0})}function Q(t,e){var o=e.todoToAdd;return lom_h("header",{id:"header"},lom_h("h1",null,"todos"),lom_h("input",{id:"new-todo",placeholder:"What needs to be done?",onInput:o.onInput,value:o.title,onKeyDown:o.onKeyDown,autoFocus:!0}))}function X(t){var e=t.nowShowing,o=t.count,n=t.completedCount,i=t.onClearCompleted;return lom_h("footer",{id:"footer"},lom_h("span",{id:"todo-count"},lom_h("strong",null,o)," ",J(o,"item")," left"),lom_h("ul",{id:"filters"},lom_h("li",null,lom_h("a",{href:"./?todo_filter=all",class:{selected:e===ne}},"All"))," ",lom_h("li",null,lom_h("a",{href:"./?todo_filter=active",class:{selected:e===ie}},"Active"))," ",lom_h("li",null,lom_h("a",{href:"./?todo_filter=completed",class:{selected:e===re}},"Completed"))),n>0?lom_h("button",{id:"clear-completed",onClick:i},"Clear completed"):null)}function Y(t,e,o,n){o&&Object.defineProperty(t,e,{enumerable:o.enumerable,configurable:o.configurable,writable:o.writable,value:o.initializer?o.initializer.call(n):void 0})}function Z(t,e){var o=t.todo,n=e.todoItemService;return lom_h("li",{class:{completed:o.completed,editing:n.editingId===o.id}},lom_h("div",{class:"view"},lom_h("input",{class:"toggle",type:"checkbox",checked:o.completed||0,onClick:o.toggle}),lom_h("label",{onDblClick:n.beginEdit},o.title),lom_h("button",{class:"destroy",onClick:o.destroy})),n.editingId===o.id?lom_h("input",{ref:n.setFocus,class:"edit",value:n.editingId&&n.editText||o.title,onBlur:n.handleSubmit,onChange:n.setEditText,onKeyDown:n.handleKeyDown}):null)}function tt(t,e){var o=e.todoService,n=e.todoFilterService,i=o.todos;return lom_h("div",null,lom_h(Q,{addTodo:o.addTodo}),i.length?lom_h("section",{id:"main"},lom_h("input",{id:"toggle-all",type:"checkbox",onChange:o.toggleAll,checked:0===o.activeTodoCount}),lom_h("ul",{id:"todo-list"},n.filteredTodos.map(function(t){return lom_h(Z,{key:t.id,todo:t})}))):null,o.activeTodoCount||o.completedCount?lom_h(X,{count:o.activeTodoCount,completedCount:o.completedCount,nowShowing:n.filter,onClearCompleted:o.clearCompleted}):null)}var et="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},ot="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},nt=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),it=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e},rt=1,st=2,lt=Symbol("lom_atom_catched"),at="function"==typeof Symbol&&"symbol"===ot(Symbol.iterator)?function(t){return ot(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":ot(t)},ut=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e},ct={get:function(t){throw t.valueOf()},ownKeys:function(t){throw t.valueOf()}},pt=function(t){function e(){var e,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Wait...";return e=t.call(this,o)||this,e.__proto__=new.target.prototype,e[lt]=!0,e}return ut(e,t),e}(Error),dt=function(){function s(t,o,n,i,r,s){this.status=rt,this.cached=void 0,this._masters=null,this._slaves=null,this.field=t,this.key=i,this.host=o,this.isComponent=s||!1,this._normalize=r||e,this._context=n}return s.prototype.destroyed=function(t){return void 0===t?0===this.status:!!t&&(0!==this.status&&(this._masters&&(this._masters.forEach(i,this),this._masters=null),this._checkSlaves(),void 0!==this.host&&this._context.destroyHost(this),this.cached=void 0,this.status=0,this.key=void 0),!0)},s.prototype.get=function(t){t||this._context.force?(this._context.force=!1,this._pullPush(void 0,!0)):this.actualize();var e=this._context.last;if(e&&(!e.isComponent||!this.isComponent)){var o=this._slaves;o||(this._context.unreap(this),o=this._slaves=new Set),o.add(e),e.addMaster(this)}return this.cached},s.prototype.set=function(e,o){var i=this._normalize(e,this.cached);return this.cached===i?i:void 0===i?this.cached:(o||this._context.force||i instanceof Error?(this._context.force=!1,this.status=4,this._context.newValue(this,this.cached,i),this.cached=i instanceof Error?t(i):i,this._slaves&&this._slaves.forEach(n)):(this.obsolete(),this.actualize(i)),this.cached)},s.prototype.actualize=function(t){4!==this.status&&(this.status===st&&(this._masters&&this._masters.forEach(r,this),this.status===st&&(this.status=4)),4!==this.status&&this._pullPush(t))},s.prototype._pullPush=function(e,o){this._masters&&this._masters.forEach(i,this);var r=void 0;this.status=3;var s=this._context,l=s.last;s.last=this;try{r=this._normalize(void 0===this.key?this.host[this.field](e,o,this.cached):this.host[this.field](this.key,e,o,this.cached),this.cached)}catch(e){void 0===e[lt]&&(e[lt]=!0,console.error(e.stack||e)),r=t(e)}s.last=l,this.status=4,void 0!==r&&this.cached!==r&&(this._context.newValue(this,this.cached,r),this.cached=r,this._slaves&&this._slaves.forEach(n))},s.prototype.dislead=function(t){var e=this._slaves;e&&(1===e.size?(this._slaves=null,this._context.proposeToReap(this)):e.delete(t))},s.prototype._checkSlaves=function(){this._slaves?this._slaves.forEach(o):this._context.proposeToPull(this)},s.prototype.check=function(){4===this.status&&(this.status=st,this._checkSlaves())},s.prototype.obsolete=function(){this.status!==rt&&(this.status=rt,this._checkSlaves())},s.prototype.addMaster=function(t){this._masters||(this._masters=new Set),this._masters.add(t)},s.prototype.value=function(t,e){return void 0===t?this.get(e):this.set(t,e)},s}(),ht="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){return setTimeout(t,0)},ft=new(function(){function t(){var t=this;this.last=null,this.force=!1,this._logger=null,this._updating=[],this._reaping=new Set,this._scheduled=!1,this._atomMap=new WeakMap,this._run=function(){t._scheduled&&t.run()}}return t.prototype.getAtom=function(t,e,o,n,i){var r=this._atomMap.get(e);void 0===r&&(r=new Map,this._atomMap.set(e,r));var s=void 0===o?t:l(o),a=r.get(s);return void 0===a&&(a=new dt(t,e,this,o,n,i),r.set(s,a)),a},t.prototype.destroyHost=function(t){var e=t.host,o=this._atomMap.get(e);void 0!==o&&(void 0!==e._destroyProp&&e._destroyProp(void 0===t.key?t.field:t.key,t.cached),o.delete(void 0===t.key?t.field:l(t.key)),0===o.size&&(void 0!==e._destroy&&e._destroy(),this._atomMap.delete(e)))},t.prototype.setLogger=function(t){this._logger=t},t.prototype.newValue=function(t,e,o){this._logger&&(o instanceof pt?this._logger.pulling(t):o instanceof Error?this._logger.error(t,o):this._logger.newValue(t,e,o))},t.prototype.proposeToPull=function(t){this._updating.push(t),this._schedule()},t.prototype.proposeToReap=function(t){this._reaping.add(t),this._schedule()},t.prototype.unreap=function(t){this._reaping.delete(t)},t.prototype._schedule=function(){this._scheduled||(this._scheduled=!0,ht(this._run))},t.prototype.run=function(){var t=this._reaping,e=this._updating,o=0;do{for(var n=e.length,i=o;i<n;i++){var r=e[i];t.has(r)||r.destroyed()||r.actualize()}o=n}while(e.length>o);for(e.length=0;t.size>0;)t.forEach(s);this._scheduled=!1},t}());v.Wait=pt,v.key=h,v.detached=f;var vt,_t="function"==typeof Symbol&&"symbol"===ot(Symbol.iterator)?function(t){return ot(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":ot(t)},yt=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e},mt=0,gt=function(){function t(){this.classes={}}return t.prototype.update=function(t){return this},t.prototype.attach=function(){return this},t.prototype.detach=function(){return this},t}(),bt={createStyleSheet:function(t){return new gt}},wt=(vt=function(){function t(t,e,o){if(this.parent=o,this.top=o?o.top:this,this._sheetProcessor=e||bt,this._sticky=void 0,void 0!==t)for(var n=0;n<t.length;n++){var i=t[n];i instanceof Array?this.value(i[0],i[1],!0):"function"==typeof i?(void 0===this._sticky&&(this._sticky=new Set),this._sticky.add(i)):this.value(i.constructor,i,!0)}}return t.prototype.value=function(t,e,o,n){if(void 0!==e)return e;if(!0===t.theme){if(this.top===this){var i=void 0===n?this._sheetProcessor.createStyleSheet(this._fastCall(t)):n.update(this._fastCall(t));return i.attach(),i}return this.top.value(t)}if(void 0!==this.parent&&(void 0===this._sticky||!this._sticky.has(t))){mt++;var r=this.parent.value(t);if(mt--,void 0!==r)return r}return 0===mt?this._fastNew(t):void 0},t.prototype._destroyProp=function(t,e){this!==this.top||"function"!=typeof t||void 0===t.theme||void 0===e||e.detach()},t.prototype._destroy=function(){this._sticky=void 0,this.parent=void 0,this.top=void 0,this._sheetProcessor=void 0},t.prototype._fastNew=function(t){var e=this.resolve(t.deps);switch(e.length){case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3]);case 5:return new t(e[0],e[1],e[2],e[3],e[4]);case 6:return new t(e[0],e[1],e[2],e[3],e[4],e[5]);default:return new(Function.prototype.bind.apply(t,[null].concat(e)))}},t.prototype._fastCall=function(t){var e=this.resolve(t.deps);switch(e.length){case 1:return t(e[0]);case 2:return t(e[0],e[1]);case 3:return t(e[0],e[1],e[2]);case 4:return t(e[0],e[1],e[2],e[3]);case 5:return t(e[0],e[1],e[2],e[3],e[4]);case 6:return t(e[0],e[1],e[2],e[3],e[4],e[5]);default:return t.apply(void 0,e)}},t.prototype.copy=function(e){return new t(e,this._sheetProcessor,this)},t.prototype.resolve=function(t){var e=[];if(void 0!==t)for(var o=0,n=t.length;o<n;o++){var i=t[o];if("object"===_t(i)){var r={};for(var s in i){var l=i[s];r[s]=void 0===l.theme?this.value(l):this.value(l).classes}e.push(r)}else e.push(this.value(i))}return e},t}(),function(t,e,o,n,i){var r={};Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null)}(vt.prototype,"value",[h],Object.getOwnPropertyDescriptor(vt.prototype,"value"),vt.prototype),vt),Ct=void 0,kt={},St=[],xt=[],zt="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,Tt=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,Ot=[],Pt=[],jt=0,Nt=!1,Et=!1,At={};b(R.prototype,{setState:function(t,e){var o=this.state;this.prevState||(this.prevState=b({},o)),b(o,"function"==typeof t?t(o,this.props):t),e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),w(this)},forceUpdate:function(t){t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),B(this,2)},render:function(){}});var Dt,It=function(){function t(){}return t.prototype.location=function(t,e,o){throw new Error("implement")},t}(),Lt=(Dt=function(t){function e(e,o){var n;return n=t.call(this)||this,n._ns="lom_app",n._location=e,n._history=o,n}return it(e,t),e.prototype._params=function(){return new URLSearchParams(this._location.search)},e.prototype.location=function(t,e,o){var n=this._params();return void 0===e?n.get(t):(n.set(t,e),this._history.pushState(null,this._ns,"?"+n.toString()),e)},e}(It),function(t,e,o,n,i){var r={};Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null)}(Dt.prototype,"location",[h],Object.getOwnPropertyDescriptor(Dt.prototype,"location"),Dt.prototype),Dt),Mt=function(t,e){return function(){var o=arguments[0],n=arguments[1],i=void 0,r="function"==typeof o&&void 0===o.prototype.render;switch(r?(void 0===o.__lom&&(o.__lom=t(o)),i=o.__lom,n?n.__lom_ctx=Ct:n={__lom_ctx:Ct}):i=o,n&&(n.onKeyPress&&(n.onKeyPress=y(n.onKeyPress)),n.onKeyDown&&(n.onKeyDown=y(n.onKeyDown)),n.onKeyUp&&(n.onKeyUp=y(n.onKeyUp)),n.onInput&&(n.onChange=y(n.onInput)),n.onChange&&(n.onChange=y(n.onChange))),arguments.length){case 2:return e(i,n);case 3:return e(i,n,arguments[2]);case 4:return e(i,n,arguments[2],arguments[3]);case 5:return e(i,n,arguments[2],arguments[3],arguments[4]);case 6:return e(i,n,arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return e(i,n,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);case 8:return e(i,n,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);case 9:return e(i,n,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8]);default:if(!1===r)return e.apply(null,arguments);for(var s=[i,n],l=2,a=arguments.length;l<a;l++)s.push(arguments[l]);return e.apply(null,s)}}}(function(t,e){var o,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new wt,i=(o=function(t){function o(e,o,n){var i;return i=t.call(this,e,o)||this,i._propsChanged=!0,i._injector=void 0,i._el=void 0,i._render=n,void 0===n.deps&&void 0===n.props||i.constructor.instances++,i}return yt(o,t),o.prototype.shouldComponentUpdate=function(t){return this._propsChanged=m(this.props,t),this._propsChanged},o.prototype.componentWillUnmount=function(){ft.getAtom("r$",this).destroyed(!0)},o.prototype._destroy=function(){var t=this._render;void 0===t.deps&&void 0===t.props||this.constructor.instances--,this._el=void 0,this.props=void 0,this._injector=void 0,this._render=void 0},o.prototype._getInjector=function(){var t=this.props.__lom_ctx||n;return this._injector=this.constructor.instances>0?t.copy():t,this._injector},o.prototype._state=function(t,e){var o=this._injector||this._getInjector();return this._render.props&&e&&o.value(this._render.props,this.props,!0),o.resolve(this._render.deps)[0]},o.prototype.r=function(t,o){var n=void 0,i=this._render,r=Ct;Ct=this._injector||this._getInjector();var s=void 0!==i.deps?this._state(void 0,o):void 0;try{n=i(this.props,s)}catch(t){var l=i.onError||e;n=l({error:t},void 0===l.deps?void 0:Ct.resolve(l.deps)[0])}return Ct=r,o||(this._el=n,this.forceUpdate(),this._el=void 0),this._propsChanged=!1,n},o.prototype.render=function(){return void 0===this._el?this.r(void 0,this._propsChanged):this._el},o}(t),_(o.prototype,"r",[f],Object.getOwnPropertyDescriptor(o.prototype,"r"),o.prototype),o);return function(t){function e(e,o){i.call(this,e,o,t)}return e.instances=0,e.displayName=t.displayName||t.name,e.prototype=Object.create(i.prototype),e.prototype.constructor=e,e}}(R,function(t){var e=t.error;return lom_h("div",null,e instanceof v.Wait?lom_h("div",null,"Loading..."):lom_h("div",null,lom_h("h3",null,"Fatal error !"),lom_h("div",null,e.message),lom_h("pre",null,e.stack.toString())))},new wt([[It,new Lt(location,history)]])),function(t,e){var o,n,i,r,s=xt;for(r=arguments.length;r-- >2;)St.push(arguments[r]);for(e&&null!=e.children&&(St.length||St.push(e.children),delete e.children);St.length;)if((n=St.pop())&&void 0!==n.pop)for(r=n.length;r--;)St.push(n[r]);else"boolean"==typeof n&&(n=null),(i="function"!=typeof t)&&(null==n?n="":"number"==typeof n?n=String(n):"string"!=typeof n&&(i=!1)),i&&o?s[s.length-1]+=n:s===xt?s=[n]:s.push(n),o=i;var l=new g;return l.nodeName=t,l.children=s,l.attributes=null==e?void 0:e,l.key=null==e?void 0:e.key,void 0!==kt.vnode&&kt.vnode(l),l});et.lom_h=Mt;Ut=function(){function t(){}return t.prototype.value=function(t,e,o){return e},t}(),q(Ut.prototype,"value",[memkey],Object.getOwnPropertyDescriptor(Ut.prototype,"value"),Ut.prototype);var Ut,Kt,Vt,Wt,Bt,Ft,Ht,Rt,$t,Jt=function(){function t(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments[1];this.destroy=function(){t._store.remove(t.id)},this.toggle=function(){t.completed=!t.completed,t._store.saveTodo(t.toJSON())},this._title=e.title||"",this.id=e.id||$(),this.completed=e.completed||!1,this._store=o}return t.prototype.toJSON=function(){return{completed:this.completed,title:this._title,id:this.id}},nt(t,[{key:"title",get:function(){return this._title},set:function(t){this._title=t,this._store.saveTodo(this.toJSON())}}]),t}(),qt=(Kt=function(){function t(){var t=this;this.addTodo=function(e){var o=new Jt({title:e},t),n=t.todos.slice(0);n.push(o),t.todos=n},this.toggleAll=function(){var e=t.activeTodoCount>0;t.todos=t.todos.map(function(o){return new Jt({title:o.title,id:o.id,completed:e},t)})},this.clearCompleted=function(){for(var e=[],o=[],n=0;n<t.todos.length;n++){var i=t.todos[n];i.completed?o.push(i.id):e.push(i)}t.todos=e}}return t.prototype.saveTodo=function(t){var e=this;this.todos=this.todos.map(function(o){return o.id===t.id?new Jt(t,e):o})},t.prototype.remove=function(t){for(var e=[],o=this.todos,n=0;n<o.length;n++){var i=o[n];i.id!==t&&e.push(i)}this.todos=e},nt(t,[{key:"todos",get:function(){return[]},set:function(t){}},{key:"activeTodoCount",get:function(){return this.todos.reduce(function(t,e){return t+(e.completed?0:1)},0)}},{key:"completedCount",get:function(){return this.todos.length-this.activeTodoCount}}]),t}(),q(Kt.prototype,"todos",[v],Object.getOwnPropertyDescriptor(Kt.prototype,"todos"),Kt.prototype),q(Kt.prototype,"todos",[v],Object.getOwnPropertyDescriptor(Kt.prototype,"todos"),Kt.prototype),q(Kt.prototype,"activeTodoCount",[v],Object.getOwnPropertyDescriptor(Kt.prototype,"activeTodoCount"),Kt.prototype),Kt),Gt={ALL:"all",COMPLETE:"complete",ACTIVE:"active"},Qt=(Bt=Wt=function(){function t(t,e){this._todoService=t,this._locationStore=e}return nt(t,[{key:"filter",get:function(){return this._locationStore.location("todo_filter")||Gt.ALL},set:function(t){return this._locationStore.location("todo_filter",t)}},{key:"filteredTodos",get:function(){var t=this._todoService.todos;switch(this.filter){case Gt.ALL:return t;case Gt.COMPLETE:return t.filter(function(t){return!!t.completed});case Gt.ACTIVE:return t.filter(function(t){return!t.completed});default:throw new Error("Unknown filter value: "+this.filter)}}}]),t}(),Wt.deps=[qt,It],Vt=Bt,function(t,e,o,n,i){var r={};Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null)}(Vt.prototype,"filteredTodos",[v],Object.getOwnPropertyDescriptor(Vt.prototype,"filteredTodos"),Vt.prototype),Vt),Xt=function(){},Yt=($t=Rt=function(t){var e=this;G(this,"title",Ht,this),this.onInput=function(t){var o=t.target;e.title=o.value},this.onKeyDown=function(t){if(13===t.keyCode&&e.title){t.preventDefault();var o=e.title.trim();o&&(e._props.addTodo(o),e.title="")}},this._props=t},Rt.deps=[Xt],Ft=$t,Ht=function(t,e,o,n,i){var r={};return Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null),r}(Ft.prototype,"title",[v],{enumerable:!0,initializer:function(){return""}}),Ft);Q.deps=[{todoToAdd:Yt}],Q.props=Xt;var Zt,te,ee,oe,ne="all",ie="active",re="completed",se=function(){},le=(oe=ee=function(t){var e=this,o=t.todo;this.editingId=null,Y(this,"editText",te,this),this.beginEdit=function(){e.editingId=e._todo.id},this.setFocus=function(t){setTimeout(function(){return t.focus()},0)},this.setEditText=function(t){e.editText=t.target.value},this.handleKeyDown=function(t){27===t.which?(e.editText="",e.editingId=null):13===t.which&&(e._todo.title=e.editText,e.editText="",e.editingId=null)},this.handleSubmit=function(){e._todo.title=e.editText,e.editText="",e.editingId=null},this._todo=o},ee.deps=[se],Zt=oe,te=function(t,e,o,n,i){var r={};return Object.keys(n).forEach(function(t){r[t]=n[t]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce(function(o,n){return n(t,e,o)||o},r),i&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(i):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null),r}(Zt.prototype,"editText",[v],{enumerable:!0,initializer:function(){return""}}),Zt);Z.deps=[{todoItemService:le}],Z.props=se,tt.deps=[{todoService:qt,todoFilterService:Qt}],function(t,e,o){E(o,t,{},!1,e,!1)}(lom_h(tt,null),document.getElementById("todoapp"))}();
//# sourceMappingURL=bundle.js.map