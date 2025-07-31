import { IEstablishmentEntity } from "../../entities/(establishment)/establishment.entity";
import { IScheduleEntity } from "../../entities/(establishment)/schedule.entity";

export interface IScheduleCreateResponse extends IScheduleEntity {
    Id: string;
    Establishment: IEstablishmentEntity;
}
