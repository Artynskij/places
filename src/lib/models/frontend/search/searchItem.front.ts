import { TTypesOfEstablishment } from "../../common/TTypesEstablishment";
import { TGlobalTypes } from "../../common/TTypesGlobal";
import { ICategoryFront } from "../category/category.front";

import { IScheduleFront } from "../schedule/schedule.front";

export interface ISearchItemFront {
    id: string;
    title: string;
    description: string;

    lang: string;
    media: { mainImage: string; cdnHost: string } | null;

    location: {
        lat: number | null;
        lon: number | null;
        country: { id: string; title: string } | null;
        town: { id: string; title: string } | null;
    };
    typeId: string | null;
    typeName: TTypesOfEstablishment | null;
    categories: ICategoryFront[] | [];

    starRating: { key: string; value: string; count: number } | null;
    priceCategory: { key: string; value: string; count: number } | null;
    rate: number | null;
    schedule: IScheduleFront[] | null;

    typeEstablishment: { id: string; key: TTypesOfEstablishment } | null;
    globalTypeEntity: TGlobalTypes;
}
