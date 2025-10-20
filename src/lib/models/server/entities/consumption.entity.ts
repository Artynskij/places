import { TConsumptionType } from "../../types/TConsumptionType";
import { TConsumptionTypeContent } from "../../types/TConsumptionTypeContent";
import { IBaseSimpleEntity } from "../base/base.entity";

export interface IConsumptionTypeContentEntity extends IBaseSimpleEntity {
    Code: TConsumptionTypeContent;
}
export interface IConsumptionTypeEntity extends IBaseSimpleEntity {
    Code: TConsumptionType;
}
