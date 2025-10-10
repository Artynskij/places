import { IContentEntityWithMedia } from "./(establishment)/parts/content.entity";
import { IBaseEntity } from "./base/base.entity";

export interface ILocationsEntity extends IBaseEntity {
    ParentId: string;
    LocationTypeSecondary: string | null;
    Path: string;

    LocationType?: {
        Id: string;
        Name: string;
    };
    content?: IContentEntityWithMedia;
}

export interface ILocationsWithContentEntity {
    location: ILocationsEntity;

    content: IContentEntityWithMedia;
}
