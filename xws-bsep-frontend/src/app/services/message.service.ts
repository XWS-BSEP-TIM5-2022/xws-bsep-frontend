import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../model/message'; 
import { Conversation } from '../model/conversation'; 
import { SuccessMessage } from '../model/success-message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  private readonly messagePath = environment.backend_api + 'api/message';

  getConversationById(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.messagePath}/`+ id)    
  }

  getAllConversationsForUser(){
    return this.http.get<Conversation[]>(`${this.messagePath}/user`)    
  }

  getConversation(receiver: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.messagePath}/`+ receiver)    
  }

  newMessage(message: Message): Observable<Conversation>{
    return this.http.post<Conversation>(`${this.messagePath}`, message)    
  }
}
