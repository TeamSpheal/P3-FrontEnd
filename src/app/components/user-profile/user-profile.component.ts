import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {} as User;
  profileImg: HTMLDivElement;
  usernameDisplay: HTMLParagraphElement;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>sessionStorage.getItem("user"));
      console.log(this.user);
      this.profileImg = <HTMLDivElement>document.getElementById("user-circle");
      this.usernameDisplay = <HTMLParagraphElement>document.getElementById("p-username");
      if (this.user == undefined) {
        this.profileImg.style.backgroundImage = "URL('https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7')";
        this.usernameDisplay.innerHTML = "Anonymous";
      } else {
        this.profileImg.style.backgroundImage = "URL('" + this.user.profileImg + "')";
        this.usernameDisplay.innerHTML = this.user.username;
      }
  }

}
