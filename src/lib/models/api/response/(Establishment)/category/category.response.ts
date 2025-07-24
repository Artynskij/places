import { ICategoryOfEstablishmentEntity } from "../../../entities/categoryOfEstablishment.entity";
import { IEstablishmentEntity } from "../../../entities/establishment.entity";

export interface ICategoryAndEstablishmentConnectionResponse {
    Id: string;
    Category: ICategoryOfEstablishmentEntity;
    Establishment: IEstablishmentEntity;
}
