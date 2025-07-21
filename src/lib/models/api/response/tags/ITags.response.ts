import { ICategoryOfEstablishmentPart } from "../../entities/parts/categoryOfEstablishmentPart.entity";
import { ITagEntity, ITagWithCategoryEntity } from "../../entities/tag.entity";

export interface ITagsResponse {}
export interface ITagsOfEstablishmentResponse {
    Id: string;
    TagId: string;
    EstablishmentId: string;
    Tag: ITagWithCategoryEntity;
    Establishment: {
        Id: string;
        RefId: string;
        Latitude: string;
        Longitude: string;
        PostalCode: string;
        ContentId: string;
    };
}
[];
export interface ITagsOfEstablishmentFilterResponse {
    tagsAndCategories: {
        TagCategory: ICategoryOfEstablishmentPart;
        Tags: ITagWithCategoryEntity[];
    }[];
    categories: ICategoryOfEstablishmentPart[];
}
