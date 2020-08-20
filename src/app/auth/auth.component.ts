import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService,AuthResponseData} from './auth.service';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {

  isLoginMode = true;
  error: string = null;
  constructor(private authService :AuthService, private router: Router){
  }
  onRegisterMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs=this.authService.login(email, password);
    } else {
      authObs=this.authService.signup(name,email, password);
    }

    authObs.subscribe(
        resData =>{
          console.log(resData);
          this.error=resData.message;
          if (resData.status){
          this.router.navigate(['/userpage']);
          }
        }
      );
    form.reset();
    }
    

}
