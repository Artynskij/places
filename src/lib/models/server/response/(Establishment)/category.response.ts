import { IEstablishmentWithContentPareEntity } from "../../entities/(establishment)/establishment.entity";
import { ICategoryEstablishmentWithContentPareEntity } from "../../entities/(establishment)/category-establishment.entity";

export interface ICategoryAndEstablishmentConnectionResponse {
    Id: string;
    Category: ICategoryEstablishmentWithContentPareEntity;
    Establishment: IEstablishmentWithContentPareEntity;
}
