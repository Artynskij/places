import { TDayOfWeek } from "../../types/schedule/TDayOfWeek";
import { TTypesOfEstablishment } from "../../types/TTypesEstablishment";
import { TGlobalTypes } from "../../types/TTypesGlobal";
import { IScheduleEntity } from "./(establishment)/schedule.entity";

export interface ISearchItemEntity {
    dbCrossId: string;
    title: string;
    description: string;
    lang: string;
    type: TGlobalTypes;
    image: string | null;

    locationId: string | null;
    locationName: string | null;
    countryId: string | null;
    countryName: string | null;
    location: {
        lat: number;
        lon: number;
    } | null;
    typeId: string | null;
    typeName: TTypesOfEstablishment | null;
    categories:
        | {
              id: string;
              name: string;
          }[]
        | [];

    starRating: string | null;
    priceCategory: { name: string; secondary: string };
    rate: number | null;
    schedule: IScheduleEntity[] | null;
}
