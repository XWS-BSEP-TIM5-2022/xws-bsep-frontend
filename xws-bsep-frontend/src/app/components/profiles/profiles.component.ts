import { User } from './../../model/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  constructor(private userService: UserService) { }
  users: User[]  = []

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data: any[]) => {
        this.users = data['users']
        console.log(this.users)

      })

  }

}
