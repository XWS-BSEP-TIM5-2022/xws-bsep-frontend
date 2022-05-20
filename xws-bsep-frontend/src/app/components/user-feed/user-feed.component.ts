import { Component, OnInit } from '@angular/core';
import { FeedPost } from 'src/app/model/feed-post';
import { User } from 'src/app/model/user';
import { FeedService } from 'src/app/services/feed.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {

  constructor(private userService: UserService, private feedService: FeedService, private postService: PostService) { }
  user: User; // current user
  obj: any;
  posts: FeedPost[] = [];
  postUser: User;
  visibleUserAcccountSettings: boolean = false;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        this.loadFeed();
      })
    }
  }

  loadFeed(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.feedService.getFeed(userId).subscribe(
        (data: any[]) => { 
          let allPosts = data['AllPosts']
          this.posts = allPosts

          for (let p of this.posts){
            this.userService.getById(p.UserId).subscribe(
              (user: any) => {
                p.User = user['user']
            })
          }
      })
    }
  }

  makeVisibleUserAcccountSettings() {
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

}
