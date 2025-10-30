import { IEstablishmentWithContentPareEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryEstablishmentWithContentEntity } from "../../entities/(establishment)/category-establishment.entity";
import {
    ITagWithContentPareEntity,
    ITagWithContentEntity,
} from "../../entities/(establishment)/tag.entity";

export interface ITagsResponse {}
export interface ITagsOfEstablishmentResponse {
    Id: string;
    TagId: string;
    EstablishmentId: string;
    Tag: ITagWithContentEntity;
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
        TagCategory: ICategoryEstablishmentWithContentEntity;
        Tags: ITagWithContentEntity[];
    }[];
    categories: ICategoryEstablishmentWithContentEntity[];
}
export interface ITagAndEstablishmentConnectionResponse {
    Id: string;
    Tag: ITagWithContentPareEntity;
    Establishment: IEstablishmentWithContentPareEntity;
}
