import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventData = new BehaviorSubject<any>({});
  eventData$ = this.eventData.asObservable();

  setEventData(data: any) {
    this.eventData.next(data);
  }

  getEventData() {
    return this.eventData.value;
  }
}
