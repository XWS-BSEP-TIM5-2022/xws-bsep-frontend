import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { PostDislikesComponent } from '../post-dislikes/post-dislikes.component';
import { PostLikesComponent } from '../post-likes/post-likes.component';

@Component({
  selector: 'app-unregistered-user-feed',
  templateUrl: './unregistered-user-feed.component.html',
  styleUrls: ['./unregistered-user-feed.component.scss']
})
export class UnregisteredUserFeedComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private postService: PostService) { }
  posts: Post[] = [];

  ngOnInit(): void {
    this.loadPostsFromPublicAccounts();
  }

  loadPostsFromPublicAccounts(){
    this.postService.getAll().subscribe(
      (data: any[]) => {
        console.log(data)
        this.posts = data['posts']

        for (let p of this.posts){
          console.log(p) 
        }
      })
  }

  seeLikes(postId: string){
    const dialogRef = this.dialog.open(PostLikesComponent, {
      width: '400px',
      height: '230px',
      data: {},
    });
    dialogRef.componentInstance.post.id = postId;
  }

  seeDislikes(postId: string){
    const dialogRef = this.dialog.open(PostDislikesComponent, {
      width: '400px',
      height: '230px',
      data: {},
    });
    dialogRef.componentInstance.post.id = postId;
  }

}
