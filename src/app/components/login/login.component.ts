import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Init to be filled in later
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
      this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
          (response: HttpResponse<any>) => {
            this.authService.currentUser = response.body
            sessionStorage.setItem("user", JSON.stringify(response.body));
            sessionStorage.setItem("JWT", <string>response.headers.get("Auth"));
            environment.headers.Auth = <string>sessionStorage.getItem("JWT");
            this.router.navigate(['post-feed'])
        }
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
