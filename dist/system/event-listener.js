System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventListener;
    return {
        setters: [],
        execute: function () {
            EventListener = class EventListener {
                constructor(callback, predicate) {
                    this.callback = callback;
                    this.predicate = predicate;
                }
            };
            exports_1("EventListener", EventListener);
        }
    };
});
