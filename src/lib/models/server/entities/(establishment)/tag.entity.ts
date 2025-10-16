import { IContentSimpleEntity } from "../../base/content.entity";
import { ITagCategoryEntity } from "./parts/tagCategory.entity";

export interface ITagEntity {
    tag: {
        Id: string;
        TagCategory: ITagCategoryEntity;
    };
    content: IContentSimpleEntity;
}
export interface ITagWithCategoryEntity {
    TagCategory: ITagCategoryEntity;
    Id: string;

    content: IContentSimpleEntity;
}
