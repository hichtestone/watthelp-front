import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {CreateComponent} from './component/create/create.component';
import {ContractEditResolver} from './component/edit/edit.resolver';
import {EditComponent} from './component/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'contract.breadcrumb.contract-creation'
    }
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      contract: ContractEditResolver
    },
    data: {
      breadcrumb: 'contract.breadcrumb.contract-edition'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContractRoutingModule {
}
