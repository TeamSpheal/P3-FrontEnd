import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import UserMiniDTO from 'src/app/models/UserMiniDTO';
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
  @Input() likeCount: number;
  @Input() isActive: boolean;
  @Input() isNotActive = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")){
      this.authService.currentUser=JSON.parse(<string>localStorage.getItem("user"));
    }
    //this.isLiked();

    this.likeCount = this.inputComment.users.length;
    // Init to be filled in later
  }
  isLiked(){

    const curUser = new UserMiniDTO(this.authService.currentUser.id,
                                    this.authService.currentUser.username,
                                    this.authService.currentUser.profileImg);

    const likedIds = this.inputComment.users.map(x =>x.id);

    const button = document.getElementById('likeBtn-' + this.inputComment.id);


    if ( likedIds.includes(curUser.id) ){
      this.isActive = true;
      
      button?.style.setProperty('color','#ef773b');
      button?.style.setProperty('background','#FCB414');

      //console.log(button?.style.getPropertyValue('background'));
    }
    else {
      this.isActive = false;
      button?.style.setProperty('background','transparent');
    }
  }

  ngAfterViewInit() {
    this.isLiked();
  }

  like(){  
    const button = document.getElementById('likeBtn-' + this.inputComment.id);

    if(!this.isActive) {
      this.postService.likePost(this.authService.currentUser.id,this.inputComment.id)?.subscribe(
        (      resp: { users: string | any[]; }) => {
          this.likeCount = resp.users.length;
          this.isActive = true;
          button?.style.setProperty('color','#ef773b');
          button?.style.setProperty('background','#FCB414');
        }
      )
    } else {
      this.postService.unlikePost(this.authService.currentUser.id, this.inputComment.id)?.subscribe(
        (      resp: { users: string | any[]; }) => {
          this.likeCount = resp.users.length;
          this.isActive = false;
          button?.style.setProperty('color','#ef773b');
          button?.style.setProperty('background','transparent');
        }
      )
    }
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
      console.log("error")
      this.replyToComment = false;
    }
  }
  toggleReplyToPost = () => {
    this.replyToComment = !this.replyToComment;
  }


}
