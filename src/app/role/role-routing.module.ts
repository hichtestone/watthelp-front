import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './component/create/create.component';
import {ListComponent} from './component/list/list.component';
import {EditResolver} from './component/edit/edit.resolver';
import {EditComponent} from './component/edit/edit.component';
import {DuplicateComponent} from './component/duplicate/duplicate.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'role.breadcrumb.create'
    }
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      role: EditResolver
    },
    data: {
      breadcrumb: 'role.breadcrumb.edit'
    }
  },
  {
    path: 'duplicate/:id',
    component: DuplicateComponent,
    resolve: {
      role: EditResolver
    },
    data: {
      breadcrumb: 'role.breadcrumb.duplicate'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}
