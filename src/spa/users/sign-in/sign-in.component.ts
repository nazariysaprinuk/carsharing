import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/spa/services/alert.service";
import { Subscription } from "rxjs";
import { UserApi } from "../users-api";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  hide = true;
  private subscription: Subscription;
  message: any;
  submitting: boolean = false;
  formError: string;
  constructor(
    public alertService: AlertService,
    public userApi: UserApi,
    public userService: UserService,
    public router: Router
  ) {}

  onSubmit(signInForm: NgForm): void {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = null;
      this.userApi
        .signIn(signInForm.value.username, signInForm.value.password)
        .subscribe(
          data => {
            this.router.navigate(["/authenticated/car-maint"]);
          },
          error => {
            this.submitting = false;
            this.formError = error;
          }
        );
    }
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
