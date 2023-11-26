import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { from, fromEvent, map } from 'rxjs';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, AfterViewInit {

  public posts: Array<Post> = [];

  public filtrados: Array<Post> = [];

  @ViewChild('filtro') declare ref: ElementRef;

  constructor(private readonly _service: PostService) {}

  public ngOnInit(): void {
    this._service.findAll()
      .subscribe(posts => this.posts = posts);
  }

  public ngAfterViewInit(): void {
    const inputFiltro = <HTMLInputElement> this.ref.nativeElement;
    fromEvent(inputFiltro, 'input')
      .pipe(map(({ target }) => target as HTMLInputElement))
      .subscribe(e => {
        if (e.value.trim()) {
          this.filtrados = this.posts.filter(post => `${post.id}` == e.value || post.title.toLowerCase().includes(e.value.toLowerCase()));
        } else {
          this.filtrados = [];
        }
      });
  }
}
