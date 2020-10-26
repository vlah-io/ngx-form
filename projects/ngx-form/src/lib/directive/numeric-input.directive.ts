import {Directive} from '@angular/core';
import {CurrencyInputDirective} from './currency-input.directive';

@Directive({
  selector: '[vlahioNumericInput]'
})
export class NumericInputDirective extends CurrencyInputDirective {
  currencyCode = '';
  display = '';
}
