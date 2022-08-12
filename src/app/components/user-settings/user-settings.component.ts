import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
    profileImg: HTMLImageElement;
    imgUrlText: HTMLInputElement;
    usernameText: HTMLInputElement;
    emailText: HTMLInputElement;
    fNameText: HTMLInputElement;
    lNameText: HTMLInputElement;
    newPWText: HTMLInputElement;
    confirmPWText: HTMLInputElement;
    loggedIn: User;
    imageURLInput = "";

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.profileImg = <HTMLImageElement>document.getElementById("profileImg");
        this.imgUrlText = <HTMLInputElement>document.getElementById("imgUrlText");
        this.usernameText = <HTMLInputElement>document.getElementById("usernameText");
        this.emailText = <HTMLInputElement>document.getElementById("emailText");
        this.fNameText = <HTMLInputElement>document.getElementById("fNameText");
        this.lNameText = <HTMLInputElement>document.getElementById("lNameText");
        this.newPWText = <HTMLInputElement>document.getElementById("newPWText");
        this.confirmPWText = <HTMLInputElement>document.getElementById("confirmPWText");
        this.loggedIn = JSON.parse(<string>sessionStorage.getItem("user"));
                
        if (this.loggedIn == undefined) {
            this.profileImg.src = "https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7";
            this.imgUrlText.value = "";
            this.usernameText.value = "";
            this.emailText.value = "";
            this.fNameText.value = "";
            this.lNameText.value = "";
            this.router.navigate(["post-feed"])
        } else {
            this.profileImg.src = this.loggedIn.profileImg;
            this.imgUrlText.value = this.loggedIn.profileImg;
            this.usernameText.value = this.loggedIn.username
            this.emailText.value = this.loggedIn.email;
            this.fNameText.value = this.loggedIn.firstName;
            this.lNameText.value = this.loggedIn.lastName;
        }
  }
  // When user clicks the update button, the image URL changes to
  // set their pfp with a new one.
  updateImage(){
    this.imageURLInput = (<HTMLInputElement>document.getElementById("imgUrlText")).value;
    let img = document.getElementById("profileImg") as HTMLImageElement;
    img.src = this.imageURLInput;
  }

  updateProfile(){

  }

  updatePassword(){
    
  }
}
