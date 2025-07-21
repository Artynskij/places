import { IPersonSettingsFront } from "../frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "../frontend/(person)/socialContacts.front";

export interface IUser {
    id: string;
    timeZone: string | null;
    isVerified: boolean;
    nickname: string | null;
    birthDate: string | null;
    avatarImg: string | null;
    aboutDescription: string | null;
    personName: {
        id: string;
        name: string | null;
        secondName: string | null;
        surname: string | null;
        originalName: string | null;
        originalLastName: string | null;
    } | null;
    contacts: {
        id: string;
        email: string | null;
        phone: string | null;
    } | null;
    address: {
        id: string;
        postalCode: string | null;
        country: string | null;
        district: string | null;
        town: string | null;
        street: string | null;
    } | null;

    socialNetworks: ISocialContactsFront | null;
    personSettings: IPersonSettingsFront | null;
}
