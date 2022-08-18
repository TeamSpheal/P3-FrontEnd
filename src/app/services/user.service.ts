import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl = `${environment.baseUrl}/user`
    userUpdatedUrl: string;

    constructor(private http: HttpClient) { }
    addFollower(followedId: number, followerId: number): Observable<any> {
        this.userUpdatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
        return this.http.post(`${this.userUpdatedUrl}`, { headers: environment.headers, withCredentials: environment.withCredentials })
    }
}



