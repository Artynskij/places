import { IPersonFront } from "../(person)/person.front";
import { TTypesRateEstablishment } from "../../types";
import { IEstablishmentFront } from "./establishment.front";

export interface IRateEstablishmentFront {
    establishment: IEstablishmentFront;
    person: IPersonFront;
    PersonsVisitDate: string;
    CreatedDate: string;
    rates: { key: TTypesRateEstablishment; value: number }[];
}
