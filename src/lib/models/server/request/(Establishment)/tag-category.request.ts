import { IBaseRequest, IBaseSourceRequest } from "../../base";
interface sourceContent extends Omit<IBaseSourceRequest, "Code"> {
    EstablishmentTypeId : string;
}
export interface ITagCategoryRequest extends Omit<IBaseRequest, "source"> {
    source: sourceContent;
}
