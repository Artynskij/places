import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IPersonNameFront } from "../frontend/(person)/personName.front";
import { IPersonSettingsFront } from "../frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "../frontend/(person)/socialContacts.front";
import { IContactsPartFront } from "../frontend/parts/contacts/contacts.frontPart";
import { IPersonFront } from "../frontend/(person)/person.front";

export interface IUser extends IPersonFront {}
