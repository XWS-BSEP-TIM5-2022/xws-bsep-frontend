import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';
import { SuccessMessage } from 'src/app/model/success-message';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPostComponent>, private userService: UserService, private postService: PostService) { }

  user: User;
  loaded: boolean = false;
  post: Post = new Post;
  link: string = "";

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        this.loaded = true;
      })
    }
  }

  addLink(){
    if (this.link != "" && this.link.trim() != ""){
      this.post.links.push(this.link);
    }
    this.link = ""
  }

  addImage(){
    // TODO
  }

  save(){
    this.post.dateCreated = "2022-05-08T09:37:53.539Z"
    this.postService.addPost(this.post).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Post uspesno kreiran!")
        } else {
          alert("Post nije kreiran!")
        }
      })
      this.dialogRef.close();
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
