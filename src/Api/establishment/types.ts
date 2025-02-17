import { IApiEstablishment } from "../api.type";

export interface IApiEstablishmentsResponse {
    establishmentItems: IApiEstablishment[];
    cdnHost: string;
  }
  export interface IApiEstablishmentResponse {
    establishment: IApiEstablishment;
    cdnHost: string;
  }






interface ITagsFilterCredentials {
  ids?: string[];
  lang: string;
  establishmentIds?: string[];
}
