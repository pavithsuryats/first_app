import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  Input,
} from '@angular/core';
import { navbarData } from './nav-data';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([style({ transform: 'rotate(1turn)', offset: '1' })])
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms',
          keyframes([style({ transform: 'rotate(1turn)', offset: '1' })])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent {
  @Input() screenWidth = 0;

  collapsed = false;

  navData = navbarData;

  getClass(): string {
    if (this.screenWidth > 15) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
    return '';
  }
}
