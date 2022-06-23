import { Observable } from 'rxjs';
import { ConnectionService } from './../../services/connection.service';
import { User } from './../../model/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  constructor(private userService: UserService, private connectionService: ConnectionService) { }
  users: User[]  = []
  pending: boolean = false
  loggedUser = localStorage.getItem("email")
  loggedUserId: any
  loggedUserFull: User

  ngOnInit(): void {

    this.loggedUserId = localStorage.getItem("user")
    console.log(this.loggedUserId)

    this.userService.getAll().subscribe(
      (data: User[]) => {
        this.users = data['users']
        console.log(this.users)

        for(let u of this.users){
            this.connectionService.checkConnection(this.loggedUserId,u.id).subscribe((res: any) => {
              u.isConnected = res.connected
              u.request = res.request
              u.blocked = res.blocked;
              console.log(res)
            })
         }
      })

   
  }

  findLoggedUser() : Observable<boolean>{

    return this.userService.getById(this.loggedUserId).pipe(map((res: any) => {
      this.loggedUserFull = res['user'];
      return this.loggedUserFull.isPublic;
    }))
    

  }

  connect(user, id){
    var followDTO = {
      "userID": user.id,
      "isPublic": user.isPublic,
      "isPublicLogged": false    
    }

    var u = this.findLoggedUser().subscribe(event => {
      followDTO.isPublicLogged = event
        this.connectionService.connect(followDTO).subscribe((res: any) => {
          window.location.reload()
        })
     })
  }



  block(user){
    this.findLoggedUser()    

    var dto = {
      "userID": user.id,
      "isPublic": user.isPublic

    }

    var u = this.findLoggedUser().subscribe(event => {
     // dto.isPublicA = event
      this.connectionService.block(dto).subscribe((res: any) => {
        window.location.reload()
      })
    })
  }

}
