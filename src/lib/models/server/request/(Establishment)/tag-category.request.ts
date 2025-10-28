import { IBaseRequest, IBaseSourceRequest } from "../../base";

export interface ITagCategoryRequest extends Omit<IBaseRequest, "source"> {
    source: Omit<IBaseSourceRequest, "Code">;
}
