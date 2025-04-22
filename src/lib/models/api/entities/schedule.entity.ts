import { TDayOfWeek } from "../../common/TDayOfWeek";

export interface IScheduleEntity {
    Day: TDayOfWeek;
    OpenTime: string;
    CloseTime: string;
}
