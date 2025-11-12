
import { IContentSimpleEntity } from "../../../base/content.entity";
import { IBaseEntity,  } from "../../../base";
import {  ITypeEstablishmentWithContentEntity } from "../type-establishment.entity";
export interface ITagCategoryEntity extends IBaseEntity {
    Name: string;
    Type: ITypeEstablishmentWithContentEntity | null;
}
export interface ITagCategoryWithContentPareEntity {
    tagCategory: ITagCategoryEntity;

    content: IContentSimpleEntity;
}
export interface ITagCategoryWithContentEntity extends ITagCategoryEntity {
    content: IContentSimpleEntity;
}
