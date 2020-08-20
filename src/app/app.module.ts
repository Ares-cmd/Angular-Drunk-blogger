import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserpageComponent } from './userpage/userpage.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleItemComponent } from './article/article-list/article-item/article-item.component';
import { ArticleSelectedComponent } from './article/article-selected/article-selected.component';
import { AddEditArticleComponent } from './article/add-edit-article/add-edit-article.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { PostComponent } from './article/post/post.component';
import { PostItemComponent } from './article/post/post-item/post-item.component';
import { PostListComponent } from './article/post/post-list/post-list.component';
import { AddEditPostComponent } from './article/post/add-edit-post/add-edit-post.component';
import { CommentComponent } from './article/post/comment/comment.component';
import { CommentListComponent } from './article/post/comment/comment-list/comment-list.component';
import { CommentItemComponent } from './article/post/comment/comment-list/comment-item/comment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UserpageComponent,
    AuthComponent,
    HeaderComponent,
    ArticleComponent,
    ArticleListComponent,
    ArticleItemComponent,
    ArticleSelectedComponent,
    AddEditArticleComponent,
    ArticleDetailComponent,
    PostComponent,
    PostItemComponent,
    PostListComponent,
    AddEditPostComponent,
    CommentComponent,
    CommentListComponent,
    CommentItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
