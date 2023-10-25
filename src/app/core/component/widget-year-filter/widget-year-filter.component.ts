import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {StorageService} from '../../service/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeliveryPointsComponent} from '../../../invoice/widget/consumption-stats/dialog-delivery-points/dialog-delivery-points.component';
import {DeltaDate} from '../../validator/date.validator';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-widget-filter-shared',
  templateUrl: './widget-year-filter.component.html',
  styleUrls: ['./widget-year-filter.component.scss']
})
export class WidgetYearFilterComponent implements OnInit {
  form: FormGroup;
  widgetName: string;
  size = 4;

  @Output() valueChange = new EventEmitter<any>();
  @Output() dpFilterEvent = new EventEmitter<any>();

  deliveryPointIds = [];
  dpLabel = 'Cliquez pour sélectionner des points de livraison';
  dpButtonLabel = 'Choisir des points de livraison';
  chartTypeChanged = true;
  chartByYearOrMonthChanged = true;
  settings: any;
  dpLength: number;

  @Input() moduleName: string;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private translocoService: TranslocoService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
        label: '',
        year: [moment().year(), Validators.pattern('^[0-9]{4}$')]
      },
      {
        validators: [DeltaDate('period_from', 'period_at'), DeltaDate('started_at', 'finished_at')]
      });
  }

  @Input()
  set config(config: any) {
    this.settings = config;
  }

  ngOnInit(): void {
    this.buildForm();
    this.form.patchValue(this.settings);
    this.chartTypeChanged = this.settings.switch_chart;
    this.chartByYearOrMonthChanged = this.settings.switch_by_year_month;

    this.populateDialogLabels(this.settings);

    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this, 'destroy'))
      .subscribe(() => {

        // Health check on the form (date validators) before submitting the event
        if (this.form.valid) {
          this.valueChange.emit(this.form.value);
        }
      });
  }

  buildForm(): void {
    if (!!this.moduleName) {
      this.widgetName = this.moduleName;
      const consumedChartColor = this.storageService.getItem('consumed_chart_color');
      const expectedChartColor = this.storageService.getItem('expected_chart_color');
      const forecastChartColor = this.storageService.getItem('forecast_chart_color');

      switch (this.moduleName) {
        case 'budget':
          this.form.addControl('consumed_chart_color', new FormControl(consumedChartColor ? consumedChartColor : '#000000'));
          this.form.addControl('expected_chart_color', new FormControl(expectedChartColor ? expectedChartColor : '#3d8cd6'));
          this.form.addControl('forecast_chart_color', new FormControl(forecastChartColor ? forecastChartColor : '#689f38'));
          break;

        case 'consumption':
          this.form.addControl('years', new FormControl());
          this.form.addControl('dp_length', new FormControl());
          this.form.addControl('switch_chart', new FormControl());
          this.form.addControl('switch_by_year_month', new FormControl());
          this.form.addControl('period_from', new FormControl());
          this.form.addControl('period_at', new FormControl());

          // The following control not part of consumption controls
          this.form.removeControl('year');
          break;

        case 'budget-comparison':
          this.form.addControl('dp_length', new FormControl());
          this.form.addControl('switch_chart', new FormControl());
          this.form.addControl('switch_by_year_month', new FormControl());
          this.form.addControl('started_at', new FormControl('', Validators.required));
          this.form.addControl('finished_at', new FormControl('', Validators.required));

          // The following control not part of consumption controls
          this.form.removeControl('year');
          break;

        default:
          // Will only leave the default controls declared in constructor
          this.form.removeControl('consumed_chart_color');
          this.form.removeControl('expected_chart_color');
          this.form.removeControl('forecast_chart_color');
          this.form.removeControl('years');
          this.form.removeControl('switch_chart');
          this.form.removeControl('switch_by_year_month');
          this.form.removeControl('period_from');
          this.form.removeControl('period_at');
          this.form.removeControl('started_at');
          this.form.removeControl('finished_at');
          break;
      }
    }
  }

  destroy(): void {
  }

  openDialogSelection(): void {
    const dialogRef = this.dialog.open(DialogDeliveryPointsComponent, {
      minWidth: '80vw',
      minHeight: '80vh',
      data: {
        title: this.translocoService.translate('core.widget.select-delivery-point'),
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (!!data) {
          this.dpFilterEvent.emit(data);
          this.deliveryPointIds = data.delivery_point_filters.ids;

          this.dpLabel = !!this.deliveryPointIds
            ? `Vous avez sélectionné ${this.deliveryPointIds.length} point(s) de livraison`
            : (data.total > 0 ? `Vous avez sélectionné ${data.total} point(s) de livraison` : 'Sélectionner des points de livraison');

          this.dpButtonLabel = !!this.deliveryPointIds ? 'Re-sélectionner à nouveau' : 'Choisir des points de livraison';

          this.form.controls.dp_length.patchValue(this.deliveryPointIds ? this.deliveryPointIds.length : (data.total > 0 ? data.total : 0));
        }
      }
    );
  }

  populateDialogLabels(values: any): void {
    if (!!values.dp_length) {
      this.dpLength = values.dp_length;
      this.dpLabel = `Vous avez sélectionné ${this.dpLength} point(s) de livraison`;
      this.dpButtonLabel = 'Re-sélectionner à nouveau';
    }
  }
}
