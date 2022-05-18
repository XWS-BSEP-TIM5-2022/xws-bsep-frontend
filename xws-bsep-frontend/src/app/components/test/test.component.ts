import { AuthService } from './../../services/auth.service';
import { TestService } from './../../services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService, private authService: AuthService) { }

  ngOnInit(): void {

    var user = {
      username : "kristina",
      password : "Kristina1234."
    }
    // this.authService.login(user).subscribe((posts: any) => {
    //   console.log(posts)
    // }
    // )

     this.testService.findAll().subscribe((posts: any) => {
       console.log(posts)
     }
     )
  }

}
