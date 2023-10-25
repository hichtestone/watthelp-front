import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DashboardModel} from '../model/dashboard.model';
import {StorageService} from '../../core/service/storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
  }

  loadUserDashboard(): DashboardModel {
    const connectedUserDashboard = this.storageService.getItem('dashboard');
    if (!!connectedUserDashboard) {
      const obj = JSON.parse(this.storageService.getItem('dashboard'));
      return new DashboardModel(obj);
    }
    return new DashboardModel();
  }

  saveUserDashboard(dashboard: DashboardModel): Observable<any> {
    const toSend = {widgets: []};
    dashboard.widgets.forEach(item => {
      const widget = {...item};
      delete widget.instance;
      delete widget.editable;
      delete widget.isLoading;
      delete widget.isEditing;
      toSend.widgets.push(widget);
    });
    const dashboardValue = JSON.stringify(toSend);
    this.storageService.setItem('dashboard', dashboardValue);
    return this.httpClient.patch(
      '/user/me',
      [{op: 'replace', path: '/dashboard', value: {dashboardValue}}]
    );
  }
}
