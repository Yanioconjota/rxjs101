import { Observable, timer } from "rxjs";

/*
The timer operator in RxJS is used to create an Observable that emits a sequence of numbers at a specified interval.
*/

console.log("App started!");

const timer$ = new Observable<number>((subscriber) => {
  const timeOutRef = setTimeout(() => {
    console.log("Timeout!");
    subscriber.next(0);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(timeOutRef);
});

const subscription = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log("subscription Unsubscribed after 1000ms");
}, 1000);

const timerOperatorSubscription = timer(2000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  timerOperatorSubscription.unsubscribe();
  console.log("timerOperatorSubscription Unsubscribed after 1000ms");
}, 1000);

//In this example, we pass 0 as the initial delay and 500 as the interval between emitted values. The Observable starts emitting values immediately, starting from 0, and continues emitting values every 500 milliseconds indefinitely.
const timerObservable = timer(0, 500).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  timerObservable.unsubscribe();
  console.log("timerObservable Unsubscribed after 4000ms");
}, 4000);
