import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { isEmpty } from 'rxjs/operators';  
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/user`
  userUpadatedUrl: string;
  isFollowResp: Observable<any>;
  isFollow: boolean = false;

  constructor(private http: HttpClient) { }

  addFollower(followedId: number, followerId:number): Observable<any> {
    this.userUpadatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
    return (this.http.post(`${this.userUpadatedUrl}`, null, {headers: environment.headers, withCredentials: environment.withCredentials}));
  }

  removeFollower(followedId: number, followerId: number): Observable<any> {
    this.userUpadatedUrl = `${this.userUrl}/${followedId}/unfollow/${followerId}`; 
    return this.http.delete(this.userUpadatedUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  isFollowing(followedId: number, followerId: number): boolean {
    this.userUpadatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
    this.isFollowResp = this.http.get(`${this.userUpadatedUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials});
    console.log(this.isFollowResp.pipe(isEmpty()));
    if(this.isFollowResp.pipe(isEmpty())) {
      this.isFollow = true;
    }
    return(this.isFollow);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.userUrl}/${id}`, { headers: environment.headers, withCredentials: environment.withCredentials });
  }
}