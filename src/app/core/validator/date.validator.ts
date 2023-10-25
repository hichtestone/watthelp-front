import {FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function DeltaDate(startDateControlName: string, endDateControlName: string): any {
  return (formGroup: FormGroup) => {
    const startControl = formGroup.controls[startDateControlName];
    const endControl = formGroup.controls[endDateControlName];

    if (!startControl || !endControl) {
      return;
    }

    if (!startControl.value || !endControl.value) {
      return;
    }

    if (!!moment(startControl.value).isAfter(endControl.value)) {
      endControl.setErrors({unauthorizedDate: true});
    }
  };
}
