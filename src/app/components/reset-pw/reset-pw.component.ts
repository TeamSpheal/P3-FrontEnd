import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpResponse } from '@angular/common/http';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import User from '../../models/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset-pw',
    templateUrl: './reset-pw.component.html',
    styleUrls: ['./reset-pw.component.css']
})
export class ResetPwComponent implements OnInit {

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

    resetUser: User;

    resetToken: string;

    emailDiv: HTMLFormElement;

    tokenDiv: HTMLFormElement;

    confirmDiv: HTMLFormElement;




    /**
     * A constructor to provide dependencies for the class
     * @param userSettingsService
     */
    constructor(private userSettingsService: UserSettingsService, private router:Router) { }

    ngOnInit(): void {


        this.emailDiv = <HTMLFormElement> document.getElementById('emailReset');

        this.tokenDiv = <HTMLFormElement> document.getElementById('tokenReset');

        this.confirmDiv = <HTMLFormElement> document.getElementById('confirmReset');



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

        console.log("THIS IS BARRY'S MOM: " + <string>this.emailResetForm.value.email);

        this.userSettingsService.getResetPWToken(<string>this.emailResetForm.value.email).subscribe((response: HttpResponse<any>) => {
            /*Retrieve Token from response headers*/
            //console.log("Hi bArry: " + JSON.stringify(response.body));

            sessionStorage.setItem("PWRT", <string>response.headers.get("ResetToken"));
            this.resetToken = <string>sessionStorage.getItem("PWRT");
            this.resetUser = JSON.parse(JSON.stringify(response.body));

            alert("An email has been sent to you with a token. Be sure to check the spam folder if it is not clearly seen");
            this.emailDiv.hidden = true;
            this.tokenDiv.hidden = false;

        })

    }

    testTokenInput() {
        if (<string>this.tokenResetForm.value.token == this.resetToken) {

            this.tokenDiv.hidden = true;
            this.confirmDiv.hidden = false;

        } else {
            alert("The token you entered is invalid");

        }
    }

    async updatePW() {
        /*Local Variables*/
        let pass1: string = <string>this.confirmResetForm.value.newPass; //= newPWText.value
        let pass2: string = <string>this.confirmResetForm.value.confirmPass; //= confirmPWText.value
        const PWregex = /^[0-9a-zA-Z-\.]{4,100}$/
        let response: string | undefined;

        /*Validate passwords*/
        if (PWregex.test(pass1)) {//Password is valid
            if (pass1 == pass2) {//Passwords match
                //Send Request
                await this.userSettingsService.updatePassword(pass1, this.resetUser).subscribe((data: any) => {
                    //Parse Data
                    response = JSON.stringify(data);

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
