import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {WidgetConfigInterface} from '../../../../dashboard/model/widget.config.interface';
import {EditableInterface} from '../../../../dashboard/model/editable.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import {take, takeUntil} from 'rxjs/operators';
import {AnomalyService} from "../../../service/anomaly-service";

@Component({
  selector: 'app-alert-stat',
  templateUrl: './alert-stat.component.html',
  styleUrls: ['./alert-stat.component.scss']
})
export class AlertStatComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.alert-by-type',
    group: 'dashboard.modal-group.alert',
    preview: '/assets/dashboard/alerts-type.png',
    options: {cols: 6, rows: 4, minItemRows: 3, minItemCols: 4}
  };

  chart: Chart;
  flipped = false;
  settings: any = {
    label: 'Alertes',
  };

  constructor(private anomalyService: AnomalyService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.configChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => this.filter());
  }

  ngAfterViewInit(): void {
    this.filter();
  }

  filter(): void {
    this.isLoading = true;

    this.anomalyService.getAnomaliesStats().pipe(take(1)).subscribe(data => {
      let values = [];

      values = [
        {
          name: 'Résolue(s)',
          y: +data?.stat_solved
        },
        {
          name: 'En cours de traitement',
          y: +data?.stat_processing
        },
        {
          name: 'Ignorée(s)',
          y: +data?.stat_ignored
        },
        {
          name: 'Non résolue(s)',
          y: +data?.stat_unsolved
        }];

      this.displayChart(values);
      this.isLoading = false;
    });
  }

  resize($event): void {
    if (!!this.chart) {
      this.chart.reflow();
    }
  }

  displayChart(values): void {
    this.chart = Highcharts.chart(this.id, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '',
        style: {display: 'none'}
      },
      tooltip: {
        pointFormat: 'Pourcentage: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          size: '70%',
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Alertes',
        colorByPoint: true,
        type: 'pie',
        data: values
      }]
    });
  }

  filterChange(formValue): void {
    this.settings = formValue;
  }

  edit(edit: boolean): void {
    this.flipped = edit;
    if (!edit) {
      this.configChange.emit(this.settings);
    }
  }
}
