import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import User from '../../models/User';
import { HttpResponse } from '@angular/common/http';

describe('RegisterComponent', () => {
    let regComp: RegisterComponent;
    let authServ: AuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RegisterComponent]
        })
        regComp = TestBed.inject(RegisterComponent);
        authServ = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

  it('Component: should create', () => {
    expect(regComp).toBeTruthy();
  });

    it('onSubmit: should ', () => {
        /*Local Variables*/
        const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
            'TestUser1', 'assets/images/favicon.png', [], []);
        const mockResp: HttpResponse<any> = new HttpResponse({
            body: JSON.stringify(mockUser)
        });
        const event = new InputEvent("submit")

        /*Mocks*/
        spyOn(authServ, 'register').and.callFake(() => {
            return from(of(mockResp));
        });
        spyOn(router, 'navigate');

        /*Function*/
        regComp.onSubmit(event);

    /*Test*/
        expect(router.navigate).toHaveBeenCalled();
    });
});
