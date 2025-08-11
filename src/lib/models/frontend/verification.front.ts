import { IMediaFront } from "./(establishment)/parts/media.front";

export interface IVerificationFront {
    id: string;
    personId: string | null;
    businessId: string | null;
    establishmentId: string | null;
    isVerified: boolean;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    privateMedia: IMediaFront[] | null;
}
