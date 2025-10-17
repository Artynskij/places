import { IBaseModerationRequest } from "../../base/base.request";
import { IPaginationBaseRequest } from "../../base/pagination-base.request";

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
