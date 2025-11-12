import { IContentSimpleEntity } from "../../server/entities";

export interface ITagCategoryFront {
    id: string;
    key: string;
    value: string;
    establishmentTypeId: string | null;
    countTags?: number;
    content?: IContentSimpleEntity;
}
