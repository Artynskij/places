import * as Yup from "yup";

export const validVideoFileSchema = Yup.mixed<File>()
    .test("fileType", "Неверный формат видео", (file) => {
        if (!file) return false;
        const validTypes = [
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/quicktime", // .mov
            "video/x-msvideo", // .avi
            "video/x-matroska", // .mkv
        ];
        return validTypes.includes(file.type);
    })
    .test("fileSize", "Видео слишком большое (максимум 100MB)", (file) => {
        if (!file) return false;
        return file.size <= 10000 * 1024 * 1024; // 100MB
    });
