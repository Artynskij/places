import { IContentSimpleEntity } from "../../base/content.entity";
import { ITagCategoryWithContentEntity } from "./parts/tagCategory.entity";

export interface ITagWithContentPareEntity {
    tag: {
        Id: string;
        TagCategory: ITagCategoryWithContentEntity;
    };
    content: IContentSimpleEntity;
}
export interface ITagWithCategoryEntity {
    TagCategory: ITagCategoryWithContentEntity;
    Id: string;

    content: IContentSimpleEntity;
}
