import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {CreateComponent} from './component/create/create.component';
import {UpdateComponent} from './component/edit/update.component';
import {UserEditResolver} from './component/edit/edit.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'user.breadcrumb.create'
    }
  },
  {
    path: ':id',
    component: UpdateComponent,
    resolve: {
      user: UserEditResolver
    },
    data: {
      breadcrumb: 'user.breadcrumb.edit'
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
export class UserRoutingModule {
}
