import { IPaginationRequest } from "../IPagination.request";

export interface ITagsOfEstablishmentRequest extends IPaginationRequest {
    establishmentIds?: number[] | string[];
    establishmentTypeId?: string;
    locationId?: string;
}
export interface ITagAndEstablishmentConnectionRequest {
    Establishment: string;
    Tag: string;
}
