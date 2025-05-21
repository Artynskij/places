import { TDayOfWeek } from "../../common/TDayOfWeek";
import { TTypesOfEstablishment } from "../../common/TTypesEstablishment";

export interface ISearchItemEntity {
    dbCrossId: string;
    title: string;
    description: string;
    lang: string;

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
    priceCategory: string | null;
    rate: number | null;
    schedule:
        | {
              Day: TDayOfWeek;
              OpenTime: string;
              CloseTime: string;
          }[]
        | null;
}
