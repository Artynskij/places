import { IBusinessLegalTypesEntity } from "../server/entities/business.entity";
import { IBusinessEntity } from "../server/entities/business.entity";
import { TLegalTypeOfBusiness } from "../types/TLegalTypeOfBusiness";

export interface IBusinessFront extends IBusinessEntity {}

export interface IBusinessLegalTypesFront {
    id: string;
    code: TLegalTypeOfBusiness;
    value: string;
}
