import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from, of } from 'rxjs'
import { ResetPwComponent } from './reset-pw.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('ResetPwComponent', () => {
    let resetPWComp: ResetPwComponent;
    let userSettingsService: UserSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserSettingsService,
                ResetPwComponent]
        })
        resetPWComp = TestBed.inject(ResetPwComponent);
        userSettingsService = TestBed.inject(UserSettingsService);
    });

    it('Component: should create', () => {
        expect(resetPWComp).toBeTruthy();
    });

    it('ngOnInit: should set the token and password div elements to hidden', async () => {
        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"));

        /*Function*/
        resetPWComp.ngOnInit();

        /*Test*/
        expect(resetPWComp.tokenDiv.hidden).toBeTrue();
        expect(resetPWComp.confirmDiv.hidden).toBeTrue();
    });

    it('retrieveResetToken: should alert the user, set the token variable, hide the email div element, and show the token div element', async () => {
        /*Local Variables*/
        const mockTokenReq: Response = new Response(null, {
            headers: {
                "ResetToken": "Fer45Ty"
            }
        })

        /*Mocks*/
        spyOn(userSettingsService, 'getResetPWToken').and.callFake(() => {
            return from([mockTokenReq]);
        });
        spyOn(window, 'alert');
        resetPWComp.emailDiv = document.createElement("form");
        resetPWComp.tokenDiv = document.createElement("form");

        /*Function*/
        await resetPWComp.retrieveResetToken();

        /*Test*/
        expect(resetPWComp.resetToken).toBeTruthy();
        expect(window.alert).toHaveBeenCalledWith("An email has been sent to you with a token. Be sure to check the spam folder if it is not clearly seen");
        expect(resetPWComp.tokenDiv.hidden).toBeFalse();
        expect(resetPWComp.emailDiv.hidden).toBeTrue();
    });

    it('testTokenInput: should alert user of invalid token', () => {
        /*Local Variables*/
        const mockToken = "Fer45Ty";
        const mockTokenInp = "dk7yRuT";

        /*Mocks*/
        spyOn(window, 'alert');
        resetPWComp.tokenResetForm.value.token = mockTokenInp;
        resetPWComp.resetToken = mockToken;

        /*Function*/
        resetPWComp.testTokenInput();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The token you entered is invalid");
    });

    it('testTokenInput: should show password div element and hide token div element', () => {
        /*Local Variables*/
        const mockToken = "Fer45Ty";

        /*Mocks*/
        spyOn(window, 'alert');
        resetPWComp.tokenResetForm.value.token = mockToken;
        resetPWComp.resetToken = mockToken;
        resetPWComp.tokenDiv = document.createElement("form");
        resetPWComp.confirmDiv = document.createElement("form");

        /*Function*/
        resetPWComp.testTokenInput();

        /*Test*/
        expect(resetPWComp.tokenDiv.hidden).toBeTrue();
        expect(resetPWComp.confirmDiv.hidden).toBeFalse();
    });


    it('updatePW: should alert user of invalid password', async () => {
        /*Local Variables*/
        // A vaild password must be between 4 and 100 characters and not contain invalid characters
        // Side Note: Yes, these requirements are very insecure
        const mockPW: string = "hey";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        resetPWComp.confirmResetForm.value.newPass = mockPW;
        resetPWComp.confirmResetForm.value.confirmPass = mockPW;
        spyOn(window, 'alert');

        /*Function*/
        await resetPWComp.updatePW();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The password you entered is invalid. Please try again");
    });

    it('updatePW: should alert user of non-matching passwords', async () => {
        /*Local Variables*/
        // Passwords must match
        const mockPW1: string = "hello-there";
        const mockPW2: string = "general-kenobi";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        resetPWComp.confirmResetForm.value.newPass = mockPW1;
        resetPWComp.confirmResetForm.value.confirmPass = mockPW2;
        spyOn(window, 'alert');

        /*Function*/
        await resetPWComp.updatePW();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Passwords must match. Please try again");
    });

    it('updatePW: should alert user of request failure', async () => {
        /*Local Variables*/
        const mockPW = "password";

        /*Mocks*/
        spyOn(userSettingsService, 'updatePassword').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');
        resetPWComp.confirmResetForm.value.newPass = mockPW;
        resetPWComp.confirmResetForm.value.confirmPass = mockPW;


        /*Function*/
        await resetPWComp.updatePW();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The server failed to update your password");
    });

    it('updatePW: should alert user of request success', async () => {
        /*Local Variables*/
        const mockPWReq: Response = new Response("success", {
            status: 200,
            statusText: 'OK'
        });
        const mockPW = "password";

        /*Mocks*/
        spyOn(userSettingsService, 'updatePassword').and.callFake(() => {
            return from(of(mockPWReq));
        });
        spyOn(window, 'alert');
        resetPWComp.confirmResetForm.value.newPass = mockPW;
        resetPWComp.confirmResetForm.value.confirmPass = mockPW;


        /*Function*/
        await resetPWComp.updatePW();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Your password was updated successfully");
    });
});
