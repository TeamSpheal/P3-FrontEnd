<<<<<<< HEAD

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
        const input = this.input.split(" ");

     
    if(this.input){

        let upperCasedNames = input.map((name) => { 
            return name[0].toUpperCase() + name.substring(1); 
        }).join(" ").replace(/ /g,"_");
   
       console.log(upperCasedNames)
       console.log('FETCH: http://localhost:8080/search/' + upperCasedNames );

        let resp = await fetch('http://localhost:8080/search/' + upperCasedNames);
            if(resp.ok){
            this.users = await resp.json();
        
            console.log(this.users);
        }
    }
}
}
