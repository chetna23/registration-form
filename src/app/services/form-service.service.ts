import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor() { }

  public saveForm(form: FormGroup) {
  console.log(form.value);
  }
}
