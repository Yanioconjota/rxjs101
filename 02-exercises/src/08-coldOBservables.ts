import { ajax } from 'rxjs/ajax';

/*
Cold Observables:

So, we call an Observable “cold” when the data is produced inside the Observable. Observables are lazy. Observables are lazy in the sense that they only execute values when something subscribes to it. For each subscriber the Observable starts a new execution, resulting in the fact that the data is not shared. If your Observable produces a lot of different values it can happen that two Observables that subscribe at more or less the same receive two different values. We call this behaviour “unicasting”.

*/

const ajax$ = ajax<unknown>('https://random-data-api.com/api/v2/beers');

ajax$.subscribe(
  data => console.log('sub 1: ', data.response)
);

ajax$.subscribe(
  data => console.log('sub 2: ', data.response)
);

ajax$.subscribe(
  data => console.log('sub 3: ', data.response)
);
