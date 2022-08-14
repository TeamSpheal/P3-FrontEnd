import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    imageURLInput: string = "";
    userUpdateURL: string = `${environment.baseUrl}/user`;

    constructor(private http: HttpClient) { }

    // When user clicks the top update button, the image URL changes to
    // set their pfp with a new one.
    updateImage(currentUser: User) {
        let response: string | undefined = undefined;
        const res = this.http.post(this.userUpdateURL, currentUser, { headers: environment.headers });
        res.subscribe((data: any) => {
            response = JSON.stringify(data);
        });
        return response;
    }

    // When user clicks the middle update button, their current information changes
    // to new information.
    updateProfile(updatedUser: User): string | undefined {
        let response: string | undefined = undefined;
        const res = this.http.post(this.userUpdateURL, updatedUser, { headers: environment.headers });
        res.subscribe((data: any) => {
            response = JSON.stringify(data);
        });
        return response;
    }

    // When user clicks the bottom update button, their current password changes to
    // new password through authentication and validation.
    updatePassword(newPW: string, currentUser: User): string | undefined {
        let response: string | undefined = undefined;
        const payload = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            password: newPW,
            username: currentUser.username,
            profileImg: currentUser.profileImg
        };

        const res = this.http.post(this.userUpdateURL, payload, { headers: environment.headers });
        res.subscribe((data: any) => {
            response = JSON.stringify(data);
        });
        return response;
    }
}