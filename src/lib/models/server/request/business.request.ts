import { TLocale } from "@/lib/models/types";
import { IRoleOwnerWithContentEntity } from "./../entities";
import { IBaseModerationRequest } from "../base/base.request";
interface BusinessReqData {
    source: {
        OfficialName: string | null;
        RegistrationNumber: string | null;
        RegistrationDate: Date | null;
        Contacts: string | null;
        LegalType: string;
    };

    content?: null;
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

// Buss Assign person
interface BusinessPersonAssignmentDataReq {
    Person?: string;
    Business?: string;
    BusinessPosition?: string;
    IsOwnerVerified?: boolean;
}

export interface IBusinessPersonAssignmentRequest
    extends IBaseModerationRequest<BusinessPersonAssignmentDataReq> {}

export interface IBusinessPersonAssignmentGetQueryRequest {
    personId?: string;
    businessId?: string;
    establishmentId?: string;
}
// Buss Assign establishment
interface BusinessEstablishmentAssignmentDataReq {
    Establishment?: string;
    Business?: string;

    IsPrimary?: boolean;
}
export interface IBusinessEstablishmentAssignmentRequest
    extends IBaseModerationRequest<BusinessEstablishmentAssignmentDataReq> {}
export interface IBusinessEstablishmentAssignmentGetQueryRequest {
    personId?: string;
    businessId?: string;
    establishmentId?: string;
}
// Buss Role
export interface IBusinessPersonRoleRequest {
    PersonBusinessAssignments: string;
    Role: IRoleOwnerWithContentEntity;
    activated: boolean;
}
