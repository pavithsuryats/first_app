import { Component, OnInit } from '@angular/core';
import { IOutputData, SplitAreaDirective, SplitComponent } from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  leftSize: number = 5;
  rightSize: number = 95;

  title = 'myApp';

  isSideNavCollapsed = false;
  screenWidth = 0;
  leftscreensize = 0;
  rightscreensize = 0;

  onDrag(event: IOutputData): void {
    this.leftscreensize = Number(event.sizes[0]);
    this.rightscreensize = Number(event.sizes[1]);
  }
}
