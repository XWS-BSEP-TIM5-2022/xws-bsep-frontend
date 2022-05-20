import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedPost } from 'src/app/model/feed-post';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { FeedService } from 'src/app/services/feed.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { Like } from 'src/app/model/like';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {

  constructor(private userService: UserService, private feedService: FeedService, private postService: PostService, public dialog: MatDialog) { }

  user: User; // current user
  obj: any;
  feedPosts: FeedPost[] = [];
  posts: Post[] = [];
  postUser: User;
  loaded: boolean = false;
  numberOfLikes: number;
  newComment: Comment;
  feedActive: boolean = true;
  profileActive: boolean = false;

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

        this.loadFeed();
      })
    }
  }

  loadFeed(){
    this.feedActive = true;
    this.profileActive = false;
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.feedService.getFeed(userId).subscribe(
        (data: any[]) => { 
          let allPosts = data['AllPosts']

          for (let p of allPosts){
            let dateTime = p.DateCreated.split('T')
            let time = dateTime[1].split('.')
            p.DateCreated = dateTime[0] + '  ' + time[0]

            this.userService.getById(p.UserId).subscribe(
              (user: any) => { 
                p.User = user
            })
          }

          this.posts = []
          this.feedPosts = allPosts
          this.convertToPost();
      })
    }
  }

  convertToPost(){  
    for(let feedPost of this.feedPosts){
      let post = new Post();

      post.id = feedPost.Id
      post.text = feedPost.Text;
      post.images = feedPost.Images;
      post.links = feedPost.Links;
      post.dateCreated = feedPost.DateCreated;
      post.likes = feedPost.Likes;
      post.dislikes = feedPost.Dislikes;
      post.comments = feedPost.Comments;
      post.userId = feedPost.UserId
      post.user = feedPost.User; 

      if (post.likes == null || post.likes == undefined){
        post.likes = []
      } 
      if (post.dislikes == null || post.dislikes == undefined){
        post.dislikes = []
      }
      if (post.comments == null || post.comments == undefined){
        post.comments = []
      }

      this.posts.push(post);  
    }
  }

  openMyPosts(){
    this.feedActive = false;
    this.profileActive = true;
    let userId =  localStorage.getItem("user");
    
    if (userId != undefined){
      this.postService.getByUserId(userId).subscribe(
        (data: any[]) => {
          let posts = data['posts']
          
          for (let p of posts){
            let dateTime = p.dateCreated.split('T')
            let time = dateTime[1].split('.')
            p.dateCreated = dateTime[0] + '  ' + time[0]

            this.userService.getById(p.userId).subscribe(
              (user: any) => { 
                p.user = user
            })
          }

          this.posts = []
          this.posts = posts
      })
    }
  }

  addComment(id: string){

  }

  newPost(){
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
