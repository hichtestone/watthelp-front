import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BudgetInterface} from '../../../model/budget.interface';
import {AbstractFormComponent} from '../../../../core/component/abstract-form.component';

@Component({
  selector: 'app-previous-budget',
  templateUrl: './previous-budget.component.html',
  styleUrls: ['./previous-budget.component.scss']
})
export class PreviousBudgetComponent extends AbstractFormComponent {
  form: FormGroup;
  previousBudgetData: BudgetInterface;

  constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      year: {value: '', disabled: true},
      calculated_quantity: {value: '', disabled: true},
      calculated_amount: {value: '', disabled: true},
      total_consumption: {value: '', disabled: true},
      total_amount: {value: '', disabled: true}
    });
  }

  @Input() set previousBudget(previousBudget: BudgetInterface) {
    if (!!previousBudget) {
      this.previousBudgetData = previousBudget;
      this.form.patchValue(this.prepareDataToPatch(this.previousBudgetData));
    }
  }

  prepareDataToPatch(values: any): any {
    return {
      ...values,
      calculated_amount: (values.calculated_amount / 10 ** 7).toFixed(2) || null,
      total_consumption: (values.total_consumption / 100).toFixed(2) || null,
      total_amount: (values.total_amount / 10 ** 7).toFixed(2) || null,
    };
  }
}
