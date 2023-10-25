import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FRENCH_DATE_FORMATS} from './core/i18n/french-date-formats';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {HighchartsChartModule} from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    CoreModule,
    LayoutModule,
    AgmCoreModule.forRoot({apiKey: environment.places_api_key, libraries: ['places']}),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: MAT_DATE_FORMATS, useValue: FRENCH_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
