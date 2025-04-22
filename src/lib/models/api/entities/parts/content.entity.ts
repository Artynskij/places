import { IImageEntity } from "./image.entity";

export interface IContentEntity {
    id: string;
    details: {
        lang: string;
        value: string;
        _id: string;
        secondaryValue?: string | null;
        cName?: string | null;
        cIcon?: string | null;
    }[];
}
export interface IContentLocationEntity extends IContentEntity {
    media: { gallery: IImageEntity[] };
}
