import { TArticleStatus } from "@/lib/models/types/TArticleStatus";
import { IBaseEntity } from "../../base/base.entity";

export interface IArticleStatusEntity extends IBaseEntity {
    Code: TArticleStatus;
    Name: string;
}
