import { ScheduleMapper } from "./schedule.mapper";
import { IScheduleFront } from "@/lib/models/frontend/(establishment)/schedule.front";
import { ScheduleApi } from "./schedule.endpoint";
import { IScheduleCreateRequest } from "@/lib/models/api/request/(Establishment)/schedule.request";
import { IScheduleCreateResponse } from "@/lib/models/api/response/(Establishment)/schedule.response";

export class ScheduleService {
    private scheduleApi: ScheduleApi;
    private scheduleMapper: ScheduleMapper;
    constructor() {
        this.scheduleApi = new ScheduleApi();
        this.scheduleMapper = new ScheduleMapper();
    }
    async getScheduleById(id: string): Promise<IScheduleFront[] | null> {
        const response = await this.scheduleApi.getScheduleById(id);
        const mappingData = response
            ? this.scheduleMapper.toFront(response)
            : null;
        return mappingData;
    }
    async createScheduleDay(
        body: IScheduleCreateRequest
    ): Promise<IScheduleCreateResponse | null> {
        const response = await this.scheduleApi.createScheduleDay(body);
        return response;
    }
}
