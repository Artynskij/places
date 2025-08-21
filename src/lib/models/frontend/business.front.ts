import { IBusinessLegalTypesEntity } from "./../api/entities/business.entity";
import { IBusinessEntity } from "../api/entities/business.entity";

export interface IBusinessFront extends IBusinessEntity {}

export interface IBusinessLegalTypesFront {
    id: string;
    code: string;
    title: string;
}
