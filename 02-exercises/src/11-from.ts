import { from } from "rxjs";

/*
The from operator in RxJS is used to create an Observable from various types of input sources such as arrays, iterables, Promises, or other Observables.
*/

const mutants = ["Wolverine", "Charles", "Magneto"];

from(mutants).subscribe({
  next: (val) => console.log("from operator array value: ", val),
  complete: () => console.log("from operator array value completed!"),
});

const somePromise = new Promise((resolve, reject) => {
  resolve("Resolved!");
  //reject("Rejected!");
});

const promiseObservable$ = from(somePromise);

promiseObservable$.subscribe({
  next: (val) => console.log("from operator promise value: ", val),
  error: (err: any) => console.log("from operator promise error: ", err),
  complete: () => console.log("from operator promise value completed!"),
});
