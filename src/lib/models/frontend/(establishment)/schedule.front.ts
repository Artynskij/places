import { TDayOfWeek } from "../../types/schedule/TDayOfWeek";

export interface IScheduleFront {
    id: string;
    day: TDayOfWeek;
    openTime: string;
    closeTime: string;
    isHoliday: boolean;
    is24Hours: boolean;
}
