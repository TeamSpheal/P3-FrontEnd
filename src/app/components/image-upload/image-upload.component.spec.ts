import { TestBed } from '@angular/core/testing';
import { ImageUploadComponent } from './image-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFeedPageComponent } from '../post-feed-page/post-feed-page.component';
import { PostService } from 'src/app/services/post.service';
import { from, of } from 'rxjs';

describe('ImageUploadComponent', () => {
  let imgUplComp: ImageUploadComponent;
  let postServ: PostService;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ImageUploadComponent, PostFeedPageComponent]
      })
      imgUplComp = TestBed.inject(ImageUploadComponent);
      postServ = TestBed.inject(PostService);
  });

  it('component should create', () => {
    expect(imgUplComp).toBeTruthy();
  });

  it('method should upload the chosen file', () => {
    /* Mocks */
    imgUplComp.file = new File([], "file", undefined);
    spyOn(postServ, 'uploadImage').and.callFake(() => {
      return from(of("fake image"));
    });
    spyOn(window, 'alert');

    /* Function */
    imgUplComp.upload();

    /* Test */
    expect(window.alert).toHaveBeenCalledWith('Uploaded');
  });

  it('method should alert if upload failed', () => {
    /* Mocks */
    spyOn(window, 'alert');

    /* Function */
    imgUplComp.upload();

    /* Test */
    expect(window.alert).toHaveBeenCalledWith('Please select a file first');
  });
});

