import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  ngOnInit(): void {
    // Not currently in use.
  }

  // When user clicks the update button, the image URL changes to
  // set their pfp with a new one.
  uploadImage(){
    document.getElementById("imageUrlText");
  }

  updatePassword() {
      // This is in the process of being written.
  }
}
