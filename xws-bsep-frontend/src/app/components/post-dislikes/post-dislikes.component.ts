import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Dislike } from 'src/app/model/dislike';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-dislikes',
  templateUrl: './post-dislikes.component.html',
  styleUrls: ['./post-dislikes.component.scss']
})
export class PostDislikesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostDislikesComponent>, private postService: PostService, private userService: UserService) { }
  post: Post = new Post;
  dislikes: Dislike[] = []

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.postService.getById(this.post.id).subscribe(
      (data: Post) => {
        for(let dislike of data['post'].dislikes){
          this.userService.getById(dislike.userId).subscribe(
            (data: User) => { 
              dislike.user = data
              this.dislikes.push(dislike)
            })
        }
      }
    )
  }
}
