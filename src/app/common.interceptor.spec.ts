import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommonInterceptor } from './common.interceptor';

describe('CommonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      CommonInterceptor
      ]
  }));

  it('Service: should be created', () => {
    const interceptor: CommonInterceptor = TestBed.inject(CommonInterceptor);
    expect(interceptor).toBeTruthy();
  });


});
