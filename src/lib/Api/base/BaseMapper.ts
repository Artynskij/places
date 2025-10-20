import { IBaseSimpleEntity, IBaseSimpleFront } from "@/lib/models";

export class BaseMapper {
    constructor() {}

    toFront(entity: IBaseSimpleEntity): IBaseSimpleFront {
        return {
            code: entity?.Code || "code not empty",
            id: entity?.Id || "id not empty",
            name: entity?.Name || "Name not empty",
            value: entity?.content.details[0].value || "value not empty",
            content: entity?.content || "content not empty",
        };
    }
}
