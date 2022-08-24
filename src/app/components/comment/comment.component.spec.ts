import { TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import Post from '../../models/Post';
import User from '../../models/User';
import { from, of } from 'rxjs';

describe('CommentComponent', () => {
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockPost: Post = new Post(1, "A mocked post", "",
        mockUser, [], [mockUser], new Date());
    let commComp: CommentComponent;
    let postServ: PostService;
    let authServ: AuthService;
    

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentComponent,
                AuthService]
        })
        commComp = TestBed.inject(CommentComponent);
        postServ = TestBed.inject(PostService);
        authServ = TestBed.inject(AuthService);
    });

    it('Component: should create', () => {
        expect(commComp).toBeTruthy();
    });

    it('toggleReplyToPost: should switch the state of replyToPost', () => {
        /*Mocks*/
        commComp.replyToComment = true;
        commComp.inputComment = mockPost;

        /*Function*/
        commComp.toggleReplyToComment();

        /*Test*/
        expect(commComp.replyToComment).toBeFalse();
    });

    it('submitReply: should set isActive to false and call upsert method in post service', () => {
        /*Local Variables*/
        const event = new InputEvent("submit");

        /*Mocks*/
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
        spyOn(postServ, 'upsertPost').and.callFake(() => {
            return (from(of(mockPost)));
        });
        spyOn(commComp, 'toggleReplyToComment').and.callThrough();
        commComp.inputComment = mockPost;
        commComp.replyToComment = true;
        authServ.currentUser = mockUser;
        commComp.commentForm.value.text = "Non empty text";

        /*Function*/
        commComp.submitReply(event);

        /*Test*/
        expect(postServ.upsertPost).toHaveBeenCalled();
        expect(commComp.toggleReplyToComment).toHaveBeenCalled();
        expect(commComp.replyToComment).toBeFalse();
    });


    it('submitReply: should set replyToComment to false', () => {
        /*Local Variables*/
        const event = new InputEvent("submit");

        /*Mocks*/
        commComp.commentForm.value.text = "";

        /*Function*/
        commComp.submitReply(event);

        /*Test*/
        expect(commComp.replyToComment).toBeFalse();
    });
});
