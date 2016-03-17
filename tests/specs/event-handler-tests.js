var assert = chai.assert;
var expect = chai.expect;

describe('Event Handler', function () {

    it('should raise an event for subscriptions async', function (done) {

        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var totalAmount = 0;
        eventHandler.subscribe(function(args) {
            totalAmount += args;
        });

        eventHandler.subscribe(function(args) {
            totalAmount += args;
        });

        eventHandler.publish(10);

        setTimeout(function(){
            expect(totalAmount).to.equal(20);
            done();
        }, 100);
    });

    it('should raise an event for subscriptions synchronously', function () {

        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var totalAmount = 0;
        eventHandler.subscribe(function(args) {
            totalAmount += args;
        });

        eventHandler.subscribe(function(args) {
            totalAmount += args;
        });

        eventHandler.publishSync(10);

        expect(totalAmount).to.equal(20);
    });

    it('should filter subscriptions based on predicates', function () {
        var dummySender = {};
        var eventHandler = new EventJs.EventHandler(dummySender);

        var timesCalled = 0;
        var callback = function() { timesCalled++; };
        var predicate = function(someNumber) {
            return someNumber >= 10;
        };

        eventHandler.subscribe(callback, predicate);

        eventHandler.publishSync(5);
        eventHandler.publishSync(12);
        eventHandler.publishSync(2);
        eventHandler.publishSync(500);

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