import { IField } from "../interfaces/IField";
import { FieldLabel } from "../FieldLabel";
import { FieldType } from "../FieldType";
import { ConstructElement } from "../FieldLabel";
import randomIdGenerator from "../FieldLabel";

export class CheckboxField implements IField {
  name: string;
  label: FieldLabel;
  type: FieldType;
  value: string;
  formRenderable: HTMLElement;
  field: HTMLInputElement;

  constructor(name: string, labelName: string, value = "") {
    let fieldContainer = ConstructElement.build("div", "field-group");
    this.type = FieldType.Checkbox;

    this.name = name;
    this.value = value;

    let input = ConstructElement.build(
      "input",
      "input--checkbox"
    ) as HTMLInputElement;
    input.type = "checkbox";
    input.name = this.name;
    input.value = this.value;
    input.id = randomIdGenerator();

    this.label = new FieldLabel(labelName, input.id);

    fieldContainer.appendChild(this.label.formRenderable);
    fieldContainer.appendChild(input);

    this.field = input;
    this.formRenderable = fieldContainer;

    this.field.addEventListener("input", () => {
      this.value = this.field.value;
    });
  }

  render(where: string): void {
    document.querySelector(where).appendChild(this.formRenderable);
  }

  getValue(): string {
    return this.value;
  }
}
