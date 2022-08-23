import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserProfileComponent } from './user-profile.component';

import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let route: ActivatedRoute;

  const fakeActivatedRoute = {
    snapshot: { paramMap: convertToParamMap({'id': '1'}) }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UserProfileComponent ],
      providers: [UserProfileComponent, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });

    component = TestBed.inject(UserProfileComponent);
    route = TestBed.inject(ActivatedRoute);
    route.params = of({'id': '1'});
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});