import { IContentEntity } from "../(establishment)/parts/content.entity";

export interface IGenderWithContentEntity {
    gender: IGenderEntity;

    content: IContentEntity | null;
}
export interface IGenderEntity {
    Id: string;

    Code: string;
    Name: string;
    ContentId: string | null;
    Content?: IContentEntity | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
}
