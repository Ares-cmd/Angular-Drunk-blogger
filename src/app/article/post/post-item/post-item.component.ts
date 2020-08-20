import { Component, OnInit,Input } from '@angular/core';
import { post } from '../../posts.model';
import { ArticleService } from '../../article.service';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { article } from '../../article.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { comment } from '../comment/comment.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:post;
  @Input() index:number;
  article :article;
  id:number;
  desc:string;
  private userSub1:Subscription;
  authtoken:string;
  message:String=null;
  baseurl:String="http://3.134.93.237:5000/api/v1/";
  
  constructor(private articleService:ArticleService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private http:HttpClient,
    private postservice:PostService) { }


  ngOnInit() {
      this.userSub1 = this.authService.auth__token.subscribe(user => {
        this.authtoken=user.token;
      }
      )
       
      this.id=this.postservice.getpost(this.index).id;
    }
    
  comment(){
      this.http
        .post<comment[]>(
          this.baseurl+'comment/get-comments',
          {
         post_id:this.id},
          {
            headers:new HttpHeaders(
              {
                "AuthorizationToken":this.authtoken
              }
            )
          }
          
        ).subscribe(comments=>{
          console.log(comments);
            this.postservice.setcomments(comments);
          }
  
          )
        
    }


  onSubmit(form:NgForm) {
    const desc=form.value.desc;
    this.http
    .post(
      this.baseurl+'comment/add-comment',
      {post_id:this.id,
      desc:desc},
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
    
  deletepost(){
    console.log(this.index);
    this.http
    .post(
      this.baseurl+'post/delete-post',
      {id:this.id},
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
}
