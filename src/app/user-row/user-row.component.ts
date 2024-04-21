import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css'],
})
export class UserRowComponent {
  @Input() heading = false;
  @Input() id = 0;
  @Input() name = '';
  @Input() age = 0;
}
