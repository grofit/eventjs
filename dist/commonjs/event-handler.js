var event_listener_1 = require("./event-listener");
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
        this.publish = function (args) {
            for (var i = 0; i < _this.listeners.length; i++) {
                if (_this.listeners[i].predicate) {
                    if (_this.listeners[i].predicate(args)) {
                        _this.listeners[i].callback(_this.sender, args);
                    }
                }
                else {
                    _this.listeners[i].callback(_this.sender, args);
                }
            }
        };
        this.getSubscriptionCount = function () {
            return _this.listeners.length;
        };
    }
    return EventHandler;
})();
exports.EventHandler = EventHandler;
