import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentDto } from '../model/comment-dto';
import { Like } from '../model/like';
import { PostDto } from '../model/post-dto';
import { SuccessMessage } from '../model/success-message';

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

  likePost(dto: PostDto): Observable<SuccessMessage>{
    return this.http.post<SuccessMessage>(`${this.postPath}/like`, dto)    
  }

  dislikePost(dto: PostDto): Observable<SuccessMessage>{
    return this.http.post<SuccessMessage>(`${this.postPath}/dislike`, dto)    
  }

  commentPost(dto: CommentDto): Observable<SuccessMessage>{
    return this.http.post<SuccessMessage>(`${this.postPath}/comment`, dto)    
  }
}
