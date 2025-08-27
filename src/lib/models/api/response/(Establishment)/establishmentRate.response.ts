import { IEstablishmentRateEntity } from "../../entities";

export interface IEstablishmentRateAllResponse {
    data: IEstablishmentRateEntity[];
    limit: number;
    page: number;
    total: number;
}
