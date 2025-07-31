export interface IVerificationEntity {
    Id: string;
    PersonId: string | null;
    BusinessId: string | null;
    EstablishmentId: string | null;
    IsVerified: boolean;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    ContentId: string | null;
}
