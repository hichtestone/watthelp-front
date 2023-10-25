import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {ViewComponent} from './component/view/view.component';
import {ViewResolver} from './component/view/view.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: ViewComponent,
    resolve: {
      reportAnalysis: ViewResolver
    },
    data: {
      breadcrumb: 'report.breadcrumb.detail'
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
export class ReportRoutingModule {
}
