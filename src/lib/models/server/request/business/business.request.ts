import { TLocale } from "@/lib/models/types";
import { IContentEntity, IRoleOwnerWithContentEntity } from "../../entities";
import { IBaseModerationRequest } from "../base/base-with-moderation.request";
interface BusinessReqData {
    source: {
        OfficialName: string | null;
        RegistrationNumber: string | null;
        RegistrationDate: Date | null;
        Contacts: string | null;
        LegalType: string;
    };

    content?: IContentEntity;
}
export interface IBusinessRequest
    extends IBaseModerationRequest<BusinessReqData> {}
export interface IBusinessGetAllQueryRequest {
    lang?: TLocale;
    Ids?: string;
    EstablishmentId?: string;
    // LegalTypeIds?:string[]
    OfficialName?: string;
    RegistrationNumber?: string;
}
interface BusinessAssignmentDataReq {
    Person?: string;
    Business?: string;
    BusinessPosition?: string;
    IsOwnerVerified?: boolean;
}
export interface IBusinessAssignmentRequest
    extends IBaseModerationRequest<BusinessAssignmentDataReq> {}


    
export interface IBusinessAssignmentGetQueryRequest {
    personId?: string;
    businessId?: string;
    establishmentId?: string;
}
export interface IBusinessPersonRoleRequest {
    PersonBusinessAssignments: string;
    Role: IRoleOwnerWithContentEntity;
    activated: boolean;
}
