export interface IBusinessRequest {
    OfficialName: string | null;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
}
export interface IBusinessAssignmentRequest {
    PersonId: string;
    BusinessId:string;
    BusinessPositionId: string;
    IsOwnerVerified: boolean;
}
