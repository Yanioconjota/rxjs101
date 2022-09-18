import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next('1st value');
  subscriber.next('2nd value');
  setTimeout(() => {
    subscriber.next('3rd value');
    subscriber.complete();
  }, 2000);

  //indicates observable teardown phase
  //is the place to provide the logic for the clean up or cancelation
  return () => console.log('Teardown');
});

console.log('Before subscribe');
observable$.subscribe({
  next: value => console.log(value, 'received'),
  complete: () => console.log('subscription complete')

});
console.log('After subscribe');