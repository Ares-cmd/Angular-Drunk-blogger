import { Component, OnInit } from '@angular/core';
import { article } from '../article.model';
import { Subscription } from 'rxjs';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles:article[];
  subscription:Subscription;

  constructor(private articleservice:ArticleService,
            private router:Router,
              private route:ActivatedRoute,
              ) { }

  ngOnInit() {
    // this.datastorageservice.fetcharticles().subscribe();
    this.subscription = this.articleservice.articlesChanged
      .subscribe(
        (articles: article[]) => {
          this.articles = articles;
        }
      );
    this.articles = this.articleservice.getarticles();
  }

  onNewArticle() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  }

