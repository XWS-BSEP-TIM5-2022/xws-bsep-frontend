import { ConnectionService } from './../../services/connection.service';
import { User } from './../../model/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

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
  loggedUserId = localStorage.getItem("user")

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data: User[]) => {
        this.users = data['users']
        console.log(this.users)

        for(let u of this.users){
            this.connectionService.checkConnection(this.loggedUserId,u.id).subscribe((res: any) => {
              u.isConnected = res.connected
              u.request = res.request
              console.log(res)
            })
         }
      })

   
  }

  connect(user, id){
    var followDTO = {
      "userID": user.id,
      "isPublic": user.isPublic
    }

     this.connectionService.connect(followDTO).subscribe((res: any) => {
       user.request = res.connected
       console.log(user.request)
       window.location.reload()
     })
  }

}
