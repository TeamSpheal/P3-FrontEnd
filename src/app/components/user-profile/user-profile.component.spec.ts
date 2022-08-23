import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileComponent } from './user-profile.component';
import { from, of } from 'rxjs';
import User from '../../models/User';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import Post from '../../models/Post';

describe('UserProfileComponent', () => {
    let userProfComp: UserProfileComponent;
    let userServ: UserService;
    let postServ: PostService;
    let route: ActivatedRoute;
    let router: Router;
    const mockUser = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockPost: Post = new Post(1, "A mocked post", "",
        mockUser, [], [mockUser], new Date());

    const fakeActivatedRoute = {
        snapshot: { paramMap: convertToParamMap({ 'id': '1' }) }
    } as ActivatedRoute;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [UserProfileComponent],
            providers: [UserProfileComponent,
                UserService,
                PostService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
        });

        userProfComp = TestBed.inject(UserProfileComponent);
        userServ = TestBed.inject(UserService);
        postServ = TestBed.inject(PostService);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        route.params = of({ 'id': '1' });
    });



    it('Component: should create', () => {
        expect(userProfComp).toBeTruthy();
    });

    it('ngOnInit: should reroute the user back to the post-feed page', () => {
        /*Mocks*/
        spyOn(route.params, 'subscribe').and.callFake(() => {
            return of(undefined).subscribe();
        });
        spyOn(router, 'navigate');

        /*Function*/
        userProfComp.ngOnInit()

        /*Test*/
        expect(router.navigate).toHaveBeenCalled();
    });

    it('ngOnInit: should set userPage to true', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));

        /*Function*/
        userProfComp.ngOnInit();

        /*Test*/
        expect(userProfComp.usersPage).toBeTrue();
    });

    it('ngOnInit: should set viewingUser in local storage', () => {
        /*Mocks*/
        route.params = of({ 'id': '2' });
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(userServ, 'getUserById').and.callFake(() => {
            return from(of(mockUser));
        });

        /*Function*/
        userProfComp.ngOnInit();

        /*Test*/
        expect(userProfComp.usersPage).toBeFalse();
        expect(localStorage.getItem("viewingUser")).toBeTruthy();
        expect(userProfComp.userMiniDTO).toBeTruthy();
    });

    it('ngOnInit: should populate user posts', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(document, 'getElementById').and.returnValue(document.createElement("div"));
        spyOn(userServ, 'getUserById').and.callFake(() => {
            return from(of(mockUser));
        });
        spyOn(postServ, 'getAllPostsByUserID').and.callFake(() => {
            return from(of([mockPost]));
        });

        /*Function*/
        userProfComp.ngOnInit();

        /*Test*/
        expect(userProfComp.posts).toBeTruthy();
    });
});