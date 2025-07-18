import { ICategoryFront } from "../category/category.front";
import { ITagFront } from "./tag.front";

export interface ITagBlockFront {
    groupKey: ICategoryFront;
    tags: ITagFront[];
}
