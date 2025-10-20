import { TKeySeo, TLocale } from "@/lib/models/types";
import { IContentBase, IImageEntity } from "../entities";

interface IContentValueBase {
    title?: string;
    description?: string;
    alt?: string;
    caption?: string;
    name?: string;
    text?: string;
}
export interface IContentMultilingualRequest<TContentValue = {}>
    extends IContentBase<TContentValue> {}
