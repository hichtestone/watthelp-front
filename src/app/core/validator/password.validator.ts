import {FormGroup, ValidationErrors} from '@angular/forms';

export class PasswordValidator {

  static MatchPassword(required: boolean = true): any {
    return (form: FormGroup) => {
      const password = form.get('password').value;
      const confirmPassword = form.get('password_confirm').value;

      if (!password && !confirmPassword) {
        if (!required) {
          form.get('password').setErrors(null);
          form.get('password_confirm').setErrors(null);
        }
        return null;
      }

      if (password !== confirmPassword) {
        const error: ValidationErrors = {confirmation: 'La confirmation et le mot de passe ne sont pas identique.'};
        form.get('password_confirm').setErrors(error);
      } else {
        return null;
      }
    };
  }

}
