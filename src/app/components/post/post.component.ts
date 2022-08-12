import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
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
  replyToPost: boolean = false

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
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
