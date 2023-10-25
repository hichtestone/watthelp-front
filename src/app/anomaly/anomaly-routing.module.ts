import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {AnomalyEditResolver} from './component/detail/edit.resolver';
import {DetailComponent} from './component/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailComponent,
    resolve: {
      anomaly: AnomalyEditResolver
    },
    data: {
      breadcrumb: 'anomaly.breadcrumb.detail'
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
export class AnomalyRoutingModule {
}
