import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }


 toggleDark(event: any){
  console.log(event.target.checked);
  
  if(event.target.checked){
    document.documentElement.setAttribute('data-theme', 'dark');
  }else{
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

}
