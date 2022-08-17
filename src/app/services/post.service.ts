import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import { catchError, retry } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl: string = `${environment.baseUrl}/post`

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, { headers: environment.headers, withCredentials: environment.withCredentials }); 
      //pipe(catchError(this.handleError))
  }

  // handleError(error: HttpErrorResponse) {
  //     return throwError(() => new Error(error.message || "Server Error"));
      
  // }

  upsertPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}`, post, { headers: environment.headers, withCredentials: environment.withCredentials })
    
  }
}
