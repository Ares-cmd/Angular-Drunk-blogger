import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject,BehaviorSubject,throwError } from 'rxjs';
import { User } from './user.model';

export interface Authuser{
  userId:number;
  userName:string;
  userEmail:string;
}
export interface AuthData{
  auth_token:string;
  user:Authuser;
}

export interface AuthResponseData {
  status: string;
  message: string;
  data:AuthData;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  auth__token= this.user.asObservable();
  baseurl:String="http://3.134.93.237:5000/api/v1/";

  constructor(private http:HttpClient) { }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.baseurl+'user/login',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resData => {
          if (resData.status){
          this.handleAuthentication(
            resData.data.user.userEmail,
            resData.data.user.userId,
            resData.data.user.userName,
            resData.data.auth_token,
          );
          }
        })
      );
  }

  signup(name: string, email: string, password: string) {
    
    console.log("Signup mode")
    return this.http
      .post<AuthResponseData>(
        this.baseurl+'user/register',
        {
          name: name,
          email: email,
          password: password
        }
      )
      .pipe(
        tap(resData => {
          if (resData.status){
          this.handleAuthentication(
            resData.data.user.userEmail,
            resData.data.user.userId,
            resData.data.user.userName,
            resData.data.auth_token,
          );
          }
        })
      );
  }


  private handleAuthentication(
    email:string,
    userid:number,
    username:string,
    auth_token:string,
  ) {
    const user = new User(email, userid, username, auth_token);
    this.user.next(user);
  }


}
