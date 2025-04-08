import { ICategoryEntity } from "../../entities/category.entity";
import { ITagEntity } from "../../entities/tag.entity";

export interface ITagsResponse {}
export interface ITagsOfEstablishmentResponse {
  Id: string;
  TagId: string;
  EstablishmentId: string;
  
  Tag: ITagEntity;
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
  TagCategory: ICategoryEntity;
  Tags: ITagEntity[];
}
[];
