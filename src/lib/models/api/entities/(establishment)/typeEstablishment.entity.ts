import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { IContentEntity } from "./parts/content.entity";

export interface ITypeEstablishment {
    type: {
        Id: string;
        Name: string;
        RefName: TTypesOfEstablishment;
        ContentId: string;
        CreatedDate: string;
        LastModifiedDate: string;
        DeletedDate: string | null;
    };
    content: IContentEntity;
}
export interface ITypeEstablishmentWithContent {
    Id: string;
    Name: TTypesOfEstablishment;
    RefName: string;
    ContentId: string;
    Content: IContentEntity;
}
