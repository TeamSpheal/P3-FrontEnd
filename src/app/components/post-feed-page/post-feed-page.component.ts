import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

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

  loggedIn: User;

  posts: Post[] = [];
  createPost = false;

  constructor(private postService: PostService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void { 

    //checks if the user is logged in, if not it routes to the log in page
    this.loggedIn = JSON.parse(<string>localStorage.getItem("user"));

    if (this.loggedIn == undefined) {
      this.router.navigate(['login']);
      console.log("in if: " + this.loggedIn);
  }

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
    this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", this.authService.currentUser, [], [], new Date()))
      .subscribe(
        (response : any) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost()
        }
      )
  }
}
