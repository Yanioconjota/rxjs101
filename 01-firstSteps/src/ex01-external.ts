import { Observable, of } from "rxjs";

export const name$ = of('Alice', 'Ben', 'Charlie');

export function storeDataOnServer(data: string): Observable<string> {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next(`Saved successfully: ${data}`);
      subscriber.complete();
    }, 1500);
  });
}

export function storeDataOnServerError(data: string): Observable<string> {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.error(new Error('Failure!'));
    }, 1500);
  });
}

//Observable declared, if you inmediatle subscribe to it you won't be able to see it's data, only a console.log
export const observable$ = new Observable<string>(subscriber => {
  console.log('observable$ executed');
  subscriber.next('Peter Parker');
  setTimeout(() => {
    subscriber.next('James Howlett');
  }, 500);
  setTimeout(() => {
    subscriber.next('Ororo Monroe');
  }, 1500);
});

//Observable data handler, or just the observer, it will handle the next/error/complete notifications from the Observable, it is passed as an argument to the subscription.
export const observer = {
  next: (value: unknown) => console.log(value)
}

//Observable subscription
export const observableSubscription = () => {
  observable$.subscribe(observer);
}

//Observable subscription shorthand version, it will subscribe automatically to the next notification
export const observableSubsShortHand = () => {
  observable$.subscribe(value => console.log(value));
}

export const observableUnsubscribe = () => {
  const subscription = observable$.subscribe(value => console.log(value));
  setTimeout(() => {
    console.log('unsubscribe');
    subscription.unsubscribe();
  }, 1250);
}