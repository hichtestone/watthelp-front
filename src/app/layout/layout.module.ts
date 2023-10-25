import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './component/layout/layout.component';
import {TitleService} from './shared/title.service';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './component/menu/menu.component';
import {UserToolbarMenuComponent} from './component/user-toolbar-menu/user-toolbar-menu.component';
import {CoreModule} from '../core/core.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {SettingsComponent} from './component/settings/settings.component';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {NavBarNotificationComponent} from '../notification/component/nav-bar-notification/nav-bar-notification.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MomentModule} from 'ngx-moment';
import {NotificationModule} from "../notification/notification.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LanguageComponent} from './component/language/language.component';
import {MatSelectModule} from "@angular/material/select";
import {LanguagePipePipe} from './pipe/language-pipe.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MatBadgeModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatRippleModule,
    MatProgressBarModule,
    MomentModule,
    NotificationModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  exports: [
    MatSidenavModule,
  ],
  declarations: [
    LayoutComponent,
    SettingsComponent,
    MenuComponent,
    UserToolbarMenuComponent,
    NavBarNotificationComponent,
    LanguageComponent,
    LanguagePipePipe
  ],
  providers: [
    TitleService,
    {provide: TRANSLOCO_SCOPE, useValue: 'layout', multi: true}
  ],
})
export class LayoutModule {
}
