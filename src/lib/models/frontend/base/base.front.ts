import { IContentSimpleEntity } from "../../server/entities";

export interface IBaseSimpleFront {
    id: string;
    code: string;
    name: string;
    value: string;
    content: IContentSimpleEntity;
}
