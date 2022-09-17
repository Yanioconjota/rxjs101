import { Observable } from "rxjs";

export const observable$ = new Observable<string>(subscriber => {
  console.log('observable$ executed');
});