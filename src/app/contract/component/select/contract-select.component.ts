import {Component, ElementRef, forwardRef, Injector} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {Paginator} from '../../../core/model/paginator.model';
import {take} from 'rxjs/operators';
import {MatFormFieldControl} from '@angular/material/form-field';
import {ContractInterface} from '../../model/contract.interface';
import {AbstractAutocompleteDirective} from '../../../core/component/mat-form-field/autocomplete/abstract-autocomplete.directive';
import {ContractService} from '../../service/contract.service';

@Component({
  selector: 'app-contract-select',
  templateUrl: '../../../core/component/mat-form-field/autocomplete/abstract-autocomplete.directive.html',
  styleUrls: ['../../../core/component/mat-form-field/autocomplete/abstract-autocomplete.directive.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContractSelectComponent),
      multi: true
    },
    {
      provide: MatFormFieldControl,
      useExisting: ContractSelectComponent
    }
  ]
})
export class ContractSelectComponent extends AbstractAutocompleteDirective<ContractInterface> {
  controlType = 'contract-autocomplete';
  searchedColumn = 'reference';

  constructor(
    protected service: ContractService,
    protected elRef: ElementRef,
    protected injector: Injector,
    protected fm: FocusMonitor) {
    super(elRef, injector, fm);
  }

  displayName(value): string {
    if (value) {
      return value.reference;
    }
  }

  /**
   * Search data for autocomplete select
   */
  search(reference?: string): void {
    const filters: { [k: string]: any } = {...this.filters, reference};

    this.service.list({filters, sort: this.searchedColumn, sort_order: 'asc'})
      .pipe(take(1))
      .subscribe((paginator: Paginator<ContractInterface>) => {
        this.data = paginator.data;
      });
  }
}
