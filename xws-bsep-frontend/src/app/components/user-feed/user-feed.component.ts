import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeedPost } from 'src/app/model/feed/feed-post';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { FeedService } from 'src/app/services/feed.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { NewPostComponent } from '../new-post/new-post.component';
import { Like } from 'src/app/model/like';
import { Dislike } from 'src/app/model/dislike';
import { PostDto } from 'src/app/model/post-dto';
import { SuccessMessage } from 'src/app/model/success-message';
import { CommentDto } from 'src/app/model/comment-dto';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostLikesComponent } from '../post-likes/post-likes.component';
import { PostDislikesComponent } from '../post-dislikes/post-dislikes.component';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {

  constructor(private userService: UserService, private feedService: FeedService, private postService: PostService, public dialog: MatDialog,
    private router: Router, private authService: AuthService) { }

  user: User = new User; // current user
  feedPosts: FeedPost[] = [];
  posts: Post[] = [];
  loaded: boolean = false;
  feedActive: boolean = true;
  profileActive: boolean = false;
  visibleUserAcccountSettings: boolean = false;

  ngOnInit(): void {
    this.user.name = "";
    this.user.lastName = "";
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

          if (allPosts != undefined && allPosts != null){
            for (let p of allPosts){
              let dateTime = p.DateCreated.split('T')
              let time = dateTime[1].split('.')
              p.DateCreated = dateTime[0] + '  ' + time[0]
            }
            this.posts = []
            this.feedPosts = allPosts
            this.convertToPost();
          }
          this.posts = []
      })
    }
  }

  convertToPost(){  
    for(let feedPost of this.feedPosts){
      let post = new Post;

      post.id = feedPost.Id
      post.text = feedPost.Text;
      post.images = feedPost.Images;
      post.links = feedPost.Links;
      post.dateCreated = feedPost.DateCreated;
      post.likes = [];
      post.dislikes = [];
      post.comments = [];
      post.userId = feedPost.UserId
    
      if (feedPost.Likes != undefined && feedPost.Likes != null){
        for (let l of feedPost.Likes){
          let like = new Like();
          like.id = l.Id;
          like.userId = l.UserId;
          post.likes.push(like)          
        }
      }

      if (feedPost.Dislikes != undefined && feedPost.Dislikes != null){
        for (let l of feedPost.Dislikes){
          let dislike = new Dislike();
          dislike.id = l.Id;
          dislike.userId = l.UserId;
          post.dislikes.push(dislike)
        }
      }

      if (feedPost.Comments != undefined && feedPost.Comments != null){
        for (let l of feedPost.Comments){
          let comment = new Comment();
          comment.id = l.Id;
          comment.userId = l.UserId;
          comment.text = l.Text;

          this.userService.getById(comment.userId).subscribe(
            (user: any) => { 
              comment.user = user
          })

          post.comments.push(comment)
        }
      }

      this.userService.getById(post.userId).subscribe(
        (user: any) => { 
          post.user = user
      })

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

    for (let p of this.posts){
      console.log(p.user['user'].name, p.user['user'].lastName) 
    }
    
  }

  loadMyPosts(){
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

            for (let c of p.comments){
              this.userService.getById(c.userId).subscribe(
                (user: any) => { 
                  c.user = user
              })            
            }
          }

          this.posts = []
          this.posts = posts
      })
    }
  }

  makeVisibleUserAcccountSettings() {
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  comment(postId: string, event: any){
    var sanitize = require("mongo-sanitize"); // mongo-sanitize module 
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.

    let dto = new CommentDto();
    dto.postId = postId;
    dto.text = sanitize(event.target.comment.value);

    if (dto.text != "" && dto.text.trim() != "" && dto.text != undefined){ 
      this.postService.commentPost(dto).subscribe(
        (data: SuccessMessage) => {
          if (this.feedActive){
            this.loadFeed();
          } else {
            this.loadMyPosts();
          }
        }
      )
    } else {
      alert('Comment can not be empty!')
    }
  }

  like(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.likePost(dto).subscribe(
      (data: SuccessMessage) => {
        if (this.feedActive){
          this.loadFeed();
        } else {
          this.loadMyPosts();
        }
      }
    )
  }

  dislike(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.dislikePost(dto).subscribe(
      (data: SuccessMessage) => {
        if (this.feedActive){
          this.loadFeed();
        } else {
          this.loadMyPosts();
        }
      }
    )
  }

  neutral(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.neutralPost(dto).subscribe(
      (data: SuccessMessage) => {
        if (this.feedActive){
          this.loadFeed();
        } else {
          this.loadMyPosts();
        }
      }
    )
  }
  
  seeLikes(postId: string){
    const dialogRef = this.dialog.open(PostLikesComponent, {
      width: '400px',
      height: '230px',
      data: {},
    });
    dialogRef.componentInstance.post.id = postId;

    // dialogRef.afterClosed().subscribe(result => {
    //   window.location.reload();
    // });
  }

  seeDislikes(postId: string){
    const dialogRef = this.dialog.open(PostDislikesComponent, {
      width: '400px',
      height: '230px',
      data: {},
    });
    dialogRef.componentInstance.post.id = postId;

    // dialogRef.afterClosed().subscribe(result => {
    //   window.location.reload();
    // });
  }

  // userLikedPost(postId: string){
  //   let userId =  localStorage.getItem("user");

  //   this.postService.getById(postId).subscribe(
  //     (data: Post) => {
  //       for(let like of data.likes){
  //         if (like.userId == userId){
  //           return true;
  //         }
  //       }
  //       return false;
  //     }
  //   )
  //   return false;
  // }

  // userDislikedPost(postId: string){
  //   let userId =  localStorage.getItem("user");

  //   this.postService.getById(postId).subscribe(
  //     (data: Post) => {
  //       for(let like of data.dislikes){
  //         if (like.userId == userId){
  //           return true;
  //         }
  //       }
  //       return false;
  //     }
  //   )
  //   return false;

  // }

  // userNeutral(postId: string){
  //   let userId =  localStorage.getItem("user");

  //   this.postService.getById(postId).subscribe(
  //     (data: Post) => {
  //       for(let like of data.likes){
  //         if (like.userId == userId){
  //           return false;
  //         }
  //       }
  //       return true;
  //     }
  //   )
  //   return true;
  // }

  newPost(){
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }
}
