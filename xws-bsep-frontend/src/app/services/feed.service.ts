import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedPost } from '../model/feed/feed-post';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http:HttpClient) { }

  private readonly feedPath = environment.backend_api + 'api/feed';

  getFeed(userID: string){
    return this.http.get<any[]>(`${this.feedPath}/`+ userID)    
  }

  getPublicPosts(){
    return this.http.get<any[]>(`${this.feedPath}/public`)    
  }

}
