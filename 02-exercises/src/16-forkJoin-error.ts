import { Observable, forkJoin } from "rxjs";

/*
The forkJoin operator in RxJS is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values when all the source Observables complete.

If there's an error the last emited value will be the error and close pending subscriptions
*/

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next("A");
    subscriber.complete();
  }, 5000);

  return () => console.log("A Teardown!");
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error("Failure!");
  }, 3000);

  return () => console.log("B Teardown!");
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error:", err),
});
