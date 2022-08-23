import { TestBed } from '@angular/core/testing';
import { ImageUploadComponent } from './image-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFeedPageComponent } from '../post-feed-page/post-feed-page.component';

describe('ImageUploadComponent', () => {
  let imgUrlComp: ImageUploadComponent;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ImageUploadComponent, PostFeedPageComponent]
      })
      imgUrlComp = TestBed.inject(ImageUploadComponent);
  });

  it('should create', () => {
    expect(imgUrlComp).toBeTruthy();
  });
});
