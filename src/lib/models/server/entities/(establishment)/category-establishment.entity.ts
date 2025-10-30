import { IBaseEntity } from "../../base";
import { IContentSimpleEntity } from "../../base/content.entity";
import { ICategoryRootEstablishmentWithContentEntity } from "./category-root-establishment.entity";
import { ITypeEstablishmentWithContentEntity } from "./type-establishment.entity";
export interface ICategoryEstablishmentEntity extends IBaseEntity {
    Name: string;
    RefName: string;
    Type: ITypeEstablishmentWithContentEntity;
    RootCategoryId: string | null;
    RootCategory: ICategoryRootEstablishmentWithContentEntity | null;
}
export interface ICategoryEstablishmentWithContentEntity
    extends ICategoryEstablishmentEntity {
    content: IContentSimpleEntity;
}
export interface ICategoryEstablishmentWithContentPareEntity {
    category: ICategoryEstablishmentEntity;
    content: IContentSimpleEntity;
}
