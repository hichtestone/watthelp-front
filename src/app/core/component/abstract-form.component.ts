import {FormGroup} from '@angular/forms';

export class AbstractFormComponent {
  form: FormGroup;

  protected handleFormError(error): void {
    for (const field in error) {
      if (error.hasOwnProperty(field) && this.form.controls.hasOwnProperty(field)) {
        this.form.controls[field].markAsTouched({onlySelf: true});
        this.form.controls[field].setErrors({api: error[field]});
      }
    }
  }

  protected handleModalError(error): string {
    let result: string;

    for (const field in error) {
      if (error.hasOwnProperty(field)) {
        result = typeof error === 'object' ? error[field] : error;
      }
    }
    return result;
  }

  protected parseValueToInt(value, constant: number): number {
    return parseInt((Math.round(parseFloat(value) * constant)).toString(), 10);
  }

  protected parseValueToString(value, constant: number): string {
    const noParsedResult = (value / constant).toFixed(2).toString();
    const parseResult = (parseInt(value, 10) / constant).toFixed(2).toString();

    return typeof value === 'number' ? noParsedResult : parseResult;
  }
}
