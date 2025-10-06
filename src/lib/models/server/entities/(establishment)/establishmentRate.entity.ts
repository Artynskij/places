import { IBaseEntity } from "../base/base.entity";

export interface IEstablishmentRateEntity extends IBaseEntity {
    // Id: string;
    PersonsVisitDate: Date;
    Person: string;
    Establishment: string;
    Rooms: number | null;
    PriceQuality: number | null;
    Clean: number | null;
    Location: number | null;
    Rate: number | null;
    Atmosphere: number | null;
    Food: number | null;
    Service: number | null;
    Value: number | null;
    Comfort: number | null;
    Accessibility: number | null;
    Quality: number | null;
    Safety: number | null;
    // CreatedDate: string;
    // LastModifiedDate: string;
    // DeletedDate: null;
}
