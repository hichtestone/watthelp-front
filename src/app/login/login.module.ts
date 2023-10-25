import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {LayoutComponent} from './component/layout/layout.component';
import {ForgotComponent} from './component/forgot/forgot.component';
import {ResetComponent} from './component/reset/reset.component';
import {CoreModule} from '../core/core.module';
import {LoginService} from './service/login.service';
import {MatCardModule} from '@angular/material/card';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent
  ],
  providers: [
    LoginService, {provide: TRANSLOCO_SCOPE, useValue: 'login', multi: true}
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    MatCardModule,
    TranslocoModule
  ]
})
export class LoginModule {
}
