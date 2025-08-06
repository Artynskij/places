import { IEstablishmentWithContentEntity } from "../../entities/(establishment)/establishment.entity";

export interface IEstablishmentResponse {
    establishment: IEstablishmentWithContentEntity;
    cdnHost: string;
}
export interface IEstablishmentItemsResponse {
    establishmentItems: IEstablishmentWithContentEntity[];
    cdnHost: string;
    total: number;
    page: number;
    pageSize: number;
}
