import { Observable } from "rxjs";

/*
Hot Observables:
Yes, it is that easy. An Observable is cold when data is produced inside the Observable and the Observable is hot when the data is produced outside the Observable. As we just saw the hot Observable is able to share data between multiple subscribers. We call this behaviour “multicasting”. Generating a random number is not a good real life usecase. A good usecase would be DOM events. Let’s say we’re tracking clicking behaviour and have multiple subscribers do something with the coordinates
*/

const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<any>(subscriber => {
  helloButton.addEventListener('click', (e: Event) => {
    subscriber.next(e);
  });
});

helloClick$.subscribe((event: any) => {
  console.log('sub 1', event.target, event.type, event.x, event.y);
});

helloClick$.subscribe((event: any) => {
  console.log('sub 2', event.target, event.type, event.x, event.y);
});

setTimeout(() => {
  //Once 3000ms have passed we subscribe to the event, resulting in 3 simultaneous subscriptions
  console.log('Subscription 3 starts');
  helloClick$.subscribe((event: any) => {
  console.log('sub 3', event.target, event.type, event.x, event.y);
});
}, 3000);