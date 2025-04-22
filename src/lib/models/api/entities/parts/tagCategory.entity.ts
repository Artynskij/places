import { TCategoriesTags } from "@/lib/models/common/TCategoriesTags";
import { IContentEntity } from "./content.entity";

export interface ITagCategoryEntity {
    Id: string;
    Name: TCategoriesTags;
    Path: string | null;
    Content: IContentEntity;
}
