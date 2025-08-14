export interface IBusinessRequest {
    OfficialName: string | null;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
    Contacts: string | null;
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
