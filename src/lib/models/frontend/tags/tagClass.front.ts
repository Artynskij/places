import { ITagFront } from "./tag.front";
import { ITagsBlockFront } from "./tagsBlock.front";
import { ITagWithEstablishmentFront } from "./tagWithEstablishment.front";

export interface ITagClassFront extends ITagsBlockFront {
    count: number;
}
// export interface ITagClassWithEstablishmentFront
//     extends ITagWithEstablishmentFront {}
interface _ITagClassFront extends ITagFront {
    count: number;
}
export interface ITagClassWithEstablishmentFront
    extends ITagWithEstablishmentFront {
    tag: _ITagClassFront;
}
