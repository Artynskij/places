import { IEstablishmentEntity } from "../../../entities/establishment.entity";
import { IScheduleEntity } from "../../../entities/schedule.entity";

export interface IScheduleCreateResponse extends IScheduleEntity {
    Id:string;
    Establishment: IEstablishmentEntity;

}