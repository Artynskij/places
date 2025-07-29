import { IContentEntity } from "../parts/content.entity";

export interface IGenderEntity {
    gender: {
        Id: string;

        Code: string;
        Name: string;
        CreatedDate: string;
        LastModifiedDate: string;
        DeletedDate: string | null;
    };

    content: IContentEntity | null;
}
export interface IGenderBodyEntity {
    Id: string;

    Code: string;
    Name: string;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
}
