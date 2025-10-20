import { IBaseModerationResponse } from "@/lib/models/server/base/base.response";
// import { BaseApiService } from "../../BaseApi.service";
import {
    ISocialContactsFront,
    ISocialContactsRequest,
    ISocialContactsEntity,
} from "@/lib/models";
import { BaseApiService } from "./base/BaseApi.service";

class SocialNetworksMapper {
    constructor() {}
    toFront(
        socialNetworksPersonServer: ISocialContactsEntity
    ): ISocialContactsFront {
        const mappedData: ISocialContactsFront = {
            id: socialNetworksPersonServer.Id,
            Instagram: socialNetworksPersonServer.Instagram,
            LinkedIn: socialNetworksPersonServer.LinkedIn,
            OK: socialNetworksPersonServer.OK,
            RuTube: socialNetworksPersonServer.RuTube,
            Telegram: socialNetworksPersonServer.Telegram,
            Threads: socialNetworksPersonServer.Threads,
            TikTok: socialNetworksPersonServer.TikTok,
            Viber: socialNetworksPersonServer.Viber,
            Web: socialNetworksPersonServer.Web,
            VK: socialNetworksPersonServer.VK,
            WhatsApp: socialNetworksPersonServer.WhatsApp,
            X: socialNetworksPersonServer.X,
            YouTube: socialNetworksPersonServer.YouTube,
        };

        return mappedData;
    }
}
export class SocialNetworksService extends BaseApiService<
    ISocialContactsEntity,
    ISocialContactsEntity,
    ISocialContactsFront,
    ISocialContactsRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/social-contacts";
    protected mapper = new SocialNetworksMapper();
}
