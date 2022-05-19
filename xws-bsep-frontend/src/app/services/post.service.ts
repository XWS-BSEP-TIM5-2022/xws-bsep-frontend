import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
