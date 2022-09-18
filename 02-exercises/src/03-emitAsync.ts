import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('1st value');
  subscriber.next('2nd value');
  setTimeout(() => subscriber.next('3rd value'), 2000);
});

console.log('Before subscribe');
observable$.subscribe(value => console.log(value, 'received'));
console.log('After subscribe');