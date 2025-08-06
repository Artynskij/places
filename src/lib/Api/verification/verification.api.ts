import {
    IMediaFront,
    IVerificationEntity,
    IVerificationFront,
} from "@/lib/models";
import { BaseApiService } from "../BaseApi.service";
import { IVerificationRequest } from "@/lib/models/api/request/verification/verification.request";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

export class VerificationMapper {
    constructor() {}
    toFront(
        dataServer: IVerificationEntity,
        cdnHost?: string
    ): IVerificationFront {
        const privateMedia: IMediaFront[] | null =
            dataServer.Content?.privateMedia.map((privateFile) => {
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
            id: dataServer.Id,
            business: dataServer.Business || null,
            establishment: dataServer.Establishment,
            person: dataServer.Person,
            isVerified: dataServer.IsVerified,
            CreatedDate: dataServer.CreatedDate,
            DeletedDate: dataServer.DeletedDate,
            LastModifiedDate: dataServer.LastModifiedDate,
            privateMedia: privateMedia,
        }; 
    }
}
export class VerificationService extends BaseApiService<
    IVerificationEntity,
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
