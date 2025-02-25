export interface IBook {
  id: string | number;
  name: string;
  author: string;
}

export interface IAddBookPayload {
  id: string | number;
  name: string;
  author: string;
}

export enum EbooksType {
  ALL = "all",
  PRIVATE = "private",
}
export type TFilterType = EbooksType;
