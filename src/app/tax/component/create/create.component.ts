import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {TaxService} from '../../service/tax.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DeltaDate} from '../../../core/validator/date.validator';
import {AclService} from '../../../core/service/acl.service';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent extends AbstractFormComponent implements OnInit {
  title = 'tax.breadcrumb.new';
  pattern = '[0-9]+([.][0-9]{1,5})?';
  ctaPattern = '[0-9]+([.][0-9]{1,2})?';

  form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected taxService: TaxService,
    protected snackbarService: SnackbarService,
    protected router: Router,
    protected aclService: AclService,
    protected translocoService: TranslocoService,
    protected route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        cspe: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
        tdcfe: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
        tccfe: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
        cta: ['', Validators.compose([Validators.required, Validators.pattern(this.ctaPattern)])],
        started_at: ['', Validators.required],
        finished_at: ['', Validators.required]
      },
      {
        validators: DeltaDate('started_at', 'finished_at')
      });
  }

  public submit(): void {
    this.taxService.post(this.prepareDataToSubmit(this.form.getRawValue())).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('tax.created-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.handleFormError(error));
  }

  prepareDataToSubmit(values): any {
    const coefficient = 100000;
    return {
      cspe: this.parseValueToInt(values.cspe, coefficient),
      tdcfe: this.parseValueToInt(values.tdcfe, coefficient),
      tccfe: this.parseValueToInt(values.tccfe, coefficient),
      cta: this.parseValueToInt(values.cta, 100),
      started_at: values.started_at ? moment(values.started_at).format('YYYY-MM-DD') : null,
      finished_at: values.finished_at ? moment(values.finished_at).format('YYYY-MM-DD') : null
    };
  }
}
