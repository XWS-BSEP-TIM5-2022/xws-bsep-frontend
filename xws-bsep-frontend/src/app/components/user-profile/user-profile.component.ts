import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentDto } from 'src/app/model/comment-dto';
import { Post } from 'src/app/model/post';
import { PostDto } from 'src/app/model/post-dto';
import { SuccessMessage } from 'src/app/model/success-message';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostDislikesComponent } from '../post-dislikes/post-dislikes.component';
import { PostLikesComponent } from '../post-likes/post-likes.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private userService: UserService, private postService: PostService, public dialog: MatDialog,
    private router: Router) { }

  user: User = new User;
  id: string = "";
  posts: Post[] = [];
  searchedPosts: Post[] = [];
  loaded: boolean = false;
  searchCriteria: string = "";
  
  ngOnInit(): void {
    //@ts-ignore 
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }

  loadUserData(){
    this.userService.getById(this.id).subscribe(
      (user: any) => {
      this.user = user['user']
      this.loadPosts();
    })
  }

  loadPosts(){
    this.postService.getByUserId(this.id).subscribe(
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
        this.loaded = true;
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

  like(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.likePost(dto).subscribe(
      (data: SuccessMessage) => {
        this.loadPosts();
      }
    )
  }

  dislike(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.dislikePost(dto).subscribe(
      (data: SuccessMessage) => {
        this.loadPosts();
      }
    )
  }

  neutral(postId: string){
    let dto = new PostDto();
    dto.postId = postId;
    this.postService.neutralPost(dto).subscribe(
      (data: SuccessMessage) => {
        this.loadPosts();
      }
    )
  }

  comment(postId: string, event: any) {
    let dto = new CommentDto();
    dto.postId = postId;
    dto.text = event.target.comment.value;

    if (dto.text != "" && dto.text.trim() != "" && dto.text != undefined){ 
      this.postService.commentPost(dto).subscribe(
        (data: SuccessMessage) => {
          this.loadPosts();
        }
      )
    } else {
      alert('Comment can not be empty!')
    }
  }

  search(){
    this.posts = this.searchedPosts.filter(p =>
      (p.text).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (p.dateCreated).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }
}
