import { Observable, concatMap, fromEvent, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

/* 
Flattening operators in RxJS are used to handle and merge higher-order Observables (Observables that emit other Observables) into a single Observable stream. They flatten the nested Observables, allowing you to work with the emitted values in a more convenient way.
*/

const endpointInput: HTMLInputElement =
  document.querySelector("input#endpoint");
const fetchButton = document.querySelector("button#fetch");

//Returning the input value on the click event
/* 
fromEvent(fetchButton, "click")
  .pipe(map((event) => endpointInput.value))
  .subscribe((value) => console.log(value));
 */

fromEvent(fetchButton, "click")
  .pipe(
    map((event) => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`)
    )
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (error) => console.log("Error:", error),
  });
