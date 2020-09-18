import { LocStorage } from './LocStorage'
import { FormSaved } from './FormSaved';
import { IField } from './interfaces/IField';
import { Form } from './Form';
import { ConstructElement } from './FieldLabel';

export class FormList {
  allForms: Form[];

  constructor(){
    this.allForms = [];
  }

  getForm(id: string): Form{
    let locStorage = new LocStorage();

    return locStorage.loadForm(id);
  }

  removeForm(id: string){
    this.askForFormRemove(id);
  }

  askForFormRemove(id: string){
    if(confirm("This form will be deleted. Do you want to proceed?")){
      window.localStorage.removeItem(id);
      window.location.reload();
    }
  }

  getFormList(){
    const storageItems = window.localStorage;

    for(let formId in storageItems){
      if(formId.indexOf('form-') >= 0){
        this.allForms.push(this.getForm(formId));
      }
    }
    
    return this.allForms;
  }

  render(where: string):void{
    if(this.allForms.length){
      
      this.allForms.forEach(form => {
        const table = ConstructElement.build('div', 'document-table');
        const tableHead = ConstructElement.build('div', 'document-table__head', form.id);

        table.appendChild(tableHead);

        form.allFields.forEach(field => {
          const row = ConstructElement.build('div', 'document-table__row');
          const name = ConstructElement.build('div', 'document-table__row__name', field.name);
          const value = ConstructElement.build('div', 'document-table__row__value', field.value);

          row.appendChild(name);
          row.appendChild(value);

          table.appendChild(row);
        })

        const footer = ConstructElement.build('div', 'document-table__row footer-row');

        const editBtn = ConstructElement.build('a', 'document-table__row__name', 'Fill out') as HTMLLinkElement;
        const deleteBtn = ConstructElement.build('div', 'document-table__row__value', 'Delete');

        editBtn.href = `/new-document.html?id=${form.id}`;
        footer.appendChild(editBtn);
        footer.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
          this.askForFormRemove(form.id);
        })

        table.appendChild(footer);

        document.querySelector(where).appendChild(table);
      })

    } else {

      const msg = ConstructElement.build('a', 'welcome-link', 'No forms saved, click to return.') as HTMLLinkElement;
      msg.href = 'index.html';
      document.querySelector('#app').classList.add('welcome');
      document.querySelector('#app').appendChild(msg);

    }
  }
}