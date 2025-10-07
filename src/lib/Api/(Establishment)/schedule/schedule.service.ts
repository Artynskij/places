import { ScheduleMapper } from "./schedule.mapper";
import { IScheduleFront } from "@/lib/models/frontend/(establishment)/schedule.front";
import { ScheduleApi } from "./schedule.endpoint";
import { IScheduleRequest } from "@/lib/models/server/request/(Establishment)/schedule.request";
import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";

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
    async create(
        body: IScheduleRequest
    ): Promise<IBaseModerationResponse | null> {
        const response = await this.scheduleApi.createScheduleDay(body);
        return response;
    }
    async update(
        id: string,
        body: IScheduleRequest
    ): Promise<IBaseModerationResponse | null> {
        const response = await this.scheduleApi.updateScheduleDay(id, body);
        return response;
    }

    async updateAllScheduleOfEstablishment(
        schedule: { id: string | null; body: IScheduleRequest }[]
    ): Promise<IBaseModerationResponse[]> {
        const promisesSchedule = schedule.map((item) => {
            const responseEl = item.id
                ? this.scheduleApi.updateScheduleDay(item.id, item.body)
                : this.scheduleApi.createScheduleDay(item.body);
            return responseEl;
        });
        const response = (await Promise.all(promisesSchedule)).filter(Boolean);
        return response as IBaseModerationResponse[];
    }
}
