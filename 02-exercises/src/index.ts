import { catchError, concatMap, fromEvent, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

/* 
Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.
*/

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

//The best approach to handle errors in this case is add a catch error in the ajax call, otherwise (adding it after the concatMap) will hide the error but will emit a complete notification to the subscriber ending the subscription, causing that the input won't emit any more values/events until the site is reloaded.
fromEvent(fetchButton, "click")
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((err) => of(`Could not fecth data: ${err}`))
      )
    )
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log("Error:", err),
    complete: () => console.log("Completed"),
  });

/* 
  Sumarizing:

  1. An observable is created from the click event.
  2. The value from the input field is mapped to be returned as the input of the concatMap
  3. concatMap flattens the value and use it in an ajax call.
  3. If there's an error we handle it before passing it to the subscriber.
  4. If not, the value is passed as a next and complete notification.

  A simpler version will be something like this:

  fromEvent(fetchButton, "click")
  .pipe(
    map(() => endpointInput.value),
    concatMap(value =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((err) => of(`Could not fecth data: ${err}`))
      )
    )
  )
  .subscribe((value) => console.log(value));
  */
