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

export interface IContentVerificationEntity extends IContentEntity {
    media: { gallery: IImageEntity[] };
}
export interface IContentEstablishment {
    id: string;
    type: string;
    collection: string;
    value: {
        lang: string;
        value: {
            details: {
                title: string;
                description: string;
            };
            seoTrip?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];
            seo?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];

            location: {
                street1: string;
                street2: string;
            };
        };
    }[];
    media: {
        gallery: IImageEntity[] | null;
    };
}
