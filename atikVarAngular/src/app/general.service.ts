import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  itemValue = new BehaviorSubject(this.theItem);
  set theItem(value) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('isLogged', value);
  }

  get theItem() {
    return localStorage.getItem('isLogged');
  }
 
}
