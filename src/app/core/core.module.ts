import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CdkDetailRowDirective} from './table/directive/cdk-detail-row.directive';
import {TableNoResultComponent} from './table/components/no-result/table-no-result.component';
import {TableColumnDisplayComponent} from './table/components/column-display/table-column-display.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {getFrenchPaginatorIntl} from './i18n/french-paginator-intl';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {UriInterceptor} from './interceptor/uri.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {GetRequestInterceptor} from './interceptor/get-request.interceptor';
import {PostRequestInterceptor} from './interceptor/post-request.interceptor';
import {ActionButtonComponent} from './component/action-button/action-button.component';
import {HeaderComponent} from './component/header/header.component';
import {BreadcrumbComponent} from './component/breadcrumb/breadcrumb.component';
import {SplashScreenService} from './service/splash-screen.service';
import {DialogConfirmComponent} from './component/dialog-confirm/dialog-confirm.component';
import {InputGMapsAddressComponent} from './component/input-gmaps-address/input-gmaps-address.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {GenericListComponent} from './component/generic-list/generic-list.component';
import {GenericFilterBlockComponent} from './component/generic-filter-block/generic-filter-block.component';
import {MatCardModule} from '@angular/material/card';
import {FormBlockComponent} from './component/form-block/form-block.component';
import {ContainerComponent} from './component/container/container.component';
import {WidgetComponent} from './component/widget-generic/widget.component';
import {WidgetLabelComponent} from './component/widget-label/widget-label.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogInfoComponent} from './component/dialog-info/dialog-info.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {UploadComponent} from './component/upload-with-preview/upload.component';
import {FilePreviewComponent} from './component/upload-with-preview/file-preview/file-preview.component';
import {CarouselComponent} from './component/carousel/carousel.component';
import {CarouselDialogComponent} from './component/carousel/dialog/carousel-dialog.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {InvoicePdfComponent} from '../invoice/component/invoice-pdf/invoice-pdf.component';
import {UploadFileComponent} from './component/upload-file/upload-file.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {SaveFormComponent} from './component/dialog-save-search/save-form/save-form.component';
import {StatusComponent} from './component/status/status.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UploadDialogComponent} from './component/upload-perimeter/upload-dialog.component';
import {WidgetYearFilterComponent} from './component/widget-year-filter/widget-year-filter.component';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {MatDividerModule} from '@angular/material/divider';
import {InputChipNumberAccessorComponent} from './component/input-chip-number-accessor/input-chip-number-accessor.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {InputDayMonthComponent} from './component/input-day-month/input-day-month.component';
import {CalendarHeaderComponent} from './component/input-day-month/input-header/calendar-header.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CustomDateAdapterService} from './service/custom-date-adapter.service';
import {RouterLinkSecuredDirective} from './directive/router-link-secured.directive';
import {AuthorizedDirective} from './directive/authorized.directive';
import {TRANSLOCO_CONFIG, TRANSLOCO_SCOPE, translocoConfig, TranslocoModule} from '@ngneat/transloco';
import {environment} from '../../environments/environment';
import {httpLoader} from './service/translation.service';
import {ChartSwitcherComponent} from './component/widget-generic/chart-switcher/chart-switcher.component';
import {WidgetPeriodComponent} from './component/widget-period/widget-period.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    TableColumnDisplayComponent,
    TableNoResultComponent,
    CdkDetailRowDirective,
    HeaderComponent,
    BreadcrumbComponent,
    DialogConfirmComponent,
    GenericListComponent,
    GenericFilterBlockComponent,
    InputGMapsAddressComponent,
    FormBlockComponent,
    ContainerComponent,
    WidgetComponent,
    WidgetLabelComponent,
    DialogInfoComponent,
    UploadComponent,
    FilePreviewComponent,
    CarouselComponent,
    CarouselDialogComponent,
    InvoicePdfComponent,
    UploadFileComponent,
    SaveFormComponent,
    StatusComponent,
    UploadDialogComponent,
    WidgetYearFilterComponent,
    InputChipNumberAccessorComponent,
    InputDayMonthComponent,
    CalendarHeaderComponent,
    RouterLinkSecuredDirective,
    AuthorizedDirective,
    ChartSwitcherComponent,
    WidgetPeriodComponent
  ],
  providers: [
    SplashScreenService,
    CustomDateAdapterService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UriInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GetRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: PostRequestInterceptor, multi: true},
    {
      provide: MatPaginatorIntl,
      useValue: getFrenchPaginatorIntl(JSON.parse(localStorage.getItem('user'))?.language || 'fr')
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: environment.availableLangs,
        prodMode: environment.production,
        defaultLang: JSON.parse(localStorage.getItem('user'))?.language || 'fr'
      })
    },
    httpLoader,
    {provide: TRANSLOCO_SCOPE, useValue: 'core', multi: true}
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatGoogleMapsAutocompleteModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularResizedEventModule,
    MatCarouselModule,
    NgxExtendedPdfViewerModule,
    MatTooltipModule,
    MatSelectModule,
    MatNativeDateModule,
    DigitOnlyModule,
    MatDividerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    TranslocoModule,
  ],
  exports: [
    WidgetLabelComponent,
    ActionButtonComponent,
    DialogConfirmComponent,
    TableColumnDisplayComponent,
    TableNoResultComponent,
    CdkDetailRowDirective,
    HeaderComponent,
    BreadcrumbComponent,
    InputGMapsAddressComponent,
    GenericListComponent,
    GenericFilterBlockComponent,
    FormBlockComponent,
    ContainerComponent,
    WidgetComponent,
    DialogInfoComponent,
    UploadComponent,
    InvoicePdfComponent,
    UploadFileComponent,
    SaveFormComponent,
    StatusComponent,
    UploadDialogComponent,
    WidgetYearFilterComponent,
    InputChipNumberAccessorComponent,
    RouterLinkSecuredDirective,
    AuthorizedDirective,
    WidgetPeriodComponent
  ],
  entryComponents: [
    TableColumnDisplayComponent
  ]
})
export class CoreModule {
}
