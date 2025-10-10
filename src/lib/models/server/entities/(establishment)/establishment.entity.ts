import { extend } from "lodash";
import { IPersonEntity } from "../(person)/person.entity";
import { IBaseEntity } from "../base/base.entity";
import { ICategoryEstablishmentPart } from "./parts/categoryEstablishmentPart.entity";
import { IContactsEstablishmentEntity } from "./parts/contactEstablishment.entity";
import { IContentMultilingualEntity, IContentEstablishment, IContentEntityWithMedia } from "./parts/content.entity";

import { IRateEntity } from "./parts/rate.entity";
import { ITypeEstablishmentEntity } from "./typeEstablishment.entity";
interface ILocationsInEstablishment {
    Id: string;
    ParentId: string;
    Path: string;
    content: IContentEntityWithMedia;
}

export interface IEstablishmentEntity extends IBaseEntity {
    AvgRate: number | null;
    CountOfRates: number | null;
    Latitude: string;
    Longitude: string;
    PostalCode: string;
    Moderate: null | boolean;
    Type: ITypeEstablishmentEntity;
    Categories: ICategoryEstablishmentPart[];
    Contacts: IContactsEstablishmentEntity | null;
    Locations: ILocationsInEstablishment | null;
    Rates: IRateEntity;
}
export interface IEstablishmentWithContentEntity extends IEstablishmentEntity {
    content: IContentEstablishment;
}
export interface IEstablishmentWithContentPareEntity {
    establishment: IEstablishmentEntity;
    content: IContentEstablishment;
}
export interface IEstablishmentPersonAssignEntity extends IBaseEntity {
    Person: IPersonEntity | null | string;
    Establishment: IEstablishmentEntity | null | string;
    IsOwner: boolean;
    IsVerified: boolean;
    IsAddedByPerson: boolean;
    Source: "Manual" | "AutoParser" | "AdminPanel" | "Search" | "Cabinet";
    Note: string | null;

    Content?: IContentMultilingualEntity | null;
}
export interface IEstablishmentPersonAssignWithContentEntity {
    id: string;
    entity: IEstablishmentPersonAssignEntity;
    content: IContentMultilingualEntity | null;
}
