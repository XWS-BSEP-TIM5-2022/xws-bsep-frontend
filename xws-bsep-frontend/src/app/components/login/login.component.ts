import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  username: string = ""
  password: string = ""

  ngOnInit(): void {
  }

  login(){
    var user = {
      username : this.username,
      password : this.password
    }

    console.log(user.username)
    this.authService.login(user).subscribe((posts: any) => {
      this.router.navigate(['/feed']);
    })

  }

}
