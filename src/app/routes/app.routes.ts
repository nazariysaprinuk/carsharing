import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list/car-list.component";
import { CarMaintComponent } from "./car-maint/car-maint.component";
import { AuthenticatedComponent } from "./authenticated/authenticated.component";
import { SignInComponent } from "../../spa/users/sign-in/sign-in.component";
import { RegistrationComponent } from "../../spa/users/registration/registration.component";
import { PasswordResetComponent } from "../../spa/users/password-reset/password-reset.component";
import { AuthGuard } from "../services/auth-guard.service";

export const appRoutes: Routes = [
  { path: "sign-in", component: SignInComponent },
  { path: "register", component: RegistrationComponent },
  { path: "password-reset", component: PasswordResetComponent },
  {
    path: "authenticated",
    component: AuthenticatedComponent,
    children: [
      {
        path: "",
        // canActivateChild: [AuthGuard],
        children: [
          // { path: "", canActivateChild: [AuthGuard],children: [
            { path: "home", component: HomeComponent },
            { path: "settings", component: SettingsComponent },
            { path: "car-detail/:id/:operation", component: CarDetailComponent },
            { path: "car-list/:count", component: CarListComponent },
            { path: "car-maint", component: CarMaintComponent }
          // ]}
        ]
      }
    ]
  },
  { path: "", redirectTo: "sign-in", pathMatch: "full" },
  { path: "**", component: SignInComponent }
];
