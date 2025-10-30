import { IContentSimpleEntity } from "../../server/entities";
import { ICategoryFront } from "../category.front";

export interface ITagFront {
    id: string;
    key: string;
    value: string;
    tagCategory: ICategoryFront;
    secondaryValue: string | null;
    iconName: string | null;
    content?: IContentSimpleEntity;
    count?: number | null;
}

export interface ITagBlockFront {
    groupKey: ICategoryFront;
    tags: ITagFront[];
}

export interface ITagWithEstablishmentFront {
    tagCategory: ICategoryFront;
    tag: ITagFront;
    establishmentId: string;
}
