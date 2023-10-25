import {FormGroup, ValidationErrors} from '@angular/forms';

export class OneRequiredValidator {

  static required(firstField: string, secondField: string): any {
    return (control: FormGroup) => {
      const field1 = control.get(firstField);
      const field2 = control.get(secondField);

      if (!field2.touched && !field1.touched) {
        return;
      }

      let phoneErrors: ValidationErrors;
      let mobileErrors: ValidationErrors;

      // If we have at least one field non empty we have to delete oneRequired error without removing other possible errors
      if (!!field1.value || !!field2.value) {
        // Remove error
        if (field1.hasError('oneRequired')) {
          delete field1.errors.oneRequired;
        }
        if (field2.hasError('oneRequired')) {
          delete field2.errors.oneRequired;
        }
        if (field1.hasError('api')) {
          delete field1.errors.api;
        }
        if (field2.hasError('api')) {
          delete field2.errors.api;
        }

        phoneErrors = field1.errors;
        mobileErrors = field2.errors;
      } else {
        phoneErrors = mobileErrors = {oneRequired: true};
      }

      field1.setErrors(!OneRequiredValidator.isEmptyObject(phoneErrors) ? phoneErrors : null);
      field1.markAsTouched({onlySelf: true});

      field2.setErrors(!OneRequiredValidator.isEmptyObject(mobileErrors) ? mobileErrors : null);
      field2.markAsTouched({onlySelf: true});
    };
  }

  static isEmptyObject(obj): boolean {
    if (!!obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    return true;
  }
}
