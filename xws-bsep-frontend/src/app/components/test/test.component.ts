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
      username : "TEAAAA",
      password : "Jelena1!"
    }
    this.authService.login(user).subscribe((posts: any) => {
    }
    )

      this.testService.findAll().subscribe((posts: any) => {
        console.log(posts)
      }
      )
  }

}
