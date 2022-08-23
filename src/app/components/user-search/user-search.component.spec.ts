import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import User from "src/app/models/User";
import { SearchComponent } from './user-search.component'

describe('SearchComponent', () => {

    let searchComp:SearchComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SearchComponent]
        })
        searchComp = TestBed.inject(SearchComponent);
    });

    it('Component: should create', () => {
        expect(searchComp).toBeTruthy();
    });

    it('ngOnInit: should call getUsers', () => {

        /*Mocking*/
        spyOn(searchComp, 'getUsers').and.resolveTo();

        /*Calling OnInit()*/
        searchComp.ngOnInit();

        /*Test*/
        expect(searchComp.getUsers).toHaveBeenCalled();

    }); 

    it('showSearch: should show the Search', () => {

        /*Local Variable*/
        const testDiv = document.createElement('div');

        /*Mocking*/
        spyOn(document, 'getElementById').and.returnValue(testDiv);
        spyOn(testDiv.style, 'setProperty');

        /*Calling showSearch()*/
        searchComp.showSearch();

        /*Test*/
        expect(testDiv.style.setProperty).toHaveBeenCalled();

    });

    it('hideSearch: should hide the Search', () => {

        /*Local Variable*/
        const testDiv = document.createElement('div');

        /*Mocking*/
        spyOn(document, 'getElementById').and.returnValue(testDiv);
        spyOn(testDiv.style, 'setProperty');

        /*Calling showSearch()*/
        searchComp.hideSearch();

        /*Test*/
        expect(testDiv.style.setProperty).toHaveBeenCalled();

    });

    it('getUsers: should display list of users', () => {

        /*Local Variables*/

        const mockUser: User = new User(1, 'testuser@gmail.com', 'Test', 'User',
        'TestUser1', 'assets/images/favicon.png', [], []);

        const mockResponse = new Response(JSON.stringify([mockUser]), {status: 200});

        /*Mocking*/
        searchComp.input = 'goodValue';

        spyOn(searchComp, 'showSearch').and.callFake( ()=> {
            //do nothing
        });

        spyOn(window, 'fetch').and.resolveTo(mockResponse);

        /*Call getUsers method*/
        searchComp.getUsers();

        /*Test*/
        expect(searchComp.showSearch).toHaveBeenCalled();

    });


    
    it('getUsers: should not display list of users', () => {

        spyOn(searchComp, 'hideSearch').and.callFake( ()=> {
            //do nothing
        });

        /*Call getUsers method*/
        searchComp.getUsers();

        /*Test*/
        expect(searchComp.hideSearch).toHaveBeenCalled();

    });

});