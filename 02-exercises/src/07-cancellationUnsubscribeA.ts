import { Observable } from "rxjs";

let counter = 0;

const interval$ = new Observable<number>(subscriber => {
  console.log('Observable executed');
  setInterval(() => subscriber.next(++counter), 500);
  return () => console.log('Teardown');
});

const subscriber = interval$.subscribe(value => {
  console.log(value, 'received');
  if (counter >= 5) {
    console.log('unsubscribe');
    subscriber.unsubscribe();
  }
});
