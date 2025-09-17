import { IBusinessLegalTypesEntity } from "../server/entities/business.entity";
import { IBusinessEntity } from "../server/entities/business.entity";

export interface IBusinessFront extends IBusinessEntity {}

export interface IBusinessLegalTypesFront {
    id: string;
    code: string;
    title: string;
}
