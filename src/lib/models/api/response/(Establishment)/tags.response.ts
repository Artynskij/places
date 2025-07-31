
import { IEstablishmentEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryOfEstablishmentPart } from "../../entities/(establishment)/parts/categoryOfEstablishmentPart.entity";
import { ITagEntity, ITagWithCategoryEntity } from "../../entities/(establishment)/tag.entity";


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
export interface ITagAndEstablishmentConnectionResponse {
    Id: string;
    Tag: ITagEntity;
    Establishment: IEstablishmentEntity;
}
