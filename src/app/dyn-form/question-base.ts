export class QuestionBase {
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string;

  constructor(
    options: {
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: { key: string; value: string }[];
    } = {}
  ) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
  }
}
