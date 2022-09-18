import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('Value to emit');
});

console.log('Before subscribe');
observable$.subscribe(value => console.log(value, 'received'));
console.log('After subscribe');