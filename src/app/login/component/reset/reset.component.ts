import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {StrengthValidator} from '../../../core/validator/strength.validator';
import {PasswordValidator} from '../../../core/validator/password.validator';
import * as moment from 'moment';
import {finalize, take} from 'rxjs/operators';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {AuthenticationService} from '../../../core/service/authentication.service';

@Component({
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent extends AbstractFormComponent implements OnInit {
  form: FormGroup;
  error: string;
  isLoading = false;

  token: string;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private authenticationService: AuthenticationService,
  ) {
    super();
  }

  ngOnInit(): void {
    // Must disconnect the user if the user accesses this page
    this.authenticationService.logout();

    this.form = this.fb.group({
      password: ['', Validators.compose([Validators.required, StrengthValidator.isValid])],
      confirm_password: ['', Validators.compose([Validators.required])],
    }, {
      validators: [
        PasswordValidator.MatchPassword
      ]
    });

    this.route.queryParamMap.subscribe(data => {
      this.token = data.get('payload');

      try {
        const decodedToken = JSON.parse(atob(this.token));
        if (!decodedToken.hasOwnProperty('exp')) {
          this.error = 'Il semblerait que votre lien ne soit pas valide. Merci de bien vouloir renouveller votre demande de mot de ' +
            'passe oublié ou de contacter votre administrateur.';
        }
        const expiration = moment(decodedToken.exp);
        if (!expiration.isAfter()) {
          this.error = 'Il semblerait que votre lien soit expiré. Merci de bien vouloir renouveller votre demande de mot de passe oublié.';
          this.form.disable();
        }
      } catch (e) {
        this.error = 'Impossible de lire votre lien. Merci de contacter votre administrateur.';
      }

    });
  }

  submit(): void {
    this.isLoading = true;

    const values = this.form.value;

    const data = {
      password: values.password,
      payload: this.token
    };

    this.loginService.resetPassword(data)
      .pipe(take(1), finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.snackbarService.addMessage('Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter sur votre compte.');
        this.router.navigate(['/login']);
      }, (error) => {
        this.handleFormError(error);

        // Handle case where an error append in payload
        if (error.hasOwnProperty('payload')) {
          this.error = error.payload;
        }
      });
  }
}
