import {IField} from './interfaces/IField';
import { ConstructElement } from './FieldLabel';
import { LocStorage } from './LocStorage';
import { Button } from './FieldLabel';


export class PairHelper {
    name: string;
    value: string;
  
    constructor(name: string, value: string){
      this.name = name;
      this.value = value;
    }
  }

export class Form {
    id: string;
    allFields: IField[];
    formRenderable: HTMLFormElement;

    constructor(fields: IField[], id?: string){
        if(id){
          this.id = id;
        } else {
          this.id = 'form-' + Date.now().toString();
        }
    
        this.allFields = fields as IField[];
        const formCon = ConstructElement.build('form', 'form') as HTMLFormElement;
        formCon.id = 'my-form';
    
        this.formRenderable = formCon;
      }
    
      getValue():PairHelper[]{
        let fieldsValues:PairHelper[] = [];
    
        this.allFields.forEach(field => {
          fieldsValues.push(
            new PairHelper(field.name, field.value)
          );
        });
    
        return fieldsValues;
      }
    
      render(where: string, saveCallback?: Function, returnCallback?: Function):void{
        document.querySelector(where).appendChild(this.formRenderable);
    
        this.allFields.forEach(field => {
          field.render(`#${this.formRenderable.id}`);
        })

        const returnCb = returnCallback ? returnCallback :  () => {
          if(confirm('Your changes will be lost. Do you want to proceed?')){
            window.history.back();
          }
        }
        const saveCb = saveCallback ? saveCallback : () => {
          this.save();
          window.location.href = 'index.html';
        }
    
        let saveBtn = new Button('Save', saveCb);
        let returnBtn = new Button('Return', returnCb)
    
        const btnCon = ConstructElement.build('div', 'button-con');
    
        btnCon.appendChild(saveBtn.formRenderable);
        btnCon.appendChild(returnBtn.formRenderable);
    
        this.formRenderable.appendChild(btnCon);
      }

      
      save(){
        const storage = new LocStorage();
        const values = this.getValue();
    
        storage.saveDocument(values);
      }
    }