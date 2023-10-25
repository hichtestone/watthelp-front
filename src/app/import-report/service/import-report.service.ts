import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {ImportReportInterface} from '../model/import-report.interface';

@Injectable({
  providedIn: 'root'
})
export class ImportReportService extends HttpService<ImportReportInterface> {
  path = '/import-report';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
