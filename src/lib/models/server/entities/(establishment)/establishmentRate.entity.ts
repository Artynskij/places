import { IEstablishmentFront, IPersonFront } from "@/lib/models/frontend";
import { IBaseEntity } from "../base/base.entity";
import { IEstablishmentWithContentEntity } from "./establishment.entity";
import { IPersonEntity } from "../(person)/person.entity";

export interface IEstablishmentRateEntity extends IBaseEntity {
    PersonsVisitDate: string;
    Person: IPersonEntity;
    Establishment: IEstablishmentWithContentEntity;
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
}
