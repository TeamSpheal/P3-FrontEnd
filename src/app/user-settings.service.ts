import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  imageURLInput: string = "";

  constructor() { }

  // When user clicks the top update button, the image URL changes to
  // set their pfp with a new one.
  updateImage(){
    this.imageURLInput = (<HTMLInputElement>document.getElementById("imgUrlText")).value;
    let img = document.getElementById("profileImg") as HTMLImageElement;
    img.src = this.imageURLInput;
    this.HttpClient.post
  }

  // When user clicks the middle update button, their current information changes
  // to new information.
  updateProfile(){

  }

  // When user clicks the bottom update button, their current password changes to
  // new password through authentication and validation.
  updatePassword(){

  }
}
