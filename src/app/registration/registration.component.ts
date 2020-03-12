import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FormServiceService} from '../services/form-service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [FormServiceService]
})
export class RegistrationComponent implements OnInit {
  [x: string]: any;
  title = 'registration';
  registerForm: FormGroup;
    submitted = false;
  service: FormServiceService;
  constructor(private formBuilder: FormBuilder, private router: Router, service : FormServiceService  ) { 
    this.service = service;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
          return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.router.navigateByUrl('confirmation');
    this.service.saveForm(this.registerForm);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
