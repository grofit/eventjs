var EventListener = (function () {
    function EventListener(callback, predicate) {
        this.callback = callback;
        this.predicate = predicate;
    }
    return EventListener;
})();
exports.EventListener = EventListener;
