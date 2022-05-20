import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.scss']
})
export class PasswordlessLoginComponent implements OnInit {

  constructor(private router: Router, private route : ActivatedRoute, private authService : AuthService) { } 
 
  jwt: string = "";
  message : string = ""
  showButton = false;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.jwt = params['jwt']; 
    }); 

    this.authService.confirmedPasswordlessLogin(this.jwt).subscribe((data) => {
      this.message = "You are now successfully signed in!"
      this.showButton = true;
    }, err => {
      console.log(err)
      this.message = err.error.message
    }) 
 
  }
 
  homePage(){ 

    this.router.navigate(['/feed']); 
  }

  tryAgain(){
    this.router.navigate(['/'])
  }

}
