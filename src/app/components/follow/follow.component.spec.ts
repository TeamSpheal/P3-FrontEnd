import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FollowComponent } from './follow.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('FollowComponent', () => {
    let followComp: FollowComponent;
    let route: ActivatedRoute;

    const fakeActivatedRoute = {
        snapshot: { paramMap: convertToParamMap({ 'id': '1' }) }
    } as ActivatedRoute;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FollowComponent],
            imports: [HttpClientTestingModule],
            providers: [UserProfileComponent,
                FollowComponent,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
        });
        followComp = TestBed.inject(FollowComponent);
    });

    it('should create', () => {
        expect(followComp).toBeTruthy();
    });
});
