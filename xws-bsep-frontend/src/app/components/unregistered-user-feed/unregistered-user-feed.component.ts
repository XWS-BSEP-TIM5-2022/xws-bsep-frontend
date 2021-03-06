import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { Dislike } from 'src/app/model/dislike';
import { FeedComment } from 'src/app/model/feed/feed-comment';
import { FeedPost } from 'src/app/model/feed/feed-post';
import { Like } from 'src/app/model/like';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { FeedService } from 'src/app/services/feed.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostDislikesComponent } from '../post-dislikes/post-dislikes.component';
import { PostLikesComponent } from '../post-likes/post-likes.component';

@Component({
  selector: 'app-unregistered-user-feed',
  templateUrl: './unregistered-user-feed.component.html',
  styleUrls: ['./unregistered-user-feed.component.scss']
})
export class UnregisteredUserFeedComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private feedService: FeedService, private userService: UserService) { }
  
  posts: Post[] = [];
  feedPosts: FeedPost[] = [];
  searchCriteria: string = "";
  searchedPosts: Post[] = []; 

  
  searchCriteriaUsers: string = "";
  users: User[] = [];
  selectedPosts = true; 

  ngOnInit(): void {
    this.loadPostsFromPublicAccounts();
    this.loadPublicUsers();
  }

  loadPublicUsers(){
    this.userService.getAllPublic().subscribe(
      (data: any[]) => {

        this.users = data['users']
        console.dir(this.users)
        
      })
  }

  loadPostsFromPublicAccounts(){
    this.feedService.getPublicPosts().subscribe(
      (data: any[]) => {
        let allPosts = data['AllPosts']
          console.log(allPosts)

          if (allPosts != undefined && allPosts != null){
            for (let p of allPosts){
              let dateTime = p.DateCreated.split('T')
              let time = dateTime[1].split('.')
              p.DateCreated = dateTime[0] + '  ' + time[0]
            }
            this.feedPosts = allPosts
            this.convertToPost();
          } else {
            this.posts = []
            this.searchedPosts = this.posts;
          }
      })
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
      post.userId = feedPost.UserId;
      post.image = feedPost.Image;
    
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

      post.isJobOffer = feedPost.IsJobOffer;
      post.jobOffer.id = feedPost.JobOffer.Id;
      post.jobOffer.companyId = feedPost.JobOffer.CompanyId;
      post.jobOffer.dailyActivities = feedPost.JobOffer.DailyActivities;
      post.jobOffer.jobDescription = feedPost.JobOffer.JobDescription;
      post.jobOffer.preconditions = feedPost.JobOffer.Preconditions;
      post.jobOffer.position.id = feedPost.JobOffer.Position.Id;
      post.jobOffer.position.name = feedPost.JobOffer.Position.Name;
      post.jobOffer.position.pay = feedPost.JobOffer.Position.Pay;

      post.company.id = feedPost.Company.Id;
      post.company.name = feedPost.Company.Name;
      post.company.description = feedPost.Company.Description;
      post.company.isActive = feedPost.Company.IsActive;
      post.company.phoneNumber = feedPost.Company.PhoneNumber;

      this.posts.push(post); 
    }

    this.searchedPosts = this.posts;

    // for (let p of this.posts){
    //   console.log(p.user['user']) 
    // } 
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

  search(){
    this.posts = this.searchedPosts.filter(p =>
          (p.text).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
          (p.dateCreated).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }

  searchUsers(){

    this.userService.searchPublic(this.searchCriteriaUsers).subscribe(
      (data: User[]) => {

        this.users = data['users']
        
      })
  }


  seeProfile(id: string){
    this.router.navigate(['public-profile', id])
  }
}
