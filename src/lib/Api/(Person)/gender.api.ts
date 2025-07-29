import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";
import { BaseApiService } from "../BaseApi.service";
import { IGenderEntity } from "@/lib/models/api/entities/(person)/gender.entity";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";
export class GenderMapper {
    toFront(genderServer: IGenderEntity): IGenderFront {
        return {
            id: genderServer.gender.Id,
            code: genderServer.gender.Code,
            key: genderServer.gender.Name,
            value: genderServer.content?.details[0].value || "",
        };
    }
}
export class GenderService extends BaseApiService<
    IGenderEntity,
    IGenderFront,
    IContactsRequest
> {
    protected baseUrl = "/gender";
    protected mapper = new GenderMapper();
}
