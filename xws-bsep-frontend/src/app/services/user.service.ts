import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import {map} from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private readonly userPath = environment.backend_api + 'api/user';

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.userPath}/`+ id)    
  }

  getAll(){
    return this.http.get<any[]>(`${this.userPath}`)    
  }

  
}
