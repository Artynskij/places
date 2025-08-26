import { IContentLocationEntity } from "./(establishment)/parts/content.entity";

export interface ILocationsEntity {
    Id: string;
    ParentId: string;
    LocationTypeSecondary: string | null;
    Path: string;
    ContentId: string;
    LocationType?: {
        Id: string;
        Name: string;
    };
    content?: IContentLocationEntity;
}

export interface ILocationsWithContentEntity {
    location: ILocationsEntity;

    content: IContentLocationEntity;
}
