import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[vlahioSelectOnFocus]'
})
export class SelectOnFocusDirective {
  constructor(private elRef: ElementRef) {
  }

  @HostListener('focus')
  onFocus(): void {
    this.elRef.nativeElement.select();
  }
}
