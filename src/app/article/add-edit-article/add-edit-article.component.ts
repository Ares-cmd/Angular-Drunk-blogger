import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ArticleService } from '../article.service';
import { article } from '../article.model';
import { ActivatedRoute, Router,Params } from '@angular/router';
import{Location} from '@angular/common';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {

  baseurl:String="http://3.134.93.237:5000/api/v1/";
  private userSub1:Subscription;
  authtoken:string;
  userid:number;
  id=0;
  article:article;

  constructor( private http:HttpClient, private authService:AuthService,private articleservice:ArticleService,private router:Router,
    private location:Location,
    private route :ActivatedRoute) {}
 
  
  onSubmit(form:NgForm) {
    const title = form.value.title;
    console.log('sumit');
    this.http
    .post(
      this.baseurl+'article/add-edit-article',
      {id:this.id,title:title},
      {
        headers:new HttpHeaders(
          {
            "AuthorizationToken":this.authtoken
          }
        )
      }
      
    ).subscribe(
      resData =>{
        console.log(resData);
        }
    );
    
}
  ngOnInit(){
  this.userSub1 = this.authService.auth__token.subscribe(user => {
    this.authtoken=user.token;
    this.userid=user.id;
    
    this.route.params
        .subscribe(
          (params: Params) => {
            if (params['id']){
            this.id = 1+ +params['id'];
            this.article = this.articleservice.getarticle(this.id);
            }
          }
        );


}
  );
}

onCancel(){
  this.location.back();
}

ngOnDestroy() {
  this.userSub1.unsubscribe();
}
}
