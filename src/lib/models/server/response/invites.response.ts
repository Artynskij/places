import { IContentMultilingualEntity, IPersonNameEntity } from "../../entities";

export interface IInvitesByQueryItemResponse {
    id: string;
    activated: false;
    role: {
        id: string;
        code: string;
        content: IContentMultilingualEntity;
    };
    person: {
        id: string;
        name: IPersonNameEntity | null;
        email: string;
    };
}
