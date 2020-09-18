import {IField} from '../interfaces/IField';
import { FieldLabel } from '../FieldLabel';
import { FieldType } from '../FieldType';
import { ConstructElement } from "../FieldLabel";
import randomIdGenerator from "../FieldLabel";

export class SelectField implements IField{
    name: string;
    label: FieldLabel;
    type: FieldType;
    value: string;
    formRenderable: HTMLElement;
    field: HTMLInputElement;
    options: string[];

    constructor(name: string, labelName: string, options: string[]){
      let fieldContainer = ConstructElement.build('div', 'field-group');
      this.type = FieldType.Radio;
  
      this.name = name;
      this.label = new FieldLabel(labelName);
      fieldContainer.appendChild(this.label.formRenderable);
      this.options = options;
      
      this.options.forEach(option => {
        let radioContainer = ConstructElement.build('div', 'field-group__radio');
        let radioOption = ConstructElement.build('input', 'input--radio') as HTMLInputElement;
        let radioLabel = ConstructElement.build('label', 'field-group__radio__label', option) as HTMLLabelElement; 
  
        let id = randomIdGenerator();
        radioOption.name = this.name;
        radioOption.value = option;
        radioOption.type = 'radio';
  
        radioOption.id = id;
        radioLabel.htmlFor = id;
  
        radioContainer.appendChild(radioOption);
        radioContainer.appendChild(radioLabel);
  
        fieldContainer.appendChild(radioContainer);
  
        radioOption.addEventListener('change', () => {
          this.value = radioOption.value;
        })
      })
  
      this.formRenderable = fieldContainer;
    }

    render(where: string):void{
        document.querySelector(where).appendChild(this.formRenderable);
      }
    
      getValue(): string{
        return this.value;
      }
    }