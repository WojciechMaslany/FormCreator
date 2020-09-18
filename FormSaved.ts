import { CheckboxField } from './basicClasses/CheckboxField'
import { EmailField } from './basicClasses/EmailField';
import { DateField } from './basicClasses/DateField';
import { TextAreaField } from './basicClasses/TextAreaField';
import { SelectField } from './basicClasses/SelectField';
import { InputField } from './basicClasses/InputField';
import { IField } from './interfaces/IField';
import { Form } from './Form';
export class FormSaved{
  id: string;
  allFields: string[];

  constructor(form: Form, savedId?: string, savedFields?: string[]){
    this.allFields = [];
    if(form){
      this.id = form.id;
      const fieldsArr: string[] = [];
  
      form.allFields.forEach(field => {
        fieldsArr.push(JSON.stringify(field));
      })
  
      this.allFields = fieldsArr;
      console.log(this.allFields, form)
    } else if(savedId){
      this.id = savedId;
      this.allFields = savedFields;
      console.log(this.allFields, form)
    }
  }

  toNormalForm(): Form{
    const parsedFields: IField[] = [];

    this.allFields.forEach(field => {
      parsedFields.push(this.parseField(field));
    })

    return new Form(parsedFields, this.id);
  }

  parseField(field: string): IField{
    const parsedField = JSON.parse(field);

    let name = parsedField.name;
    let labelName = parsedField.label.name;
    let value = parsedField.value;
    let options = parsedField.options;

    switch(parsedField.type){
      case 'TextInput':
        return new InputField(name, labelName, value);
      case 'Textarea':
        return new TextAreaField(name, labelName, value);
      case 'Date':
        return new DateField(name, labelName, value);
      case 'Email':
        return new EmailField(name, labelName, value);
      case 'Radio':
        return new SelectField(name, labelName, options);
      case 'Checkbox':
        return new CheckboxField(name, labelName, value);
    }
  }
}