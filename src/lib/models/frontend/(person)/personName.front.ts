import { IPersonNameEntity } from "../../api/entities/(person)/personName.entity";

export interface IPersonNameFront {
    id: string;
    name: string | null;
    secondName: string | null;
    surname: string | null;
    originalName: string | null;
    originalLastName: string | null;
}
