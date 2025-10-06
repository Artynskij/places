import { IPersonNameEntity } from "../../server/entities/(person)/personName.entity";

export interface IPersonNameFront {
    id: string;
    name: string | null;
    secondName: string | null;
    surname: string | null;
    fullName: string | null;
    originalName: string | null;
    originalSurname: string | null;
    originalSecondName: string | null;
    originalFullName: string | null;
}
