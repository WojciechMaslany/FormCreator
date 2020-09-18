import { PairHelper } from './../Form';

export interface IDataStorage{
    saveDocument(formValues: PairHelper[]): string;
    loadDocument(formId: string): PairHelper[];
    getDocuments(): string[];
  }