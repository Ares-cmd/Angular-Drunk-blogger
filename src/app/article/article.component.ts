import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ArticleService } from '../article/article.service';
import { article } from '../article/article.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  baseurl:String="http://3.134.93.237:5000/api/v1/";
  private userSub1:Subscription;
  authtoken:string;

  constructor(private http: HttpClient,private articleservice:ArticleService,private authService:AuthService) {}

  ngOnInit(){
    this.userSub1 = this.authService.user.subscribe(user => {
      console.log(user.name);
      this.authtoken=user.token;
      this.fetcharticles();
      
  }
    );
}

  fetcharticles(){
    console.log("fetch articles");
    console.log(this.authtoken);
    this.http
      .post<article[]>(
        this.baseurl+'article/get-articles',
        {offset: 0,
        limit: 10},
        {
          headers:new HttpHeaders(
            {
              "AuthorizationToken":this.authtoken
            }
          )
        }
        
      ).subscribe(articles =>{
        console.log(articles);
          this.articleservice.setarticles(articles);
        }

        )
      
  }
  ngOnDestroy() {
    this.userSub1.unsubscribe();
  }
}
