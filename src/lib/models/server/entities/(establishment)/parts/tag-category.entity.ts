import { TCategoriesTags } from "@/lib/models/types/TCategoriesTags";
import { IContentSimpleEntity } from "../../../base/content.entity";
import { IBaseEntity, IBaseSimpleEntity } from "../../../base";
export interface ITagCategoryEntity extends IBaseEntity {
    Name: string;
}
export interface ITagCategoryWithContentPareEntity {
    tagCategory: ITagCategoryEntity;

    content: IContentSimpleEntity;
}
export interface ITagCategoryWithContentEntity extends ITagCategoryEntity {
    content: IContentSimpleEntity;
}
