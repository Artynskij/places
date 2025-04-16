import { IImageEntity } from "./image.entity";

export interface IContentEntity {
    id: string;
    details: {
        lang: string;
        value: string;
        _id: string;
    }[];
}
export interface IContentLocationEntity extends IContentEntity {
    media: { gallery: IImageEntity[] };
}
