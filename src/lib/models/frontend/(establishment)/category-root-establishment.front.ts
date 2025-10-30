import { IBaseSimpleFront } from "../base/base.front";

export interface ICategoryRootEstablishmentFront extends Omit<IBaseSimpleFront, 'code'>{
    isActive:boolean
    
}