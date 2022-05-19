import { TestService } from './test.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private testService: TestService) { }

  private readonly loginPath = environment.backend_api + 'api/auth/login';
  private readonly sendRecoveryCodePath = environment.backend_api + 'api/auth/sendCode';
  private readonly verifyRecoveryCodePath = environment.backend_api + 'api/auth/verifyCode';
  private readonly resetForgottenPasswordPath = environment.backend_api + 'api/auth/resetPassword';
  logged: Boolean = false;

  private access_token = null;

  login(user) {
    const loginHeaders = new HttpHeaders({
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    });

    const body = {
      'username': user.username,
      'password': user.password
    };

    return this.http.post(this.loginPath, JSON.stringify(body))
      .pipe(map((res: any) => {

        this.logged = true;
        this.access_token = res.token;

        let decoded: any = jwt_decode(res.token)
        localStorage.setItem("user", decoded.sub)
        localStorage.setItem("role", decoded.role)
        localStorage.setItem("jwt", res.token);
      }));
  }

  tokenIsPresent() {
    return localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null;
  }

  getToken() {
    return this.access_token;
  }

  sendRecoveryCode(body: {email: string}) {
    return this.http.put(this.sendRecoveryCodePath, JSON.stringify(body));
  }

  VerifyRecoveryCode(body: {idAuth: string, verificationCode: string, email: string}){
    return this.http.post(this.verifyRecoveryCodePath, JSON.stringify(body));
  }

  ResetForgottenPassword(body: {idAuth: string, password: string, reenteredPassword: string}) {
    return this.http.put(this.resetForgottenPasswordPath, JSON.stringify(body));
  }
}
