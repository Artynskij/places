import { IContentEntity } from "./parts/content.entity";
import { ITagCategoryEntity } from "./parts/tagCategory.entity";
export interface ITagEntity {
    tag: {
        Id: string;
        TagCategory: ITagCategoryEntity;
    };
    content: IContentEntity;
}
export interface ITagWithCategoryEntity {
    TagCategory: ITagCategoryEntity;
    Id: string;

    content: IContentEntity;
}
