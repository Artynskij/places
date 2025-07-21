import { ISocialContactsEntity } from "@/lib/models/api/entities/(person)/socialContacts.entity";
import { ISocialContactsFront } from "@/lib/models/frontend/(person)/socialContacts.front";

export class SocialNetworksPersonMapper {
    constructor() {}
    transformSocialNetworksPersonEntity(
        socialNetworksPersonServer: ISocialContactsEntity
    ): ISocialContactsFront {
        const mappedData: ISocialContactsFront = {
            id: socialNetworksPersonServer.Id,
            instagram: socialNetworksPersonServer.Instagram,
            linkedin: socialNetworksPersonServer.LinkedIn,
            ok: socialNetworksPersonServer.OK,
            rutube: socialNetworksPersonServer.RuTube,
            telegram: socialNetworksPersonServer.Telegram,
            threads: socialNetworksPersonServer.Threads,
            tiktok: socialNetworksPersonServer.TikTok,
            viber: socialNetworksPersonServer.Viber,
            web: socialNetworksPersonServer.Web,
            vk: socialNetworksPersonServer.VK,
            whatsapp: socialNetworksPersonServer.WhatsApp,
            x: socialNetworksPersonServer.X,
            youtube: socialNetworksPersonServer.YouTube,
        };

        return mappedData;
    }
}
