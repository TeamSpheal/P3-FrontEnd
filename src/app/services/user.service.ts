import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = `${environment.baseUrl}/user`
  userUpadatedUrl: string; 

  constructor(private http: HttpClient) { }
  addFollower(followedId: number, followerId:number): Observable<any> {
  this.userUpadatedUrl = `${this.userUrl}/${followedId}/follower/${followerId}`;
  return this.http.post(`${this.userUpadatedUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
}

}


