import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  private readonly postPath = environment.backend_api + 'api/post';

  getAll(){
    return this.http.get<any>(`${this.postPath}`)    
  }
  
  getByUserId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.postPath}/user/`+ id)    
  }
}
