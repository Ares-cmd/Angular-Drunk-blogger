import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments:comment[]
  subscription:Subscription;

  constructor(private postservice:PostService,
            private router:Router,
              private route:ActivatedRoute,
              ) { }

  ngOnInit() {
    // this.datastorageservice.fetcharticles().subscribe();
    this.subscription = this.postservice.commentChanged
      .subscribe(
        (comments: comment[]) => {
          this.comments = comments;
        }
      );
    this.comments = this.postservice.getcomments();
  }

  // onNewArticle() {
  //   this.router.navigate(['new'], {relativeTo: this.route});
  // }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

