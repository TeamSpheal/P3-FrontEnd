import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    addFollower(followedId: number, followerId: number): Observable<any> {
        this.userUpdatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
        return this.http.post(`${this.userUpdatedUrl}`, null,
            { headers: environment.headers, withCredentials: environment.withCredentials })
    }

    removeFollower(followedId: number, followerId: number): Observable<any> {
        this.userUpdatedUrl = `${this.userUrl}/${followedId}/unfollow/${followerId}`;
        return this.http.delete(this.userUpdatedUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
    }

    isFollowing(viewingUser: UserMiniDTO): boolean {
        let loggedIn = JSON.parse(<string>localStorage.getItem("user"));
        let followingList = loggedIn.following as UserMiniDTO[];
        for (let i = 0; i < followingList.length && !this.isFollow; i++) {
            if (followingList[i].id == viewingUser.id) {
                this.isFollow = true;
            }
        }

        return (this.isFollow);
    }

    getUserById(id: number): Observable<any> {
        return this.http.get<User>(`${this.userUrl}/${id}`, { headers: environment.headers, withCredentials: environment.withCredentials });
    }
}



