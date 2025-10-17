
import { TArticleReaction } from "@/lib/models/types";
import { IBaseSimpleEntity } from "../../base";

export interface IArticleReactionEntity
    extends Omit<IBaseSimpleEntity<TArticleReaction>, "content"> {
    IsActive: boolean;
}
