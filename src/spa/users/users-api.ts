import { Observable } from 'rxjs';

export abstract class UserApi {
    signIn : (username: string, password: string) => Observable<any>; 
    signUp : (userCredential) => Observable<any>; 
    signOut: () => Observable<any>;
}  