import {PercentPipe} from '@angular/common';
import {AfterViewInit, Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {InputAbstractDirective} from '../abstract/input-abstract.directive';
import {FormConfigInterface} from '../interface/ngx-form.interface';
import {VLAHIO_FORM_CONFIG} from '../service/injection-token';
import {FormWorker} from '../worker/form.worker';
import {MathHelper} from '@vlah.io/ngx-helper';

@Directive({
  selector: '[vlahioPercentageInput]'
})
export class PercentageInputDirective extends InputAbstractDirective implements OnInit, AfterViewInit {
  digits = 2;
  private percentage: PercentPipe;

  constructor(private elRef: ElementRef,
              readonly control: NgControl,
              private formWorker: FormWorker,
              @Inject(VLAHIO_FORM_CONFIG) private configs: FormConfigInterface) {
    super();
  }

  @Input('digits')
  set _c(digits: number) {
    if (digits !== undefined) {
      this.digits = digits;
    }
  }

  ngOnInit(): void {
    this.el = this.elRef.nativeElement;
    this.percentage = new PercentPipe(this.configs.locale);
  }

  ngAfterViewInit(): void {
    if (this.control.value) {
      this.init();
    }
  }

  transform(str: null | string): string | null {
    if (!MathHelper.isNumber(str)) {
      return null;
    }

    str = this.percentage.transform(
      +str / 100,
      `1.0-${this.digits}`
    );

    return str;
  }

  purify(str: null | string): number | null {
    if (!MathHelper.isNumber(str)) {
      return null;
    }

    str = this.transform(str);

    if (!str) {
      return null;
    }

    return +str.substring(0, str.length - 1);
  }

  handle(str: string): void {
    const pureValue = this.purify(str);

    this.control.control.setValue(pureValue);
    this.pureValue = pureValue;

    this.el.value = this.transform(str);
  }
}
