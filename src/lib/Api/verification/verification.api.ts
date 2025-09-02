import {
    IMediaFront,
    IVerificationEntity,
    IVerificationFront,
    IVerificationWithContentEntity,
} from "@/lib/models";
import { BaseApiService } from "../BaseApi.service";
import { IVerificationRequest } from "@/lib/models/api/request/verification/verification.request";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

export class VerificationMapper {
    constructor() {}
    toFront(
        dataServer: IVerificationEntity | IVerificationWithContentEntity,
        cdnHost?: string
    ): IVerificationFront {
        const entity =
            "verification" in dataServer ? dataServer.verification : dataServer;
        const content =
            "content" in dataServer
                ? dataServer.content
                : dataServer.Content || null;
        const privateMedia: IMediaFront[] | null =
            content?.media.map((privateFile) => {
                return {
                    id: privateFile.id,
                    blobPath: privateFile.blobPath,
                    fileName: privateFile.fileName,
                    type: privateFile.type,
                    width: privateFile.width,
                    height: privateFile.height,
                    title: privateFile.details[0].value.title,
                    src: cdnHost
                        ? `${cdnHost}/${privateFile.blobPath}`
                        : privateFile.blobPath,
                };
            }) || null;
        return {
            id: entity.Id,
            businessId:
                typeof entity.Business === "string"
                    ? entity.Business
                    : entity.Business?.Id || null,
            establishmentId:
                typeof entity.Establishment === "string"
                    ? entity.Establishment
                    : entity.Establishment?.establishment.Id || null,
            personId:
                typeof entity.Person === "string"
                    ? entity.Person
                    : entity.Person?.Id || null,
            isVerified: entity.IsVerified,
            CreatedDate: entity.CreatedDate,
            DeletedDate: entity.DeletedDate,
            LastModifiedDate: entity.LastModifiedDate,
            privateMedia: privateMedia,
        };
    }
}
export class VerificationService extends BaseApiService<
    IVerificationEntity,
    IVerificationWithContentEntity,
    IVerificationFront,
    IVerificationRequest
> {
    protected baseUrl = "/verifications";
    protected mapper = new VerificationMapper();

    private dataLoadService = new DataLoadManagementService();

    protected async loadCdnHost(): Promise<string | undefined> {
        const cdn = await this.dataLoadService.getBlobProxy();
        return cdn?.url;
    }
}
