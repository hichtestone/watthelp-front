import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {finalize, take} from 'rxjs/operators';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {StorageService} from '../../../core/service/storage.service';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  errorMessage: string;

  redirectPath = '/';

  constructor(
    private authenticationService: AuthenticationService,
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    super();
  }

  ngOnInit(): void {
    this.redirectPath = this.route.snapshot.queryParams.returnUrl || this.redirectPath;

    // Redirect if user is already loggedIn
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([this.redirectPath]);
    }

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.login(this.form.value, 'client_logo, user_permission_codes')
      .pipe(take(1), finalize(() => this.isLoading = false))
      .subscribe(
        (response) => {
          this.translocoService.setActiveLang(response.language);
          this.isLoading = false;

          if (!!response && !!response.dashboard) {
            this.storageService.setItem('dashboard', response.dashboard.dashboardValue);

          } else {
            this.storageService.removeItem('dashboard');
          }

          this.router.navigate([this.redirectPath]);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error;
          this.handleFormError(error);
        });
  }
}
