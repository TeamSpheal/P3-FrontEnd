import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/User';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    lightStatus: string;
    checkedStatus: boolean;
    navUserDiv: HTMLDivElement | any;
    navLoginDiv: HTMLDivElement | any;
    navUsernameDiv: HTMLDivElement | any;
    navProfileDiv: HTMLDivElement | any;
    loggedIn: User;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {

        this.navLoginDiv = <HTMLDivElement>document.getElementById("navLoginDiv");
        this.navUsernameDiv = <HTMLDivElement>document.getElementById("navUsernameDiv");
        //this.navProfileDiv = <HTMLDivElement>document.getElementById("navProfileDiv");
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
    
            if (currentTheme === 'dark') {
              this.checkedStatus = true
              this.lightStatus = "Dark"
            }else{
              this.checkedStatus = false;
              this.lightStatus = "Light"
            }
            
        }

        this.loggedIn = JSON.parse(<string>localStorage.getItem("user"));
        
    }


    logout() {

        this.authService.logout();

        this.router.navigate(['login']);
    }

    login() {
        this.router.navigate(['login']);
    }


    onChange(ob: MatSlideToggleChange) {
        if(ob.checked){
          this.lightStatus = "Dark"
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark')
        }else{
          this.lightStatus = "Light"
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light')
        }
    }
} 
