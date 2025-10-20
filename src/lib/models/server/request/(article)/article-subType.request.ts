import { IBaseRequest, IBaseSourceRequest } from "../../base";
interface ISourceArticleType extends IBaseSourceRequest {
    Description?: string;
    SortOrder?: number;
    IsActive?: boolean;
    ArticleTypeId: string;
}
export interface IArticleSubTypeRequest extends Omit<IBaseRequest, "source"> {
    source: ISourceArticleType;
}
