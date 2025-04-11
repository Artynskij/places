import { IPaginationRequest } from "../IPagination.request";

export interface IPaginationEstablishmentRequest extends IPaginationRequest {
  filter?: {
    typeIds?: number[] | string[];
    categoryIds?: number[] | string[];
    tagsIds?: number[] | string[];
    locationId?:string;
  };
  
  pagination: {
    page: number;
    pageSize: number;
  };
}
