import { Observable, of } from "rxjs";

/*
The of operator in RxJS is an operator that allows you to create an Observable that emits a sequence of explicitly specified values. You can provide a comma-separated list of values as arguments to the of operator, and it will generate an Observable that emits those values sequentially.
*/

of("Wolverine", "Charles", "Magneto").subscribe({
  next: (val) => console.log("of operator value: ", val),
  complete: () => console.log("of operator value completed!"),
});

const mutants$ = new Observable<string>((subsciber) => {
  subsciber.next("Wolverine");
  subsciber.next("Charles");
  subsciber.next("Magneto");
  subsciber.complete();
});

mutants$.subscribe({
  next: (val) => console.log("value: ", val),
  complete: () => console.log("completed!"),
});

function ourOwnOfOperator(...args: string[]): Observable<string> {
  return new Observable<string>((subscriber) => {
    for (let i = 0; i < args.length; i++) {
      subscriber.next(args[i]);
    }
    subscriber.complete();
  });
}

ourOwnOfOperator("Wolverine", "Charles", "Magneto").subscribe({
  next: (val) => console.log("ourOwnOfOperator value: ", val),
  complete: () => console.log("ourOwnOfOperator value completed!"),
});
