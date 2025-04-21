import { IDayOfWeek } from "../../common/IDayOfWeek";

export interface IScheduleFront {
    day: IDayOfWeek;
    openTime: string;
    closeTime: string;
}
