import { IBaseRequest, IBaseSourceRequest } from "../../base";
interface ISourceArticleCategory extends IBaseSourceRequest {
    Description?: string;
    SortOrder?: number;
    IsActive?: boolean;
}
export interface IArticleTypeRequest extends Omit<IBaseRequest, "source"> {
    source: ISourceArticleCategory;
}
