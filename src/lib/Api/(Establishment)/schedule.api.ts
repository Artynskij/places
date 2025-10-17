import {
    IScheduleCreateResponse,
    IScheduleEntity,
    IScheduleFront,
    IScheduleRequest,
} from "@/lib/models";
import { IBaseModerationResponse } from "../../models/server/base/base.response";

import { BaseApiService } from "../base/BaseApi.service";
import apiClient from "../base/ApiClient";

export class ScheduleMapper {
    constructor() {}
    toFront(scheduleItem: IScheduleEntity): IScheduleFront {
        const openTimeArray = scheduleItem.OpenTime.split(":");
        const closeTimeArray = scheduleItem.CloseTime.split(":");

        const mapperData: IScheduleFront = {
            day: scheduleItem.Day,
            openTime: `${openTimeArray[0]}:${openTimeArray[1]}`,
            closeTime: `${closeTimeArray[0]}:${closeTimeArray[1]}`,
            id: scheduleItem.Id,
            is24Hours: scheduleItem.Is24Hours,
            isHoliday: scheduleItem.IsHoliday,
        };

        return mapperData;
    }
}

export class ScheduleService extends BaseApiService<
    IScheduleEntity,
    IScheduleEntity,
    IScheduleFront,
    IScheduleRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/schedule";
    protected mapper = new ScheduleMapper();
    async getScheduleByEstablishmentId(
        establishmentId: string
    ): Promise<IScheduleFront[] | null> {
        try {
            const res = await apiClient.get<IScheduleEntity[]>(
                `${this.baseUrl}/by-establishment/${establishmentId}`
            );
            if (!res) return null;
            return res.data.map((scheduleItem) =>
                this.mapper.toFront(scheduleItem)
            );
        } catch (error) {
            console.error(
                `error [post ${this.baseUrl}/by-establishment/${establishmentId}`,
                error
            );
            return [];
        }
    }
    async updateAllScheduleOfEstablishment(
        schedule: { id: string | null; body: IScheduleRequest }[]
    ): Promise<IBaseModerationResponse[]> {
        const promisesSchedule = schedule.map((scheduleItem) => {
            const responseEl = this.updateOrCreate(
                scheduleItem.id,
                scheduleItem.body
            );

            return responseEl;
        });
        const response = (await Promise.all(promisesSchedule)).filter(Boolean);
        return response as IBaseModerationResponse[];
    }
}
