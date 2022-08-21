import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './post.service';
import Post from '../models/Post';
import User from '../models/User';

describe('PostService', () => {
    let postServ: PostService;
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    const mockPost: Post = new Post(1, "A mocked post", "",
        mockUser, [], [mockUser]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        postServ = TestBed.inject(PostService);
    });

    it('Service: should be created', () => {
        expect(postServ).toBeTruthy();
    });

    it('getAllPosts: should return the observable', async () => {
        expect(postServ.getAllPosts()).toBeTruthy();
    });

    it('upsertPost: should return the observable', async () => {
        expect(postServ.upsertPost(mockPost)).toBeTruthy();
    });

    it('likePost: should return the observable', async () => {
        expect(postServ.likePost(1,1)).toBeTruthy();
    });

    it('unlikePost: should return the observable', async () => {
        expect(postServ.unlikePost(1,1)).toBeTruthy();
    });

    it('getAllPostsByUserId: should return the observable', async () => {
        expect(postServ.getAllPostsByUserID(1)).toBeTruthy();
    });

    it('getPost: should return the observable', async () => {
        expect(postServ.getPost(mockPost)).toBeTruthy();
    });

    it('getPostsByUsers: should return the observable', async () => {
        expect(postServ.getPostsByUsers(1)).toBeTruthy();
    });
});
