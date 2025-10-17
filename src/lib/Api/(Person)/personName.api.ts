import {
    IPersonNameEntity,
    IPersonNameFront,
    IPersonNameRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";
import { IBaseModerationResponse } from "@/lib/models/server/base/base.response";

export class PersonNameMapper {
    constructor() {}
    toFront(dataServer: IPersonNameEntity): IPersonNameFront {
        const mappedData: IPersonNameFront = {
            id: dataServer.Id,
            name: dataServer.FirstName,
            secondName: dataServer.MiddleName,
            surname: dataServer.LastName,
            fullName: [
                dataServer.LastName,
                dataServer.FirstName,
                dataServer.MiddleName,
            ]
                .filter(Boolean)
                .join(" "),
            originalSurname: dataServer.OriginalLastName,
            originalName: dataServer.OriginalName,
            originalSecondName: dataServer.OriginalMiddleName,
            originalFullName: [
                dataServer.OriginalLastName,
                dataServer.OriginalName,
                dataServer.OriginalMiddleName,
            ]
                .filter(Boolean)
                .join(" "),
        };
        return mappedData;
    }
}

export class PersonNameService extends BaseApiService<
    IPersonNameEntity,
    IPersonNameEntity,
    IPersonNameFront,
    IPersonNameRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/persons-name";
    protected mapper = new PersonNameMapper();
}
