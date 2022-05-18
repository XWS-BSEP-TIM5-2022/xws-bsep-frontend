import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _http:HttpClient) { }

  private readonly testPath = environment.backend_api + 'post';
  private readonly loginPath = environment.backend_api + 'api/auth/login';


  
  public findAll(): Observable<any[]>{
    
       return this._http.get<any[]>(`${this.testPath}`)
  }



}
