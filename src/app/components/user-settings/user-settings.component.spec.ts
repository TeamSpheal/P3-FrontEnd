import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import User from '../../models/User';
import { UserSettingsService } from '../../services/user-settings.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UserSettingsComponent', () => {
    let userSettComp: UserSettingsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserSettingsService,
                UserSettingsComponent,
                HttpClient,
                HttpHandler]
        })
        userSettComp = TestBed.inject(UserSettingsComponent);
    });

    it('should create', () => {
        expect(userSettComp).toBeTruthy();
    });

    it('should set a value to loggedIn if sessionStorage is not null', async () => {
        /*Local Variables*/
        const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
            'TestUser1', 'assets/images/favicon.png', [], []);
        const mockJSON: string = JSON.stringify(mockUser);

        /*Mocks*/
        spyOn(sessionStorage, 'getItem').and.returnValue(mockJSON);
        spyOn(userSettComp, 'displayInfo').and.callFake(() => {/*Do Nothing*/ })

        /*Function*/
        await userSettComp.ngOnInit();
        /*Test*/
        expect(userSettComp.loggedIn).toBeTruthy();
    });

    it('should not set a value to loggedIn if sessionStorage is null', async () => {

        /*Mocks*/
        spyOn(sessionStorage, 'getItem').and.returnValue(null);
        spyOn(document, 'getElementById').and.returnValue(document.createElement("input"));

        /*Function*/
        await userSettComp.ngOnInit();
        /*Test*/
        expect(userSettComp.loggedIn).toBeFalsy();
    });
});
