import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from '../dyn-form/dynamic-form-question/dynamic-form-question.component';

@NgModule({
  declarations: [FormComponent, DynamicFormQuestionComponent],
  imports: [CommonModule, FormRoutingModule, FormsModule, ReactiveFormsModule],
})
export class FormModule {}
