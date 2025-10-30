import { EstablishmentTagsApi } from "./establishment-tags.endpoints";

import EstablishmentTagsMapper from "./establishment-tags.mapper";
import {
    ITagAndEstablishmentConnectionRequest,
    ITagBlockFront,
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentRequest,
    ITagWithEstablishmentFront,
} from "@/lib/models";

// import { ITagClassFront, ITagClassWithEstablishmentFront } from "@/lib/models";

export class EstablishmentTagsService {
    private tagsApi: EstablishmentTagsApi;
    private tagsMapper: EstablishmentTagsMapper;
    constructor() {
        this.tagsApi = new EstablishmentTagsApi();
        this.tagsMapper = new EstablishmentTagsMapper();
    }
    async getAllTagsOfEstablishmentFilter(
        body: ITagsOfEstablishmentRequest,
        checkedValue: string[] | null
    ): Promise<ITagBlockFront[] | null> {
        const response = await this.tagsApi.getAllTagsOfEstablishmentFilter(
            body
        );
        const mappingData = this.tagsMapper.tagBlock(response, checkedValue);
        return mappingData;
    }

    async getAllTagsOfEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagWithEstablishmentFront[] | null> {
        if (!body.establishmentIds || !body.establishmentIds.length) {
            console.log("Ошибка при запросе за tags.");
            return null;
        }
        const response = await this.tagsApi.getAllTagsOfEstablishments(body);
        const mappingData = this.tagsMapper.tagWithEstablishment(response);
        return mappingData ? mappingData : null;
    }
    async getStarsAndPriceOfAllEstablishment(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagWithEstablishmentFront[] | null> {
        if (!body.establishmentIds || !body.establishmentIds.length) {
            console.log("Ошибка при запросе за classTags. ");

            return null;
        }
        const mappingData = await this.getAllTagsOfEstablishment(body);
        const classTagsOfEstablishments = mappingData?.filter(
            (item) => item.tag.count
        );
        return classTagsOfEstablishments ? classTagsOfEstablishments : null;
    }
    async createTagEstablishmentConnect(
        body: ITagAndEstablishmentConnectionRequest
    ): Promise<ITagsOfEstablishmentFilterResponse | null> {
        const response = this.tagsApi.createTagEstablishmentConnect(body);
        return response;
    }
    // separationClassTag(tags: ITagBlockFront[]): ITagBlockFront | null {
    //     const classTag = this.tagsMapper.separationClassTag(tags);
    //     return classTag;
    // }
}
