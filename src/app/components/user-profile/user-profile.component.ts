import { Component, OnDestroy, OnInit } from '@angular/core';
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

export class UserProfileComponent implements OnInit, OnDestroy{

  user: User = {} as User;
  profileImg: HTMLDivElement;
  usernameDisplay: string;
  nameDisplay: string;
  followers: UserMiniDTO[];
  following: UserMiniDTO[];
  usersPage = false;
  usersPageId: number;
  sub: any;
  posts: Post[] = [];
  postCount = 0;
  constructor(private router: Router, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    //gets id from param
    this.sub = this.route.params.subscribe(params => {
      this.usersPageId = +params['id'];
      console.log(this.usersPageId);
    })
    
    this.user = JSON.parse(<string>localStorage.getItem("user"));
    console.log(this.user.id);
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
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
    } else {
      //this.user = fetch call to back end to get user details
      this.userService.getUserById(this.usersPageId)?.subscribe((resp: any ) => {
        this.usernameDisplay = resp.username;
        this.nameDisplay = `${resp.firstName} ${resp.lastName}`;
        this.followers = resp.followers;
        console.log('user service was called');
        console.log(this.followers.length + 'followers length');
        this.following = resp.following;
        //console.log(this.followings.length + 'followings length');
        this.profileImg.style.backgroundImage = "URL('" + resp.profileImg + "')";
      });
    }
    
    this.postService.getUsersPosts(this.usersPageId).subscribe(
      (response : any) => {
        console.log(response)
        this.posts = response
        this.postCount = this.posts.length;
      }
    )
  }

  ngOnDestroy(): void {
    //console.log('should unsub from params if working');
    this.sub.unsubscribe();
  }

}