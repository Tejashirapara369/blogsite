import { Component, OnInit } from '@angular/core';
import { Input, OnDestroy } from '@angular/core'; 
import { DatePipe } from '@angular/common'; 
import { AppUser } from 'src/app/models/appuser'; 
import { Comments } from 'src/app/models/comment'; 
import { CommentService } from 'src/app/services/comment.service'; 
import { AuthService } from 'src/app/services/auth.service'; 
import { SnackbarService } from 'src/app/services/snackbar.service'; 
import { Subject } from 'rxjs'; 
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [DatePipe] 
})
export class CommentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
