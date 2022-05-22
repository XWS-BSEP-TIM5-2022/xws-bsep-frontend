import { AuthService } from './../../services/auth.service';
import { TestService } from './../../services/test.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // var user = {
    //   username : "TEAAAA",
    //   password : "Jelena1!"
    // }
    // this.authService.login(user).subscribe((posts: any) => {
    // }
    // )

      // this.testService.findAll().subscribe((posts: any) => {
      //   console.log(posts)
      // }
      // )
  }

  openDialog(){
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '40vw',
      //height: '40vw',
      //position: {top: '0%', left: '0%', bottom: '0%'},
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
