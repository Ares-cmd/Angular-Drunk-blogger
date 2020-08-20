import { Injectable } from '@angular/core';
import{post} from '../posts.model'
import { Subject } from 'rxjs';
import { comment } from './comment/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsChanged = new Subject<post[]>();
  commentChanged = new Subject<comment[]>();
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
  public posts:post[]=[];
  public comments:comment[]=[];
  constructor() { }

  getcomments() {
    return this.comments.slice();
  }

  getcomment(index: number) {
    return this.comments[index];
  }

  setcomments(comments: comment[]) {
    this.comments = comments['data']['comments'];
    this.commentChanged.next(this.comments.slice());
  }


  addposts(posts: post) {
    this.posts.push(posts);
    this.postsChanged.next(this.posts.slice());
  }


  getposts() {
    return this.posts.slice();
  }

  getpost(index: number) {
    return this.posts[index];
  }

  setposts(posts: post[]) {
    this.posts = posts['data']['posts'];
    this.postsChanged.next(this.posts.slice());
  }

}

