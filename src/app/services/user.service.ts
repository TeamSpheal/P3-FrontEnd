import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { isEmpty } from 'rxjs/operators';  
import { environment } from 'src/environments/environment';
import User from '../models/User';
import UserMiniDTO from '../models/UserMiniDTO';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/user`
  userUpdatedUrl: string;
  isFollowResp: UserMiniDTO[];
  isFollow: boolean = false;
  user: User = JSON.parse(<string>localStorage.getItem("user"));

  constructor(private http: HttpClient) { }

  addFollower(followedId: number, followerId:number): void {
    let response: any | undefined;
    this.userUpdatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
    this.http.post(`${this.userUpdatedUrl}`, null, 
    {headers: environment.headers, withCredentials: environment.withCredentials})
    .subscribe((data: any) => {
      //Parse data
      if (data != undefined) {
          response = JSON.parse(JSON.stringify(data));
      }

      //Process data
      if (response != undefined) { //Data is defined. The return from the response should contain a user object
          alert(
              "Your follow this user successfully!"
          );
      } else { //Data is undefined, meaning the request failed
          alert(
              "The server failed to follow this user"
          );
      }
    });
  }

  removeFollower(followedId: number, followerId: number): Observable<any> {
    this.userUpdatedUrl = `${this.userUrl}/${followedId}/unfollow/${followerId}`; 
    return this.http.delete(this.userUpdatedUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  isFollowing(followedId: number, followerId: number): boolean {
    // this.userUpdatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
    // this.isFollowResp = this.http.get(`${this.userUpdatedUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials});
    this.isFollowResp = this.user.following;
    // for(let i = 0; i < this.isFollowResp.length; i++) {
    //   if(isF)
    // }
    console.log(this.user);
    console.log(this.user.followers);
    console.log(this.user.following);
    console.log(this.isFollowResp);

    return(this.isFollow);
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.userUrl}/${id}`, { headers: environment.headers, withCredentials: environment.withCredentials });
  }
}



