import { Observable, fromEvent } from "rxjs";

/*
The fromEvent operator in RxJS is used to create an Observable that emits events from a specified event source, such as DOM elements, Node.js event emitters, or other event-based APIs.
*/

const triggerButton = document.querySelector("button#hello");

const buttonObservable$ = fromEvent(triggerButton, "click");

const buttomFromEventSubscription = buttonObservable$.subscribe(
  (event: any) => {
    console.log(
      "formEvent Button clicked!",
      event,
      event.target,
      event.type,
      event.x,
      event.y
    );
  }
);

const triggerClick$ = new Observable<MouseEvent>((subscriber: any) => {
  const clickHandlerFn = (event: any) => {
    console.log("Event callback executed!");
    subscriber.next(event);
  };
  triggerButton.addEventListener("click", clickHandlerFn);
  //Teardown logic to properly remove callback function execution
  return () => {
    triggerButton.removeEventListener("click", clickHandlerFn);
  };
});

const subscription = triggerClick$.subscribe((event: any) => {
  console.log(event.type, event.x, event.y);
});

setTimeout(() => {
  console.log("triggerClick unsubscribe");
  subscription.unsubscribe();
}, 5000);

setTimeout(() => {
  console.log("fromEvent unsubscribe");
  buttomFromEventSubscription.unsubscribe();
}, 10000);
