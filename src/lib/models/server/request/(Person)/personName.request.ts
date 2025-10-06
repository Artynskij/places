import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface PersonNameData {
    source: {
        FirstName?: string | null;
        MiddleName?: string | null;
        LastName?: string | null;
        OriginalName?: string | null;
        OriginalMiddleName?: string | null;
        OriginalLastName?: string | null;
    };
}
export interface IPersonNameRequest
    extends IBaseModerationRequest<PersonNameData> {}
