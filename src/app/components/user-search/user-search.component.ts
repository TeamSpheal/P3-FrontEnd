
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'search-users',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search-component.css']
})

export class SearchComponent implements OnInit{
    input: string = '';
    users: any;

    constructor() {}



    ngOnInit(): void {
        this.getUsers();
    }

    async getUsers() {
        
        let resp = await fetch('http://localhost:8080/search/' + this.input);
        if(resp.ok){
            this.users = await resp.json();
            console.log(this.users);

        }
    }
}
