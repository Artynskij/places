import { TDayOfWeek } from "../../types/TDayOfWeek";

export interface IScheduleEntity {
    Day: TDayOfWeek;
    OpenTime: string;
    CloseTime: string;
}
