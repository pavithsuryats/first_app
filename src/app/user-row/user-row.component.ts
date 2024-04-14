import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.css',
})
export class UserRowComponent {
  @Input() heading = false;
  @Input() id = 0;
  @Input() name = '';
  @Input() age = 0;
}
