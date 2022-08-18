import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/user`
  userUpadatedUrl: string;

  constructor(private http: HttpClient) { }
  addFollower(followedId: number, followerId: number): Observable<any> {
    this.userUpadatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
    return this.http.post(`${this.userUpadatedUrl}`, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.userUrl}/${id}`, { headers: environment.headers, withCredentials: environment.withCredentials });
  }
}



