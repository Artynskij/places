import { IContentSimpleEntityWithMedia } from "../base/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface ILocationEntity extends IBaseEntity {
    ParentId: string;
    LocationTypeSecondary: string | null;
    Path: string;
    StaticMapPath: string | null;
    EstablishmentCount: number | null;
    Country: ILocationWithContentEntity | null;
    LocationType?: {
        Id: string;
        Name: string;
    };
}
export interface ILocationWithContentEntity extends ILocationEntity {
    content: IContentSimpleEntityWithMedia;
}
export interface ILocationWithContentPareEntity {
    location: ILocationEntity;

    content: IContentSimpleEntityWithMedia;
}
