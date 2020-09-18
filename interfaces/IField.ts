import {FieldLabel} from '../FieldLabel';
import {FieldType} from '../FieldType';

export interface IField{
  name: string,
  label: FieldLabel,
  value: string,
  
  type: FieldType,
  formRenderable: HTMLElement, // what is that??
  field: HTMLElement, // what is that??
  render(where: string): void,
  getValue(): string,
}