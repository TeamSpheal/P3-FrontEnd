import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>sessionStorage.getItem("user"));
    this.usersPageId = JSON.parse(<string>sessionStorage.getItem("usersPageId"));
    console.log(this.user);
    this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
    this.usernameDisplay = <HTMLParagraphElement>document.getElementById("p-username");

    if (this.usersPageId == undefined) {
      alert("We could not find this user! You're now being redirected.")
      this.router.navigate(["post-feed"]);
    } else {
      this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
      this.usernameDisplay.innerHTML = this.user.username;

      if (this.usersPageId == this.user.id) {
        this.usersPage = true;
      }
    }
  }

}
