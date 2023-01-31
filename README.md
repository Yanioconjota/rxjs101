# Observer Pattern
The observer pattern is a design pattern in which an object, called the subject, maintains a list of its dependents (observers) and notifies them automatically of any changes to its state. In JavaScript, this can be implemented using events or by using an observer library such as RxJS. The observer pattern is useful for decoupling components, making it easier to add or remove functionality without affecting other parts of the system.

# RxJS 101

RxJS (*Reactive extensions for JavaScript*) is a library for composing asynchronous and event-based programs by using [observable](https://rxjs.dev/guide/observable) sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

#### *Think of RxJS as Lodash for events.*

### The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

[More info](https://rxjs.dev/guide/overview)

---

To run files on folder 01 within your terminal run ``ts-node index.ts``

to run in your browser run ``npm start`` and a new tab will open on ``http://localhost:8080/``

*Just remember to open the inspector with* ``F12``

---
## Stream vs Array

In an array all its content its available inmediately:

```
[1,32,78] [{x: 75, y: 22}, {x: 48, y: 07}] ['notebook', 'pencil']
```
A stream in the other hand, provides data in a timeline in which we can react or not, is pretty much like going into a grocery store and get into a coconut, we can put it into our shopping cart if it's on our list or not, then we find a box of cereal, we can add it or not, then another product may appear and we react or not, 
this is a reactive programming approach. So in this case we use an observable to react to those changes and make it work.



---

## Glossary
**Observable**: An Observable is basically a function that can return a stream of values to an observer over time, this can either be synchronously or asynchronously. The data values returned can go from zero to an infinite range of values

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
[Angular Basics: Introduction to Observables (RxJS)—Part 2](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-2#:~:text=The%20observer%27s%20next%20method%20defines,the%20data%20as%20an%20argument.)

