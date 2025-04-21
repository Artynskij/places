import { IDayOfWeek } from "../../common/IDayOfWeek";

export interface IScheduleEntity {
    Day: IDayOfWeek;
    OpenTime: string;
    CloseTime: string;
}
