import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  private readonly notificationPath = environment.backend_api + 'api/notification';

  getAll() {
    return this.http.get<Notification[]>(`${this.notificationPath}`)    
  }

  getByUserId(id: string) {
    return this.http.get<Notification[]>(`${this.notificationPath}/user/` + id)    
  }

}
