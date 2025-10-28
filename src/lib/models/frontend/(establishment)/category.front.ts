import { IContentSimpleEntity } from "../../server/entities";

export interface ICategoryFront {
    id: string;
    key: string;
    value: string;
    content?: IContentSimpleEntity;
}
