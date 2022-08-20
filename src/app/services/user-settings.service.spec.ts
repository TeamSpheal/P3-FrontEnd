import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserSettingsService } from './user-settings.service';
import { HttpClient } from '@angular/common/http';
import User from '../models/User';
import { of } from 'rxjs'

describe('UserSettingsService', () => {
    /*Suite Variables*/
    const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);
    let userSettServ: UserSettingsService;
    let http: HttpClient;
    let httpCtrl: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        userSettServ = TestBed.inject(UserSettingsService);
        http = TestBed.inject(HttpClient);
        httpCtrl = TestBed.inject(HttpTestingController);
    });

    it('Service: should be created', () => {
        expect(userSettServ).toBeTruthy();
    });

    it('updateImage: should return the observable', async () => {
        expect(userSettServ.updateImage(mockUser)).toBeTruthy();
    });

    it('updateProfile: should return the observable', async () => {
        expect(userSettServ.updateProfile(mockUser)).toBeTruthy();
    });

    it('updatePassword: should return the observable', async () => {
        expect(userSettServ.updatePassword("password", mockUser)).toBeTruthy();
    });
    
    it('getResetPWToken: should return the observable', async () => {
        expect(userSettServ.getResetPWToken("email")).toBeTruthy();
    });
});
