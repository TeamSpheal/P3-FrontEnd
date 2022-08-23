import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostFeedPageComponent } from '../post-feed-page/post-feed-page.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  file: File;
 
  constructor(
    private postService: PostService,
    private postFeedPage: PostFeedPageComponent
  ){ }
  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0];
  }
  
  upload() {
    if (this.file) {
      this.postService.uploadImage(this.file).subscribe((resp: any) => {
        this.postFeedPage.postForm.patchValue({imageUrl: <string>resp.url});
        console.log(resp);
        alert("Uploaded");
      })
    } else {
      alert("Please select a file first")
    }
  }

}
