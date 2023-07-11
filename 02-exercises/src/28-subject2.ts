import { Subject, fromEvent } from "rxjs";

/* 
Subject: A Subject is a type of Observable in RxJS that allows both subscribing to and emitting values. It acts as a bridge or proxy between the Observable and Observer, making it possible to multicast values to multiple subscribers. A Subject can be thought of as a combination of an Observable and an Observer, which means that it can emit values such as next, error and complete notifications, and multiple subscribers can receive those values.
*/

const loggedInSpan: HTMLElement = document.querySelector("span#logged-in");
const loginButton: HTMLElement = document.querySelector("button#login");
const logoutButton: HTMLElement = document.querySelector("button#logout");
const printStateButton: HTMLElement =
  document.querySelector("button#print-state");

const isLoggedIn$ = new Subject<boolean>();

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
