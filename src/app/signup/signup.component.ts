import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { userData } from '../user-data';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule, CommonModule],
  animations: [
    trigger('myTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  Status = 'Sign Up';
  TextVisible = true;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  toggleVisibility() {
    this.TextVisible = this.TextVisible ? false : true;
  }

  pushToArray() {
    if (this.form.controls['name'].valid && this.form.controls['age'].valid) {
      userData.push({
        id: userData.length + 1,
        name: this.form.controls['name'].value,
        age: this.form.controls['age'].value,
      });
      this.form.controls['name'].reset();
      this.form.controls['age'].reset();

      this.toggleVisibility();
      setTimeout(() => {
        this.Status = 'User Added!';
        this.toggleVisibility();
      }, 500);

      setTimeout(() => {
        this.toggleVisibility();
      }, 2000);

      setTimeout(() => {
        this.Status = 'ID : ' + userData.length.toString();
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
}
