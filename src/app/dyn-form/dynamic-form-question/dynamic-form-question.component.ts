import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase;
  @Input() form!: FormGroup;
  get isValid() {
    return (
      this.form.controls[this.question.key].invalid &&
      this.form.controls[this.question.key].touched
    );
  }
}
