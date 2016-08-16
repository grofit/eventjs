System.register(["./event-listener"], function(exports_1) {
    var event_listener_1;
    var EventHandler;
    return {
        setters:[
            function (event_listener_1_1) {
                event_listener_1 = event_listener_1_1;
            }],
        execute: function() {
            EventHandler = (function () {
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
            })();
            exports_1("EventHandler", EventHandler);
        }
    }
});
