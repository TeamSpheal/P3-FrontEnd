import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
  createPost = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.usersPageId = +params['id'];
    })

    this.user = JSON.parse(<string>sessionStorage.getItem("user"));
    //this.usersPageId = JSON.parse(<string>sessionStorage.getItem("usersPageId"));
    console.log(this.user);
    this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
    this.usernameDisplay = <HTMLParagraphElement>document.getElementById("p-username");

    if (this.usersPageId == undefined) {
      alert("We could not find this user! You're now being redirected.")
      //this.router.navigate(["post-feed"]);
    } else {
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
      this.usernameDisplay.innerHTML = this.user.username;

      if (this.usersPageId == this.user.id) {
        this.usersPage = true;
      }
    }
  }

  windowRef: Window;

	openPopover(): void {
        this.windowRef = <Window> window.open(
          //add no opener safety feature
			'router [user-settings]', //change to window settings, probably router [user-settings]
			//'_blank', //probably opens new tab, possibly remove
			'toolbar=0,menubar=0,width=500,height=500', // see https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features for a full list of features and what they do
		)
	}

}