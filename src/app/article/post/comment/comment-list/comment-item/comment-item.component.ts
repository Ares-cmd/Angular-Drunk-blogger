import { Component, OnInit,Input} from '@angular/core';
import { comment } from '../../comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment:comment;
  @Input() index:number;
  constructor() { }

  ngOnInit(): void {
  }

}
