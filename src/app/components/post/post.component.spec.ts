import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostComponent } from './post.component';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import User from '../../models/User';
import { from, of } from 'rxjs';
import Post from '../../models/Post';

describe('PostComponent', () => {
    /*Suite Variables*/
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockPost: Post = new Post(1, "A mocked post", "",
        mockUser, [], [mockUser], new Date());
    let postComp: PostComponent;
    let postServ: PostService;
    let authServ: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostComponent,
                AuthService]
        })
        postComp = TestBed.inject(PostComponent);
        postServ = TestBed.inject(PostService);
        authServ = TestBed.inject(AuthService);
    });

    it('Component: should create', () => {
        expect(postComp).toBeTruthy();
    });

    it('ngOnInit: should set the current user in auth service and call isLiked', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(postComp, 'isLiked').and.callFake(() => { /*Do Nothing*/ })

        /*Function*/
        postComp.ngOnInit();

        /*Test*/
        expect(postComp.isLiked).toHaveBeenCalled();
        expect(authServ.currentUser).toBeTruthy();
    });

    it('ngOnInit: should not set the current user in auth service but still call isLiked', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(null);
        spyOn(postComp, 'isLiked').and.callFake(() => { /*Do Nothing*/ })

        /*Function*/
        postComp.ngOnInit();

        /*Test*/
        expect(postComp.isLiked).toHaveBeenCalled();
        expect(authServ.currentUser).toBeFalsy();
    });

    it('isLiked: should set isActive to true', () => {
        /*Mocks*/
        spyOn(postServ, 'getPost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        postComp.post = mockPost;
        postComp.isActive = false;
        authServ.currentUser = mockUser;

        /*Function*/
        postComp.isLiked();

        /*Test*/
        expect(postComp.isActive).toBeTrue();
    });

    it('isLiked: should set isActive to false', () => {
        /*Local Variables*/
        //MockUser has id of 1, MockUser has id of 5
        const mockUser2: User = new User(5, 'testuser@gmail.com', 'Test', 'User',
            'TestUser1', 'assets/images/favicon.png', [], []);

        /*Mocks*/
        spyOn(postServ, 'getPost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        postComp.post = mockPost;
        postComp.isActive = false;
        authServ.currentUser = mockUser2;

        /*Function*/
        postComp.isLiked();

        /*Test*/
        expect(postComp.isActive).toBeFalse();
    });

    it('like: should set isActive to true and call like method in post service', () => {
        /*Mocks*/
        spyOn(postServ, 'likePost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        spyOn(document, 'getElementById').and.returnValue(document.createElement("button"));
        postComp.post = mockPost;
        postComp.isActive = false;
        authServ.currentUser = mockUser;

        /*Function*/
        postComp.like();

        /*Test*/
        expect(postServ.likePost).toHaveBeenCalled();
        expect(postComp.isActive).toBeTrue();
    });

    it('like: should set isActive to false and call unlike method in post service', () => {
        /*Mocks*/
        spyOn(postServ, 'unlikePost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        spyOn(document, 'getElementById').and.returnValue(document.createElement("button"));
        postComp.post = mockPost;
        postComp.isActive = true;
        authServ.currentUser = mockUser;

        /*Function*/
        postComp.like();

        /*Test*/
        expect(postServ.unlikePost).toHaveBeenCalled();
        expect(postComp.isActive).toBeFalse();
    });

    it('toggleReplyToPost: should switch the state of replyToPost', () => {
        /*Mocks*/
        postComp.replyToPost = true;

        /*Function*/
        postComp.toggleReplyToPost();

        /*Test*/
        expect(postComp.replyToPost).toBeFalse();
    });

    it('submitReply: should set isActive to false and call upsert method in post service', () => {
        /*Local Variables*/
        const event = new InputEvent("submit");

        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(postServ, 'upsertPost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        spyOn(postComp, 'toggleReplyToPost').and.callThrough();
        postComp.post = mockPost;
        postComp.replyToPost = true;
        authServ.currentUser = mockUser;

        /*Function*/
        postComp.submitReply(event);

        /*Test*/
        expect(postServ.upsertPost).toHaveBeenCalled();
        expect(postComp.toggleReplyToPost).toHaveBeenCalled();
        expect(postComp.replyToPost).toBeFalse();
    });
});
