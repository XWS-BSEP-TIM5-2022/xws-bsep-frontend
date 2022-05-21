import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';
import { SuccessMessage } from 'src/app/model/success-message';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPostComponent>, private userService: UserService, private postService: PostService) { }

  user: User;
  loaded: boolean = false;
  post: Post = new Post;
  link: string = "";
  invalidLink: boolean = false;

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
      })
    }
  }

  addLink(){
    if (this.link != "" && this.link.trim() != "" && this.validURL(this.link)){
      this.post.links.push(this.link);
      this.invalidLink = false;
    }
    else{
      this.invalidLink = true;
    }
    this.link = ""
  }

  addImage(){
    // TODO
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  save(){
    this.post.dateCreated = "2022-05-08T09:37:53.539Z"
    this.postService.addPost(this.post).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Post uspesno kreiran!")
        } else {
          alert("Post nije kreiran!")
        }
      })
      this.dialogRef.close();
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
