import { Component, OnInit } from '@angular/core';
import { post } from '../../posts.model';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts:post[];
  subscription:Subscription;

  constructor(private postservice:PostService,
            private router:Router,
              private route:ActivatedRoute,
              ) { }

  ngOnInit() {
    // this.datastorageservice.fetcharticles().subscribe();
    this.subscription = this.postservice.postsChanged
      .subscribe(
        (posts: post[]) => {
          this.posts = posts;
        }
      );
    this.posts = this.postservice.getposts();
  }

  // onNewArticle() {
  //   this.router.navigate(['new'], {relativeTo: this.route});
  // }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
