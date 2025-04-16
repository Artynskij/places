import { IContentEntity } from "./parts/content.entity";

export interface ICategoryEntity {
    Id: string;
    Name: string;
    Path: string | null;
    Content: IContentEntity;
}
