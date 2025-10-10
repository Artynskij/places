import { IEstablishmentWithContentPareEntity } from "../../entities/(establishment)/establishment.entity";

export interface IEstablishmentResponse {
    establishment: IEstablishmentWithContentPareEntity;
    cdnHost: string;
}
export interface IEstablishmentItemsResponse {
    establishmentItems: IEstablishmentWithContentPareEntity[];
    cdnHost: string;
    total: number;
    page: number;
    pageSize: number;
}
