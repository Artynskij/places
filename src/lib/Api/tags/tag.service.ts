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
import { ITagFront } from "@/lib/models";
// import { ITagClassFront, ITagClassWithEstablishmentFront } from "@/lib/models";

export class TagsService {
    private tagsApi: TagsApi;
    private tagsMapper: TagsMapper;
    constructor() {
        this.tagsApi = new TagsApi();
        this.tagsMapper = new TagsMapper();
    }
    async getAllTagsOfEstablishmentFilter(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsBlockFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishmentFilter(
            body
        );
        const mappingData = this.tagsMapper.tagBlock(response);
        return mappingData;
    }
  
    async getAllTagsOfEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagWithEstablishmentFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishments(body);
        const mappingData = this.tagsMapper.tagWithEstablishment(response)
        return mappingData ? mappingData : null;
    }
     async getStarsAndPriceOfAllEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagWithEstablishmentFront[] | null> {
        const mappingData = await this.getAllTagsOfEstablishment(body);
        const classTagsOfEstablishments = mappingData?.filter(item => item.tag.count);
        return classTagsOfEstablishments ? classTagsOfEstablishments : null;
    }
    // separationClassTag(tags: ITagsBlockFront[]): ITagsBlockFront | null {
    //     const classTag = this.tagsMapper.separationClassTag(tags);
    //     return classTag;
    // }
}
