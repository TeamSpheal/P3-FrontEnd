import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  checkedStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const isDark = localStorage.getItem('checkbox') ? localStorage.getItem('checkbox') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (isDark === 'true') {
          this.checkedStatus = true
        }else{
          this.checkedStatus = false;
        }
        
    }

  }

  ngOnDestroy() {
  }

  logout() {
    document.documentElement.setAttribute('data-theme', 'light');
    this.authService.logout();
    this.router.navigate(['login']);

  }

  
  onChange(ob: MatCheckboxChange) {

    if(ob.checked){
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('checkbox', 'true');
      localStorage.setItem('theme', 'dark')
    }else{
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('checkbox', 'false');
      localStorage.setItem('theme', 'light')
    }
  } 

}
