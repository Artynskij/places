import { TArticleStatus } from "@/lib/models/types/TArticleStatus";
import { IBaseSimpleEntity } from "../../base/base.entity";

export interface IArticleStatusEntity
    extends Omit<IBaseSimpleEntity<TArticleStatus>, "content"> {}
