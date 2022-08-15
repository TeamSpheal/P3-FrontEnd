import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  replyToPost: boolean = false
  @Input() likeCount: number;
  @Input() isActive: boolean;

  constructor(private postService: PostService, private authService: AuthService) {
   }

   

  ngOnInit(): void {
  }

  like(){  
    this.postService.likePost(this.authService.currentUser.id,this.post.id)?.subscribe(
      resp => {    
        this.likeCount = resp.users.length;
      }
    )
		this.isActive = !this.isActive;
    let content = document.getElementById('content');
    let heart = document.getElementById('heart');

    if(!this.isActive)
    {content?.style.setProperty('background-color', 'white')
    this.postService.unlikePost(this.authService.currentUser.id, this.post.id)?.subscribe(
      resp => {
        this.likeCount = resp.users.length;
      }
    )} 
    else{
    content?.style.setProperty('background-color', '#f9b9c4');
    heart?.style.setProperty('border-color', '#f9b9c4');
    }
    
  }




  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", JSON.parse(<string>sessionStorage.getItem("user")), [],[])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response : any) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }

  heartContent(event: any) {
    this.divContent.nativeElement.classList.toggle("heart-active");
    this.divNumb.nativeElement.classList.toggle("heart-active");
    this.divHeart.nativeElement.classList.toggle("heart-active");
    /*$('.content').toggleClass("heart-active")

    $('.numb').toggleClass("heart-active")
    $('.heart').toggleClass("heart-active")*/
  }
}
