import { IBaseEntity, IContentSimpleEntity } from "../../base";

export interface ICategoryRootEstablishmentEntity extends IBaseEntity {
    Name: string;
    RefName: string;
    SortOrder: number;
    IsActive: boolean;
}

export interface ICategoryRootEstablishmentWithContentEntity
    extends ICategoryRootEstablishmentEntity {
    content: IContentSimpleEntity | null;
}

export interface ICategoryRootEstablishmentWithContentPareEntity {
    rootCategory: ICategoryRootEstablishmentEntity;
    content: IContentSimpleEntity | null;
}
