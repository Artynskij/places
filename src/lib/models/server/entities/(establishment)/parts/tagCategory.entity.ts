import { TCategoriesTags } from "@/lib/models/types/TCategoriesTags";
import { IContentSimpleEntity } from "../../../base/content.entity";

export interface ITagCategoryEntity {
    Id: string;
    Name: TCategoriesTags;
    Path: string | null;
    content: IContentSimpleEntity;
}
