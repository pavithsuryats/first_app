import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userData } from '../user-data';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  animations: [
    trigger('myTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  Status = 'Update';
  TextVisible = true;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  toggleVisibility() {
    this.TextVisible = this.TextVisible ? false : true;
  }

  checkIndex(id: number): number {
    var num = 0;
    for (let item of userData) {
      if (item.id == id) {
        return num;
      }
      num = num + 1;
    }
    return -1;
  }

  makeChanges(input: any) {
    var index = this.checkIndex(Number((<HTMLInputElement>input.target).value));
    if (index > -1) {
      this.form.controls['name'].setValue(userData[index].name);
      this.form.controls['age'].setValue(userData[index].age);

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

  pushUpdateToArray() {
    if (
      this.form.controls['name'].valid &&
      this.form.controls['age'].valid &&
      this.form.controls['id'].valid
    ) {
      if (this.checkIndex(this.form.controls['id'].value) > -1) {
        userData.splice(Number(this.form.controls['id'].value) - 1, 1, {
          id: this.form.controls['id'].value,
          name: this.form.controls['name'].value,
          age: this.form.controls['age'].value,
        });

        this.form.controls['id'].reset();
        this.form.controls['name'].reset();
        this.form.controls['age'].reset();

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
