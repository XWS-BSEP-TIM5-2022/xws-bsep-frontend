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

  constructor() { }
}
