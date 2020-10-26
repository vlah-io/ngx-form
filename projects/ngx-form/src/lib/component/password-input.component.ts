import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'vlahio-password-input',
  template: `
    <div class="form-group"
         [formGroup]="form"
         [ngClass]="{'vlahio-m-b0': strengthBar}">
      <ng-template [ngIf]="label">
        <label [ngClass]="{'vlahio-req': req}">{{label}}</label>
      </ng-template>
      <input type="password"
             class="form-control"
             [attr.placeholder]="placeholder"
             [formControlName]="controlName"
             (input)="input$()"
             #password/>
    </div>
    <ng-template [ngIf]="strengthBar && visible">
      <div class="form-group">
        <password-strength-meter
          [password]="password.value"
          [colors]="myColors">
        </password-strength-meter>
      </div>
    </ng-template>
  `
})
export class PasswordInputComponent implements AfterViewInit {
  visible = false;
  myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() req = false;
  @Input() form: FormGroup;
  @Input() strengthBar = true;
  @Output() inputEvEm: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('password', {static: true}) el: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2) {
  }

  @Input('invalid')
  set _invalid(invalid: boolean) {
    if (invalid) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', '#B71C1C');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
    }
  }

  input$(): void {
    this.inputEvEm.emit(this.el.nativeElement.value);
  }

  ngAfterViewInit(): void {
    // todo : remember to fix this for change detection
    setTimeout(
      () => this.visible = true
    );
  }
}
