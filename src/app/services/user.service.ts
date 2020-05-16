import { Injectable } from "@angular/core";
import { UserApi } from "../../spa/users/users-api";
import { Router, Route } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class UserService implements UserApi {
  isAuthenticated = false;

  constructor(private router: Router) {}

  signIn(username: string, password: string): Observable<any> {
    if (username === "test@gmail.com" && password === "qwerty") {
      this.isAuthenticated = true;
      return of({}).pipe(delay(2000));
    } else {
        return throwError('Invalid name or password');
    }
  }
  signOut(): Observable<any> {
      this.isAuthenticated = false;
      this.router.navigate(['/sign-in']);
      return of({});
  }
}
