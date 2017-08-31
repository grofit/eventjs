define(["require", "exports"], function (require, exports) {
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
});
