import { TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import User from '../../models/User';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, from } from 'rxjs';

describe('UserSettingsComponent', () => {
    /*Suite Variables*/
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    let userSettComp: UserSettingsComponent;
    let userSettingsService: UserSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserSettingsService,
                UserSettingsComponent]
        })
        userSettComp = TestBed.inject(UserSettingsComponent);
        userSettingsService = TestBed.inject(UserSettingsService);
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
        spyOn(document, 'getElementById').and.returnValue(document.createElement("img"));

        /*Function*/
        userSettComp.ngOnInit();

        /*Test*/
        expect(userSettComp.loggedIn).toBeFalsy();
    });

    it('updateImage: should alert user of invalid image URL', async () => {
        /*Local Variables*/
        //This string is exactly 256 characters long
        const mockImgURL: string = "http2://randomimagegenerator.com/fakeurl/image/arbitraryidforfakeimage/"
            + "GtH675rfgtifnre948gnrkfjdvnw4uigbkreu5n4g985gbnlasdkhgb5iugbelkg85gu8skjgb3qp438bgtubiwerj4p3e"
            + "587htgqp9e203gnvksrhbgkaegpbveriuabgvakwujrgnqiaebvnbrtiung45wieurgvnqwp3geiurgnnvtiughhtty";
        const mockUrlLength: number = mockImgURL.length

        /*Mocks*/
        userSettComp.userImageForm.value.imageURL = mockImgURL;
        spyOn(window, 'alert');

        /*Function*/
        userSettComp.updateImage();

        /*Test*/
        expect(mockUrlLength).toBeGreaterThan(255);
        expect(window.alert).toHaveBeenCalledWith("Please limit your image url to 255 characters or less");
    });

    it('updateImage: should alert user of request failure', async () => {
        /*Local Variables*/
        //This string is exactly 255 characters long
        const mockImgURL: string = "https://randomimagegenerator.com/fakeurl/image/arbitraryidforfakeimage/"
            + "GtH675rfgtifnre948gnrkfjdvnw4uigbkreu5n4g985gbnlasdkhgb5iugbelkg85gu8skjgb3qp438bgtubiwerj4p3e"
            + "587htgqp9e203gnvksrhbgkaegpbveriuabgvakwujrgnqiaebvnbrtiung45wieurgvnqwp3geiurgnnvtiughhtt";

        /*Mocks*/
        spyOn(userSettingsService, 'updateProfile').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');
        userSettComp.userImageForm.value.imageURL = mockImgURL;
        userSettComp.loggedIn = mockUser;

        /*Function*/
        userSettComp.updateImage();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The server failed to update your profile image");
    });

    it('updateImage: should alert user of request success', async () => {
        /*Local Variables*/
        //This string is exactly 255 characters long
        const mockImgURL: string = "https://randomimagegenerator.com/fakeurl/image/arbitraryidforfakeimage/"
            + "GtH675rfgtifnre948gnrkfjdvnw4uigbkreu5n4g985gbnlasdkhgb5iugbelkg85gu8skjgb3qp438bgtubiwerj4p3e"
            + "587htgqp9e203gnvksrhbgkaegpbveriuabgvakwujrgnqiaebvnbrtiung45wieurgvnqwp3geiurgnnvtiughhtt";

        /*Mocks*/
        spyOn(userSettingsService, 'updateProfile').and.callFake(() => {
            return from(of(JSON.stringify(mockUser)));
        });
        spyOn(window, 'alert');
        spyOn(userSettComp, 'displayInfo').and.callFake(() => { /*Do Nothing*/ })
        userSettComp.userImageForm.value.imageURL = mockImgURL;
        userSettComp.loggedIn = mockUser;

        /*Function*/
        userSettComp.updateImage();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Your profile image was updated successfully");
    });

    it('updateProfile: should alert user of invalid username', async () => {
        /*Local Variables*/
        // '@', '(', ')', and '#' are all invalid characters
        const mockUN = "R@nD()M#1";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.userDetailsForm.value.username = mockUN;
        userSettComp.userDetailsForm.value.email = "";
        userSettComp.userDetailsForm.value.firstName = "";
        userSettComp.userDetailsForm.value.lastName = "";
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The username you entered is invalid. Please try again");
    });

    it('updateProfile: should alert user of invalid email', async () => {
        /*Local Variables*/
        const mockUN = "Random_1";
        // A vaild email must contain '@' and '.' in specific places and cannot contain invalid characters
        const mockEM = "randomem*i|ATgmailDOTc{}m";

        /*Mocks*/
        userSettComp.userDetailsForm.value.username = mockUN;
        userSettComp.userDetailsForm.value.email = mockEM;
        userSettComp.userDetailsForm.value.firstName = "";
        userSettComp.userDetailsForm.value.lastName = "";
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The email you entered is invalid. Please try again");
    });

    it('updateProfile: should alert user of request failure', async () => {
        /*Local Variables*/
        const mockUN = "Random_1";
        const mockEM = "rand0M_Ema1l@gmail.com";

        /*Mocks*/
        spyOn(userSettingsService, 'updateProfile').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');
        userSettComp.userDetailsForm.value.username = mockUN;
        userSettComp.userDetailsForm.value.email = mockEM;
        userSettComp.loggedIn = mockUser;

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The server failed to update your profile");
    });

    it('updateProfile: should alert user of request success', async () => {
        /*Local Variables*/
        const mockUN = "Random_1";
        const mockEM = "rand0M_Ema1l@gmail.com";

        /*Mocks*/
        spyOn(userSettingsService, 'updateProfile').and.callFake(() => {
            return from(of(JSON.stringify(mockUser)));
        });
        spyOn(window, 'alert');
        spyOn(userSettComp, 'displayInfo').and.callFake(() => { /*Do Nothing*/ })
        userSettComp.userDetailsForm.value.username = mockUN;
        userSettComp.userDetailsForm.value.email = mockEM;
        userSettComp.userDetailsForm.value.firstName = "";
        userSettComp.userDetailsForm.value.lastName = "";
        userSettComp.loggedIn = mockUser;

        /*Function*/
        await userSettComp.updateProfile();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Your information was updated successfully");
    });

    it('updatePassword: should alert user of invalid password', async () => {
        /*Local Variables*/
        // A vaild password must be between 4 and 100 characters and not contain invalid characters
        // Side Note: Yes, these requirements are very insecure
        const mockPW = "hey";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.userPasswordForm.value.newPW = mockPW;
        userSettComp.userPasswordForm.value.confirmPW = mockPW;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The password you entered is invalid. Please try again");
    });

    it('updatePassword: should alert user of non-matching passwords', async () => {
        /*Local Variables*/
        // Passwords must match
        const mockPW1 = "hello-there";
        const mockPW2 = "general-kenobi";

        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"))
        userSettComp.userPasswordForm.value.newPW = mockPW1;
        userSettComp.userPasswordForm.value.confirmPW = mockPW2;
        spyOn(window, 'alert');

        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Passwords must match. Please try again");
    });

    it('updatePassword: should alert user of request failure', async () => {
        /*Local Variables*/
        const mockPW = "password";

        /*Mocks*/
        spyOn(userSettingsService, 'updatePassword').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');
        userSettComp.userPasswordForm.value.newPW = mockPW;
        userSettComp.userPasswordForm.value.confirmPW = mockPW;


        /*Function*/
        await userSettComp.updatePassword();

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
        userSettComp.userPasswordForm.value.newPW = mockPW;
        userSettComp.userPasswordForm.value.confirmPW = mockPW;


        /*Function*/
        await userSettComp.updatePassword();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("Your password was updated successfully");
    });

    it('displayInfo: should input data without any errors', async () => {
        /*Mocks*/
        userSettComp.profileImg = document.createElement("img");

        /*Function*/
        userSettComp.displayInfo(mockUser);

        /*Test*/
        expect(userSettComp.profileImg.src).toBeTruthy
        expect(userSettComp.userImageForm.value.imageURL).toBeTruthy;
        expect(userSettComp.userDetailsForm.value.username).toBeTruthy;
        expect(userSettComp.userDetailsForm.value.email).toBeTruthy;
        expect(userSettComp.userDetailsForm.value.firstName).toBeTruthy;
        expect(userSettComp.userDetailsForm.value.lastName).toBeTruthy;
        expect(userSettComp.userPasswordForm.value.newPW).toBe("");
        expect(userSettComp.userPasswordForm.value.confirmPW).toBe("");
    });
});
