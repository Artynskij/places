import { IContactsRequest } from "@/lib/models/server/request/contacts/contacts.request";
import { BaseApiService } from "../BaseApi.service";
import {
    IGenderEntity,
    IGenderWithContentEntity,
} from "@/lib/models/server/entities/(person)/gender.entity";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";
export class GenderMapper {
    toFront(data: IGenderWithContentEntity | IGenderEntity): IGenderFront {
        const entity = "gender" in data ? data.gender : data;
        const content = "content" in data ? data.content : data.Content || null;
        return {
            id: entity.Id,
            code: entity.Code,
            key: entity.Name,
            value: content?.details[0].value || "",
        };
    }
}
export class GenderService extends BaseApiService<
    IGenderEntity,
    IGenderWithContentEntity,
    IGenderFront
> {
    protected baseUrl = "/gender";
    protected mapper = new GenderMapper();
}
