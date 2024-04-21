import { Injectable } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable({
  providedIn: 'root',
})
export class QuestionControlService {
  toFormGroup(questions: QuestionBase[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    return new FormGroup(group);
  }
}
