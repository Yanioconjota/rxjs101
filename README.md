# RxJS 101

RxJS (*Reactive extensions for JavaScript*) is a library for composing asynchronous and event-based programs by using [observable](https://rxjs.dev/guide/observable) sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

### *Think of RxJS as Lodash for events.*

---

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
...