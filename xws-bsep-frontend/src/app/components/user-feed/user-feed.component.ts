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
import { UpdateBiographyComponent } from '../update-user-modals/update-biography/update-biography.component'; 
import { UpdateBasicInfoComponent } from '../update-user-modals/update-basic-info/update-basic-info.component'; 
import { UpdateSkillsComponent } from '../update-user-modals/update-skills/update-skills.component'; 
import { UpdateInterestsComponent } from '../update-user-modals/update-interests/update-interests.component';  
import { UpdateEducationComponent } from '../update-user-modals/update-education/update-education.component'; 
import { UpdateExperienceComponent } from '../update-user-modals/update-experience/update-experience.component'; 
import { DatePipe } from '@angular/common'; 
import Swal from 'sweetalert2'

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
  searchedPosts: Post[] = [];
  loaded: boolean = false;
  feedActive: boolean = true;
  profileActive: boolean = false;
  informationsActive: boolean = false;
  visibleUserAcccountSettings: boolean = false;
  searchCriteria: string = "";
  stringBirthday : any;

  ngOnInit(): void {
    this.user.name = "";
    this.user.lastName = "";
    this.feedActive = true;
    this.profileActive = false;
    this.informationsActive = false;
    this.loadUserData();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");
    
    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        localStorage.setItem("loggedUserName", this.user.name)
        localStorage.setItem("email", this.user.email)
        this.loaded = true; 
        const datepipe: DatePipe = new DatePipe('en-US')
        this.stringBirthday = datepipe.transform(this.user.birthday, 'dd-MMMM-YYYY')
        if(this.feedActive){
        this.loadFeed();} 
      })
    }
  }

  loadFeed(){
    this.feedActive = true;
    this.profileActive = false;
    this.informationsActive = false;
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.feedService.getFeed(userId).subscribe(
        (data: any[]) => { 
          let allPosts = data['AllPosts']
          console.log(allPosts)

          if (allPosts != undefined && allPosts != null){
            for (let p of allPosts){
              let dateTime = p.DateCreated.split('T')
              let time = dateTime[1].split('.')
              p.DateCreated = dateTime[0] + '  ' + time[0]
            }
            this.posts = []
            this.feedPosts = allPosts
            this.convertToPost();
          } else {
            this.posts = []
            this.searchedPosts = this.posts;
            this.loaded = true;
          }
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

      //console.log(post)

      this.posts.push(post); 
      //console.log(this.posts.length)

    }
  
    this.searchedPosts = this.posts;
    this.loaded = true;

  //   for (let p of this.posts){
  //     // console.log(p.user['user'].name, p.user['user'].lastName) 
  //     console.log(this.posts)
  //   } 
 }

  loadMyPosts(){
    this.feedActive = false;
    this.profileActive = true;
    this.informationsActive = false;
    let userId = localStorage.getItem("user");
    
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
          this.searchedPosts = this.posts
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
  }

  seeDislikes(postId: string){
    const dialogRef = this.dialog.open(PostDislikesComponent, {
      width: '400px',
      height: '230px',
      data: {},
    });
    dialogRef.componentInstance.post.id = postId;
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


  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

  search(){
    this.posts = this.searchedPosts.filter(p =>
      (p.text).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (p.dateCreated).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }

  searchFeed(){
    this.feedActive = true;
    this.profileActive = false;
    this.posts = this.searchedPosts.filter(p =>
      (p.text).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (p.dateCreated).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }

  searchProfile(){
    this.feedActive = false;
    this.profileActive = true;
    this.posts = this.searchedPosts.filter(p =>
      (p.text).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (p.dateCreated).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }

  seeProfile(id: string){
    let userId =  localStorage.getItem("user");

    if (id != userId){
      this.router.navigate(['profile', id])
    }
  }

  loadMyInfo(){
    this.feedActive = false;
    this.profileActive = false;
    this.informationsActive = true; 
  }

  editInfo(){    
    const dialogRef = this.dialog.open(UpdateBasicInfoComponent, {
    width: '40vw',
    data: {},
  });

  dialogRef.afterClosed().subscribe(result => {
    window.location.reload();
  });

  }

  updateBiography(){
    const dialogRef = this.dialog.open(UpdateBiographyComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserData() 
    });
  }

  addSkill(){ 

    const dialogRef = this.dialog.open(UpdateSkillsComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserData() 
    });

  }

  addEducation(){ 

    const dialogRef = this.dialog.open(UpdateEducationComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserData() 
    });

  }

  addExperience(){ 

    const dialogRef = this.dialog.open(UpdateExperienceComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserData() 
    });

  }

  addInterest(){ 

    const dialogRef = this.dialog.open(UpdateInterestsComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUserData() 
    });

  }

  deleteSkill(id){ 

    this.user.skills.forEach((skill,index)=>{
      if(skill.id == id){
        this.user.skills.splice(index,1);
      } 
    });
    this.updateUser()

  }

  deleteInterest(id){ 

    this.user.interests.forEach((interest,index)=>{
      if(interest.id == id){
        this.user.interests.splice(index,1);
      } 
    });
    this.updateUser()

  }

  deleteEducation(id){

    this.user.education.forEach((e,index)=>{
      if(e.id == id){
        this.user.education.splice(index,1);
      } 
    });
    this.updateUser()

  }

  deleteExperience(id){

    this.user.experience.forEach((e,index)=>{
      if(e.id == id){
        this.user.experience.splice(index,1);
      } 
    });
    this.updateUser()

  }

  updateUser(){

    this.userService.update(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          Swal.fire({
            icon: 'success',
            title: 'Yay!',
            text: 'Successfully updateD!',
          })    
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again.',
          })   
        }
      }) 
  }

}
