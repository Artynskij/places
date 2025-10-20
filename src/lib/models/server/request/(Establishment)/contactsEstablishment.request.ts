import { IBaseModerationRequest } from "../../base/base.request";

interface ContactEstablishment {
    source: {
        Phone: string | null;
        Web: string | null;
        Email: string | null;
        Menu: string | null;
        SocialContactsId: string | null;
    };
}
export interface IContactEstablishmentRequest
    extends IBaseModerationRequest<ContactEstablishment> {}
