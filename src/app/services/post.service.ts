import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = `${environment.baseUrl}/post`
  postGetLikesUrl = `${environment.baseUrl}/post`
  postLikeUrl = `${environment.baseUrl}/post/like`
  postUnlikeUrl = `${environment.baseUrl}/post/unlike`
  userPostUrl = `${environment.baseUrl}/post/get`
  followingPostsUrl = `${environment.baseUrl}/post/following`

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  upsertPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  likePost(userId: number, postId: number): Observable<Post>{
    return this.http.put<Post>(`${this.postLikeUrl}`, {postId , userId} , {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  unlikePost(userId: number, postId: number): Observable<Post>{
    return this.http.put<Post>(`${this.postUnlikeUrl}`, {postId, userId}, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  getAllPostsByUserID(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.userPostUrl}/${userId}`, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  getPost(post: Post): Observable<Post>{
    return this.http.get<Post>(`${this.postGetLikesUrl}/${post.id}`, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  getPostsByUsers(id : number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.followingPostsUrl}/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

}
