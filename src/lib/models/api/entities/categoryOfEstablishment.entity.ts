import { IContentEntity } from "./parts/content.entity";

export interface ICategoryOfEstablishmentEntity {
    category: {
        Id: string;
        Name: string;
    };
    content: IContentEntity;
}
