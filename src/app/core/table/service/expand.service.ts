import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpandService {

  currentExpanded: any;
  currentExpandedChange: Subject<any> = new Subject<any>();

  currentExpandedEvent(): Observable<string> {
    return this.currentExpandedChange.asObservable();
  }

  setCurrentExpanded(row): void {
    this.currentExpanded = row;
    this.currentExpandedChange.next(row);
  }
}
