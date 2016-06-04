# EventHandler

[![Build Status](https://travis-ci.org/grofit/eventjs.svg?branch=master)](https://travis-ci.org/grofit/eventjs)

A simple class for allowing c# style events in js:

```js
function SomeClass()
{
    this.someEvent = new EventJs.EventHandler(this);
    this.publishEvent = function() { this.someEvent.publish("hello"); }
}

var someInstance = new SomeClass();
someInstance.someEvent.subscribe(function(args, sender) { alert(args); });
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
var function1 = function(args, sender) { ... };
var function2 = function(args, sender) { ... };
var function3 = function(args, sender) { ... };

var someEvent = new EventHandler(someSender);

someEvent.subscribe(function1);
someEvent.subscribe(function2);
someEvent.subscribe(function3);

someEvent.publish(something);
```

You can also add predicates to only subscribe based upon arguments:

```js
var onlyWhenPredicateMet = function(args) { ... };
var predicate = function(args) { return args.length <= 2; }

var someEvent = new EventHandler(someSender);

someEvent.subscribe(onlyWhenPredicateMet, predicate);

someEvent.publish("too long"); // subscription wont get triggered
someEvent.publish("GO"); // predicate returns true and would trigger subscription
```

Finally if you want to unsubscribe just do:

```js
var someSubscription = function(args) { ... };
var someEvent = new EventHandler(someSender);

someEvent.subscribe(someSubscription); // subscribe it
someEvent.unsubscribe(someSubscription); // unsubscribe it
```

or if you are living dangerously and end up doing a lot of inline functions
you can capture the return unsubscriber token and use that for unsubscribing:

```js
var someSubscription = ;
var someEvent = new EventHandler(someSender);

var unsubscriber = someEvent.subscribe(function(args) { ... }); // subscribe and get unsubscriber
unsubscriber(); // unsubscribe it
```

## Differences with C#

In c# the events tend to put the sender first, however as in most cases you don't care about the sender
and JS has optional arguments it made more sense for the args to be the first parameter and then the sender
be the last, this makes it more succinct when writing event handlers which do not care about the sender.

Before version 0.0.6 it used to be the other way around, but from this point on it will be as detailed above.