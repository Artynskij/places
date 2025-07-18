export interface IBusinessEntity {
    Id: string;
    OfficialName: string | null;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
    ContentId: string | null;
    LastModifiedDate: string;
    CreatedDate: string;
    DeletedDate: string | null;
}
