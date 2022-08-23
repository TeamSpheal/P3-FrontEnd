import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  followerCount: number;
  following: UserMiniDTO[];
  followingCount: number;
  usersPage = false;
  usersPageId: number;
  sub: any;
  posts: Post[] = [];
  postCount = 0;
  @Input() text: string = 'Follow';

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
      this.followerCount = this.user.followers.length;
      this.followingCount = this.user.following.length;
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
    } else {
      //this.user = fetch call to back end to get user details
      this.userService.getUserById(this.usersPageId)?.subscribe((resp: any ) => {
        this.usernameDisplay = resp.username;
        this.nameDisplay = `${resp.firstName} ${resp.lastName}`;
        console.log('current profiles followers');
        console.log(resp.followers)
        this.followerCount = resp.followers.length;
        console.log('accounts the current profile is following');
        console.log(resp.following);
        this.followingCount = resp.following.length;
        this.profileImg.style.backgroundImage = "URL('" + resp.profileImg + "')";

        if(resp.followers.includes(this.user.id)){
          console.log('contains id!');
          this.changeBtn();
        } else {
          console.log('does not contain id!');
        }
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

  changeBtn() {
    this.text = "unfollow"; 
    let btn: HTMLButtonElement = document.getElementById("follow") as HTMLButtonElement; 
    btn.innerText = this.text; 
    btn.style.backgroundColor = "#FCB414DF"; 
  }

}