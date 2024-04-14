import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { userData } from '../user-data';
import { UserRowComponent } from '../user-row/user-row.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserRowComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('myTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  ageMean = 0;
  user = userData;
  Status = 'Bonjour ✨';
  TextVisible = true;
  index = 0;
  interval = 3000;

  dashWords = [
    'Good morning,',
    "In case I don't see ya",
    'Good afternoon',
    'Good evening',
    'and Good night.',
  ];

  toggleVisibility() {
    this.TextVisible = !this.TextVisible;

    if (this.index > 4) {
      this.index = 0;
    }

    setTimeout(() => {
      this.Status = this.dashWords[this.index];
      this.index += 1;
    }, 1000);

    setTimeout(() => {
      this.TextVisible = !this.TextVisible;
    }, 1500);
  }

  ngOnInit(): void {
    this.updateAgeMean();
    interval(this.interval).subscribe((x) => {
      this.toggleVisibility();
    });
  }

  isNan(num: number) {
    return isNaN(num);
  }

  updateAgeMean() {
    this.ageMean = 0;
    var index = 0;
    for (let item of this.user) {
      this.ageMean += item.age;
      index += 1;
    }
    this.ageMean /= index;
  }
}
