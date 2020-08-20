import { Injectable } from '@angular/core';
import { article } from './article.model';
import { post } from './posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesChanged = new Subject<article[]>();

  // private articles:article[]=[
  //   new article(
  //     'Artcle number 1',
  //     [new post('post1','post1 description')]

  //   ),
  //   new article(
  //     'Artcle number 2',
  //     [new post('post1','post1 description')]

  //   )

  // ]
  private articles:article[]=[];
  constructor() { }
  getarticles() {
    return this.articles.slice();
  }

  getarticle(index: number) {
    return this.articles[index];
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  setarticles(articles: article[]) {
    this.articles = articles['data']['articles'];
    console.log(articles)
    this.articlesChanged.next(this.articles.slice());
  }


  addarticle(article: article) {
    this.articles.push(article);
    this.articlesChanged.next(this.articles.slice());
  }

  // updatearticle(index: number, newarticle: article) {
  //   this.articles[index] = newarticle;
  //   this.articlesChanged.next(this.articles.slice());
  // }

  // deletearticle(index: number) {
  //   this.articles.splice(index, 1);
  //   this.articlesChanged.next(this.articles.slice());
  // }
}

