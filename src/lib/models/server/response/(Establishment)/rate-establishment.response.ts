import { IRateEstablishmentEntity } from "../../entities";

export interface IRateEstablishmentAllResponse {
    data: IRateEstablishmentEntity[];
    limit: number;
    page: number;
    total: number;
}
