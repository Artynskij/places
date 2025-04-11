import { IContentEntity } from "./parts/content.entity";

export interface ILocationsEntity {
    location:{
        Id: string;
        ParentId: string;
        LocationTypeSecondary: string | null;
        Path: string;
        ContentId: string;
        LocationType: {
            Id: string;
            Name: string;
        };
    },
   
    content: IContentEntity;
}
