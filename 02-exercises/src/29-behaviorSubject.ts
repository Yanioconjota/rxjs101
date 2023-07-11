import { BehaviorSubject, fromEvent, withLatestFrom } from "rxjs";

/* 
A BehaviorSubject is a type of Subject in RxJS that represents a value that changes over time. It retains the latest value emitted and emits it immediately to new subscribers upon subscription. When you create a BehaviorSubject, you provide an initial value that will be emitted to subscribers. After that, whenever a new value is emitted, it replaces the previous value and is emitted to all subscribers.

A BehaviorSubject has the following characteristics:

- It stores the current value and emits it to new subscribers upon subscription.
- When a new value is emitted, it replaces the previous value and is emitted to all subscribers.
- It guarantees that subscribers receive the most recent value, even if they subscribe after the value has been emitted.
- Subscribers receive the initial value upon subscription.
*/

const loggedInSpan: HTMLElement = document.querySelector("span#logged-in");
const loginButton: HTMLElement = document.querySelector("button#login");
const logoutButton: HTMLElement = document.querySelector("button#logout");
const printStateButton: HTMLElement =
  document.querySelector("button#print-state");

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, "click").subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, "click").subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
  (isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString())
);

// Buttons
isLoggedIn$.subscribe((isLoggedIn) => {
  logoutButton.style.display = isLoggedIn ? "block" : "none";
  loginButton.style.display = !isLoggedIn ? "block" : "none";
});

// fromEvent(printStateButton, "click").subscribe(() =>
//   console.log("User is logged in:", isLoggedIn$.value)
// );

/*
The withLatestFrom operator takes one or more Observables as arguments. It waits for the source Observable to emit a value, and then combines that value with the latest values from the other specified Observables. The resulting Observable will emit an array or tuple with the combined values. The withLatestFrom operator will only emit when the source Observable emits a value. It does not wait for all the other Observables to emit. It ensures that the latest values from all the specified Observables are available for combination whenever the source emits.
*/

fromEvent(printStateButton, "click")
  .pipe(withLatestFrom(isLoggedIn$))
  .subscribe(([event, isLoggedIn]) =>
    console.log("User is logged in:", isLoggedIn)
  );
