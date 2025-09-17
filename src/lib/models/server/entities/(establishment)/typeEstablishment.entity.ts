import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { IContentEntity } from "./parts/content.entity";

export interface ITypeEstablishmentEntity {
    Id: string;
    Name: TTypesOfEstablishment;
    RefName: string;
    ContentId: string;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    Content?: IContentEntity;
}
export interface ITypeEstablishmentWithContentEntity {
    type: ITypeEstablishmentEntity;
    content: IContentEntity;
}
