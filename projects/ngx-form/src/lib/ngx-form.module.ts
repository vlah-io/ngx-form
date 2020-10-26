import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDomCellModule} from '@vlah.io/ngx-dom-cell';
import {NgxLoadingModule} from '@vlah.io/ngx-loading';
import {DateInputComponent} from './component/date-input.component';
import {FakeInputComponent} from './component/fake-input.component';
import {PasswordInputComponent} from './component/password-input.component';
import {SelectBoxComponent} from './component/select-box.component';
import {CurrencyInputDirective} from './directive/currency-input.directive';
import {NumericInputDirective} from './directive/numeric-input.directive';
import {PercentageInputDirective} from './directive/percentage-input.directive';
import {SelectOnFocusDirective} from './directive/select-on-focus.directive';
import {TextareaAutosizeDirective} from './directive/textarea-autosize.directive';
import {WrapBootstrapDirective} from './directive/wrap-bootstrap.directive';
import {PasswordStrengthMeterModule} from 'angular-password-strength-meter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    PasswordStrengthMeterModule,
    TranslateModule,
    NgxDomCellModule,
    NgxLoadingModule
  ],
  declarations: [
    DateInputComponent,
    FakeInputComponent,
    PasswordInputComponent,
    SelectBoxComponent,
    CurrencyInputDirective,
    NumericInputDirective,
    PercentageInputDirective,
    SelectOnFocusDirective,
    TextareaAutosizeDirective,
    WrapBootstrapDirective
  ],
  exports: [
    DateInputComponent,
    FakeInputComponent,
    PasswordInputComponent,
    SelectBoxComponent,
    CurrencyInputDirective,
    NumericInputDirective,
    PercentageInputDirective,
    SelectOnFocusDirective,
    TextareaAutosizeDirective,
    WrapBootstrapDirective
  ]
})
export class NgxFormModule {
}
