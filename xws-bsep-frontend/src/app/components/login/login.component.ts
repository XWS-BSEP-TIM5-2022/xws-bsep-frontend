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
  email: string = ""
  isPassless = false;
  isLogin = true;
  isSignup = false;
  message = "";
  isSubmitted = false; 

  ngOnInit(): void {}

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

  onEmailChange(){
    this.message = ""
  }

  passwordlessLogin(){

    this.email = this.email.trim()

    if(!this.email){
      this.message = "Write your email."
      return
    } 

    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") 

    if(!pattern.test(this.email)){
      this.message = "Email is invalid."
      return 
    }

    this.authService.passwordlessLogin({"email" : this.email}).subscribe((data) => {
      this.isSubmitted = true; 
    }, err => {
      console.log(err)
      this.message = "There is no acctivated acount with this email."
    }) 
  }
 
}
