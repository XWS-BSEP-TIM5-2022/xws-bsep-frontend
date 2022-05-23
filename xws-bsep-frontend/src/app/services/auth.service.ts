import { Observable } from 'rxjs';
import { TestService } from './test.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private http:HttpClient,private testService: TestService) { }

  private readonly loginPath = environment.backend_api + 'api/auth/login';
  private readonly signUpPath = environment.backend_api + 'api/auth/register';
  private readonly activateAccountPath = environment.backend_api + 'api/auth/activateAccount';
  private readonly passwordlessLoginPath = environment.backend_api + 'api/auth/passwordless-login';
  private readonly confirmedPasslessPath = environment.backend_api + 'api/auth/confirm-email-login/'; 
  private readonly sendRecoveryCodePath = environment.backend_api + 'api/auth/sendCode';
  private readonly verifyRecoveryCodePath = environment.backend_api + 'api/auth/verifyCode'; 
  private readonly resetForgottenPasswordPath = environment.backend_api + 'api/auth/resetPassword';
  private readonly changePasswordPath = environment.backend_api + 'api/auth/changePassword';
  logged: Boolean = false;

  private access_token = null;
  public jwtHelper: JwtHelperService = new JwtHelperService();

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

  passwordlessLogin(body: {email: string}) {
    return this.http.post(this.passwordlessLoginPath, JSON.stringify(body));
  }

  confirmedPasswordlessLogin(jwt : string){
    return this.http.get(this.confirmedPasslessPath + jwt)      
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

  roleIsPresent(){
    return localStorage.getItem("role")!= undefined && localStorage.getItem("role") != null;
  }

  tokenIsExpired(){
    if (localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null)  {
      let locStorageToken = localStorage.getItem("jwt")
      // let token = JSON.parse(localStorage.getItem('jwt') || '{}');
      if (!locStorageToken){
        return true;
      }
      if(this.jwtHelper.isTokenExpired(locStorageToken)) {
        console.log("Token je istekao")
      }
      return this.jwtHelper.isTokenExpired(locStorageToken);
    }
    return true;
  }

  getToken() {
    return this.access_token;
  }


  signUp(user){
    console.log(user)
    return this.http.post(this.signUpPath, JSON.stringify(user))
    .pipe(map((res: any) => {

    }))
    .pipe(catchError(error => this.checkError(error)));
    
  }

  private checkError(error: any): any {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.error.message,
    })
    // setTimeout(
    //   function(){ 
    //   location.reload(); 
    //   }, 4000);

    throw error;
  }

  activateAccount(jwt): Observable<any> {
    console.log(jwt)
    return this.http.get<any>(`${this.activateAccountPath}/`+ jwt)
  }

  isAuthenticated(): boolean {
    if (this.tokenIsPresent() && this.roleIsPresent() && !this.tokenIsExpired()){
      return true;
    }
    return false;
  }

  sendRecoveryCode(body: {email: string}) {
    return this.http.put(this.sendRecoveryCodePath, JSON.stringify(body));
  }

  verifyRecoveryCode(body: {idAuth: string, verificationCode: string, email: string}){
    return this.http.post(this.verifyRecoveryCodePath, JSON.stringify(body));
  }

  resetForgottenPassword(body: {idAuth: string, password: string, reenteredPassword: string}) {
    return this.http.put(this.resetForgottenPasswordPath, JSON.stringify(body));
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.clear();
  }

  changePassword(body: {oldPassword: string, newPassword: string, newReenteredPassword: string}) {
    return this.http.post(this.changePasswordPath, JSON.stringify(body));
  }
}
