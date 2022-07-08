import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor(private http:HttpClient) { }

  private readonly joobOfferPath = environment.backend_api + 'api/jobOfferRecommendations';

  getJobRecommendations(userID){
    return this.http.get<any[]>(`${this.joobOfferPath}/` + `${userID}`)
  }


}
