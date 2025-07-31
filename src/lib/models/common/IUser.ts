import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IPersonNameFront } from "../frontend/(person)/personName.front";
import { IPersonSettingsFront } from "../frontend/(person)/personSettings.front";
import { ISocialContactsFront } from "../frontend/socialContacts.front";
import { IContactsPersonFront } from "../frontend/(person)/contactsPerson.front";
import { IPersonFront } from "../frontend/(person)/person.front";

export interface IUser extends IPersonFront {}
