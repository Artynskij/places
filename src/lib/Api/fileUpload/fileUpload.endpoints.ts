import {
    IFilePrivateUploadBodyRequest,
    IFilePublicUploadBodyRequest,
} from "@/lib/models/api/request/fileUpload/fileUpload.request";
import apiClient from "../ApiClient";
import { IFileUploadResponse } from "@/lib/models/api/response/fileUpload/fileUpload.response";

export default class FileUploadApi {
    constructor() {}
    async uploadPublicFile(
        body: IFilePublicUploadBodyRequest
    ): Promise<IFileUploadResponse | null> {
        try {
            const response = await apiClient.post(
                `/files/upload-public`,
                body,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при отправке фото`);
            return null;
        }
    }
    async uploadPrivateFile(
        body: IFilePrivateUploadBodyRequest
    ): Promise<IFileUploadResponse | null> {
        try {
            const response = await apiClient.post(
                `/files/upload-private-verification`,
                body,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при отправке фото`);
            return null;
        }
    }
}
