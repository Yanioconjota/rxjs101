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

## Glossary
...