import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {
  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  posts: Post[] = [];
  createPost = false;

  constructor(private postService: PostService, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const userStorage = localStorage.getItem("user");
    const parsed = JSON.parse(<string>userStorage);
    console.log(parsed.followers)
    if (parsed.followers[0]){
      this.postService.getFollowingPostFeed(parsed.id).subscribe(
        (response : any) => {
          this.posts = response
        }
      )
    } else {
      this.postService.getAllPosts().subscribe(
        (response : any) => {
          this.posts = response
        }
      )
    }
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    if (!this.postForm.value.text && !this.postForm.value.imageUrl) {
      this.infoMessage('Text or an image is required', 'Close')
    } else {
      this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", this.authService.currentUser, [], [], new Date()))
        .subscribe(
          (response : any) => {
            this.posts = [response, ...this.posts]
            this.toggleCreatePost()
          }
        )
    }
  }


  infoMessage(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
