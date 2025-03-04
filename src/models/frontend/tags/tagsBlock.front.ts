import { ICategoryFront } from "../category/category.front";
import { ITagFront } from "./tag.front";

export interface ITagsBlockFront {
  groupKey: ICategoryFront;
  tags: ITagFront[];
}
