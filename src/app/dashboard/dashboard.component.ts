import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { interval } from 'rxjs';
import { UserService } from '../user.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { InfoComponent } from '../Modals/info.component';
import { ConfirmComponent } from '../Modals/confirm.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('myTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  ageMean = 0;
  user: { id: number; name: string; age: number }[] = [];
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

  constructor(
    private userService: UserService,
    private SimpleModalService: SimpleModalService
  ) {}

  @ViewChild('ngxDatatable') ngxDatatable: DatatableComponent;

  showInfo(obj: any) {
    this.SimpleModalService.addModal(InfoComponent, {
      title: 'User Information',
      id: obj.id,
      name: obj.name,
      age: obj.age,
    });
  }

  showConfirm(id: number) {
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Confirm Delete',
      message: 'Are you sure want to delete?',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.userService.deleteUser(id).subscribe();
        setTimeout(() => {
          this.refreshList();
          this.user = [...this.user];
        }, 100);
      }
    });
  }

  refreshList() {
    this.userService.getUsersList().subscribe((data) => {
      this.user = data;
      this.updateAgeMean();
    });
  }

  ngAfterViewInit(): void {
    this.refreshList();
  }

  ngOnInit(): void {
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
    this.ageMean = Number(this.ageMean.toFixed(2));
  }
}
