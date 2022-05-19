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
  user: User;
  obj: any;
  posts: FeedPost[] = [];

  ngOnInit(): void {
    // let post1 = new FeedPost(); 
    // post1.Id = '111';

    // this.posts.push(post1)
    // let poss1 = []
    // poss1.p
    // this.posts.

    this.loadUserData();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        console.log(this.user.name)     // RESENO   
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
      })
    }
  }

}
