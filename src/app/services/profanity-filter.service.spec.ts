import { TestBed } from '@angular/core/testing';

import { ProfanityFilterService } from './profanity-filter.service';

describe('ProfanityFilterService', () => {
    let service: ProfanityFilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProfanityFilterService);
    });

    it('Service: should be created', () => {
        expect(service).toBeTruthy();
    });

    it('cleanText: should replace text', () => {
        /*Local Variables*/
        const input = "fluff";

        /*Function*/
        const output = <string>service.cleanText(input);

        /*Test*/
        expect(input).not.toBe(output);
    });

    it('cleanText: should not replace text', () => {
        /*Local Variables*/
        const input = "hello";

        /*Function*/
        const output = <string>service.cleanText(input);

        /*Test*/
        expect(input).toBe(output);
    });

    it('isDirty: should return false', () => {
        /*Local Variables*/
        const input = "hello";

        /*Mocks*/
        spyOn(service, 'cleanText').and.returnValue(input);

        /*Test*/
        expect(service.isDirty(input)).toBeFalse();
    });

    it('isDirty: should return true', () => {
        /*Local Variables*/
        const input = "hello";
        const mockOutput = "hey";

        /*Mocks*/
        spyOn(service, 'cleanText').and.returnValue(mockOutput);

        /*Test*/
        expect(service.isDirty(input)).toBeTrue();
    });
});
