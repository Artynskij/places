import { IContentSimpleEntity } from "../../../base/content.entity";

export interface ICategoryEstablishmentPart {
    Id: string;
    Name: string;
    Path?: string | null;
    content: IContentSimpleEntity;
}
export interface ICategoryEstablishmentEntity {
    category: ICategoryEstablishmentPart;
    content: IContentSimpleEntity;
}
