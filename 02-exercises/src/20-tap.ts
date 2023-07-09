import { filter, map, of, tap } from "rxjs";

/* 
The tap operator in RxJS is used to perform side effects or actions for each value emitted by an Observable, without modifying the values themselves. It allows you to perform additional operations, such as logging, debugging, or triggering other actions, while still allowing the original values to pass through the Observable unchanged.

Medium: Information is King — tap() — how to console.log in RxJS: https://medium.com/@jaywoz/information-is-king-tap-how-to-console-log-in-rxjs-7fc09db0ad5a
*/

of(1, 7, 3, 6, 2)
  .pipe(
    filter((value) => value > 5),
    tap((value) => console.log("spy: ", value)),
    map((value) => value * 2)
  )
  .subscribe((value) => console.log("Output: ", value));
