import { ScheduleMapper } from "./schedule.mapper";
import { IScheduleFront } from "@/lib/models/frontend/(establishment)/schedule.front";
import { ScheduleApi } from "./schedule.endpoint";
import { IScheduleCreateRequest } from "@/lib/models/server/request/(Establishment)/schedule.request";
import { IScheduleCreateResponse } from "@/lib/models/server/response/(Establishment)/schedule.response";

export class ScheduleService {
    private scheduleApi: ScheduleApi;
    private scheduleMapper: ScheduleMapper;
    constructor() {
        this.scheduleApi = new ScheduleApi();
        this.scheduleMapper = new ScheduleMapper();
    }
    async getScheduleByEstablishmentId(
        establishmentId: string
    ): Promise<IScheduleFront[] | null> {
        const response = await this.scheduleApi.getScheduleByEstablishmentId(
            establishmentId
        );
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
    async updateScheduleDay(
        id: string,
        body: IScheduleCreateRequest
    ): Promise<IScheduleCreateResponse | null> {
        const response = await this.scheduleApi.updateScheduleDay(id, body);
        return response;
    }
    async updateAllScheduleOfEstablishment(
        schedule: IScheduleFront[]
    ): Promise<IScheduleCreateResponse[]> {
        const promisesSchedule = schedule.map((item) => {
            const responseEl = this.scheduleApi.updateScheduleDay(item.id, {
                Day: item.day,
                CloseTime: item.closeTime,
                OpenTime: item.openTime,
                Is24Hours: item.is24Hours,
                IsHoliday: item.isHoliday,
            });
            return responseEl;
        });
        const response = (await Promise.all(promisesSchedule)).filter(Boolean);
        return response as IScheduleCreateResponse[];
        // const response = await this.scheduleApi.updateScheduleDay(id, body);
        // return response;
    }
}
