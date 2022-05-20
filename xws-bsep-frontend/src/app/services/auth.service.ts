import { TestService } from './test.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private testService: TestService) { }

  private readonly loginPath = environment.backend_api + 'api/auth/login';
  private readonly signUpPath = environment.backend_api + 'api/auth/register';
  private readonly activateAccountPath = environment.backend_api + 'api/auth/activateAccount';

  logged: Boolean = false;

  private access_token = null;

  login(user) {
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

}
