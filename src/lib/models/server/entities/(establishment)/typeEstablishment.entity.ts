import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { IContentMultilingualEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";

export interface ITypeEstablishmentEntity extends IBaseEntity {
    Name: TTypesOfEstablishment;
    RefName: string;

    Content?: IContentMultilingualEntity;
}
export interface ITypeEstablishmentWithContentEntity {
    type: ITypeEstablishmentEntity;
    content: IContentMultilingualEntity;
}
