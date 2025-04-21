import { ScheduleMapper } from "./shedule.mapper";
import { IScheduleFront } from "@/lib/models/frontend/schedule/shedule.front";
import { ScheduleApi } from "./schedule.endpoint";

export class ScheduleService {
    private scheduleApi: ScheduleApi;
    private scheduleMapper: ScheduleMapper;
    constructor() {
        this.scheduleApi = new ScheduleApi();
        this.scheduleMapper = new ScheduleMapper()
    }
    async getLocationById(id: string): Promise<IScheduleFront[] | null> {
        const response = await this.scheduleApi.getScheduleById(id);
        const mappingData = response
            ? this.scheduleMapper.transformSchedule(response)
            : null;
        return mappingData;
    }
}
