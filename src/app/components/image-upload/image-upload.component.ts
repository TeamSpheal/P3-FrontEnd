import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  file: File;
 
  constructor(
    private postService: PostService
  ){ }
  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }
  
  upload() {
    if (this.file) {
      this.postService.uploadImage(this.file).subscribe(resp => {
        console.log(resp);
        alert("Uploaded");
      })
    } else {
      alert("Please select a file first")
    }
  }

}
