import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forecast-consumption',
  templateUrl: './forecast-consumption.component.html',
  styleUrls: ['./forecast-consumption.component.scss']
})
export class ForecastConsumptionComponent {
  @Input() form: FormGroup;
  @Input() powerWarning = false;
  powerWarningMessage = 'Attention! la puissance installée dépasse la puissance souscrite de 25%';
}
