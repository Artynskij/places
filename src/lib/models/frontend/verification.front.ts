import {
    IBusinessEntity,
    IEstablishmentWithContentEntity,
    IPersonEntity,
} from "../api/entities";
import { IMediaFront } from "./(establishment)/parts/media.front";

export interface IVerificationFront {
    id: string;
    person: IPersonEntity | null;
    business: IBusinessEntity | null;
    establishment: IEstablishmentWithContentEntity | null;
    isVerified: boolean;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    privateMedia: IMediaFront[] | null;
}
