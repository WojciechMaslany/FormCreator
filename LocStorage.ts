import { IDataStorage} from './interfaces/IDataStorage';
import { PairHelper } from './Form';
import { Form } from './Form';
import { FormSaved } from './FormSaved';

export class LocStorage implements IDataStorage {
  
  saveDocument(formValues: PairHelper[], docId?: string): string{
    let curDate = Date.now().toString();
    let id = docId ? docId : 'document-' + curDate;
    
    window.localStorage.setItem(id, JSON.stringify(formValues));

    return id;
  }

  loadDocument(id: string): PairHelper[]{
    const savedDoc = window.localStorage.getItem(id);

    if(savedDoc){
      let loadedDoc = JSON.parse(savedDoc) as PairHelper[];
  
      return loadedDoc;
    } else {
      return null;
    }
  }

  saveForm(form: Form){
    const formSaved = new FormSaved(form);
    window.localStorage.setItem(formSaved.id, JSON.stringify(formSaved));

    return form.id;
  }

  loadForm(id: string): Form{
    const savedForm = window.localStorage.getItem(id);
    //console.log(savedForm, id);

    if(savedForm){
      let formSaved = JSON.parse(savedForm) as FormSaved;

      formSaved = new FormSaved(null, id, formSaved.allFields);
      let form = formSaved.toNormalForm();

      return form;
    } else {
      return null;
    }
  }

  removeDocument(id: string) {
    window.localStorage.removeItem(id);
  }

  getDocuments(): string[]{
    return ['a'];
  }
}