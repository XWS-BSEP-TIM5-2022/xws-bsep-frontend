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
  messageLogin = "";
  isSubmitted = false; 

  ngOnInit(): void {}

  login(){ 

    if(this.validateLogin()){
      return
    }

    var user = {
      username : this.username,
      password : this.password
    }

    console.log(user.username)
    this.authService.login(user).subscribe((posts: any) => {
      this.router.navigate(['/feed']);
    })

  }

  validateLogin() : boolean{
    this.username = this.username.trim()
    this.password = this.password.trim()

    if(!this.username){
      this.messageLogin = "Write your username."
      return true
    }

    if (/\s/.test(this.username)) {
      this.messageLogin = "Username cannot contain whitespace."
      return true
    }

    if(!this.password){
      this.messageLogin = "Write your password."
      return true
    }

    if (/\s/.test(this.password)) {
      this.messageLogin = "Password cannot contain whitespace."
      return true
    }

    if(this.password == this.username){
      this.messageLogin = "Password cannot be the same as username!"
      return true
    }

    let pattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')

    if(!pattern.test(this.password)){
      this.messageLogin = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      return true
    }
    this.messageLogin = ""

    return false
  }

  onEmailChange(){
    this.message = ""
  }

  passwordlessLogin(){

    this.email = this.email.trim()

    if(this.validatePasswordlessLogin()){
      return
    }

    this.authService.passwordlessLogin({"email" : this.email}).subscribe((data) => {
      this.isSubmitted = true; 
    }, err => {
      console.log(err)
      this.message = "There is no acctivated acount with this email."
    }) 
  }
  
  validatePasswordlessLogin() : boolean{
    if(!this.email){
      this.message = "Write your email."
      return true
    } 

    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") 

    if(!pattern.test(this.email)){
      this.message = "Email is invalid."
      return true
    }

    return false
  }
}
