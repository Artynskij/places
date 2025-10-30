import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { IContentMultilingualEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";

export interface ITypeEstablishmentEntity extends IBaseEntity {
    Name: TTypesOfEstablishment;
    RefName: string;
}
export interface ITypeEstablishmentWithContentEntity extends ITypeEstablishmentEntity {
    content: IContentMultilingualEntity;
}
export interface ITypeEstablishmentWithContentPareEntity {
    type: ITypeEstablishmentEntity;
    content: IContentMultilingualEntity;
}
