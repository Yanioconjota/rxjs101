import { EMPTY, Observable, catchError, of } from "rxjs";

/* 
The catchError operator in RxJS is used to handle errors emitted by an Observable and provide an alternative Observable or fallback value to continue the stream without propagating the error.
*/

const failedHttpRequest$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error(new Error("Timeout!"));
  }, 3000);
});

console.log("App Started");

/* The catchError method emits a fallback observable stepping over the subscriber's error notification. Which in this case is of("Fallback value")
Commenting out the pipe implementation the observable will emit the error notification.

The EMPTY operator in RxJS is a static creation operator that returns an Observable that immediately completes without emitting any values. It will skip the next notification and go straight to complete and show the complete output if there is any.
 */

failedHttpRequest$
  .pipe(
    //catchError((error) => of("Fallback value"))
    catchError((error) => EMPTY)
  )
  .subscribe({
    next: (value) => console.log(value),
    //complete: () => console.log("complete!"),
  });
