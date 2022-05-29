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
    console.log(dto)
    return this.http.post(this.connectionPath, JSON.stringify(dto));
  }


  private checkError(error: any): any {
    console.log(error)

    throw error;
  }

  checkConnection(userID, userIDb){
    // console.log(userID + ": " + userIDb)

    return this.http.get(`${this.connectionPath}/user/` + `${userID}/` + `checkConnection/` + `${userIDb}`)
    
  }
}
