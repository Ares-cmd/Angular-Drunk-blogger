import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserpageComponent } from './userpage/userpage.component';
import { AuthComponent } from './auth/auth.component';
import {ArticleSelectedComponent} from './article/article-selected/article-selected.component';
import { AddEditArticleComponent } from './article/add-edit-article/add-edit-article.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { PostComponent } from './article/post/post.component';
import { PostListComponent } from './article/post/post-list/post-list.component';
import { AddEditPostComponent } from './article/post/add-edit-post/add-edit-post.component';

const routes: Routes = [
  {path: '',component: AuthComponent},
  {path:'userpage',component:UserpageComponent,

  children: [
    { path: '', component: ArticleSelectedComponent },
    { path: 'new', component: AddEditArticleComponent},
    {
      path: ':id',
      component: ArticleDetailComponent,
      children:[
        {
          path: '',
          component:PostListComponent,
          // children:[
          //   {
          //     path: '',
          //     component:PostListComponent
          //   }
          // ]
        }
      ]
    },
    {
      path: ':id/edit',
      component:AddEditArticleComponent,
    },
    {
      path: ':id/editp',
      component:AddEditPostComponent,
    },
    
    
]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
