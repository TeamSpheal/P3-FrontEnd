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
    logoutBtn: HTMLButtonElement | null;
    userSettingsDiv: HTMLDivElement;
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
        this.logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
        this.profileImg = <HTMLImageElement>document.getElementById("profileImg");
        this.imgUrlText = <HTMLInputElement>document.getElementById("imgUrlText");
        this.usernameText = <HTMLInputElement>document.getElementById("usernameText");
        this.emailText = <HTMLInputElement>document.getElementById("emailText");
        this.fNameText = <HTMLInputElement>document.getElementById("fNameText");
        this.lNameText = <HTMLInputElement>document.getElementById("lNameText");
        this.newPWText = <HTMLInputElement>document.getElementById("newPWText");
        this.confirmPWText = <HTMLInputElement>document.getElementById("confirmPWText");

        this.logoutBtn?.addEventListener("click", this.redirect()); this.loggedIn = JSON.parse(<string>sessionStorage.getItem("user"));

        console.log(sessionStorage.getItem("user"))

        if (this.loggedIn == undefined) {
            this.profileImg.src = "https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7";
            this.imgUrlText.value = "";
            this.usernameText.value = "";
            this.emailText.value = "";
            this.fNameText.value = "";
            this.lNameText.value = "";
        } else {
            this.displayInfo(this.loggedIn)
        }
    }

    // When user clicks the update button, the image URL changes to
    // set their pfp with a new one.
    async updateImage() {
        let updatedUser: User;
        let response: User | undefined;
        updatedUser = this.loggedIn;
        updatedUser.profileImg = this.imgUrlText.value;

        await this.userSettingsService.updateProfile(updatedUser).subscribe((data: any) => {
            response = JSON.parse(JSON.stringify(data));

            if (response != undefined) {
                this.loggedIn.profileImg = response.profileImg;
                this.displayInfo(this.loggedIn);
                sessionStorage.setItem("user", JSON.stringify(this.loggedIn));
                alert(
                    "Your profile image was updated successfully"
                );
            } else {
                alert(
                    "The server failed to update your profile image"
                );
            }
        });

    }

    async updateProfile() {
        let updatedUser: User;
        let newEmail: string = this.emailText.value;
        let newUN: string = this.usernameText.value;
        let newFN: string = this.fNameText.value;
        let newLN: string = this.lNameText.value;
        let UNregex = /^[a-zA-Z0-9_\-]+$/;
        let EMregex = /^[a-z0-9_\-]{1,63}[@][a-z]{1,30}[.][a-z]{2,5}$/i
        let response: User | undefined;

        //Validate Input
        //Validate username
        if (UNregex.test(newUN)) {//Username is valid
            //Validate email
            if (EMregex.test(newEmail)) {//Email is valid
                updatedUser = new User(this.loggedIn.id, newEmail, newFN, newLN, newUN, this.loggedIn.profileImg, this.loggedIn.followers, this.loggedIn.followings);
                await this.userSettingsService.updateProfile(updatedUser).subscribe((data: any) => {
                    response = JSON.parse(data);

                    if (response != undefined) {
                        this.loggedIn.email = response.email;
                        this.loggedIn.username = response.username;
                        this.loggedIn.firstName = response.firstName;
                        this.loggedIn.lastName = response.lastName;
                        this.displayInfo(this.loggedIn);
                        sessionStorage.setItem("user", JSON.stringify(this.loggedIn));
                        alert(
                            "Your information was updated successfully"
                        );
                    } else {
                        alert(
                            "The server failed to update your profile"
                        );
                    }
                });
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
    }

    async updatePassword() {
        let pass1 = this.newPWText.value;
        let pass2 = this.confirmPWText.value;
        let PWregex = /^[0-9a-zA-Z\-\.]{4,100}$/
        let response: string | undefined;

        //Validate passwords
        if (PWregex.test(pass1)) {//Password is valid
            if (pass1 == pass2) {//Passwords match
                await this.userSettingsService.updatePassword(pass1, this.loggedIn).subscribe((data: any) => {
                    response = JSON.stringify(data);
                    if (response != undefined) {
                        alert(
                            "Your password was updated successfully"
                        );
                    } else {
                        alert(
                            "The server failed to update your password"
                        );
                    }
                });
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

        this.newPWText.value = "";
        this.confirmPWText.value = "";
    }

    redirect(): EventListener {
        return (event) => {
            this.router.navigate(["post-feed"]);
        }
    }

    displayInfo(displayUser: User) {
        this.profileImg.src = displayUser.profileImg;
        this.imgUrlText.value = displayUser.profileImg;
        this.usernameText.value = displayUser.username;
        this.emailText.value = displayUser.email;
        this.fNameText.value = displayUser.firstName;
        this.lNameText.value = displayUser.lastName;
        this.newPWText.value = "";
        this.confirmPWText.value = "";
    }
}
