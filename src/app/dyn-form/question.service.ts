import { Injectable } from '@angular/core';
import { QuestionBase } from './question-base';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getSignUpQuestions() {
    const questions: QuestionBase[] = [
      new QuestionBase({
        key: 'name',
        label: 'Name ',
        type: 'text',
        required: true,
        order: 1,
      }),

      new QuestionBase({
        key: 'age',
        label: 'Age ',
        type: 'number',
        required: true,
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  getUpdateQuestions() {
    const questions: QuestionBase[] = [
      new QuestionBase({
        key: 'id',
        label: 'ID ',
        type: 'number',
        required: true,
        order: 1,
      }),
      new QuestionBase({
        key: 'name',
        label: 'Name ',
        type: 'text',
        required: true,
        order: 2,
      }),

      new QuestionBase({
        key: 'age',
        label: 'Age ',
        type: 'number',
        required: true,
        order: 3,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
