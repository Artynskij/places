import { IPersonEntity } from "../(person)/person.entity";
import { ICategoryEstablishmentPart } from "./parts/categoryEstablishmentPart.entity";
import { IContactsEstablishmentEntity } from "./parts/contactEstablishment.entity";
import { IContentEntity, IContentEstablishment } from "./parts/content.entity";
import { IImageEntity } from "./parts/image.entity";
import { IRateEntity } from "./parts/rate.entity";
import { ITypeEstablishmentEntity } from "./typeEstablishment.entity";
interface ILocationsInEstablishment {
    Id: string;
    ParentId: string;
    Path: string;
    content: IContentEntity;
}

export interface IEstablishmentEntity {
    AvgRate: number | null;
    CountOfRates: number | null;
    Id: string;
    Latitude: string;
    Longitude: string;
    PostalCode: string;
    ContentId: string;
    Moderate: null | boolean;
    Type: ITypeEstablishmentEntity;
    Categories: ICategoryEstablishmentPart[];
    Contacts: IContactsEstablishmentEntity | null;
    Locations: ILocationsInEstablishment | null;
    Rates: IRateEntity;
}
export interface IEstablishmentWithContentEntity {
    establishment: IEstablishmentEntity;
    content: IContentEstablishment;
}
export interface IEstablishmentPersonAssignEntity {
    Id: string;
    Person: IPersonEntity | null| string;
    Establishment: IEstablishmentEntity | null | string;
    IsOwner: boolean;
    IsVerified: boolean;
    IsAddedByPerson: boolean;
    Source: "Manual" | "AutoParser" | "AdminPanel" | "Search" | "Cabinet";
    Note: string | null;
    ContentId: string | null;
    Content?: IContentEntity | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string;
}
export interface IEstablishmentPersonAssignWithContentEntity {
    id: string;
    entity: IEstablishmentPersonAssignEntity;
    content: IContentEntity | null;
}
