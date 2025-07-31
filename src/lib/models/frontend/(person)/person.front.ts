import { IGenderFront } from "./gender.front";
import { IPersonNameFront } from "./personName.front";
import { IPersonSettingsFront } from "./personSettings.front";

import { ISocialContactsFront } from "../socialContacts.front";

export interface IPersonFront {
    id: string;
    timeZone: string | null;
    isVerified: boolean;
    nickname: string | null;
    birthDate: string | null;
    avatarImg: string | null;
    profileImg: string | null;
    aboutDescription: string | null;
    personName: IPersonNameFront | null;
    dateRegister: string;
    contacts: {
        id: string;
        email: string | null;
        phone: string | null;
        address: {
            id: string;
            postalCode: string | null;
            country: string | null;
            district: string | null;
            town: string | null;
            street: string | null;
        } | null;
        socialNetworks: ISocialContactsFront | null;
    } | null;
    gender: IGenderFront | null;
    personSettings: IPersonSettingsFront | null;
}
