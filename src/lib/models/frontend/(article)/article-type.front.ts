import { IBaseSimpleFront } from "../base/base.front";

export interface IArticleTypeFront extends IBaseSimpleFront {
    isActive:boolean
    description: string | null;
    sortOrder: number | null;
    
}
