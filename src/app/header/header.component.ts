import { Component, OnInit,OnDestroy } from '@angular/core';
import{AuthService} from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit, OnDestroy{
  baseurl:String="http://3.134.93.237:5000/api/v1/";
  userData:object[];
  username:string;
  userEmail:string;
  authtoken:string;

  collapsed1 = true;
  collapsed2 =true;
     toggleCollapsed1(): void {
       this.collapsed1 = !this.collapsed1;
     }
     toggleCollapsed2(): void {
      this.collapsed2 = !this.collapsed2;
    }
     isAuthenticated = false;
     private userSub: Subscription;
   
     constructor(
       private authService: AuthService,
       private http: HttpClient
     ) {}
   
     ngOnInit() {
       this.userSub = this.authService.user.subscribe(user => {
         this.isAuthenticated = !!user;
         this.username=user.name;
         console.log(user.name);
         this.authtoken=user.token;
         

       });
     }

     getprofile(){
       console.log("getmethod")
      this.http
        .get(
          this.baseurl+"user/get-profile",
          {
            headers:new HttpHeaders(
              {
                "AuthorizationToken":this.authtoken
              }
            )
          }
        )
        .subscribe(
          responseData => {
            console.log(responseData);
            this.userData=responseData['data'];
            this.username=this.userData['name'];
            this.userEmail=this.userData['email'];
          },
        );
        this.toggleCollapsed2()
    }

     ngOnDestroy() {
      this.userSub.unsubscribe();
    }
   
}



