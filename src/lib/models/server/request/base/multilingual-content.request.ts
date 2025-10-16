import { TKeySeo, TLocale } from "@/lib/models/types";
import { IContentBase, IImageEntity } from "../../entities";

// export interface IContentMultilingualRequest<TDetails = {}> {
//     details: {
//         lang: TLocale;
//         value: string;
//     }[] &
//         TDetails;
//     media?: { gallery: IImageEntity[] };
// }
interface IContentValueBase {
    title?: string;
    description?: string;
    alt?: string;
    caption?: string;
    name?: string;
    text?: string;
}
export interface IContentMultilingualRequest<TContentValue = {}>
    extends IContentBase<TContentValue> {
    // details: {
    //     lang: TLocale;
    //     contentValue?: IContentValueBase & TContentValue;
    //     value?: string;
    //     secondaryValue?: string | null;
    //     cName?: string | null;
    //     cIcon?: string | null;
    // }[];
    // media?: {
    //     gallery?: IImageEntity[];
    //     documents?: IImageEntity[];
    //     photoPaths?: string[];
    // };
}
