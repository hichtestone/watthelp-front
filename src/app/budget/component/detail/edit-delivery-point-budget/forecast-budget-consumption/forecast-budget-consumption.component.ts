import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forecast-budget-consumption',
  templateUrl: './forecast-budget-consumption.component.html',
  styleUrls: ['./forecast-budget-consumption.component.scss']
})
export class ForecastBudgetConsumptionComponent {
  @Input() form: FormGroup;
  @Input() newPowerWarning = false;
  @Input() year: number;
  powerWarningMessage = 'Attention! la puissance installée dépasse la puissance souscrite de 25%';
}
