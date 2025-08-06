import { IImageEntity } from "../../entities";

export interface IVerificationRequest {
    source: {
        Person?: string | null;
        Business?: string | null;
        Establishment?: string | null;
        IsVerified?: boolean;
    };

    content: {
        details: {
            lang: string;
            value: string;
        }[];
        privateMedia: IImageEntity[];
    };
}
