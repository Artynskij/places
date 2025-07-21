import { IContactsEntity } from "../../../api/entities/parts/contacts.entity";

export interface IContactsPartFront {
    id: string;
    phone: string | null;
    email: string | null;
    address?:string 
    socialNetworks?:string 
}
