import { IEstablishmentEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryOfEstablishmentEntity } from "../../entities/(establishment)/parts/categoryOfEstablishmentPart.entity";

export interface ICategoryAndEstablishmentConnectionResponse {
    Id: string;
    Category: ICategoryOfEstablishmentEntity;
    Establishment: IEstablishmentEntity;
}
