import { IPaginationRequest } from "../IPagination.request";

export interface IPaginationArticleRequest extends IPaginationRequest {
  pagination: {
    page: number;
    pageSize: number;
  };
}
