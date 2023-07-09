import { debounceTime, fromEvent, map, pipe } from "rxjs";

/* 
The debounceTime operator in RxJS is used to control the timing of emitted values from an Observable by only allowing a value to pass through if there is a specified duration of silence between emissions. It delays the emission of values and emits only the most recent value after a certain duration of silence.
*/

const sliderInput = document.querySelector("input#slider");

fromEvent(sliderInput, "click")
  .pipe(
    debounceTime(1000),
    map((event: any) => event.target.value)
  )
  .subscribe((value: any) => console.log(value));
