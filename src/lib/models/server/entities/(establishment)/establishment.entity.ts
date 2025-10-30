import { IPersonEntity } from "../(person)/person.entity";
import { IBaseEntity } from "../../base/base.entity";
import { ICategoryEstablishmentWithContentEntity } from "./category-establishment.entity";
import { IContactsEstablishmentEntity } from "./contact-establishment.entity";
import { IContentEstablishmentEntity } from "../../base/content.entity";

import { IRateEntity } from "./parts/rate.entity";
import { ITypeEstablishmentEntity } from "./type-establishment.entity";
import { ILocationWithContentEntity } from "../locations.entity";
interface ILocationsInEstablishment extends ILocationWithContentEntity {
    Country: ILocationWithContentEntity;
}

export interface IEstablishmentEntity extends IBaseEntity {
    AvgRate: number | null;
    CountOfRates: number | null;
    Latitude: string;
    Longitude: string;
    PostalCode: string;
    Moderate: null | boolean;
    Type: ITypeEstablishmentEntity;
    Categories: ICategoryEstablishmentWithContentEntity[];
    Contacts: IContactsEstablishmentEntity | null;
    Locations: ILocationsInEstablishment | null;
    Rates: IRateEntity;
}
export interface IEstablishmentWithContentEntity extends IEstablishmentEntity {
    content: IContentEstablishmentEntity;
}
export interface IEstablishmentWithContentPareEntity {
    establishment: IEstablishmentEntity;
    content: IContentEstablishmentEntity;
}
export interface IEstablishmentPersonAssignEntity extends IBaseEntity {
    Person: IPersonEntity | null | string;
    Establishment: IEstablishmentEntity | null | string;
    IsOwner: boolean;
    IsVerified: boolean;
    IsAddedByPerson: boolean;
    Source: "Manual" | "AutoParser" | "AdminPanel" | "Search" | "Cabinet";
    Note: string | null;

    Content?: null;
}
export interface IEstablishmentPersonAssignWithContentEntity {
    id: string;
    entity: IEstablishmentPersonAssignEntity;
    content: null;
}
