System.register(["./event-listener"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var event_listener_1, EventHandler;
    return {
        setters: [
            function (event_listener_1_1) {
                event_listener_1 = event_listener_1_1;
            }
        ],
        execute: function () {
            EventHandler = class EventHandler {
                constructor(sender) {
                    this.sender = sender;
                    this.listeners = [];
                    this.subscribe = (callback, predicate) => {
                        this.listeners.push(new event_listener_1.EventListener(callback, predicate));
                        return () => { this.unsubscribe(callback); };
                    };
                    this.unsubscribe = (callback) => {
                        for (let i = 0; i < this.listeners.length; i++) {
                            if (this.listeners[i].callback == callback) {
                                this.listeners.splice(i, 1);
                                return;
                            }
                        }
                    };
                    this.unsubscribeAll = () => {
                        this.listeners = [];
                    };
                    this.publish = (args) => {
                        this.listeners.forEach((eventListener) => {
                            if (eventListener.predicate) {
                                if (eventListener.predicate(args)) {
                                    setTimeout(() => { eventListener.callback(args, this.sender); }, 1);
                                }
                            }
                            else {
                                setTimeout(() => { eventListener.callback(args, this.sender); }, 1);
                            }
                        });
                    };
                    this.publishSync = (args) => {
                        this.listeners.forEach((eventListener) => {
                            if (eventListener.predicate) {
                                if (eventListener.predicate(args)) {
                                    eventListener.callback(args, this.sender);
                                }
                            }
                            else {
                                eventListener.callback(args, this.sender);
                            }
                        });
                    };
                    this.getSubscriptionCount = () => {
                        return this.listeners.length;
                    };
                }
            };
            exports_1("EventHandler", EventHandler);
        }
    };
});
