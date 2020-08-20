import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PostService } from '../post/post.service';
import { post } from '../posts.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  baseurl:String="http://3.134.93.237:5000/api/v1/";
  private userSub1:Subscription;
  authtoken:string;
  article_id:number;
  id:number;


  constructor(private http: HttpClient,private postservice:PostService,private authService:AuthService,private route:ActivatedRoute,
    private router: Router,
    private articleservice:ArticleService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(){
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.article_id=this.articleservice.getarticle(this.id).id;
            console.log(this.article_id)
          }
        );

    this.userSub1 = this.authService.user.subscribe(user => {
      console.log(user.name);
      this.authtoken=user.token;
      this.fetchposts();
  }
    );
}

  fetchposts(){
    this.http
      .post<post[]>(
        this.baseurl+'post/get-posts',
        {offset: 0,
        limit: 10,
        article_id:this.article_id+1
      //  article_id:1
      },
        {
          headers:new HttpHeaders(
            {
              "AuthorizationToken":this.authtoken
            }
          )
        }
        
      ).subscribe(posts =>{
        console.log(posts);
          this.postservice.setposts(posts);
        }

        )
      
  }
  ngOnDestroy() {
    this.userSub1.unsubscribe();
  }
}
