
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'sear-users',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search-component.css']
})

export class SearchComponent implements OnInit{
    input = '';
    users: any;
    first = '';
    last = '';

    ngOnInit(): void {
        this.getUsers();
    }

    async getUsers() {
        
        // let resp = await fetch('http://localhost:8080/search/' + this.input);
        // if(resp.ok){
        //     this.users = await resp.json();
        //     console.log(resp);

        //     angular.forEach(this.users, function (value, key) {
        //         $scope.names.push(value.name);
        //     });





        //     this.first = this.users[0].firstName;
        //     this.last = this.users[0].lastName;
        //     console.log(this.users);
        //     console.log(this.last);
        // }
    }
}

