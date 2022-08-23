import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import UserMiniDTO from '../models/UserMiniDTO';
import User from '../models/User';

describe('UserService', () => {
    let userServ: UserService;
    const mockUserMini = new UserMiniDTO(2, "TestUser2", "images/spheal.png");
    const mockUser = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], [mockUserMini]);

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

    it('removeFollower: should return the observable', async () => {
        expect(userServ.removeFollower(1, 2)).toBeTruthy();
    });

    it('isFollowing: should return the observable', async () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

        /*Function*/
        userServ.isFollowing(mockUserMini);

        /*Test*/
        expect(userServ.isFollow).toBeTrue();
    });

    it('getUserById: should return the observable', async () => {
        expect(userServ.getUserById(1)).toBeTruthy();
    });
});
