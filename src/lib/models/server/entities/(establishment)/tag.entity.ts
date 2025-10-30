import { IContentSimpleEntity } from "../../base/content.entity";
import { ITagCategoryWithContentEntity } from "./parts/tag-category.entity";

export interface ITagEntity {
    Id: string;
    TagCategory: ITagCategoryWithContentEntity;
}
export interface ITagWithContentEntity extends ITagEntity {
    content: IContentSimpleEntity;
}

export interface ITagWithContentPareEntity {
    tag: ITagEntity;
    content: IContentSimpleEntity;
}
