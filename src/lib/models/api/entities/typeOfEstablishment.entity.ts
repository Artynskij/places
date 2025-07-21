import { TTypesOfEstablishment } from "../../types/TTypesEstablishment";

export interface ITypeOfEstablishment {
    type: {
        Id: string;
        Name: string;
        RefName: TTypesOfEstablishment;
        ContentId: string;
        CreatedDate: string;
        LastModifiedDate: string;
        DeletedDate: string | null;
    };
    content: {
        id: string;
        details: {
            lang: string;
            _id: string;
        }[];
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    };
}
