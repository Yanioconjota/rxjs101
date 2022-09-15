import {
  name$,
  storeDataOnServer,
  storeDataOnServerError
} from './external';

name$.subscribe(value => console.log(value)); //--> Alice Ben Charlie

storeDataOnServer('Some value').subscribe(console.log); //--> Saved successfully: Some value

storeDataOnServerError('Some value').subscribe({
  next: value => console.log(value),
  error: err => console.log('Error when saving', err.message)
}); //--> Error when saving Failure!