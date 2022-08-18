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
    navUserDiv: HTMLDivElement;
    navLoginDiv: HTMLDivElement;
    navUsernameDiv: HTMLDivElement;
    navProfileDiv: HTMLDivElement;
    loggedIn: User;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.navUserDiv = <HTMLDivElement>document.getElementById("navUserDiv");
        this.navLoginDiv = <HTMLDivElement>document.getElementById("navLoginDiv");
        this.navUsernameDiv = <HTMLDivElement>document.getElementById("navUsernameDiv")
        this.navProfileDiv = <HTMLDivElement>document.getElementById("navProfileDiv");
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

        this.loggedIn = JSON.parse(<string>sessionStorage.getItem("user"));
        console.log(this.loggedIn);
        if (this.loggedIn == undefined) {
            this.navUserDiv.hidden = true;
            this.navLoginDiv.hidden = false;
        } else {
            this.navUserDiv.hidden = false;
            this.navLoginDiv.hidden = true;
            this.navProfileDiv.style.backgroundImage = "URL('" + this.loggedIn.profileImg + "')";
            this.navUsernameDiv.innerHTML = this.loggedIn.username;
        }
    }

    logout() {
        this.navUserDiv.hidden = true;
        this.navLoginDiv.hidden = false;
        this.navProfileDiv.style.backgroundImage = "";
        this.navUsernameDiv.innerHTML = "";
        this.authService.logout();
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
