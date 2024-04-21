import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { AngularSplitModule } from 'angular-split';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { QuestionControlService } from './dyn-form/question-control.service';
import { QuestionService } from './dyn-form/question.service';

@NgModule({
  declarations: [AppComponent, BodyComponent, SidenavComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularSplitModule,
    HttpClientModule,
  ],
  providers: [UserService, QuestionControlService, QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
