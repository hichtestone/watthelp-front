import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarkerInterface} from '../model/marker.interface';

@Injectable({providedIn: 'root'})
export class MapService {

  constructor(private httpClient: HttpClient) {
  }

  getMarkers(): Observable<MarkerInterface[]> {
    return this.httpClient.get<MarkerInterface[]>('/delivery-point/map');
  }
}
