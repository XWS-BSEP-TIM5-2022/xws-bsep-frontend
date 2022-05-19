import { TestService } from './test.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private testService: TestService) { }

  private readonly loginPath = environment.backend_api + 'api/auth/login';
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

  tokenIsPresent() {
    return localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null;
  }

  roleIsPresent(){
    return localStorage.getItem("role")!= undefined && localStorage.getItem("role") != null;
  }

  tokenIsExpired(){
    if (localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null)  {
      let token = JSON.parse(localStorage.getItem('jwt') || '{}');
      console.log("token nije istekao")
      return !this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }

  getToken() {
    return this.access_token;
  }

  isAuthenticated(): boolean {
    if (this.tokenIsPresent() && this.roleIsPresent() /**&& !this.tokenIsExpired() **/){
      return true;
    }
    return false;
  }

}
