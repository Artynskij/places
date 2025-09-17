import { IContentEntity, IRoleOwnerWithContentEntity } from "../../entities";

export interface IBusinessRequest {
    source: {
        OfficialName: string | null;
        RegistrationNumber: string | null;
        RegistrationDate: Date | null;
        Contacts: string | null;
        LegalType: string;
    };

    content?: IContentEntity;
}
export interface IBusinessAssignmentRequest {
    Person?: string;
    Business?: string;
    BusinessPosition?: string;
    IsOwnerVerified?: boolean;
}
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
