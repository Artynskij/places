import { IContentEntity } from "./parts/content.entity";

export interface ILocationsEntity {
    Id: string;
    ParentId: string;
    LocationTypeSecondary: string | null;
    Path: string;
    ContentId: string;
    Content: IContentEntity;
}
