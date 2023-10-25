import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {ImportReportResolver} from './component/detail/detail.resolver';
import {DetailComponent} from './component/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    resolve: {
      importReport: ImportReportResolver
    },
    component: DetailComponent,
    data: {
      breadcrumb: 'import.breadcrumb.detail'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ImportReportRoutingModule {
}
