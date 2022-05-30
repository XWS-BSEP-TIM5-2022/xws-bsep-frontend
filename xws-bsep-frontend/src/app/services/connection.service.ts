import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http:HttpClient) { }

  private readonly connectionPath = environment.backend_api + 'connection';

  connect(dto){
    return this.http.post(this.connectionPath, JSON.stringify(dto));
  }

  checkConnection(userID, userIDb){
    return this.http.get(`${this.connectionPath}/user/` + `${userID}/` + `checkConnection/` + `${userIDb}`)
  }

  getAllRequests(userID){
    return this.http.get<any[]>(`${this.connectionPath}/user/` + `${userID}/` + `requests`)
  }

  approveRequest(dto){
    return this.http.put(`${this.connectionPath}/approve`, JSON.stringify(dto));
  }

  rejectRequest(dto){
    return this.http.put(`${this.connectionPath}/reject`, JSON.stringify(dto));
  }
}
