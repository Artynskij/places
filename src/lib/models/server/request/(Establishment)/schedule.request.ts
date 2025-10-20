import { TDayOfWeek } from "@/lib/models/types/schedule/TDayOfWeek";
import { IBaseModerationRequest } from "../../base/base.request";
interface ScheduleData {
    Establishment?: string;
    Day: TDayOfWeek;
    OpenTime: string;
    CloseTime: string;

    IsHoliday: boolean;
    Is24Hours: boolean;

    IsBreak?: boolean;
    IsTechnicalBreak?: boolean;
    IsBreakfastTime?: boolean;
    IsLunchTime?: boolean;
    IsDinnerTime?: boolean;
    IsCleaningTime?: boolean;
    IsStaffOnly?: boolean;
    IsSeasonal?: boolean;
    IsReservationOnly?: boolean;
    IsTemporary?: boolean;
    IsEventTime?: boolean;
}
export interface IScheduleRequest
    extends IBaseModerationRequest<ScheduleData> {}
