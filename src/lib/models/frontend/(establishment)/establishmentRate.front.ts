import { IPersonFront } from "../(person)/person.front";
import { TTypesRateEstablishment } from "../../types";
import { IEstablishmentFront } from "./establishment.front";

export interface IEstablishmentRateFront {
    establishment: IEstablishmentFront;
    person: IPersonFront;
    PersonsVisitDate: string;
    CreatedDate: string;
    rates: { key: TTypesRateEstablishment; value: number }[];
}
