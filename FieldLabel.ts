export class FieldLabel{
    name: string;
    formRenderable: HTMLLabelElement;

    constructor(name: string, purpose?: string) {
        this.name = name;
        this.formRenderable = ConstructElement.build('label', 'field-label', this.name) as HTMLLabelElement;

        if(purpose) {
            this.formRenderable.htmlFor = purpose;
        }
    }   
}

export class ConstructElement {
    static build<K extends keyof HTMLElementTagNameMap>(nodeName: K, className?: string, content?: string):HTMLElement{
    let element = document.createElement(nodeName);

    if(className){
    element.className = className;
    }

    if(content){
        element.innerText = content;
    }

    return element;
    }
}

export class Button {
    name: string;
    formRenderable: HTMLButtonElement;
    onClick: Function;
  
    constructor(name: string, onClick: Function){
      this.name = name;
      this.onClick = onClick;
  
      this.formRenderable = ConstructElement.build('button', 'button', this.name) as HTMLButtonElement;
      this.formRenderable.type = 'button';
      this.formRenderable.addEventListener('click', () => this.onClick());
    }
  
    render(where: string):void{
      document.querySelector(where).appendChild(this.formRenderable);
    }
  }

const RandomIdGenerator = () => {
    return Math.random().toString(36).substr(2, 10);
  }
  
  export default RandomIdGenerator;