import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy{

  user: User = {} as User;
  profileImg: HTMLDivElement;
  usernameDisplay: HTMLParagraphElement;
  usersPage: boolean = false;
  usersPageId: number;
  sub: any;
  route: ActivatedRoute;
  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  posts: Post[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.usersPageId = +params['id'];
    })

    
    if (this.usersPageId == undefined) {
      alert("We could not find this user! You're now being redirected.")
      this.router.navigate(["post-feed"]);
    } else if (this.usersPageId == this.user.id) {
      this.user = JSON.parse(<string>sessionStorage.getItem("user"));
      this.usersPage = true;
    } else {
      //this.user = fetch call to back end to get user details
      //this.user = 0;
    }
    console.log(this.user);

    this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
    this.usernameDisplay = <HTMLParagraphElement>document.getElementById("prof-username");
    this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
    this.usernameDisplay.innerHTML = this.user.username;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}