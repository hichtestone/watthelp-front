import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapRoutingModule} from './map-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../environments/environment.prod';
import {ViewComponent} from './component/view/view.component';
import {MapComponent} from './component/view/map/map.component';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {InfoWindowsComponent} from './component/info-windows/info-windows.component';
import {CoreModule} from '../core/core.module';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MapWidgetComponent} from './component/widget/map-widget.component';
import {WindowInfoComponent} from './component/widget/window-info/window-info.component';
import {FilterComponent} from './component/widget/filter/filter.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.places_api_key
    }),
    AgmSnazzyInfoWindowModule,
    CoreModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    TranslocoModule
  ],
  declarations: [
    ViewComponent,
    MapComponent,
    InfoWindowsComponent,
    MapWidgetComponent,
    WindowInfoComponent,
    FilterComponent
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'map', multi: true}]
})
export class MapModule {
}
