import * as Yup from "yup";
import type { UploadFile } from "antd/es/upload/interface";
export const validImageAntdFileSchema = Yup.mixed<UploadFile>()
   
    .test("fileSize", "Изображение слишком большое (максимум 5MB)", (file) => {
        if (!file) return false;
        return (file.originFileObj?.size || 0) <= 5 * 1024 * 1024; // 5MB
    });
