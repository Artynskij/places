import { IBaseSimpleFront } from "../base/base.front";

export interface IArticleSubTypeFront extends IBaseSimpleFront {
    isActive: boolean;
    description: string | null;
    sortOrder: number | null;
    articleTypeId: string;  
}
