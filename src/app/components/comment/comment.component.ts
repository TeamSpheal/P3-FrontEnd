import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Post from "src/app/models/Post";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { ProfanityFilterService } from "src/app/services/profanity-filter.service";
import UserMiniDTO from "src/app/models/UserMiniDTO";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  replyState = false;
  commentForm = new FormGroup({
    text: new FormControl(""),
  });

  @Input("comment") inputComment: Post;
  replyToComment = false;
  likeState = "Like";
  @Input() likeCount: number;
  @Input() isActive: boolean;
  @Input() isNotActive = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private profanityService: ProfanityFilterService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.authService.currentUser = JSON.parse(
        <string>localStorage.getItem("user")
      );
    }

    this.likeCount = this.inputComment.users.length;
  }
  isLiked() {
    const curUser = new UserMiniDTO(
      this.authService.currentUser.id,
      this.authService.currentUser.username,
      this.authService.currentUser.profileImg
    );

    const likedIds = this.inputComment.users.map((x) => x.id);

    const button = document.getElementById("rlikeBtn-" + this.inputComment.id);

    if (likedIds.includes(curUser.id)) {
      this.isActive = true;
      this.likeState = "Liked";
      button?.style.setProperty("color", "#ef773b");
    } else {
      this.isActive = false;
      this.likeState = "Like";
      button?.style.setProperty("color", "unset");
    }
  }

  ngAfterViewInit() {
    this.isLiked();
  }

  like() {
    const button = document.getElementById("rlikeBtn-" + this.inputComment.id);

    if (!this.isActive) {
      this.postService
        .likePost(this.authService.currentUser.id, this.inputComment.id)
        ?.subscribe((resp: { users: string | any[] }) => {
          this.likeCount = resp.users.length;
          this.isActive = true;
          this.likeState = "Liked";
          button?.style.setProperty("color", "#ef773b");
        });
    } else {
      this.postService
        .unlikePost(this.authService.currentUser.id, this.inputComment.id)
        ?.subscribe((resp: { users: string | any[] }) => {
          this.likeCount = resp.users.length;
          this.isActive = false;
          this.likeState = "Like";
          button?.style.setProperty("color", "unset");
        });
    }
  }

  toggleReplyToComment = () => {
    const reply = document.getElementById("replyBtn-" + this.inputComment.id);
    this.replyToComment = !this.replyToComment;
    this.replyState = !this.replyState;

    if (this.replyState) {
      reply?.style.setProperty("color", "#ef773b");
    } else {
      reply?.style.setProperty("color", "unset");
    }
  };

  submitReply = (e: any) => {
    e.preventDefault();
    if (this.commentForm.value.text) {
      // Mike added this line here for profanity filter
      this.commentForm.value.text = this.profanityService.cleanText(
        this.commentForm.value.text
      );

      const newComment = new Post(
        0,
        this.commentForm.value.text || "",
        "",
        this.authService.currentUser,
        [],
        [],
        new Date()
      );
      
      this.postService
        .upsertPost({
          ...this.inputComment,
          comments: [...this.inputComment.comments, newComment],
        })
        .subscribe((response: any) => {
          this.inputComment = response;
          this.toggleReplyToComment();
        });
    } else {
      console.log("error");
      this.replyToComment = false;
    }
  };
}
