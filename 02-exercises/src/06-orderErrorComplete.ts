import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('1st value');
  subscriber.next('2nd value');
  setTimeout(() => subscriber.error(new Error('Failure --> 3rd notification and complete bypassed by error')), 2000);
  setTimeout(() => {
    subscriber.next('3rd value');
    subscriber.complete();
  }, 4000);

  //indicates observable teardown phase
  //is the place to provide the logic for the clean up or cancelation
  return () => console.log('Teardown');
});

console.log('Before subscribe');
observable$.subscribe({
  next: value => console.log(value, 'received'),
  error: (err) => console.log(err.message),
  complete: () => console.log('Success!')
});
console.log('After subscribe');