import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IPersonNameFront } from "../frontend/(person)/personName.front";
import { IPersonSettingsFront } from "../frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "../frontend/(person)/socialContacts.front";
import { IContactsPartFront } from "../frontend/parts/contacts/contacts.frontPart";

export interface IUser {
    id: string;
    timeZone: string | null;
    isVerified: boolean;
    nickname: string | null;
    birthDate: string | null;
    avatarImg: string | null;
    aboutDescription: string | null;
    dateRegister: string;
    personName: IPersonNameFront | null;
    contacts: IContactsPartFront | null;
    address: IAddressFront | null;

    socialNetworks: ISocialContactsFront | null;
    personSettings: IPersonSettingsFront | null;
}
