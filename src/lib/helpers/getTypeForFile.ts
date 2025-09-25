import { TTypeFile } from "../models/types";

export const getTypeOfFile = (type: string):TTypeFile => {
    return type.includes("video")
        ? "video"
        : type.includes("image")
        ? "image"
        : "document";
};
