import { IBaseModerationRequest } from "./base/base-with-moderation.request";
import { IContentMultilingualRequest } from "./base/multilingual-content.request";

interface verificationData {
    source: {
        Person?: string | null;
        Business?: string | null;
        Establishment?: string | null;
        IsVerified?: boolean;
    };

    content: IContentMultilingualRequest;
}
export interface IVerificationRequest
    extends IBaseModerationRequest<verificationData> {}
