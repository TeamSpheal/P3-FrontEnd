import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpResponse } from '@angular/common/http';
import User from '../../models/User';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset-pw',
    templateUrl: './reset-pw.component.html',
    styleUrls: ['./reset-pw.component.css']
})
export class ResetPwComponent implements OnInit {
    /*Class Variables*/
    resetUser: User;
    resetToken: string;
    emailDiv: HTMLFormElement;
    tokenDiv: HTMLFormElement;
    confirmDiv: HTMLFormElement;

    /*Form Groups*/
    emailResetForm = new FormGroup({
        email: new FormControl(''),
    })

    tokenResetForm = new FormGroup({
        token: new FormControl(''),
    })

    confirmResetForm = new FormGroup({
        newPass: new FormControl(''),
        confirmPass: new FormControl('')
    })
    
    /**
     * A constructor to provide dependencies for the class
     * @param userSettingsService
     */
    constructor(private userSettingsService: UserSettingsService, private router: Router) { }

    /**Upon initialization, assigns values to class variables and hide the necessary div elements 
     */
    ngOnInit(): void {
        this.emailDiv = <HTMLFormElement>document.getElementById('emailReset');
        this.tokenDiv = <HTMLFormElement>document.getElementById('tokenReset');
        this.confirmDiv = <HTMLFormElement>document.getElementById('confirmReset');
        this.tokenDiv.hidden = true;
        this.confirmDiv.hidden = true;
    }

    /**
     * Sends a request along with a email to the backend
     * If the an account with that email exists, An email will be sent to that user and the token will be in that email
     * Also, the token is returned to the front-end to be referenced later
     */
    retrieveResetToken() {
        /*Send Request*/
        this.userSettingsService.getResetPWToken(<string>this.emailResetForm.value.email).subscribe((response: HttpResponse<any>) => {
            /*Retrieve Token from response headers*/
            localStorage.setItem("PWRT", <string>response.headers.get("ResetToken"));
            this.resetToken = <string>localStorage.getItem("PWRT");
            this.resetUser = JSON.parse(JSON.stringify(response.body));
            
            /*Alert user*/
            alert("An email has been sent to you with a token. Be sure to check the spam folder if it is not clearly seen");

            /*Show the next div element*/
            this.emailDiv.hidden = true;
            this.tokenDiv.hidden = false;

        })

    }

    /**Compares the user's input for the token to the previously retrieved token and adjusts accordingly
     */
    testTokenInput() {
        if (<string>this.tokenResetForm.value.token == this.resetToken) {//Token input matches what was retrieved front the request header
            /*Show next div element*/
            this.tokenDiv.hidden = true;
            this.confirmDiv.hidden = false;
        } else {//Token input does not match
            alert("The token you entered is invalid");
        }
    }

    /**Validates user's input and then sends it to the service to be uploaded
    */
    async updatePW() {
        /*Local Variables*/
        const pass1: string = <string>this.confirmResetForm.value.newPass; //= newPWText.value
        const pass2: string = <string>this.confirmResetForm.value.confirmPass; //= confirmPWText.value
        const PWregex = /^[0-9a-zA-Z-\.]{4,100}$/
        let response: string | undefined;

        /*Validate passwords*/
        if (PWregex.test(pass1)) {//Password is valid
            if (pass1 == pass2) {//Passwords match
                //Send Request
                await this.userSettingsService.updatePassword(pass1, this.resetUser).subscribe((data: any) => {
                    //Parse Data
                    if (data != undefined) {
                        response = JSON.stringify(data);
                    }

                    //Process Data
                    if (response != undefined) {//Data is defined
                        alert(
                            "Your password was updated successfully"
                        );

                        this.router.navigate(["/login"]);

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
        this.confirmResetForm.value.newPass = "";
        this.confirmResetForm.value.confirmPass = "";
    }
}
