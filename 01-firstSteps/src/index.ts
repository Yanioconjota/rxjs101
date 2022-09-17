import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('observable$ executed');
  subscriber.next('Peter Parker');
  setTimeout(() => {
    subscriber.next('James Howlett');
  }, 2000);
  setTimeout(() => {
    subscriber.next('Ororo Monroe');
  }, 4000);
});

console.log('SUbscription 1 starts');
observable$.subscribe(value => console.log('Subscription 1: ', value));

setTimeout(() => {
  console.log('SUbscription 2 starts');
  observable$.subscribe(value => console.log('Subscription 2: ', value));
}, 1000);