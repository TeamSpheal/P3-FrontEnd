import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import UserMiniDTO from 'src/app/models/UserMiniDTO';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

    user: User = {} as User;
    userMiniDTO: UserMiniDTO;
    profileImg: HTMLDivElement;
    usernameDisplay: string;
    nameDisplay: string;
    followers: UserMiniDTO[];
    following: UserMiniDTO[];
    followerCount: number;
    followingCount: number;
    usersPage = false;
    usersPageId: number;
    sub: any;
    posts: Post[] = [];
    postCount = 0;
    loggedIn: User;
    constructor(private router: Router, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    //checks if the user is logged in, if not it routes to the log in page
    this.loggedIn = JSON.parse(<string>localStorage.getItem("user"));

    if (this.loggedIn == undefined) {
        this.router.navigate(['login']);
        console.log("in if: " + this.loggedIn);
    }

    //gets id from param
    this.sub = this.route.params.subscribe(params => {
      this.usersPageId = +params['id'];
      localStorage.setItem("usersPageId", this.usersPageId.toString());
    })

    //gets id from logged in user
    this.user = JSON.parse(<string>localStorage.getItem("user"));
    this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
    
    if (this.usersPageId == undefined) {
      alert("We could not find this user! You're now being redirected.")
      this.router.navigate(["post-feed"]);
    } else if (this.usersPageId == this.user.id) {
      this.usersPage = true;
      this.usernameDisplay = this.user.username;
      this.nameDisplay = `${this.user.firstName} ${this.user.lastName}`;
      this.followers = this.user.followers;
      this.following = this.user.following;
      this.followerCount = this.user.followers.length;
      this.followingCount = this.user.following.length;
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
    } else {
      //this.user = fetch call to back end to get user details
      this.userService.getUserById(this.usersPageId)?.subscribe((resp: any ) => {
        this.usernameDisplay = resp.username;
        this.nameDisplay = `${resp.firstName} ${resp.lastName}`;
        this.followers = resp.followers;
        this.following = resp.following;
        this.followerCount = resp.followers.length;
        this.followingCount = resp.following.length;
        this.profileImg.style.backgroundImage = "URL('" + resp.profileImg + "')";
        this.userMiniDTO = new UserMiniDTO(resp.id, resp.username, resp.profileImg);
        localStorage.setItem("viewingUser", JSON.stringify(this.userMiniDTO));
      });
    }
    
    this.postService.getAllPostsByUserID(this.usersPageId).subscribe(
      (response : any) => {
        console.log(response)
        this.posts = response
        this.postCount = this.posts.length;
      }
    )
  }
}