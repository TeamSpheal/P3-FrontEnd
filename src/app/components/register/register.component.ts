import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfanityFilterService } from 'src/app/services/profanity-filter.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router, private dirtyCheck: ProfanityFilterService) { }

  ngOnInit(): void {
    // Init to be filled in later
  }
  
  onSubmit(e: any): void {
    e.preventDefault()

    console.log("CLICKED REGISTER");
    let profaneCheck:boolean = this.dirtyCheck.isDirty(this.registerForm.value.username);
    console.log("DIRTY CHECK: " + profaneCheck);

    let profaneCheck2:boolean = this.dirtyCheck.isDirty(this.registerForm.value.email);

    if(profaneCheck || profaneCheck2){
      alert("Username/Email is forbidden, try again");
    }
    else{
    this.authService.register(this.registerForm.value.firstName || "", this.registerForm.value.lastName || "", this.registerForm.value.email || "", this.registerForm.value.password || "", this.registerForm.value.username || "")
      .subscribe(
        (response) => {
          this.router.navigate(['login'])
        }
      )

      }
  }

}
