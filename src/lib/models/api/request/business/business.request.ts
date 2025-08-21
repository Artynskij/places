export interface IBusinessRequest {
    source: {
        OfficialName: string | null;
        RegistrationNumber: string | null;
        RegistrationDate: string | null;
        Contacts: string | null;
        LegalType:string;
    };

    content?: {
        type: "Business";
        collection: "Business";
        value: [
            {
                lang: "en";
                value: {
                    name: "My Business";
                    description: "Leading tour operator";
                };
            },
            {
                lang: "ru";
                value: {
                    name: "Мой бизнес";
                    description: "Ведущий туроператор";
                };
            }
        ];
    };
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
