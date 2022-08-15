import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    imageURLInput: string = "";
    userUpdateURL: string = `${environment.baseUrl}/user/update`;

    constructor(private http: HttpClient) { }

    // When user clicks the top update button, the image URL changes to
    // set their pfp with a new one.
    updateImage() {
        this.imageURLInput = (<HTMLInputElement>document.getElementById("imgUrlText")).value;
        let img = document.getElementById("profileImg") as HTMLImageElement;
        img.src = this.imageURLInput;
        //this.HttpClient.post
    }

    // When user clicks the middle update button, their current information changes
    // to new information.
    updateProfile(updatedUser: User): Observable<any> {
        let response: string | undefined = undefined;
        return this.http.post(this.userUpdateURL + "/profile", JSON.stringify(updatedUser), { headers: environment.headers });
    }

    // When user clicks the bottom update button, their current password changes to
    // new password through authentication and validation.
    updatePassword(newPW: string, currentUser: User): Observable<any> {
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

        return this.http.post(this.userUpdateURL + "/password", JSON.stringify(payload), { headers: environment.headers, withCredentials: environment.withCredentials });
    }
}
