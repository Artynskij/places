import { TDayOfWeek } from "@/lib/models/types/TDayOfWeek";


export interface IScheduleEntity {
    Day: TDayOfWeek;
    OpenTime: string;
    CloseTime: string;
}
