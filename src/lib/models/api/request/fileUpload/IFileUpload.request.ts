import { TTypeFile } from "@/lib/models/common/TTypeFile";

export interface IFilePublicUploadBodyRequest {
    vendorId: string;
    type: TTypeFile;
    file: File;
}
export interface IFilePrivateUploadBodyRequest {
    vendorId: string;
    fileName?: TTypeFile;
    file: File;
}
