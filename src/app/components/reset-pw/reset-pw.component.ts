import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpResponse } from '@angular/common/http';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import User from '../../models/User';

@Component({
    selector: 'app-reset-pw',
    templateUrl: './reset-pw.component.html',
    styleUrls: ['./reset-pw.component.css']
})
export class ResetPwComponent implements OnInit {
    emailText: HTMLInputElement;
    tokenText: HTMLInputElement;
    email: string;
    token: string;
    resetUser: User;


    /**
     * A constructor to provide dependencies for the class
     * @param userSettingsService
     */
    constructor(private userSettingsService: UserSettingsService) { }

    ngOnInit(): void {
    }

    /**
     * Sends a request along with a email to the backend
     * If the an account with that email exists, An email will be sent to that user and the token will be in that email
     * Also, the token is returned to the front-end to be referenced later
     */
    retrieveResetToken() {
        //Intialize emailText with HTMLElement
        //Get the value from the email textbox
        /*Send Request*/
        this.userSettingsService.getResetPWToken(this.email).subscribe((response: HttpResponse<any>) => {
            /*Retrieve Token from response headers*/
            sessionStorage.setItem("PWRT", <string>response.headers.get("ResetToken"));
            this.token = <string>sessionStorage.getItem("PWRT");
            this.resetUser = JSON.parse(response.body);
        })

        alert("An email has been sent to you with a token. Be sure to check the spam folder if it is not clearly seen");
        //Show tokenDiv
    }

    testTokenInput() {
        if (this.tokenText.value == this.token) {

            //Show passwordDiv
        } else {
            //alert
        }
    }

    async updatePW() {
        /*Local Variables*/
        let pass1: string = ""; //= newPWText.value
        let pass2: string = ""; //= confirmPWText.value
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
        //this.newPWText.value = "";
        //this.confirmPWText.value = "";
    }
    
}
