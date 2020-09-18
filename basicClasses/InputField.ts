import { IField } from "../interfaces/IField";
import RandomIdGenerator, { ConstructElement, FieldLabel } from "../FieldLabel";
import { FieldType } from "../FieldType";

export class InputField implements IField {
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;
  formRenderable: HTMLElement;
  field: HTMLInputElement;

  constructor(name: string, labelName: string, value = ''){
    let fieldContainer = ConstructElement.build('div', 'field-group');
    this.type = FieldType.Input;

    this.name = name;
    this.value = value;

    let input = ConstructElement.build('input', 'input') as HTMLInputElement;
    input.type = 'input';
    input.name = this.name;
    input.value = this.value;
    input.id = RandomIdGenerator();

    this.label = new FieldLabel(labelName, input.id);

    fieldContainer.appendChild(this.label.formRenderable);
    fieldContainer.appendChild(input);

    this.field = input;
    this.formRenderable = fieldContainer;

    this.field.addEventListener('input', () => {
      this.value = this.field.value;
    })
  }


  render(where: string): void {
    document.querySelector(where).appendChild(this.formRenderable);
  }

  getValue(): string {
    return this.value;
  }
}
