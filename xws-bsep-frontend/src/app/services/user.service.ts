import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import {map} from 'rxjs/operators';  
import { SuccessMessage } from '../model/success-message';

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

  update(user: User): Observable<SuccessMessage>{
    console.log(user.isPublic)

    return this.http.put<SuccessMessage>(`${this.userPath}/update`, user)    
  }

  updatePrivacy(user: User): Observable<SuccessMessage>{
    console.log("treba da bude" + user.isPublic)

    return this.http.put<SuccessMessage>(`${this.userPath}/updatePrivacy`, user)    
  }

  getAllPublic(){
    return this.http.get<User[]>(`${this.userPath}/public`)    
  }

  searchPublic(criteria : string){
    return this.http.get<User[]>(`${this.userPath}/search/${criteria}`)    
  }
  
  updatePostNotification(user: User): Observable<SuccessMessage>{
    return this.http.put<SuccessMessage>(`${this.userPath}/postNotification`, user)    
  }

  updateMessageNotification(user: User): Observable<SuccessMessage>{
    return this.http.put<SuccessMessage>(`${this.userPath}/messageNotification`, user)    
  }

  updateFollowNotification(user: User): Observable<SuccessMessage>{
    return this.http.put<SuccessMessage>(`${this.userPath}/followNotification`, user)    
  }
}
