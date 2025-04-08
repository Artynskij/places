import { ITagEntity } from "@/lib/models/api/entities/tag.entity";
import { TagsApi } from "./tag.endpoints";
import { ITagsOfEstablishmentRequest } from "@/lib/models/api/request/tags/IPaginationTags.request";
import { IPaginationRequest } from "@/lib/models/api/request/IPagination.request";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response/tags/ITags.response";
import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";

export class TagsService {
    private tagsApi: TagsApi;

    constructor() {
        this.tagsApi = new TagsApi();
    }

    async getAllTagsOfEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsOfEstablishmentResponse[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishment(body);
        return response ? response : null;
    }
    async getAllTagsOfEstablishmentFilter(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsBlockFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishmentFilter(
            body
        );
        const mappingData: ITagsBlockFront[] | undefined = response?.map(
            (cat) => {
                return {
                    tags: cat.Tags.map((tag) => {
                        return {
                            id: tag.Id,
                            name: tag.Content.details[0].value,
                            value: tag.Id,
                        };
                    }),
                    groupKey: {
                        id: cat.TagCategory.Id,
                        name: cat.TagCategory.Content.details[0].value,
                        value: cat.TagCategory.Name,
                    },
                };
            }
        );
        return mappingData ? mappingData : null;
    }
    // async getTagsByEstablishment(query:ITagsOfEstablishmentRequest): Promise<ITagEntity[] | null> {
    //   const response = await this.tagsApi.getAllTagsOfEstablishment(query);
    //   return response ? response : null;
    // }
}
