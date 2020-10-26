import {HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MathHelper} from '@vlah.io/ngx-helper';
import {HttpAbstract} from '@vlah.io/ngx-worker';
import {Subject} from 'rxjs';
import {SubSink} from 'subsink';
import {FormModelInterface} from '../interface/ngx-form.interface';
import {VLAHIO_FORM_CRUD_SERVICE, VLAHIO_FORM_MODEL} from '../service/injection-token';

@Injectable({
  providedIn: 'root'
})
export class FormWorker {
  form: FormGroup;
  loading = new Subject<true>();
  get = new Subject<any>();
  errOnGet = new Subject<HttpErrorResponse>();
  errorOnSubmit = new Subject<HttpErrorResponse>();
  submitting = new Subject<true>();
  created = new Subject<any>();
  changed = new Subject<any>();
  submitted = new Subject<any>();
  private id: number;
  private subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    @Inject(VLAHIO_FORM_CRUD_SERVICE) private crud: HttpAbstract,
    @Inject(VLAHIO_FORM_MODEL) private formModel: FormModelInterface
  ) {
    this.formInit();
  }

  static if(str: any): boolean {
    return [null, undefined, false, 'null', 'undefined', 'false'].indexOf(str) === -1;
  }

  static removeFormatting(str: string): string | null {
    if (!str) {
      return null;
    }

    return str.replace(/,/g, '');
  }

  makeBootstrapWrapper(str: string,
                       inputElement: HTMLInputElement,
                       required?: boolean
  ): void {
    const divElement = this.renderer.createElement('div') as HTMLDivElement;
    this.renderer.addClass(divElement, 'form-group');
    const parentNode = this.renderer.parentNode(inputElement);
    if (parentNode instanceof HTMLLabelElement) {
      const parentOfLabel = this.renderer.parentNode(parentNode);
      this.renderer.appendChild(parentOfLabel, divElement);
      this.renderer.appendChild(divElement, inputElement);
      this.renderer.removeChild(parentOfLabel, parentNode);
    } else {
      this.renderer.insertBefore(
        this.renderer.parentNode(inputElement),
        divElement,
        inputElement
      );
      this.renderer.appendChild(divElement, inputElement);
    }

    const labelElement = this.renderer.createElement('label') as HTMLLabelElement;
    if (required) {
      this.renderer.addClass(labelElement, 'vlahio-req');
    }
    this.renderer.appendChild(labelElement, this.renderer.createText(str));
    this.renderer.insertBefore(this.renderer.parentNode(inputElement), labelElement, inputElement);
  }

  /**
   * Example:
   * dependencySubscriber(
   *  (new FormControl()),
   *  (new FormControl()),
   *  (id: number) => {console.log(id);},
   *  () => {delete this.somePropertyPath;}
   * )
   */
  dependencySubscriber<T>(formControl: AbstractControl,
                          dependantFormControl: AbstractControl,
                          resetFn: (value: any) => void
  ): void {
    if (formControl.value) {
      resetFn(formControl.value);
    }
    this.subs.add(
      formControl.valueChanges
        .subscribe(
          (value: any) => {
            resetFn(value);
            dependantFormControl.setValue(null);
          }
        )
    );
  }

  canLoadDependency(value: null | string | object,
                    principalValue: undefined | object[]
  ): boolean {
    // if the dependant has no value && the principal has a value
    return FormWorker.if(value) && !FormWorker.if(principalValue);
  }

  addControlArray(formGroup: FormGroup,
                  name: string,
                  controlsConfig: any[]): void {
    formGroup.addControl(name, this.fb.array(controlsConfig));
  }

  addControlsArray(formGroup: FormGroup,
                   controls: {
                     name: string,
                     controlsConfig: any[]
                   }[]): void {
    controls.forEach(
      ({name, controlsConfig}) => {
        this.addControlArray(
          formGroup,
          name,
          controlsConfig
        );
      }
    );
  }

  getDataForEdit(id: number): void {
    if (!MathHelper.isNumber(id)) {
      alert('I give up. Expecting an ID. None provided.');
      return;
    }

    this.id = id;

    this.loading.next(true);

    this.subs.add(
      this.crud
        .getOne(id)
        .subscribe(
          (res: any): void => {
            this.get.next(res);
          },
          (err: HttpErrorResponse): void => {
            this.errOnGet.next(err);
          }
        )
    );
  }

  submit(): void {
    this.submitting.next(true);

    this.subs.add(
      (this.id ? this.crud.put(this.id, this.form.value) : this.crud.post(this.form.value))
        .subscribe(
          (res: any): void => {
            if (this.id) {
              this.changed.next(res);
            } else {
              this.created.next(res);
            }
            this.submitted.next(res);
          },
          (err: HttpErrorResponse): void => {
            this.errorOnSubmit.next(err);
          }
        )
    );
  }

  private formInit(): void {
    this.form = this.fb.group(this.formModel);
  }
}
