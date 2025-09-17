import { IContentEntity } from "./(establishment)/parts/content.entity";

export interface ILocationTypeEntity {
    Id: string;
    Name: string;
    ContentId: null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: null;
}
export interface ILocationTypeWithContentEntity {
    type: ILocationTypeEntity;
    content: IContentEntity | null;
}
