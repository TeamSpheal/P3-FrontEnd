import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import User from '../../models/User';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('UserSettingsComponent', () => {
    /*Suite Variables*/
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    let userSettComp: UserSettingsComponent;
    let userSettingsService: UserSettingsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserSettingsService,
                UserSettingsComponent]
        })
        userSettComp = TestBed.inject(UserSettingsComponent);
        userSettingsService = TestBed.inject(UserSettingsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Component: should create', () => {
        expect(userSettComp).toBeTruthy();
    });

    it('ngOnInit: should set a value to loggedIn if sessionStorage is not null', async () => {
        /*Local Variables*/
        const mockJSON: string = JSON.stringify(mockUser);

        /*Mocks*/
        spyOn(sessionStorage, 'getItem').and.returnValue(mockJSON);
        spyOn(userSettComp, 'displayInfo').and.callFake(() => {/*Do Nothing*/ })

        /*Function*/
        userSettComp.ngOnInit();

        /*Test*/
        expect(userSettComp.loggedIn).toBeTruthy();
    });

    it('ngOnInit: should not set a value to loggedIn if sessionStorage is null', async () => {
        /*Mocks*/
        spyOn(sessionStorage, 'getItem').and.returnValue(null);
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"));

        /*Function*/
        userSettComp.ngOnInit();

        /*Test*/
        expect(userSettComp.loggedIn).toBeFalsy();
    });

    it('updateImage: should alert user of invalid image URL', async () => {
        /*Local Variables*/
        //This string is exactly 256 characters long
        const mockImgURL: string = "http://randomimagegenerator.com/fakeurl/image/arbitraryidforfakeimage/"
            + "GtH675rfgtifnre948gnrkfjdvnw4uigbkreu5n4g985gbnlasdkhgb5iugbelkg85gu8skjgb3qp438bgtubiwerj4p3e"
            + "587htgqp9e203gnvksrhbgkaegpbveriuabgvakwujrgnqiaebvnbrtiung45wieurgvnqwp3geiurgnnvtiughhttyp";
        const mockUrlLength: number = mockImgURL.length

        /*Mocks*/
        userSettComp.imgUrlText = document.createElement("input");
        userSettComp.imgUrlText.value = mockImgURL;
        spyOn(window, 'alert');

        /*Function*/
        userSettComp.updateImage();

        /*Test*/
        expect(mockUrlLength).toBeGreaterThan(255);
        expect(window.alert).toHaveBeenCalledWith("Please limit your image url to 255 characters or less");
    });

    it('updateImage: should not alert user when input is valid', async () => {
        /*Local Variables*/
        //This string is exactly 255 characters long
        const mockImgURL: string = "http://randomimagegenerator.com/fakeurl/image/arbitraryidforfakeimage/"
            + "GtH675rfgtifnre948gnrkfjdvnw4uigbkreu5n4g985gbnlasdkhgb5iugbelkg85gu8skjgb3qp438bgtubiwerj4p3e"
            + "587htgqp9e203gnvksrhbgkaegpbveriuabgvakwujrgnqiaebvnbrtiung45wieurgvnqwp3geiurgnnvtiughhttp";

        /*Mocks*/
        userSettComp.imgUrlText = document.createElement("input");
        userSettComp.imgUrlText.value = mockImgURL;
        spyOn(window, 'alert');

        /*Function*/
        userSettComp.updateImage();

        /*Test*/
        expect(window.alert).not.toHaveBeenCalled();
    });

    it('updateProfile: should alert user of invalid username', async () => {
        /*Local Variables*/
        // '@', '(', ')', and '#' are all invalid characters
        const mockUN: string = "R@nD()M#1";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.usernameText = document.createElement("input");
        userSettComp.emailText = document.createElement("input");
        userSettComp.fNameText = document.createElement("input");
        userSettComp.lNameText = document.createElement("input");
        userSettComp.usernameText.value = mockUN;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The username you entered is invalid. Please try again");
    });

    it('updateProfile: should alert user of invalid email', async () => {
        /*Local Variables*/
        const mockUN: string = "Random_1";
        // A vaild email must contain '@' and '.' in specific places and cannot contain invalid characters
        const mockEM: string = "randomem*i|ATgmailDOTc{}m";

        /*Mocks*/
        userSettComp.usernameText = document.createElement("input");
        userSettComp.emailText = document.createElement("input");
        userSettComp.fNameText = document.createElement("input");
        userSettComp.lNameText = document.createElement("input");
        userSettComp.usernameText.value = mockUN;
        userSettComp.emailText.value = mockEM;
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The email you entered is invalid. Please try again");
    });

    it('updateProfile: should not alert user when input is valid', async () => {
        /*Local Variables*/
        const mockUN: string = "Random_1";
        // A vaild email must contain '@' and '.' in specific places and cannot contain invalid characters
        const mockEM: string = "rand0M_Ema1l@gmail.com";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.usernameText = document.createElement("input");
        userSettComp.emailText = document.createElement("input");
        userSettComp.fNameText = document.createElement("input");
        userSettComp.lNameText = document.createElement("input");
        userSettComp.usernameText.value = mockUN;
        userSettComp.emailText.value = mockEM;
        userSettComp.loggedIn = mockUser;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).not.toHaveBeenCalled();
    });

    it('updatePassword: should alert user of invalid password', async () => {
        /*Local Variables*/
        // A vaild password must be between 4 and 100 characters and not contain invalid characters
        // Side Note: Yes, these requirements are very insecure
        const mockPW: string = "hey";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.newPWText = document.createElement("input");
        userSettComp.confirmPWText = document.createElement("input");
        userSettComp.newPWText.value = mockPW;
        userSettComp.confirmPWText.value = mockPW;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The password you entered is invalid. Please try again");
    });

    it('updatePassword: should alert user of non-matching passwords', async () => {
        /*Local Variables*/
        // Passwords must match
        const mockPW1: string = "hello-there";
        const mockPW2: string = "general-kenobi";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.newPWText = document.createElement("input");
        userSettComp.confirmPWText = document.createElement("input");
        userSettComp.newPWText.value = mockPW1;
        userSettComp.confirmPWText.value = mockPW2;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Passwords must match. Please try again");
    });

    it('updatePassword: should not alert user when input is valid', async () => {
        /*Local Variables*/
        const mockPW: string = "echo";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.newPWText = document.createElement("input");
        userSettComp.confirmPWText = document.createElement("input");
        userSettComp.newPWText.value = mockPW;
        userSettComp.confirmPWText.value = mockPW;
        userSettComp.loggedIn = mockUser;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).not.toHaveBeenCalled();
    });

    it('displayInfo: should input data without any errors', async () => {
        /*Mocks*/
        userSettComp.profileImg = document.createElement("img");
        userSettComp.imgUrlText = document.createElement("input");
        userSettComp.usernameText = document.createElement("input");
        userSettComp.emailText = document.createElement("input");
        userSettComp.fNameText = document.createElement("input");
        userSettComp.lNameText = document.createElement("input");
        userSettComp.newPWText = document.createElement("input");
        userSettComp.confirmPWText = document.createElement("input");

        /*Function*/
        userSettComp.displayInfo(mockUser);

        /*Test*/
        expect(userSettComp.profileImg.src).toBeTruthy
        expect(userSettComp.imgUrlText.value).toBeTruthy;
        expect(userSettComp.usernameText.value).toBeTruthy;
        expect(userSettComp.emailText.value).toBeTruthy;
        expect(userSettComp.fNameText.value).toBeTruthy;
        expect(userSettComp.lNameText.value).toBeTruthy;
        expect(userSettComp.newPWText.value).toBe("");
        expect(userSettComp.confirmPWText.value).toBe("");
    });
});
