import { IEstablishmentEntity } from "../../entities/establishment.entity";

export interface IEstablishmentResponse {
    establishment: IEstablishmentEntity;
    cdnHost: string;
}
export interface IEstablishmentItemsResponse {
    establishmentItems: IEstablishmentEntity[];
    cdnHost: string;
    total: number;
    page: number;
    pageSize: number;
}
