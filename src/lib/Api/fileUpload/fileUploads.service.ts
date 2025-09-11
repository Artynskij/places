// import { IRoleOwnerEntity } from "@/lib/models/api/entities/FileUpload/roleOwner.entity";
import {
    IFilePrivateUploadBodyRequest,
    IFilePublicUploadBodyRequest,
} from "@/lib/models/api/request/fileUpload/fileUpload.request";
import FileUploadApi from "./fileUpload.endpoints";
import { IFileUploadResponse } from "@/lib/models/api/response/fileUpload/fileUpload.response";
import type { UploadFile } from "antd/es/upload/interface";
import { getTypeOfFile } from "@/lib/helpers/getTypeForFile";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { IImageEntity } from "@/lib/models";

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
    async uploadPublicFileOfAntdFiles(
        vendorId: string,
        filesProp: UploadFile[] | []
    ): Promise<IImageEntity[] | []> {
        const mediaFiles: File[] = filesProp
            ?.map((file) => {
                const originFile = file.originFileObj;
                return originFile;
            })
            .filter(Boolean) as File[];
        const uploadedFilesPromise = filesProp
            ?.map((file) => {
                const originFile = file.originFileObj;
                return originFile;
            })
            .filter(Boolean)
            .map((file) => {
                const res = this.uploadPublicFile({
                    file: file as File,
                    vendorId: vendorId,
                    type: getTypeOfFile(file?.type || ""),
                });

                return res;
            });
        const imageDimensionsPromises = mediaFiles?.map((file) => {
            return getImageDimensions(file);
        });
        const uploadedFiles = uploadedFilesPromise
            ? await Promise.all(uploadedFilesPromise)
            : [];
        const imageDimensions = imageDimensionsPromises
            ? await Promise.all(imageDimensionsPromises)
            : [];
        const filesTransformToContent: IImageEntity[] | [] = uploadedFiles
            ? uploadedFiles.map((file, index) => {
                  return {
                      id: filesProp[index].uid,
                      
                      blobPath: file?.blobPath || "",
                      fileName: filesProp[index].name || "",
                      width: imageDimensions[index].width || 0,
                      height: imageDimensions[index].height || 0,
                      type: filesProp[index].type || "",
                      details: [
                          {
                              lang: "ru",
                              value: { title: filesProp[index].name },
                          },
                      ],
                  };
              })
            : [];

        return filesTransformToContent;
    }
}
