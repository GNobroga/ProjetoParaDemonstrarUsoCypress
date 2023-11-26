import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  inputs: ["userId", "id", "title", "body"]
})
export class PostComponent {

  declare id: number;
  declare title: string;
  declare body: string;
}
