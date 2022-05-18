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
  logged: Boolean = false;

  private access_token = null;

  login(user) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
       'Content-Type': 'application/json'
    });
    //console.log(user)

    const body = {
      'username': user.username,
      'password': user.password
    };
    console.log(body)

    return this.http.post(this.loginPath, JSON.stringify(body))
      .pipe(map((res: any) => {

        this.logged = true;
        this.access_token = res.token;

        console.log("token:" + this.access_token)
        let decoded: any = jwt_decode(res.token)
        console.dir(res)
        localStorage.setItem("user", decoded.sub)
        localStorage.setItem("role", decoded.role)
        localStorage.setItem("jwt", res.token);

        // console.log(localStorage.getItem("role"))
      }));
  }

  tokenIsPresent() {
    console.log("TOKEEEEEEN: " + localStorage.getItem("jwt"))
    return localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null;
  }

  getToken() {
    return this.access_token;
  }

}
