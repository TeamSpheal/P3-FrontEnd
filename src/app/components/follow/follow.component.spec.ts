import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { from, of } from 'rxjs';
import { FollowComponent } from './follow.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import User from '../../models/User';
import UserMiniDTO from '../../models/UserMiniDTO';
import { UserService } from '../../services/user.service';

describe('FollowComponent', () => {
    let followComp: FollowComponent;
    let userServ: UserService;
    let userProfComp: UserProfileComponent;
    const mockUser = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockUserMini = new UserMiniDTO(1, 'TestUser1', 'assets/images/favicon.png');

    const fakeActivatedRoute = {
        snapshot: { paramMap: convertToParamMap({ 'id': '1' }) }
    } as ActivatedRoute;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FollowComponent],
            imports: [HttpClientTestingModule],
            providers: [UserProfileComponent,
                FollowComponent,
                UserService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
        });
        followComp = TestBed.inject(FollowComponent);
        userProfComp = TestBed.inject(UserProfileComponent);
        userServ = TestBed.inject(UserService);
    });

    it('Component: should create', () => {
        expect(followComp).toBeTruthy();
    });

    it('ngOnInit: should retrieve logged in user and viewing user from local storage', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(document, 'getElementById').and.returnValue(document.createElement("button"));
        spyOn(userServ, 'isFollowing').and.callFake(() => { return true });
        spyOn(followComp, 'changeBtn').and.callFake(() => { /*Do Nothing*/ })

        /*Function*/
        followComp.ngOnInit();

        /*Test*/
        expect(localStorage.getItem("user")).toBeTruthy();
        expect(localStorage.getItem("viewingUser")).toBeTruthy();
    });

    it('changeFollowState: should pass the function unto addToFollowing', () => {
        /*Local Variables*/
        const mockEvent = new InputEvent("submit");

        /*Mocks*/
        followComp.isFollow = false;
        spyOn(followComp, 'addToFollowing').and.callFake(() => { /*Do Notihing*/ });

        /*Function*/
        followComp.changeFollowState(mockEvent);

        /*Test*/
        expect(followComp.addToFollowing).toHaveBeenCalled();
    });

    it('changeFollowState: should pass the function unto removeFromFollowing', () => {
        /*Local Variables*/
        const mockEvent = new InputEvent("submit");

        /*Mocks*/
        followComp.isFollow = true;
        spyOn(followComp, 'removeFromFollowing').and.callFake(() => { /*Do Notihing*/ });

        /*Function*/
        followComp.changeFollowState(mockEvent);

        /*Test*/
        expect(followComp.removeFromFollowing).toHaveBeenCalled();
    });

    it('addToFollowing: should set local storage and alert user of request success', () => {
        /*Mocks*/
        followComp.isFollow = false;
        followComp.followingList = [mockUserMini];
        followComp.viewingUser = mockUserMini;
        followComp.loggedIn = mockUser;
        userProfComp.followerCount = 0;
        spyOn(userServ, 'addFollower').and.callFake(() => {
            return from(of(mockUser));
        });
        spyOn(followComp, 'changeBtn').and.callFake(() => { /*Do Nothing*/ });
        spyOn(window, 'alert');

        /*Function*/
        followComp.addToFollowing();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("You haved successfully followed this user!");
        expect(localStorage.getItem("user")).toBeTruthy();
        expect(userProfComp.followerCount).toBe(1);
    });

    it('addToFollowing: should alert user of request failure', () => {
        /*Mocks*/
        spyOn(userServ, 'addFollower').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');

        /*Function*/
        followComp.addToFollowing();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The server failed to follow this user");
    });

    it('removeFromFollowing: should set local storage and alert user of request success', () => {
        /*Local Variables*/
        const mockUserMiniDlt = new UserMiniDTO(2, 'TestUser2', 'assets/images/favicon.png');

        /*Mocks*/
        followComp.isFollow = true;
        followComp.followingList = [mockUserMini, mockUserMiniDlt, mockUserMini];
        followComp.viewingId = 2;
        followComp.loggedIn = mockUser;
        userProfComp.followerCount = 1;
        spyOn(userServ, 'removeFollower').and.callFake(() => {
            return from(of(mockUser));
        });
        spyOn(followComp, 'changeBtn').and.callFake(() => { /*Do Nothing*/ });
        spyOn(window, 'alert');

        /*Function*/
        followComp.removeFromFollowing();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("You haved successfully unfollowed this user!");
        expect(localStorage.getItem("user")).toBeTruthy();
        expect(userProfComp.followerCount).toBe(0);
    });

    it('removeFromFollowing: should alert user of request failure', () => {
        /*Mocks*/
        spyOn(userServ, 'removeFollower').and.callFake(() => {
            return from(of(undefined));
        });
        spyOn(window, 'alert');

        /*Function*/
        followComp.removeFromFollowing();

        /*Test*/
        expect(window.alert).toHaveBeenCalledWith("The server failed to unfollow this user");
    });

    it('changeBtn: should set the follow button to the unfollow style', () => {
        /*Mocks*/
        followComp.followBtn = document.createElement("button");
        followComp.isFollow = true;

        /*Function*/
        followComp.changeBtn();

        /*Test*/
        expect(followComp.text).toBe("unfollow");
    });

    it('changeBtn: should set the follow button to the follow style', () => {
        /*Mocks*/
        followComp.followBtn = document.createElement("button");
        followComp.isFollow = false;

        /*Function*/
        followComp.changeBtn();

        /*Test*/
        expect(followComp.text).toBe("follow");
    });
});
