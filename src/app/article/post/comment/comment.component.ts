import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { comment } from './comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  baseurl:String="http://3.134.93.237:5000/api/v1/";
  private userSub1:Subscription;
  authtoken:string;
  id:number;


  constructor(private http: HttpClient,private postservice:PostService,private authService:AuthService,private route:ActivatedRoute,
    private router: Router,) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(){
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
          }
        );

    this.userSub1 = this.authService.user.subscribe(user => {
      console.log(user.name);
      this.authtoken=user.token;
  }
    );
}

  ngOnDestroy() {
    this.userSub1.unsubscribe();
  }

}
