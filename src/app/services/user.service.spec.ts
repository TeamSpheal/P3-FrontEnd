import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
    let userServ: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        userServ = TestBed.inject(UserService);
    });

    it('Service: should be created', () => {
        expect(userServ).toBeTruthy();
    });

    it('addFollower: should return the observable', async () => {
        expect(userServ.addFollower(1, 2)).toBeTruthy();
    });

    it('getUserById: should return the observable', async () => {
        expect(userServ.getUserById(1)).toBeTruthy();
    });
});
