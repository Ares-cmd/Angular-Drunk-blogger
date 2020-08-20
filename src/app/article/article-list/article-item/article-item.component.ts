import { Component, OnInit, Input } from '@angular/core';
import { article } from '../../article.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() article:article;
  @Input() index:number;
  constructor() { }

  ngOnInit(): void {
  }

}
