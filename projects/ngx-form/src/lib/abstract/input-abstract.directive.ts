import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive()
export abstract class InputAbstractDirective {
  isFocused: boolean;
  el!: HTMLInputElement;
  readonly control!: NgControl;
  pureValue: number;
  digits: number;
  @Input() stepper = 1;
  @HostBinding('style.textAlign') textAlign = 'right';

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;

    if (this.pureValue) {
      this.el.value = this.pureValue.toString();
    }

    this.el.select();
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(str: string): void {
    delete this.isFocused;
    this.handle(str);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(e: WheelEvent): void {
    if (!this.isFocused) {
      return null;
    }

    this.stepper$((e.deltaY < 0 ? 1 : -1) * this.stepper);
  }

  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(str: string): void {
    if (!str) {
      this.control.control.setValue(null);
    }
  }

  @HostListener('keydown', ['$event', '$event.target.selectionStart'])
  onKeyDown(e: KeyboardEvent, pos: number): void {
    if (e.key === '-') {
      if (this.el.value.split('-').length > 1 || pos !== 0) {
        e.preventDefault();
      }
      return;
    }

    if (e.key === '.') {
      if (this.el.value.split('.').length > 1 || pos < 1 || this.digits === 0) {
        e.preventDefault();
      }
      return;
    }

    if (['ArrowUp', 'ArrowDown'].indexOf(e.key) !== -1) {
      this.stepper$((e.key === 'ArrowUp' ? 1 : -1) * this.stepper);
      e.preventDefault();
    }

    if (
      [
        'Delete', 'Insert', 'Backspace', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight'
      ].indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.key === 'x' && (e.ctrlKey || e.metaKey))
    ) {
      // let it happen, don't do anything
      return;
    }
    // Allow only numbers
    if (/\d/.exec(e.key) === null) {
      e.preventDefault();
    }
  }

  init(): void {
    this.pureValue = this.purify(this.control.value);
    this.el.value = this.transform(this.control.value);
  }

  abstract purify(str: null | string): number | null;

  abstract transform(str: null | string): string | null;

  abstract handle(str: string): void;

  private stepper$(step: number): void {
    this.control.control.setValue(
      this.purify(
        (+this.control.control.value + step).toString()
      )
    );
  }
}
