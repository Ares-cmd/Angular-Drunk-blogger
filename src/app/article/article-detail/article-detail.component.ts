import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { article } from '../article.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article :article;
  id:number;
  private userSub1:Subscription;
  authtoken:string;
  message:String=null;
  baseurl:String="http://3.134.93.237:5000/api/v1/";


  constructor(private articleService:ArticleService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private http:HttpClient) { }


  ngOnInit() {
      this.userSub1 = this.authService.auth__token.subscribe(user => {
        this.authtoken=user.token;
      }
      )
        
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.article=this.articleService.getarticle(this.id);
          }
        );
    }
    
    
    
  editarticle(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deletearticle(){
    this.http
    .post(
      this.baseurl+'article/delete-article',
      {id:this.id +1},
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
        this.message=resData['message'];
        }

    );  
}

  addpost(){
    this.router.navigate(['editp'], {relativeTo: this.route});
  }

}
