// import { IRoleOwnerEntity } from "@/lib/models/api/entities/FileUpload/roleOwner.entity";
import {
    IFilePrivateUploadBodyRequest,
    IFilePublicUploadBodyRequest,
} from "@/lib/models/api/request/fileUpload/fileUpload.request";
import FileUploadApi from "./fileUpload.endpoints";
import { IFileUploadResponse } from "@/lib/models/api/response/fileUpload/fileUpload.response";

export class FileUploadService {
    private FileUploadApi: FileUploadApi;

    constructor() {
        this.FileUploadApi = new FileUploadApi();
    }

    async uploadPublicFile(
        body: IFilePublicUploadBodyRequest
    ): Promise<IFileUploadResponse | null> {
        const response = await this.FileUploadApi.uploadPublicFile(body);

        return response;
    }
    async uploadPrivateFile(
        body: IFilePrivateUploadBodyRequest
    ): Promise<IFileUploadResponse | null> {
        const response = await this.FileUploadApi.uploadPrivateFile(body);

        return response;
    }
}
