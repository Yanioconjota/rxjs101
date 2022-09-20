import { Observable } from "rxjs";
import { clearInterval } from "timers";

const interval$ = new Observable<number>(subscriber => {
  let counter = 0;

  console.log('Observable executed');

  const inntervalId = setInterval(() => subscriber.next(++counter), 500);
  return () => {
    console.log('Teardown');
    clearInterval(inntervalId);
  }
});

const subscriber = interval$.subscribe(value => { console.log(value, 'received') });

setTimeout(() => {
  console.log('unsubscribed');
  subscriber.unsubscribe();
}, 7000);
