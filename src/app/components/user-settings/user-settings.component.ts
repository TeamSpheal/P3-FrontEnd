import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';

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

    constructor(private userSettingsService: UserSettingsService, private router: Router) { }

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
    updateImage() {
      let updatedUser: User;  
      this.profileImg.src = this.imgUrlText.value;
      updatedUser = this.loggedIn;
      updatedUser.profileImg = this.imgUrlText.value;
    }

    updateProfile() {
        let updatedUser: User;
        let newEmail: string = this.emailText.value;
        let newUN: string = this.usernameText.value;
        let newFN: string = this.fNameText.value;
        let newLN: string = this.lNameText.value;
        let UNregex = /^[a-zA-Z0-9_\-]+$/;
        let EMregex = /^[a-z0-9_\-]{1,63}[@][a-z]{1,30}[.][a-z]{2,5}$/i
        let response: string| undefined = undefined;

        //Validate Input
        //Validate username
        if (UNregex.test(newUN)) {//Username is valid
            //Validate email
            if (EMregex.test(newEmail)) {//Email is valid
                updatedUser = new User(this.loggedIn.id, newEmail, newFN, newLN, newUN, this.loggedIn.profileImg);
                response = this.userSettingsService.updateProfile(updatedUser);
            } else {//Email is invalid
                alert(
                    "The email you entered is invalid. Please try again"
                );
            }
        } else {//Username is invalid
            alert(
                "The username you entered is invalid. Please try again"
            );
        }

        //Update loggedIn object if necessary
        if (response != undefined) {
            this.loggedIn.username = newUN;
            this.loggedIn.email = newEmail;
            this.loggedIn.firstName = newFN;
            this.loggedIn.lastName = newLN;
            sessionStorage.setItem("user", JSON.stringify(this.loggedIn));
        } else {
            alert(
                "The server failed to update your account"
            );
        }
    }

    updatePassword() {
        let pass1 = this.newPWText.value;
        let pass2 = this.confirmPWText.value;
        let PWregex = /^[0-9a-zA-Z\-\.]{4,100}$/
        let response: string | undefined = undefined;

        //Validate passwords
        if (PWregex.test(pass1)) {//Password is valid
            if (pass1 == pass2) {//Passwords match
                response = this.userSettingsService.updatePassword(pass1, this.loggedIn);
            } else {//Passwords do not match
                alert(
                    "Passwords must match. Please try again"
                );
            }
        } else {//Password is invalid
            alert(
                "The password you entered is invalid. Please try again"
            );
        }

        //Alert user for failed requests
        if (response == undefined) {
            alert(
                "The server failed to update your account"
            );
        }
    }
}