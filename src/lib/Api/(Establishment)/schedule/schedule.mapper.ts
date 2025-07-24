import { IScheduleEntity } from "@/lib/models/api/entities/schedule.entity";
import { IScheduleFront } from "@/lib/models/frontend/schedule/schedule.front";
// Intl.DateTimeFormat управление временем
export class ScheduleMapper {
    constructor() {}
    transformSchedule(schedule: IScheduleEntity[]): IScheduleFront[] | null {
        if (schedule.length === 0) return null;
        const mapperData: IScheduleFront[] = schedule.map((scheduleItem) => {
            const openTimeArray = scheduleItem.OpenTime.split(":");
            const closeTimeArray = scheduleItem.CloseTime.split(":");
            return {
                day: scheduleItem.Day,
                openTime: `${openTimeArray[0]}:${openTimeArray[1]}`,
                closeTime: `${closeTimeArray[0]}:${closeTimeArray[1]}`,
            };
        });
        return mapperData;
    }
}
