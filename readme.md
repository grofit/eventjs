# EventHandler

A simple class for allowing c# style events in js:

```js
function SomeClass()
{
    this.someEvent = new EventJs.EventHandler(this);
    this.publishEvent = function() { this.someEvent.publish("hello"); }
}

var someInstance = new SomeClass();
someInstance.someEvent.subscribe(function(sender, args) { alert(args); });
someInstance.publishEvent();
// Would alert "hello"
```

## Installation

IF you are using Node then you should be able to just do:

`var EventHandler = require("event-handler");`

If you want to use it in the browser without a module loader then grab the `event.js` file in `dist/browser` 
it will self register the `EventJs` global for you to access the event handler.

`var EventHandler = EventJs.EventHandler;`

Either way you will need to new up an instance of it to use it.

`var someEvent = new EventHandler(theSenderGoesHere);`

## Usage

So as shown in the above example you can easily subscribe to events with it, subscribe as many
listeners as you want to them.

```js
var function1 = function(sender, args) { ... };
var function2 = function(sender, args) { ... };
var function3 = function(sender, args) { ... };

var someEvent = new EventHandler(someSender);

someEvent.subscribe(function1);
someEvent.subscribe(function2);
someEvent.subscribe(function3);

someEvent.publish(something);
```

You can also add predicates to only subscribe based upon arguments:

```js
var onlyWhenPredicateMet = function(sender, args) { ... };
var predicate = function(args) { return args.length <= 2; }

var someEvent = new EventHandler(someSender);

someEvent.subscribe(onlyWhenPredicateMet, predicate);

someEvent.publish("too long"); // subscription wont get triggered
someEvent.publish("GO"); // predicate returns true and would trigger subscription
```

Finally if you want to unsubscribe just do:

```js
var someSubscription = function(sender, args) { ... };
var someEvent = new EventHandler(someSender);

someEvent.subscribe(someSubscription); // subscribe it
someEvent.unsubscribe(someSubscription); // unsubscribe it
```

or if you are living dangerously and end up doing a lot of inline functions
you can capture the return unsubscriber token and use that for unsubscribing:

```js
var someSubscription = ;
var someEvent = new EventHandler(someSender);

var unsubscriber = someEvent.subscribe(function(sender, args) { ... }); // subscribe and get unsubscriber
unsubscriber(); // unsubscribe it
```