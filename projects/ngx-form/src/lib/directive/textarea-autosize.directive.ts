import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[vlahioTextareaAutosize]'
})
export class TextareaAutosizeDirective implements AfterViewInit {
  readonly el: HTMLElement;
  private clientWidth: number;
  private minHeight: string;
  private maxHeight: string;

  constructor(private elRef: ElementRef,
              private control: NgControl
  ) {
    this.el = elRef.nativeElement;
    this.clientWidth = this.el.clientWidth;
  }

  @Input('minHeight')
  set _minHeight(val: number) {
    this.minHeight = val.toString();
    this.updateMinHeight();
  }

  @Input('maxHeight')
  set _maxHeight(val: number) {
    this.maxHeight = val.toString();
    this.updateMaxHeight();
  }

  @HostListener('window:resize')
  _onResize(): void {
    // Only apply adjustment if element width had changed.
    if (this.el.clientWidth === this.clientWidth) {
      return;
    }
    this.clientWidth = this.elRef.nativeElement.clientWidth;
    this.adjust();
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(str: string): void {
    if (!str) {
      // this.elRef.nativeElement.dispatchEvent(new Event('input'));
      this.control.control.setValue(null);
    }
  }

  @HostListener('input')
  _onInput(): void {
    this.adjust();
  }

  ngAfterViewInit(): void {
    // set element resize allowed manually by user
    const style = window.getComputedStyle(this.el, null);
    if (style.resize === 'both') {
      this.el.style.resize = 'horizontal';
    } else if (style.resize === 'vertical') {
      this.el.style.resize = 'none';
    }
    // run first adjust
    this.adjust();
  }

  adjust(): void {
    // perform height adjustments after input changes, if height is different
    if (this.el.style.height === this.elRef.nativeElement.scrollHeight + 'px') {
      return;
    }
    this.el.style.overflow = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.height = this.el.scrollHeight + 'px';
  }

  updateMinHeight(): void {
    // Set textarea min height if input defined
    this.el.style.minHeight = this.minHeight + 'px';
  }

  updateMaxHeight(): void {
    // Set textarea max height if input defined
    this.el.style.maxHeight = this.maxHeight + 'px';
  }
}
