import { catchError, mergeMap, fromEvent, map, of, filter, merge } from "rxjs";
import { ajax } from "rxjs/ajax";

/* 
Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.

The mergeMap operator in RxJS is a flattening operator that applies a projection function to each value emitted by the source Observable and maps it to an inner Observable. It then subscribes to all inner Observables concurrently and merges their emitted values into a single Observable stream.

Description:
The mergeMap operator, also known as flatMap, takes each value emitted by the source Observable and applies a projection function to it. This projection function returns an inner Observable for each source value. The mergeMap operator then subscribes to all the inner Observables concurrently, merging their emitted values into a single Observable stream.

The order of emission of the inner Observable values may not be preserved, as they are merged as they arrive.

Use Case:
The mergeMap operator is useful when you have a stream of values and need to perform operations on each value that return asynchronous results. For example, making multiple HTTP requests in parallel or handling concurrent tasks.

---

This is important to remember, to make sure that the inner Observables complete at some point. In the case of 'mergeMap' is the easiest to cause big memory leaks when we forget to make sure that the inner Observables complete. This is because each value emitted by the source Observable causes a new concurrent inner Subscription to happen.

So if we would have a thousand values emitted by the source at the same time, a thousand concurrent inner Subscriptions will be made. And if we wouldn't make sure that they complete at some point, over time, as more and more values get emitted by the source, this number of inner Subscriptions would keep on increasing, keep on growing, and we might have lots of memory leaks.

Also, if you'd like to use it for sending HTTP requests, keep in mind that the order can also get all mixed up, both on our side and the side of the server. We don't know in what order will those requests reach the server. And also the responses can come in an unpredictable order, as we can see in the diagram.


*/

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");
const enterKey = 13; // Key code for "Enter" key

const click$ = fromEvent(fetchButton, "click").pipe(
  map(() => endpointInput.value)
);

const enter$ = fromEvent(endpointInput, "keydown").pipe(
  filter((event: any) => event.keyCode === enterKey),
  map(() => endpointInput.value)
);

merge(click$, enter$)
  .pipe(
    mergeMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((err) => of(`Could not fetch data: ${err}`))
      )
    )
  )
  .subscribe((value) => console.log(value));
