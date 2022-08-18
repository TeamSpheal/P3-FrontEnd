import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { __param } from 'tslib';

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
  usersPage: boolean = false;
  usersPageId: number;
  sub: any;
  posts: Post[] = [];

  constructor(private router: Router, private userService: UserService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.usersPageId = +params['id'];
      console.log(this.usersPageId);
    })
    console.log(this.usersPageId);
    this.user = JSON.parse(<string>sessionStorage.getItem("user"));
    console.log(this.user.id);
    this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
    
    if (this.usersPageId == undefined) {
      alert("We could not find this user! You're now being redirected.")
      this.router.navigate(["post-feed"]);
    } else if (this.usersPageId == this.user.id) {
      this.usersPage = true;
      this.usernameDisplay = this.user.username;
      this.nameDisplay = `${this.user.firstName} ${this.user.lastName}`;
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
    } else {
      //this.user = fetch call to back end to get user details
      this.userService.getUserById(this.usersPageId)?.subscribe((resp: any ) => {
        console.log(resp);
        this.usernameDisplay = resp.username;
        console.log(this.usernameDisplay);
        this.nameDisplay = `${resp.firstName} ${resp.lastName}`;
        console.log(this.nameDisplay);
        this.profileImg.style.backgroundImage = "URL('" + resp.profileImg + "')";
      });
    }
    
    this.postService.getAllPostsByUserID(this.usersPageId).subscribe(
      (response : any) => {
        this.posts = response
      }
    )
  }

  ngOnDestroy(): void {
    console.log('should unsub from params if working');
    //this.sub.unsubscribe();
  }

}