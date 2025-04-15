import { ICategoryEntity } from "../../api/entities/category.entity";
import { ICategoryFront } from "../category/category.front";
import { ITagFront } from "./tag.front";

export interface ITagWithEstablishmentFront {
    categoryTag: ICategoryFront;
    tag: ITagFront;
    establishmentId: string;
}
