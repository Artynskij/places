import { IPersonNameEntity } from "../../api/entities/(person)/personName.entity";

export interface IPersonNameFront {
    id: string;
    name: string | null;
    secondName: string | null;
    surname: string | null;
    originalName: string | null;
    originalSurname: string | null;
    originalSecondName: string | null;
}
