
import { BaseApiService } from "../base/BaseApi.service";
import {
    IGenderEntity,
    IGenderWithContentEntity,
} from "@/lib/models/server/entities/(person)/gender.entity";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";

import { IPaginationBaseRequest } from "@/lib/models/server/request/base/pagination-base.request";
import apiClient from "../base/ApiClient";
export class GenderMapper {
    toFront(data: IGenderWithContentEntity | IGenderEntity): IGenderFront {
        const entity = "gender" in data ? data.gender : data;
        const content = "content" in data ? data.content : data.Content || null;
        return {
            id: entity.Id,
            code: entity.Code,
            key: entity.Name,
            value: content?.details[0].value || "",
        };
    }
}
export class GenderService extends BaseApiService<
    IGenderEntity,
    IGenderWithContentEntity,
    IGenderFront
> {
    protected baseUrl = "/gender";
    protected mapper = new GenderMapper();
    async getAll(body: IPaginationBaseRequest): Promise<IGenderFront[]> {
        try {
            const res = await apiClient.post<IGenderWithContentEntity[]>(
                `${this.baseUrl}/get-all`,
                body
            );

            return res.data.map((markItem) => this.mapper.toFront(markItem));
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/get-all]`, error);
            return [];
        }
    }
}
