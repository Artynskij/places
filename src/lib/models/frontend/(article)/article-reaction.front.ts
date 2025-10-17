import { IBaseSimpleFront } from "../base/base.front";

export interface IArticleReactionFront
    extends Omit<IBaseSimpleFront, "content" | "value"> {
    isActive: boolean;
}
