import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserRowComponent } from '../user-row/user-row.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SimpleModalModule } from 'ngx-simple-modal';
import { InfoComponent } from '../Modals/info.component';
import { ConfirmComponent } from '../Modals/confirm.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserRowComponent,
    InfoComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    SimpleModalModule,
  ],
})
export class DashboardModule {}
