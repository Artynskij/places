import { ISocialContactsFront } from "../socialContacts.front";

export interface IContactsEstablishmentFront {
    id: string;
    phone: string | null;
    web: string | null;
    email: string | null;
    menu: string | null;
    socialNetworksId: string | null;
    socialNetworks: ISocialContactsFront | null;

    Other?: string | null;
}
