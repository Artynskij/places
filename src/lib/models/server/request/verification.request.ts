import { IBaseModerationRequest } from "./base/base-with-moderation.request";
import {
    IContentMultilingualRequest,
    IContentRequest,
} from "./base/multilingual-content.request";
interface verificationData {
    source: {
        Person?: string | null;
        Business?: string | null;
        Establishment?: string | null;
        IsVerified?: boolean;
    };

    content: IContentRequest;
}
export interface IVerificationRequest
    extends IBaseModerationRequest<verificationData> {}
