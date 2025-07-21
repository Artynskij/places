import { TDayOfWeek } from "../../types/TDayOfWeek";

export interface IScheduleFront {
    day: TDayOfWeek;
    openTime: string;
    closeTime: string;
}
