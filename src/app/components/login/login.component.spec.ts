import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { from, of } from 'rxjs';
import User from '../../models/User';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
    let loginComp: LoginComponent;
    let authServ: AuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LoginComponent]
        })
        loginComp = TestBed.inject(LoginComponent);
        authServ = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('Component: should create', () => {
        expect(loginComp).toBeTruthy();
    });

    it('onSubmit: should set "user" and "JWT" in local storage', () => {
        /*Local Variables*/
        const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
            'TestUser1', 'assets/images/favicon.png', [], []);
        const mockHeaders = new HttpHeaders({
            "Auth": "JWTToken"
        });
        const mockResp: HttpResponse<any> = new HttpResponse({
            body: JSON.stringify(mockUser),
            headers: mockHeaders
        });
        const event = new InputEvent("submit")

        /*Mocks*/
        spyOn(authServ, 'login').and.callFake(() => {
            return from(of(mockResp));
        });

        /*Function*/
        loginComp.onSubmit(event);

        /*Test*/
        expect(localStorage.getItem("user")).toBeTruthy();
        expect(localStorage.getItem("JWT")).toBeTruthy();
    });

    it('register: should redirect to the register component', () => {
        /*Mocks*/
        spyOn(router, 'navigate');

        /*Function*/
        loginComp.register();

        /*Test*/
        expect(router.navigate).toHaveBeenCalled();
    });
});
