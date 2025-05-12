import { ISearchItemEntity } from "../../api/entities/searchItem.entity";
import { TTypesOfEstablishment } from "../../common/TTypesEstablishment";
import { TGlobalTypes } from "../../common/TTypesGlobal";
import { IMediaFront } from "../parts/media/media.frontPart";

export interface ISearchItemFront {
    id: string;
    title: string;
    description: string;
    lang: string;
    media: { mainImage: IMediaFront; cdnHost: string } | null;

    location?: {
        country: { id: string; title: string } | null;
        town: { id: string; title: string } | null;
    } | null;
    typeEstablishment?: TTypesOfEstablishment | null;
    globalTypeEntity: TGlobalTypes ;
}
