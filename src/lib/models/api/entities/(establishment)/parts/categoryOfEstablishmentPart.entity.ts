import { IContentEntity } from "./content.entity";

export interface ICategoryOfEstablishmentPart {
    Id: string;
    Name: string;
    Path?: string | null;
    content: IContentEntity;
  
}
export interface ICategoryOfEstablishmentEntity {
    category: ICategoryOfEstablishmentPart;
    content: IContentEntity;
}
