import { IContentVerificationEntity, IImageEntity } from "../../entities";
import { IContentPartRequest } from "../_part/contentPart.request";

export interface IVerificationRequest {
    source: {
        Person?: string | null;
        Business?: string | null;
        Establishment?: string | null;
        IsVerified?: boolean;
    };

    content: IContentPartRequest;
}
