import { IBaseModerationRequest } from "../../base/base.request";
import { IPaginationBaseRequest } from "../../base/pagination-base.request";
import { IContentSimpleEntity } from "../../entities";

export interface ITagRequest {
    source: {
        TagCategoryId: string;
    };
    content: Omit<IContentSimpleEntity, "id">;
}
// export interface ITagCategoryRequest extends Omit<IBaseRequest, "source"> {
//     source: Omit<IBaseSourceRequest, "Code">;
// }
export interface ITagsOfEstablishmentRequest extends IPaginationBaseRequest {
    establishmentIds?: number[] | string[];
    establishmentTypeId?: string;
    locationId?: string;
}
interface TagAndEstablishmentConnectionRequestData {
    Establishment: string;
    Tag: string;
}
export interface ITagAndEstablishmentConnectionRequest
    extends IBaseModerationRequest<TagAndEstablishmentConnectionRequestData> {}
