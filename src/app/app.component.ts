import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostService } from './services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public declare modalRef: BsModalRef;
  public declare lastSubscription: Subscription;
  public declare lastId: number;

  public postForm: any = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    userId: new FormControl(1)
  });

  constructor(private modalService: BsModalService, private _postService: PostService) {
    this.postForm.valueChanges.subscribe((form: any) => {
      if (this.lastSubscription) {
        this.lastSubscription.unsubscribe();
      }
      if (form.id != this.lastId) {
        this.lastId = form.id;
        this.lastSubscription = this._postService.findById(form.id).subscribe(value => this.postForm.setValue(value));
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public onSubmit(): void {
    if (this.postForm.valid) {
      this._postService.edit(this.lastId, this.postForm.value).subscribe({
        next: payload => window.alert('Alterado com sucesso'),
        error: payload => window.alert('Ocorreu um erro')
      });
      this.modalRef.hide();
    } else {
      window.alert('Preencha os campos!');
    }
  }
}
