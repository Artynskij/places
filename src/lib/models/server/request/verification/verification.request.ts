import { IContentVerificationEntity, IImageEntity } from "../../entities";
import { IContentPartRequest } from "../_part/contentPart.request";
import { IBaseModerationRequest } from "../base/base-with-moderation.request";
interface verificationData {
    source: {
        Person?: string | null;
        Business?: string | null;
        Establishment?: string | null;
        IsVerified?: boolean;
    };

    content: IContentPartRequest;
}
export interface IVerificationRequest
    extends IBaseModerationRequest<verificationData> {}
