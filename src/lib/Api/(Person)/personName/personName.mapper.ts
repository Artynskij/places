import { IPersonNameEntity } from "@/lib/models/api/entities/(person)/personName.entity";
import { IPersonNameFront } from "@/lib/models/frontend/(person)/personName.front";

export class PersonNameMapper {
    constructor() {}
    transformPersonNameEntity(dataServer: IPersonNameEntity): IPersonNameFront {
        const mappedData: IPersonNameFront = {
            id: dataServer.Id,
            name: dataServer.FirstName,
            secondName: dataServer.MiddleName,
            surname: dataServer.LastName,
            originalLastName: dataServer.OriginalLastName,
            originalName: dataServer.OriginalName,
        };
        return mappedData
    }
}
