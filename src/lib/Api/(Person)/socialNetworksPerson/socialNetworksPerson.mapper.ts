import { ISocialContactsEntity } from "@/lib/models/server/entities/socialContacts.entity";
import { ISocialContactsFront } from "@/lib/models/frontend/socialContacts.front";

export class SocialNetworksPersonMapper {
    constructor() {}
    transformSocialNetworksPersonEntity(
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
