import { IBaseModerationRequest } from "../base/base.request";

interface SocialNetworksData {
    Web?: string;
    Telegram?: string;
    WhatsApp?: string;
    Viber?: string;
    VK?: string;
    LinkedIn?: string;
    Instagram?: string;
    OK?: string;
    X?: string;
    RuTube?: string;
    YouTube?: string;
    TikTok?: string;
    Threads?: string;
}
export interface ISocialContactsRequest
    extends IBaseModerationRequest<SocialNetworksData> {}
