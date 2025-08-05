import { IEstablishmentEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryEstablishmentPart } from "../../entities/(establishment)/parts/categoryEstablishmentPart.entity";
import {
    ITagEntity,
    ITagWithCategoryEntity,
} from "../../entities/(establishment)/tag.entity";

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
        TagCategory: ICategoryEstablishmentPart;
        Tags: ITagWithCategoryEntity[];
    }[];
    categories: ICategoryEstablishmentPart[];
}
export interface ITagAndEstablishmentConnectionResponse {
    Id: string;
    Tag: ITagEntity;
    Establishment: IEstablishmentEntity;
}
