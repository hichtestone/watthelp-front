import {AbstractControl} from '@angular/forms';
import {environment} from '../../../environments/environment';

export class StrengthValidator {

  static isValid(abstractControl: AbstractControl): any {
    const password = abstractControl.value;

    if (!password) {
      return null;
    }

    const flags = [];
    const message = [];

    if (environment.user.password.min_length > 0) {
      const regLength = new RegExp('^.{' + environment.user.password.min_length + ',}$');
      const length = regLength.test(password);

      flags.push(length);
      message.push(environment.user.password.min_length + ' caractères');
    }

    if (environment.user.password.case_diff_required === true) {
      const regCaseDiff = new RegExp(/([a-z]+[A-Z]+)|([A-Z]+[a-z]+)/);
      const caseDiff = regCaseDiff.test(password);

      flags.push(caseDiff);
      message.push('une majuscule');
    }

    if (environment.user.password.number_required === true) {
      const regNumber = new RegExp('[0-9]+');
      const numbers = regNumber.test(password);

      flags.push(numbers);
      message.push('un chiffre');
    }

    if (environment.user.password.special_char_required === true) {
      const regSpecialChar = new RegExp('[^p{Ll}\p{Lu}\pL\pN]');
      const specialChar = regSpecialChar.test(password);

      flags.push(specialChar);
      message.push('un caractère spécial');
    }

    for (const flag of flags) {
      if (flag === false) {
        return {
          strength: 'Votre mot de passe doit contenir au moins ' + message.join(', ')
        };
      }
    }

    return null;
  }
}
