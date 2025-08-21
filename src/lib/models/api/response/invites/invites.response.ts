import { IContentEntity, IPersonNameEntity } from "../../entities";

export interface IInvitesByQueryItemResponse {
    id: string;
    activated: false;
    role: {
        id: string;
        code: string;
        content: IContentEntity;
    };
    person: {
        id: string;
        name: IPersonNameEntity | null;
        email: string;
    };
}
