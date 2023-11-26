import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Post from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private readonly _http: HttpClient) { }

  public findAll(): Observable<Array<Post>> {
    return this._http.get<Array<Post>>(this.BASE_URL);
  }

  public edit(id: number, post: Post) {
    return this._http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
  }

  public findById(id: number): Observable<Post> {
    return this._http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
