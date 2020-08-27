import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import { ActivationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private db: AngularFirestore) { }

  createPost(post: Post){
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('blogs').add(postData);
  }
  
  getPostbyId(id: string): Observable<Post> {
    const blogDetails = this.db.doc<Post>('blogs/' + id).valueChanges();
    return blogDetails;
  }

  getAllPost(): Observable<Post[]> {
    const blogs = this.db.collection<Post>('blogs',
    ref => ref.orderBy('createdDate', 'desc'))
    .snapshotChanges().pipe(map(actions => {
      return actions.map(c => ({
        postId: c.payload.doc.id,
        ...c.payload.doc.data()
      }));
    }));
    return blogs;
  }
}
