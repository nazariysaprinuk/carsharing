import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AlertService } from 'src/spa/services/alert.service';
import { UserApi } from '../users-api';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() selected
  @Input() hide1
  @Input() hide2
  @Input() Roles
  @Input() formError
  @Input() regstering
  @Input() hasAdded
  @Input() dateOfBirth
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private alertService: AlertService,
    private userApi: UserApi,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
  }

  onSubmit(signUpForm: NgForm) {
    if (signUpForm.valid) {
    this.userApi
      .signUp(signUpForm.value)
      .subscribe(data => {
        this.router.navigate(["/sign-in"]);
      })
    }
  }

}
 