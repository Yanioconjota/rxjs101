import { Observable, combineLatest, fromEvent } from "rxjs";

/*
The combineLatest operator in RxJS is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values whenever any of the source Observables emit a new value. It needs a value from each source to emit an array of the combined values.

Unlike forkJoin, combineLatest does not wait for all the source Observables to complete. It emits whenever any of the source Observables emits a new value. If any of the Observables have not emitted a value yet, the combineLatest operator will not emit anything until all the Observables have emitted at least one value.
*/

const temperatureInput = document.getElementById("temperature-input");
const conversionDropdown = document.getElementById("conversion-dropdown");
const resultText = document.getElementById("result-text");

const temperatureInputEvent$ = fromEvent(temperatureInput, "input");
const conversionInputEvent$ = fromEvent(conversionDropdown, "input");

combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
  ([temperatureInputEvent, conversionInputEvent]: any) => {
    const temperature = Number(temperatureInputEvent.target.value);
    const conversion = conversionInputEvent.target.value;
    let result = 0;

    if (conversion === "f-to-c") {
      result = ((temperature - 32) * 5) / 9;
    } else if (conversion === "c-to-f") {
      result = (temperature * 5) / 9 + 32;
    }

    resultText.innerText = result.toString();
  }
);
