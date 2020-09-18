import { PairHelper  } from './Form';
import { ConstructElement } from './FieldLabel';

export class Doc {
    id: string;
    data: PairHelper[];
  
    constructor(id: string, data: PairHelper[]){
      this.id = id;
      this.data = data;
    }
  }

export class DocumentList {
    allDocuments: Doc[];

    constructor(){
        this.allDocuments = [];
    }

    getDocument(id: string): Doc {
        const freshDoc = window.localStorage.getItem(id);

        let docParsed;
        if(freshDoc) {
            docParsed = new Doc (
                id,
                JSON.parse(freshDoc) as PairHelper[]
            );
            return docParsed;
        } else {
            return null;
        }
    }

    getDocumentList() {
        const storedItems = window.localStorage;

        for(let docId in storedItems){
            if(docId.indexOf('document-') >= 0){
              const loadedDoc = new Doc(
                                  docId, 
                                  JSON.parse(storedItems[docId]) as PairHelper[]
                                );
              
              this.allDocuments.push(loadedDoc);
            }
          }
          return this.allDocuments;
    }

    deleteDocument(id: string) {
        window.localStorage.removeItem(id);
    }

    askToDelete (id: string){
        if(confirm("Do you want to delete this document?")){
            this.deleteDocument(id);
            window.location.reload();
        }
    }

    render(where: string):void{

        if(this.allDocuments.length){
          
          this.allDocuments.forEach(doc => {
            const table = ConstructElement.build('div', 'document-table');
            const tableHead = ConstructElement.build('div', 'document-table__head', doc.id);
      
            table.appendChild(tableHead);
      
            doc.data.forEach(newPair => {
              const row = ConstructElement.build('div', 'document-table__row');
              const name = ConstructElement.build('div', 'document-table__row__name', newPair.name);
              const value = ConstructElement.build('div', 'document-table__row__value', newPair.value ? newPair.value : '');
      
              row.appendChild(name);
              row.appendChild(value);
      
              table.appendChild(row);
            })
      
            const footer = ConstructElement.build('div', 'document-table__row footer-row');
      
            const editBtn = ConstructElement.build('a', 'document-table__row__name', 'Edit') as HTMLLinkElement;
            const deleteBtn = ConstructElement.build('div', 'document-table__row__value', 'Delete');
      
            editBtn.href = `/edit-document.html?id=${doc.id}`;
            footer.appendChild(editBtn);
            footer.appendChild(deleteBtn);
      
            deleteBtn.addEventListener('click', () => {
              this.askToDelete(doc.id);
            })
      
            table.appendChild(footer);
      
            document.querySelector(where).appendChild(table);
          })
    
        } else {
    
          const msg = ConstructElement.build('a', 'welcome-link', 'No documents found. Click here to create one!') as HTMLLinkElement;
          msg.href = 'index.html';
          document.querySelector('#app').classList.add('welcome');
          document.querySelector('#app').appendChild(msg);
    
        }
      }
}