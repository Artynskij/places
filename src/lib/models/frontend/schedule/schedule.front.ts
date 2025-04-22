import { TDayOfWeek } from "../../common/TDayOfWeek";

export interface IScheduleFront {
    day: TDayOfWeek;
    openTime: string;
    closeTime: string;
}
