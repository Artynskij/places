import { IBaseEntity } from "../base/base.entity";

export interface IPersonNameEntity extends IBaseEntity {
    FirstName: string | null;
    MiddleName: string | null;
    LastName: string | null;
    OriginalName: string | null;
    OriginalLastName: string | null;
    OriginalMiddleName: string | null;
}
