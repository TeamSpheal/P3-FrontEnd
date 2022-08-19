import { ListKeyManager } from '@angular/cdk/a11y';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { distinctUntilKeyChanged } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  @ViewChild("content")
  divContent: ElementRef;

  @ViewChild("numb")
  divNumb: ElementRef;

  @ViewChild("heart")
  divHeart: ElementRef;

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  users: User[];
  replyToPost = false
  
  @Input() likeCount: number;
  @Input() isActive: boolean;
  @Input() isNotActive: boolean = false;

  constructor(private postService: PostService, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("user")){
      this.authService.currentUser=JSON.parse(<string>localStorage.getItem("user"));;
    }
    this.isLiked();
  }
  
  isLiked(){
    
    this.postService.getPost(this.post)?.subscribe(
      ( resp : { users: string | any[]; }) => {
        this.likeCount = resp.users.length;
        for (let likedUsers of resp.users) {

          if (likedUsers.id == this.authService.currentUser.id) {
            this.isActive = true;
            const button = document.getElementById('likeBtn-' + this.post.id);
            button?.style.setProperty('color','#ef773b');
            button?.style.setProperty('background','#FCB414');
            
          }
        }
        if(this.isActive) {
          // this.heartContent();
        } 
      }
    )

  }

  like(){  
    const button = document.getElementById('likeBtn-' + this.post.id);
    if(!this.isActive) {
      this.postService.likePost(this.authService.currentUser.id,this.post.id)?.subscribe(
        (      resp: { users: string | any[]; }) => {
          this.likeCount = resp.users.length;
          this.isActive = true;
          button?.style.setProperty('color','#ef773b');
          button?.style.setProperty('background','#FCB414');
        }
      )
    } else {
      this.postService.unlikePost(this.authService.currentUser.id, this.post.id)?.subscribe(
        (      resp: { users: string | any[]; }) => {
          this.likeCount = resp.users.length;
          this.isActive = false;
          button?.style.setProperty('color','#ef773b');
          button?.style.setProperty('background','transparent');
        }
      )
    }
  } 




  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    const newComment = new Post(0, this.commentForm.value.text || "", "", JSON.parse(<string>localStorage.getItem("user")), [],[])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response : any) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }
}
