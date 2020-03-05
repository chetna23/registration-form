import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'registration'`, () => {
    expect(component.title).toEqual('registration');
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.registerForm instanceof FormGroup).toBe(true);
    expect(Object.keys(component.registerForm.controls).length).toEqual(7);
    expect(Object.keys(component.registerForm.controls)).toEqual([
      'title', 'firstName', 'lastName', 'email', 'password', 'confirmPassword', 'acceptTerms'
    ]);
});

it('should return false if the form control is not valid', () => {
  component.ngOnInit();
  expect(component.registerForm.valid).toBe(false);
});

it('should return true if the form control is valid', () => {
  component.ngOnInit();
  component.registerForm.controls['title'].setValue('Ms');
  component.registerForm.controls['firstName'].setValue('Codergirl');
  component.registerForm.controls['lastName'].setValue('Hero');
  component.registerForm.controls['email'].setValue('codergirl@codergirl.com');
  component.registerForm.controls['password'].setValue('codergirl');
  component.registerForm.controls['confirmPassword'].setValue('codergirl');
  component.registerForm.controls['acceptTerms'].setValue(true);
  expect(component.registerForm.valid).toBe(true);

  component.onSubmit();
  expect(component.submitted).toBe(true);
  expect (routerSpy.navigateByUrl).toHaveBeenCalledWith ('confirmation');
});


describe('invalid form', () => {

it('should return false if the form control is invalid', () => {
  component.ngOnInit();
  component.registerForm.controls['title'].setValue('Ms');
  component.registerForm.controls['firstName'].setValue('Codergirl');
  component.registerForm.controls['lastName'].setValue('Hero');
  component.registerForm.controls['email'].setValue('codergirl');
  component.registerForm.controls['password'].setValue('codergirl');
  component.registerForm.controls['confirmPassword'].setValue('codergirl');
  component.registerForm.controls['acceptTerms'].setValue(true);
  expect(component.registerForm.valid).toBe(false);
  component.onSubmit();
  expect(component.submitted).toBe(true);
  expect (routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
});
});
});
