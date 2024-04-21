import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserService } from '../user.service';
import { QuestionService } from '../dyn-form/question.service';
import { QuestionBase } from '../dyn-form/question-base';
import { QuestionControlService } from '../dyn-form/question-control.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [
    trigger('myTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  Page = '';
  Status = '';
  TextVisible = true;
  userdata: any = [];
  questions: QuestionBase[] | null = [];

  constructor(
    private qcs: QuestionControlService,
    private userService: UserService,
    service: QuestionService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url) {
        if (event.url == '/registration') {
          this.Status = 'Sign Up';
          this.Page = 'signup';
          service.getSignUpQuestions().subscribe((data) => {
            this.questions = data;
          });
        } else {
          this.Status = 'Update';
          this.Page = 'update';
          service.getUpdateQuestions().subscribe((data) => {
            this.questions = data;
          });
        }
      }
    });
  }

  updateData() {
    this.userService.getUsersList().subscribe((data) => {
      this.userdata = data;
    });
  }

  ngOnInit() {
    this.updateData();
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase[]);
  }

  toggleVisibility() {
    this.TextVisible = this.TextVisible ? false : true;
  }

  getNextId(): number {
    let result = 0;
    result = this.userdata[this.userdata.length - 1].id + 1;
    return result;
  }

  pushToArray() {
    if (this.form.valid) {
      this.userService
        .createUser({
          id: this.getNextId(),
          name: this.form.controls['name'].value,
          age: Number(this.form.controls['age'].value),
        })
        .subscribe();
      this.form.reset();

      this.toggleVisibility();
      setTimeout(() => {
        this.Status = 'User Added!';
        this.toggleVisibility();
        this.updateData();
      }, 500);

      setTimeout(() => {
        this.toggleVisibility();
      }, 2000);

      setTimeout(() => {
        this.Status = 'ID : ' + this.userdata.length.toString();
        this.toggleVisibility();
      }, 2500);

      setTimeout(() => {
        this.toggleVisibility();
      }, 4000);

      setTimeout(() => {
        this.Status = 'Sign Up';
        this.toggleVisibility();
      }, 4500);
    }
  }

  checkIndex(id: number): number {
    var num = 0;
    for (let item of this.userdata) {
      if (item.id == id) {
        return num;
      }
      num = num + 1;
    }
    return -1;
  }

  makeChanges(event: any) {
    if (event.target.id == 'id') {
      var index = this.checkIndex(Number(this.form.controls['id'].value));
      if (index > -1) {
        this.form.controls['name'].setValue(this.userdata[index].name);
        this.form.controls['age'].setValue(this.userdata[index].age);

        this.toggleVisibility();
        setTimeout(() => {
          this.Status = 'User Found!';
          this.toggleVisibility();
        }, 500);

        setTimeout(() => {
          this.toggleVisibility();
        }, 2000);

        setTimeout(() => {
          this.Status = 'Update';
          this.toggleVisibility();
        }, 2500);
      }
    }
  }

  pushUpdateToArray() {
    if (this.form.valid) {
      if (this.checkIndex(Number(this.form.controls['id'].value)) > -1) {
        this.userService
          .updateUser(Number(this.form.controls['id'].value), {
            id: Number(this.form.controls['id'].value),
            name: this.form.controls['name'].value,
            age: Number(this.form.controls['age'].value),
          })
          .subscribe();

        this.form.reset();

        this.toggleVisibility();
        setTimeout(() => {
          this.Status = 'User Updated!';
          this.toggleVisibility();
        }, 500);

        setTimeout(() => {
          this.toggleVisibility();
        }, 2000);

        setTimeout(() => {
          this.Status = 'Update';
          this.toggleVisibility();
        }, 2500);
      } else {
        this.toggleVisibility();
        setTimeout(() => {
          this.Status = 'User Not Found!';
          this.toggleVisibility();
        }, 500);

        setTimeout(() => {
          this.toggleVisibility();
        }, 2000);

        setTimeout(() => {
          this.Status = 'Update';
          this.toggleVisibility();
        }, 2500);
      }
    }
  }
}
