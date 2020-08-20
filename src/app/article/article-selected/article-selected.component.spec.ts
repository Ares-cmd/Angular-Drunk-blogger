import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSelectedComponent } from './article-selected.component';

describe('ArticleSelectedComponent', () => {
  let component: ArticleSelectedComponent;
  let fixture: ComponentFixture<ArticleSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
