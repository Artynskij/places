import { IBaseSimpleFront } from "../base/base.front";

export interface IArticleHashTagFront
    extends Omit<IBaseSimpleFront, "content" | "value" | "code"> {}
