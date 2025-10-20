import { IBaseSimpleFront } from "./base/base.front";
import { IBusinessLegalTypesEntity } from "../server/entities/business.entity";
import { IBusinessEntity } from "../server/entities/business.entity";
import { TLegalTypeOfBusiness } from "../types/TLegalTypeOfBusiness";

export interface IBusinessFront extends IBusinessEntity {}

export interface IBusinessLegalTypesFront
    extends Omit<IBaseSimpleFront, "name" | "content"> {}
