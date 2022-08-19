
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

    showSearch() {
        const overlay = document.getElementById('search');
        const close = document.getElementById('closeBtn');
        overlay?.style.setProperty('display','inline-block');
        close?.style.setProperty('display','inline-block');
      }
  
      hideSearch() {
        const overlay = document.getElementById('search');
        const close = document.getElementById('closeBtn');
        overlay?.style.setProperty('display','none');
        close?.style.setProperty('display','none');
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
            this.users = this.users.reverse()
        
            console.log(this.users);
        }
        this.showSearch();
    }else{
        this.hideSearch();
    }
}
}
