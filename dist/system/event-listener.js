System.register([], function(exports_1) {
    var EventListener;
    return {
        setters:[],
        execute: function() {
            EventListener = (function () {
                function EventListener(callback, predicate) {
                    this.callback = callback;
                    this.predicate = predicate;
                }
                return EventListener;
            })();
            exports_1("EventListener", EventListener);
        }
    }
});
