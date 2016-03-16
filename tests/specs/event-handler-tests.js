var assert = chai.assert;
var expect = chai.expect;

describe('Event Handler', function () {

    it('should raise an event for subscriptions', function () {

        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var totalAmount = 0;
        eventHandler.subscribe(function(sender, args) {
            totalAmount += args;
        });

        eventHandler.subscribe(function(sender, args) {
            totalAmount += args;
        });

        eventHandler.publish(10);

        expect(totalAmount).to.equal(20);
    });

    it('should filter subscriptions based on predicates', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var timesCalled = 0;
        var callback = function(sender, args) { timesCalled++; };
        var predicate = function(someNumber) {
            return someNumber >= 10;
        };

        eventHandler.subscribe(callback, predicate);

        eventHandler.publish(5);
        eventHandler.publish(12);
        eventHandler.publish(2);
        eventHandler.publish(500);

        expect(timesCalled).to.equal(2);
    });

    it('should unsubscribe a subscribed event', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var timesCalled = 0;
        var someSubscription = function() {
            timesCalled++;
        };

        eventHandler.subscribe(someSubscription);
        eventHandler.unsubscribe(someSubscription);
        eventHandler.publish();

        expect(timesCalled).to.equal(0);
    });

    it('should unsubscribe a subscribed event via unsubscriber', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var timesCalled = 0;
        var someSubscription = function() {
            timesCalled++;
        };

        var unsubscriber = eventHandler.subscribe(someSubscription);
        unsubscriber();
        eventHandler.publish();

        expect(timesCalled).to.equal(0);
    });

    it('should return the correct subscription count', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});

        expect(eventHandler.getSubscriptionCount()).to.equal(4);
    });

    it('should cancel all subscriptions when unsubscribing all', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});
        eventHandler.subscribe(function(){});

        eventHandler.unsubscribeAll();

        expect(eventHandler.getSubscriptionCount()).to.equal(0);
    });
});