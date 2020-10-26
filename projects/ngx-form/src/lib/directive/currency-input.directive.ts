import {CurrencyPipe} from '@angular/common';
import {AfterViewInit, Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {InputAbstractDirective} from '../abstract/input-abstract.directive';
import {FormConfigInterface} from '../interface/ngx-form.interface';
import {VLAHIO_FORM_CONFIG} from '../service/injection-token';
import {FormWorker} from '../worker/form.worker';
import {MathHelper} from '@vlah.io/ngx-helper';

@Directive({
  selector: '[vlahioCurrencyInput]'
})
export class CurrencyInputDirective extends InputAbstractDirective implements OnInit, AfterViewInit {
  @Input() currencyCode: string;
  @Input() removeFormatting: boolean;
  @Input() display = 'symbol';
  private currency: CurrencyPipe;
  private digitsInfo: string;

  constructor(private elRef: ElementRef,
              readonly control: NgControl,
              @Inject(VLAHIO_FORM_CONFIG) private configs: FormConfigInterface) {
    super();
  }

  @Input('digits')
  set _digits(digits: number) {
    if (digits !== undefined) {
      this.digits = +digits;
      this.digitsInfo = `1.0-${digits}`;
    }
  }

  ngOnInit(): void {
    this.el = this.elRef.nativeElement;
    this.currency = new CurrencyPipe(this.configs.locale);
  }

  ngAfterViewInit(): void {
    if (this.control.control.value) {
      this.init();
    }
  }

  transform(str: null | string): string | null {
    if (!MathHelper.isNumber(str)) {
      return null;
    }

    str = this.currency.transform(
      str,
      this.currencyCode,
      this.display,
      this.digitsInfo
    );

    if (!str) {
      return null;
    }

    if (this.removeFormatting === true) {
      str = FormWorker.removeFormatting(str);
    }

    return str;
  }

  purify(str: null | string): number | null {
    if (!MathHelper.isNumber(str)) {
      return null;
    }

    str = this.currency.transform(
      str,
      '',
      '',
      this.digitsInfo
    );

    if (!str) {
      return null;
    }

    return +FormWorker.removeFormatting(str);
  }

  handle(str: string): void {
    const pureValue = this.purify(str);

    this.control.control.setValue(pureValue);
    this.pureValue = pureValue;

    this.el.value = this.transform(str);
  }
}
