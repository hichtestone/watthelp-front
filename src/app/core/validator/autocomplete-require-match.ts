import {AbstractControl} from '@angular/forms';

export class AutocompleteRequireMatch {

  static match(abstractControl: AbstractControl): any {
    const selection: any = abstractControl.value;
    if (!!selection && typeof selection === 'string') {
      return {incorrect: true};
    }

    return null;
  }
}
