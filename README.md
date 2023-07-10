# RxJS 101

RxJS (_Reactive extensions for JavaScript_) is a library for composing asynchronous and event-based programs by using [observable](https://rxjs.dev/guide/observable) sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

### Folder examples

- **01-firstSteps**: related to genaral observable examples using Observable subscriptions and notifications such as next , complete and error.
- **02-exercises**: Examples using RxJs operators
  - **01 to 07** _How does an Observable works_
  - **08 to 09** _Types of Observables_
    - **Hot**: An Observable is cold when data is produced inside the Observable and the Observable is hot when the data is produced outside the Observable. As we just saw the hot Observable is able to share data between multiple subscribers. We call this behaviour “multicasting”. Generating a random number is not a good real life usecase. A good usecase would be DOM events. Let’s say we’re tracking clicking behaviour and have multiple subscribers do something with the coordinates
    - **Cold**: We call an Observable “cold” when the data is produced inside the Observable. Observables are lazy. Observables are lazy in the sense that they only execute values when something subscribes to it. For each subscriber the Observable starts a new execution, resulting in the fact that the data is not shared. If your Observable produces a lot of different values it can happen that two Observables that subscribe at more or less the same receive two different values. We call this behaviour “unicasting”.
  - **10 to 17** _Creation Operators_: Creation operators in RxJS are used to create new Observables from various sources or based on specific patterns. They allow you to generate Observables that emit values over time, such as from arrays, events, timers, or custom logic.
    - **of**: The of operator in RxJS is an operator that allows you to create an Observable that emits a sequence of explicitly specified values. You can provide a comma-separated list of values as arguments to the of operator, and it will generate an Observable that emits those values sequentially.
    - **from**: Creates an Observable from an array, an array-like object, a Promise, an iterable, or an Observable-like object.
    - **fromEvent**: Creates an Observable that emits events from a specified event source, such as DOM elements, Node.js event emitters, or other event-based APIs.
    - timer: Creates an Observable that emits a single value after a specified delay or at regular intervals.
    - **interval**: Creates an Observable that emits incrementing numbers at a specified interval.
    - **forkJoin**: Is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values when all the source Observables complete.
    - **combineLatest**: The combineLatest operator in RxJS is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values whenever any of the source Observables emit a new value.
  - **18 to 22** _Pipeable Operators_: Pipeable operators, also known as lettable operators, are a way to compose operators in a more modular and flexible manner in RxJS. They are a recommended approach for using operators in recent versions of RxJS (version 5.5 and above). Pipeable operators allow you to chain operators together using the pipe function, providing a more readable and composable syntax. They provide better tree-shaking capabilities and make it easier to create custom operator pipelines.
    - **filter**: The filter operator is used to create a new Observable that emits values from the source Observable that satisfy a specified condition.
    - **map**: The map operator is used to transform values emitted by an Observable into new values using a projection function.
    - **tap**: The tap operator in RxJS is used to perform side effects or actions for each value emitted by an Observable, without modifying the values themselves. It allows you to perform additional operations, such as logging, debugging, or triggering other actions, while still allowing the original values to pass through the Observable unchanged.
    - **debounceTime**: The debounceTime operator in RxJS is used to control the timing of emitted values from an Observable by only allowing a value to pass through if there is a specified duration of silence between emissions. It delays the emission of values and emits only the most recent value after a certain duration of silence.
    - **catchError**: The catchError operator in RxJS is used to handle errors emitted by an Observable and provide an alternative Observable or fallback value to continue the stream without propagating the error.
  - **23 to XX** _Flattening Operators_: Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.
    - **concatMap**: The concatMap operator in RxJS is a flattening operator that maps each value emitted by the source Observable to an inner Observable, subscribes to them sequentially, and emits their values in the order of their arrival. It ensures that the order of emissions from the inner Observables is maintained.
    - **switchMap**: The switchMap operator in RxJS is a flattening operator that maps each value emitted by the source Observable to an inner Observable, subscribes to the most recent inner Observable, and emits its values. It cancels and unsubscribes from any previously subscribed inner Observables as soon as a new inner Observable is emitted.

#### _Think of RxJS as Lodash for events._

### The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

[More info](https://rxjs.dev/guide/overview)

---

To run files on folder 01 within your terminal run `ts-node index.ts`

to run in your browser run `npm start` and a new tab will open on `http://localhost:8080/`

_Just remember to open the inspector with_ `F12`

---

## Stream vs Array

In an array all its content its available inmediately:

```
[1,32,78] [{x: 75, y: 22}, {x: 48, y: 07}] ['notebook', 'pencil']
```

A stream in the other hand, provides data in a timeline in which we can react or not, is pretty much like going into a grocery store and get into a coconut, we can put it into our shopping cart if it's on our list or not, then we find a box of cereal, we can add it or not, then another product may appear and we react or not,
this is a reactive programming approach. So in this case we use an observable to react to those changes and make it work.

---

## Introduction to Observables (RxJS)

Observables provide a unified way to work with different kinds of data. That is, observables can emit a single value or a sequence of values, synchronously or asynchronously, lazily (cold) or eagerly (hot), unicast to a single consumer (cold), or multicast to multiple consumers (hot).

### What Is an Observable?

> _“An observable represents a sequence of values which can be observed.” —[TC39](https://github.com/tc39/proposal-observable)_

Unlike promises and [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), observables are not part of JavaScript yet. However, there is a [TC39 proposal](https://tc39.es/proposal-observable/#observable-constructor) to add an observable type to JavaScript.

Let us find out what an observable is and what it does by studying the TC39 proposal.

### An Observable Is a Type

The TC39 proposal introduces the observable type as follows:

- The observable type can be used to model push-based data sources such as DOM events, timer intervals and sockets.
- The Observable constructor initializes a new observable object.

```
const myObservable$ = new Observable(subscriber);

function subscriber(observer) {
  // define the observable body

  return () => {
	// teardown logic
  };
}

```

- The subscriber argument must be a function object. It is called each time the subscribe() method of the observable object is invoked.

To create an observable instance, we implement the observable in a function and pass the function to the observable constructor. The TC39 proposal refers to this function as the **subscriber function**. The subscriber function will get invoked when each time we subscribe to the observable instance.

### What Does an Observable Do?

We know that we define an observable in a subscriber function, but what should the function do? What should be the input and what should it return?

The TC39 proposal mentions that the observable type can be used to model push-based data sources.

### An Observable Produces Data and Sends it to the Observer

There's an article “[Comparing Data Producers in JavaScript](https://www.telerik.com/blogs/angular-basics-comparing-data-producers-javascript-functions-promises-iterables-observables)” that talks about data producers and push vs. pull data systems.

As explained in the accompanying article, our application includes code that produces data (producers) and code that consumes data (consumers).

Functions, promises, iterables and observables are the data producers in JavaScript. This is why the TC39 proposal said that the observable type can be used to model a data source. “Push-based” means that observables are in control of when they send data to their observers.

The producers differ in how they communicate data with their consumers. That is, they might have a push or pull system, produce a single value or a sequence of values, send data synchronously or asynchronously, lazily or eagerly.

The key point is that an observable produces data and sends the data to its consumers. The data produced by an observable is consumed by its observers (or subscribers).

Since we define what an observable instance does in its subscriber function, the subscriber function takes an observer as input, produces data, sends the data to the observer, and notifies the observer if an error happened or if it has completed sending data.

### An Observable Allows Observers to Subscribe

Creating an observable instance is not enough to start producing and sending data—we also need to subscribe to the observable.

The observable needs to know who to send data to. We let an observable know that an observer is interested in receiving data by subscribing to it.

The observable type has a subscribe() method that accepts an observer as a parameter.

```
const subscription = myObservable$.subscribe(observer);

```

The subscribe() method begins sending values to the supplied observer object by executing the observable object’s subscriber function.

The subscribe() method executes the subscriber function, passing along the observer as an argument. The subscriber function then starts producing data and emitting values (or notifications) by executing the observer’s callbacks.

### An Observable Allows its Observers to Unsubscribe

The subscribe() method returns a subscription object which may be used to cancel the subscription.

```
const subscription = myObservable$.subscribe(observer);

```

The subscription object has a method called unsubscribe() that lets the observer to unsubscribe (or cancel the subscription):

```
const subscription.unsubscribe();

```

Calling unsubscribe() clears the resources used by the subscription and calls the teardown function returned by the subscriber function.

```
function subscriber(observer) {
  // Produce Data
  // Send data and notifications

  return () => {
    // teardown logic
  };
}

```

### What Is an Observer?

An observer is the consumer of the data produced by the observable. It is represented by an object with next, error and complete properties. These properties contain callback functions for processing data, handling errors and completion notifications.

The subscriber function emits data to the observer by calling the next() callback function. Likewise, it can send an error notification by calling the error() callback and a completion notification by calling the complete() callback.

```
function subscriber(observer) {
  observer.next('Hello there!');
  observer.complete();
}

```

### What Is RxJS?

As we mentioned earlier, the observable type is not part of JavaScript yet. However, we can use libraries that implement the observable type.

Implementations of the observable include:

- RxJS with 24,122,537 npm weekly downloads (at the time of writing)
- zen-observable with 3,352,707 weekly downloads
- fate-observable built as a learning project

We can see from the weekly npm downloads that RxJS is extremely popular. 🔥

RxJS stands for Reactive Extensions for JavaScript. According to the documentation:

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences.

The RxJS library implements:

- The observable type.
- The related types—observer, scheduler and subject.
- A set of observable creation functions. Observable creation functions make it easy to create observables from common data sources—for example, interval(), fromEvent() and range()—as well as combine observables—for example, concat(), race() and zip().
- A set of operators. Operators let us operate on each item in the observable data sequence. RxJS operators cover a lot of operations that we might want to perform on our data. These include operations to transform data, filter data, perform mathematical calculations and more. map(), filter() and reduce() are examples of operators provided by RxJS that we’re already familiar with from arrays in JavaScript.

In this article we will focus on the observable and observer types.

Let us have a closer look at the observable type in RxJS next. 🔎

### The Observable Class in RxJS

RxJS implements observable as a class with a constructor, properties and methods.

The most important methods in the observable class are subscribe and pipe:

- **subscribe()** lets us subscribe to an observable instance.
- **pipe()** lets us apply a chain of operators to the observable before subscribing to it. (If interested, you can read A simple explanation of functional pipe in JavaScript by Ben Lesh to learn how the pipe function enables tree-shaking, which is not possible with prototype augmentation.)
  The observable class also has the following method:

- **forEach()**—a non-cancellable means of subscribing to an observable, for use with APIs that expect promises.

Additionally, the observable class has various protected properties for the RxJS library’s internal use, meaning we should not use these properties directly in our application code.

### Creating an Observable in RxJS

As expected, we use the observable constructor to create an instance of observable:

```
import { Observable } from 'rxjs';

const myObservable$ = new Observable(subscriber);

function subscriber(observer) {
  // Produce data
  // Emit data
  // Notify if error
  // Notify if/when complete

  return () => {
    // teardown logic
  };
}

```

Creating an observable in RxJS is pretty much the same as what we saw in the TC39 proposal, except we need to import the observable class from the RxJS library to use it.

It is customary to add the $ sign at the end of the variable name containing an observable. This is a helpful convention started by Andre Stalz that makes it easy to see at a glance we are working with an observable.

If we inspect the above observable instance, we see it has the subscribe() and pipe() methods, together with forEach() and the private properties.

The following methods in the list have been deprecated and will be removed in RxJS v8:

- **toPromise()**—returns a promise that resolves to the last value emitted by the observable when it completes. It has been replaced with **firstValueFrom** and **lastValueFrom** and will be removed in v8. Please refer to https://rxjs.dev/deprecations/to-promise and this inDepthDev article—RxJS heads up: toPromise is being deprecated—for more details.
- **lift()**—creates a new observable, with this observable instance as the source, and the passed operator defined as the new observable’s operator. However, this is an implementation detail and we should not use it directly in our application code. It will be made internal in v8.

### The Subscribe Function

The [observable constructor](https://github.com/ReactiveX/rxjs/blob/6fa819beb91ba99dadd6262d6c13f7ddfd9470c5/src/internal/Observable.ts#L33) expects a function as its parameter. The RxJS library names the argument subscribe. Therefore, we could refer to the function passed into the constructor as the _“subscribe function.”_

```
constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

```

As we see, the subscribe function takes a subscriber as a parameter and returns a function containing the teardown logic. The constructor stores the subscribe function in an internal class property called \_subscribe.

The TC39 proposal names the subscribe function similarly—subscriber.

The subscribe/subscriber function is very important for two reasons:

1. It defines what the observable instance would do—that is, it defines how to produce data, and send data and notifications to the subscriber (observer).
2. It is the function that is executed when we subscribe to the observable instance

### The Observable Function

To avoid confusing the “subscribe function” with the observable class’ subscribe() method, in the rest of this article we will refer to the function we pass to the observable constructor as the “**observable function**.”

Calling it observable function highlights that this function contains the body of the observable. Whereas calling it the subscribe function highlights that this function is invoked when we subscribe to the observable.

How is the observable function different from other functions?

A function usually takes an input, acts on the input and returns a single value.

An observable function is a higher order function that:

- Takes a subscriber object as input (the subscriber object contains the callback functions)
- Produces data
- Sends a sequence of values, error notification or completion notification to the subscriber by calling its corresponding callback functions
- Optionally returns a teardown function.

Now that we’ve seen that “subscribe function,” “**subscriber function**” and “**observable function**” are all names we may call the function we pass to the observable constructor and talked about what it does, let us talk about how subscribers relate to observers.

### Sequence of Values

We said that an observable can emit zero to multiple values. But how does an observable emit multiple values?

The observable function can call the next() callback multiple times, thus it can emit a sequence of values. Since the observable can emit a sequence of values over time, it is also referred to as a data stream.

The number of values in the sequence depends on the observable instance. An observable may do any of these:

- Produce a single value and then complete
- Produce multiple values before it completes
- Continue producing values until we tell it to - Stop by unsubscribing
- Not produce any values at all

### Synchronous or Asynchronous

Do observables call the observer callbacks synchronously or asynchronously?

In order to answer this question, we need an understanding of what it means to call a function asynchronously.

Please read the accompanying article “Angular Basics: Introduction to Processes and Threads for Web UI Developers” to learn more about processes and threads and asynchronous programming.

Following is a quick explanation for convenience.

### Main Thread of the Renderer Process

Modern browsers have a multi-process architecture. Instead of running everything in one process, browsers create multiple processes to take care of different parts of the browser.

Browsers typically have a separate process for rendering web pages.

The main thread of the renderer process is responsible for:

- Rendering the web page
- Running the application’s JavaScript (except workers)
- Responding to user interactions

Our application code includes JavaScript and Web APIs. We use Web APIs (also known as Browser APIs) to provide a variety of features to enhance our web application.

> Browser APIs are built into your web browser and are able to expose data from the browser and surrounding computer environment and do useful complex things with it. —MDN

Our application’s JavaScript (except workers) runs on the main thread of the Renderer process in the browser. Calls to Web APIs may run on another process in the browser. A web worker runs the script on a worker thread in the renderer process.

### Worker Threads

JavaScript code that takes too long to execute blocks the renderer process’s main thread. That is, while the main thread is waiting for the JavaScript code to return, it cannot update the rendering or respond to user interactions. This negatively impacts the user experience of our application.

Not to worry though—we can offload computationally intensive functions in our applications to run on worker threads by using the Web Workers API. A worker thread executes the script and communicates the result to the application running on the main thread by posting a message. The application has an onmessage event to process the result.

### Web APIs

Besides keeping the main thread from blocking, we can use Web APIs to access privileged parts of a browser from our web applications.

A browser’s renderer process is typically sandboxed for security. This means the web application code cannot directly access the user’s files or camera, make network requests or operating system calls, etc. Instead, we use Web APIs provided by the browsers to access privileged parts of a browser in our web applications.

It is important to highlight that calls to these Web APIs are not executed on the renderer process, but on a process with more privilege such as the main browser process.

For example, we can use the Fetch API or XMLHttpRequest to request data from the network. In Chrome, the network thread in the browser process is responsible for fetching data from the internet.

### Callbacks, Task Queues and Event Loop

The tasks performed on another thread (other than the renderer process’s main thread) are asynchronous tasks. The process/thread performing the asynchronous task communicates with the renderer process using Inter-Process Communication (IPC).

We define callback functions to be executed once the asynchronous tasks are completed. For example:

```
setTimeout(() => console.log('This is the callback function passed to setTimeout'), 1000);

```

The callback processes any results returned by the asynchronous task. For example:

```
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

navigator.geolocation.getCurrentPosition(console.log, console.warn);

```

When an asynchronous task is completed, the thread performing the asynchronous task adds the callback to a **queue** on the main thread of the renderer process.

The renderer process has queues (job queue, task queue, or message queue and a microtask queue) for asynchronous callbacks that are ready to run on the main thread. The renderer process also has an **event loop** that executes the queued callbacks when the JavaScript callstack is empty. The event loop executes the queued callback passing in any value returned by the asynchronous task as an argument.

Back to the question: _Do observables call the observer callbacks synchronously or asynchronously?_

**The answer is**: It actually depends on the observable instance. Observables can emit data synchronously or asynchronously—it depends on whether the observable function performs a synchronous task or asynchronous task to produce data.

Just because observables use callbacks to send data and notifications does not mean that the callbacks are always executed asynchronously—that is, added to a task or microtask queue to be executed by the event loop.

### Observables Can Emit Data and Notifications Asynchronously

If the observable function performs an asynchronous task to produce data, then it emits the data asynchronously.

For example, an observable may fetch resources from the network using the browser’s [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```
pikachu$ = new Observable(observer => {
  fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(response => response.json())
    .then(pikachu => {
      observer.next(pikachu);
      observer.complete();
    })
    .catch(err => observer.error(err))
});

pikachu$.subscribe({
  next: pikachu => console.log(pikachu),
  error: err => console.error(err)
});

```

Fetching data from the network is an asynchronous task that is carried out by a network thread. The fetch() method returns a promise object that lets us process the results of the asynchronous task.

We pass a success callback to the promise object by calling its then() method. In the success callback, we emit the data returned from fetch by calling observer.next(pikachu) and also notify the observer that we have finished sending data by calling observer.complete().

We also pass an error callback to the promise by calling the catch() method. In the error callback, we notify the observer of the error by calling observer.error(err) and passing in the error information.

The promise object queues the success or error callback in the microtask queue so the event loop can execute it when the callstack is empty. Thus, the observer methods (next and complete, or error) are called asynchronously in this observable.

### Observables Can Emit Data and Notifications Synchronously

Observables can also emit data and notifications synchronously.

```
const colourPalette$ = new Observable(observer => {
  const palette = [
    'hsl(216,87%,48%)',
    'hsl(216,87%,48%)',
    'hsl(42,99%,52%)',
    'hsl(7,66%,49%)'
  ];
  for (let colour of palette) {
    observer.next(colour);
  }
  observer.complete();
}

colourPalette$.subscribe(console.log);

```

The observable function above produces data synchronously. That is, it assigns an array of string values to the constant palette (which is the data source). It then calls observer.next(colour) for each color in the palette, then calls the observer.complete() callback, and finally returns.

When we call next() in this observable instance, the JavaScript engine creates an execution context for the function and adds it to the callstack. No queues or event loop are involved.

### Cold vs. Hot Observables

The observable could get its data from any source really. It could get data from various Web APIs, such as DOM events, Websockets, Fetch or Geolocation. It could loop over an iterable, or even send hard-coded values like we often do in blog posts and tutorials. 😊

The code responsible for producing data for an observable is the actual producer part of the observable. It is important to highlight that we could define the producer within the observable function body or reference a producer that has been defined outside the observable body.

A cold observable contains the code to produce data, while a hot observable closes over it.

Let us take a closer look at cold and hot observables next.

### Cold Observables

The characteristics of cold observables follow from data being produced as part of the observable function.

- **Cold observables won’t produce data until we subscribe**. When we subscribe to an observable, it executes the observable function. Since the code for the producer is included within the observable function, it only runs when the observable function is called.
- **Cold observables are unicast**. Each subscription executes the observable function and thus the code to produce data. For example, if the observable creates an instance of an object or a random value, each observer will get its own separate instance or unique value.
  The observables we have created so far in this article are cold observables. Let us have a go at creating a few more, this time keeping in mind that the code for producing data is a part of the observable function.

**Example 1**: A cold observable using the Geolocation API to get the current location of the user’s device and emit the location to its observer.

```
import { Observable } from 'rxjs';

const location$ = new Observable(observer => {
  let watchId;
  const success = position => {
    observer.next(position);
  };
  const error = err => {
    observer.error(err);
  };
  const geolocation = `navigator.geolocation;`
  if (!geolocation) {
    observer.error('Geolocation is not supported by your browser');
  } else {
    watchId = geolocation.watchPosition(success, error);
  }
  return () => geolocation.clearWatch(watchId);
});

```

**Data**: The current position of the user’s device.

**Producer**: navigator.geolocation.watchPosition().

**Code explanation**:
The Geolocation API allows the user to provide their location to web applications if they so desire. For privacy reasons, the user is asked for permission to report location information.

navigator.geolocation.watchPosition() takes a success callback, an optional error callback and options.

When watchPosition() has successfully located the user’s device position, it will call the success callback and pass in the position. We emit the user’s position in the success callback. watchPosition() will execute the success callback each time it has an updated position. Therefore, the observable function will continue emitting the updated position.

On the other hand, there could be an error, such as the Geolocation API doesn’t exist on the user’s browser or the user denied permission to report their location information. We notify the user of the error by calling observer.error(err).

location$ is a cold observable since it defines its producer within the observable. It will only start producing and emitting values when we subscribe to it. Each observer will create a new watch. When an observer unsubscribes, it will only unregister its own success and error handlers.

**Example 2**: A cold observable instance where the observable function creates a random number using the JavaScript built-in Math object.

```
import { Observable } from 'rxjs';

const randomNumberCold$ = new Observable(observer => {
  const random = Math.random();
  observer.next(random);
  observer.complete();
});

```

**Data**: a random number.

**Producer**: Math.random().

Each observer gets a separate random value since each subscription executes Math.random():

```
randomNumberCold$.subscribe(console.log); // 0.8249378778010443
randomNumberCold$.subscribe(console.log); // 0.36532653367650236

```

### Hot Observable

Hot observables emit data that was produced outside the observable function body.

The data is generated independently of whether an observer subscribes to the observable or not. The observable function simply accesses the data that is already produced (outside the function) and emits the data to observers.

All the observers will get the same data. Thus, a hot observable is said to be multicast.

For example, here’s the random number example rewritten as a hot observable.

```
const random = Math.random();
console.log(random); // 0.05659653519968999

const randomNumberHot$ = new Observable(observer => {
  observer.next(random);
  observer.complete();
});

```

The random number is generated independently of our subscriptions to randomNumberHot$. You’ll notice that we haven’t subscribed to observable yet.

Each observer randomNumberHot$ gets the same random number because Math.random() is only executed once.

```
randomNumberHot$.subscribe(console.log); // 0.05659653519968999
randomNumberHot$.subscribe(console.log); // 0.05659653519968999

```

### Built-in Observable Creation Functions in RxJS

So far in this article, we have created observables from scratch. That is, we used the new operator on the observable constructor and passed the observable function as an argument. We defined the body of the observable in the observable function.

However, we have hard-coded values in the observable function. How can we make the observables customizable and reusable?

You’re probably thinking, Hey, functions are customizable and reusable—we should use functions. Well, that’s a brilliant idea. 🦊 We can create functions that accept parameters, create a new observable based on these parameters, and return the observable instance.

The good news is that RxJS provides observable creation functions for most tasks so we don’t need to write them ourselves.

Let us look at some of the commonly used observable creation functions provided by RxJS:

- **from()** expects an array, an array-like object, a promise, an iterable object or an observable-like object as its parameter. And it returns an observable that emits the items from the given input as a sequence of values.

```
from([5, 50, 100]).subscribe(console.log);
// 5
// 50
// 100

```

- **of()** expects multiple parameters and creates an observable that emits each parameter as a value, then completes.

```
of([5, 50, 100], [10, 100, 200]).subscribe(console.log);
// [5, 50, 100]
// [10, 100, 200]

```

You may also be interested to learn about generate() and range().

### Events

- **fromEvent()** expects a target and event name as its parameters and returns an observable that emits the specified event type from the given target.

```
import { fromEvent } from 'rxjs';

const drag$ = fromEvent(document, 'drag');
drag$.subscribe(console.log);
const drop$ = fromEvent(document, 'drop');
drop$.subscribe(console.log);

```

You may also be interested to learn about [fromEventPattern()](https://rxjs.dev/api/index/function/fromEventPattern). Which creates an Observable from an arbitrary API for registering event handlers.

### Timers

- The interval() observable creation function returns an observable that emits the next number in the sequence at the specified interval.

```
import  { interval } from 'rxjs';

const seconds$ = interval(1000);
seconds$.subscribe(console.log);

const minutes$ = interval(60000);
minutes$.subscribe(console.log);

```

You may also be interested to learn about [timer()](https://rxjs.dev/api/index/function/timer).

### Creating Observables Dynamically

- **defer()** allows us to create an observable only when the observer subscribes.

### Combining Observables

- [**combineLatest()**](https://rxjs.dev/api/index/function/combineLatest) Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.
- [**concat()**](https://rxjs.dev/api/index/function/concat) Creates an output Observable which sequentially emits all values from the first given Observable and then moves on to the next.
- [**forkJoin()**](https://rxjs.dev/api/index/function/forkJoin) Accepts an Array of ObservableInput or a dictionary Object of ObservableInput and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary
- [**merge()**](https://rxjs.dev/api/index/function/merge) Creates an output Observable which concurrently emits all values from every given input Observable.
- [**race()**](https://rxjs.dev/api/index/function/race) Returns an observable that mirrors the first source observable to emit an item.
- [**zip()**](https://rxjs.dev/api/index/function/zip) Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.

You may also be interested to learn about splitting an observable using the [partition()](https://rxjs.dev/api/index/function/partition) function. which Splits the source Observable into two, one with values that satisfy a predicate, and another with values that don't satisfy the predicate.

Please refer to the RxJS docs for detailed explanations of the observable creation functions. If curious, you can also look at the implementation for a few of these functions.

**Observable**: An Observable is basically a function that can return a stream of values to an observer over time, this can either be synchronously or asynchronously. The data values returned can go from zero to an infinite range of values.

**Subscription**: A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, unsubscribe , that takes no argument and just disposes the resource held by the subscription. In previous versions of RxJS, Subscription was called "Disposable".

**Observers**: To subscribe to an observable, we call the observable’s subscribe() method and pass in an observer or a next() callback as an argument.

```
export interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

```

**Next**: The observer's next method defines how to process the data sent by the observable.

```
const observer = {
  next: (value) => {
    // process the value emitted by the observable function
  }
};
```

The observable function sends data to the observer by calling the observer’s next method and passing the data as an argument. Calling the observer’s callback function to send data is called emitting data

```
const myObservable$ = new Observable(observer => {
  // Produce data:
  const value = Math.random();

  // Send data to the observer
  observer.next(value);
});
```

**Error**: The observer’s error method handles the error sent by the observable.

```
const observer = {
  error: err => // handle error
};
```

The observable function notifies the observer if an error occurs by calling the observer’s error method and passing in the error information.

```
const myObservable$ = new Observable(observer => {
  // Produce value
  // if ok, emit value

  // if error, send error information
  observer.error(error);
});
```

For example:

```
pikachu$ = new Observable(observer => {
  fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(response => response.json())
    .then(pikachu => {
      observer.next(pikachu);
      observer.complete();
    })
    .catch(err => observer.error(err))
});
```

**Complete**: The observer’s complete() callback specifies the action to take when the observable has completed producing and emitting data.

```
const observer = {
  complete: () => console.log('You have used up all the vowels.')
};
```

The observable function lets the observer know it has finished producing and sending data by calling the observer’s complete() callback. This is the case when the observable has a sequence of values of a finite length—for example, emitting the elements from an array that has five elements.

```
const vowels$ = new Observable(observer => {
  // Produce data
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  // Send values
  for (let letter of vowels) {
    observer.next(value);
  }

  // Send complete notification
  observer.complete();
});
```

**Subscribers**: RxJS uses the subscriber class to manage subscriptions. It is an internal class meant for the library’s use. We already know that we pass an observer object or next callback to the subscribe() method. Here comes the juicy bit: The subscribe() method converts the observer object or next callback to a [subscriber](https://github.com/ReactiveX/rxjs/blob/6fa819beb91ba99dadd6262d6c13f7ddfd9470c5/src/internal/Subscriber.ts#L20) object.

The subscriber class implements the observer interface. Therefore, a subscriber object has the next, error and complete methods.

In addition, a subscriber object keeps track of whether the observable is stopped and provides logic such as:

- next cannot be executed after the observable has errored or completed.
- next, error or complete cannot be called after unsubscribe.
- unsubscribe is called on error or complete to free the resources used by the subscription and the observable.

Isn’t it great that the RxJS library provides us these guarantees?! 🦄

Let us recap what we learned about observables so far 🐾🐾🐇:

- An observable produces data and sends it to its observers.
- We let the observable know that an observer wants to receive data by subscribing to the observable and passing in the observer.
- In code, an observer is represented by an object with next, error and complete methods. These methods define how to process the values and notifications sent by the observable.
- To start receiving data from an observable, we subscribe to the observable and pass in the observer object.
- Internally, RxJS converts the observer into a subscriber object. The subscriber provides additional logic to manage the correct execution of observer callbacks. It also clears resources when the observable completes, or has an error, or if the observer unsubscribes.

### Executing an Observable

As with functions, the observable function is inert. It defines how to produce data (cold observable) or closes over the code that produces data (hot observable). But the observable function does not emit any values until it is executed.

We execute a function with the parenthesis():

```
functionName(parameter)
```

Whereas, we execute an observable function indirectly by calling the observable’s subscribe() method:

```
const subscription = vowels$
  .subscribe(value => console.log(value));
```

The subscribe() method calls the observable’s function that produces and emits data. Thus, subscribing to an observable starts a flow of data between the observable and the observer.

Let us examine the subscribe() method more closely next.

### Subscribing to an Observable

The subscribe() method orchestrates a few important tasks for the observable behind the scenes:

1. It accepts an observer object or callback functions as parameters.
2. It converts the observer or callback functions to a SafeSubscriber object. SafeSubscriber extends the subscriber class which in turn extends the subscription class.
3. It executes the observable function and passes the subscriber as an argument.
4. It adds the observable’s teardown function to the subscriber object.
5. And it returns the subscriber object, which, as we mentioned earlier, is of type subscription.

Let us look at the subscribe() method signatures next.

### The subscribe() Method Signatures

The subscribe method has a few signatures:

1. The first signature takes a partial observer as its argument.

```
subscribe(observer?: Partial<Observer<T>>): Subscription;
```

We pass in an object that implements the observer interface. It is common to simply pass an object literal with next, error and complete methods.

```
import { from } from  'rxjs';
const vowels$ = from(['a', 'e', 'i', 'o', 'u']);

vowels$.subscribe({
  next: x => console.log('The next vowel is: ', x),
  error: err => console.error('An error occurred', err),
  complete: () => console.log('There are no more vowels.')
});
```

The subscribe() method expects a partial observer type, so it does not have to include all three methods. We can omit the methods that we don’t need.

```
vowels$.subscribe({
  next: x => console.log('Next vowel: ', x),
  complete: () => console.log('No more values in the sequence.')
});
```

We could call subscribe() without passing any parameters since the parameter is optional. For example, instead of reacting to the values emitted by the observable, we might want to perform a side effect using the tap operator.

In the example below, we’re simply logging the vowels to the browser console using a tap() operator. This illustrates that calling subscribe() does indeed call the observable function, even if we don’t pass an observer or next callback.

```
const vowels$
  .pipe(tap(console.log);)
  .subscribe();
// a
// e
// i
// o
// u
```

2. The second signature for subscribe() takes the next() callback function.

```
subscribe(next: (value: T) => void): Subscription;
```

When we only want to process the data value, we can simply pass the next() callback:

```
vowels$.subscribe(
  vowel => console.log('Next vowel: ', vowel)
);
```

Rather than an object with the next method:

```
vowels$.subscribe(
  { next: vowel console.log('Next vowel: ', vowel) }
);
```

3. Passing multiple callback functions to subscribe() is deprecated.

There are signatures for subscribe() that take the next(), error() and complete() callback functions as parameters.

The following signature allows us to omit some of the callback functions and pass undefined or null instead. However, it is deprecated.

```
subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
```

The RxJS docs advise passing multiple callbacks in an observer object rather than passing the callbacks as separate arguments. Please refer to the docs for more information.

Some observables produce a finite set of values, but others may continue producing values infinitely. What if we don’t want to receive any more data from an observable?

### Unsubscribing From an Observable

We can let an observable know that we don’t want to receive any more data from them. Don’t worry, the observable won’t be offended. 😆 In fact, observables are cool and know how to cancel subscriptions gracefully. 🐳

As we mentioned earlier, calling subscribe() on an observable returns a subscription object. The subscription object has a method called unsubscribe() that lets us unsubscribe from the observable.

Unsubscribing from an observable does the following two things:

Stops executing the observable function, thus stopping the observable from producing or emitting any more data.
Clears the resources used by the subscription and executes the observable’s teardown function.
Recall that the observable function can return a function containing the teardown logic. The subscribe() method adds the observable’s teardown function to the subscription.

Unsubscribing does not mean that the observable is complete. Let us look at the difference between unsubscribing and completing next. 🛑✅

### Unsubscribe vs. Complete

Unsubscribing from an observable stops the observable from emitting any more values. However, the observable might not have completed sending all the values—it may have more values in its data sequence that remained unsent.

For this reason, unsubscribe() does not call complete() as part of unsubscribing. The observable function calls complete when it has actually finished emitting all the values it had to emit.

On the other hand, when an observable errors or completes, the subscriber object calls unsubscribe(), thus freeing the resources used by the subscription and the observable function.

Since complete calls unsubscribe behind the scenes, we don’t need to explicitly unsubscribe from the subscription in order to free resources. For example, our vowels$ observable emits values and completes.

However, not all observables complete. If we do not unsubscribe from the interval$ observable below, it will continue emitting values every specified interval and cause a memory leak.

```
const interval$ = interval$ = interval(1000);

subscription = interval$.subscribe(console.log);

stopTimer() {
  this.subscription.unsubscribe();
}
```

Please refer to the [StackBlitz](https://stackblitz.com/edit/angular-ivy-ivvhbl?file=src%2Fapp%2Fapp.component.ts) demo for complete code.

Also, please refer to the article [RxJS: Don’t Unsubscribe](https://benlesh.medium.com/rxjs-dont-unsubscribe-6753ed4fda87) by Ben Lesh to learn about managing subscriptions non-imperatively.

### Summary

The secret to understanding observables lies in knowing how an observable is created. 🔐

In this two-part article series, we became familiar with the observable function. This is the function we pass to the observable constructor to create an instance of observable. The observable function contains the code to produce data and emit data and notifications to the subscriber.

The observable function:

- Takes a **subscriber object** as its parameter
  produces data within the function (**cold observable**) or closes over a producer (**hot observable**)
- Emits a sequence of **zero to multiple values** either **synchronously** or **asynchronously** to the subscribers
- Notifies the subscribers if an **error** occurs or if it has **completed** emitting all the data
- Returns the **teardown function**

We let an observable know that we want to receive data by calling its subscribe() method and passing in an observer object. The observer object contains callbacks to process data and notifications sent by the observable.

Subscribing to an observable executes the observable function, turns the observer object into an internal subscriber object, and returns a subscription object.

We can unsubscribe by executing the subscription object’s unsubscribe() method. Unsubscribing clears the resources used by the subscription and runs the observable’s teardown function. It is important to unsubscribe from observables to avoid memory leaks—however, we do not need to explicitly unsubscribe from observables that are complete.

We’ve seen that observables produce data—this is why observables are sometimes referred to as **data source** or **source**. Moreover, observables can emit a sequence (or stream) of values—thus observables are also called **data streams** or **streams**.

I hope this two-part article helped provide a better understanding of the observable type, paving the path to learn further topics relating to observables and reactive programming with RxJS (operators, subjects and schedulers).

#### Resources

[Angular Basics: Introduction to Observables (RxJS)—Part 1](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-1)
[Angular Basics: Introduction to Observables (RxJS)—Part 2](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-2)
