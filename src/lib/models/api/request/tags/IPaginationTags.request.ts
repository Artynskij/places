import { IPaginationRequest } from "../IPagination.request";

export interface ITagsOfEstablishmentRequest extends IPaginationRequest {
    establishmentIds?: number[] | string[];
    establishmentTypeId?: string;
    locationId?: string;
}
