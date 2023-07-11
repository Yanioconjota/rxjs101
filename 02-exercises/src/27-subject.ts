import { Subject, fromEvent, map } from "rxjs";

/* 
Subject: A Subject is a type of Observable in RxJS that allows both subscribing to and emitting values. It acts as a bridge or proxy between the Observable and Observer, making it possible to multicast values to multiple subscribers. A Subject can be thought of as a combination of an Observable and an Observer, which means that it can emit values such as next, error and complete notifications, and multiple subscribers can receive those values.

Multicasting: Multicasting refers to the concept of sharing a single source Observable among multiple subscribers. It allows you to avoid duplicating the logic and resources used to produce the values, while ensuring that each subscriber receives the same sequence of values emitted by the source. In RxJS, multicasting can be achieved using subjects or higher-order Observable operators such as share, shareReplay, or publish.
*/

const emitButton = document.querySelector("button#emit");
const inputElement: HTMLInputElement = document.querySelector("#value-input");
const subscribeButton = document.querySelector("button#subscribe");

const value$ = new Subject<string>();

/*
We could use the 'pipe' method over here and map the click event into the input element's value and, instead of providing the handler for the next notifications, we can pass our 'value$' Subject directly, like so. So every notification emitted by the Observable above will be multicasted by our 'value$' Observer.

As a side note, it will also multicast the complete and error notifications which might end all active Subscriptions, so be aware of that when passing the Subject to the subscribe method. 

In our case, we don't expect to have those notifications here.
*/
fromEvent(emitButton, "click")
  .pipe(map(() => inputElement.value))
  .subscribe(() => {
    value$.next(inputElement.value);
  });

fromEvent(subscribeButton, "click").subscribe(() => {
  console.log("New subscription");
  value$.subscribe((value) => console.log(value));
});
