import { forkJoin, map } from "rxjs";
import { ajax } from "rxjs/ajax";

/*
The forkJoin operator in RxJS is used to combine the latest values from multiple Observables into a single Observable, emitting an array of those values when all the source Observables complete.
*/

const url = "https://random-data-api.com/api";

const randomName$ = ajax(`${url}/name/random_name`);

const firstName$ = randomName$.pipe(
  map((ajaxResponse: any) => ajaxResponse.response.first_name)
);

const lastName$ = randomName$.pipe(
  map((ajaxResponse: any) => ajaxResponse.response.last_name)
);

const randomNation$ = ajax(`${url}/nation/random_nation`).pipe(
  map((ajaxResponse: any) => ajaxResponse.response.capital)
);

const randomFood$ = ajax(`${url}/food/random_food`).pipe(
  map((ajaxResponse: any) => ajaxResponse.response.dish)
);

forkJoin([firstName$, lastName$, randomNation$, randomFood$]).subscribe(
  ([firstName, lastName, capital, dish]: any) =>
    console.log(
      `Hi! My name is ${firstName} ${lastName}, I'm from ${capital} and my favorite foof is ${dish}`
    )
);
