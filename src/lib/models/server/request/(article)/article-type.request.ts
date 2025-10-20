import { IBaseRequest, IBaseSourceRequest } from "../../base";
interface ISourceArticleType extends IBaseSourceRequest {
    Description?: string;
    SortOrder?: number;
    IsActive?: boolean;
}
export interface IArticleTypeRequest extends Omit<IBaseRequest, "source"> {
    source: ISourceArticleType;
}
