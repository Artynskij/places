export interface IContentEntity {
    id: string;
    details: {
      lang: string;
      value: string;
      _id: string;
    }[];
  }