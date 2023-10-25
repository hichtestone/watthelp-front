import {NgModule} from '@angular/core';
import {UserSelectChipComponent} from './component/select-chip/user-select-chip.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserSelectComponent} from './component/select/user-select.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    UserSelectChipComponent,
    UserSelectComponent,
  ],
  exports: [
    UserSelectChipComponent,
    UserSelectComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule
  ]
})
export class UserSharedModule {
}
