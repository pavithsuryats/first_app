import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface InfoModel {
  title?: string;
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-modal-info',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ title }}</h4>
      </div>
      <div class="modal-body">
        <p>ID : {{ id }}</p>
        <p>Name : {{ name }}</p>
        <p>Age : {{ age }}</p>
      </div>
      <div class="modal-footer" style="margin-bottom: 1rem;">
        <button type="button" class="btn btn-primary" (click)="close()">
          OK
        </button>
      </div>
    </div>
  `,
})
export class InfoComponent
  extends SimpleModalComponent<InfoModel, null>
  implements InfoModel
{
  title: string;
  id: number;
  name: string;
  age: number;
  constructor() {
    super();
  }
}
