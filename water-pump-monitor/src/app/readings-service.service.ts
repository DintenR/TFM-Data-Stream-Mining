import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReadingsServiceService {

  eventEmiter = new EventEmitter();
  constructor() { }
}
