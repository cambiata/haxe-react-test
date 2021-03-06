// Generated by Haxe 4.1.4
(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope = $global.$hx_scope || {};
var require = (function(r){ return function require(m) { return r[m]; } })($s.__registry__ || {});
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
var NamesAction = $hxEnums["NamesAction"] = { __ename__ : "NamesAction", __constructs__ : ["Same","Add"]
	,Same: {_hx_index:0,__enum__:"NamesAction",toString:$estr}
	,Add: ($_=function(name) { return {_hx_index:1,name:name,__enum__:"NamesAction",toString:$estr}; },$_.__params__ = ["name"],$_)
};
var NamesModel = function() {
	this.initState = { names : ["Adam","Eve"]};
};
NamesModel.__name__ = true;
NamesModel.prototype = {
	reduce: function(state,action) {
		switch(action._hx_index) {
		case 0:
			return react_ReactUtil.copy(state,{ names : state.names});
		case 1:
			var name = action.name;
			var newItems = state.names.slice();
			newItems.push(name);
			return react_ReactUtil.copy(state,{ names : newItems});
		}
	}
};
var TestEnum = $hxEnums["TestEnum"] = { __ename__ : "TestEnum", __constructs__ : ["TestA","TestNum"]
	,TestA: {_hx_index:0,__enum__:"TestEnum",toString:$estr}
	,TestNum: ($_=function(num) { return {_hx_index:1,num:num,__enum__:"TestEnum",toString:$estr}; },$_.__params__ = ["num"],$_)
};
var EnumsAction = $hxEnums["EnumsAction"] = { __ename__ : "EnumsAction", __constructs__ : ["Same","Add"]
	,Same: {_hx_index:0,__enum__:"EnumsAction",toString:$estr}
	,Add: ($_=function(enumItem) { return {_hx_index:1,enumItem:enumItem,__enum__:"EnumsAction",toString:$estr}; },$_.__params__ = ["enumItem"],$_)
};
var EnumsModel = function() {
	this.initState = { items : [TestEnum.TestA,TestEnum.TestNum(123)]};
};
EnumsModel.__name__ = true;
EnumsModel.prototype = {
	reduce: function(state,action) {
		switch(action._hx_index) {
		case 0:
			return react_ReactUtil.copy(state,{ items : state.items});
		case 1:
			var enumItem = action.enumItem;
			var newItems = state.items.slice();
			newItems.push(enumItem);
			return react_ReactUtil.copy(state,{ items : newItems});
		}
	}
};
var ApplicationStore = function() { };
ApplicationStore.__name__ = true;
ApplicationStore.create = function() {
	var namesModel = new NamesModel();
	var enumsModel = new EnumsModel();
	var rootReducer = redux_Redux.combineReducers({ names : redux_StoreBuilder.mapReducer(NamesAction,namesModel), items : redux_StoreBuilder.mapReducer(EnumsAction,enumsModel)});
	return redux_StoreBuilder.createStore(rootReducer,null);
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var store = ApplicationStore.create();
	var history = router_ReactRouter.browserHistory;
	var app = { store : store};
	var app1 = React.createElement(router_IndexRoute,{ component : IndexView});
	var app2 = React.createElement(router_Route,{ path : "about", component : function(x) {
		return React.createElement("h1",{ },"About");
	}});
	var app3 = React.createElement(router_Route,{ path : "/", component : Main.pageWrapper},app1,app2);
	var app1 = ReactDOM.render(React.createElement(redux_react_Provider,app,React.createElement(router_Router,{ history : history},app3)),window.document.querySelector("main"));
	haxe_Timer.delay(function() {
		store.dispatch(redux_Action.map(NamesAction.Add("Holger")));
		store.dispatch(redux_Action.map(EnumsAction.Add(TestEnum.TestNum(234))));
	},2000);
};
Main.pageWrapper = function(props) {
	var tmp = React.createElement(router_Link,{ to : "/"},"Index");
	var tmp1 = React.createElement(router_Link,{ to : "/about"},"About");
	var tmp2 = React.createElement("nav",{ },tmp," | ",tmp1);
	return React.createElement("div",{ },"\t\t\t\t","\t\t\t\t",tmp2,props.children);
};
var React_Component = require("react").Component;
var PropTypes = require("prop-types");
var IndexView = function(props,context) {
	React_Component.call(this,props);
	this.__state = this.mapState(context.store.getState(),props);
	this.state = this.state == null ? this.__state : react_ReactUtil.copy(this.state,this.__state);
};
IndexView.__name__ = true;
IndexView.__super__ = React_Component;
IndexView.prototype = $extend(React_Component.prototype,{
	mapState: function(state,props) {
		return { names : state.names.names, enums : state.items.items};
	}
	,render: function() {
		var tmp = React.createElement("h1",{ },"IndexView");
		var tmp1 = React.createElement("p",{ },"state:",Std.string(this.state));
		return React.createElement("div",{ },"\t\t",tmp,"\t\t",tmp1);
	}
	,dispatch: function(action) {
		return this.context.store.dispatch(action);
	}
	,__connect: function() {
		if(this.__unsubscribe != null) {
			var state = this.mapState(this.context.store.getState(),this.props);
			if(this.__state == null || !react_ReactUtil.shallowCompare(this.__state,state)) {
				this.__state = state;
				this.setState(state);
			}
		}
	}
	,componentDidMount: function() {
		this.__unsubscribe = this.context.store.subscribe($bind(this,this.__connect));
	}
	,componentWillUnmount: function() {
		if(this.__unsubscribe != null) {
			this.__unsubscribe();
			this.__unsubscribe = null;
		}
		this.__state = null;
	}
});
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = true;
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var react_Partial = function() { };
react_Partial.__name__ = true;
var react_PartialMacro = function() { };
react_PartialMacro.__name__ = true;
var React = require("react");
var ReactDOM = require("react-dom");
var react_ReactMacro = function() { };
react_ReactMacro.__name__ = true;
var react_ReactUtil = function() { };
react_ReactUtil.__name__ = true;
react_ReactUtil.cx = function(arrayOrObject) {
	var array;
	if(((arrayOrObject) instanceof Array)) {
		array = arrayOrObject;
	} else {
		array = [arrayOrObject];
	}
	var classes = [];
	var _g = 0;
	while(_g < array.length) {
		var value = array[_g];
		++_g;
		if(value == null) {
			continue;
		}
		if(typeof(value) == "string") {
			classes.push(value);
		} else {
			var _g1 = 0;
			var _g2 = Reflect.fields(value);
			while(_g1 < _g2.length) {
				var field = _g2[_g1];
				++_g1;
				if(Reflect.field(value,field) == true) {
					classes.push(field);
				}
			}
		}
	}
	return classes.join(" ");
};
react_ReactUtil.assign = function(target,sources) {
	var _g = 0;
	while(_g < sources.length) {
		var source = sources[_g];
		++_g;
		if(source != null) {
			var _g1 = 0;
			var _g2 = Reflect.fields(source);
			while(_g1 < _g2.length) {
				var field = _g2[_g1];
				++_g1;
				target[field] = Reflect.field(source,field);
			}
		}
	}
	return target;
};
react_ReactUtil.copy = function(source1,source2) {
	var target = { };
	var _g = 0;
	var _g1 = Reflect.fields(source1);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		target[field] = Reflect.field(source1,field);
	}
	if(source2 != null) {
		var _g = 0;
		var _g1 = Reflect.fields(source2);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			target[field] = Reflect.field(source2,field);
		}
	}
	return target;
};
react_ReactUtil.copyWithout = function(source1,source2,fields) {
	var target = { };
	var _g = 0;
	var _g1 = Reflect.fields(source1);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		if(!Lambda.has(fields,field)) {
			target[field] = Reflect.field(source1,field);
		}
	}
	if(source2 != null) {
		var _g = 0;
		var _g1 = Reflect.fields(source2);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			if(!Lambda.has(fields,field)) {
				target[field] = Reflect.field(source2,field);
			}
		}
	}
	return target;
};
react_ReactUtil.mapi = function(items,map) {
	if(items == null) {
		return null;
	}
	var newItems = [];
	var _g = 0;
	var _g1 = items.length;
	while(_g < _g1) {
		var i = _g++;
		newItems.push(map(i,items[i]));
	}
	return newItems;
};
react_ReactUtil.cloneChildren = function(children,props) {
	if(Reflect.isFunction(props)) {
		return React.Children.map(children,function(child) {
			return React.cloneElement(child,props(child));
		});
	} else {
		return React.Children.map(children,function(child) {
			return React.cloneElement(child,props);
		});
	}
};
react_ReactUtil.shouldComponentUpdate = function(component,nextProps,nextState) {
	if(react_ReactUtil.shallowCompare(component.props,nextProps)) {
		return !react_ReactUtil.shallowCompare(component.state,nextState);
	} else {
		return true;
	}
};
react_ReactUtil.shallowCompare = function(a,b) {
	var aFields = Reflect.fields(a);
	var bFields = Reflect.fields(b);
	if(aFields.length != bFields.length) {
		return false;
	}
	var _g = 0;
	while(_g < aFields.length) {
		var field = aFields[_g];
		++_g;
		if(!Object.prototype.hasOwnProperty.call(b,field) || Reflect.field(b,field) != Reflect.field(a,field)) {
			return false;
		}
	}
	return true;
};
var redux_Redux = require("redux");
var redux_Action = {};
redux_Action._new = function(a) {
	var this1 = a;
	return this1;
};
redux_Action.map = function(ev) {
	var e = Type.getEnum(ev);
	var this1 = { type : e.__ename__, value : ev};
	return this1;
};
var redux_StoreBuilder = function() { };
redux_StoreBuilder.__name__ = true;
redux_StoreBuilder.mapReducer = function(of,service) {
	var type = of.__ename__;
	return function(state,action) {
		if(state == null) {
			state = service.initState;
		}
		if(action.type == type) {
			return service.reduce(state,action.value);
		} else {
			return state;
		}
	};
};
redux_StoreBuilder.mapMiddleware = function(of,service) {
	var type = of.__ename__;
	return function(store) {
		service.store = store;
		return function(next) {
			return function(action) {
				if(action.type == type) {
					var skip = function() {
						return next(action);
					};
					return service.middleware(action.value,skip);
				}
				return next(action);
			};
		};
	};
};
redux_StoreBuilder.createStore = function(rootReducer,initState,enhancer) {
	if(initState == null) {
		initState = { };
	}
	if(window.__REDUX_DEVTOOLS_EXTENSION__) {
		if(enhancer == null) {
			enhancer = window.__REDUX_DEVTOOLS_EXTENSION__();
		} else {
			enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(enhancer);
		}
	}
	return redux_Redux.createStore(rootReducer,initState,enhancer);
};
var redux_react_Provider = function(props) {
	React_Component.call(this,props);
};
redux_react_Provider.__name__ = true;
redux_react_Provider.__super__ = React_Component;
redux_react_Provider.prototype = $extend(React_Component.prototype,{
	getChildContext: function() {
		return { store : this.props.store};
	}
	,render: function() {
		return React.Children.only(this.props.children);
	}
});
var router_Link = require("react-router").Link;
var router_ReactRouter = require("react-router");
var router_Router = require("react-router").Router;
var router_Route = require("react-router").Route;
var router_IndexRoute = require("react-router").IndexRoute;
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
IndexView.contextTypes = { store : PropTypes.object.isRequired};
IndexView.displayName = "IndexView";
redux_react_Provider.childContextTypes = { store : PropTypes.object.isRequired};
redux_react_Provider.propTypes = { children : PropTypes.element.isRequired};
redux_react_Provider.displayName = "Provider";
Main.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
