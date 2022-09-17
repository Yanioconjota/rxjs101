import {
  name$,
  storeDataOnServer,
  storeDataOnServerError,
  observableSubscription,
  observableSubsShortHand,
  observableUnsubscribe
} from './ex01-external';

name$.subscribe(value => console.log(value)); //--> Alice Ben Charlie

storeDataOnServer('Some value').subscribe(console.log); //--> Saved successfully: Some value

storeDataOnServerError('Some value').subscribe({
  next: value => console.log(value),
  error: err => console.log('Error when saving', err.message)
}); //--> Error when saving Failure!

observableSubscription(); //--> observable$ executed, Peter Parker, James Howlett, Ororo Monroe

observableSubsShortHand(); //--> observable$ executed, Peter Parker, James Howlett, Ororo Monroe

observableUnsubscribe(); //--> observable$ executed, Peter Parker, James Howlett, unsubscribe