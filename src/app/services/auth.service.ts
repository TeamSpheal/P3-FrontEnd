import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = `${environment.baseUrl}/auth`;
  currentUser: User

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
    res.subscribe((data : any) => {
        this.currentUser = data
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(this.currentUser));
    })
    return res;
  }

  logout(): void{
      this.http.post(`${this.authUrl}/logout`, null).subscribe();
      sessionStorage.removeItem("user");
  }

  register(firstName: string, lastName: string, email: string, password: string, username: string): Observable<any> {
      const payload = { firstName: firstName, lastName: lastName, email: email, password: password, username: username, profileImg: "https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7"};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
}
