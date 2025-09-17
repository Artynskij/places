import { IImageEntity } from "../../entities";

export interface IContentPartRequest {
    details?: {
        lang: string;
        value: string;

        secondaryValue?: string | null;
        cName?: string | null;
        cIcon?: string | null;
    }[];
    media?:{gallery:IImageEntity[]}
}
