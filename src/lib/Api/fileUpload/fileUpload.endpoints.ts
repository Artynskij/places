import {
    IFilePrivateUploadBodyRequest,
    IFilePublicUploadBodyRequest,
} from "@/lib/models/server/request/fileUpload/fileUpload.request";
import apiClient from "../ApiClient";
import { IFileUploadResponse } from "@/lib/models/server/response/fileUpload/fileUpload.response";

export default class FileUploadApi {
    constructor() {}
    async uploadPublic(
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
            console.error(`Ошибка при отправке uploadPublic`);
            return null;
        }
    }
    async deletePublic(filePath: string) {
        try {
            const response = await apiClient.post(
                `/files/delete-public?filePath=${filePath}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при удалении deletePublic`);
            return null;
        }
    }
    async uploadPrivate(
        body: IFilePrivateUploadBodyRequest
    ): Promise<IFileUploadResponse | null> {
        try {
            const response = await apiClient.post(
                `/files/upload-private-verification`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при отправке uploadPrivate`);
            return null;
        }
    }
    async deletePrivate(filePath: string) {
        try {
            const response = await apiClient.post(
                `/files/delete-private?filePath=${filePath}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при удалении deletePrivate`);
            return null;
        }
    }
}
