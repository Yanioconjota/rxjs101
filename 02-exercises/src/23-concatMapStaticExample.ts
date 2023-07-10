import { Observable, concatMap, of } from "rxjs";

/* 
Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.
*/

const source$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next("A"), 2000);
  setTimeout(() => subscriber.next("B"), 5000);
});

console.log("App Started");

source$.subscribe(console.log); // --> Will emit A and B --> A ... B

/*
The concatMap operator in RxJS is a flattening operator that maps each value emitted by the source Observable to an inner Observable, subscribes to them sequentially, and emits their values in the order of their arrival. It ensures that the order of emissions from the inner Observables is maintained.
*/

const concatMapExample$ = source$.pipe(concatMap(() => of(1, 2)));

concatMapExample$.subscribe(console.log); // --> Will emit 1 and 2 when A and B are emitted --> 1,2 ... 1,2
