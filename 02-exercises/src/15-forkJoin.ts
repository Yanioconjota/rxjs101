import { forkJoin } from "rxjs";
import { ajax } from "rxjs/ajax";

/*
The forkJoin operator in RxJS is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values when all the source Observables complete.
*/

const url = "https://random-data-api.com/api";

const randomName$ = ajax(`${url}/name/random_name`);

const randomNation$ = ajax(`${url}/nation/random_nation`);

const randomFood$ = ajax(`${url}/food/random_food`);

// randomName$.subscribe((ajaxResponse: any) =>
//   console.log(ajaxResponse.response.first_name, ajaxResponse.response.last_name)
// );

// randomNation$.subscribe((ajaxResponse: any) =>
//   console.log(ajaxResponse.response.capital)
// );

// randomFood$.subscribe((ajaxResponse: any) =>
//   console.log(ajaxResponse.response.dish)
// );

forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
  ([name, nation, food]: any) =>
    console.log(
      `Hi! My name is ${name.response.first_name} ${name.response.last_name}, I'm from ${nation.response.capital} and my favorite foof is ${food.response.dish}`
    )
);
