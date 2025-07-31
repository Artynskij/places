import { TDayOfWeek } from "@/lib/models/types/TDayOfWeek";

export interface IScheduleCreateRequest {
    EstablishmentId: string;
    Day: TDayOfWeek;
    OpenTime: string;
    CloseTime: string;
}
