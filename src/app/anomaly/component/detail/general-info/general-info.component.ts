import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AnomalyInterface} from '../../../model/anomaly.interface';
import {enumToArray} from '../../../../core/enum/enum-converter';
import {AvailableStatusEnum} from '../../../model/available-status.enum';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {

  @Input()
  public anomaly: AnomalyInterface;
  @Input()
  form: FormGroup;

  @Input()
  formNote: FormGroup;

  @Output()
  patchStatus = new EventEmitter<void>();

  availableStatuses = enumToArray(AvailableStatusEnum);
  description = 'anomaly.list.no-applied-rules';
}
