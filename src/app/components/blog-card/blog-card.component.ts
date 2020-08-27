import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import{ SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit, OnDestroy {

  constructor(private blogService: BlogService,
    private snackBarService: SnackbarService) { }

  blogPost: Post[] = [];
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getBlogPosts();
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBlogPosts(){
    this.blogService.getAllPost()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.blogPost = result;
      });
  }

  delete(postId: string){
    if(confirm('Are you sure')){
      this.blogService.deletePost(postId).then(
        () => {
          this.snackBarService.showSnackBar('Blog post deleted successfully');
        }
      )
    }
  }
}
