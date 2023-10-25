import {FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function YearComparison(dateControlName: string, year: number): any {
  return (formGroup: FormGroup) => {

    if (year && formGroup.controls && formGroup.controls[dateControlName]) {
      const dateControl = formGroup.controls[dateControlName];

      if (moment(dateControl.value).year() !== year) {
        dateControl.setErrors({differentYear: true});
      }
    }
  };
}
