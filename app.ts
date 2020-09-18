import { CheckboxField } from './basicClasses/CheckboxField';
import { DateField } from './basicClasses/DateField';
import { EmailField } from './basicClasses/EmailField';
import { InputField } from './basicClasses/InputField';
import { SelectField } from './basicClasses/SelectField';
import { TextAreaField } from './basicClasses/TextAreaField';
import { Form } from './Form'
import { FormCreator } from './FormCreator'
import { DocumentList } from './DocumentList'
import { Router } from "./Router"
import { FormList } from "./FormList"
import { DocEditor } from "./DocEditor";

export class App {
    form: Form;
    container: HTMLElement;
  
    constructor(){
      this.container = document.getElementById('app');
      if(!this.container) return;
  
      // this.createBasicForm();
      // return;
  
      if(this.container.classList.contains('is-new-form')){
  
        const creator = new FormCreator();
        creator.newForm();
  
      } else if(this.container.classList.contains('is-new-doc')){
  
        const router = new Router();
        const formId = router.getParam('id');
        this.loadForm(formId);
  
      } else if(this.container.classList.contains('is-list')){
  
        if(this.container.classList.contains('is-doc-list')){
  
          const docList = new DocumentList();
          docList.getDocumentList();
          docList.render('#app');
  
        } else {
  
          const formList = new FormList();
          formList.getFormList();
          formList.render('#app');
  
        }
  
      } else if(this.container.classList.contains('is-edit')){
  
        const router = new Router();
        const docId = router.getParam('id');
  
        if(docId){
  
          const docList = new DocumentList();
          const docToEdit = docList.getDocument(docId);
  
          if(!docToEdit){
            alert('No document found.');
          } else {
            const editor = new DocEditor(docToEdit);
            editor.render('#app');
          }
  
        } else {
          alert('You need to pass document`s ID');
        }
      }
  
  
      //this.storage.loadDocument('document-1589349779392');
    }
  
    createBasicForm(){
      let myInput = new InputField('Name', 'Name');
      let myEmailInp = new EmailField('Email', 'Email');
      let myDateInp = new DateField('Date', 'Date');
      let myCheckbox = new CheckboxField('Checkbox', 'Checkbox');
      let myTextarea = new TextAreaField('Textarea', 'Textarea');
      let mySelectField = new SelectField('', 'Select one:', [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4'
      ]);
  
      let form = new Form([
        myInput,
        myEmailInp,
        myDateInp,
        myCheckbox,
        myTextarea,
        mySelectField
      ]);
  
      this.form = form;
    
      this.form.render('#app');
    }
  
    loadForm(formId: string){
      
      const formList = new FormList();
      const loadedForm = formList.getForm(formId);
  
      const form = new Form(loadedForm.allFields, loadedForm.id) as Form;
  
      form.render('#app');
    }
  }