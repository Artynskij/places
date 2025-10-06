import { IBaseModerationRequest } from "../base/base-with-moderation.request";
import { IPaginationRequest } from "../IPagination.request";

export interface ITagsOfEstablishmentRequest extends IPaginationRequest {
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
