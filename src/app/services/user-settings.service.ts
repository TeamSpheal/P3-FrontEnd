import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    imageURLInput = "";
    userUpdateURL = `${environment.baseUrl}/user/update`;

    constructor(private http: HttpClient) { }

    /**Updates the user's stored image based on the given user object
     * @param currentUser
     */
    updateImage(currentUser: User): Observable<any> {
        /*Return request*/
        return this.http.post(this.userUpdateURL + "/profile", currentUser, { headers: environment.headers });
    }

    /**Updates the user's personal details based on the given user object
     * @param updatedUser
     */
    updateProfile(updatedUser: User): Observable<any> {
        /*Return request*/
        return this.http.post(this.userUpdateURL + "/profile", JSON.stringify(updatedUser), { headers: environment.headers });
    }

    /**Updates the user's password based on the given password and user object 
     * @param newPW
     * @param currentUser
     */
    updatePassword(newPW: string, currentUser: User): Observable<any> {
        /*Construct body of request*/
        const payload = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: newPW,
            username: currentUser.username,
            profileImg: currentUser.profileImg
        };

        /*Return request*/
        return this.http.post(this.userUpdateURL + "/password", JSON.stringify(payload), { headers: environment.headers, withCredentials: environment.withCredentials });
    }
}