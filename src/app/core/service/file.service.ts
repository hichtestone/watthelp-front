import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileInterface} from '../model/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClient: HttpClient) {
  }

  public upload(formData: FormData): Observable<any> {
    return this.httpClient.post<FileInterface>('/file', formData);
  }
}
