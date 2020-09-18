import { LocStorage } from './LocStorage'
import { IField } from './interfaces/IField';
import { Form } from './Form';
import { Doc } from './DocumentList'
import { InputField } from './basicClasses/InputField';


export class DocEditor{
  doc: Doc;
  form: Form;

  constructor(doc: Doc){
    this.doc = doc;

    const fields: IField[] = [];

    this.doc.data.forEach(newPair => {
      fields.push(new InputField(newPair.name, newPair.name, newPair.value));
    })

    this.form = new Form(fields);
  }

  render(where: string):void{
    this.form.render(where, this.save.bind(this));
  }

  save(){
    const storage = new LocStorage();
    const values = this.form.getValue();

    storage.saveDocument(values, this.doc.id);
    alert('Document saved');

    window.location.href = 'document-list.html';
  }
}