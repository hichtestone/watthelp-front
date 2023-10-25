import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {finalize, take} from 'rxjs/operators';
import {Location} from '@angular/common';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';

@Component({
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent extends AbstractFormComponent implements OnInit {
  isSuccess: boolean;
  isLoading = false;

  constructor(
    private authenticationService: LoginService,
    private fb: FormBuilder,
    private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      captcha: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.isLoading = true;
    this.isSuccess = false;

    this.authenticationService.forgotPassword(this.form.value)
      .pipe(take(1), finalize(() => this.isLoading = false))
      .subscribe(
        () => {
          this.isSuccess = true;
        }, (error) => {
          // Handle case of user is Ban and we received an error message.
          if (typeof error === 'string') {
            this.form.controls.email.setErrors({api: error});
          } else {
            this.handleFormError(error);
          }
        });
  }

  back(): void {
    this.location.back();
  }
}
