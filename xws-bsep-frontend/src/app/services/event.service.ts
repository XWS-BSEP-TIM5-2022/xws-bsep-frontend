import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../model/event'; 
import { Conversation } from '../model/conversation'; 
import { SuccessMessage } from '../model/success-message';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  private readonly messagePath = environment.backend_api //+ 'api';

  getAllMessageEvents(){
    return this.http.get<Event[]>(`${this.messagePath}GetAllEvents`)    
  }

}
