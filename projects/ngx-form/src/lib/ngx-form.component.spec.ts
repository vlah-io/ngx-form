import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormComponent } from './ngx-form.component';

describe('NgxFormComponent', () => {
  let component: NgxFormComponent;
  let fixture: ComponentFixture<NgxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
