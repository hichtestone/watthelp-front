import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chart-switcher',
  templateUrl: './chart-switcher.component.html',
  styleUrls: ['./chart-switcher.component.scss']
})
export class ChartSwitcherComponent {
  @Input() chartType = true;
  @Input() chartByYearMonth = true;
  @Output() chartTypeChange = new EventEmitter();
  @Output() chartByYearMonthChange = new EventEmitter();
  @Input() form: FormGroup;
  @Input() widgetName: string;

  onChartTypeChange(): void {
    this.chartType = !this.chartType;
    this.form.controls.switch_chart.patchValue(this.chartType);
    this.chartTypeChange.emit(this.chartType);
  }

  onChartByYearMonthChange(): void {
    this.chartByYearMonth = !this.chartByYearMonth;
    this.form.controls.switch_by_year_month.patchValue(this.chartByYearMonth);
    this.chartByYearMonthChange.emit(this.chartByYearMonth);
  }
}
