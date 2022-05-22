import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Like } from 'src/app/model/like';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.scss']
})
export class PostLikesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostLikesComponent>, private postService: PostService, private userService: UserService) { }
  post: Post = new Post;
  likes: Like[] = []

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.postService.getById(this.post.id).subscribe(
      (data: Post) => {
        for(let like of data['post'].likes){
          this.userService.getById(like.userId).subscribe(
            (data: User) => { 
              like.user = data
              console.log(like)
              this.likes.push(like)
            })
        }
      }
    )
  }
}
