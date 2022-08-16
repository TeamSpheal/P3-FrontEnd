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
    /*Class Variables*/
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

    /**
     * A constructor to provide dependencies for the class
     * @param userSettingsService
     * @param router
     */
    constructor(private userSettingsService: UserSettingsService, private router: Router) { }

    /**Upon initialization, assigns values to class variables, links event listeners, and populates textboxes
     */
    ngOnInit(): void {
        /*Assign Values to Variables*/
        this.logoutBtn = <HTMLButtonElement>document.getElementById("logoutBtn");
        this.profileImg = <HTMLImageElement>document.getElementById("profileImg");
        this.imgUrlText = <HTMLInputElement>document.getElementById("imgUrlText");
        this.usernameText = <HTMLInputElement>document.getElementById("usernameText");
        this.emailText = <HTMLInputElement>document.getElementById("emailText");
        this.fNameText = <HTMLInputElement>document.getElementById("fNameText");
        this.lNameText = <HTMLInputElement>document.getElementById("lNameText");
        this.newPWText = <HTMLInputElement>document.getElementById("newPWText");
        this.confirmPWText = <HTMLInputElement>document.getElementById("confirmPWText");

        /*Event Listeners*/
        this.logoutBtn?.addEventListener("click", this.redirect()); this.loggedIn = JSON.parse(<string>sessionStorage.getItem("user"));

        console.log(sessionStorage.getItem("user"))

        /*Populating Page with data*/
        if (this.loggedIn == undefined) {//No user is logged in
            this.profileImg.src = "https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7";
            this.imgUrlText.value = "";
            this.usernameText.value = "";
            this.emailText.value = "";
            this.fNameText.value = "";
            this.lNameText.value = "";
        } else {//User is logged in
            this.displayInfo(this.loggedIn)
        }
    }

    
    /**When user clicks the update button, the image URL changes to
     * set their pfp with a new one.
     */
    async updateImage() {
        /*Local Variables*/
        let updatedUser: User = this.loggedIn;
        let newImgURL: string = this.imgUrlText.value;
        let response: User | undefined;

    /*Validate Data*/
        if (newImgURL.length <= 255) {//Image URL is 255 characters or less
            /*Setup User Object*/
            updatedUser.profileImg = newImgURL;

            /*Send request*/
            await this.userSettingsService.updateProfile(updatedUser).subscribe((data: any) => {
                //Parse data
                response = JSON.parse(JSON.stringify(data));

                //Process data
                if (response != undefined) { //Data is defined. The return from the response should contain a user object
                    this.loggedIn.profileImg = response.profileImg;
                    this.displayInfo(this.loggedIn);
                    sessionStorage.setItem("user", JSON.stringify(this.loggedIn));
                    alert(
                        "Your profile image was updated successfully"
                    );
                } else { //Data is undefined, meaning the request failed
                    alert(
                        "The server failed to update your profile image"
                    );
                }
            });
        } else {//Image URL has more than 255 characters
            alert(
                "Please limit your image url to 255 characters or less"
            );
        }

    }

    /**Validates user's input and then sends it to the service to be uploaded
     */
    async updateProfile() {
        /*Local Variables*/
        let updatedUser: User;
        let newEmail: string = this.emailText.value;
        let newUN: string = this.usernameText.value;
        let newFN: string = this.fNameText.value;
        let newLN: string = this.lNameText.value;
        let UNregex = /^[a-zA-Z0-9_\-]+$/;
        let EMregex = /^[a-z0-9_\-]{1,63}[@][a-z]{1,30}[.][a-z]{2,5}$/i
        let response: User | undefined;

        /*Validate Input*/
        //Validate username
        if (UNregex.test(newUN)) {//Username is valid
            //Validate email
            if (EMregex.test(newEmail)) {//Email is valid
                updatedUser = new User(this.loggedIn.id, newEmail, newFN, newLN, newUN, this.loggedIn.profileImg, this.loggedIn.followers, this.loggedIn.followings);

                //Send Request
                await this.userSettingsService.updateProfile(updatedUser).subscribe((data: any) => {
                    //Parse Data
                    response = JSON.parse(data);

                    //Process Data
                    if (response != undefined) { //Data is defined. The return from the response should contain a user object
                        this.loggedIn.email = response.email;
                        this.loggedIn.username = response.username;
                        this.loggedIn.firstName = response.firstName;
                        this.loggedIn.lastName = response.lastName;
                        this.displayInfo(this.loggedIn);
                        sessionStorage.setItem("user", JSON.stringify(this.loggedIn));
                        alert(
                            "Your information was updated successfully"
                        );
                    } else { //Data is undefined, meaning the request failed
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


    /**Validates user's input and then sends it to the service to be uploaded
    */
    async updatePassword() {
        /*Local Variables*/
        let pass1 = this.newPWText.value;
        let pass2 = this.confirmPWText.value;
        let PWregex = /^[0-9a-zA-Z\-\.]{4,100}$/
        let response: string | undefined;

        /*Validate passwords*/
        if (PWregex.test(pass1)) {//Password is valid
            if (pass1 == pass2) {//Passwords match
                //Send Request
                await this.userSettingsService.updatePassword(pass1, this.loggedIn).subscribe((data: any) => {
                    //Parse Data
                    response = JSON.stringify(data);

                    //Process Data
                    if (response != undefined) {//Data is defined
                        alert(
                            "Your password was updated successfully"
                        );
                    } else {//Data is undefined, meaning the request failed
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

        /*Reseting Textboxes*/
        this.newPWText.value = "";
        this.confirmPWText.value = "";
    }

    /**Redirects the user to the post-feed component if they logout
     */
    redirect(): EventListener {
        return (event) => {
            this.router.navigate(["post-feed"]);
        }
    }

    /**Displays information from the provided user object on the page
     * @param displayUser
     */
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
