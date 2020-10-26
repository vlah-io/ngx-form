import {Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {FormWorker} from '../worker/form.worker';

@Directive({
  selector: '[vlahioWrapBootstrap]'
})
export class WrapBootstrapDirective {
  @Input() required: boolean;
  @HostBinding() class = 'form-control';

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private formWorker: FormWorker
  ) {
  }

  @Input('vlahioWrapBootstrap')
  set _label(str: string) {
    this.formWorker.makeBootstrapWrapper(str, this.elRef.nativeElement, this.required);
  }
}
