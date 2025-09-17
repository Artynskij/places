import { IEstablishmentWithContentEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryEstablishmentEntity } from "../../entities/(establishment)/parts/categoryEstablishmentPart.entity";

export interface ICategoryAndEstablishmentConnectionResponse {
    Id: string;
    Category: ICategoryEstablishmentEntity;
    Establishment: IEstablishmentWithContentEntity;
}
