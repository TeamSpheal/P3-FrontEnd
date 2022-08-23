import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from './navbar.component';
import User from '../../models/User';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';

describe('NavbarComponent', () => {
    /*Suite Variables*/
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    let navComp: NavbarComponent;
    let authServ: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,
                NavbarComponent]
        })
        navComp = TestBed.inject(NavbarComponent);
        authServ = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('Component: should create', () => {
        expect(navComp).toBeTruthy();
    });

    it('ngOnInit: should set color theme to dark mode', () => {
        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(localStorage, 'getItem').and.returnValue('dark');
        spyOn(JSON, 'parse').and.returnValue(mockUser);
        spyOn(document.documentElement, 'setAttribute');

        /*Function*/
        navComp.ngOnInit();

        /*Test*/
        expect(document.documentElement.setAttribute).toHaveBeenCalled();
        expect(navComp.lightStatus).toBe('Dark');
        expect(navComp.checkedStatus).toBeTrue();
    });

    it('ngOnInit: should set color theme to light mode', () => {
        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(localStorage, 'getItem').and.returnValue('light');
        spyOn(JSON, 'parse').and.returnValue(mockUser);
        spyOn(document.documentElement, 'setAttribute');

        /*Function*/
        navComp.ngOnInit();

        /*Test*/
        expect(document.documentElement.setAttribute).toHaveBeenCalled();
        expect(navComp.lightStatus).toBe('Light');
        expect(navComp.checkedStatus).toBeFalse();
    });

    it('ngOnInit: should show user details', () => {
        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

        /*Function*/
        navComp.ngOnInit();

        /*Test*/
        expect(navComp.loggedIn).toBeTruthy();
    });

    it('ngOnInit: should not show user details', () => {
        /*Mocks*/
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(JSON, 'parse').and.callFake(() => { /*Do Nothing*/ });

        /*Function*/
        navComp.ngOnInit();

        /*Test*/
        expect(navComp.loggedIn).toBeFalsy();
        expect(navComp.navProfileDiv.style.backgroundImage).toBeFalsy();
        expect(navComp.navUsernameDiv.innerHTML).toBeFalsy();
    });

    it('logout: should call logout method in auth service', () => {
        /*Mocks*/
        navComp.navLoginDiv = document.createElement("div");
        navComp.navUserDiv = document.createElement("div");
        navComp.navUsernameDiv = document.createElement("div");
        navComp.navProfileDiv = document.createElement("div");
        spyOn(authServ, 'logout').and.callFake(() => { /*Do Nothing*/ })

        /*Function*/
        navComp.logout();

        /*Test*/
        expect(authServ.logout).toHaveBeenCalled();
    });

    it('login: should redirect to the login component', () => {
        /*Mocks*/
        spyOn(router, 'navigate');

        /*Function*/
        navComp.login();

        /*Test*/
        expect(router.navigate).toHaveBeenCalled();
    });

    it('onChange: should set "theme" in local storage to "light"', () => {
        /*Local Variables*/
        const mockToggle = new MatSlideToggleChange(MatSlideToggle.prototype, false);

        /*Function*/
        navComp.onChange(mockToggle);

        /*Test*/
        expect(navComp.lightStatus).toBe("Light");
        expect(localStorage.getItem("theme")).toBe("light");
    });

    it('onChange: should set "theme" in local storage to "dark"', () => {
        /*Local Variables*/
        const mockToggle = new MatSlideToggleChange(MatSlideToggle.prototype, true);

        /*Function*/
        navComp.onChange(mockToggle);

        /*Test*/
        expect(navComp.lightStatus).toBe("Dark");
        expect(localStorage.getItem("theme")).toBe("dark");
    });

});
