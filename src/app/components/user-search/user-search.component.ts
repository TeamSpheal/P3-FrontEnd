import { environment } from 'src/environments/environment';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'search-users',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search-component.css']
})

export class SearchComponent implements OnInit{
    searchUrl = `${environment.baseUrl}/search/`
    input = '';
    users: any;

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
        this.input = "";
      }

      reloadCurrentPage() {
        setTimeout(function() {window.location.reload()}, 100);
      }

    async getUsers() {
    const input = this.input.split(" ");

    if(this.input){

        const upperCasedNames = input.map((name) => { 
            return name[0].toUpperCase() + name.substring(1); 
        }).join(" ").replace(/ /g,"_");
   
       this.showSearch();

        const resp = await fetch(`${this.searchUrl}` + upperCasedNames);
            if(resp.ok){
            this.users = await resp.json();
            this.users = this.users.reverse()
        
            console.log(this.users);
        }
    }else{
        this.hideSearch();
    }
}
}
