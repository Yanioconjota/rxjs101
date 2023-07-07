import { Observable, interval } from "rxjs";

/*
The interval operator in RxJS is used to create an Observable that emits incremental numbers at a specified interval.
*/

console.log("App started!");

const interval$ = new Observable<number>((subscriber) => {
  const intervalRef = setInterval(() => {
    let counter = 0;
    console.log("Timeout!");
    subscriber.next(counter++);
    subscriber.complete();
  }, 1000);

  return () => clearInterval(intervalRef);
});

const subscription = interval$.subscribe({
  next: (value) => console.log("interval$ subscription value:", value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log("subscription Unsubscribed after 1000ms");
}, 1000);

//In this example, we create an Observable using the interval operator with an argument of 1000 milliseconds. The Observable starts emitting values immediately, starting from 0, and continues emitting incremental numbers every 1000 milliseconds.
const intervalObservable = interval(1000).subscribe({
  next: (value) => console.log("intervalObservable value:", value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  intervalObservable.unsubscribe();
  console.log("intervalObservable Unsubscribed after 4000ms");
}, 4000);
