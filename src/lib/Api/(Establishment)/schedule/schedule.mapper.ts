import { IScheduleEntity, IScheduleFront } from "@/lib/models";

// Intl.DateTimeFormat управление временем
export class ScheduleMapper {
    constructor() {}
    toFront(schedule: IScheduleEntity[]): IScheduleFront[] | null {
        if (schedule.length === 0) return null;
        const mapperData: IScheduleFront[] = schedule.map((scheduleItem) => {
            const openTimeArray = scheduleItem.OpenTime.split(":");
            const closeTimeArray = scheduleItem.CloseTime.split(":");
            return {
                day: scheduleItem.Day,
                openTime: `${openTimeArray[0]}:${openTimeArray[1]}`,
                closeTime: `${closeTimeArray[0]}:${closeTimeArray[1]}`,
                id: scheduleItem.Id,
                is24Hours: scheduleItem.Is24Hours,
                isHoliday: scheduleItem.IsHoliday,
            };
        });
        return mapperData;
    }
}
