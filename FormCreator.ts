import { LocStorage } from './LocStorage';
import { Form } from './Form';
import { IField} from './interfaces/IField'
import { CheckboxField } from './basicClasses/CheckboxField'
import { EmailField } from './basicClasses/EmailField';
import { DateField } from './basicClasses/DateField';
import { TextAreaField } from './basicClasses/TextAreaField';
import { SelectField } from './basicClasses/SelectField';
import { InputField } from './basicClasses/InputField';
import { Button, ConstructElement } from './FieldLabel';
import {FieldType} from './FieldType'

export class FormCreator {
  form: Form;

  newForm(){
    let form = new Form([]);

    let fieldCreator = new FieldCreator(form);
    form.formRenderable.appendChild(fieldCreator.container);

    this.form = form;
    form.render('#app', this.saveForm.bind(this));
  }

  saveForm(){
    const storage = new LocStorage();

    storage.saveForm(this.form);
    alert('Form saved');

    window.location.href = 'index.html';
  }

  constructor(){

  }
}

export class FieldCreator{
  container = ConstructElement.build('div', 'app-new-row') as HTMLDivElement;
  form: Form;

  constructor(form: Form){
    this.form = form;

    const title = ConstructElement.build('h2', 'small-title', 'Choose the field type');

    const newRowBtnsWrap = ConstructElement.build('div', 'app-new-row__btn-wrap');
  
    for(let fieldType in FieldType){
      if(this.getFieldTypeName(fieldType)){
        const btn = ConstructElement.build('button', 'rect-btn', this.getFieldTypeName(fieldType));

        btn.addEventListener('click', () => {
          this.getFieldInfo(fieldType);
        })
    
        newRowBtnsWrap.appendChild(btn);
      }
    }
  
    this.container.appendChild(title);
    this.container.appendChild(newRowBtnsWrap);
  }

  getFieldInfo(fieldType: string){
    this.container.innerHTML = '';
    const infoCon = ConstructElement.build('div', 'app-new-row__info-con');
    const nameInput = new InputField('get-input-name', 'Input name');
    const labelInput = new InputField('get-input-label', 'Input label text');
    const valueInput = new InputField('get-input-label', 'Input default value (leave empty if none)');

    infoCon.appendChild(nameInput.formRenderable);
    infoCon.appendChild(labelInput.formRenderable);

    if(fieldType !== 'Radio' && fieldType !== 'Checkbox'){
      infoCon.appendChild(valueInput.formRenderable);
    }

    let optionsInput: IField = null;

    if(fieldType === 'Radio'){
      optionsInput = new InputField('get-input-radio', 'Radio options\' values (seperated by semicolons, f.e "Cookies;Bananas;Pancakes")');
      infoCon.appendChild(optionsInput.formRenderable);
    }

    const btnWrap = ConstructElement.build('div', 'button-con');

    const confirmBtn = new Button('Confirm', () => {
      this.FieldCreator(
        fieldType,
        nameInput.getValue(),
        labelInput.getValue(),
        fieldType !== 'Radio' && fieldType !== 'Checkbox' ? valueInput.value : '',
        optionsInput ? optionsInput.value.split(';') : null
      )
    });

    const cancelBtn = new Button('Cancel', () => {
      this.reRender();
    });

    btnWrap.appendChild(confirmBtn.formRenderable);
    btnWrap.appendChild(cancelBtn.formRenderable);

    infoCon.appendChild(btnWrap);
    this.container.appendChild(infoCon);
  }

  getFieldTypeName(fieldType: string) {
    switch(fieldType){
      case 'Input':
        return 'Input';

      case 'Textarea':
        return 'Textarea';
  
      case 'Date':
        return 'Date Input';
  
      case 'Email':
        return 'Email Input';
  
      case 'Radio':
        return 'Radio Input';
  
      case 'Checkbox':
        return 'Checkbox';
  
      default:
        return null;
    }
  }

  FieldCreator(fieldType: string, name: string, label: string, defaulValue?: string, radioOptions?: Array<string>){
    let field: IField;
    let value = defaulValue ? defaulValue : '';

    switch(fieldType){
      case 'TextInput':
        field = new InputField(name, label, value);
        break;
  
      case 'Textarea':
        field = new TextAreaField(name, label, value);
        break;
  
      case 'Date':
        field = new DateField(name, label, value);
        break;
  
      case 'Email':
        field = new EmailField(name, label, value);
        break;
  
      case 'Radio':
        field = new SelectField(name, label, radioOptions);
        break;
  
      case 'Checkbox':
        field = new CheckboxField(name, label, value);
        break;
  
      default:
        field = null;
        break;
    }

    if(field){
      this.form.formRenderable.insertBefore(field.formRenderable, this.form.formRenderable.lastElementChild);
      this.form.allFields.push(field);
    }

    this.reRender();
  }

  reRender(){
    this.form.formRenderable.removeChild(this.container);
    let newFieldCreator = new FieldCreator(this.form);
    this.form.formRenderable.insertBefore(newFieldCreator.container, this.form.formRenderable.lastElementChild);
  }
}