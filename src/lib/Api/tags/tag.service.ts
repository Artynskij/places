import { ITagEntity } from "@/lib/models/api/entities/tag.entity";
import { TagsApi } from "./tag.endpoints";
import { ITagsOfEstablishmentRequest } from "@/lib/models/api/request/tags/IPaginationTags.request";
import { IPaginationRequest } from "@/lib/models/api/request/IPagination.request";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response/tags/ITags.response";
import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";
import TagsMapper from "./tag.mapper";
import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";
import { ITagClassWithEstablishmentFront } from "@/lib/models";

export class TagsService {
    private tagsApi: TagsApi;
    private tagsMapper: TagsMapper;
    constructor() {
        this.tagsApi = new TagsApi();
        this.tagsMapper = new TagsMapper();
    }
    async getStarsAndPriceOfAllEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagClassWithEstablishmentFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishments(body);
        const mappingData =
            this.tagsMapper.transformClassTag(response);
        return mappingData ? mappingData : null;
    }
    async getAllTagsOfEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsOfEstablishmentResponse[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishments(body);
        return response ? response : null;
    }
    async getAllTagsOfEstablishmentFilter(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsBlockFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishmentFilter(
            body
        );
        const mappingData=
            this.tagsMapper.transformToFront(response);
        return mappingData;
    }

}
