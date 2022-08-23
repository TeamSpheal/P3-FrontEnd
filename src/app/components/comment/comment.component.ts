import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('comment') inputComment: Post;
  replyToComment = false

  constructor(private postService: PostService, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Init to be filled in later
  }

  toggleReplyToComment = () => {
    this.replyToComment = !this.replyToComment
  }

  submitReply = (e: any) => {
    e.preventDefault()
    if(this.commentForm.value.text) {
      const newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [], [], new Date());
      this.postService.upsertPost({...this.inputComment, comments: [...this.inputComment.comments, newComment]})
        .subscribe(
          (response : any) => {
            this.inputComment = response
            this.toggleReplyToComment()
          }
        )
    } else {
      this.infoMessage('A message is required', 'Close')
      this.replyToComment = false;
    }
  }
  toggleReplyToPost = () => {
    this.replyToComment = !this.replyToComment;
  }

  infoMessage(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
