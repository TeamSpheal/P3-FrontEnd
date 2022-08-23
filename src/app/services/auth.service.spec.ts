import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authServ: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        authServ = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(authServ).toBeTruthy();
    });

    it('login: should return the observable', async () => {
        expect(authServ.login("email", "password")).toBeTruthy();
    });

    it('logout: should remove "user" and "JWT" from localStorage', async () => {
        /*Mocks*/
        localStorage.setItem("user", "userJSON");
        localStorage.setItem("JWT", "JWTToken");

        /*Function*/
        authServ.logout();

        /*Test*/
        expect(localStorage.getItem("user")).toBeFalsy();
        expect(localStorage.getItem("JWT")).toBeFalsy();
    });

    it('register: should return the observable', async () => {
        expect(authServ.register("Test", "User", "testuser@gmail.com", "password", "TestUser1")).toBeTruthy();
    });
});
