import { IPersonFront } from "../(person)/person.front";
import { TTypesRateEstablishment } from "../../types";
import { IEstablishmentFront } from "./establishment.front";

export interface IEstablishmentRateFront {
    establishment: IEstablishmentFront;
    person: IPersonFront;
    PersonsVisitDate: string;
    // Rooms: number | null;
    // PriceQuality: number | null;
    // Clean: number | null;
    // Location: number | null;
    // Rate: number | null;
    // Atmosphere: number | null;
    // Food: number | null;
    // Service: number | null;
    // Value: number | null;
    // Comfort: number | null;
    // Accessibility: number | null;
    // Quality: number | null;
    // Safety: number | null;
    CreatedDate: string;
    rates: { key: TTypesRateEstablishment; value: number }[];
}
