(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EventJs"] = factory();
	else
		root["EventJs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var event_listener_1 = __webpack_require__(1);
var EventHandler = (function () {
    function EventHandler(sender) {
        var _this = this;
        this.sender = sender;
        this.listeners = [];
        this.subscribe = function (callback, predicate) {
            _this.listeners.push(new event_listener_1.EventListener(callback, predicate));
            return function () { _this.unsubscribe(callback); };
        };
        this.unsubscribe = function (callback) {
            for (var i = 0; i < _this.listeners.length; i++) {
                if (_this.listeners[i].callback == callback) {
                    _this.listeners.splice(i, 1);
                    return;
                }
            }
        };
        this.unsubscribeAll = function () {
            _this.listeners = [];
        };
        this.publish = function (args) {
            _this.listeners.forEach(function (eventListener) {
                if (eventListener.predicate) {
                    if (eventListener.predicate(args)) {
                        setTimeout(function () { eventListener.callback(args, _this.sender); }, 1);
                    }
                }
                else {
                    setTimeout(function () { eventListener.callback(args, _this.sender); }, 1);
                }
            });
        };
        this.publishSync = function (args) {
            _this.listeners.forEach(function (eventListener) {
                if (eventListener.predicate) {
                    if (eventListener.predicate(args)) {
                        eventListener.callback(args, _this.sender);
                    }
                }
                else {
                    eventListener.callback(args, _this.sender);
                }
            });
        };
        this.getSubscriptionCount = function () {
            return _this.listeners.length;
        };
    }
    return EventHandler;
}());
exports.EventHandler = EventHandler;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventListener = (function () {
    function EventListener(callback, predicate) {
        this.callback = callback;
        this.predicate = predicate;
    }
    return EventListener;
}());
exports.EventListener = EventListener;


/***/ })
/******/ ]);
});