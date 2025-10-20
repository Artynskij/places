import { IContentSimpleEntity } from "./content.entity";

export interface IBaseEntity {
    Id: string;
    ContentId: string | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
}

export interface IBaseSimpleEntity<TCode=string> extends IBaseEntity {
    Name: string;
    Code: TCode;
    content: IContentSimpleEntity;
}
