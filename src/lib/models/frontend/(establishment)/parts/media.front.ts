import { TTypeFile } from "@/lib/models/types";
import type { UploadFile } from "antd/lib";
export interface IMediaFront {
    id: string;
    title: string;
    width: number;
    height: number;
    type: TTypeFile;
    fileName: string;
    blobPath: string;
    alt: string;
    src: string;
}
export interface IMediaFrontWithFile extends IMediaFront {
    file?: UploadFile;
}
