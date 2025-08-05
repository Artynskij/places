import { IContentEntity } from "./content.entity";

export interface ICategoryEstablishmentPart {
    Id: string;
    Name: string;
    Path?: string | null;
    content: IContentEntity;
}
export interface ICategoryEstablishmentEntity {
    category: ICategoryEstablishmentPart;
    content: IContentEntity;
}
