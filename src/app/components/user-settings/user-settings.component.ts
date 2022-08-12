import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  imageURLInput = "";
  
  constructor() { }

  ngOnInit(): void {
    // Not currently in use.
  }

  // When user clicks the update button, the image URL changes to
  // set their pfp with a new one.
  updateImage(){
    this.imageURLInput = (<HTMLInputElement>document.getElementById("imgUrlText")).value;
    let img = document.getElementById("profileImg") as HTMLImageElement;
    img.src = this.imageURLInput;
  }

  updateProfile(){

  }

  updatePassword(){
    
  }

  updatePassword() {
      // This is in the process of being written.
  }
}
