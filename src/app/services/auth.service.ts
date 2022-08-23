import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `${environment.baseUrl}/auth`;
  currentUser: User;
  _snackBar: MatSnackBar
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<HttpResponse<User>> {
    const payload = {email:email, password:password};
    return this.http.post<User>(`${this.authUrl}/login`, payload, {observe: 'response', headers: environment.headers, withCredentials: environment.withCredentials})
    .pipe(
      catchError((err) => {
        this.infoMessage('Email or password is invalid!', 'Close')
        return throwError(err);
      })
    );
  }

  logout(): void{
      localStorage.removeItem("user");
      localStorage.removeItem("JWT");
  }

  register(firstName: string, lastName: string, email: string, password: string, username: string): Observable<any> {
      const payload = { firstName: firstName, lastName: lastName, email: email, password: password, username: username, profileImg: "https://th.bing.com/th/id/OIP.61ajO7xnq1UZK2GVzHymEQAAAA?w=145&h=150&c=7&r=0&o=5&pid=1.7"};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers})
    .pipe(
      catchError((err) => {
        this.infoMessage('All fields are required', 'Close')
        return throwError(err);
      })
    );
  }

  infoMessage(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
}