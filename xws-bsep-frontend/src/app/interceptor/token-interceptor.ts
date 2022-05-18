import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("sadsd" + localStorage.getItem('jwt'))

    //if (this.auth.tokenIsPresent()) {
      console.log("usao" + localStorage.getItem("jwt"))

       request = request.clone({
         setHeaders: {
           //'Content-Type': 'application/json',
           Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaXN0aW5hIiwicm9sZSI6IlVzZXIiLCJleHAiOjE2NTI4OTU0NTcsInN1YiI6IjYyODRmZmMwNmY0MDgwY2I2NjRiZWE4OCJ9.pgZ-hYpZvioDZiRPLlJsupsFYPSHHI1oyK8hcmsL86z-tP0Fh0u0bAZbz8zQbNmIQxUPLdxGBzciha5BqkQua4LQnzW3kx8bBMyYPkax7Ba1o7z6JGn-qAa5VBIJUZzxUO70A7-OYGnH-8qagaCsUzxD6UA41PyRVf7wuy1-zgI72afxdpatl6ahV7DJop_Euht71CvRnZCVVo3hRubhhGKHUnEGgu6Bus1nmwVPAGP2U4MvseekdJU-P-FyfXiqg_UOTFjtDbYxczDdfsN1zWjLV5n5pfarxfr9xBphsCal6BEO7Iav-kMOzrE-fahlthsQeviEzS81NvjuxcPYGg` 
         }
       });

      //request = request.clone({ headers: request.headers.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaXN0aW5hIiwicm9sZSI6IlVzZXIiLCJleHAiOjE2NTI4OTE2ODcsInN1YiI6IjYyODRmZmMwNmY0MDgwY2I2NjRiZWE4OCJ9.rDLAqHVrNdR_0aItJDhzBEVRmDZqApH79A3e_oQM2HAcM_40a3gl41IZq35UWKxXGCa109uMVEyGHeafjhTIGUeWWy25orbpETgcm9r-x7dm39u5lrhykCAinju02C5sTtWDgs01ZJWTW1ID4gFswIZ-iamqz9Wa7q_DKA1bg463r90VHdw-Xy3KPYKmtb1YH5fJgjtEUVhfk85HubXwH1oaz7e7i2SBFobz9u12hy6TlsUx5nlAGxam00RaNecOJO3X_DDuOuHRfo4kPDqTVmJ8EcT5BrIf9M_sIUKD7GB9GKamagYVoIoHX3RCtjQsj9kjZxhDp03zEO_vjl9qkw') });

    //}
    return next.handle(request);
  }
}