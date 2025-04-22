import { IContentEntity } from "./parts/content.entity";
import { ITagCategoryEntity } from "./parts/tagCategory.entity";
export interface ITagEntity {
    Id: string;
    TagCategory: ITagCategoryEntity;
    Content: IContentEntity;
}
