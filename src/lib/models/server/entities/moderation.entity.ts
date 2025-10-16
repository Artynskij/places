import { IBaseEntity } from "../base/base.entity";

export interface IModerationBatchEntity extends IBaseEntity {
    SubmittedById: string | null;
}
