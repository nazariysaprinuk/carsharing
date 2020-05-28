import { Injectable } from "@angular/core";
import { UserApi } from "../../spa/users/users-api";
import { Router, Route } from "@angular/router";
import { Observable, of, from, throwError } from "rxjs";
import { delay, map, tap, catchError } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable()
export class UserService implements UserApi {
  isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {}

  signIn(username: string, password: string): Observable<any> {
    return from(this.angularFireAuth.signInWithEmailAndPassword(username, password))
    .pipe(
      map(credential => credential.user),
      tap(user => {
        this.isAuthenticated = true;
        return of({}).pipe(delay(2000));
      }),
      catchError((error, obs) => {
        return throwError('Invalid name or password');;
      })
    );
  }
  signUp(userCredential) {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(userCredential.email, userCredential.password))
    .pipe(
      map(credential => credential.user),
      tap(user => {
        this.isAuthenticated = true;
        return of({}).pipe(delay(2000));
      }),
      catchError((error, obs) => {
        return throwError('Invalid user credentials');;
      })
    )
  }
  signOut(): Observable<any> {
      this.angularFireAuth.signOut()
      this.isAuthenticated = false;
      this.router.navigate(['/sign-in']);
      return of({});
  }
}
