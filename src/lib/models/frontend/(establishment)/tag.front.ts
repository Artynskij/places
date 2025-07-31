import { ICategoryFront } from "./category.front";

export interface ITagFront {
    id: number | string;
    key: string;
    value: string;
    secondaryValue: string | null;
    iconName: string | null;
    count?: number | null;
}

export interface ITagBlockFront {
    groupKey: ICategoryFront;
    tags: ITagFront[];
}

export interface ITagWithEstablishmentFront {
    categoryTag: ICategoryFront;
    tag: ITagFront;
    establishmentId: string;
}
