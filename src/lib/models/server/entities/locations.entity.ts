import { IContentSimpleEntityWithMedia } from "../base/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface ILocationsEntity extends IBaseEntity {
    ParentId: string;
    LocationTypeSecondary: string | null;
    Path: string;
    StaticMapPath: string | null;
    EstablishmentCount: number | null;
    LocationType?: {
        Id: string;
        Name: string;
    };
    content?: IContentSimpleEntityWithMedia;
}

export interface ILocationsWithContentEntity {
    location: ILocationsEntity;

    content: IContentSimpleEntityWithMedia;
}
