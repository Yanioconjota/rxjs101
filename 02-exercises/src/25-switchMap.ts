import { catchError, switchMap, fromEvent, map, of, filter, merge } from "rxjs";
import { ajax } from "rxjs/ajax";

/* 
Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.

The switchMap operator in RxJS is a flattening operator that maps each value emitted by the source Observable to an inner Observable, subscribes to the most recent inner Observable, and emits its values. It cancels and unsubscribes from any previously subscribed inner Observables as soon as a new inner Observable is emitted.

Description:
The switchMap operator applies a projection function to each value emitted by the source Observable. This projection function returns an inner Observable for each source value. The switchMap operator then subscribes to the most recent inner Observable, unsubscribing from any previously subscribed inner Observables. It emits the values emitted by the latest inner Observable.

If a new value is emitted by the source Observable before the current inner Observable completes, the switchMap operator cancels the previous subscription and subscribes to the new inner Observable.

Use Case:
The switchMap operator is commonly used when you have a stream of events or requests and want to switch to a new inner Observable for each event or request. It is useful in scenarios where only the results of the latest inner Observable matter, such as typeahead search or autocomplete functionality.

The switchMap operator ensures that only the values emitted by the latest inner Observable are emitted. When a new value is emitted by the source Observable, the previous inner Observable is unsubscribed from, and the new inner Observable is subscribed to. This behavior allows for dynamically switching to the most recent inner Observable.

However, be careful of an important pitfall it might have when using HTTP request for storing data on the server.

Imagine a scenario in which we make such call by using 'switchMap' and when a Subscription is made, the HTTP request starts immediately and our web browser says to the operating system to initialize the HTTP request and send some data. When we cancel such Subscription, we won't receive the response, however, the request might have already been sent and will reach the server anyway. So, unsubscribing doesn't guarantee that the request won't reach the server.

So, when using 'switchMap' together with HTTP requests, which save something on the server, the outcome might be unpredictable.
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
    switchMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((err) => of(`Could not fetch data: ${err}`))
      )
    )
  )
  .subscribe((value) => console.log(value));
