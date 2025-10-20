
import { IBaseSimpleEntity } from "../../base";

export interface IArticleHashTagEntity
    extends Omit<IBaseSimpleEntity, "content" | "code"> {}
