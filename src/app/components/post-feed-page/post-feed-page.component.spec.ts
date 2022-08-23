import { TestBed } from '@angular/core/testing';
import { PostFeedPageComponent } from './post-feed-page.component';
import User from '../../models/User';
import Post from '../../models/Post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, of } from 'rxjs';
import UserMiniDTO from 'src/app/models/UserMiniDTO';

describe('PostFeedPageComponent', () => {
    const mockUserFollow: UserMiniDTO = new UserMiniDTO(2, 'TestUser1', 'assets/images/favicon.png');

    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockPost: Post = new Post(1, "A mocked post", "",
        mockUser, [], [mockUser], new Date());
    let postFeedComp: PostFeedPageComponent;
    let postServ: PostService;
    let authServ: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostFeedPageComponent,
                AuthService]
        })
        postFeedComp = TestBed.inject(PostFeedPageComponent);
        postServ = TestBed.inject(PostService);
        authServ = TestBed.inject(AuthService);
    });

    it('Component: should create', () => {
        expect(postFeedComp).toBeTruthy();
    });

    it('ngOnInit: should call getPostsByUsers in post service', () => {
        /*Local Variables*/
        const mockUserFollowing: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
            'TestUser1', 'assets/images/favicon.png', [mockUserFollow], []);

        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserFollowing));
        spyOn(postServ, 'getFollowingPostFeed').and.callFake(() => {
            return from(of([mockPost]));
        });

        /*Function*/
        postFeedComp.ngOnInit();

        /*Test*/
        expect(postServ.getFollowingPostFeed).toHaveBeenCalled();
    });

    it('ngOnInit: should call getAllPosts in post service', () => {
        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(postServ, 'getAllPosts').and.callFake(() => {
            return from(of([mockPost]));
        });

        /*Function*/
        postFeedComp.ngOnInit();

        /*Test*/
        expect(postServ.getAllPosts).toHaveBeenCalled();
    });

    it('toggleReplyToPost: should switch the state of replyToPost', () => {
        /*Mocks*/
        postFeedComp.createPost = true;

        /*Function*/
        postFeedComp.toggleCreatePost();

        /*Test*/
        expect(postFeedComp.createPost).toBeFalse();
    });

    it('submitPost: should set isActive to false and call upsert method in post service', () => {
        /*Local Variables*/
        const event = new InputEvent("submit");

        /*Mocks*/
        spyOn(postServ, 'upsertPost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        spyOn(postFeedComp, 'toggleCreatePost').and.callThrough();
        postFeedComp.posts = [mockPost];
        postFeedComp.createPost = true;
        authServ.currentUser = mockUser;
        postFeedComp.postForm.value.text = "non empty text";

        /*Function*/
        postFeedComp.submitPost(event);

        /*Test*/
        expect(postServ.upsertPost).toHaveBeenCalled();
        expect(postFeedComp.toggleCreatePost).toHaveBeenCalled();
        expect(postFeedComp.createPost).toBeFalse();
    });
});
